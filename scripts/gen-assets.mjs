/**
 * Generates clean, palette-derived PLACEHOLDER vector assets for every brand
 * into src/brands/<slug>/ so the site renders before real Midjourney/Firefly
 * selects arrive. Pure SVG — no native image deps.
 *
 *   - logo.svg    : geometric mark keyed to `logoDirection`
 *   - texture.svg : repeating motif keyed to `pattern`
 *
 * Photo slots (hero.jpg / secondary.jpg) and og.png are intentionally NOT
 * faked as raster here: until real selects exist, BrandImage renders a
 * palette gradient placeholder at runtime and BaseHead omits og:image.
 * All of this is tracked in ASSETS.md.
 *
 * Run: npm run gen:assets
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { brandList } from "../brands.config.ts";

const root = path.dirname(fileURLToPath(import.meta.url));
const brandsDir = path.resolve(root, "../src/brands");

/** Pick a motif family from the brand's pattern/logoDirection text. */
function motifKind(b) {
  const s = `${b.pattern} ${b.logoDirection}`.toLowerCase();
  if (/(chevron|spear|arrow field|forward)/.test(s)) return "chevron";
  if (/(facet|blade|diamond|grid line|angular)/.test(s)) return "facet";
  if (/(contour|ridge|topograph|peak|summit)/.test(s)) return "ridge";
  if (/(coordinate|waypoint|route|map)/.test(s)) return "waypoint";
  if (/(opposing|return|counter|two .*arrow)/.test(s)) return "counter";
  if (/(loop|arc|rounded)/.test(s)) return "loop";
  return "loop";
}

/** Simple geometric logo mark per motif (single primary color). */
function logoMark(b) {
  const c = b.color.primary;
  const marks = {
    loop: `<path d="M18 26c0-6 5-11 11-11s11 5 11 11-5 11-11 11" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/><circle cx="40" cy="40" r="3.4" fill="${c}"/>`,
    ridge: `<path d="M10 42 L26 18 L34 30 L46 12 L54 42 Z" fill="${c}"/>`,
    chevron: `<path d="M14 16 L30 32 L14 48 M28 16 L44 32 L28 48" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,
    facet: `<path d="M32 10 L50 28 L32 54 L14 28 Z" fill="none" stroke="${c}" stroke-width="5"/><path d="M32 10 L32 54 M14 28 L50 28" stroke="${c}" stroke-width="2"/>`,
    waypoint: `<path d="M18 14 L32 30 L46 14 M18 50 L32 34 L46 50" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="32" r="3.4" fill="${c}"/>`,
    counter: `<path d="M14 24 H44 L36 16 M50 40 H20 L28 48" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
  };
  return marks[motifKind(b)] ?? marks.loop;
}

function logoSvg(b) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="${esc(b.name)} placeholder logo">
  <rect width="64" height="64" rx="14" fill="${b.color.light}"/>
  ${logoMark(b)}
</svg>`;
}

/** Tiling motif used by texture.svg. */
function motifTile(b, stroke) {
  const tiles = {
    loop: `<path d="M0 30 C0 14 14 0 30 0 M30 60 C46 60 60 46 60 30" fill="none" stroke="${stroke}" stroke-width="2"/>`,
    ridge: `<path d="M0 50 L20 20 L30 34 L45 12 L60 40" fill="none" stroke="${stroke}" stroke-width="2"/>`,
    chevron: `<path d="M0 20 L20 40 L0 60 M20 0 L40 20 L20 40 M40 20 L60 40 L40 60" fill="none" stroke="${stroke}" stroke-width="2"/>`,
    facet: `<path d="M30 4 L56 30 L30 56 L4 30 Z M0 0 L60 60 M60 0 L0 60" fill="none" stroke="${stroke}" stroke-width="1.4"/>`,
    waypoint: `<path d="M0 0 H60 V60 M0 0 V60 H60 M14 14 L30 30 L46 14" fill="none" stroke="${stroke}" stroke-width="1.4"/><circle cx="30" cy="30" r="3" fill="${stroke}"/>`,
    counter: `<path d="M6 22 H40 L32 14 M54 38 H20 L28 46" fill="none" stroke="${stroke}" stroke-width="1.8"/>`,
  };
  return tiles[motifKind(b)] ?? tiles.loop;
}

function textureSvg(b) {
  const tint = mix(b.color.primary, b.color.light, 0.78);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <rect width="120" height="120" fill="${b.color.light}"/>
  <defs><pattern id="p" width="60" height="60" patternUnits="userSpaceOnUse">${motifTile(b, tint)}</pattern></defs>
  <rect width="120" height="120" fill="url(#p)"/>
</svg>`;
}

/** Hex blend a->b by t (0..1). */
function mix(a, b, t) {
  const pa = hx(a), pb = hx(b);
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
function hx(h) {
  const s = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function run() {
  let count = 0;
  for (const b of brandList) {
    const dir = path.join(brandsDir, b.slug);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "logo.svg"), logoSvg(b));
    await writeFile(path.join(dir, "texture.svg"), textureSvg(b));
    count++;
    console.log(`  ${b.slug}: logo.svg + texture.svg`);
  }
  console.log(`\nGenerated vector placeholders for ${count} brands.`);
  console.log("Photo (hero.jpg/secondary.jpg) and og.png slots use runtime placeholders — see ASSETS.md.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
