---
name: Main Sail
description: Operational design system for a veteran-owned federal IT services brand.
colors:
  ms-dark: "#204B57"
  ms-medium: "#125E8A"
  ms-bright: "#197BBD"
  ms-taupe: "#C2B8B2"
  ms-white: "#ffffff"
  ms-black: "#0f1c20"
  surface-base: "#f7f6f5"
  surface-elevated: "#ffffff"
  surface-floating: "#ffffff"
  area-bridge: "#197BBD"
  area-telemetry: "#1A9E8F"
  area-channel: "#125E8A"
  area-signal: "#E08A3C"
  area-sustainment: "#2D7A4F"
  area-operations: "#6B7280"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(2.35rem, 4.1vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(1.75rem, 2.9vw, 2.35rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "1.175rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Outfit, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "24px"
  pill: "100px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  "2xl": "3rem"
  "3xl": "4rem"
  "4xl": "6rem"
  "5xl": "8rem"
components:
  button-primary:
    backgroundColor: "{colors.ms-bright}"
    textColor: "{colors.ms-white}"
    rounded: "{rounded.md}"
    padding: "0.875rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.ms-bright}"
    textColor: "{colors.ms-white}"
    rounded: "{rounded.md}"
    padding: "0.875rem 2rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ms-dark}"
    rounded: "{rounded.md}"
    padding: "0.875rem 2rem"
  button-white:
    backgroundColor: "{colors.ms-white}"
    textColor: "{colors.ms-dark}"
    rounded: "{rounded.md}"
    padding: "0.875rem 2rem"
  card-service:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ms-dark}"
    rounded: "{rounded.lg}"
    padding: "2rem"
  badge-teal:
    backgroundColor: "rgba(25, 123, 189, 0.1)"
    textColor: "{colors.ms-bright}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
  badge-light:
    backgroundColor: "rgba(255, 255, 255, 0.15)"
    textColor: "{colors.ms-white}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
  input-text:
    backgroundColor: "{colors.ms-white}"
    textColor: "{colors.ms-dark}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
  consortium-tile:
    backgroundColor: "{colors.ms-white}"
    textColor: "{colors.ms-dark}"
    rounded: "{rounded.md}"
    padding: "2rem 1.5rem 1.5rem"
---

# Design System: Main Sail

## 1. Overview

**Creative North Star: "The Operations Center"**

Main Sail's interface reads like a calm command surface, not a marketing site. The audience is procurement officers, program managers, and federal contracting leads, so density of information matters and so does breathing room. Surfaces feel like a mature dashboard run by professionals: deep teal authority on dark sections, warm cream worksurfaces under section content, and a single deliberate accent (Bridge Blue, #197BBD) reserved for action. Twenty-five years of tenure earns the right to feel a little timeless. The work speaks; the design clears the way.

The system is built on tinted ambient depth. Every shadow is rgba(32, 75, 87, ...), the brand teal at low alpha, never neutral grey. Three elevation layers (base, elevated, floating) give the surface plane a real z-axis. The neutral background is a warm off-white (#f7f6f5) carrying a fine SVG crosshatch pattern; the same pattern returns on the home page solutions and mission sections to give document-grade texture beneath content. Cards lift on hover (translateY(-8px)) with the shadow intensifying in the same teal hue, never a generic black drop.

This system explicitly rejects: SaaS-cream landing-page templates, neon or gradient text, glassmorphism applied decoratively, the hero-metric template (big number + label + small accent gradient), generic Tailwind blue-indigo-purple palettes, and the "AI tool" aesthetic (dark mode with purple gradients, neon accents, animated mesh backgrounds).

**Key Characteristics:**
- Tinted depth, not flat. Three-layer shadow vocabulary in the brand teal hue.
- Single-accent commitment. Bridge Blue (#197BBD) carries every CTA, link, focus state, and overline.
- Operational density with editorial breathing room. Generous spacing scale (`xs` 8px to `5xl` 128px) used variably for rhythm.
- Geometric display + humanist body. Outfit (700) on Source Sans 3 (400), both sans, never serif.
- Six categorical accents tied to service areas (Bridge, Telemetry, Channel, Signal, Sustainment, Operations) used only on the service cards and their gradient halos.
- Crosshatch SVG pattern on cream backgrounds for a subtle document texture; SVG noise grain on dark hero overlays.

## 2. Colors: The Operations Center Palette

A two-temperature system: deep oceanic teals for authority and surface chrome; a warm worksurface cream for the document plane; one bright blue accent for action.

### Primary
- **Bridge Blue** (#197BBD): The single accent. Carries every primary CTA, link, focus ring, overline, sub-nav active state, badge, and the inline list bullet. Its rarity is the point. Used on roughly 5 to 10 percent of any given screen.

### Secondary
- **Hull Teal** (#204B57): The deep brand color. Owns headings, body text, the hero background, the footer, the dark section variant, and every shadow tint. The most-seen color on the site.
- **Channel Blue** (#125E8A): The mid-tone partner of Hull Teal. Appears in the icon-tile gradient (linear-gradient(135deg, Hull Teal, Channel Blue)) and the CTA band gradient (Channel Blue to Bridge Blue).

### Tertiary (Service-Area Accent System)
Used only on the home page service cards (`card.card-icon`) as a 4px left border and as the start of the icon halo gradient. One color per practice area, applied positionally via `:nth-child`. Not used elsewhere.

- **Bridge Blue** (#197BBD): Digital Engineering & Manufacturing.
- **Telemetry Teal** (#1A9E8F): Maintenance & Logistics Optimization.
- **Channel Blue** (#125E8A): Enterprise IT & Transformation.
- **Signal Amber** (#E08A3C): Data & Analytics.
- **Sustainment Green** (#2D7A4F): Program Support.
- **Operations Grey** (#6B7280): Intelligent Automation.

### Neutral
- **Worksurface Cream** (#f7f6f5): The document plane. Background of body and even-numbered content sections. Carries a 15px SVG crosshatch pattern on home page sections.
- **Operational White** (#ffffff): Card surfaces, floating panels (mega-dropdown, contact form), odd-numbered content sections, ticker sections.
- **Hull Black** (#0f1c20): Body text base color (cool-tinted near-black, never pure #000).
- **Weathered Taupe** (#C2B8B2): Brand-palette accent held in reserve. Available for content tints and selective imagery; not currently load-bearing in components.

### Ink at Alpha
The Hull Teal hue is also the source of every transparent text and shadow tint. Six fixed alpha steps:
- `--ms-dark-90` rgba(32, 75, 87, 0.9): Strong secondary text.
- `--ms-dark-70` rgba(32, 75, 87, 0.7): Body paragraph color in cards, captions.
- `--ms-dark-50` rgba(32, 75, 87, 0.5): Meta text, ticker labels, article meta.
- `--ms-dark-20` rgba(32, 75, 87, 0.2): Default form-input border, outline-button border.
- `--ms-dark-10` rgba(32, 75, 87, 0.1): Dividers, borders on consortium tiles, table row separators.
- `--ms-bright-10` rgba(25, 123, 189, 0.1) and `--ms-bright-20` rgba(25, 123, 189, 0.2): Accent tints for hover backgrounds and active sub-nav state.

### Named Rules

**The One Voice Rule.** Bridge Blue is the only color that means "act." If two elements on the same screen are Bridge Blue and only one is interactive, you have a bug. Service-area tertiaries are categorical labels, not action signals.

**The No-Black Rule.** No element uses #000 or pure black shadow. Every neutral and every shadow tints toward Hull Teal (#204B57). The visual temperature is consistent across light and dark sections.

**The Single Hero Accent Rule.** Heroes are dark teal with a low-opacity image (0.35) and an SVG noise grain overlay. Never gradient meshes, never animated backgrounds, never glassmorphism cards stacked over the hero.

## 3. Typography

**Display Font:** Outfit (700, with the 400 to 800 range available; sans-serif fallback)
**Body Font:** Source Sans 3 (400 to 700; sans-serif fallback)
**Label/Overline Font:** Outfit (600, uppercase, tracked)

**Character:** A geometric-meets-humanist pairing. Outfit's modern geometric construction gives headings a confident, contemporary feel without the flag-waving of a slab serif or the casualness of a script. Source Sans 3 carries body copy with humanist warmth and excellent legibility at the chosen 1.175rem reading size. The pairing is intentionally all-sans: this is operations documentation, not editorial journalism.

### Hierarchy
- **Display** (Outfit 700, clamp(2.5rem, 5vw, 4rem), line-height 1.15, tracking -0.03em): Hero h1 only. White on dark teal in heroes.
- **Headline** (Outfit 700, clamp(2.35rem, 4.1vw, 3.5rem), line-height 1.15, tracking -0.03em): Section h2 throughout. Hull Teal on light, white on dark.
- **Title** (Outfit 700, clamp(1.75rem, 2.9vw, 2.35rem), line-height 1.15, tracking -0.03em): h3 for content blocks and major card headings.
- **Subhead** (Outfit 700, clamp(1.45rem, 2.3vw, 1.75rem), line-height 1.15): h4 for sub-sections.
- **Card title** (Outfit 600 to 700, 1.325rem to 1.45rem, line-height 1.35): Service-card and benefit-card headings.
- **Body** (Source Sans 3 400, 1.175rem, line-height 1.7, tracking -0.01em): Paragraph text. Color: Hull Black on light, ms-dark-70 on cards, rgba(255,255,255,0.8) on dark.
- **Lead** (Source Sans 3 400, 1.25rem, line-height 1.7): Section-header descriptions and content-text intro paragraphs. ms-dark-70 color.
- **Overline / Eyebrow** (Outfit 600, 0.95rem, uppercase, tracking 0.12em): Section eyebrows ("Trusted Alliances", "Who We Are"), ticker labels, footer column heads, content-text overlines. Color: Bridge Blue on light, white at 50 percent on dark.
- **Stat number** (Outfit 800, 2.625rem, line-height 1, tracking -0.03em): The 250+ / 25+ / 1.5M trio in the mission section.
- **Tag pill** (Outfit 600, 0.8rem, uppercase, tracking 0.08em): Article-card category tags.

### Named Rules

**The All-Sans Rule.** No serifs anywhere. The pairing is geometric Outfit on humanist Source Sans 3. A serif here would read as "consultancy boilerplate" or "law firm" and break the operational register.

**The Tracked-Label Rule.** Every uppercase label uses 0.08em to 0.14em tracking and Outfit at 600. Tight tracking on uppercase reads as cramped; this is the spec, not a suggestion.

**The Body-Reads-At-1.175 Rule.** Body copy is 18.8px (1.175rem), not 16px. The line-height is 1.7. This is reading-comfortable density for procurement-grade content. Do not shrink to 1rem to fit more.

## 4. Elevation

**Tinted ambient depth.** Surfaces have a real z-axis with three elevation layers. Every shadow is rendered in `rgba(32, 75, 87, ...)`, the Hull Teal hue at low alpha, never neutral grey or black. The effect is calm and chromatic: depth feels structural, not decorative, and the temperature stays consistent with the rest of the palette.

### Shadow Vocabulary

- **Base** (`box-shadow: 0 1px 3px rgba(32, 75, 87, 0.06)`): Resting state for the lightest cards. Barely visible; it just lifts the surface off the cream background by a hairline.
- **Elevated** (`box-shadow: 0 4px 16px rgba(32, 75, 87, 0.08), 0 1px 4px rgba(32, 75, 87, 0.04)`): The default for cards, benefit cards, article cards, case-study cards, and the data table. Two-layer (ambient + contact) so the card sits above the page convincingly.
- **Floating** (`box-shadow: 0 12px 40px rgba(32, 75, 87, 0.12), 0 4px 12px rgba(32, 75, 87, 0.06)`): The mega-dropdown menu, the contact form card, the featured-article block. Reserved for content that is genuinely off the page plane.
- **Hover lift** (`box-shadow: 0 20px 50px rgba(32, 75, 87, 0.18), 0 8px 20px rgba(32, 75, 87, 0.12), 0 2px 6px rgba(32, 75, 87, 0.08)`, paired with `transform: translateY(-8px)`): Three-layer composite that fires when interactive cards are hovered. The shadow intensifies in the same hue rather than darkening.
- **Accent halo** (around service-card icons): `0 4px 18px color-mix(in srgb, var(--card-accent) 40%, transparent), 0 2px 6px color-mix(in srgb, var(--card-accent) 20%, transparent)`. The only place a non-teal shadow is permitted, because it intentionally tints with the card's own accent color.
- **Header scrolled** (`box-shadow: 0 2px 20px rgba(32, 75, 87, 0.08)`): A whisper of ambient depth under the header once it transitions to its solid white state.

### Texture Layer

Two repeating textures sit beneath surfaces, not as shadows but contributing to perceived depth.

- **Crosshatch pattern** (15px SVG, white strokes on cream): Tiles across `f7f6f5` section backgrounds on the home page. Reads as "engineering paper," not gradient.
- **SVG noise grain** (256px tile, opacity 0.35): Sits inside `.grain-overlay` over hero images and the CTA-band gradient. Adds film-grain texture that prevents the dark areas from looking like flat web color.

### Named Rules

**The Teal-Only Shadow Rule.** Every box-shadow is rgba(32, 75, 87, ...). Pure black shadows are prohibited. Accent halos around service-card icons use `color-mix` with the card accent at low alpha; they are the only exception.

**The Translate-On-Hover Rule.** Cards lift with `transform: translateY(-8px)`, not by scale. Scale on hover reads as juvenile; translate reads as calm. Pair the lift with a shadow upgrade.

**The Triple-Stack Lift.** The hover shadow is three layers (20px / 8px / 2px blur), not one. A single big blurry drop reads as cheap. The triple stack reads like a card actually moving toward you.

## 5. Components

### Buttons
- **Shape:** Gently rounded (`rounded-md` = 10px).
- **Type:** Outfit 600, 1.1rem default, 0.95rem on `btn-sm`, 1.25rem on `btn-lg`.
- **Padding:** 0.875rem 2rem default; 0.625rem 1.25rem small; 1rem 2.5rem large.
- **Primary:** Filled Bridge Blue on white. Two-layer Bridge Blue shadow at rest (0.25 / 0.15 alpha). Hover lifts translateY(-2px) and intensifies the shadow. The single most prominent CTA.
- **Outline:** Transparent fill, Hull Teal text, 2px ms-dark-20 border. Hover swaps the border to Bridge Blue and tints the text to Bridge Blue with a soft Bridge Blue shadow.
- **Secondary (on dark backgrounds):** Transparent fill, white text, 2px white-at-40-percent border. Hover increases the border to full white.
- **White (in CTA bands):** Filled white on the gradient band, Hull Teal text, soft teal shadow.
- **States:** All buttons share `transform: scale(0.97)` on `:active`, a 3px Bridge Blue outline with 3px offset on `:focus-visible`, and a translucent white wash inside the button on `:hover` via `::after`.

### Service Cards (the home page card-icon system)
- **Shape:** `rounded-lg` (16px), white surface, `--shadow-elevated` at rest.
- **Accent:** A 4px solid left border in the service area's tertiary color (Bridge / Telemetry / Channel / Signal / Sustainment / Operations).
- **Icon halo:** A 60px circular badge with a `linear-gradient(135deg, [accent], var(--ms-dark))` fill, white SVG icon inside, accent-tinted halo shadow. On hover the halo scales to 1.08 and the shadow intensifies.
- **Body:** 2rem padding, h3 in Outfit 600 at 1.45rem, paragraph in ms-dark-70 at 1.1rem with line-height 1.65.
- **Hover:** translateY(-8px), triple-stack hover shadow.

### Generic Cards (article, benefit, case-study, contact-form)
- **Corner Style:** `rounded-lg` (16px).
- **Background:** `--surface-elevated` (white).
- **Shadow Strategy:** `--shadow-elevated` at rest, hover transitions to the triple-stack lift shadow with translateY(-8px). Article cards lift only -4px (a quieter motion since they appear in dense grids).
- **Border:** None by default. Consortium tiles are the exception (1px ms-dark-10 border with a hover-revealed 3px gradient strip from Bridge Blue to Channel Blue across the top).
- **Internal Padding:** `xl` (2rem) typical; `3xl` (4rem) on the contact form card and featured article body.

### Inputs / Forms
- **Style:** White background, 2px ms-dark-20 border, `rounded-md` (10px), Source Sans 3 1.1rem text in Hull Teal, 0.75rem 1rem padding.
- **Hover:** Border darkens to ms-dark-50.
- **Focus:** Border becomes Bridge Blue, plus a 4px ms-bright-20 glow ring (`box-shadow: 0 0 0 4px rgba(25, 123, 189, 0.2)`). Native `outline` is removed in favor of the ring.
- **Label:** Outfit 500, 1.025rem, Hull Teal, sits 0.5rem above the input.
- **Textarea:** Min-height 140px, `resize: vertical`.

### Navigation
- **Header (transparent over hero):** White-at-85-percent links, hamburger in white, primary CTA gets a translucent-white pill background.
- **Header (scrolled):** Background switches to white-at-97-percent with `backdrop-filter: blur(12px)` and the Hull Teal shadow underneath. Links shift to ms-dark-70 with Bridge Blue hover/active in the ms-bright-10 tint pill. Padding compresses from 1rem to 0.5rem.
- **Mega Dropdown:** 560px minimum width, two-column grid of icon + h4 + paragraph items. White surface, `rounded-lg`, `--shadow-floating`, 1px ms-dark-10 border. Items get an ms-bright-10 hover background.
- **Mobile Nav:** Right-side slide-in panel (max 400px), white background, slide animation in `--ease-spring`. Hamburger transforms into an X. Links get ms-dark-10 underlines.
- **Anchor Sub-Nav (capability/solution pages):** Sticky at top: 64px, white-at-95-percent with backdrop blur. Pill-style links with active state in Bridge Blue at ms-bright-20 background.

### Badges
- **Shape:** Pill (`border-radius: 100px`).
- **Type:** Outfit 600, 0.95rem.
- **Padding:** 0.5rem 1rem.
- **`badge-light`** (white-at-15-percent on a dark background, white text): Used for the "Veteran-Owned Small Business" hero badge.
- **`badge-teal`** (ms-bright-10 background, Bridge Blue text): Used for certifications (ISO 9001:2015, CMMC Level 2). Often paired with a leading SVG icon.

### Logo Tickers
- Two tracks: `scroll-left` (60s) for clients and `scroll-right` (40s) for partners, both running `linear infinite`.
- Logos are 75px tall, opacity 0.7 at rest, 1 on hover.
- The track wrapper has a left/right linear-gradient mask that fades logos in and out at the edges.
- A `prefers-reduced-motion: reduce` media query disables the animation entirely.

### Consortium Tile (signature component)
- White surface, 1px ms-dark-10 border, `rounded-md`.
- Logo on top (80px area, max-height 72px), full name in Outfit 700 at 0.95rem, acronym in Bridge Blue Outfit 600 at 0.7rem with 0.14em tracking.
- Hover: translateY(-4px), shadow intensifies, border tints toward Bridge Blue, and a 3px gradient strip (Bridge Blue to Channel Blue) appears at the top edge via a `::before` pseudo-element with `opacity: 0` to `1`.
- Five tiles per row on desktop, three on tablet, two on mobile, with explicit grid-column rules to keep the orphan tile centered.

### Stat Trio (mission section)
- Three columns, each: a numeral in Outfit 800 at 2.625rem (line-height 1, tracking -0.03em, Hull Teal) above an Outfit 500 uppercase label at 0.95rem with 0.06em tracking in ms-dark-70.
- Spaced with `--space-2xl` between numerals.

### CTA Band
- Full-bleed gradient: `linear-gradient(135deg, var(--ms-medium), var(--ms-bright))`.
- Carries a low-opacity grain overlay (0.15) for texture.
- Headline + paragraph + button row, centered. Buttons use the white-fill variant against the gradient.

## 6. Do's and Don'ts

### Do:
- **Do** tint every neutral and every shadow toward Hull Teal (#204B57). Pure greys and pure black are wrong here.
- **Do** treat Bridge Blue (#197BBD) as the single voice of action. Reserve it for CTAs, links, focus states, overlines, and the anchor-nav active state.
- **Do** pair Outfit (700) for display with Source Sans 3 (400) for body. Headings tighter (-0.03em tracking, line-height 1.15); body looser (1.7 line-height).
- **Do** use `--space-3xl` (4rem) and `--space-5xl` (8rem) generously for vertical rhythm. Section padding is intentionally large.
- **Do** lift cards on hover with `transform: translateY(-8px)` and a three-layer Hull Teal shadow stack.
- **Do** add the SVG crosshatch pattern under cream sections (15px tile, white strokes) and SVG noise grain under hero images and the CTA gradient.
- **Do** ease motion with `--ease-spring` (cubic-bezier(0.34, 1.56, 0.64, 1)) for spring entrances and `--ease-smooth` (cubic-bezier(0.25, 0.1, 0.25, 1)) for state transitions.
- **Do** route every focus-visible state through Bridge Blue with a 2 to 3px outline and 2 to 4px offset.
- **Do** show certifications and "Veteran-Owned Small Business" as pill badges. They are part of the brand voice, not boilerplate.

### Don't:
- **Don't** introduce gradient text (`background-clip: text` on a gradient fill). The accent stays solid Bridge Blue.
- **Don't** ship glassmorphism as a decorative pattern. The header gets one purposeful blur on scroll; nothing else.
- **Don't** use the hero-metric template (huge number, tiny label, supporting stats with a gradient accent). The mission stat trio is the only stat block.
- **Don't** use neon, dark-mode-with-purple-gradients, or animated mesh backgrounds. This is operations, not generative AI marketing.
- **Don't** swap Outfit or Source Sans 3 for a serif. The system is all-sans on purpose.
- **Don't** scale cards on hover. Translate them.
- **Don't** put Bridge Blue on a non-interactive element. If you see two Bridge Blue elements on a screen, one of them should be interactive or it is a bug.
- **Don't** introduce a fourth elevation layer. The vocabulary is base, elevated, floating, plus the hover lift composite.
- **Don't** use Tailwind default palette (indigo-500, blue-600, slate). Token names map to the brand: `ms-dark`, `ms-bright`, `ms-medium`, `ms-taupe`.
- **Don't** use #000 or pure black anywhere, including shadows. Hull Black (#0f1c20) for text, Hull Teal at alpha for shadows.
- **Don't** collapse the body to 1rem to fit more content. The reading size is 1.175rem with 1.7 line-height; respect it.
- **Don't** render decorative borders with width greater than 1px on new components. The two existing exceptions (the 4px service-card left accent and the 3px solution-item border on dark) are the documented system; do not extend the pattern to additional surfaces.
