/**
 * Active-brand resolver. Single place that reads the BRAND env var and
 * exposes the matching tokens from brands.config.ts. Every template imports
 * `brand` from here — never the raw config map — so the active selection is
 * decided in exactly one spot.
 */
import { brands, type BrandTokens } from "@config";

export const ACTIVE_BRAND = process.env.BRAND || "off-the-hook";

export const brand: BrandTokens = (() => {
  const b = brands[ACTIVE_BRAND];
  if (!b) {
    const known = Object.keys(brands).join(", ");
    throw new Error(`Unknown BRAND="${ACTIVE_BRAND}". One of: ${known}`);
  }
  return b;
})();

export type { BrandTokens };

/** Quote a font family that contains spaces, for CSS font-family lists. */
const q = (name: string) => (/\s/.test(name) ? `"${name}"` : name);

/** Full font-family stacks (primary + its web/Office-safe fallback). */
export const headStack = `${q(brand.type.headline)}, ${brand.type.headlineFallback}`;
export const bodyStack = `${q(brand.type.body)}, ${brand.type.bodyFallback}`;

/** Headline casing rule from config (uppercase brands like Steelpoint/Spearhead). */
export const headlineTransform = brand.type.headlineTransform ?? "none";

/**
 * Google Fonts href for the active brand's two primary families.
 * The *Fallback stacks above remain the no-flash default until these load.
 */
export function googleFontsHref(): string {
  const fam = (name: string) =>
    `family=${encodeURIComponent(name)}:wght@400;500;600;700;800`;
  const families = Array.from(new Set([brand.type.headline, brand.type.body]));
  return `https://fonts.googleapis.com/css2?${families.map(fam).join("&")}&display=swap`;
}

/** CSS custom properties emitted onto :root. The ONLY place hex/fonts surface. */
export function rootCssVars(): string {
  const c = brand.color;
  return [
    `--c-primary:${c.primary}`,
    `--c-dark:${c.dark}`,
    `--c-accent:${c.accent}`,
    `--c-supporting:${c.supporting}`,
    `--c-light:${c.light}`,
    `--font-head:${headStack}`,
    `--font-body:${bodyStack}`,
  ].join(";");
}

/** Convenience flags used to weight modules per the build spec. */
export const isEmpowerment = brand.family === "empowerment";
export const isPeace = brand.family === "peace";
export const hasPillars = brand.pillars.length > 0;
