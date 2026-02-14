# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev`
- **Production build:** `npm run build`
- **Start production:** `npm start`
- **Lint:** `npm run lint`

No test framework is configured.

## Architecture

This is a **static brochure website** for Main Sail LLC built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4.

### Content-driven data model

All page content lives as JSON files in `content/` — there is no database or API.

- `content/global.json` — company metadata (name, phone, email, address, social links)
- `content/navigation.json` — nav structure with nested dropdown children
- `content/pages/*.json` — per-page content (solutions, jobs, contracts, etc.)

Pages import JSON directly (`import data from "../../../content/pages/X.json"`) and render at build time. To update page content, edit the JSON files.

### Routing

All routes are static files under `src/app/` using the App Router. No dynamic `[param]` routes exist.

### Components

- `src/components/layout/` — Navbar, NavLinks (client), MobileMenu (client), Footer
- `src/components/home/` — Hero, ServiceCards, AboutSection, NewsCards, MissionSection
- `src/components/shared/` — PageHero, CTAButton, LogoGrid, DataTable
- `src/components/solutions/SolutionBlock.tsx` — complex renderer for the solutions page; handles nested subsections, mixed bullet formats (strings or objects with sub-bullets/links), images, and closing text

Only two components are client-side (`"use client"`): `NavLinks` (uses `usePathname()`) and `MobileMenu` (menu state). Everything else is a server component.

### Styling

Tailwind CSS 4 with custom theme tokens defined in `src/app/globals.css` via `@theme`:

- **Navy palette** (`navy-50` through `navy-950`) — primary colors for text, backgrounds, borders
- **Accent palette** (`accent-400` through `accent-600`) — orange/gold for links and highlights
- **Font:** Inter via `--font-sans`

### Path alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

### Static assets

Images live in `public/images/` organized by subdirectory: `hero/`, `general/`, `clients/`, `partners/`, `solutions/`. Referenced in JSON as `/images/...` paths and rendered with Next.js `<Image>`.
