/**
 * Free stock photos for the PHOTO slots (shown full-bleed, so no cut-out needed).
 *
 *   node scripts/stock-photos.mjs
 *
 * Downloads each photo from Pexels, blurs third-party branding where listed, caps the longest
 * edge at 1600px and writes an optimised JPG to /public/assets/images/<slot>.jpg.
 *
 * License: Pexels License — free for commercial use, no attribution required, no watermark.
 * Restrictions: don't imply the people pictured endorse QwikHelp; don't show them in a bad light.
 * No model releases are guaranteed — replace with real QwikHelp pros (signed releases) before
 * using faces as testimonials or proof. Credits kept below anyway.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const OUT = join(process.cwd(), "public", "assets", "images");
const MAX_EDGE = 1600;

/** blur: regions in the 1600px-wide source download, [left, top, width, height] */
export const PHOTOS = [
  { slot: "hero-pro-arriving-with-phone", id: 4042144, by: "Sylvester Orji", focus: "top" },
  { slot: "about-cautious-homeowner", id: 10081921, by: "ilabappa", focus: "center" },
  { slot: "service-cook", id: 32224391, by: "Tochukwu Ekeh", focus: "top" },
  { slot: "service-cleaner", id: 4353622, by: "Ketut Subiyanto", focus: "center" },
  { slot: "service-plumber", id: 8486978, by: "Kindel Media", focus: "top" },
  {
    slot: "service-electrician",
    id: 39125909,
    by: "imma-syfa",
    focus: "top",
    blur: [[930, 1540, 380, 280]], // "Chafas Institute of Practical Studies" vest emblem
  },
  { slot: "service-ac-technician", id: 5463582, by: "José Andrés Pacheco Cortes", focus: "center" },
  {
    slot: "service-carpenter",
    id: 20853365,
    by: "Illustrate Digital",
    focus: "center",
    blur: [
      [470, 1750, 140, 350], // left "WORKAID" tape
      [840, 1780, 140, 370], // right "WORKAID" tape
      [560, 1985, 460, 115], // handwriting
    ],
  },
  { slot: "contact-reading-message", id: 31826813, by: "darkshadephotos", focus: "center" },
];

const url = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

await mkdir(OUT, { recursive: true });

for (const p of PHOTOS) {
  const res = await fetch(url(p.id));
  if (!res.ok) throw new Error(`${p.slot}: HTTP ${res.status}`);
  let buf = Buffer.from(await res.arrayBuffer());

  for (const [left, top, width, height] of p.blur ?? []) {
    const patch = await sharp(buf).extract({ left, top, width, height }).blur(28).toBuffer();
    buf = await sharp(buf).composite([{ input: patch, left, top }]).toBuffer();
  }

  const info = await sharp(buf)
    .rotate()
    .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(join(OUT, `${p.slot}.jpg`));
  console.log(`${p.slot.padEnd(30)} ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB  (pexels ${p.id}, ${p.by})`);
}

await writeFile(
  join(OUT, "CREDITS.md"),
  `# Photo credits\n\nPexels License (free commercial use, no attribution required). Downloaded by scripts/stock-photos.mjs.\n\n` +
    PHOTOS.map((p) => `- \`${p.slot}.jpg\`: ${p.by}, https://www.pexels.com/photo/${p.id}/`).join("\n") +
    "\n"
);
