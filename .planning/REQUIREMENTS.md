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
- [ ] **3D-02**: 3D terrain/landscape that user scrolls through as background narrative
- [ ] **3D-03**: Interactive 3D objects per section (sphere for hero, architectural forms for experience)
- [ ] **3D-04**: Particle systems as section backgrounds (subtle, not overwhelming)
- [ ] **3D-05**: 3D parallax depth layers on scroll
- [ ] **3D-06**: Professional experience as 3D timeline floating in space
- [ ] **3D-07**: Section transitions with cinematic scroll-triggered GSAP animations
- [ ] **3D-08**: Motion timing follows design language: 160–280ms for UI, longer for narrative sequences
- [ ] **3D-09**: Progressive enhancement: graceful degradation on low-power devices
- [ ] **3D-10**: 60fps target for all 3D scenes on modern hardware

### Responsive & Accessibility

- [x] **RESP-01**: Desktop-first design (1440px reference width)
- [x] **RESP-02**: Tablet adaptation (768px–1024px)
- [x] **RESP-03**: Mobile adaptation (320px–767px)
- [x] **RESP-04**: WCAG 2.2 AA color contrast ratios for all text
- [x] **RESP-05**: Keyboard navigation for all interactive elements
- [ ] **RESP-06**: Semantic HTML5 structure (proper heading hierarchy, landmarks)
- [ ] **RESP-07**: Reduced motion support (prefers-reduced-motion)

### Deployment

- [ ] **DEPL-01**: Static build output compatible with GitHub Pages
- [ ] **DEPL-02**: All assets optimized (compressed images, minified JS/CSS)
- [ ] **DEPL-03**: Meta tags for SEO (title, description, OG tags)

## v2 Requirements

### Future Enhancements

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
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 2 | Pending |
| FOUND-05 | Phase 1 | Pending |
| FOUND-06 | Phase 1 | Pending |
| NAV-01 | Phase 2 | Pending |
| NAV-02 | Phase 2 | Pending |
| NAV-03 | Phase 2 | Pending |
| NAV-04 | Phase 8 | Complete |
| NAV-05 | Phase 2 | Pending |
| HERO-01 | Phase 3 | Pending |
| HERO-02 | Phase 3 | Pending |
| HERO-03 | Phase 3 | Pending |
| HERO-04 | Phase 3 | Pending |
| HERO-05 | Phase 3 | Pending |
| HERO-06 | Phase 3 | Pending |
| EXP-01 | Phase 5 | Pending |
| EXP-02 | Phase 4 | Pending |
| EXP-03 | Phase 4 | Pending |
| EXP-04 | Phase 4 | Pending |
| EXP-05 | Phase 4 | Pending |
| EXP-06 | Phase 5 | Pending |
| EXP-07 | Phase 5 | Pending |
| EXP-08 | Phase 5 | Pending |
| PROJ-01 | Phase 6 | Pending |
| PROJ-02 | Phase 6 | Pending |
| PROJ-03 | Phase 6 | Pending |
| PROJ-04 | Phase 6 | Pending |
| PROJ-05 | Phase 6 | Pending |
| PROJ-06 | Phase 6 | Pending |
| PROJ-07 | Phase 6 | Pending |
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
| 3D-01 | Phase 3 | Pending |
| 3D-02 | Phase 9 | Pending |
| 3D-03 | Phase 9 | Pending |
| 3D-04 | Phase 9 | Pending |
| 3D-05 | Phase 9 | Pending |
| 3D-06 | Phase 5 | Pending |
| 3D-07 | Phase 9 | Pending |
| 3D-08 | Phase 9 | Pending |
| 3D-09 | Phase 10 | Pending |
| 3D-10 | Phase 10 | Pending |
| RESP-01 | Phase 8 | Complete |
| RESP-02 | Phase 8 | Complete |
| RESP-03 | Phase 8 | Complete |
| RESP-04 | Phase 8 | Complete |
| RESP-05 | Phase 8 | Complete |
| RESP-06 | Phase 2 | Pending |
| RESP-07 | Phase 10 | Pending |
| DEPL-01 | Phase 10 | Pending |
| DEPL-02 | Phase 10 | Pending |
| DEPL-03 | Phase 10 | Pending |

**Coverage:**
- v1 requirements: 57 total
- Mapped to phases: 57
- Unmapped: 0 ✓

---
*Requirements defined: 2026-10-12*
*Last updated: 2026-10-12 after initial definition*
