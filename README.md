# GLG Multi-Brand Law-Firm Site System

One Astro + Tailwind codebase that renders a fully themed marketing + lead-capture
site for any brand in [`brands.config.ts`](./brands.config.ts). The active brand is
chosen at build time by the `BRAND` env var. Adding a brand is **config + assets
only** — no template changes.

Six brands ship today: `off-the-hook`, `high-ground`, `countersuit`, `spearhead`,
`steelpoint`, `rally-point`.

---

## How it works (theming in one place)

`brands.config.ts` is the single source of truth. At build time:

1. [`src/lib/brand.ts`](./src/lib/brand.ts) reads `process.env.BRAND` and resolves the
   active brand's tokens.
2. [`src/components/BaseHead.astro`](./src/components/BaseHead.astro) emits those tokens
   as CSS custom properties on `:root`
   (`--c-primary, --c-dark, --c-accent, --c-supporting, --c-light, --font-head, --font-body`)
   and loads the brand's Google Fonts. The config's `*Fallback` stacks are the
   no-flash default until the web fonts load.
3. Tailwind ([`tailwind.config.mjs`](./tailwind.config.mjs)) maps its color/font tokens
   to those CSS variables (`bg-primary` → `var(--c-primary)`, `font-head` →
   `var(--font-head)`, …). **No template names a hex value or font directly.**

Guardrails:

- `npm run check:hardcode` fails if any template hardcodes a hex color or brand font name.
- Dominance rule (primary 60–70%, accent for CTAs only) is enforced structurally: the
  accent color is exposed only through the CTA `Button` variant.
- Uppercase-headline brands (Steelpoint, Spearhead) set `data-headline-transform` on
  `<html>` server-side from config — no client flash.

---

## Run a brand locally

```bash
# install (pnpm recommended; npm also works)
pnpm install            # or: npm install

# generate placeholder assets once (vector logos + textures per brand)
pnpm gen:assets

# dev server for a specific brand
BRAND=steelpoint pnpm dev          # http://localhost:4321

# production build for a specific brand
BRAND=countersuit pnpm build       # outputs to ./dist
pnpm preview
```

`BRAND` defaults to `off-the-hook` if unset. An unknown `BRAND` fails the build with
the list of valid slugs.

> On Windows PowerShell, set the var inline:
> `$env:BRAND="steelpoint"; pnpm build`

---

## Add a brand (no template diffs)

1. Append one entry to `brands.config.ts` (copy an existing block; fill every field).
2. Drop assets into `src/brands/<slug>/`: `logo.svg`, `og.png`, `hero.jpg`,
   `secondary.jpg`, `texture.svg` — or run `pnpm gen:assets` to regenerate vector
   placeholders for the new slug.
3. `BRAND=<slug> pnpm build`. Done. (See `ASSETS.md` for what to replace.)

That's the whole contract — the 7th brand needs zero changes under `src/`.

---

## Lead capture

The intake form posts JSON to **`/api/lead`** — a native Vercel Serverless Function at
[`api/lead.js`](./api/lead.js) (repo root), deployed automatically alongside the static
build. It tags every submission with `brand` + UTM params (`utm_*`, `gclid`, `fbclid`,
`variant`) so paid traffic attributes per brand.

- If `SUPABASE_URL` + `SUPABASE_ANON_KEY` are set, it inserts into a `leads` table.
- If not, it logs the normalized lead to the function console (nothing is lost early on).

Supabase `leads` table (run once in the SQL editor):

```sql
create table public.leads (
  id          bigint generated always as identity primary key,
  brand       text not null,
  name        text not null,
  phone       text not null,
  email       text,
  debt_range  text,
  message     text,
  page        text,
  utm         jsonb default '{}'::jsonb,
  user_agent  text,
  created_at  timestamptz not null default now()
);
```

To send leads to **Forth/Zoho** instead, replace the Supabase block in `api/lead.js`
with that CRM's intake call — the normalized `lead` object stays the same.

---

## Paid landing pages

Each brand's home hero is keyed to its `funnel` role (top = relief, mid = plan,
bottom = urgency). Paid campaigns can deep-link a different framing with
`?variant=top|mid|bottom` (resolved client-side). The same `variant` and all `utm_*`
params flow through to the lead payload.

---

## Per-brand Vercel deploy

Each brand is its own Vercel **project**, all pointing at this same repo, differing only
by env vars and domain.

For each brand:

1. **New Project** → import this repo (Framework preset: **Astro**).
2. **Environment Variables** (Production + Preview):
   - `BRAND=<slug>` — **required**, selects the brand at build time.
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY` — lead destination (optional).
   - `PUBLIC_GA4_ID`, `PUBLIC_META_PIXEL_ID` — analytics (optional, per brand).
   - `PUBLIC_INTAKE_PHONE`, `PUBLIC_CONSULT_URL` — Dialpad number + booking link (optional).
   - `PUBLIC_SHOW_PARENT=true` — only if/when you decide to surface the parent firm.
3. **Domains** → add the brand's registered domain (e.g. `countersuitlaw.com`) and point
   its DNS at the Vercel project.
4. Deploy. Repeat per brand — six projects, six domains, one codebase.

Because `BRAND` is the only thing that differs structurally, redeploying all brands after
a template change is just six builds of the same commit.

---

## Project layout

```
brands.config.ts          source of truth (all brands)
api/lead.js               Vercel function: lead intake (brand + UTM tagging)
scripts/gen-assets.mjs    placeholder asset generator
scripts/check-hardcode.mjs guardrail: no hardcoded hex/fonts in templates
src/
  lib/brand.ts            active-brand resolver + font/CSS-var helpers
  lib/assets.ts           per-brand asset resolution (/src/brands/<slug>/)
  components/             themed shared templates (Hero, WhyUs, LeadForm, …)
  layouts/BaseLayout.astro
  pages/                  index, how-it-works, who-we-help, why-us, results, contact, resources
  content/resources/      blog content collection (stub)
  brands/<slug>/          per-brand assets
```
