/**
 * Resolves per-brand assets from /src/brands/<slug>/. Rasters return Astro
 * `ImageMetadata` so callers optimize them at build time via <Image>/getImage
 * (emitting WebP at display size). The logo is an SVG, returned as a raw URL
 * (SVGs aren't raster-optimized). Returns null when the file is missing so
 * callers can fall back to a palette placeholder. See ASSETS.md.
 */
import type { ImageMetadata } from "astro";
import { ACTIVE_BRAND } from "./brand";

const rasters = import.meta.glob<ImageMetadata>(
  "/src/brands/**/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);
const svgs = import.meta.glob<string>(
  "/src/brands/**/*.svg",
  { eager: true, query: "?url", import: "default" },
);

export type RasterAsset =
  | "hero.png"
  | "secondary.png"
  | "og.png"
  | "texture-1.png"
  | "texture-2.png"
  | "texture-3.png";
export type SvgAsset = "logo.svg";

/** Optimizable raster (ImageMetadata) for <Image>/getImage, or null if missing. */
export function img(file: RasterAsset): ImageMetadata | null {
  return rasters[`/src/brands/${ACTIVE_BRAND}/${file}`] ?? null;
}

/** Raw URL for the brand SVG logo (SVGs aren't raster-optimized), or null. */
export function svgUrl(file: SvgAsset): string | null {
  return svgs[`/src/brands/${ACTIVE_BRAND}/${file}`] ?? null;
}
