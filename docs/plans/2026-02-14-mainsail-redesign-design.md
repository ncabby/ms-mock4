# Main Sail Website Mock Redesign — Design Document

**Date:** 2026-02-14
**Project:** ms-mock1
**Client site:** https://mainsailgroup.com
**Goal:** Full working prototype redesign of the Main Sail website using Next.js + Tailwind CSS

## Overview

Create a complete mock redesign of mainsailgroup.com as a functional static Next.js site. Preserve all navigation, content, and functionality from the current site while dramatically improving the look, feel, and visual presentation. Content stays as-is; design gets a full overhaul. Reference designs will be applied in a later stage.

## Approach: Scrape-First, Build-Second

1. **Phase 1 — Content Capture**: Scrape all pages with Firecrawl, download all images, structure as JSON data files
2. **Phase 2 — Scaffold**: Set up Next.js + Tailwind project with routing matching the current site
3. **Phase 3 — Build Components**: Create page templates and components consuming the content data
4. **Phase 4 — Design Polish**: Apply initial modern design (refinable later with reference sites)

## Current Site Analysis

- **Platform**: WordPress with "Bento" theme by Satori Studio (outdated)
- **Active pages**: ~10 (Homepage, Solutions, Clients & Partners, Contracts, Jobs, Contact Us, Cybersecurity News, CMMC 2.0, Talent Acquisition News, Corporate Compliance)
- **Legacy pages**: ~80+ (old case studies, sub-service pages — excluded from scope)
- **About Us page**: Broken (404) — excluded
- **Navigation**: 6 top-level items with Solutions having a 9-item dropdown
- **Images**: ~76 total (hero banners, solution icons, client/partner logos, misc)

## Section 1: Content Architecture

```
content/
├── pages/
│   ├── home.json
│   ├── solutions.json
│   ├── clients.json
│   ├── contracts.json
│   ├── jobs.json
│   ├── contact.json
│   ├── cybersecurity-news.json
│   ├── cmmc-2-0.json
│   ├── talent-acquisition-news.json
│   └── corporate-compliance.json
├── navigation.json
└── global.json
```

Each JSON file captures content semantically as structured fields (title, description, items, images, links) — not raw HTML.

Images stored in `public/images/` organized by category:

```
public/images/
├── hero/
├── solutions/
├── clients/
├── partners/
└── general/
```

## Section 2: Site Structure & Routing

```
/                          → Homepage
/solutions                 → Solutions (all 9 areas, anchor-linked)
/client-partner            → Clients & Partners
/contracts                 → Contracts
/jobs                      → Jobs
/contact-us                → Contact Us
/cybersecurity-news        → Cybersecurity News
/cmmc-2-0                  → CMMC 2.0
/talent-acquisition-news   → Talent Acquisition News
/corporate-compliance      → Corporate Compliance
```

**Navigation:**
- Top-level: Home | Solutions (dropdown) | Clients & Partners | Contracts | Jobs | Contact Us
- Solutions dropdown: 9 items linking to anchor sections on `/solutions`
- Footer: Contact Us link, phone number, social icons (Facebook, LinkedIn, Twitter)
- News/info pages linked from homepage cards and contracts page, not in main nav

## Section 3: Component Architecture

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── solutions/page.tsx
│   ├── client-partner/page.tsx
│   ├── contracts/page.tsx
│   ├── jobs/page.tsx
│   ├── contact-us/page.tsx
│   ├── cybersecurity-news/page.tsx
│   ├── cmmc-2-0/page.tsx
│   ├── talent-acquisition-news/page.tsx
│   └── corporate-compliance/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   │
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ServiceCards.tsx
│   │   ├── AboutSection.tsx
│   │   ├── NewsCards.tsx
│   │   └── MissionSection.tsx
│   │
│   ├── solutions/
│   │   └── SolutionBlock.tsx
│   │
│   ├── shared/
│   │   ├── PageHero.tsx
│   │   ├── LogoGrid.tsx
│   │   ├── DataTable.tsx
│   │   └── CTAButton.tsx
│   │
│   └── contact/
│       └── ContactInfo.tsx
```

**Key decisions:**
- Navbar: Sticky, responsive with hamburger on mobile, Solutions dropdown on hover/click
- Hero: Single banner replacing the current slider
- SolutionBlock: Reusable component for all 9 solution sections
- LogoGrid: Shared between clients and partners
- PageHero: Consistent header banner for all inner pages

## Section 4: Content Capture Strategy

**Step 1 — Scrape all page content** (completed, stored in `.firecrawl/mainsail/`)

**Step 2 — Download all images (~76 total)**

| Category | Count | Source |
|----------|-------|--------|
| Hero/banner images | 6 | Page headers |
| Solution icons | 9 | Solutions page |
| Client logos | ~40 | Clients & Partners page |
| Partner logos | ~9 | Clients & Partners page |
| Homepage featured image | 1 | OG/hero image |
| News/content images | ~5 | Homepage cards |
| Company logo | 1 | Navbar |
| Misc inline images | ~5 | BPM, ERP, MADe diagrams, Jobs badge |

**Step 3 — Structure content as JSON** with semantic fields per page

**Step 4 — Verify completeness** against original site

## Section 5: Initial Design Direction

**Typography:**
- Clean sans-serif: Inter or similar via Google Fonts
- Clear hierarchy, 16px base, consistent spacing via Tailwind

**Color palette (starting point, easy to swap later):**
- Navy blue primary (~#1B3A5C range)
- White backgrounds, light gray alternating sections
- Orange/gold accent for CTAs

**Layout:**
- Max-width container (~1280px) with generous padding
- Alternating white/light-gray section backgrounds
- Full-width hero banners with overlay text

**Design improvements over current site:**
- Responsive from day one
- Single hero instead of slider
- 3x3 card grid for services on homepage
- Alternating left/right layout for Solutions page sections
- Grayscale logo grid with hover color reveal for clients/partners
- Sticky nav with smooth scroll to solution anchors
- Hamburger menu with slide-out drawer on mobile

**Explicitly NOT included in initial build:**
- No animations/transitions beyond basic hover states
- No dark mode
- No custom illustrations
- No content rewrites

## Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Content**: Static JSON data files
- **Images**: Downloaded from current site, served from `public/images/`
- **Deployment**: Static export (`next export`) for easy hosting anywhere
