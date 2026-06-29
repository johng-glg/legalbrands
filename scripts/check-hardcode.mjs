/**
 * Guardrail for the core promise: no hardcoded hex colors or brand font names
 * in templates. Scans src/ (excluding lib/brand.ts + env which legitimately
 * touch raw tokens) for hex literals and config font names. Exit 1 on a hit.
 *
 * Run: npm run check:hardcode
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { brandList } from "../brands.config.ts";

const SRC = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../src");

// Files allowed to reference raw tokens (the theming boundary).
const ALLOW = new Set(["lib/brand.ts", "lib/assets.ts", "env.d.ts"]);

const fontNames = [
  ...new Set(brandList.flatMap((b) => [b.type.headline, b.type.body])),
];

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(astro|ts|css|mjs)$/.test(e.name)) yield p;
  }
}

const hexRe = /#[0-9a-fA-F]{6}\b/g;
let problems = 0;

for await (const file of walk(SRC)) {
  const rel = path.relative(SRC, file).replace(/\\/g, "/");
  if (ALLOW.has(rel)) continue;
  const text = await readFile(file, "utf8");

  const hexes = text.match(hexRe);
  if (hexes) {
    console.error(`✗ ${rel}: hardcoded hex ${[...new Set(hexes)].join(", ")}`);
    problems++;
  }
  for (const fn of fontNames) {
    // Match the font NAME used as a CSS/font value, not in comments/prose.
    const re = new RegExp(`["'\`]${fn}["'\`]|font-family:[^;\\n]*${fn}`, "i");
    if (re.test(text)) {
      console.error(`✗ ${rel}: hardcoded font name "${fn}"`);
      problems++;
    }
  }
}

if (problems) {
  console.error(`\n${problems} hardcoding issue(s) found.`);
  process.exit(1);
} else {
  console.log("✓ No hardcoded hex or font names in templates.");
}
