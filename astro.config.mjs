import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { brands } from "./brands.config.ts";

// Active brand is selected at build time via the BRAND env var.
// Each brand gets its own Vercel project pointing at this same codebase.
const BRAND = process.env.BRAND || "off-the-hook";
const active = brands[BRAND];

if (!active) {
  const known = Object.keys(brands).join(", ");
  throw new Error(`Unknown BRAND="${BRAND}". Set BRAND to one of: ${known}`);
}

// Pure static marketing output — no SSR adapter needed. The lead-capture
// endpoint is a native Vercel Serverless Function at /api/lead.js (repo root),
// which Vercel deploys automatically alongside the static build.
export default defineConfig({
  site: `https://${active.domain}`,
  output: "static",
  integrations: [tailwind({ applyBaseStyles: false })],
});
