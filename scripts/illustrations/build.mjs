/**
 * Track A illustration pipeline (see asset-manifest.json, category "ILLUSTRATION").
 *
 *   node scripts/illustrations/build.mjs
 *
 * 1. Builds each illustration as a flat, multi-layer SVG in /tmp-svgs/
 *    (Material-style geometry, rx >= 12, pills, dashed connectors, flat cel-shading, no outlines,
 *    strict palette, transparent root canvas, no text so rendering is font-independent).
 * 2. Exports every SVG in /tmp-svgs/ to a 2x transparent PNG in /public/assets/images/ with sharp.
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SVG_DIR = join(ROOT, "tmp-svgs");
const OUT_DIR = join(ROOT, "public", "assets", "images");

/* ── Strict palette ─────────────────────────────────────────────── */
const C = { blue: "#0057FF", green: "#00B862", navy: "#082567", ice: "#E8F0FE", white: "#FFFFFF" };
const SKIN = { warm: "#8D5524", mid: "#5C3824", deep: "#3D2314" };

/* ── Primitives ─────────────────────────────────────────────────── */
let uid = 0;
const nid = (p) => `${p}${++uid}`;
const rect = (x, y, w, h, rx, fill, a = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${a}/>`;
const pill = (x, y, w, h, fill, a = "") => rect(x, y, w, h, h / 2, fill, a);
const circle = (cx, cy, r, fill, a = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${a}/>`;
const path = (d, fill, a = "") => `<path d="${d}" fill="${fill}" ${a}/>`;
/** Flat cel-shade: navy at low opacity, no blur. */
const SHADE = `fill-opacity=".14"`;
const dashed = (d, color = C.blue, w = 5) =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="1 14"/>`;
/** Glyph strokes (checks, arrows) — line icons, not shape outlines. */
const stroke = (d, color, w) =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

/** Card with a flat offset ground shade (no blur). */
const card = (x, y, w, h, rx = 28, fill = C.white) =>
  rect(x, y + 12, w, h, rx, C.navy, `fill-opacity=".08"`) + rect(x, y, w, h, rx, fill);

const check = (cx, cy, s, color = C.white, w = s * 0.2) =>
  stroke(`M${cx - s * 0.48} ${cy + s * 0.02} L${cx - s * 0.14} ${cy + s * 0.34} L${cx + s * 0.5} ${cy - s * 0.32}`, color, w);
const badgeCheck = (cx, cy, r, fill = C.green, mark = C.white) => circle(cx, cy, r, fill) + check(cx, cy, r * 0.95, mark);

const naira = (cx, cy, s, color) =>
  stroke(`M${cx - s * 0.28} ${cy + s * 0.42} V${cy - s * 0.42} L${cx + s * 0.28} ${cy + s * 0.42} V${cy - s * 0.42}`, color, s * 0.14) +
  stroke(`M${cx - s * 0.46} ${cy - s * 0.1} H${cx + s * 0.46} M${cx - s * 0.46} ${cy + s * 0.13} H${cx + s * 0.46}`, color, s * 0.11);

const coin = (cx, cy, r) =>
  circle(cx, cy, r, C.green) +
  path(`M${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx} ${cy + r} A${r * 0.62} ${r} 0 0 0 ${cx} ${cy - r} Z`, C.navy, SHADE) +
  circle(cx, cy, r * 0.72, C.white, `fill-opacity=".2"`) +
  naira(cx, cy, r * 0.9, C.white);

const lock = (cx, cy, s, color) =>
  stroke(`M${cx - s * 0.3} ${cy - s * 0.05} V${cy - s * 0.3} A${s * 0.3} ${s * 0.3} 0 0 1 ${cx + s * 0.3} ${cy - s * 0.3} V${cy - s * 0.05}`, color, s * 0.14) +
  rect(cx - s * 0.48, cy - s * 0.1, s * 0.96, s * 0.72, s * 0.16, color);

const star = (cx, cy, r, fill) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.48 : r;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `<path d="M${pts.join(" L")} Z" fill="${fill}" stroke="${fill}" stroke-width="${r * 0.25}" stroke-linejoin="round"/>`;
};

const sparkle = (cx, cy, s, fill = C.blue) =>
  path(`M${cx} ${cy - s} Q${cx + s * 0.18} ${cy - s * 0.18} ${cx + s} ${cy} Q${cx + s * 0.18} ${cy + s * 0.18} ${cx} ${cy + s} Q${cx - s * 0.18} ${cy + s * 0.18} ${cx - s} ${cy} Q${cx - s * 0.18} ${cy - s * 0.18} ${cx} ${cy - s} Z`, fill);

const shieldPath = (cx, cy, h) => {
  const w = h * 0.82;
  return `M${cx} ${cy - h / 2} L${cx + w / 2} ${cy - h * 0.34} V${cy + h * 0.02} C${cx + w / 2} ${cy + h * 0.28} ${cx + w * 0.24} ${cy + h * 0.44} ${cx} ${cy + h / 2} C${cx - w * 0.24} ${cy + h * 0.44} ${cx - w / 2} ${cy + h * 0.28} ${cx - w / 2} ${cy + h * 0.02} V${cy - h * 0.34} Z`;
};

const pin = (cx, tipY, h, fill) => {
  const r = h * 0.36;
  const cy = tipY - h + r;
  return path(`M${cx} ${tipY} C${cx - r * 0.5} ${tipY - h * 0.25} ${cx - r} ${cy + r * 0.55} ${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy} C${cx + r} ${cy + r * 0.55} ${cx + r * 0.5} ${tipY - h * 0.25} ${cx} ${tipY} Z`, fill);
};

/** Phone frame; `content` is drawn in absolute coords, clipped to the screen. */
const phone = (x, y, w, h, screen = C.white, content = "") => {
  const k = nid("screen");
  const b = 14;
  return (
    rect(x, y + 12, w, h, 38, C.navy, `fill-opacity=".1"`) +
    rect(x, y, w, h, 38, C.navy) +
    `<clipPath id="${k}">${rect(x + b, y + b, w - 2 * b, h - 2 * b, 26, "#000")}</clipPath>` +
    rect(x + b, y + b, w - 2 * b, h - 2 * b, 26, screen) +
    `<g clip-path="url(#${k})">${content}</g>` +
    pill(x + w / 2 - 28, y + b + 10, 56, 12, C.navy)
  );
};

const vault = (x, y, s, door = C.blue) => {
  const w = s;
  const cx = x + w / 2;
  const cy = y + w / 2;
  return (
    pill(x + w * 0.14, y + w * 0.9, w * 0.2, w * 0.14, C.navy) +
    pill(x + w * 0.66, y + w * 0.9, w * 0.2, w * 0.14, C.navy) +
    rect(x, y, w, w, w * 0.16, C.navy) +
    path(`M${cx} ${y} H${x + w - w * 0.16} Q${x + w} ${y} ${x + w} ${y + w * 0.16} V${y + w - w * 0.16} Q${x + w} ${y + w} ${x + w - w * 0.16} ${y + w} H${cx} Z`, C.white, `fill-opacity=".06"`) +
    circle(cx, cy, w * 0.34, door) +
    circle(cx, cy, w * 0.13, C.white) +
    [0, 120, 240].map((a) => `<g transform="rotate(${a} ${cx} ${cy})">${pill(cx - w * 0.022, cy - w * 0.27, w * 0.044, w * 0.17, C.white)}${circle(cx, cy - w * 0.27, w * 0.045, C.white)}</g>`).join("") +
    circle(cx, cy, w * 0.05, door) +
    pill(x + w * 0.86, cy - w * 0.1, w * 0.06, w * 0.2, C.white, `fill-opacity=".5"`)
  );
};

/**
 * Nigerian character bust. Head radius ≈ 30*s centred at (cx, cy).
 * style: short | puff | wrap | braids
 */
const bust = (cx, cy, s, { skin, shirt, style = "short", accent = C.green }) => {
  const S = (n) => +(n * s).toFixed(2);
  const torso = `M${cx - S(78)} ${cy + S(170)} V${cy + S(90)} Q${cx - S(78)} ${cy + S(50)} ${cx - S(40)} ${cy + S(48)} H${cx + S(40)} Q${cx + S(78)} ${cy + S(50)} ${cx + S(78)} ${cy + S(90)} V${cy + S(170)} Z`;
  const torsoShade = `M${cx + S(12)} ${cy + S(48)} H${cx + S(40)} Q${cx + S(78)} ${cy + S(50)} ${cx + S(78)} ${cy + S(90)} V${cy + S(170)} H${cx + S(12)} Z`;
  let hairBack = "";
  let hairFront = "";
  const cap = `M${cx - S(31)} ${cy - S(2)} Q${cx - S(33)} ${cy - S(40)} ${cx} ${cy - S(39)} Q${cx + S(33)} ${cy - S(40)} ${cx + S(31)} ${cy - S(2)} Q${cx + S(24)} ${cy - S(22)} ${cx} ${cy - S(24)} Q${cx - S(24)} ${cy - S(22)} ${cx - S(31)} ${cy - S(2)} Z`;
  if (style === "short") hairFront = path(cap, C.navy);
  if (style === "puff") {
    hairBack = circle(cx, cy - S(36), S(30), C.navy);
    hairFront = path(cap, C.navy);
  }
  if (style === "braids") {
    hairBack = pill(cx - S(40), cy - S(10), S(18), S(96), C.navy) + pill(cx + S(22), cy - S(10), S(18), S(96), C.navy);
    hairFront = path(cap, C.navy);
  }
  if (style === "wrap") {
    hairFront =
      path(`M${cx - S(34)} ${cy - S(4)} Q${cx - S(38)} ${cy - S(56)} ${cx} ${cy - S(58)} Q${cx + S(40)} ${cy - S(56)} ${cx + S(34)} ${cy - S(4)} Q${cx} ${cy - S(22)} ${cx - S(34)} ${cy - S(4)} Z`, accent) +
      path(`M${cx + S(2)} ${cy - S(58)} Q${cx + S(40)} ${cy - S(56)} ${cx + S(34)} ${cy - S(4)} Q${cx + S(18)} ${cy - S(16)} ${cx + S(2)} ${cy - S(20)} Z`, C.navy, SHADE) +
      circle(cx + S(26), cy - S(48), S(14), accent);
  }
  return (
    hairBack +
    path(torso, shirt) +
    path(torsoShade, C.navy, SHADE) +
    rect(cx - S(13), cy + S(18), S(26), S(34), S(11), skin) +
    rect(cx - S(13), cy + S(18), S(26), S(18), S(9), C.navy, `fill-opacity=".18"`) +
    path(`M${cx - S(20)} ${cy + S(47)} Q${cx} ${cy + S(63)} ${cx + S(20)} ${cy + S(47)} Z`, skin) +
    circle(cx - S(29), cy + S(4), S(7), skin) +
    circle(cx + S(29), cy + S(4), S(7), skin) +
    `<ellipse cx="${cx}" cy="${cy}" rx="${S(29)}" ry="${S(33)}" fill="${skin}"/>` +
    path(`M${cx + S(4)} ${cy - S(33)} A${S(29)} ${S(33)} 0 0 1 ${cx + S(4)} ${cy + S(33)} A${S(20)} ${S(33)} 0 0 0 ${cx + S(4)} ${cy - S(33)} Z`, C.navy, `fill-opacity=".12"`) +
    circle(cx - S(10), cy + S(2), S(4.4), C.white) +
    circle(cx + S(10), cy + S(2), S(4.4), C.white) +
    circle(cx - S(10), cy + S(2.6), S(2.6), C.navy) +
    circle(cx + S(10), cy + S(2.6), S(2.6), C.navy) +
    stroke(`M${cx - S(9)} ${cy + S(15)} Q${cx} ${cy + S(23)} ${cx + S(9)} ${cy + S(15)}`, C.white, S(3)) +
    hairFront
  );
};

/** Circular avatar holding a bust. */
const avatar = (cx, cy, r, opts, bg = C.ice) => {
  const k = nid("av");
  return (
    `<clipPath id="${k}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>` +
    circle(cx, cy, r, bg) +
    `<g clip-path="url(#${k})">${bust(cx, cy - r * 0.14, r / 56, opts)}</g>`
  );
};

/** Bust clipped into a rounded frame. */
const framedBust = (x, y, w, h, rx, opts, bg = C.ice, scale = 1, headY = 0.42) => {
  const k = nid("fr");
  return (
    `<clipPath id="${k}">${rect(x, y, w, h, rx, "#000")}</clipPath>` +
    rect(x, y, w, h, rx, bg) +
    `<g clip-path="url(#${k})">${bust(x + w / 2, y + h * headY, scale, opts)}</g>`
  );
};

const bracketFrame = (x, y, w, h, len = 34, color = C.blue) => {
  const d = [
    `M${x} ${y + len} V${y + 12} Q${x} ${y} ${x + 12} ${y} H${x + len}`,
    `M${x + w - len} ${y} H${x + w - 12} Q${x + w} ${y} ${x + w} ${y + 12} V${y + len}`,
    `M${x + w} ${y + h - len} V${y + h - 12} Q${x + w} ${y + h} ${x + w - 12} ${y + h} H${x + w - len}`,
    `M${x + len} ${y + h} H${x + 12} Q${x} ${y + h} ${x} ${y + h - 12} V${y + h - len}`,
  ];
  return d.map((p) => stroke(p, color, 7)).join("");
};

const house = (x, y, s, body = C.ice) => {
  const S = (n) => n * s;
  return (
    rect(x - S(42), y - S(18), S(84), S(72), S(14), body) +
    path(`M${x - S(50)} ${y - S(12)} L${x} ${y - S(58)} L${x + S(50)} ${y - S(12)} Z`, C.navy, `stroke="${C.navy}" stroke-width="${S(14)}" stroke-linejoin="round"`) +
    path(`M${x} ${y - S(58)} L${x + S(50)} ${y - S(12)} H${x} Z`, C.white, `fill-opacity=".12"`) +
    rect(x - S(12), y + S(16), S(24), S(38), S(8), C.blue) +
    rect(x + S(18), y + S(2), S(16), S(16), S(5), C.white)
  );
};

const bank = (cx, cy, s) => {
  const S = (n) => n * s;
  return (
    path(`M${cx - S(52)} ${cy - S(20)} L${cx} ${cy - S(52)} L${cx + S(52)} ${cy - S(20)} Z`, C.navy, `stroke="${C.navy}" stroke-width="${S(10)}" stroke-linejoin="round"`) +
    [-34, -11, 12, 35].map((dx) => rect(cx + S(dx) - S(7), cy - S(12), S(14), S(48), S(5), C.blue)).join("") +
    pill(cx - S(58), cy + S(38), S(116), S(16), C.navy)
  );
};

const hand = (tipX, tipY, s, skin) => {
  const S = (n) => n * s;
  return (
    rect(tipX - S(36), tipY + S(104), S(72), S(120), S(14), C.navy) +
    pill(tipX - S(40), tipY + S(98), S(80), S(22), C.white) +
    rect(tipX - S(32), tipY + S(46), S(64), S(62), S(22), skin) +
    pill(tipX - S(10), tipY, S(20), S(70), skin) +
    pill(tipX + S(8), tipY + S(40), S(18), S(40), skin) +
    pill(tipX + S(22), tipY + S(48), S(16), S(36), skin) +
    path(`M${tipX - S(32)} ${tipY + S(70)} Q${tipX - S(54)} ${tipY + S(54)} ${tipX - S(46)} ${tipY + S(40)} Q${tipX - S(36)} ${tipY + S(34)} ${tipX - S(20)} ${tipY + S(56)} Z`, skin) +
    rect(tipX + S(4), tipY + S(46), S(28), S(62), S(16), C.navy, `fill-opacity=".14"`)
  );
};

const plus = (cx, cy, s, color) =>
  pill(cx - s / 2, cy - s * 0.1, s, s * 0.2, color) + pill(cx - s * 0.1, cy - s / 2, s * 0.2, s, color);

/* ── Scenes ─────────────────────────────────────────────────────── */
const scenes = {
  "step-find-nearby-pro": () => {
    const pros = [
      { y: 104, skin: SKIN.mid, style: "short", shirt: C.navy },
      { y: 246, skin: SKIN.warm, style: "braids", shirt: C.green },
      { y: 388, skin: SKIN.deep, style: "short", shirt: C.blue },
    ];
    const map =
      rect(134, 74, 242, 452, 0, C.ice) +
      rect(150, 96, 78, 96, 14, C.white, `fill-opacity=".7"`) +
      rect(286, 250, 76, 120, 14, C.white, `fill-opacity=".7"`) +
      pill(120, 214, 280, 26, C.white) +
      rect(246, 60, 26, 480, 13, C.white) +
      pill(120, 392, 280, 22, C.white) +
      circle(259, 300, 96, C.blue, `fill-opacity=".1"`) +
      `<circle cx="259" cy="300" r="96" fill="none" stroke="${C.blue}" stroke-width="4" stroke-dasharray="1 12" stroke-linecap="round"/>` +
      pin(259, 318, 104, C.blue) +
      circle(259, 251, 15, C.white) +
      rect(134, 436, 242, 120, 26, C.white) +
      pill(160, 458, 120, 16, C.navy) +
      pill(160, 486, 80, 12, C.ice);
    return {
      w: 800,
      h: 600,
      body:
        pros.map((p) => dashed(`M300 252 C 400 252, 390 ${p.y + 52}, 468 ${p.y + 52}`)).join("") +
        phone(120, 60, 278, 480, C.ice, map) +
        pros
          .map(
            (p) =>
              card(470, p.y, 280, 104, 28) +
              avatar(524, p.y + 52, 34, { skin: p.skin, style: p.style, shirt: p.shirt }) +
              pill(574, p.y + 30, 112, 16, C.navy) +
              pill(574, p.y + 58, 74, 14, C.ice) +
              badgeCheck(716, p.y + 52, 18)
          )
          .join(""),
    };
  },

  "step-book-pay-escrow": () => {
    const days = [0, 1, 2, 3, 4]
      .map((i) => {
        const x = 112 + i * 64;
        const on = i === 2;
        return rect(x, 196, 54, 78, 18, on ? C.blue : C.ice) + pill(x + 15, 214, 24, 10, on ? C.white : C.navy, on ? "" : `fill-opacity=".4"`) + circle(x + 27, 250, 9, on ? C.white : C.navy, on ? "" : `fill-opacity=".25"`);
      })
      .join("");
    return {
      w: 800,
      h: 600,
      body:
        dashed(`M438 150 Q 560 60 632 238`) +
        card(80, 90, 380, 410, 32) +
        pill(112, 124, 150, 20, C.navy) +
        pill(112, 156, 96, 14, C.ice) +
        days +
        pill(112, 304, 96, 40, C.ice) +
        pill(218, 304, 96, 40, C.blue) +
        pill(324, 304, 96, 40, C.ice) +
        pill(134, 318, 52, 12, C.navy, `fill-opacity=".35"`) +
        pill(240, 318, 52, 12, C.white) +
        pill(346, 318, 52, 12, C.navy, `fill-opacity=".35"`) +
        pill(112, 392, 316, 60, C.blue) +
        lock(270, 418, 30, C.white) +
        coin(558, 128, 38) +
        vault(522, 246, 220) +
        pill(546, 506, 172, 50, C.green) +
        lock(584, 528, 26, C.white) +
        pill(612, 523, 82, 14, C.white),
    };
  },

  "step-approve-release-payment": () => ({
    w: 800,
    h: 600,
    body:
      dashed(`M340 212 C 380 110, 440 96, 476 150`) +
      pill(112, 150, 40, 10, C.blue, `transform="rotate(-35 132 155)"`) +
      pill(178, 120, 10, 40, C.blue, `transform="rotate(-12 183 140)"`) +
      pill(84, 206, 40, 10, C.blue, `fill-opacity=".5"`) +
      rect(90, 232, 330, 134, 44, C.navy, `fill-opacity=".08"`) +
      rect(90, 220, 330, 134, 44, C.blue) +
      check(255, 286, 72, C.white, 15) +
      circle(255, 336, 58, C.blue, `fill-opacity=".14"`) +
      hand(255, 318, 1.45, SKIN.warm) +
      rect(484, 126, 250, 330, 32, C.navy, `fill-opacity=".08"`) +
      rect(484, 114, 250, 330, 32, C.blue) +
      path(`M609 114 H702 Q734 114 734 146 V412 Q734 444 702 444 H609 Z`, C.navy, SHADE) +
      pill(516, 150, 120, 18, C.white) +
      pill(516, 180, 80, 14, C.white, `fill-opacity=".5"`) +
      pill(510, 240, 198, 64, C.green) +
      naira(548, 272, 30, C.white) +
      pill(580, 264, 104, 16, C.white) +
      [0, 1, 2, 3, 4].map((i) => star(534 + i * 38, 360, 14, C.white)).join("") +
      pill(516, 396, 150, 14, C.white, `fill-opacity=".5"`),
  }),

  "trust-verified-identity": () => ({
    w: 600,
    h: 600,
    body:
      card(60, 150, 420, 280, 32) +
      framedBust(92, 186, 150, 208, 22, { skin: SKIN.deep, shirt: C.navy, style: "short" }, C.ice, 1.25, 0.4) +
      bracketFrame(78, 172, 178, 236) +
      pill(276, 200, 160, 20, C.navy) +
      pill(276, 240, 116, 16, C.ice) +
      pill(276, 274, 146, 16, C.ice) +
      pill(276, 308, 96, 16, C.ice) +
      pill(276, 350, 74, 24, C.blue) +
      path(shieldPath(456, 418, 176), C.green) +
      path(`M456 330 L528 357 V420 C528 452 500 486 456 506 Z`, C.navy, SHADE) +
      check(456, 414, 64, C.white, 14),
  }),

  "trust-escrow-protection": () => {
    const k = nid("win");
    return {
      w: 600,
      h: 600,
      body:
        dashed(`M362 258 C 430 230, 470 250, 494 302`) +
        pill(116, 476, 54, 26, C.navy) +
        pill(290, 476, 54, 26, C.navy) +
        rect(80, 190, 280, 296, 46, C.navy) +
        path(`M124 190 H220 V486 H124 Q80 486 80 442 V234 Q80 190 124 190 Z`, C.white, `fill-opacity=".06"`) +
        circle(220, 338, 104, C.blue) +
        `<clipPath id="${k}"><circle cx="220" cy="338" r="66"/></clipPath>` +
        circle(220, 338, 66, C.ice) +
        `<g clip-path="url(#${k})">${[384, 360, 336, 312]
          .map((y, i) => pill(176 + (i % 2) * 6, y, 88, 26, C.green) + pill(190 + (i % 2) * 6, y + 9, 60, 8, C.white, `fill-opacity=".35"`))
          .join("")}</g>` +
        pill(312, 318, 14, 40, C.white) +
        pill(140, 88, 168, 60, C.green) +
        lock(182, 120, 32, C.white) +
        pill(210, 110, 74, 16, C.white) +
        dashed(`M224 150 V186`, C.green) +
        card(420, 302, 150, 108, 26) +
        badgeCheck(462, 356, 22) +
        pill(494, 340, 54, 14, C.navy) +
        pill(494, 362, 38, 12, C.ice),
    };
  },

  "trust-recourse-guarantee": () => ({
    w: 600,
    h: 600,
    body:
      path(shieldPath(300, 300, 470), C.ice) +
      dashed(`M318 296 C 340 330, 370 306, 392 330`) +
      rect(66, 132, 290, 166, 40, C.blue) +
      path(`M120 290 L104 346 L176 296 Z`, C.blue, `stroke="${C.blue}" stroke-width="10" stroke-linejoin="round"`) +
      path(`M211 132 H316 Q356 132 356 172 V258 Q356 298 316 298 H211 Z`, C.navy, SHADE) +
      `<g transform="rotate(-45 211 215)">${pill(199, 200, 24, 96, C.white)}${circle(211, 186, 32, C.white)}${rect(199, 148, 24, 36, 6, C.blue)}</g>` +
      card(240, 330, 296, 150, 40) +
      path(`M470 470 L494 520 L430 476 Z`, C.white, `stroke="${C.white}" stroke-width="10" stroke-linejoin="round"`) +
      circle(320, 405, 44, C.green) +
      stroke(`M301 386 A27 27 0 1 1 296 418`, C.white, 9) +
      path(`M289 372 L313 384 L292 400 Z`, C.white, `stroke="${C.white}" stroke-width="4" stroke-linejoin="round"`) +
      pill(386, 378, 116, 18, C.navy) +
      pill(386, 412, 78, 16, C.ice),
  }),

  "provider-nearby-matching": () => {
    const homes = [
      { x: 170, y: 190, ping: true },
      { x: 636, y: 176, ping: true },
      { x: 136, y: 446 },
      { x: 662, y: 444, ping: true },
      { x: 400, y: 112 },
    ];
    return {
      w: 800,
      h: 600,
      body:
        circle(400, 310, 150, C.blue, `fill-opacity=".07"`) +
        `<circle cx="400" cy="310" r="214" fill="none" stroke="${C.blue}" stroke-width="4" stroke-dasharray="1 14" stroke-linecap="round"/>` +
        homes.filter((h) => h.ping).map((h) => dashed(`M400 300 L${h.x} ${h.y}`)).join("") +
        homes
          .map(
            (h) =>
              house(h.x, h.y, 0.95) +
              (h.ping ? pill(h.x - 38, h.y - 112, 76, 34, C.green) + check(h.x, h.y - 95, 22, C.white, 5) : "")
          )
          .join("") +
        pin(400, 420, 230, C.blue) +
        path(`M400 190 A83 83 0 0 1 400 356 C 440 320 470 300 483 273 A83 83 0 0 0 400 190 Z`, C.navy, `fill-opacity=".1"`) +
        avatar(400, 273, 58, { skin: SKIN.mid, shirt: C.navy, style: "short" }),
    };
  },

  "provider-step-get-verified": () => {
    const rows = [160, 252, 344]
      .map(
        (y) =>
          rect(254, y, 170, 74, 20, C.ice) +
          rect(268, y + 17, 40, 40, 13, C.blue) +
          pill(276, y + 30, 24, 6, C.white) +
          pill(276, y + 42, 16, 6, C.white) +
          pill(320, y + 22, 58, 12, C.navy) +
          pill(320, y + 42, 40, 10, C.white) +
          badgeCheck(398, y + 37, 15)
      )
      .join("");
    const content = pill(262, 104, 118, 18, C.navy) + rows + pill(254, 440, 170, 48, C.blue) + check(339, 464, 22, C.white, 5);
    return {
      w: 600,
      h: 600,
      body:
        dashed(`M150 330 C 150 250, 190 232, 236 232`) +
        phone(222, 50, 230, 472, C.white, content) +
        `<g transform="rotate(-9 150 410)">` +
        card(36, 336, 236, 150, 24) +
        framedBust(54, 356, 86, 110, 16, { skin: SKIN.warm, shirt: C.blue, style: "wrap", accent: C.green }, C.ice, 0.62, 0.5) +
        pill(156, 372, 94, 14, C.navy) +
        pill(156, 398, 70, 12, C.ice) +
        pill(156, 422, 82, 12, C.ice) +
        `</g>`,
    };
  },

  "provider-step-go-live": () => {
    const seal = (cx, cy, r) =>
      [...Array(12)].map((_, i) => {
        const a = (Math.PI * 2 * i) / 12;
        return circle(cx + Math.cos(a) * r * 0.82, cy + Math.sin(a) * r * 0.82, r * 0.3, C.blue);
      }).join("") +
      circle(cx, cy, r * 0.86, C.blue) +
      check(cx, cy, r * 0.9, C.white, r * 0.18);
    return {
      w: 600,
      h: 600,
      body:
        card(110, 120, 380, 380, 40) +
        avatar(300, 232, 82, { skin: SKIN.deep, shirt: C.navy, style: "short" }) +
        pill(206, 338, 188, 22, C.navy) +
        pill(238, 374, 124, 16, C.ice) +
        pill(214, 414, 172, 54, C.green) +
        circle(248, 441, 10, C.white) +
        pill(270, 433, 92, 16, C.white) +
        seal(474, 140, 54) +
        sparkle(88, 150, 22) +
        sparkle(528, 330, 16) +
        sparkle(120, 478, 14, C.green),
    };
  },

  "provider-step-meet-clients": () => {
    const k = nid("door");
    return {
      w: 600,
      h: 600,
      body:
        pill(36, 514, 528, 14, C.ice) +
        rect(330, 110, 236, 410, 34, C.ice) +
        path(`M376 520 V292 A62 62 0 0 1 500 292 V520 Z`, C.navy, `fill-opacity=".16"`) +
        `<clipPath id="${k}"><path d="M376 520 V292 A62 62 0 0 1 500 292 V520 Z"/></clipPath>` +
        `<g clip-path="url(#${k})">${bust(438, 336, 1.22, { skin: SKIN.warm, shirt: C.green, style: "puff" })}</g>` +
        path(`M500 520 V292 Q500 250 530 236 V534 Z`, C.blue) +
        circle(516, 400, 6, C.white) +
        bust(190, 276, 1.42, { skin: SKIN.mid, shirt: C.navy, style: "short" }) +
        rect(70, 440, 128, 76, 16, C.blue) +
        pill(108, 424, 52, 24, C.blue) +
        pill(118, 430, 32, 12, C.white) +
        pill(86, 470, 96, 10, C.white, `fill-opacity=".5"`) +
        dashed(`M222 152 C 222 180, 206 186, 196 206`) +
        dashed(`M334 120 C 380 120, 420 160, 432 236`) +
        pill(110, 80, 226, 70, C.blue) +
        circle(150, 115, 22, C.white) +
        check(150, 115, 22, C.blue, 5) +
        pill(184, 100, 118, 14, C.white) +
        pill(184, 122, 76, 12, C.white, `fill-opacity=".5"`),
    };
  },

  "provider-step-get-paid": () => ({
    w: 600,
    h: 600,
    body:
      dashed(`M232 150 C 290 150, 300 186, 302 196`) +
      dashed(`M330 460 C 340 520, 380 536, 432 534`) +
      vault(56, 66, 170) +
      rect(196, 262, 288, 196, 34, C.navy, `fill-opacity=".08"`) +
      rect(196, 250, 288, 196, 34, C.blue) +
      path(`M340 250 H450 Q484 250 484 284 V412 Q484 446 450 446 H340 Z`, C.navy, SHADE) +
      rect(404, 314, 104, 68, 24, C.navy) +
      circle(440, 348, 13, C.white) +
      naira(292, 348, 74, C.white) +
      pill(300, 196, 156, 50, C.green) +
      plus(330, 221, 22, C.white) +
      pill(352, 213, 82, 16, C.white) +
      bank(500, 528, 0.95),
  }),

  "provider-escrow-before-start": () => {
    const left = rect(74, 114, 162, 362, 0, C.ice) + coin(155, 262, 48) + pill(100, 352, 110, 14, C.navy) + pill(118, 378, 74, 12, C.white) + pill(90, 410, 130, 44, C.blue);
    const right =
      rect(564, 114, 162, 362, 0, C.ice) +
      rect(582, 182, 126, 152, 26, C.green) +
      circle(645, 240, 30, C.white) +
      check(645, 240, 30, C.green, 7) +
      pill(604, 292, 82, 14, C.white) +
      pill(580, 410, 130, 44, C.blue) +
      path(`M638 420 L656 432 L638 444 Z`, C.white, `stroke="${C.white}" stroke-width="6" stroke-linejoin="round"`);
    return {
      w: 800,
      h: 600,
      body:
        dashed(`M250 262 C 290 262, 296 306, 318 306`) +
        dashed(`M486 306 C 516 306, 520 262, 552 262`) +
        phone(60, 100, 190, 390, C.ice, left) +
        vault(312, 210, 176) +
        pill(334, 132, 132, 50, C.green) +
        lock(368, 158, 26, C.white) +
        pill(392, 150, 56, 14, C.white) +
        phone(550, 100, 190, 390, C.ice, right),
    };
  },

  "provider-verification-checklist": () => {
    const rows = [160, 252, 344, 436]
      .map((y) => rect(140, y, 272, 74, 20, C.ice) + badgeCheck(178, y + 37, 19) + pill(212, y + 20, 140, 14, C.navy) + pill(212, y + 44, 90, 12, C.white))
      .join("");
    return {
      w: 800,
      h: 600,
      body:
        card(110, 84, 332, 456, 34) +
        rows +
        rect(206, 60, 140, 52, 18, C.navy) +
        circle(276, 76, 9, C.white) +
        framedBust(492, 150, 228, 280, 34, { skin: SKIN.mid, shirt: C.navy, style: "short" }, C.ice, 1.5, 0.4) +
        bracketFrame(472, 130, 268, 320, 46) +
        pill(470, 286, 272, 8, C.blue, `fill-opacity=".7"`) +
        badgeCheck(716, 418, 28),
    };
  },
};

/* ── Build ──────────────────────────────────────────────────────── */
const wrap = ({ w, h, body }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">${body}</svg>\n`;

await mkdir(SVG_DIR, { recursive: true });
await mkdir(OUT_DIR, { recursive: true });

for (const [name, build] of Object.entries(scenes)) {
  await writeFile(join(SVG_DIR, `${name}.svg`), wrap(build()));
}

const files = (await readdir(SVG_DIR)).filter((f) => f.endsWith(".svg"));
for (const f of files) {
  const svg = await readFile(join(SVG_DIR, f));
  const out = join(OUT_DIR, f.replace(/\.svg$/, ".png"));
  // SVG user units are 72dpi in librsvg → density 144 renders at exactly 2x.
  const info = await sharp(svg, { density: 144 }).png({ compressionLevel: 9 }).toFile(out);
  console.log(`${f.padEnd(40)} → ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
