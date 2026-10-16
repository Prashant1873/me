# Requirements: Prashant Shukla Portfolio

**Defined:** 2026-10-12
**Core Value:** The website must feel unmistakably personal - like meeting Prashant, not reading his resume.

## v1 Requirements

### Foundation & Tooling

- [ ] **FOUND-01**: Vite project initialized with vanilla JS, Three.js, GSAP dependencies
- [ ] **FOUND-02**: Design system CSS implementing Structured Intensity tokens (colors, typography, spacing, grid)
- [ ] **FOUND-03**: Fonts loaded: Horizon (hero, CDN), Plus Jakarta Sans, IBM Plex Mono, Newsreader (Google Fonts)
- [ ] **FOUND-04**: Dark mode as default with functional light mode toggle
- [ ] **FOUND-05**: 12-column grid layout with 8px base spacing system
- [ ] **FOUND-06**: CSS custom properties for all design tokens (colors, sizes, motion timings)

### Navigation & Structure

- [ ] **NAV-01**: Sticky top navigation bar with section anchors (Home, Experience, Projects, Education, Contact)
- [ ] **NAV-02**: Smooth scroll-to-section on nav click with GSAP-powered animation
- [ ] **NAV-03**: Active section highlighting in nav based on scroll position
- [x] **NAV-04**: Mobile-responsive hamburger menu
- [ ] **NAV-05**: Navigation uses Plus Jakarta Sans font with correct weight/size per design system

### Hero Section

- [ ] **HERO-01**: Full-viewport hero section with Three.js 3D canvas (orbital geometry motif)
- [ ] **HERO-02**: Bold personal statement: thinker-builder hybrid identity narrative
- [ ] **HERO-03**: Name display with Horizon hero headline (56–80px uppercase)
- [ ] **HERO-04**: IBM Plex Mono technical metadata (role, location coordinates)
- [ ] **HERO-05**: Entrance animation sequence (GSAP timeline: text reveals, 3D elements fade in)
- [ ] **HERO-06**: Scroll indicator prompting downward exploration

### Professional Experience

- [ ] **EXP-01**: Interactive 3D timeline floating in space, scroll-traversable
- [ ] **EXP-02**: Company cards for each role: IQVIA, Revolut, Ketto, Kalam Labs, FAOUD, Abhyuday, Placement Cell
- [ ] **EXP-03**: Each card shows: company name, role title, date range, 3–4 key bullet points
- [ ] **EXP-04**: Company logos displayed for each experience entry
- [ ] **EXP-05**: LinkedIn links for each company (clickable, opens in new tab)
- [ ] **EXP-06**: Interactive category filters: Work Experience, Entrepreneurship, Leadership, Creative/Sports
- [ ] **EXP-07**: Scroll-triggered reveal animations for timeline nodes
- [ ] **EXP-08**: Coral accent (#E8655A) or Royal Blue (#2962FF) for timeline highlights

### Projects Section

- [ ] **PROJ-01**: Cinematic case-study cards for all 6 projects (BickerBape, StrokeCRM, TRINET, Archetype, CareerLoom, Marcutie)
- [ ] **PROJ-02**: Each card: project name, one-line description, tech stack badges, thumbnail screenshot
- [ ] **PROJ-03**: Click-to-expand into full immersive showcase with multiple screenshots
- [ ] **PROJ-04**: Expanded view includes: detailed description, key innovations, tech stack, live URL / GitHub link
- [ ] **PROJ-05**: Project screenshots displayed in integrated slideshow (not standalone images)
- [ ] **PROJ-06**: Slideshow transitions blend with site aesthetic (not generic carousel)
- [ ] **PROJ-07**: GSAP-powered expand/collapse animations

### Education Section

- [x] **EDU-01**: IIT Bombay B.Tech Aerospace Engineering prominently displayed
- [x] **EDU-02**: School achievements (ISC 98.25% Gold Medal, ICSE 98% Gold Medal)
- [x] **EDU-03**: Extracurriculars: Dramatics awards, stand-up comedy, sports achievements
- [x] **EDU-04**: Skills list: Storyboarding, Python, Power BI, Alteryx, AI Automation, etc.
- [x] **EDU-05**: Section visual consistent with Structured Intensity (editorial rules, organic contours)

### Contact Section

- [x] **CONT-01**: LinkedIn link (linkedin.com/in/prashantmanishukla)
- [x] **CONT-02**: GitHub link (github.com/Prashant1873)
- [x] **CONT-03**: Email link (shuklaprashant847@gmail.com)
- [x] **CONT-04**: Phone number display (+91-9696721493)
- [x] **CONT-05**: Downloadable resume PDF button
- [x] **CONT-06**: Contact section has Newsreader editorial statement as closing

### 3D & Animation

- [ ] **3D-01**: Three.js canvas in hero with orbital geometry (concentric circles, trajectories, intersecting axes)
- [x] **3D-02**: 3D terrain/landscape that user scrolls through as background narrative
- [x] **3D-03**: Interactive 3D objects per section (thematic particle constellations)
- [x] **3D-04**: Particle systems as section backgrounds (subtle, not overwhelming)
- [x] **3D-05**: 3D parallax depth layers on scroll
- [ ] **3D-06**: Professional experience as 3D timeline floating in space
- [x] **3D-07**: Section transitions with cinematic scroll-triggered GSAP animations
- [x] **3D-08**: Motion timing follows design language: 160-280ms for UI, longer for narrative sequences
- [x] **3D-09**: Progressive enhancement: graceful degradation on low-power devices
- [x] **3D-10**: 60fps target for all 3D scenes on modern hardware

### Responsive & Accessibility

- [x] **RESP-01**: Desktop-first design (1440px reference width)
- [x] **RESP-02**: Tablet adaptation (768px-1024px)
- [x] **RESP-03**: Mobile adaptation (320px-767px)
- [x] **RESP-04**: WCAG 2.2 AA color contrast ratios for all text
- [x] **RESP-05**: Keyboard navigation for all interactive elements
- [x] **RESP-06**: Semantic HTML5 structure (proper heading hierarchy, landmarks)
- [x] **RESP-07**: Reduced motion support (prefers-reduced-motion)

### Deployment

- [x] **DEPL-01**: Static build output compatible with GitHub Pages
- [x] **DEPL-02**: All assets optimized (compressed images, minified JS/CSS)
- [x] **DEPL-03**: Meta tags for SEO (title, description, OG tags)

## Milestone 2 Requirements

### Experience 3D Canvas Polish
- [x] **EXP-3D-01**: Substantially enlarged particle sizes across Experience 3D canvas (conduit, dust, orbit rings) with clear light-mode contrast
- [x] **EXP-3D-02**: Dynamic z-axis occlusion/fade so revolving orbit ring particles become invisible when passing behind company logo medallions

### Experience Calendar
- [x] **CAL-01**: Borderless month matrix in the experience timeline calendar modal
- [x] **CAL-02**: Deep, rich dark theme color palette and high-contrast typography/badges for the calendar modal

### Projects Showcase Layout & Clarity
- [ ] **PROJ-08**: Calibrated project card background backdrop-filter blur and overlay gradient opacity for clear product identification
- [ ] **PROJ-09**: Vertically centered 2x3 project cards layout with uniform, cohesive spacing

### Education & Governance
- [ ] **EDU-06**: Streamlined high-impact governance cards (Abhyuday & Placement Cell) with bold key numbers and minimal text walls

### Creative & Athletics
- [ ] **CREAT-01**: Bespoke vector/favicon iconography for Creative & Athletics replacing informal emojis

### Global Section Alignment
- [ ] **LAYOUT-01**: Standardized section header top padding and identical vertical Y-axis anchor positions across all sections

## Milestone 3 Requirements

### Professional Experience Photo Pipeline
- [x] **IMG-01**: Optimize experience photos with compressed webp & responsive thumbnail sizing, plus asset preloading to eradicate first-visit network lag
- [x] **IMG-02**: Fix image lightbox stale-image caching flaw with loading skeleton/spinner state, instant placeholder reset, and seamless transition

### Projects Section Card Readability & Contrast
- [x] **PROJ-10**: Increase project card backdrop scrim opacity, gradient contrast, and targeted blur so text has unambiguous distinction over background screenshots
- [x] **PROJ-11**: Upgrade typography contrast for category eyebrows, headings, and descriptions to ensure WCAG AA readability in both dark and light modes

### Education Page UI/UX Redesign & Formatting
- [ ] **EDU-07**: Expand Core Competencies & Toolkit items and categories sourced from resume to eliminate excess blank card space
- [ ] **EDU-08**: Equally distribute Academic Excellence space within the existing card into 3 balanced columns across IIT Bombay, CMS, and St. Francis College
- [ ] **EDU-09**: Remove emoji and medal icons flanking "2× GOLD MEDALIST" in the Stage & Synthesis pill
- [ ] **EDU-10**: Overhaul Education page UI/UX and card interior formatting: reduce visual traffic, declutter stat representations, eliminate noisy pill overload, and refine curvatures and iconography

### Contact Editorial Statement
- [ ] **CONT-07**: Update Contact editorial statement to remove "engineering rigor meets behavioral empathy" and begin with single impactful sentence on careers and products

### Mobile Navigation Drawer
- [ ] **NAV-06**: Redesign mobile drawer navigation items using frontend-skill into tactile, styled command-module cards with distinct active/hover micro-interactions

## Future Enhancements

- **V2-01**: Blog / writing section for essays and thought pieces
- **V2-02**: Custom domain (prashantshukla.com)
- **V2-03**: Analytics integration (privacy-respecting)
- **V2-04**: Testimonials section from colleagues and mentors
- **V2-05**: Dark/light mode persistence in localStorage
- **V2-06**: Page load animation / preloader with orbital geometry motif
- **V2-07**: Photo gallery for each professional experience
- **V2-08**: Interactive project demos (embedded iframes or video)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend / CMS | Static site, all content hardcoded for v1 |
| Multi-language | English only for now |
| E-commerce / payments | Not applicable |
| Real-time features | Static portfolio, no server needed |
| React / framework components | Vanilla JS decision for maximum pixel control |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 2 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| NAV-01 | Phase 2 | Complete |
| NAV-02 | Phase 2 | Complete |
| NAV-03 | Phase 2 | Complete |
| NAV-04 | Phase 8 | Complete |
| NAV-05 | Phase 2 | Complete |
| HERO-01 | Phase 3 | Complete |
| HERO-02 | Phase 3 | Complete |
| HERO-03 | Phase 3 | Complete |
| HERO-04 | Phase 3 | Complete |
| HERO-05 | Phase 3 | Complete |
| HERO-06 | Phase 3 | Complete |
| EXP-01 | Phase 5 | Complete |
| EXP-02 | Phase 4 | Complete |
| EXP-03 | Phase 4 | Complete |
| EXP-04 | Phase 4 | Complete |
| EXP-05 | Phase 4 | Complete |
| EXP-06 | Phase 5 | Complete |
| EXP-07 | Phase 5 | Complete |
| EXP-08 | Phase 5 | Complete |
| PROJ-01 | Phase 6 | Complete |
| PROJ-02 | Phase 6 | Complete |
| PROJ-03 | Phase 6 | Complete |
| PROJ-04 | Phase 6 | Complete |
| PROJ-05 | Phase 6 | Complete |
| PROJ-06 | Phase 6 | Complete |
| PROJ-07 | Phase 6 | Complete |
| EDU-01 | Phase 7 | Complete |
| EDU-02 | Phase 7 | Complete |
| EDU-03 | Phase 7 | Complete |
| EDU-04 | Phase 7 | Complete |
| EDU-05 | Phase 7 | Complete |
| CONT-01 | Phase 7 | Complete |
| CONT-02 | Phase 7 | Complete |
| CONT-03 | Phase 7 | Complete |
| CONT-04 | Phase 7 | Complete |
| CONT-05 | Phase 7 | Complete |
| CONT-06 | Phase 7 | Complete |
| 3D-01 | Phase 3 | Complete |
| 3D-02 | Phase 9 | Complete |
| 3D-03 | Phase 9 | Complete |
| 3D-04 | Phase 9 | Complete |
| 3D-05 | Phase 9 | Complete |
| 3D-06 | Phase 5 | Complete |
| 3D-07 | Phase 9 | Complete |
| 3D-08 | Phase 9 | Complete |
| 3D-09 | Phase 10 | Complete |
| 3D-10 | Phase 10 | Complete |
| RESP-01 | Phase 8 | Complete |
| RESP-02 | Phase 8 | Complete |
| RESP-03 | Phase 8 | Complete |
| RESP-04 | Phase 8 | Complete |
| RESP-05 | Phase 8 | Complete |
| RESP-06 | Phase 2 | Complete |
| RESP-07 | Phase 10 | Complete |
| DEPL-01 | Phase 10 | Complete |
| DEPL-02 | Phase 10 | Complete |
| DEPL-03 | Phase 10 | Complete |
| EXP-3D-01 | Phase 11 | Complete |
| EXP-3D-02 | Phase 11 | Complete |
| CAL-01 | Phase 12 | Complete |
| CAL-02 | Phase 12 | Complete |
| PROJ-08 | Phase 13 | Complete |
| PROJ-09 | Phase 13 | Complete |
| EDU-06 | Phase 14 | Complete |
| CREAT-01 | Phase 15 | Complete |
| LAYOUT-01 | Phase 16 | Complete |
| IMG-01 | Phase 17 | Complete |
| IMG-02 | Phase 17 | Complete |
| PROJ-10 | Phase 18 | Pending |
| PROJ-11 | Phase 18 | Pending |
| EDU-07 | Phase 19 | Pending |
| EDU-08 | Phase 19 | Pending |
| EDU-09 | Phase 19 | Pending |
| EDU-10 | Phase 19 | Pending |
| CONT-07 | Phase 20 | Pending |
| NAV-06 | Phase 21 | Pending |

**Coverage:**
- Milestone 1 requirements: 57 total (57 completed)
- Milestone 2 requirements: 9 total (9 completed)
- Milestone 3 requirements: 10 total (10 mapped to Phases 17-21)
- Unmapped: 0 ✓

---
*Requirements defined: 2026-10-12*
*Milestone 2 added: 2026-10-15*
*Milestone 3 added: 2026-10-16*
