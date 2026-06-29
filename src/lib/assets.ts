/**
 * Resolves per-brand assets from /src/brands/<slug>/. Returns a hashed URL
 * Astro will emit, or null when the file is missing (callers render a
 * palette placeholder instead). See ASSETS.md for what to replace.
 */
import { ACTIVE_BRAND } from "./brand";

const urls = import.meta.glob("/src/brands/**/*.{svg,png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export type BrandAsset =
  | "logo.svg"
  | "og.png"
  | "hero.jpg"
  | "secondary.jpg"
  | "texture.svg";

export function asset(file: BrandAsset): string | null {
  const key = `/src/brands/${ACTIVE_BRAND}/${file}`;
  return urls[key] ?? null;
}
