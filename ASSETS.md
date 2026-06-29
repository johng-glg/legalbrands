# Asset Replacement Checklist

Everything below is a **placeholder** generated from each brand's own tokens so the
sites build and render today. Replace with real selects per `IMAGE_PROMPT_PACK.md`
(Midjourney to lock the look, Firefly for the final commercially-safe asset).

Assets live in `src/brands/<slug>/`. Filenames are fixed — keep them exactly so the
templates resolve them.

| File | Status | What it is now | Replace with |
|------|--------|----------------|--------------|
| `logo.svg` | ✅ generated | Geometric mark derived from each brand's `logoDirection` (single primary color) | Final brand logo |
| `texture.svg` | ✅ generated | Repeating motif derived from each brand's `pattern` (primary tint) | Final section-divider texture |
| `hero.jpg` | ⬜ missing → runtime placeholder | Palette gradient + brand initial rendered by `BrandImage.astro` | Hero photo (Image DNA per brand) |
| `secondary.jpg` | ⬜ missing → runtime placeholder | Same runtime placeholder | Secondary photo |
| `og.png` | ⬜ missing → omitted | `og:image` meta is skipped until present | 1200×630 social card |

When a real `hero.jpg` / `secondary.jpg` is dropped in, `BrandImage.astro` uses it
automatically — no code change. When `og.png` is added, `BaseHead.astro` emits the
`og:image` tag automatically.

## Per-brand image direction (from IMAGE_PROMPT_PACK.md)

- **off-the-hook** — "The Exhale." Warm domestic relief; cream + sage; phone face-down. Casting: protagonists, not victims.
- **high-ground** — "The Climber." Cool clear morning; navy + teal, one amber accent; upright, capable.
- **countersuit** — "The Turnaround." Warm-serious directional; crimson on parchment, ink-black depth; resolute, direct gaze.
- **spearhead** — "The Charger." High-contrast; cobalt + onyx, hot orange rim; forward motion, low angle.
- **steelpoint** — "The Strategist." Sharp cool steel; gunmetal + steel-blue, blade-cyan accent; architectural, premium.
- **rally-point** — "The Regroup." Warm golden; olive-drab + reveille-gold; dignified veterans + families, never performative.

Append each brand's **Image DNA** line to every generation for library consistency.
Negative-prompt and casting rules are in `IMAGE_PROMPT_PACK.md`.

## Other placeholders to replace (non-image)

- **Results/credibility stats** (`src/components/Results.astro`) — currently generic
  qualitative chips ("Licensed", "Trial-ready", …). Swap for approved firm figures.
- **Resources article** (`src/content/resources/understanding-collector-calls.md`) — a
  single stub post. Replace with brand-reviewed legal content.
- **Pillars fallback** — all six brands currently ship populated `pillars[]`. If a future
  brand ships with empty `pillars[]`, `WhyUs.astro` falls back to a voice-driven block
  (`voiceWeAre` / `voiceWeAreNot`) that should get real copy.
