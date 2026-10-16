# Roadmap: Prashant Shukla Portfolio

## Milestone 1: Design Foundation & Living Skeleton

**Goal:** A fully scrollable single-page portfolio with all sections laid out, the Structured Intensity design system implemented, navigation working, and the hero section's 3D orbital geometry alive. Every section has real content but basic layout - this skeleton becomes the canvas that subsequent milestones paint on.

**Success Criteria:** A recruiter could scroll through the entire page top-to-bottom, see Prashant's story in order, navigate via sticky header, and feel the design language immediately. The hero 3D canvas runs at 60fps. Dark/light mode works.

### Phase 1: Project Scaffolding & Design System

**Goal:** Vite project initialized, Structured Intensity design system codified in CSS, fonts loaded, build pipeline verified.

**Delivers:** FOUND-01, FOUND-02, FOUND-03, FOUND-05, FOUND-06

**UAT:**
- `npm run dev` serves the page at localhost
- All 3 Google Fonts load (Manrope, IBM Plex Mono, Newsreader)
- CSS custom properties defined for all design tokens
- 12-column grid visible in dev tools
- Design system demo page shows all typography sizes, colors, and spacing

### Phase 2: Navigation & Page Structure

**Goal:** Sticky navigation bar, semantic HTML sections for all 5 areas, smooth scroll-to-section, dark/light mode toggle, active section highlighting.

**Delivers:** FOUND-04, NAV-01, NAV-02, NAV-03, NAV-05, RESP-06

**UAT:**
- Clicking any nav button smoothly scrolls to the correct section
- Scroll position updates the active nav indicator
- Dark mode is default; toggle switches to light mode and back
- HTML passes semantic structure check (h1 hierarchy, landmarks)
- Navigation typography matches Manrope spec

### Phase 3: Hero Section with 3D Orbital Canvas

**Goal:** Immersive full-viewport hero with Three.js orbital geometry, personal narrative text, entrance animations.

**Delivers:** HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06, 3D-01

**UAT:**
- Three.js canvas renders concentric orbital geometry at 60fps
- Hero headline uses Manrope 56–80px
- IBM Plex Mono metadata line visible beneath name
- GSAP entrance animation plays on page load (text + 3D staggered reveal)
- Scroll indicator visible and animated at bottom of hero
- 3D scene responds to gentle mouse movement (parallax)

### Phase 4: Professional Experience - Content & Layout

**Goal:** All 7 experience entries laid out with company details, logos, roles, bullets, and LinkedIn links. Category filter tabs (Work, Entrepreneurship, Leadership, Creative).

**Delivers:** EXP-02, EXP-03, EXP-04, EXP-05, EXP-06

**UAT:**
- All 7 entries visible: IQVIA, Revolut, Ketto, Kalam Labs, FAOUD, Abhyuday, Placement Cell
- Each entry shows: company name, role, dates, 3–4 bullets, logo placeholder, LinkedIn link
- Category tabs filter entries correctly
- LinkedIn links open correct company pages in new tab
- Typography and colors match Structured Intensity

### Phase 5: Experience - 3D Timeline & Scroll Animations

**Goal:** Transform the experience section from flat cards to an interactive 3D timeline floating in space. Scroll-triggered animations reveal each entry.

**Delivers:** EXP-01, EXP-07, EXP-08, 3D-06

**UAT:**
- Experience section rendered as 3D spatial timeline (Three.js)
- Scrolling traverses through timeline in z-depth
- Timeline nodes animate in with GSAP ScrollTrigger
- Tungsten Amber (#C38B55) used for timeline highlights
- Category filters still work within the 3D timeline
- Performance: 60fps on modern desktop

### Phase 6: Projects Section - Cinematic Case Studies

**Goal:** All 6 projects as cinematic cards with click-to-expand showcases, screenshot slideshows integrated into the design.

**Delivers:** PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05, PROJ-06, PROJ-07

**UAT:**
- 6 project cards visible with name, description, tech badges, thumbnail
- Clicking a card expands into full showcase with GSAP animation
- Expanded view shows: description, innovations, tech stack, URL/GitHub link
- Screenshots displayed in slideshow that matches site aesthetic (not generic carousel)
- Slideshow transitions use design language motion timings
- Close button collapses showcase smoothly
- All project URLs/links are correct and functional

### Phase 7: Education & Contact Sections

**Goal:** Education section with IIT Bombay, school achievements, campus governance (Abhyuday, Placement Cell), and extracurriculars. Contact section with all links and resume PDF download.

**Context & Logos:**
- IIT Bombay: Aerospace Engineering (B.Tech 2026) [`Indian_Institute_of_Technology_Bombay_Logo.svg.webp`]
- Campus Governance: Abhyuday (Head, ₹10M+ budget) & Placement Cell (Coordinator, 2000+ students)
- St. Francis' College, Lucknow: Till 10th grade ICSE Exam, Gold Medal 98% [`St._Francis_Lucknow.png`]
- City Montessori School (CMS), Lucknow: 11–12th grade ISC Exam, Gold Medal 98.25% [`cms.png`]

**Delivers:** EDU-01, EDU-02, EDU-03, EDU-04, EDU-05, CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06

**UAT:**
- IIT Bombay Aerospace Engineering prominently displayed with IITB crest
- High-stakes campus governance showcase (Abhyuday & Placement Cell)
- School achievements accurately attributed: St. Francis (ICSE 98% Gold Medal) & CMS (ISC 98.25% Gold Medal) with logos
- Extracurriculars listed (dramatics, sports, comedy)
- Skills displayed appropriately
- All contact links work (LinkedIn, GitHub, Email, Phone)
- Resume PDF downloads on click
- Newsreader editorial closing statement in contact section
- Section visuals consistent with Structured Intensity

### Phase 8: Responsive Design & Mobile Adaptation

**Goal:** The entire page works beautifully on tablet and mobile. Hamburger menu replaces desktop nav. 3D scenes adapt or simplify.

**Delivers:** NAV-04, RESP-01, RESP-02, RESP-03, RESP-04, RESP-05

**UAT:**
- Desktop layout solid at 1440px reference width
- Tablet (768px–1024px): content reflows, grid adapts, 3D scenes simplify
- Mobile (320px–767px): single column, hamburger menu, touch-friendly targets
- All text passes WCAG 2.2 AA contrast ratio
- All interactive elements keyboard-navigable
- Touch targets ≥ 44px on mobile

### Phase 9: Advanced 3D & Section Transitions

**Goal:** Layer on the ambitious 3D elements: terrain landscape, per-section interactive objects, particle systems, parallax depth layers, and cinematic section transitions.

**Delivers:** 3D-02, 3D-03, 3D-04, 3D-05, 3D-07, 3D-08

**UAT:**
- 3D terrain/landscape visible as scrolling background narrative
- Each section has unique interactive 3D object
- Subtle particle systems enhance section backgrounds without overwhelming
- Parallax depth layers create spatial depth on scroll
- Section transitions are cinematic (not just fade-in)
- Motion timings follow 160–280ms for UI, longer for narrative
- Visual coherence: 3D elements feel part of the Structured Intensity language

### Phase 10: Performance, Polish & Deployment

**Goal:** Progressive enhancement for low-power devices, reduced motion support, final optimization, SEO, and GitHub Pages deployment.

**Delivers:** 3D-09, 3D-10, RESP-07, DEPL-01, DEPL-02, DEPL-03

**UAT:**
- 3D gracefully degrades on mobile/low-power (fallback to 2D or simplified scenes)
- `prefers-reduced-motion` disables all non-essential animations
- 60fps maintained on modern desktop across all 3D scenes
- Images compressed, JS/CSS minified in production build
- Meta tags present: title, description, OG image, OG title, OG description
- `npm run build` produces static output deployable to GitHub Pages
- Live on GitHub Pages URL, all features functional

---

## Milestone 2: Visual Refinement, 3D Polish & Layout Cohesion

**Goal:** Elevate visual fidelity, physical realism of 3D orbital mechanics, calendar color balance, project card backdrop clarity, scannable governance density, and global vertical alignment across all sections.

**Success Criteria:**
- Experience 3D particles are prominent, clearly distinguishable in both light/dark modes, and dynamically occluded/faded when revolving behind the logo along the z-axis.
- Timeline calendar modal has borderless month cells and a deep, harmonious dark theme palette without jarring light pastel fills.
- Projects background blur allows identifiable hints of the underlying product, and all 6 cards are vertically centered with uniform spacing.
- Abhyuday and Placement Cell governance cards feature concise, high-impact numbers and bullets without heavy text walls.
- Extracurricular badges and categories use clean vector / favicon iconography instead of emojis.
- Every section heading anchors at the exact same vertical Y-coordinate with consistent, deliberate top breathing room.

---

### Phase 11: Experience 3D Canvas Polish & Particle Occlusion

**Goal:** Substantially increase particle size across rings, conduit beam, and cosmic dust for strong presence and light-mode distinguishability; implement realistic z-axis occlusion/fade so particles revolving behind company logo medallions become invisible.

**Delivers:** EXP-3D-01, EXP-3D-02

**UAT:**
- Particle size visibly larger across orbit rings, beam conduit, and dust motes.
- In light mode, particle colors are vibrant and easily distinguishable against light backgrounds.
- Orbit ring particles revolving along the z-axis dynamically fade or disappear as they pass behind the company medallion plane (z < 0).
- 60fps frame rate maintained during continuous rotation and interaction.

---

### Phase 12: Experience Calendar Contrast & Dark Theme Palette

**Goal:** Upgrade the timeline calendar modal styling with borderless month blocks and sophisticated, high-contrast dark tones that match the Structured Intensity design system.

**Delivers:** CAL-01, CAL-02

**UAT:**
- Month boxes have no rigid borders, creating a modern, seamless grid.
- Replaced light/pastel fills with cohesive dark theme colors matching company identities.
- Month abbreviations and company logos maintain WCAG AA contrast against their container backgrounds.
- Hover states and active milestone selections remain crisp and tactile.

---

### Phase 13: Projects Section Layout & Backdrop Clarity

**Goal:** Calibrate project card background backdrop-filter blur and overlay gradient opacity so product screenshots provide an identifiable preview; vertically center all 6 project cards within the viewport with uniform spacing.

**Delivers:** PROJ-08, PROJ-09

**UAT:**
- Background screenshot behind each project card is subtly blurred and discernible, providing a legible preview of the product.
- All 6 project cards are vertically centered in the viewport, eliminating the excessive vertical gap between the top and bottom rows.
- Click-to-expand modal and case study interactions remain fully functional.

---

### Phase 14: Education & Governance Cards Density Reduction

**Goal:** Streamline Abhyuday and Placement Cell cards by eliminating redundant descriptive text, focusing strictly on highlighted key metrics and high-impact accomplishments.

**Delivers:** EDU-06

**UAT:**
- Abhyuday and Placement Cell cards contain punchy, concise bullets with highlighted key figures (e.g. ₹10M+ budget, 50,000+ footfall, 2,000+ candidates).
- Text walls are eliminated; content is scannable in under 5 seconds.
- Typography adheres to Structured Intensity hierarchy.

---

### Phase 15: Creative & Athletics Iconography Refactoring

**Goal:** Replace all informal emoji icons in the Creative & Athletics / Extracurriculars section with clean, bespoke vector SVG / favicon-styled iconography.

**Delivers:** CREAT-01

**UAT:**
- No emoji characters (🎭, 🎙️, 🏑, 🥇) are rendered anywhere in the section or its badges.
- Clean vector SVG / favicon icons represent stage, speaking, athletics, and gold medals with crisp rendering in both dark and light modes.

---

### Phase 16: Global Section Heading Vertical Alignment

**Goal:** Standardize top padding and header layout coordinates across all five pages/sections so headings sit at the exact same vertical Y-position across the entire portfolio.

**Delivers:** LAYOUT-01

**UAT:**
- Section title (`.section__title`) and category tag across Hero, Experience, Projects, Education, and Contact share the exact same top Y-offset from the viewport top.
- Generous, balanced padding is established below the fixed navigation bar.
- Transitions between sections feel visually anchored without vertical heading jumping.

---

## Milestone 3: Performance, Contrast, Pedigree & Mobile UX (Shipped & Archived)

> Archived to [.planning/milestones/v3.0-ROADMAP.md](file:///c:/Users/u1233270/Downloads/Personal%20Apps/AboutMe/.planning/milestones/v3.0-ROADMAP.md) on 2026-10-16. All 5 phases complete and verified.

**Goal:** Eradicate experience photo loading lag and viewer flaws, maximize project card text contrast and readability, balance academic credentials into 3 equal columns within the existing card, expand competencies from resume, remove icons/emojis from gold medalist pill, streamline contact statement, and redesign mobile drawer navigation.

**Success Criteria:**
- Experience photos load with zero cold-start lag, thumbnails are lightweight, and the image viewer transitions instantly without stale-image caching or freezing.
- All project card text (eyebrows, titles, descriptions) achieves crisp, effortless readability in both dark and light modes over background screenshots.
- The Academic Excellence card body is distributed into 3 balanced, equal columns across IIT Bombay, CMS, and St. Francis College.
- Core Competencies & Toolkit card is expanded with high-value technical and strategic proficiencies from the resume, eliminating awkward empty space.
- The "2× GOLD MEDALIST" pill in Stage & Synthesis is cleanly stripped of emoji and medal icons.
- Contact section editorial statement begins with a single impactful sentence on careers and products.
- Mobile drawer navigation items are redesigned with tactile, styled command-module aesthetics adhering to `frontend-skill`.

---

### Phase 17: Experience Photo Pipeline Optimization & Lightbox State Fix

**Goal:** Compress raw experience images into responsive WebP thumbnails and web-optimized view formats, implement proactive image preloading, and overhaul the lightbox viewer with loading states and zero stale-image flicker.

**Delivers:** IMG-01, IMG-02

**UAT:**
- Initial site open loads experience thumbnails instantly without megabyte-scale payload lag.
- Lightbox opens selected photo with smooth transition; changing photos immediately displays loading indicator/skeleton until the target image loads (no stale-image persistence).
- Lightbox preloads previous and next images in the sequence for instant traversal.

---

### Phase 18: Project Cards Contrast, Scrims & Text Readability

**Goal:** Calibrate project card background scrim opacity, blur gradient, and text colors so category eyebrows (e.g. Fintech, Compounding), headings, and descriptions achieve prominent, effortless contrast without obscuring product identity.

**Delivers:** PROJ-10, PROJ-11

**UAT:**
- Project category tags / eyebrows are distinct, crisp, and immediately readable against any background screenshot.
- Headings and descriptions pass WCAG AA contrast against card backgrounds in both dark and light themes.
- Product screenshots remain discernible with refined backdrop filter and calibrated scrims.

---

### Phase 19: Education Page UI/UX & Card Interior Redesign

**Goal:** Overhaul the visual hierarchy and internal card formatting across all 4 Education cards (Academic Excellence, High-Stakes Leadership, Stage & Synthesis, Core Competencies) to eliminate visual traffic and hodgepodge, deliver clean number typography, refined pill styling, elegant curvatures, and clean vector favicons.

**Delivers:** EDU-07, EDU-08, EDU-09, EDU-10

**UAT:**
- Card 1 (Academic Excellence): 3-column equal distribution across IIT Bombay, CMS, and St. Francis College within existing card chassis, with balanced spacing and clean credential badges.
- Card 2 (High-Stakes Leadership): Abhyuday and Placement Cell numbers are formatted with prominent, elegant hierarchy; eliminate cluttered stat boxes and conflicting tags.
- Card 3 (Stage & Synthesis): Clean vector favicons for Dramatics, Speaking, Athletics; "2× GOLD MEDALIST" pill rendered cleanly with zero emoji or medal icon clutter; balanced breathing room.
- Card 4 (Core Competencies & Toolkits): Expanded competencies and technical proficiencies from resume populated into structured, clean domains; pills use subtle borders and intentional curvatures with zero dead space.
- Overall Education layout feels calm, authoritative, and uncluttered adhering to `frontend-skill` anti-slop craft standards.

---

### Phase 20: Contact Editorial Statement Refinement

**Goal:** Refine the closing Contact editorial quote to remove "engineering rigor meets behavioral empathy" and establish a focused, single-sentence statement on career systems and product craft.

**Delivers:** CONT-07

**UAT:**
- Editorial statement begins with "Building systems that accelerate careers and craft products people genuinely love...".
- Quote is rendered cleanly in Newsreader editorial typography as a single cohesive sentence.

---

### Phase 21: Mobile Navigation Drawer Redesign

**Goal:** Redesign mobile drawer navigation items using `frontend-skill` into tactile, styled command-module cards with distinct active/hover micro-interactions and Apple fluid spring physics.

**Delivers:** NAV-06

**UAT:**
- Mobile sidebar navigation buttons have tailored, tactile card styling with glassmorphic borders and surfaces.
- Active and hover states feature smooth spring micro-interactions and clear visual hierarchy.
- Seamless touch feedback on mobile devices.

---

## Milestone 4: Project Modal Density & Dedicated Mobile Experience

**Goal:** Eliminate vertical empty space on the right side of the project case study dialogue box by expanding content distribution and vertical fill, and deliver a dedicated, flawless mobile experience across layout fitting, component sizing, and navigation with zero changes or regressions to the web/desktop view.

**Success Criteria:**
- Project case study modal right-side content occupies the full vertical height harmoniously across 720p to 1440p+ desktop viewports, eradicating awkward white space without overflowing.
- Project dialogue boxes are enriched with expanded technical architecture highlights and quantified metrics.
- Desktop/web layout (`min-width: 769px`) remains 100% frozen with zero visual drift or regression.
- Mobile viewport (`<= 768px`) exhibits flawless fitting, calibrated typography, single-column modal flow with touch-friendly controls, and seamless drawer navigation across 320px to 428px widths.

### Phase 22: Project Modal Dialogue Box Right-Side Vertical Density & Space Optimization (Shipped & Verified)

**Goal:** Overhaul the right pane of the project dialogue box (`.modal-right-pane`) to expand content distribution and eliminate dead vertical white space, distributing narrative, expanded innovation cards, architecture highlights, tech stack capsules, and footer action buttons harmoniously across the full modal height without overflow or empty voids.

**Delivers:** PROJ-12, PROJ-13, PROJ-14

**UAT:**
- Project case study modal right pane spans the full vertical height of the cockpit seamlessly, eliminating the empty gap above footer CTAs.
- Narrative and innovation cards feature expanded architecture details, metric pills, and technical depth tailored per project.
- Proportional flex spacing maintains clean visual rhythm across 720p, 768p, 900p, 1080p, and 1440p desktop viewports in both dark and light modes.
- No scrollbar appears unless content actually exceeds viewport height; custom scrollbar matches design system when needed.

---

### Phase 23: Dedicated Mobile Experience, Layout Fitting & Navigation Overhaul (Shipped & Verified)

**Goal:** Engineer a dedicated, polished mobile experience strictly scoped within `@media (max-width: 768px)` that fixes sizing, padding, card fitting, project modal display, and mobile navigation with 0% drift or change to the current desktop layout.

**Delivers:** MOB-01, MOB-02, MOB-03, MOB-04

**UAT:**
- Desktop/web viewports (`min-width: 769px`) remain 100% untouched with zero regressions.
- All 5 sections (Hero, Experience, Projects, Education, Contact) fit naturally on mobile with zero horizontal overflow, balanced vertical padding, and legible typography across 320px, 375px, 390px, and 428px widths.
- Project modal switches to a dedicated mobile layout: single-column vertical card flow, touch-optimized swipeable slideshow, full-width touch-friendly CTAs, and accessible close button.
- Mobile navigation drawer and header provide seamless touch ergonomics, smooth spring transitions, thumb-friendly tap targets, and reliable scroll lock.

---
*Roadmap defined: 2026-10-12*
*Milestone 2 added: 2026-10-15*
*Milestone 3 added: 2026-10-16*
*Milestone 4 added: 2026-10-16*

