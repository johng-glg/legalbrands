/**
 * Tailwind is wired entirely to CSS custom properties.
 * The actual hex values + font names live in brands.config.ts and are
 * emitted onto :root at build time by BaseHead.astro. Nothing here (and
 * nothing in any template) names a brand color or font directly.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        // brand tokens -> CSS vars (set per-brand on :root)
        primary: "var(--c-primary)",
        dark: "var(--c-dark)",
        accent: "var(--c-accent)",
        supporting: "var(--c-supporting)",
        light: "var(--c-light)",
      },
      fontFamily: {
        head: "var(--font-head)",
        body: "var(--font-body)",
      },
      textColor: {
        DEFAULT: "var(--c-dark)",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
