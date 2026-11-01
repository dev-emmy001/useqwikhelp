/**
 * Real-photo pipeline for asset-manifest.json "PHOTO_CUTOUT" slots.
 *
 *   1. Drop photos in /photos-raw/ named after the manifest id, any of .jpg .jpeg .png .webp .heic
 *      e.g. photos-raw/service-cook.jpg  →  public/assets/images/service-cook.png
 *   2. node scripts/process-photos.mjs            (all photos found)
 *      node scripts/process-photos.mjs service-cook   (just one)
 *
 * Each photo: auto-rotate (EXIF) → background removal (scripts/cutout.mjs) → longest edge capped
 * at 1600px (2x retina for the ~800px frames) → transparent PNG.
 * Prints which manifest slots are still missing a photo.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const RAW = join(ROOT, "photos-raw");
const WORK = join(ROOT, "tmp-svgs", "photo-work"); // already git-ignored
const OUT = join(ROOT, "public", "assets", "images");
const MAX_EDGE = 1600;
const EXTS = [".jpg", ".jpeg", ".png", ".webp", ".heic"];

mkdirSync(RAW, { recursive: true });
mkdirSync(WORK, { recursive: true });
mkdirSync(OUT, { recursive: true });

const manifest = JSON.parse(readFileSync(join(ROOT, "asset-manifest.json"), "utf8"));
const wanted = manifest.assets
  .filter((a) => a.category === "PHOTO_CUTOUT" && !a.reuses && a.status !== "inactive" && a.status !== "keep")
  .map((a) => parse(a.id).name);

const only = process.argv[2];
const rawFiles = readdirSync(RAW).filter((f) => EXTS.includes(parse(f).ext.toLowerCase()));
const done = [];

for (const file of rawFiles) {
  const name = parse(file).name;
  if (only && name !== only) continue;
  if (!wanted.includes(name)) {
    console.warn(`skip  ${file}  (not a PHOTO_CUTOUT id in asset-manifest.json)`);
    continue;
  }
  const upright = join(WORK, `${name}.upright.png`);
  const cut = join(WORK, `${name}.cut.png`);
  const final = join(OUT, `${name}.png`);

  await sharp(join(RAW, file)).rotate().png().toFile(upright); // apply EXIF orientation
  execFileSync(process.execPath, [join(ROOT, "scripts", "cutout.mjs"), upright, cut, "--holes", "--pad=32"], {
    stdio: "inherit",
  });
  const info = await sharp(cut)
    .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(final);
  done.push(name);
  console.log(`done  ${file} → public/assets/images/${name}.png  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB\n`);
}

const have = new Set(wanted.filter((n) => existsSync(join(OUT, `${n}.png`))));
const missing = wanted.filter((n) => !have.has(n));
console.log(`processed ${done.length} photo(s).`);
console.log(missing.length ? `still missing: ${missing.join(", ")}` : "all photo slots have a cut-out.");
