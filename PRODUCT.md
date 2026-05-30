# Product

## Register

brand

## Users

**Primary: Federal program leads vetting capability.** Procurement officers, contracting officers (KOs) and contracting specialists, and program managers across DoD, DoE, agency-level, and consortium-channel buyers (IWRP, MSTIC, NSTXL, Cornerstone OTA, NCMS). They typically arrive *warm*: from a contract-vehicle search, an OTA referral, a CMMC/ISO certification check, or because Main Sail is already on an RFP shortlist. Their job-to-be-done is to confirm in five minutes that this 25-year VOSB can deliver on a specific scope, and to walk into the next internal conversation without doubt about whether to keep Main Sail in the running.

**Secondary: Enterprise IT decision-makers.** VPs and Directors of IT, Operations, and Digital Transformation at private-sector firms in the Timken / PNC / Thermo Fisher / Materion / Medical Mutual tier. They arrive evaluating a partner for a specific transformation initiative (SAP migration, predictive maintenance, RPA at scale, data and analytics). Federal credentials function as trust signals here, not headlines. The same capability set serves them; the framing shifts from "mission readiness" to "operational outcomes."

**Both audiences are warm, not cold.** Most visitors already know who Main Sail is. The site does not need to pitch; it needs to close.

## Product Purpose

A credibility closer for a 25-year veteran-owned IT services firm. Main Sail Technology Solutions delivers strategic IT consulting and implementation across six practice areas: Digital Engineering and Manufacturing, Maintenance and Logistics Optimization, Enterprise IT and Transformation, Data and Analytics, Program Support, and Intelligent Automation. Clients span the federal government (Navy, Marines, Army, DoD, DoE, NCEL, NCTL) and major enterprise (PNC, Thermo Fisher, Timken, Materion, Medical Mutual, Parker, Jabil, Two Men and a Truck, AkzoNobel, Invacare). Holds CMMC Level 2 and ISO 9001:2015 certification. Active member of IWRP, MSTIC, NSTXL, Cornerstone OTA, and NCMS.

The website is the company's largest asynchronous trust-building surface. Success is measured in cycle-time compression, not lead volume. A successful visit produces a federal program lead who walks into their next internal stand-up confident that Main Sail belongs on the shortlist; an enterprise prospect who replies to a sales email already convinced, with one specific question about their initiative.

## Brand Personality

**Strategic. Mission-driven. Modern.**

The voice is advisory, not tactical: closer to a senior strategy consultant than a contractor's project manager. Plainspoken, no consulting jargon, no military-themed metaphors layered onto civilian work. Mission-driven shows up in *substance* (specific outcomes for specific clients, certifications named directly), not in flag-waving language or imagery. Modern means contemporary execution, geometric Outfit typography, tinted ambient depth, and a single deliberate accent, never "modern" as a synonym for animated or flashy.

Capability speaks for itself. Twenty-five years, two hundred and fifty programs, and one and a half million consulting hours are not bragging when they are simply true; the design treats them as data points, not slogans. The voice never raises its volume to be heard.

Emotional goals: confidence on first scroll, calm on second scroll, and one moment of pleasant surprise (the consortium tile interactions, the layered hover lifts, the service-area accent system) that signals craft on the third.

## Anti-references

**The single most important anti-reference: the generic federal IT contractor visual register.** Specifically the Booz Allen, Leidos, SAIC, CACI, ManTech template: navy-blue plus gold accents, an American flag overlay or watermark, stock photography of server racks and serious people in conference rooms, "Solutions" headlines, and capability lists that could belong to any of twenty other firms. That category is saturated; Main Sail loses by blending in. Reading the site, a procurement officer should never think "this is one of *those.*"

Other patterns to avoid:

- **The modern AI / SaaS marketing aesthetic.** Dark gradient heroes, glassmorphism cards, neon accents, animated mesh backgrounds, "AI-powered" headlines. Reads as venture-backed startup; wrong register for a 25-year VOSB.
- **The boutique consultancy / agency portfolio template.** Editorial-magazine oversized typography as the design statement, slow-load full-bleed video, "thought leadership" voice. Wrong audience signal: prospects need operational scale, not creative taste.
- **The .gov / USWDS template.** Blocky cards, system blue, Source Sans Pro plain. Main Sail builds for government; it is not a government agency.
- **Flag-and-dog-tag visual cliches.** No flag overlays, no service-branch silhouettes, no "Mission. Honor. Service." typographic moments. VOSB status is a fact stated in a badge, not a styling choice.
- **Generic "Solutions Partner" stock photography.** Two people pointing at a laptop screen, smiling stock-photo handshakes, blue-toned conference rooms. Brand assets must be specific (named clients, named consortia, real workplace).

## Design Principles

1. **Credibility through specificity.** Generic claims read as false. Name the client (Navy, Timken, PNC), name the certification (CMMC Level 2, ISO 9001:2015), name the consortium (IWRP, NSTXL, MSTIC), name the outcome (the stat trio: 250+ programs, 25+ years, 1.5M consulting hours). Replace any "trusted partner" / "industry leader" / "innovative solutions" copy with the specific fact behind it.

2. **The site closes; it does not pitch.** Most visitors arrive warm. Anything that reads like cold sales (urgency banners, gated lead magnets, popup CTAs, "schedule a demo" mid-page) breaks trust. Closing language is calm, declarative, and confident: "let's discuss how Main Sail can help you modernize." The single CTA pattern (band at the end of capability pages) is the only sales surface.

3. **Veteran-led without flag-waving.** VOSB is the value, the visual is the restraint. The sole VOSB callout is the pill badge in the hero. Everywhere else, veteran identity shows through *operational rigor*: how the work is described, the discipline of the design system, the absence of marketing varnish. Never lean on flag imagery, military typography, or service-branch motifs.

4. **Operations density with editorial breathing room.** Federal procurement officers scan for proof, not story. Pages should carry density when density earns trust (certifications grouped, capability lists with specifics, case-study stat strips) and breathing room everywhere else, so the page never feels like a desperate pitch. The 4rem to 8rem section padding is intentional: this is a confident company, not one fighting for attention.

5. **Capability density is the value proposition.** Six practice areas under one veteran-owned roof is the structural argument. The home page service grid, the mega-dropdown, the per-area accent color system, and the case-study cross-linking exist to make this legible at a glance. Removing or hiding any practice area weakens the central pitch.

## Accessibility & Inclusion

**Target: WCAG 2.2 AA.** Section 508 compatibility is a procurement-relevant baseline; 2.2 AA is the going-forward bar. Key requirements:

- **Color contrast.** All text meets 4.5:1 minimum (3:1 for large text). Bridge Blue (#197BBD) on white passes for non-text and large text but fails for body; never use Bridge Blue for body copy. Hull Teal (#204B57) on Worksurface Cream and white passes everywhere.
- **Keyboard parity.** Every interactive surface (CTAs, nav links, mega-dropdown items, mobile-nav accordion, anchor sub-nav, form inputs, consortium tiles, social icons) is reachable and operable by keyboard with a visible Bridge Blue focus ring (existing implementation).
- **Reduced motion.** `prefers-reduced-motion: reduce` already disables ticker animations. Extend the same gate to all reveal-on-scroll motion and to the mega-dropdown spring transitions.
- **Alt text.** Every brand asset, capability photo, client logo, and consortium logo carries descriptive alt text. Decorative grain overlays and gradients use empty alt or are pure CSS.
- **Touch targets.** 44x44px minimum on all interactive elements (existing pattern: mobile-nav-toggle, hamburger, social icons all meet this).
- **Form semantics.** Every input has a visible label tied via `for`/`id`. Error states (when added) communicate via `aria-invalid` and `aria-describedby`, not color alone.
- **Language and structure.** `lang="en"` on every page, single h1 per page, semantic landmarks (`header`, `nav`, `main`, `footer`) used as is the case in the existing markup.

Run an automated audit (axe-core or Lighthouse) on every new template before merging. Resolve any violations or document a deliberate exception in a per-page comment.
