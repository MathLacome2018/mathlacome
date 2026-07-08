# Mathlacome Design System

**Brand:** Mathlacome  
**Type:** Personal brand — science, mathematics, and football analysis  
**Aesthetic:** Editorial minimalism. Black & white or cream & black. Typography-led, data-literate, no decoration for its own sake.

## Sources

- Font files provided: `bebas_neue.zip`, `Oswald.zip` (extracted to `assets/fonts/`)
- Reference aesthetic: Football Intelligence editorial publication (clean, condensed type, high-contrast B&W)
- Two reference screenshots were provided but could not be read (special characters in filename) — visual direction inferred from written description and font choices

## Brand Overview

Mathlacome is a personal brand built around rigorous, readable writing at the intersection of science, mathematics, and football analytics. The design system reflects that dual personality: the editorial gravity of a science journal meets the data-dense clarity of a sports analytics publication.

No logo exists in the provided assets. The brand name "Mathlacome" set in Bebas Neue serves as the wordmark wherever a logo mark would appear. See ICONOGRAPHY section.

---

## CONTENT FUNDAMENTALS

**Voice:** First-person singular where appropriate. Direct and precise — no hedging, no filler. The writing assumes an intelligent reader, not a casual one.

**Tone:** Analytical but not dry. Ideas are presented with clarity and a sense of genuine curiosity. Never condescending, never overly academic.

**Casing:** Title case for article headlines (Bebas Neue). Uppercase for labels, navigation, badges, and metadata (tracked, small Oswald). Sentence case for body copy and excerpts.

**Emoji:** Never used. The aesthetic relies on typographic hierarchy, not pictographic shorthand.

**Numbers:** Spelled out below ten in prose; numerals for data, statistics, and measurements.

**Dates/meta:** Format — `Jul 2026 · 6 min read`. Short month, full year, center-dot separator.

**Categories used:** Science, Mathematics, Analysis, Football, Data

**Example headline register:**
- "The Geometry of Space-Time"
- "High Press Systems in Modern Football"
- "On the Elegance of Mathematical Proof"
- "Expected Threat: A Spatial Model"

---

## VISUAL FOUNDATIONS

**Colors:** Two modes — white/black (default) and cream/black (`--color-cream: #F2EDE4`). No accent colors. No color used as decoration. Black is used as a full-bleed background for hero sections, banners, and footers. Cream is the warm alternative to pure white, used for page backgrounds and muted surfaces.

**Typography:** Two families only.
- *Bebas Neue* (display) — all headlines, section titles, pull quotes, wordmark. Weight 400 only. Tracked at `0.02em`. Line-height `1.0–1.05`.
- *Oswald* (body/UI) — all body text, navigation, labels, captions, buttons. Variable weight 200–700. Light (300) for body paragraphs; Medium (500) for UI; SemiBold (600) for badges and buttons.

**Spacing:** 4px base grid. Named steps: `--space-1` (4px) through `--space-32` (128px). No half-steps.

**Backgrounds:** Flat — no gradients, no textures. Three values: white, cream, black. Hero images are used as full-bleed image placeholders within bordered containers, with a subtle scale on hover.

**Animation:** Minimal. Fast transitions (`120ms`) for button hover states and border highlights. Slower (`350ms`) for image scale on card hover. `cubic-bezier(0.4, 0, 0.2, 1)` easing throughout. No bounces, no springs, no decorative motion.

**Hover states:** Buttons invert on hover (primary → ghost outline; ghost → filled). Article cards gain a left `2px` black border on hover. Nav links fade from 80% to 100% opacity. Image thumbnails scale to `1.03`.

**Press states:** No dedicated press scale. Color swap is sufficient.

**Borders:** 1px rules dominate. 2px thick rule used only at article tops and pull quote tops. No box shadows — borders are used instead (`box-shadow: 0 0 0 1px var(--border-default)` for card outlines).

**Corner radii:** `0` — sharp corners throughout. `--radius-sm: 2px` and `--radius-md: 4px` exist for edge cases (e.g. inline code) but are rarely used.

**Cards:** No shadow, no rounding. Bordered with `1px solid var(--border-default)`. Cards are defined by a top border rule, not a box. On hover, border becomes `1px solid var(--fg-primary)`.

**Layout:** CSS Grid and Flexbox with `gap`. Max-width containers centered. Content column for articles: 680px. Wide layout for feeds: 1280px. No fixed sidebars.

**Imagery:** Placeholder-based — no stock imagery defined. Image containers use `--bg-muted` as placeholder fill. Imagery is expected to be editorial/photographic in black-and-white or desaturated tones.

**Transparency/blur:** Not used. The aesthetic avoids frosted glass or backdrop-filter effects.

---

## ICONOGRAPHY

No icon system is defined in the provided assets. No icon font, SVG sprite, or emoji usage.

**Approach:** Typography-only navigation and UI. Directional cues use text arrows (`←`, `→`) in Oswald. Bullets and separators use `·` and `—` unicode characters.

**Intentional addition:** If an icon system becomes necessary, Lucide Icons (CDN, 1.5px stroke, `currentColor`) would be the closest match to the editorial weight and style. Flag this if needed.

---

## Components

| Component | Location | Description |
|-----------|----------|-------------|
| `Button` | `components/core/` | Primary, ghost, text variants; sm/md/lg sizes |
| `Badge` | `components/core/` | Solid, outline, muted; uppercase category labels |
| `Divider` | `components/core/` | Horizontal rule with optional centered label |
| `Nav` | `components/navigation/` | Site nav bar; light/dark/cream themes |
| `ArticleCard` | `components/article/` | Stack, inline, minimal layouts; hover left-border |
| `PullQuote` | `components/article/` | Editorial blockquote with 2px top rule |

---

## UI Kits

| Kit | Path | Description |
|-----|------|-------------|
| Website Home | `ui_kits/website/index.html` | Blog homepage: nav, hero, article feed, subscribe banner, footer |
| Article Page | `ui_kits/website/article.html` | Single article view: header, body, pull quote, related articles |

---

## Foundation Cards (Design System Tab)

**Colors:** Base Palette · Semantic Colors · Cream & Dark Themes  
**Type:** Display (Bebas Neue) · Body & UI (Oswald) · Type Pairing  
**Spacing:** Spacing Scale · Layout Containers  
**Brand:** Brand Identity · Editorial Rules · Dark Section  
**Components:** Core (Button & Badge) · Article Card · Navigation  
**Website:** Home · Article Page

---

## File Structure

```
styles.css              — entry point (@import only)
tokens/
  fonts.css             — @font-face for Bebas Neue + Oswald
  colors.css            — color tokens + .theme-cream
  typography.css        — type scale + font families
  spacing.css           — spacing, containers, radii
  effects.css           — shadows, transitions, opacity
  base.css              — reset + base element styles
assets/
  fonts/                — BebasNeue-Regular.*, Oswald-*.ttf
components/
  core/                 — Button, Badge, Divider
  article/              — ArticleCard, PullQuote
  navigation/           — Nav
guidelines/             — Foundation specimen cards
ui_kits/
  website/              — index.html (home), article.html
readme.md
SKILL.md
```

---

## Intentional Additions

- `Divider` component added (no source inventory existed) — text separators are a fundamental editorial pattern for this brand.
- `PullQuote` component added — central to the reading experience of long-form science/analysis articles.
