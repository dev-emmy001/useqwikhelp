/**
 * Track A illustration pipeline (see asset-manifest.json, category "ILLUSTRATION").
 *
 *   node scripts/illustrations/build.mjs
 *
 * Writes each illustration as a flat, multi-layer SVG to /public/assets/images/
 * (Material-style geometry, rx >= 12, pills, dashed connectors, flat cel-shading, no outlines,
 * strict palette, no text so rendering is font-independent). Diagrams have a transparent canvas;
 * scenes (services, hero, about, contact) fill their canvas and are shown full-bleed.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, "public", "assets", "images");

/* ── Strict palette ─────────────────────────────────────────────── */
const C = { blue: "#0057FF", green: "#00B862", navy: "#082567", ice: "#E8F0FE", white: "#FFFFFF" };
const SKIN = { warm: "#8D5524", mid: "#5C3824", deep: "#3D2314" };
/** Scene accents, used sparingly: food, wood, ankara, warning. */
const X = { amber: "#FFB020", orange: "#F26B1D", wood: "#C98A4B", woodDark: "#8F5A2E", floor: "#D5E2FB", steel: "#B9C9E8" };

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

/* ── Scene kit: characters, rooms, props ────────────────────────── */

/** Thick round-capped stroke, used for limbs and tool handles. */
const limb = (d, color, w) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

/** Ankara wax-print tile, used as a fill: `url(#id)`. */
const ankara = (id, base, a, b, scale = 1) =>
  `<defs><pattern id="${id}" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="scale(${scale})">` +
  `<rect width="40" height="40" fill="${base}"/>` +
  `<circle cx="10" cy="10" r="7" fill="${a}"/><circle cx="10" cy="10" r="3" fill="${base}"/>` +
  `<path d="M30 21 L38 29 L30 37 L22 29 Z" fill="${b}"/><circle cx="30" cy="29" r="2.4" fill="${base}"/>` +
  `<circle cx="30" cy="10" r="2.6" fill="${b}"/><circle cx="10" cy="30" r="2.6" fill="${a}"/></pattern></defs>`;

/**
 * Nigerian character, waist-up or full body. Head (≈ 30*s) centred at (cx, cy).
 * hat:   short | puff | braids | wrap | hardhat | chef | cap
 * arms:  [{ side: "l"|"r", elbow: [x,y], hand: [x,y], back?, long?, sleeve?, hold?, holdFront? }] in absolute coords;
 *        `hold` is drawn under the hand (a tool handle), `holdFront` over it.
 * legs:  { floor, color, shoe } for full-body figures.
 * outfit: { apron?, vest?, buttons?, collar? }
 */
const person = (cx, cy, s, o) => {
  const S = (n) => +(n * s).toFixed(2);
  const { skin, top, hat = "short", hatFill = C.green, mood = "smile", beard = false, look = 0, arms = [], legs, torsoLen = 210 } = o;
  const shoulder = { l: [cx - S(44), cy + S(76)], r: [cx + S(44), cy + S(76)] };
  const bottom = cy + S(torsoLen);
  const torsoD = `M${cx - S(58)} ${bottom} V${cy + S(98)} Q${cx - S(58)} ${cy + S(52)} ${cx - S(28)} ${cy + S(50)} H${cx + S(28)} Q${cx + S(58)} ${cy + S(52)} ${cx + S(58)} ${cy + S(98)} V${bottom} Z`;
  const tk = nid("torso");

  const drawArm = (a) => {
    const [sx, sy] = shoulder[a.side];
    const [ex, ey] = a.elbow;
    const [hx, hy] = a.hand;
    const sleeve = a.sleeve ?? (top === C.white ? "#D9E3F5" : top);
    return (
      limb(`M${sx} ${sy} L${ex} ${ey}`, a.long ? sleeve : skin, S(a.long ? 30 : 26)) +
      limb(`M${ex} ${ey} L${hx} ${hy}`, a.long ? sleeve : skin, S(24)) +
      (a.long ? "" : limb(`M${sx} ${sy} L${sx + (ex - sx) * 0.55} ${sy + (ey - sy) * 0.55}`, sleeve, S(33))) +
      (a.hold ?? "") +
      circle(hx, hy, S(14), skin) +
      (a.holdFront ?? "")
    );
  };

  let hairBack = "";
  let hairFront = "";
  const capD = `M${cx - S(31)} ${cy - S(2)} Q${cx - S(33)} ${cy - S(40)} ${cx} ${cy - S(39)} Q${cx + S(33)} ${cy - S(40)} ${cx + S(31)} ${cy - S(2)} Q${cx + S(24)} ${cy - S(22)} ${cx} ${cy - S(24)} Q${cx - S(24)} ${cy - S(22)} ${cx - S(31)} ${cy - S(2)} Z`;
  if (["short", "puff", "braids", "hardhat", "cap"].includes(hat)) hairFront = path(capD, C.navy);
  if (hat === "puff") hairBack = circle(cx, cy - S(38), S(28), C.navy);
  if (hat === "braids") hairBack = pill(cx - S(42), cy - S(12), S(18), S(110), C.navy) + pill(cx + S(24), cy - S(12), S(18), S(110), C.navy);
  if (hat === "wrap") {
    hairFront =
      path(`M${cx - S(35)} ${cy - S(2)} Q${cx - S(44)} ${cy - S(60)} ${cx - S(4)} ${cy - S(64)} Q${cx + S(44)} ${cy - S(66)} ${cx + S(36)} ${cy - S(2)} Q${cx} ${cy - S(24)} ${cx - S(35)} ${cy - S(2)} Z`, hatFill) +
      path(`M${cx + S(4)} ${cy - S(64)} Q${cx + S(44)} ${cy - S(66)} ${cx + S(36)} ${cy - S(2)} Q${cx + S(20)} ${cy - S(16)} ${cx + S(4)} ${cy - S(20)} Z`, C.navy, `fill-opacity=".14"`) +
      path(`M${cx + S(8)} ${cy - S(56)} Q${cx + S(30)} ${cy - S(96)} ${cx + S(62)} ${cy - S(74)} Q${cx + S(52)} ${cy - S(50)} ${cx + S(26)} ${cy - S(42)} Z`, hatFill) +
      circle(cx + S(16), cy - S(54), S(11), hatFill) +
      circle(cx + S(16), cy - S(54), S(11), C.navy, `fill-opacity=".14"`);
  }
  if (hat === "hardhat") {
    hairFront +=
      path(`M${cx - S(36)} ${cy - S(16)} Q${cx - S(36)} ${cy - S(56)} ${cx} ${cy - S(58)} Q${cx + S(36)} ${cy - S(56)} ${cx + S(36)} ${cy - S(16)} Z`, hatFill) +
      path(`M${cx + S(6)} ${cy - S(58)} Q${cx + S(36)} ${cy - S(56)} ${cx + S(36)} ${cy - S(16)} H${cx + S(6)} Z`, C.navy, `fill-opacity=".12"`) +
      pill(cx - S(5), cy - S(60), S(10), S(44), C.white, `fill-opacity=".35"`) +
      pill(cx - S(46), cy - S(22), S(92), S(12), hatFill);
  }
  if (hat === "cap") {
    hairFront +=
      path(`M${cx - S(33)} ${cy - S(14)} Q${cx - S(33)} ${cy - S(52)} ${cx} ${cy - S(52)} Q${cx + S(33)} ${cy - S(52)} ${cx + S(33)} ${cy - S(14)} Z`, hatFill) +
      pill(cx - S(6), cy - S(22), S(60), S(12), hatFill) +
      path(`M${cx + S(6)} ${cy - S(52)} Q${cx + S(33)} ${cy - S(52)} ${cx + S(33)} ${cy - S(14)} H${cx + S(6)} Z`, C.navy, `fill-opacity=".12"`);
  }
  if (hat === "chef") {
    hairFront =
      path(capD, C.navy) +
      circle(cx - S(22), cy - S(50), S(20), C.white) +
      circle(cx + S(22), cy - S(50), S(20), C.white) +
      circle(cx, cy - S(62), S(24), C.white) +
      rect(cx - S(32), cy - S(44), S(64), S(26), S(8), C.white) +
      rect(cx - S(32), cy - S(28), S(64), S(10), S(5), C.navy, `fill-opacity=".1"`);
  }

  const mouth =
    mood === "unsure"
      ? stroke(`M${cx - S(8)} ${cy + S(20)} Q${cx} ${cy + S(15)} ${cx + S(8)} ${cy + S(20)}`, C.navy, S(3))
      : stroke(`M${cx - S(9)} ${cy + S(15)} Q${cx} ${cy + S(23)} ${cx + S(9)} ${cy + S(15)}`, C.white, S(3));
  const brows =
    mood === "unsure"
      ? stroke(`M${cx - S(17)} ${cy - S(9)} L${cx - S(5)} ${cy - S(12)}`, C.navy, S(3)) + stroke(`M${cx + S(5)} ${cy - S(14)} Q${cx + S(11)} ${cy - S(18)} ${cx + S(17)} ${cy - S(13)}`, C.navy, S(3))
      : "";
  const beardD = `M${cx - S(27)} ${cy + S(13)} Q${cx - S(24)} ${cy + S(40)} ${cx} ${cy + S(40)} Q${cx + S(24)} ${cy + S(40)} ${cx + S(27)} ${cy + S(13)} Q${cx + S(18)} ${cy + S(31)} ${cx} ${cy + S(31)} Q${cx - S(18)} ${cy + S(31)} ${cx - S(27)} ${cy + S(13)} Z`;

  let outfit = "";
  if (o.apron) {
    outfit +=
      path(`M${cx - S(34)} ${bottom} V${cy + S(98)} Q${cx - S(34)} ${cy + S(90)} ${cx - S(26)} ${cy + S(90)} H${cx + S(26)} Q${cx + S(34)} ${cy + S(90)} ${cx + S(34)} ${cy + S(98)} V${bottom} Z`, o.apron) +
      limb(`M${cx - S(28)} ${cy + S(94)} L${cx - S(20)} ${cy + S(54)}`, o.apron, S(7)) +
      limb(`M${cx + S(28)} ${cy + S(94)} L${cx + S(20)} ${cy + S(54)}`, o.apron, S(7)) +
      rect(cx - S(20), cy + S(130), S(40), S(30), S(8), C.navy, `fill-opacity=".14"`);
  }
  if (o.vest) {
    outfit +=
      `<g clip-path="url(#${tk})">` +
      rect(cx - S(64), cy + S(44), S(50), S(torsoLen), 0, o.vest) +
      rect(cx + S(14), cy + S(44), S(50), S(torsoLen), 0, o.vest) +
      rect(cx - S(64), cy + S(132), S(50), S(10), 0, C.white, `fill-opacity=".85"`) +
      rect(cx + S(14), cy + S(132), S(50), S(10), 0, C.white, `fill-opacity=".85"`) +
      `</g>`;
  }
  if (o.buttons) {
    outfit += [0, 1, 2].map((i) => circle(cx - S(14), cy + S(92 + i * 30), S(4.5), C.navy) + circle(cx + S(14), cy + S(92 + i * 30), S(4.5), C.navy)).join("");
  }
  if (o.strap) {
    outfit += `<g clip-path="url(#${tk})">${limb(`M${cx - S(40)} ${cy + S(50)} L${cx + S(62)} ${cy + S(220)}`, o.strap, S(13))}</g>`;
  }
  if (o.collar) {
    outfit +=
      path(`M${cx - S(26)} ${cy + S(50)} L${cx - S(4)} ${cy + S(76)} L${cx - S(18)} ${cy + S(80)} Z`, o.collar) +
      path(`M${cx + S(26)} ${cy + S(50)} L${cx + S(4)} ${cy + S(76)} L${cx + S(18)} ${cy + S(80)} Z`, o.collar);
  }

  let legsSvg = "";
  if (legs) {
    const hipY = bottom - S(16);
    const footY = legs.floor - S(16);
    legsSvg =
      limb(`M${cx - S(26)} ${hipY} L${cx - S(30)} ${footY}`, legs.color, S(40)) +
      limb(`M${cx + S(26)} ${hipY} L${cx + S(30)} ${footY}`, legs.color, S(40)) +
      limb(`M${cx + S(16)} ${hipY} L${cx + S(18)} ${footY}`, C.navy, S(14)).replace(`stroke="${C.navy}"`, `stroke="${C.navy}" stroke-opacity=".12"`) +
      pill(cx - S(62), legs.floor - S(22), S(52), S(22), legs.shoe ?? C.navy) +
      pill(cx + S(10), legs.floor - S(22), S(52), S(22), legs.shoe ?? C.navy);
  }

  return (
    arms.filter((a) => a.back).map(drawArm).join("") +
    legsSvg +
    hairBack +
    `<clipPath id="${tk}"><path d="${torsoD}"/></clipPath>` +
    path(torsoD, top) +
    path(`M${cx + S(12)} ${cy + S(50)} H${cx + S(28)} Q${cx + S(58)} ${cy + S(52)} ${cx + S(58)} ${cy + S(98)} V${bottom} H${cx + S(12)} Z`, C.navy, `fill-opacity=".1"`) +
    outfit +
    rect(cx - S(13), cy + S(18), S(26), S(34), S(11), skin) +
    rect(cx - S(13), cy + S(18), S(26), S(18), S(9), C.navy, `fill-opacity=".18"`) +
    path(`M${cx - S(20)} ${cy + S(47)} Q${cx} ${cy + S(63)} ${cx + S(20)} ${cy + S(47)} Z`, skin) +
    circle(cx - S(29), cy + S(4), S(7), skin) +
    circle(cx + S(29), cy + S(4), S(7), skin) +
    `<ellipse cx="${cx}" cy="${cy}" rx="${S(29)}" ry="${S(33)}" fill="${skin}"/>` +
    path(`M${cx + S(4)} ${cy - S(33)} A${S(29)} ${S(33)} 0 0 1 ${cx + S(4)} ${cy + S(33)} A${S(20)} ${S(33)} 0 0 0 ${cx + S(4)} ${cy - S(33)} Z`, C.navy, `fill-opacity=".12"`) +
    (beard ? path(beardD, C.navy) : "") +
    circle(cx - S(10), cy + S(2), S(4.4), C.white) +
    circle(cx + S(10), cy + S(2), S(4.4), C.white) +
    circle(cx - S(10) + S(look), cy + S(2.6), S(2.6), C.navy) +
    circle(cx + S(10) + S(look), cy + S(2.6), S(2.6), C.navy) +
    brows +
    mouth +
    hairFront +
    arms.filter((a) => !a.back).map(drawArm).join("")
  );
};

/** Small handheld phone (rounded to its own size, unlike the large `phone`). */
const handset = (x, y, w, h, screen = C.blue, content = "") => {
  const k = nid("hs");
  const b = w * 0.08;
  const r = w * 0.2;
  return (
    rect(x, y, w, h, r, C.navy) +
    `<clipPath id="${k}">${rect(x + b, y + b, w - 2 * b, h - 2 * b, r - b, "#000")}</clipPath>` +
    rect(x + b, y + b, w - 2 * b, h - 2 * b, r - b, screen) +
    `<g clip-path="url(#${k})">${content}</g>` +
    pill(x + w / 2 - w * 0.16, y + b + w * 0.04, w * 0.32, w * 0.07, C.navy)
  );
};

/** Wall tile grid lines. */
const tiles = (x, y, w, h, size, color = C.white, opacity = 0.6) => {
  let d = "";
  for (let gx = x + size; gx < x + w; gx += size) d += rect(gx - 1.5, y, 3, h, 0, color, `fill-opacity="${opacity}"`);
  for (let gy = y + size; gy < y + h; gy += size) d += rect(x, gy - 1.5, w, 3, 0, color, `fill-opacity="${opacity}"`);
  return d;
};

/** Louvre window with burglar-proof bars, as in most Nigerian homes. */
const louvre = (x, y, w, h) => {
  const slats = [];
  for (let sy = y + 22; sy < y + h - 24; sy += 26) slats.push(rect(x + 16, sy, w - 32, 14, 4, C.blue, `fill-opacity=".22"`));
  const bars = [];
  for (let bx = x + 34; bx < x + w - 20; bx += 30) bars.push(rect(bx - 2.5, y + 14, 5, h - 28, 2.5, C.navy, `fill-opacity=".55"`));
  return rect(x, y, w, h, 16, C.navy) + rect(x + 12, y + 12, w - 24, h - 24, 8, "#F7FAFF") + slats.join("") + bars.join("");
};

/** Question mark drawn as strokes (no fonts). */
const qmark = (cx, cy, s, color) =>
  stroke(`M${cx - s * 0.32} ${cy - s * 0.28} Q${cx - s * 0.3} ${cy - s * 0.66} ${cx} ${cy - s * 0.66} Q${cx + s * 0.34} ${cy - s * 0.66} ${cx + s * 0.34} ${cy - s * 0.34} Q${cx + s * 0.34} ${cy - s * 0.08} ${cx} ${cy + s * 0.02} V${cy + s * 0.18}`, color, s * 0.17) +
  circle(cx, cy + s * 0.48, s * 0.11, color);

/** Speech bubble with a tail at the bottom-left or bottom-right. */
const bubble = (x, y, w, h, fill, tail = "left") => {
  const tx = tail === "left" ? x + 34 : x + w - 34;
  const dir = tail === "left" ? -1 : 1;
  return (
    rect(x, y + 10, w, h, 26, C.navy, `fill-opacity=".08"`) +
    path(`M${tx - 14} ${y + h - 4} L${tx + dir * 14} ${y + h + 22} L${tx + 16} ${y + h - 4} Z`, fill, `stroke="${fill}" stroke-width="6" stroke-linejoin="round"`) +
    rect(x, y, w, h, 26, fill)
  );
};

const wrench = (x1, y1, x2, y2, w, color = X.orange) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const deg = (a * 180) / Math.PI;
  return (
    limb(`M${x1} ${y1} L${x2} ${y2}`, color, w) +
    `<g transform="rotate(${deg} ${x2} ${y2})">` +
    path(`M${x2 - w * 0.4} ${y2 - w * 1.3} H${x2 + w * 1.5} Q${x2 + w * 1.9} ${y2 - w * 1.3} ${x2 + w * 1.9} ${y2 - w * 0.9} V${y2 - w * 0.25} H${x2 + w * 0.7} V${y2 + w * 0.25} H${x2 + w * 1.9} V${y2 + w * 0.9} Q${x2 + w * 1.9} ${y2 + w * 1.3} ${x2 + w * 1.5} ${y2 + w * 1.3} H${x2 - w * 0.4} Z`, color) +
    `</g>`
  );
};

const hammer = (x1, y1, x2, y2, w) => {
  const deg = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    limb(`M${x1} ${y1} L${x2} ${y2}`, X.wood, w) +
    `<g transform="rotate(${deg} ${x2} ${y2})">${rect(x2 - w * 0.9, y2 - w * 2.4, w * 1.8, w * 4.2, w * 0.4, C.navy)}${rect(x2 - w * 0.9, y2 - w * 2.4, w * 1.8, w * 1.2, w * 0.4, C.white, `fill-opacity=".2"`)}</g>`
  );
};

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

  /* ── Full-bleed scenes: services, hero, about, contact ─────────── */

  "service-cook": () => {
    const steam = [536, 568, 600].map((x) => `<path d="M${x} 228 q-14 -20 0 -40 q14 -20 0 -40" fill="none" stroke="${C.blue}" stroke-opacity=".3" stroke-width="8" stroke-linecap="round"/>`).join("");
    const spoon = limb(`M446 230 L532 302`, X.wood, 9);
    return {
      w: 800,
      h: 600,
      body:
        ankara("ak-cook", X.orange, C.blue, C.green, 0.8) +
        rect(0, 0, 800, 600, 0, C.ice) +
        tiles(0, 0, 800, 430, 64) +
        louvre(586, 60, 170, 190) +
        pill(52, 134, 228, 12, C.navy) +
        rect(72, 86, 36, 48, 10, C.green) + rect(77, 76, 26, 14, 5, C.navy) +
        rect(126, 72, 40, 62, 10, X.orange) + rect(132, 62, 28, 14, 5, C.navy) +
        rect(184, 92, 36, 42, 10, C.blue) + rect(189, 82, 26, 14, 5, C.navy) +
        rect(236, 100, 28, 34, 9, X.amber) +
        steam +
        person(330, 205, 1.15, {
          skin: SKIN.warm,
          top: C.white,
          hat: "wrap",
          hatFill: "url(#ak-cook)",
          buttons: true,
          look: 4,
          arms: [
            { side: "l", elbow: [262, 364], hand: [318, 404], long: true },
            { side: "r", elbow: [416, 330], hand: [466, 247], long: true, hold: spoon },
          ],
        }) +
        // counter
        rect(0, 430, 800, 26, 0, C.white) +
        rect(0, 456, 800, 144, 0, C.blue) +
        rect(0, 456, 800, 10, 0, C.navy, `fill-opacity=".14"`) +
        [200, 400, 600].map((x) => rect(x - 2, 474, 4, 126, 2, C.navy, `fill-opacity=".2"`)).join("") +
        [170, 230, 570, 630].map((x) => pill(x - 22, 494, 44, 10, C.white, `fill-opacity=".7"`)).join("") +
        // tabletop gas stove + pot of jollof
        [508, 538, 568, 598, 628].map((x) => path(`M${x} 402 Q${x - 9} 390 ${x} 374 Q${x + 9} 390 ${x} 402 Z`, C.blue)).join("") +
        rect(452, 400, 232, 32, 10, C.navy) +
        circle(478, 416, 7, X.steel) +
        circle(658, 416, 7, X.steel) +
        pill(458, 314, 40, 14, C.navy) +
        pill(638, 314, 40, 14, C.navy) +
        rect(488, 298, 160, 86, 24, C.navy) +
        rect(568, 298, 80, 86, 24, C.white, `fill-opacity=".06"`) +
        pill(500, 320, 12, 48, C.white, `fill-opacity=".18"`) +
        path(`M494 298 Q568 236 642 298 Z`, X.orange) +
        circle(540, 282, 5, C.green) + circle(574, 268, 5, C.green) + circle(604, 284, 5, X.amber) + circle(556, 290, 4, X.amber) + circle(590, 292, 4, C.green) +
        pill(482, 290, 172, 16, C.navy) +
        // bowl of dodo
        path(`M88 398 H232 Q226 432 160 432 Q94 432 88 398 Z`, C.green) +
        path(`M160 398 H232 Q226 432 160 432 Z`, C.navy, `fill-opacity=".12"`) +
        [[112, 392, -20], [142, 386, 10], [174, 388, -8], [206, 393, 18], [158, 378, 0]]
          .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="20" ry="11" fill="${X.amber}" stroke="${X.orange}" stroke-width="4" transform="rotate(${r} ${x} ${y})"/>`)
          .join(""),
    };
  },

  "service-cleaner": () => {
    const mop =
      limb(`M486 186 L566 508`, X.steel, 10) +
      pill(528, 498, 80, 16, C.navy) +
      [0, 1, 2, 3, 4, 5].map((i) => pill(526 + i * 14, 506, 12, 32, C.white)).join("");
    return {
      w: 800,
      h: 600,
      body:
        ankara("ak-sofa", C.green, X.amber, C.white, 0.7) +
        rect(0, 0, 800, 600, 0, C.ice) +
        rect(0, 456, 800, 144, 0, X.floor) +
        tiles(0, 456, 800, 144, 100, C.white, 0.6) +
        louvre(90, 60, 190, 200) +
        // sofa with ankara cushions
        rect(52, 300, 262, 110, 32, C.blue) +
        rect(40, 380, 286, 72, 26, C.blue) +
        rect(40, 380, 286, 18, 9, C.navy, `fill-opacity=".14"`) +
        rect(76, 318, 84, 72, 20, "url(#ak-sofa)") +
        rect(176, 326, 74, 64, 20, "url(#ak-sofa)") +
        pill(62, 448, 16, 26, C.navy) +
        pill(290, 448, 16, 26, C.navy) +
        // plant
        rect(686, 410, 74, 70, 16, C.navy) +
        `<ellipse cx="704" cy="380" rx="18" ry="44" fill="${C.green}" transform="rotate(-24 704 380)"/>` +
        `<ellipse cx="744" cy="378" rx="18" ry="46" fill="${C.green}" transform="rotate(22 744 378)"/>` +
        `<ellipse cx="724" cy="360" rx="18" ry="54" fill="${C.green}"/>` +
        // shine on the fresh floor
        sparkle(196, 512, 16, C.white) +
        sparkle(330, 548, 11, C.white) +
        sparkle(660, 532, 13, C.blue) +
        pill(140, 540, 90, 8, C.white, `fill-opacity=".8"`) +
        pill(250, 516, 54, 8, C.white, `fill-opacity=".8"`) +
        // bucket
        path(`M600 470 H680 L670 536 Q668 544 660 544 H620 Q612 544 610 536 Z`, C.blue) +
        pill(594, 462, 92, 14, C.navy) +
        stroke(`M604 466 Q640 418 676 466`, C.navy, 5) +
        person(430, 176, 1, {
          skin: SKIN.deep,
          top: C.green,
          hat: "puff",
          collar: C.white,
          look: 3,
          legs: { floor: 534, color: C.navy },
          arms: [
            { side: "r", elbow: [494, 300], hand: [500, 258], hold: mop },
            { side: "l", elbow: [430, 324], hand: [516, 326] },
          ],
        }),
    };
  },

  "service-plumber": () => {
    const tank =
      rect(92, 82, 196, 176, 16, C.navy) +
      rect(104, 94, 172, 152, 8, "#F7FAFF") +
      rect(150, 120, 80, 72, 16, C.navy) +
      pill(160, 112, 60, 14, C.navy) +
      [138, 156, 174].map((y) => rect(150, y, 80, 4, 2, C.white, `fill-opacity=".18"`)).join("") +
      rect(156, 192, 6, 54, 3, C.navy, `fill-opacity=".6"`) +
      rect(218, 192, 6, 54, 3, C.navy, `fill-opacity=".6"`) +
      rect(156, 214, 68, 5, 2.5, C.navy, `fill-opacity=".6"`);
    return {
      w: 800,
      h: 600,
      body:
        rect(0, 0, 800, 600, 0, C.ice) +
        tiles(0, 0, 800, 470, 58) +
        rect(0, 470, 800, 130, 0, X.floor) +
        tank +
        // mirror, tap and basin
        rect(532, 70, 136, 156, 30, C.white) +
        pill(560, 100, 12, 70, C.ice) +
        pill(582, 96, 12, 40, C.ice) +
        rect(592, 250, 16, 44, 6, X.steel) +
        pill(570, 244, 50, 14, X.steel) +
        pill(586, 236, 28, 10, C.navy) +
        path(`M490 292 H710 Q700 364 600 366 Q500 364 490 292 Z`, C.white) +
        path(`M600 292 H710 Q700 364 600 366 Z`, C.navy, `fill-opacity=".08"`) +
        pill(484, 284, 232, 16, C.white) +
        // waste pipe and trap
        limb(`M600 364 V398 Q600 428 630 428 Q660 428 660 404 V400 H770`, X.steel, 20) +
        pill(586, 384, 28, 14, C.navy, `fill-opacity=".3"`) +
        path(`M632 450 Q622 464 632 474 Q642 464 632 450 Z`, C.blue) +
        `<ellipse cx="632" cy="512" rx="40" ry="8" fill="${C.blue}" fill-opacity=".25"/>` +
        badgeCheck(726, 330, 24) +
        // toolbox
        rect(140, 472, 140, 66, 14, X.orange) +
        rect(140, 494, 140, 8, 0, C.navy, `fill-opacity=".18"`) +
        stroke(`M180 472 V458 H240 V472`, C.navy, 8) +
        person(392, 180, 1, {
          skin: SKIN.mid,
          top: C.blue,
          apron: C.navy,
          hat: "cap",
          hatFill: C.green,
          beard: true,
          look: 4,
          legs: { floor: 548, color: C.navy },
          arms: [
            { side: "l", elbow: [318, 322], hand: [350, 366] },
            { side: "r", elbow: [494, 334], hand: [548, 398], hold: wrench(540, 400, 590, 402, 13) },
          ],
        }),
    };
  },

  "service-electrician": () => {
    const breakers = [170, 252]
      .flatMap((y, row) =>
        [0, 1, 2, 3].map((i) => {
          const on = row === 0 && i === 1;
          const x = 532 + i * 38;
          return rect(x, y, 28, 58, 8, C.white) + rect(x + 7, y + (on ? 8 : 30), 14, 20, 5, on ? C.green : C.navy);
        })
      )
      .join("");
    const driver = limb(`M516 214 L534 194`, X.orange, 14) + limb(`M534 194 L556 170`, X.steel, 5);
    return {
      w: 800,
      h: 600,
      body:
        rect(0, 0, 800, 600, 0, C.ice) +
        rect(0, 470, 800, 130, 0, X.floor) +
        // bulb powered by the inverter
        rect(222, 0, 4, 70, 2, C.navy) +
        circle(224, 112, 56, X.amber, `fill-opacity=".18"`) +
        rect(212, 66, 24, 22, 6, C.navy) +
        circle(224, 110, 26, X.amber) +
        [-60, -20, 20, 60].map((a) => `<g transform="rotate(${a} 224 110)">${pill(220, 30, 8, 18, X.amber)}</g>`).join("") +
        [120, 240].map((a) => `<g transform="rotate(${a} 224 110)">${pill(220, 30, 8, 18, X.amber)}</g>`).join("") +
        // distribution board
        rect(504, 120, 200, 236, 26, C.navy) +
        rect(518, 150, 172, 192, 14, C.white, `fill-opacity=".08"`) +
        pill(560, 132, 88, 8, C.white, `fill-opacity=".3"`) +
        breakers +
        // cable to inverter
        limb(`M604 356 V430 Q604 446 588 446 H316`, C.navy, 7) +
        // inverter on its battery
        rect(150, 452, 150, 72, 16, C.navy) +
        pill(170, 442, 22, 14, X.orange) +
        pill(256, 442, 22, 14, C.navy) +
        path(`M232 470 L218 492 H230 L222 510 L242 484 H230 Z`, X.amber) +
        rect(156, 338, 138, 108, 18, C.white) +
        rect(174, 356, 64, 36, 8, C.navy) +
        pill(182, 368, 40, 10, C.green) +
        circle(262, 364, 7, C.green) +
        circle(262, 384, 7, X.amber) +
        [408, 420].map((y) => pill(174, y, 102, 6, C.ice)).join("") +
        person(410, 186, 1, {
          skin: SKIN.deep,
          top: C.blue,
          vest: C.green,
          hat: "hardhat",
          hatFill: X.amber,
          look: 4,
          legs: { floor: 548, color: C.navy },
          arms: [
            { side: "l", elbow: [332, 316], hand: [366, 360] },
            { side: "r", elbow: [500, 262], hand: [522, 208], hold: driver },
          ],
        }),
    };
  },

  "service-ac": () => {
    const air = [610, 670].map((x) => `<path d="M${x} 222 q18 16 0 32 q-18 16 0 32" fill="none" stroke="${C.blue}" stroke-opacity=".45" stroke-width="7" stroke-linecap="round"/>`).join("");
    const flake = (cx, cy, s) => [0, 60, 120].map((a) => `<g transform="rotate(${a} ${cx} ${cy})">${pill(cx - 2.5, cy - s, 5, s * 2, C.blue)}</g>`).join("");
    const gauge = circle(318, 444, 26, C.navy) + circle(318, 444, 19, C.white) + stroke(`M318 444 L328 432`, X.orange, 4);
    const driver = limb(`M468 226 L476 208`, X.orange, 13) + limb(`M476 208 L484 190`, X.steel, 5);
    return {
      w: 800,
      h: 600,
      body:
        rect(0, 0, 800, 600, 0, C.ice) +
        rect(0, 484, 800, 116, 0, X.floor) +
        // split unit
        rect(420, 92, 330, 108, 32, C.navy, `fill-opacity=".08"`) +
        rect(420, 82, 330, 108, 32, C.white) +
        pill(452, 164, 266, 10, C.navy, `fill-opacity=".14"`) +
        pill(672, 110, 40, 12, C.blue) +
        circle(660, 116, 4, C.green) +
        air +
        flake(730, 262, 13) +
        flake(560, 268, 9) +
        // condenser
        pill(578, 508, 26, 14, C.navy) +
        pill(714, 508, 26, 14, C.navy) +
        rect(560, 366, 196, 144, 22, C.white) +
        circle(636, 438, 50, X.steel) +
        circle(636, 438, 36, C.white, `fill-opacity=".5"`) +
        [0, 120, 240].map((a) => `<ellipse cx="636" cy="414" rx="10" ry="22" fill="${C.navy}" fill-opacity=".55" transform="rotate(${a} 636 438)"/>`).join("") +
        circle(636, 438, 7, C.navy) +
        [392, 412, 432, 452, 472].map((y) => pill(700, y, 40, 8, C.ice)).join("") +
        // hose from gauge to condenser
        limb(`M318 470 Q380 560 566 470`, C.navy, 6) +
        // toolbox
        rect(110, 486, 120, 58, 14, X.orange) +
        stroke(`M146 486 V472 H194 V486`, C.navy, 8) +
        person(360, 248, 1, {
          skin: SKIN.warm,
          top: C.green,
          collar: C.white,
          hat: "cap",
          hatFill: C.blue,
          look: 4,
          legs: { floor: 560, color: C.navy },
          arms: [
            { side: "l", elbow: [290, 392], hand: [306, 438], holdFront: gauge },
            { side: "r", elbow: [452, 290], hand: [466, 232], hold: driver },
          ],
        }),
    };
  },

  "service-carpenter": () => {
    const tools =
      rect(52, 70, 228, 170, 22, C.white) +
      [...Array(5)].flatMap((_, r) => [...Array(8)].map((_, c) => circle(74 + c * 26, 92 + r * 32, 3.5, C.ice))).join("") +
      path(`M86 116 H196 L178 176 ${[...Array(9)].map((_, i) => `L${168 - i * 10} ${i % 2 ? 176 : 184}`).join(" ")} L86 176 Z`, X.steel) +
      rect(70, 112, 30, 52, 10, X.wood) +
      rect(214, 104, 12, 100, 6, X.wood) +
      rect(200, 98, 40, 22, 6, C.navy) +
      pill(80, 198, 180, 16, X.amber);
    const shaving = (x, y, r) => `<path d="M${x} ${y} a10 10 0 1 1 10 10" fill="none" stroke="${X.wood}" stroke-width="5" stroke-linecap="round" transform="rotate(${r} ${x} ${y})"/>`;
    return {
      w: 800,
      h: 600,
      body:
        rect(0, 0, 800, 600, 0, C.ice) +
        rect(0, 504, 800, 96, 0, X.floor) +
        tools +
        // finished door leaning on the wall
        rect(660, 150, 120, 360, 16, X.wood) +
        rect(678, 172, 84, 140, 10, X.woodDark, `fill-opacity=".5"`) +
        rect(678, 330, 84, 160, 10, X.woodDark, `fill-opacity=".5"`) +
        circle(672, 330, 7, X.amber) +
        person(380, 200, 1.1, {
          torsoLen: 182,
          skin: SKIN.deep,
          top: C.blue,
          apron: X.woodDark,
          hat: "cap",
          hatFill: C.green,
          beard: true,
          look: 5,
          arms: [
            { side: "l", elbow: [326, 352], hand: [432, 346] },
            { side: "r", elbow: [500, 262], hand: [526, 204], hold: hammer(520, 220, 558, 158, 12) },
          ],
        }) +
        // bench, plank, nail
        rect(220, 354, 300, 26, 8, "#E3B27A") +
        rect(220, 354, 300, 8, 4, C.white, `fill-opacity=".25"`) +
        rect(556, 326, 6, 30, 3, C.navy) +
        pill(548, 322, 22, 8, C.navy) +
        rect(200, 380, 440, 30, 10, X.wood) +
        rect(200, 404, 440, 14, 0, X.woodDark) +
        rect(222, 418, 24, 90, 8, X.woodDark) +
        rect(594, 418, 24, 90, 8, X.woodDark) +
        rect(240, 456, 360, 14, 7, X.woodDark, `fill-opacity=".7"`) +
        shaving(300, 530, 0) +
        shaving(356, 548, 120) +
        shaving(470, 534, 220) +
        shaving(600, 370, 60),
    };
  },

  "hero-pro-arriving-with-phone": () => {
    const screen =
      circle(616, 398, 40, C.green) +
      check(616, 398, 38, C.white, 9) +
      pill(570, 458, 92, 14, C.white) +
      pill(584, 482, 64, 12, C.white, `fill-opacity=".55"`) +
      pill(560, 514, 112, 32, C.white);
    return {
      w: 800,
      h: 800,
      body:
        rect(0, 0, 800, 800, 0, C.ice) +
        circle(430, 420, 300, C.white, `fill-opacity=".55"`) +
        // front door
        rect(60, 180, 200, 520, 22, C.white) +
        rect(80, 200, 160, 500, 14, C.blue) +
        rect(100, 226, 120, 180, 10, C.navy, `fill-opacity=".16"`) +
        rect(100, 428, 120, 240, 10, C.navy, `fill-opacity=".16"`) +
        circle(220, 450, 9, X.amber) +
        rect(0, 690, 800, 110, 0, X.floor) +
        // plant
        rect(650, 580, 100, 110, 20, C.navy) +
        `<ellipse cx="672" cy="540" rx="22" ry="56" fill="${C.green}" transform="rotate(-24 672 540)"/>` +
        `<ellipse cx="728" cy="536" rx="22" ry="58" fill="${C.green}" transform="rotate(22 728 536)"/>` +
        `<ellipse cx="700" cy="516" rx="22" ry="66" fill="${C.green}"/>` +
        person(420, 318, 1.55, {
          skin: SKIN.mid,
          top: C.navy,
          collar: C.white,
          strap: X.orange,
          beard: true,
          look: 2,
          torsoLen: 320,
          arms: [
            { side: "l", elbow: [286, 400], hand: [300, 292] },
            { side: "r", elbow: [560, 600], hand: [556, 540], hold: handset(546, 330, 140, 252, C.blue, screen) },
          ],
        }) +
        stroke(`M262 262 Q252 284 262 306`, C.navy, 6) +
        stroke(`M244 252 Q228 284 244 316`, C.navy, 6) +
        // verified chip
        card(540, 120, 210, 84, 26) +
        badgeCheck(586, 162, 22) +
        pill(620, 146, 104, 14, C.navy) +
        pill(620, 170, 70, 12, C.ice) +
        // rating chip
        card(96, 570, 220, 72, 24) +
        [0, 1, 2, 3, 4].map((i) => star(130 + i * 38, 606, 13, X.amber)).join(""),
    };
  },

  "about-cautious-homeowner": () => {
    const screen = pill(410, 300, 44, 8, C.white) + pill(410, 316, 30, 8, C.white, `fill-opacity=".55"`) + rect(410, 340, 60, 30, 8, C.white);
    return {
      w: 800,
      h: 600,
      body:
        ankara("ak-about", C.blue, X.amber, C.white, 0.75) +
        rect(0, 0, 800, 600, 0, C.ice) +
        circle(300, 330, 230, C.white, `fill-opacity=".55"`) +
        // plant
        rect(40, 470, 90, 130, 18, C.navy) +
        `<ellipse cx="62" cy="430" rx="20" ry="52" fill="${C.green}" transform="rotate(-24 62 430)"/>` +
        `<ellipse cx="110" cy="428" rx="20" ry="54" fill="${C.green}" transform="rotate(22 110 428)"/>` +
        `<ellipse cx="86" cy="410" rx="20" ry="62" fill="${C.green}"/>` +
        dashed(`M486 286 C 520 250, 520 210, 540 196`) +
        dashed(`M486 330 C 520 330, 540 330, 566 320`) +
        person(300, 222, 1.3, {
          skin: SKIN.warm,
          top: "url(#ak-about)",
          hat: "braids",
          mood: "unsure",
          look: 4,
          torsoLen: 300,
          arms: [
            { side: "r", elbow: [404, 452], hand: [426, 394], hold: handset(396, 268, 92, 150, C.navy, screen) },
            { side: "l", elbow: [210, 430], hand: [282, 290] },
          ],
        }) +
        // "Pay ₦… upfront?" message
        bubble(520, 84, 240, 108, C.white, "left") +
        coin(578, 138, 30) +
        pill(622, 118, 112, 16, C.navy) +
        pill(622, 146, 76, 14, C.ice) +
        bubble(566, 252, 150, 104, C.blue, "left") +
        qmark(641, 306, 70, C.white) +
        qmark(170, 104, 54, X.orange) +
        qmark(112, 176, 34, C.blue),
    };
  },

  "contact-reading-message": () => {
    const screen =
      rect(452, 444, 60, 22, 10, C.ice) +
      rect(474, 474, 50, 22, 10, C.blue) +
      rect(452, 504, 64, 22, 10, C.ice) +
      rect(468, 534, 56, 22, 10, C.blue);
    return {
      w: 800,
      h: 800,
      body:
        ankara("ak-contact", C.green, C.white, X.amber, 0.9) +
        rect(0, 0, 800, 800, 0, C.ice) +
        circle(380, 440, 300, C.white, `fill-opacity=".55"`) +
        person(330, 330, 1.6, {
          skin: SKIN.deep,
          top: C.blue,
          hat: "wrap",
          hatFill: "url(#ak-contact)",
          look: 5,
          torsoLen: 300,
          arms: [
            { side: "l", elbow: [316, 668], hand: [440, 602] },
            { side: "r", elbow: [470, 650], hand: [458, 590], hold: handset(436, 420, 104, 188, C.white, screen) },
          ],
        }) +
        bubble(510, 110, 250, 96, C.white, "left") +
        pill(540, 140, 150, 14, C.navy) +
        pill(540, 166, 100, 12, C.ice) +
        bubble(550, 246, 210, 84, C.blue, "right") +
        pill(578, 272, 110, 14, C.white) +
        check(712, 296, 18, C.white, 4) +
        check(724, 296, 18, C.white, 4) +
        pill(578, 296, 70, 12, C.white, `fill-opacity=".5"`) +
        bubble(590, 380, 150, 64, C.white, "left") +
        circle(632, 412, 8, C.navy, `fill-opacity=".35"`) +
        circle(664, 412, 8, C.navy, `fill-opacity=".55"`) +
        circle(696, 412, 8, C.navy, `fill-opacity=".75"`) +
        sparkle(120, 170, 22) +
        sparkle(160, 240, 12, C.green) +
        sparkle(700, 560, 16, C.green),
    };
  },

  /** Provider hero: four pros, waist-up, flush with the bottom edge (transparent canvas). */
  "provider-hero-pros": () => {
    const coil =
      `<circle cx="566" cy="560" r="58" fill="none" stroke="${X.orange}" stroke-width="16"/>` +
      `<circle cx="566" cy="560" r="38" fill="none" stroke="${C.navy}" stroke-width="12"/>`;
    const proPhone = handset(1030, 330, 124, 226, C.blue, circle(1092, 430, 34, C.white) + check(1092, 430, 32, C.blue, 8) + pill(1058, 486, 68, 12, C.white, `fill-opacity=".6"`));
    return {
      w: 1600,
      h: 900,
      body:
        person(300, 310, 2.1, {
          skin: SKIN.warm,
          top: C.white,
          hat: "chef",
          buttons: true,
          torsoLen: 290,
          arms: [
            { side: "r", elbow: [404, 640], hand: [246, 618], long: true },
            { side: "l", elbow: [196, 636], hand: [354, 610], long: true },
          ],
        }) +
        person(640, 300, 2.1, {
          skin: SKIN.mid,
          top: C.navy,
          vest: C.green,
          hat: "hardhat",
          hatFill: X.amber,
          beard: true,
          torsoLen: 290,
          arms: [
            { side: "l", elbow: [520, 640], hand: [566, 600], back: false, hold: coil },
            { side: "r", elbow: [756, 650], hand: [730, 760] },
          ],
        }) +
        person(970, 300, 2.1, {
          skin: SKIN.deep,
          top: C.blue,
          apron: C.navy,
          torsoLen: 290,
          arms: [
            { side: "l", elbow: [860, 640], hand: [884, 750], hold: wrench(884, 750, 900, 860, 18) },
            { side: "r", elbow: [1110, 640], hand: [1060, 548], hold: proPhone },
          ],
        }) +
        person(1300, 310, 2.1, {
          skin: SKIN.warm,
          top: C.green,
          apron: X.woodDark,
          hat: "cap",
          hatFill: C.navy,
          beard: true,
          torsoLen: 290,
          arms: [
            { side: "l", elbow: [1190, 650], hand: [1236, 760] },
            { side: "r", elbow: [1430, 640], hand: [1412, 540], hold: hammer(1414, 560, 1390, 400, 16) },
          ],
        }),
    };
  },
};

/* ── Build ──────────────────────────────────────────────────────── */
const wrap = ({ w, h, body }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">${body}</svg>\n`;

await mkdir(OUT_DIR, { recursive: true });

const only = process.argv.slice(2);
for (const [name, build] of Object.entries(scenes)) {
  if (only.length && !only.includes(name)) continue;
  const svg = wrap(build());
  await writeFile(join(OUT_DIR, `${name}.svg`), svg);
  console.log(`${`${name}.svg`.padEnd(40)} ${(svg.length / 1024).toFixed(1)}KB`);
}
