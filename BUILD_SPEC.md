# Multi-Brand Law Firm Site System — Build Spec

**Goal:** One templated codebase that renders 5 (and later N) law-firm marketing sites,
each themed entirely from `brands.config.ts`. Adding a brand must require *config + assets only* —
zero template code changes. Validate that claim by standing up brand #2 from config alone.

---

## Stack
- **Astro + Tailwind**, deployed to **Vercel** (Vercel connector already wired).
- One repo. One Vercel **project per brand**, each bound to its own domain, all building from the same codebase
  on a per-brand env var (`BRAND=steelpoint`). Astro builds the matching brand at build time.
- Fonts: load each brand's primary headline/body from Google Fonts; the config's `*Fallback` stack is the
  no-flash default and the Office/web-safe backup.

> Use Next.js instead **only** if these sites later need shared auth or app-like interactivity with the
> client portal. For pure marketing + lead capture, Astro wins on speed/SEO/simplicity.

---

## Theming mechanism (the core of the whole system)
1. At build, read the active brand from `brands.config.ts`.
2. Emit its `color`, `type`, and `headlineTransform` as **CSS custom properties** on `:root`:
   `--c-primary, --c-dark, --c-accent, --c-supporting, --c-light, --font-head, --font-body`.
3. Every component styles from those variables — **no hardcoded hex or font anywhere in templates.**
4. Dominance rule from the brand packages: primary carries 60–70% of any layout; accent is reserved for CTAs only.

---

## Shared template set (build once, themed per brand)
- **Home / hero** — pulls `taglinePrimary`, `oneLiner`, `positioning`; hero variant keyed to `funnel`
  (top = relief-led, mid = plan/roadmap-led, bottom = urgency/court-deadline-led).
- **How it works** — attorney-led process, themed.
- **Who we help** — renders `triggers` + `audience` + `mindset`.
- **Why us** — renders `pillars` (title / meaning / proof). Brands with empty `pillars[]`
  (Off the Hook, Spearhead, Steelpoint) fall back to a voice-driven value block — flag these for copy fill.
- **Results / credibility** — courtroom-credibility module (heavier for empowerment family, lighter for peace).
- **Intake / lead form** — the conversion surface; posts to a shared lead endpoint with `brand` tagged on
  every submission (so paid traffic attributes per brand). This is the one piece worth wiring to the real
  back end early.
- **Resources / blog** — content collection, optional at launch.
- **Standard footer** — parent disclosure handled per your call (config has `parent`; not auto-surfaced).

---

## Landing-page routing for paid
Each brand's `channels[]` describes its paid plan. Build LP slots so paid campaigns can deep-link to a
hero variant matching the ad's promise (e.g. Countersuit "sued?" search → court-deadline hero).
Tag `brand` + `utm` through to the lead payload.

---

## Asset pipeline
Per brand, drop into `/src/brands/<slug>/`: `logo.svg`, `og.png`, and 2–4 photography selects matching the
`photography` direction. `logoDirection` / `pattern` / `photography` strings double as AI image-gen prompts
if you generate placeholders first.

---

## Build sequence (prove reuse, don't just assert it)
1. Scaffold design system + all templates using **Off the Hook** as brand #1 (peace family, simplest hero).
2. Wire the config → CSS-variables theming layer.
3. Stand up **Steelpoint** from config alone (empowerment family, uppercase headlines, dark primary) —
   if it themes cleanly with no template edits, the abstraction holds.
4. Roll the remaining three.
5. One shared deploy workflow; per-brand Vercel projects + domains.

## Definition of done
- `BRAND=<slug>` builds a fully themed, lead-capturing site for any of the five.
- A 6th brand can be added by appending one `brands.config.ts` entry + an asset folder, with no template diffs.
