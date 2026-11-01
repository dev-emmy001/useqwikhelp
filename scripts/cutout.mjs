/**
 * Background removal with sharp (no Python / rembg needed) for images shot on a SOLID background.
 *
 *   node scripts/cutout.mjs <input> <output.png> [--tol=28] [--soft=60] [--holes] [--pad=24]
 *
 * How it works:
 *  1. Detects the background colour from the image border (median).
 *  2. Flood-fills inward from every border pixel through pixels within `tol` of that colour
 *     → only background connected to the edge is removed, so white clothing inside the subject survives.
 *  3. Softens the 1px ring next to the removed area (alpha from colour distance, up to `soft`)
 *     and un-blends the background colour out of it, so there is no white/black halo.
 *  4. --holes: also clears enclosed background pockets (e.g. the gap between an arm and the body)
 *     that are very close to the background colour and at least 0.15% of the image.
 *  5. Trims to the subject and adds `pad` px of transparent margin.
 *
 * Limits vs. an AI matting model (rembg): wispy hair, soft drop shadows, and subject edges that are the
 * same colour as the background can be cut or left fringed. Generate on pure #FFFFFF with crisp edges.
 */
import sharp from "sharp";

const [input, output, ...flags] = process.argv.slice(2);
if (!input || !output) {
  console.error("usage: node scripts/cutout.mjs <input> <output.png> [--tol=28] [--soft=60] [--holes] [--pad=24]");
  process.exit(1);
}
const opt = Object.fromEntries(
  flags.map((f) => {
    const [k, v] = f.replace(/^--/, "").split("=");
    return [k, v === undefined ? true : Number(v)];
  })
);
const TOL = opt.tol ?? 28;
const SOFT = opt.soft ?? 60;
const PAD = opt.pad ?? 24;

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const N = w * h;

// 1. Background colour = per-channel median of border pixels
const border = [];
for (let x = 0; x < w; x++) border.push(x, (h - 1) * w + x);
for (let y = 0; y < h; y++) border.push(y * w, y * w + w - 1);
const median = (ch) => {
  const v = border.map((i) => data[i * 4 + ch]).sort((a, b) => a - b);
  return v[v.length >> 1];
};
const bg = [median(0), median(1), median(2)];
const dist = (i) =>
  Math.max(Math.abs(data[i * 4] - bg[0]), Math.abs(data[i * 4 + 1] - bg[1]), Math.abs(data[i * 4 + 2] - bg[2]));

// 2. Flood fill from the border
const isBg = new Uint8Array(N);
const queue = new Int32Array(N);
let head = 0;
let tail = 0;
for (const i of border) {
  if (!isBg[i] && dist(i) <= TOL) {
    isBg[i] = 1;
    queue[tail++] = i;
  }
}
const visit = (j) => {
  if (!isBg[j] && dist(j) <= TOL) {
    isBg[j] = 1;
    queue[tail++] = j;
  }
};
while (head < tail) {
  const i = queue[head++];
  const x = i % w;
  if (x > 0) visit(i - 1);
  if (x < w - 1) visit(i + 1);
  if (i >= w) visit(i - w);
  if (i < N - w) visit(i + w);
}

// 4. Optional: enclosed pockets of near-exact background colour
if (opt.holes) {
  const HOLE_TOL = Math.min(TOL, 10);
  const minArea = Math.round(N * 0.0015);
  const seen = new Uint8Array(N);
  for (let s = 0; s < N; s++) {
    if (isBg[s] || seen[s] || dist(s) > HOLE_TOL) continue;
    const comp = [s];
    seen[s] = 1;
    for (let k = 0; k < comp.length; k++) {
      const i = comp[k];
      const x = i % w;
      for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, i - w, i + w]) {
        if (j >= 0 && j < N && !seen[j] && !isBg[j] && dist(j) <= HOLE_TOL) {
          seen[j] = 1;
          comp.push(j);
        }
      }
    }
    if (comp.length >= minArea) for (const i of comp) isBg[i] = 1;
  }
}

// 3. Alpha + edge softening / colour un-blending
let minX = w, minY = h, maxX = -1, maxY = -1;
for (let i = 0; i < N; i++) {
  const o = i * 4;
  if (isBg[i]) {
    data[o + 3] = 0;
    continue;
  }
  const x = i % w;
  const touchesBg =
    (x > 0 && isBg[i - 1]) || (x < w - 1 && isBg[i + 1]) || (i >= w && isBg[i - w]) || (i < N - w && isBg[i + w]);
  if (touchesBg) {
    const a = Math.min(1, Math.max(0.15, (dist(i) - TOL) / (SOFT - TOL)));
    for (let c = 0; c < 3; c++) {
      data[o + c] = Math.max(0, Math.min(255, Math.round((data[o + c] - bg[c] * (1 - a)) / a)));
    }
    data[o + 3] = Math.round(a * data[o + 3]);
  }
  const y = (i / w) | 0;
  if (x < minX) minX = x;
  if (x > maxX) maxX = x;
  if (y < minY) minY = y;
  if (y > maxY) maxY = y;
}
if (maxX < 0) {
  console.error("Nothing left after removing the background — try a lower --tol.");
  process.exit(1);
}

// 5. Trim + pad, write PNG
await sharp(data, { raw: { width: w, height: h, channels: 4 } })
  .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
  .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(output);

const removed = isBg.reduce((s, v) => s + v, 0);
console.log(
  `${output}: bg rgb(${bg.join(",")}), removed ${((removed / N) * 100).toFixed(1)}% of pixels, ` +
    `out ${maxX - minX + 1 + PAD * 2}×${maxY - minY + 1 + PAD * 2}`
);
