# Main Sail Website Mock Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a full working Next.js + Tailwind prototype of mainsailgroup.com with all current content preserved and a modern redesigned look.

**Architecture:** Scrape-first, build-second. Content lives as static JSON files in `content/`. Images are downloaded locally to `public/images/`. Next.js pages consume JSON data and render through reusable components. Static export for deployment.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, TypeScript

**Design doc:** `docs/plans/2026-02-14-mainsail-redesign-design.md`

**Scraped content:** `.firecrawl/mainsail/` (homepage.json, solutions.md, client-partner.md, contracts.md, jobs.md, contact-us.md, cybersecurity-news.md, cmmc-2-0.md, talent-acquisition-news.md, corporate-compliance.md, sitemap.txt)

---

## Phase 1: Content Capture

### Task 1: Extract and download all images

**Files:**
- Create: `.firecrawl/scratchpad/extract-images.sh`
- Create: `.firecrawl/scratchpad/download-images.sh`
- Create: `public/images/` directory tree

**Step 1: Extract all image URLs from scraped content**

Write a script that greps all image URLs from the scraped files:

```bash
#!/bin/bash
# .firecrawl/scratchpad/extract-images.sh
# Extract all unique image URLs from scraped markdown files

grep -ohP 'https?://www\.mainsailgroup\.com/wp-content/uploads/[^\s\)\]"]+' \
  .firecrawl/mainsail/*.md .firecrawl/mainsail/*.json \
  | sort -u > .firecrawl/scratchpad/image-urls.txt

echo "Found $(wc -l < .firecrawl/scratchpad/image-urls.txt) unique image URLs"
```

Run: `bash .firecrawl/scratchpad/extract-images.sh`

**Step 2: Create image directory structure**

```bash
mkdir -p public/images/{hero,solutions,clients,partners,general}
```

**Step 3: Download all images**

Write a download script that categorizes images into the right directories:

```bash
#!/bin/bash
# .firecrawl/scratchpad/download-images.sh

while IFS= read -r url; do
  filename=$(basename "$url")

  # Categorize by filename patterns
  if echo "$filename" | grep -qiE 'Featured-Image|hero'; then
    dir="public/images/hero"
  elif echo "$filename" | grep -qiE 'BPM|Cyb|ERP|IE|Picture5|MDA|PPM|ProgRes|SEI|Low-Code'; then
    dir="public/images/solutions"
  elif echo "$url" | grep -qiP '2019/02/'; then
    # Client logos are all in 2019/02 uploads
    dir="public/images/clients"
  elif echo "$filename" | grep -qiE 'barracuda|datto|fortinet|Goldratt|Gradient|SAP|SecureLinQ|Siemens|Webroot'; then
    dir="public/images/partners"
  else
    dir="public/images/general"
  fi

  echo "Downloading $filename -> $dir/"
  curl -sL "$url" -o "$dir/$filename"
done < .firecrawl/scratchpad/image-urls.txt

echo "Done. Downloaded $(find public/images -type f | wc -l) images."
```

Run: `bash .firecrawl/scratchpad/download-images.sh`
Expected: ~76 images downloaded across the directory tree

**Step 4: Verify images downloaded correctly**

Run: `find public/images -type f | sort`
Expected: Files in each subdirectory, no zero-byte files

Run: `find public/images -empty -type f` (should output nothing)

**Step 5: Commit**

```bash
git add public/images/
git commit -m "feat: download all images from current mainsailgroup.com"
```

---

### Task 2: Create global.json and navigation.json

**Files:**
- Create: `content/global.json`
- Create: `content/navigation.json`

**Reference:** `.firecrawl/mainsail/homepage.json` — extract nav structure, logo, footer content, social links.

**Step 1: Create content directory**

```bash
mkdir -p content/pages
```

**Step 2: Create global.json**

```json
{
  "companyName": "Main Sail",
  "companyFullName": "Main Sail LLC",
  "logo": "/images/general/MS-TM-e1637007258138.png",
  "phone": "216-472-5100",
  "phoneTel": "tel:2164725100",
  "fax": "216-472-5110",
  "email": "mainsail@mainsailgroup.com",
  "address": {
    "street": "8279 Mayfield Road, Unit 12",
    "city": "Chesterland",
    "state": "OH",
    "zip": "44026"
  },
  "social": {
    "facebook": "https://www.facebook.com/mainsailgroup",
    "linkedin": "https://www.linkedin.com/company/main-sail-llc",
    "twitter": "https://twitter.com/MainSailGroup"
  },
  "copyright": "2026 Main Sail",
  "tagline": "Main Sail helps organizations evaluate business needs, develop strategies, and implement solutions.",
  "ogImage": "/images/hero/Featured-Image-Homepage.jpg"
}
```

**Step 3: Create navigation.json**

```json
{
  "main": [
    { "label": "Home", "href": "/" },
    {
      "label": "Solutions",
      "href": "/solutions",
      "children": [
        { "label": "Business Process Management", "href": "/solutions#business-process-management" },
        { "label": "Cybersecurity", "href": "/solutions#cybersecurity" },
        { "label": "Enterprise Resource Planning", "href": "/solutions#enterprise-resource-planning" },
        { "label": "Intelligent Enterprise", "href": "/solutions#intelligent-enterprise" },
        { "label": "Low-Code Development", "href": "/solutions#low-code-development" },
        { "label": "Maintenance Design Analytics", "href": "/solutions#maintenance-design-analytics" },
        { "label": "Program & Project Management", "href": "/solutions#program-and-project-management" },
        { "label": "Program Resourcing", "href": "/solutions#program-resourcing" },
        { "label": "Systems Engineering & Integration", "href": "/solutions#systems-engineering-and-integration" }
      ]
    },
    { "label": "Clients & Partners", "href": "/client-partner" },
    { "label": "Contracts", "href": "/contracts" },
    { "label": "Jobs", "href": "/jobs" },
    { "label": "Contact Us", "href": "/contact-us" }
  ]
}
```

**Step 4: Commit**

```bash
git add content/
git commit -m "feat: add global and navigation content data"
```

---

### Task 3: Create home.json

**Files:**
- Create: `content/pages/home.json`

**Reference:** `.firecrawl/mainsail/homepage.json` — parse the markdown field for hero text, about section, service cards, news cards, ISO section, mission.

**Step 1: Create home.json**

Parse the homepage scrape data and structure into this format:

```json
{
  "hero": {
    "headline": "Main Sail helps organizations evaluate business needs, develop strategies, and implement solutions."
  },
  "about": {
    "title": "About Us",
    "text": "Main Sail LLC is a U.S. Veteran-Owned Small Business located in the Greater Cleveland, Ohio area. We provide expertise in the following areas:"
  },
  "serviceCards": [
    {
      "title": "Business Process Management",
      "description": "Main Sail helps businesses evaluate business issues and develop and implement solutions through Business Process Management, which is the application of both methodology and technology to optimize business processes for achieving enterprise goals.",
      "href": "/solutions#business-process-management"
    }
  ],
  "aboutExtended": {
    "paragraphs": [
      "Our strengths in enterprise applications architecture, analysis, design, and implementation combined with our expertise and experience in process improvements through Lean Manufacturing, Six-Sigma, and Critical Chain Project Management (Theory of Constraints) uniquely enable us to provide the most efficient solutions for an organization's business needs.",
      "We take pride in our reputation of helping both our government and commercial clients navigate to achieve their desired results by providing the highest quality services at competitive prices.",
      "Our ownership and management team has been involved in the enterprise technology market since its infancy, more than 25 years ago. We provide services and solutions delivered by the right people, at the right time, and at the right price to guarantee continued success."
    ]
  },
  "newsCards": [
    {
      "title": "Cybersecurity",
      "description": "Check out the latest Cybersecurity news!",
      "href": "/cybersecurity-news",
      "image": "/images/general/cyber.png"
    },
    {
      "title": "CMMC 2.0",
      "description": "Learn more about what CMMC 2.0 means for your organization.",
      "href": "/cmmc-2-0",
      "image": "/images/general/ga771ff85a0b9f97d2c38e168f62af8adfa2801fad7ec814730dfa7a14f7bf3bbb867b2244baf7f984d8c24f15b584f66_1920.jpg"
    },
    {
      "title": "Talent Acquisition",
      "description": "Curious about the tech talent gap?",
      "href": "/talent-acquisition-news",
      "image": "/images/general/g94f7a3caec13ae698595d53def3432e6aab24d692ba2182c821c1a08331823e0adf01f3b55957d2ed41be691a011cdc5_1920.jpg"
    }
  ],
  "iso": {
    "title": "ISO 9001:2015 Certified",
    "text": "Main Sail consistently achieves a high level of performance in quality and efficiency which can only be achieved by the deliberate and systematic application of sound management practices. We have defined our management system formally, and chose the latest ISO 9001 Standard as the basis for that system. The ISO Standard sets requirements for a quality management system based on a process approach.\n\nMain Sail's business is comprised of a set of repeatable business and quality processes that work together to provide consistent quality service. Main Sail's Business Management System is fully ISO 9001 certified."
  },
  "mission": {
    "title": "Our Mission",
    "text": "To provide our customers and our employees with a professional services organization that they can count on as fair, dependable and efficient, concentrating on achieving total team success."
  }
}
```

Populate all 9 service cards from the homepage scrape. Each card has: title, description (the short text from the homepage, not the full Solutions page text), and href.

**Step 2: Commit**

```bash
git add content/pages/home.json
git commit -m "feat: add homepage content data"
```

---

### Task 4: Create solutions.json

**Files:**
- Create: `content/pages/solutions.json`

**Reference:** `.firecrawl/mainsail/solutions.md` (lines 35-215)

**Step 1: Create solutions.json**

Structure each of the 9 solution areas. Each solution has: id, title, icon, description (main paragraph), bullets (if any), additionalText (if any), and links (if any).

```json
{
  "pageTitle": "Main Sail's Solutions Offering",
  "heroImage": "/images/hero/Featured-Image-Solutions.jpg",
  "intro": "Main Sail LLC helps organizations evaluate business needs, develop strategies, and implement solutions. We provide expertise in Business Process Management, Cybersecurity, Enterprise Resource Planning, Intelligent Enterprise, Low-Code Development, Maintenance Design Analytics, Program Resourcing, Program and Project Management, and Systems Engineering and Integration.",
  "solutions": [
    {
      "id": "business-process-management",
      "title": "Business Process Management",
      "icon": "/images/solutions/BPM-1.png",
      "description": "Main Sail helps businesses evaluate business issues...",
      "benefitsTitle": "Benefits of BPM",
      "bullets": ["Agility and ability to quickly respond...", "..."],
      "additionalText": "Main Sail's experienced BPM practitioners..."
    }
  ]
}
```

Copy the FULL text from each solution section in the scraped file. Do not truncate or summarize. Include all bullet points, sub-bullets, and links exactly as they appear.

**Step 2: Commit**

```bash
git add content/pages/solutions.json
git commit -m "feat: add solutions content data"
```

---

### Task 5: Create clients.json

**Files:**
- Create: `content/pages/clients.json`

**Reference:** `.firecrawl/mainsail/client-partner.md` (lines 35-150)

**Step 1: Create clients.json**

```json
{
  "pageTitle": "Clients & Partners",
  "heroImage": "/images/hero/Featured-Image-Clients.jpg",
  "clientsIntro": "Main Sail LLC is proud to serve a broad base of clients in both the public and private sectors.\n\nPlease contact us for references and specific past performance. Some of our clients include:",
  "clients": [
    { "name": "AkzoNobel", "logo": "/images/clients/AkzoNobel.png" },
    { "name": "Applied Industrial Technologies", "logo": "/images/clients/Applied-Industrial-Technologies.png" }
  ],
  "partnersIntro": "Main Sail is a Partner with these market leading technology solutions companies:",
  "partners": [
    { "name": "Barracuda", "logo": "/images/partners/barracuda-e1628512967710.png" }
  ]
}
```

Include ALL ~40 client logos and ALL ~9 partner logos. Use the exact filenames from the scraped content mapped to the `public/images/clients/` and `public/images/partners/` paths.

**Step 2: Commit**

```bash
git add content/pages/clients.json
git commit -m "feat: add clients and partners content data"
```

---

### Task 6: Create contracts.json

**Files:**
- Create: `content/pages/contracts.json`

**Reference:** `.firecrawl/mainsail/contracts.md` (lines 35-132)

**Step 1: Create contracts.json**

Structure the two major contract sections (SeaPort-NxG and GSA MAS), including the team members table and task orders table. Preserve all text, tables, and links exactly.

**Step 2: Commit**

```bash
git add content/pages/contracts.json
git commit -m "feat: add contracts content data"
```

---

### Task 7: Create jobs.json

**Files:**
- Create: `content/pages/jobs.json`

**Reference:** `.firecrawl/mainsail/jobs.md` (lines 35-73)

**Step 1: Create jobs.json**

```json
{
  "pageTitle": "Jobs",
  "heroImage": "/images/hero/Featured-Image-Jobs.jpg",
  "heading": "Employment Opportunities",
  "intro": "View our open employment opportunities and submit your resume here:",
  "jobdivaLink": "https://www2.jobdiva.com/portal/?a=dojdnwwnfiel9lklpfn9szx03u16fa030ftuqrlg7hm5wo7qnqryscke4xbcp7wq&compid=-1#/",
  "jobdivaBadge": "/images/general/jobs2-1-300x279-1.png",
  "description": "We can describe a typical career path with Main Sail...",
  "careerText": "Main Sail consistently offers employment opportunities...",
  "benefitsIntro": "We'll provide challenging jobs at our Fortune 500 and Public Sector clients, plus opportunities for personal and professional growth. Our employment opportunities also come with a generous benefits program, which includes:",
  "benefits": [
    "Market-based compensation",
    "Project performance bonus",
    "Billable hours incentive bonus",
    "Paid vacation",
    "Paid time off (PTO)",
    "Paid holidays",
    "Major medical with prescription plan",
    "Dental",
    "Company paid long term disability",
    "401(k) with matching program",
    "Company paid term life and AD&D",
    "Continuous training",
    "Flexible spending account",
    "Bi-weekly payroll and expense reimbursement"
  ],
  "closingText": "If you're looking for a job opportunity at an organization that is on the move, rewards achievements, and values job experience, please forward your resume to",
  "resumeEmail": "resumes@mainsailgroup.com"
}
```

**Step 2: Commit**

```bash
git add content/pages/jobs.json
git commit -m "feat: add jobs content data"
```

---

### Task 8: Create contact.json

**Files:**
- Create: `content/pages/contact.json`

**Reference:** `.firecrawl/mainsail/contact-us.md` (lines 35-60)

**Step 1: Create contact.json**

```json
{
  "pageTitle": "Contact Us",
  "phone": "(216) 472-5100",
  "fax": "(216) 472-5110",
  "email": "mainsail@mainsailgroup.com",
  "address": {
    "company": "Main Sail LLC",
    "street": "8279 Mayfield Road, Unit 12",
    "city": "Chesterland, OH 44026"
  },
  "parkingNote": "Our parking lot is located directly on Mayfield Road, east of Lynn Drive.",
  "mapCoordinates": {
    "lat": 41.5105,
    "lng": -81.3340
  }
}
```

**Step 2: Commit**

```bash
git add content/pages/contact.json
git commit -m "feat: add contact content data"
```

---

### Task 9: Create remaining page JSONs

**Files:**
- Create: `content/pages/cybersecurity-news.json`
- Create: `content/pages/cmmc-2-0.json`
- Create: `content/pages/talent-acquisition-news.json`
- Create: `content/pages/corporate-compliance.json`

**Reference:** Corresponding `.firecrawl/mainsail/*.md` files (lines 35+ of each)

**Step 1: Read each scraped file and create the JSON**

For each page, extract the unique content (skip the repeated nav/footer) and structure as JSON with: pageTitle, content sections, any links, any images.

**Step 2: Commit**

```bash
git add content/pages/cybersecurity-news.json content/pages/cmmc-2-0.json \
  content/pages/talent-acquisition-news.json content/pages/corporate-compliance.json
git commit -m "feat: add news and compliance content data"
```

---

### Task 10: Verify content completeness

**Step 1: Count and compare**

Run verification checks:

```bash
# Verify all images exist and are non-empty
find public/images -type f | wc -l
find public/images -empty -type f

# Verify all content JSON files exist
ls -la content/pages/
ls -la content/*.json

# Verify all nav links in navigation.json have corresponding pages
cat content/navigation.json | jq -r '.. | .href? // empty' | sort -u
ls src/app/*/page.tsx 2>/dev/null || echo "Pages not built yet - will verify after Phase 2"
```

**Step 2: Cross-reference content**

Open each JSON file and spot-check against the original scraped markdown to ensure no content was dropped.

**Step 3: Commit any fixes**

```bash
git add -A && git commit -m "fix: content completeness corrections" || echo "No fixes needed"
```

---

## Phase 2: Project Scaffold

### Task 11: Initialize Next.js + Tailwind project

**Step 1: Create Next.js app**

Run from the project root. Since files already exist, use a temp directory and move:

```bash
cd /home/ijoec/projects
npx create-next-app@latest ms-mock1-temp --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

Select defaults for all prompts.

**Step 2: Move Next.js files into existing project**

```bash
# Copy Next.js scaffold files into existing project, preserving our existing files
cp ms-mock1-temp/package.json ms-mock1/
cp ms-mock1-temp/tsconfig.json ms-mock1/
cp ms-mock1-temp/next.config.ts ms-mock1/
cp ms-mock1-temp/postcss.config.mjs ms-mock1/
cp ms-mock1-temp/eslint.config.mjs ms-mock1/
cp -r ms-mock1-temp/src ms-mock1/
cp ms-mock1-temp/next-env.d.ts ms-mock1/ 2>/dev/null || true

# Merge gitignore (keep our .firecrawl/ entry, add Next.js entries)
cat ms-mock1-temp/.gitignore >> ms-mock1/.gitignore
sort -u ms-mock1/.gitignore -o ms-mock1/.gitignore

# Clean up temp
rm -rf ms-mock1-temp
```

**Step 3: Install dependencies**

```bash
cd /home/ijoec/projects/ms-mock1
npm install
```

**Step 4: Add Inter font**

```bash
npm install @fontsource-variable/inter
```

**Step 5: Verify dev server starts**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000 | head -20
kill %1
```

Expected: HTML output from the default Next.js page.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js + Tailwind project scaffold"
```

---

### Task 12: Configure Tailwind theme and global styles

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Set up globals.css with Tailwind and custom theme**

Replace the default `globals.css` with:

```css
@import "tailwindcss";
@import "@fontsource-variable/inter";

@theme {
  --color-navy-50: #f0f4f8;
  --color-navy-100: #d9e2ec;
  --color-navy-200: #bcccdc;
  --color-navy-300: #9fb3c8;
  --color-navy-400: #829ab1;
  --color-navy-500: #627d98;
  --color-navy-600: #486581;
  --color-navy-700: #334e68;
  --color-navy-800: #243b53;
  --color-navy-900: #102a43;
  --color-navy-950: #0a1929;

  --color-accent-400: #f0b429;
  --color-accent-500: #de911d;
  --color-accent-600: #cb6e17;

  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
}
```

**Step 2: Update layout.tsx**

Replace the default `layout.tsx` with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

import global from "../../content/global.json";

export const metadata: Metadata = {
  title: `${global.companyName} - an Information Technology Consulting & Solutions Company`,
  description: global.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-navy-900 bg-white">
        {children}
      </body>
    </html>
  );
}
```

**Step 3: Verify dev server still runs**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000 | head -20
kill %1
```

**Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: configure Tailwind theme with Main Sail brand colors"
```

---

### Task 13: Create placeholder pages for all routes

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/solutions/page.tsx`
- Create: `src/app/client-partner/page.tsx`
- Create: `src/app/contracts/page.tsx`
- Create: `src/app/jobs/page.tsx`
- Create: `src/app/contact-us/page.tsx`
- Create: `src/app/cybersecurity-news/page.tsx`
- Create: `src/app/cmmc-2-0/page.tsx`
- Create: `src/app/talent-acquisition-news/page.tsx`
- Create: `src/app/corporate-compliance/page.tsx`

**Step 1: Create directories**

```bash
mkdir -p src/app/{solutions,client-partner,contracts,jobs,contact-us,cybersecurity-news,cmmc-2-0,talent-acquisition-news,corporate-compliance}
```

**Step 2: Create placeholder page for each route**

Each page.tsx should be a simple placeholder like:

```tsx
export default function SolutionsPage() {
  return <main className="container mx-auto px-4 py-20"><h1 className="text-4xl font-bold">Solutions</h1></main>;
}
```

Create one for each route with the correct page title.

**Step 3: Verify all routes respond**

```bash
npm run dev &
sleep 5
for route in / /solutions /client-partner /contracts /jobs /contact-us /cybersecurity-news /cmmc-2-0 /talent-acquisition-news /corporate-compliance; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$route")
  echo "$route -> $status"
done
kill %1
```

Expected: All routes return 200.

**Step 4: Commit**

```bash
git add src/app/
git commit -m "feat: add placeholder pages for all routes"
```

---

## Phase 3: Build Components

### Task 14: Build Navbar and Footer (layout shell)

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/MobileMenu.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create component directories**

```bash
mkdir -p src/components/{layout,home,solutions,shared,contact}
```

**Step 2: Build Navbar.tsx**

A sticky top nav with:
- Logo on the left (linked to /)
- Nav links on the right from `navigation.json`
- Solutions item has a dropdown that appears on hover/click
- Responsive: hidden on mobile, replaced by hamburger trigger
- White background with subtle bottom shadow

Read `content/navigation.json` and `content/global.json` for data.

**Step 3: Build MobileMenu.tsx**

Client component (`"use client"`) with:
- Hamburger button (visible only on mobile/tablet)
- Slide-out drawer from the right with all nav links
- Solutions section expands/collapses as an accordion
- Overlay backdrop that closes the menu on click

**Step 4: Build Footer.tsx**

- Dark navy background
- Social icons row (Facebook, LinkedIn, Twitter) — use simple SVG icons or text links
- Contact Us link + phone number
- Copyright line from `global.json`

**Step 5: Wire into layout.tsx**

Update `src/app/layout.tsx` to import and render Navbar and Footer wrapping `{children}`.

**Step 6: Verify nav and footer render on all pages**

Run dev server, check that nav links navigate correctly between pages, Solutions dropdown works, mobile menu toggles.

**Step 7: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx
git commit -m "feat: build Navbar, MobileMenu, and Footer layout components"
```

---

### Task 15: Build shared components

**Files:**
- Create: `src/components/shared/PageHero.tsx`
- Create: `src/components/shared/CTAButton.tsx`
- Create: `src/components/shared/LogoGrid.tsx`
- Create: `src/components/shared/DataTable.tsx`

**Step 1: Build PageHero.tsx**

Props: `title: string`, `backgroundImage: string`

Full-width banner with background image, dark overlay, and white title text centered. Used as the header for all inner pages.

**Step 2: Build CTAButton.tsx**

Props: `href: string`, `children: React.ReactNode`, `variant?: "primary" | "secondary"`

Primary: navy background, white text, hover darkens.
Secondary: outline style, navy border, navy text.

**Step 3: Build LogoGrid.tsx**

Props: `logos: Array<{ name: string; logo: string }>`, `grayscale?: boolean`

Responsive grid of logo images. If `grayscale` is true, logos render in grayscale and reveal color on hover (CSS filter). Grid: 5-6 columns on desktop, 3 on tablet, 2 on mobile.

**Step 4: Build DataTable.tsx**

Props: `headers: string[]`, `rows: string[][]`

Clean table with alternating row backgrounds, responsive horizontal scroll on mobile.

**Step 5: Commit**

```bash
git add src/components/shared/
git commit -m "feat: build shared PageHero, CTAButton, LogoGrid, DataTable components"
```

---

### Task 16: Build Homepage

**Files:**
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/ServiceCards.tsx`
- Create: `src/components/home/AboutSection.tsx`
- Create: `src/components/home/NewsCards.tsx`
- Create: `src/components/home/MissionSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build Hero.tsx**

Full-width hero banner with:
- Background image (or navy gradient if no hero image)
- Large headline text from `home.json` hero.headline
- Subtle dark overlay for text readability

**Step 2: Build ServiceCards.tsx**

3x3 responsive grid of cards. Each card has:
- Title (bold)
- Short description
- "Find out more" link to the Solutions page anchor
- Subtle hover effect (shadow lift)

Data from `home.json` serviceCards array.

**Step 3: Build AboutSection.tsx**

Two sections:
- Short "About Us" intro text
- Extended paragraphs with company background

Light gray background to contrast with white card section above.

**Step 4: Build NewsCards.tsx**

Row of 3 cards (responsive). Each card has:
- Image thumbnail
- Title
- Short description
- "Find out more" link

Data from `home.json` newsCards array.

**Step 5: Build MissionSection.tsx**

Two-column layout (stacks on mobile):
- Left: ISO 9001:2015 certification text
- Right: Mission statement

**Step 6: Assemble homepage**

Update `src/app/page.tsx` to import and stack all homepage components in order:
1. Hero
2. ServiceCards
3. AboutSection
4. NewsCards
5. MissionSection

**Step 7: Verify homepage renders correctly**

Run dev server, visually check all sections render with correct content.

**Step 8: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: build homepage with hero, services, about, news, and mission sections"
```

---

### Task 17: Build Solutions page

**Files:**
- Create: `src/components/solutions/SolutionBlock.tsx`
- Modify: `src/app/solutions/page.tsx`

**Step 1: Build SolutionBlock.tsx**

Props: `solution` object from `solutions.json`

Layout: alternating left/right for visual interest.
- Even-indexed solutions: icon on left, text on right
- Odd-indexed solutions: text on left, icon on right
- Each block has an `id` attribute matching the anchor
- Title, description paragraph(s), bullet list, additional text, any links
- Light section divider between blocks

**Step 2: Build Solutions page**

- PageHero at top with "Solutions" title and hero image
- Intro paragraph
- Map over `solutions.json` solutions array, render SolutionBlock for each
- Each SolutionBlock gets its index for alternating layout

**Step 3: Verify anchor navigation works**

Click each Solutions dropdown link from the Navbar — should smooth-scroll to the correct section.

**Step 4: Commit**

```bash
git add src/components/solutions/ src/app/solutions/page.tsx
git commit -m "feat: build Solutions page with alternating solution blocks"
```

---

### Task 18: Build Clients & Partners page

**Files:**
- Modify: `src/app/client-partner/page.tsx`

**Step 1: Build the page**

- PageHero with "Clients & Partners" title and hero image
- "Clients" section heading + intro text
- LogoGrid component with all ~40 client logos (grayscale with hover color reveal)
- "Partners" section heading + intro text
- LogoGrid component with ~9 partner logos

Data from `content/pages/clients.json`.

**Step 2: Verify all logos render**

Run dev server, visually confirm all client and partner logos display correctly.

**Step 3: Commit**

```bash
git add src/app/client-partner/page.tsx
git commit -m "feat: build Clients & Partners page with logo grids"
```

---

### Task 19: Build Contracts page

**Files:**
- Modify: `src/app/contracts/page.tsx`

**Step 1: Build the page**

- PageHero with "Contracts" title and hero image
- SeaPort-NxG section with description text, team members DataTable, task orders DataTable, QA Program text
- GSA MAS section with description, contract details, SIN info, links
- Corporate Compliance and Privacy Policy links at bottom

Data from `content/pages/contracts.json`.

**Step 2: Commit**

```bash
git add src/app/contracts/page.tsx
git commit -m "feat: build Contracts page with SeaPort-NxG and GSA MAS sections"
```

---

### Task 20: Build Jobs page

**Files:**
- Modify: `src/app/jobs/page.tsx`

**Step 1: Build the page**

- PageHero with "Jobs" title and hero image
- "Employment Opportunities" heading
- Intro text + JobDiva portal link with badge image
- Description paragraphs
- Benefits list (styled as a two-column list on desktop)
- Closing text with resume email link

Data from `content/pages/jobs.json`.

**Step 2: Commit**

```bash
git add src/app/jobs/page.tsx
git commit -m "feat: build Jobs page with benefits and JobDiva link"
```

---

### Task 21: Build Contact Us page

**Files:**
- Create: `src/components/contact/ContactInfo.tsx`
- Modify: `src/app/contact-us/page.tsx`

**Step 1: Build ContactInfo.tsx**

Displays phone, fax, email (as clickable links), and full address.

**Step 2: Build the page**

- "Contact Us" heading
- ContactInfo component
- Parking note text
- Embedded Google Maps iframe or static map placeholder (using the address coordinates)

Data from `content/pages/contact.json`.

**Step 3: Commit**

```bash
git add src/components/contact/ src/app/contact-us/page.tsx
git commit -m "feat: build Contact Us page with contact info and map"
```

---

### Task 22: Build remaining info pages

**Files:**
- Modify: `src/app/cybersecurity-news/page.tsx`
- Modify: `src/app/cmmc-2-0/page.tsx`
- Modify: `src/app/talent-acquisition-news/page.tsx`
- Modify: `src/app/corporate-compliance/page.tsx`

**Step 1: Build each page**

These are simpler content pages. Each gets:
- Page title heading
- Content sections rendered from their respective JSON files
- Any links or resources preserved

Data from corresponding `content/pages/*.json` files.

**Step 2: Commit**

```bash
git add src/app/cybersecurity-news/ src/app/cmmc-2-0/ src/app/talent-acquisition-news/ src/app/corporate-compliance/
git commit -m "feat: build cybersecurity news, CMMC 2.0, talent acquisition, and compliance pages"
```

---

## Phase 4: Polish

### Task 23: Responsive testing and fixes

**Step 1: Test all pages at mobile (375px), tablet (768px), and desktop (1280px) widths**

Run dev server, check every page at each breakpoint. Fix any layout issues:
- Navbar collapses to hamburger on mobile
- Grids stack properly
- Text is readable at all sizes
- Images scale appropriately
- Tables scroll horizontally on mobile

**Step 2: Commit fixes**

```bash
git add -A
git commit -m "fix: responsive layout adjustments across all breakpoints"
```

---

### Task 24: Smooth scroll and navigation polish

**Step 1: Verify smooth scroll**

Confirm `scroll-behavior: smooth` in globals.css works for Solutions page anchor links.

**Step 2: Active nav state**

Add visual indicator (underline or bold) for the currently active nav item based on the current route.

**Step 3: Solutions dropdown behavior**

Ensure dropdown closes when a link is clicked and when clicking outside.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: polish navigation with active states and smooth scroll"
```

---

### Task 25: Final visual review and build verification

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 2: Test production build locally**

```bash
npm run start &
sleep 3
# Check all routes
for route in / /solutions /client-partner /contracts /jobs /contact-us /cybersecurity-news /cmmc-2-0 /talent-acquisition-news /corporate-compliance; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$route")
  echo "$route -> $status"
done
kill %1
```

Expected: All routes return 200.

**Step 3: Visual spot-check**

Open each page in the browser and verify:
- All text content matches the original site
- All images load
- Navigation works (including Solutions dropdown anchors)
- Footer renders correctly
- Mobile menu works

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Main Sail website mock redesign prototype"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| Phase 1 | Tasks 1-10 | Content capture: scrape, download images, structure JSON |
| Phase 2 | Tasks 11-13 | Scaffold: Next.js + Tailwind setup, routing, placeholder pages |
| Phase 3 | Tasks 14-22 | Build: layout, shared components, all 10 pages |
| Phase 4 | Tasks 23-25 | Polish: responsive fixes, nav polish, build verification |
