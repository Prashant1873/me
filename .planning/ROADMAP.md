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
*Roadmap defined: 2026-10-12*
*Last updated: 2026-10-12 after initial definition*
