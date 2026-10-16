---
phase: 06-projects-section-cinematic-case-studies
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/js/projects-data.js
  - src/js/projects.js
  - src/styles/projects.css
  - src/styles/index.css
  - src/js/main.js
  - index.html
  - tests/projects.spec.js
autonomous: true
requirements:
  - PROJ-01
  - PROJ-02
  - PROJ-03
  - PROJ-04
  - PROJ-05
  - PROJ-06
  - PROJ-07
user_setup: []
must_haves:
  truths:
    - "D-01: Uniform 2x3 Grid Layout - All 6 project cards share identical dimensions, visual weight, and modular layout"
    - "D-02: Screenshot Hero Card Composition - 16:9 screenshot banner at top with subtle hover depth, followed by project title, category tag in IBM Plex Mono, one-line summary, tech pills, and expand arrow"
    - "D-03: Industrial Lift & Accent Border Glow - Card elevates -4px Y on hover, border highlights in Royal Blue (#2962FF) or Tungsten Amber (#C38B55), screenshot gently scales 1.03x with 200ms Structured Intensity timing"
    - "D-04: Curated Story Sequence with Category Badges - Fixed narrative order: BickerBape → StrokeCRM → TRINET → Know Your Archetype → CareerLoom → Marcutie with category tags"
    - "D-05: Immersive Fullscreen Modal Overlay - Card click expands into a focused cinematic viewport overlay with backdrop blur, locking background scroll for deep narrative focus"
    - "D-06: Two-Column Cinematic Cockpit Layout - Left column (7 cols on 12-col grid) features interactive screenshot slideshow with caption strip; Right column (5 cols) features personal motivation, key innovations 3-bullet proof block, tech architecture badges, and live action links"
    - "D-07: Origin-Aware Bounding Box GSAP Animation - Modal springs smoothly from the clicked card's exact grid coordinates to full modal bounds using GSAP power3.out (240ms), collapsing back into its exact grid position upon close"
    - "D-08: Direct Modal Traversal & Keyboard Controls - Previous/Next project arrows and keyboard ArrowLeft/ArrowRight to cycle between projects directly inside the modal, plus ESC, backdrop click, or ✕ button to close"
    - "D-09: Monospace Technical Status Tags & Proof Grid - Live technical tag on card thumbnail ([● 98/98 TESTS], [500+ MFRS]) and dedicated 3-item Innovation & Proof grid inside modal"
    - "D-10: Dual Action CTAs - Card click opens full case study modal; discrete external link icon (↗) on card allows instant direct jump; inside modal, high-contrast primary 'Launch Live App ↗' and secondary 'View on GitHub ↗' buttons"
    - "D-11: Industrial Monospace Micro-Pills - Tech stack badges rendered in IBM Plex Mono 11px with dark graphite background, stone border, and framework accent dots"
    - "D-12: Integrated Narrative Flow - Personal motivation woven seamlessly into the opening lines of each project summary"
  artifacts:
    - src/js/projects-data.js
    - src/js/projects.js
    - src/styles/projects.css
    - tests/projects.spec.js
  key_links:
    - "src/js/main.js imports and invokes initProjects() from src/js/projects.js"
    - "src/styles/index.css imports ./projects.css"
    - "src/js/projects.js imports PROJECTS from src/js/projects-data.js"
    - "index.html defines #projects-grid and #project-modal containers"
---

<objective>
Build the Projects Section (#projects) delivering all 6 commercial and deep-tech products as cinematic case-study cards with click-to-expand showcases, screenshot slideshows, origin-aware GSAP bounding-box animations, and technical innovation proofs. Delivers requirements PROJ-01 through PROJ-07.
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Project Data Model & Playwright Wave 0 Test Suite</name>
  <files>src/js/projects-data.js, tests/projects.spec.js</files>
  <read_first>index.html, src/styles/design-system.css, tests/experience.spec.js</read_first>
  <action>
1. Create `src/js/projects-data.js` exporting `PROJECTS` (array of 6 canonical records in curated order):
   - `bickerbape`: Mutual Fund screener & compounding engine. Category: `Fintech & Compounding`. Status: `● 98/98 TESTS`. Tech: `Next.js 16`, `React 19`, `TypeScript`, `Tailwind 4`, `Vitest`. Live URL: `https://prashant1873.github.io/BickerBape/`. GitHub: `https://github.com/Prashant1873/BickerBape`. Screenshots: 7 images from `/BickerBape/`.
   - `strokecrm`: Self-hosted cold-email workspace. Category: `Cold Outreach`. Status: `● SELF-HOSTED`. Tech: `React 19`, `Tailwind 4`, `Vite`, `Express 5`, `SQLite`, `Nodemailer`. GitHub: `https://github.com/Prashant1873/StrokeCRM`. Screenshots: 6 images from `/StrokeCRM/`.
   - `trinet`: India Manufacturing Intelligence & Discovery. Category: `Manufacturing Intel`. Status: `● 500+ MFRS`. Tech: `Python/Flask`, `MapLibre GL`, `Google Gemini AI`, `SQLite`. GitHub: `https://github.com/Prashant1873/Trinet`. Screenshots: 4 images from `/Trinet/`.
   - `archetype`: Behavioral assessment engine. Category: `Behavioral Psych`. Status: `● 18 SCENARIOS`. Tech: `Vanilla JS`, `SVG Math`, `Webhooks`. GitHub: `https://github.com/Prashant1873/Archetype`. Screenshots: 5 images from `/Archetype/`.
   - `careerloom`: Natural language career discovery. Category: `Career Discovery`. Status: `● 200+ FIRMS`. Tech: `NLP Search`, `Master-Detail UI`, `Community Intel`. GitHub: `https://github.com/Prashant1873/CareerLoom`. Screenshots: 3 images from `/Marcutie/`.
   - `marcutie`: Brag-grade product launch video generator. Category: `Creative Automation`. Status: `● LOCAL-FIRST`. Tech: `Local Rendering`, `Multimodal AI`, `Kinetic Subtitles`. GitHub: `https://github.com/Prashant1873/Marcutie`. Screenshots: 3 images from `/Marcutie/`.
   Each record must contain: `id`, `title`, `category`, `statusTag`, `oneLiner`, `narrative`, `innovations` (array of 3 items), `techStack` (array of strings with `primary` boolean), `liveUrl`, `githubUrl`, and `screenshots` (array of `{ src, caption, alt }`).
2. Create `tests/projects.spec.js` asserting all 7 requirements:
   - PROJ-01 & PROJ-02: Exactly 6 cards rendered in `#projects-grid` with status tags, titles, badges, and thumbnails.
   - PROJ-03: Clicking a card opens `#project-modal` with `.is-open` class, backdrop blur, and body scroll lock.
   - PROJ-04: Expanded modal contains narrative flow, 3 innovations, tech stack badges, and valid links with `rel="noopener noreferrer"`.
   - PROJ-05 & PROJ-06: Slideshow renders main viewport, caption, and thumbnail strip; chevron buttons and keyboard arrows advance images.
   - PROJ-07: ESC key closes modal, smoothly restoring scroll.
  </action>
  <verify>
Node check: `node -e "import('./src/js/projects-data.js').then(m => console.log('Loaded ' + m.PROJECTS.length + ' projects'))"` in terminal to verify data exports cleanly.
  </verify>
  <acceptance_criteria>
    - `src/js/projects-data.js` exports `PROJECTS` with length 6
    - Each project in `PROJECTS` has `id`, `title`, `statusTag`, `narrative`, `innovations`, `techStack`, `screenshots`
    - `tests/projects.spec.js` exists and defines test cases for PROJ-01 through PROJ-07
  </acceptance_criteria>
  <done>
Canonical data model established with real workspace screenshot paths, and Playwright verification contract ready.
  </done>
</task>

<task type="auto">
  <name>Task 2: Projects Grid Markup & Industrial Card Styles</name>
  <files>index.html, src/styles/projects.css, src/styles/index.css, src/js/projects.js, src/js/main.js</files>
  <read_first>index.html, src/styles/design-system.css, src/styles/experience.css</read_first>
  <action>
1. Update `index.html`:
   - In `<section id="projects">`, replace `.section__placeholder` with:
     ```html
     <div id="projects-grid" class="projects-grid" role="region" aria-label="Projects Showcase Grid"></div>
     ```
   - Below `<main>`, append modal root:
     ```html
     <div id="project-modal" class="project-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-project-title">
       <div class="project-modal__backdrop" id="modal-backdrop"></div>
       <div class="project-modal__chassis" id="modal-chassis"></div>
     </div>
     ```
2. Create `src/styles/projects.css`:
   - Implement `.projects-grid`: CSS Grid with `repeat(3, 1fr)` on desktop (min-width 1024px), `repeat(2, 1fr)` on tablet (768px-1023px), `1fr` on mobile (<768px), gap `var(--space-xl)` (32px).
   - Implement `.project-card`: industrial container with border `1px solid var(--color-border)`, background `var(--color-bg-alt)`, border-radius 8px, overflow hidden, cursor pointer.
   - Implement `.project-card__thumb-box`: `aspect-ratio: 16 / 9`, relative, overflow hidden, with dark graphite placeholder background.
   - Implement `.project-card__thumb`: width 100%, height 100%, `object-fit: cover`, smooth transform transition (200ms ease).
   - Implement `.project-card__status-tag`: absolute top 8px right 8px, background `rgba(0,0,0,0.75)`, border `1px solid rgba(255,255,255,0.15)`, font IBM Plex Mono 11px, color `var(--color-text-main)`, dot colored by accent.
   - Implement `.project-card__body`: padding `var(--space-md)` (16px), flex column gap `var(--space-sm)`.
   - Implement `.project-card__category`: IBM Plex Mono 12px, uppercase, color `var(--color-text-muted)`.
   - Implement `.project-card__title`: Plus Jakarta Sans 20px, semibold 600, color `var(--color-text-main)`.
   - Implement `.project-card__desc`: Plus Jakarta Sans 14px/16px, color `var(--color-text-muted)`, clamped to 2 lines (`-webkit-line-clamp: 2`).
   - Implement `.project-card__tags`: flex wrap gap `var(--space-xs)` (4px) to `var(--space-sm)` (8px).
   - Implement `.project-tag`: IBM Plex Mono 11px, background `rgba(255,255,255,0.04)`, border `1px solid var(--color-border)`, border-radius 4px, padding 2px 6px.
   - Implement `.project-card__footer`: flex justify-between align-center margin-top auto, "Explore Case Study →" trigger with arrow transition.
   - Implement hover micro-interaction: `-webkit-transform: translateY(-4px)`, `box-shadow`, border highlight in `var(--color-accent-blue)` or `var(--color-accent-amber)`, image scale 1.03x.
   - Add light mode overrides via `html[data-theme="light"]`.
3. Import `./projects.css` into `src/styles/index.css`.
4. Create `src/js/projects.js` with `renderProjectsGrid()`:
   - Maps over `PROJECTS` and generates accessible semantic card markup in `#projects-grid`.
   - Attaches click listeners on cards to trigger modal expansion.
   - Export `initProjects()` and call it in `src/js/main.js`.
  </action>
  <verify>
Check in browser or with Playwright test that 6 cards render with correct titles, badges, and layout.
  </verify>
  <acceptance_criteria>
    - `index.html` contains `#projects-grid` and `#project-modal`
    - `src/styles/projects.css` defines `.projects-grid` with 3-column desktop layout and 2-column tablet layout
    - `src/styles/index.css` imports `./projects.css`
    - `src/js/main.js` imports and executes `initProjects()`
    - 6 project cards are visible on the page with 16:9 thumbnails and status tags
  </acceptance_criteria>
  <done>
Uniform 2x3 project grid rendered with industrial styling, hover depth, and theme responsiveness.
  </done>
</task>

<task type="auto">
  <name>Task 3: Fullscreen Cinematic Modal Takeover with Origin-Aware GSAP Animation & Focus Trapping</name>
  <files>src/js/projects.js, src/styles/projects.css</files>
  <read_first>index.html, src/styles/design-system.css, .planning/phases/06-projects-section-cinematic-case-studies/06-UI-SPEC.md</read_first>
  <action>
1. Enhance `src/styles/projects.css` for modal takeover:
   - `.project-modal`: fixed inset 0, z-index 1000, display flex align-center justify-center, visibility hidden, opacity 0, pointer-events none.
   - `.project-modal.is-open`: visibility visible, opacity 1, pointer-events auto.
   - `.project-modal__backdrop`: absolute inset 0, background `rgba(0,0,0,0.85)`, `backdrop-filter: blur(12px)`.
   - `.project-modal__chassis`: relative z-index 2, width 92vw, max-width 1360px, height 88vh, max-height 900px, background `var(--color-bg-alt)`, border `1px solid var(--color-border)`, border-radius 12px, display flex flex-column, overflow hidden, box-shadow `0 32px 64px rgba(0,0,0,0.6)`.
   - `.modal-header`: flex justify-between align-center padding 16px 24px, border-bottom `1px solid var(--color-border)`.
   - `.modal-header__traversal`: flex align-center gap 8px (Prev / Next project buttons with tooltips, e.g. "← Prev [A]", "Next [D] →").
   - `.modal-header__close`: accessible icon button with label "Close Case Study [ESC]", hover border contrast shift.
   - `.modal-body`: flex 1, display grid, grid-template-columns 7fr 5fr on desktop (>900px), 1fr on mobile/tablet (<900px), overflow hidden.
   - `.modal-right-pane`: padding 24px 32px, overflow-y auto, display flex flex-column gap 20px.
   - `.modal-narrative`: Newsreader editorial italic quote or opening narrative flow connecting personal motivation to the engineering architecture.
   - `.modal-innovations`: 3-item Innovation & Proof grid, each with accent checkmark or metric callout, title, and description.
   - `.modal-tech`: technical architecture section with monospace micro-pills.
   - `.modal-ctas`: flex gap 12px, high-contrast primary "Launch Live App ↗" (Royal Blue/Amber) + secondary "View on GitHub ↗" (graphite/stone).
2. Implement modal expansion & collapse in `src/js/projects.js`:
   - `openProjectModal(projectId, triggerCardEl)`:
     - Compute origin `getBoundingClientRect()` from `triggerCardEl`.
     - Lock body scroll using scrollbar-padding compensation (`document.body.style.overflow = 'hidden'`).
     - Set `inert` on `#site-nav` and `<main>` to trap focus strictly inside `#project-modal`.
     - Populate modal chassis with project data.
     - Animate modal chassis using GSAP `fromTo`: from card's `{ top, left, width, height, opacity: 0.8 }` to centered modal bounds `{ top: targetTop, left: targetLeft, width: targetWidth, height: targetHeight, opacity: 1, duration: 0.24, ease: 'power3.out' }`.
     - Animate backdrop opacity from 0 to 1.
     - Move focus to close button or first interactive element inside modal.
   - `closeProjectModal()`:
     - Animate modal chassis back to trigger card's current coordinates (or fade-scale if scrolled).
     - Animate backdrop to 0.
     - Unlock body scroll and remove `inert`.
     - Restore focus to `triggerCardEl`.
   - Traversal controls:
     - Clicking "Next Project" or "Prev Project" smoothly updates modal content with quick crossfade without closing the modal chassis.
     - Keyboard listeners: `ESC` closes modal; `ArrowLeft`/`ArrowRight` triggers prev/next project (when carousel is not capturing arrows).
     - Backdrop click listener closes modal.
  </action>
  <verify>
Click any project card in browser to verify origin expansion, backdrop blur, scroll locking, ESC close, and focus restoration.
  </verify>
  <acceptance_criteria>
    - Clicking a card animates smoothly into full modal chassis via GSAP
    - Body scroll is locked while modal is open
    - `#site-nav` and `<main>` have `inert` applied while modal is open
    - Pressing ESC or clicking backdrop / ✕ collapses modal and restores scroll
    - Prev / Next buttons inside modal switch between projects
  </acceptance_criteria>
  <done>
Origin-aware GSAP modal takeover with focus trapping, body scroll lock, and project traversal complete.
  </done>
</task>

<task type="auto">
  <name>Task 4: Interactive Cockpit Slideshow & Multi-Screenshot Carousel with Keyboard Traversal</name>
  <files>src/js/projects.js, src/styles/projects.css, tests/projects.spec.js</files>
  <read_first>index.html, src/styles/experience.css, .planning/phases/06-projects-section-cinematic-case-studies/06-UI-SPEC.md</read_first>
  <action>
1. Implement Left Cockpit Slideshow in `src/js/projects.js`:
   - Left pane (`.modal-slideshow`):
     - Main viewport container with strict `aspect-ratio: 16 / 9`, relative, overflow hidden, background `#080808`.
     - Main image element `<img>` with `object-fit: contain`, alt text, and fallback `onerror` handler that renders an accessible SVG wireframe if an asset fails to load.
     - Navigation chevron buttons overlay (Prev `←` / Next `→`) with `aria-label="View Previous Screenshot ←"` and `aria-label="View Next Screenshot →"`.
     - Caption bar below viewport: IBM Plex Mono 12px, showing `[1 / N] - {Caption text}`.
     - Filmstrip thumbnail track: row of thumbnail buttons, each with active border indicator (`var(--color-accent-blue)`), clickable to jump directly to any screenshot.
   - Slideshow state machine:
     - `activeSlideIndex` (0 to N-1).
     - `setSlide(index, direction)`: smoothly transitions image using GSAP crossfade (200ms `power2.out`), updates caption, and updates active thumbnail indicator.
     - Keyboard navigation: when slideshow viewport is focused or active, `ArrowLeft` and `ArrowRight` navigate through screenshots.
2. Polish responsive behavior in `src/styles/projects.css`:
   - On screens <900px, stack slideshow on top with full width, and narrative/innovations below with smooth scroll.
   - Ensure all touch targets for chevrons and thumbnails are >= 44px.
   - Verify dark and light theme styles.
3. Run Playwright test suite:
   - Execute `npx playwright test tests/projects.spec.js`.
   - Ensure all 7 requirements (PROJ-01 to PROJ-07) pass green.
  </action>
  <verify>
Run `npx playwright test tests/projects.spec.js` and verify all tests pass with 0 failures.
  </verify>
  <acceptance_criteria>
    - Interactive slideshow renders multiple authentic screenshots with filmstrip thumbnails
    - Next/prev chevron buttons and keyboard arrows transition slides
    - Caption bar updates dynamically with current index and description
    - Broken images fallback gracefully to SVG wireframes
    - Full Playwright test suite `tests/projects.spec.js` passes green
  </acceptance_criteria>
  <done>
Cinematic case study slideshow fully implemented with accessible controls, smooth GSAP transitions, and 100% test pass rate.
  </done>
</task>

</tasks>

<threat_model>
### Applicable ASVS Level 1 Threats
- **T-06-01: Reverse Tabnabbing on External Project Links**
  - Threat: Outbound links to GitHub or live screener without security attributes allow destination page to hijack window.opener.
  - Mitigation: Every external `<a>` tag must strictly specify `target="_blank"` and `rel="noopener noreferrer"`.
- **T-06-02: DOM XSS via Project Data Insertion**
  - Threat: Injecting unsanitized project strings or query params into innerHTML could execute malicious scripts.
  - Mitigation: All user-facing strings (titles, summaries, captions) are injected via strict templates with escaped content or `textContent`.
</threat_model>

<verification>
Automated Playwright test execution:
```bash
npx playwright test tests/projects.spec.js
```
Full suite regression test:
```bash
npx playwright test
```
Verification criteria:
1. All 6 projects visible in uniform 2x3 grid.
2. Clicking any card opens fullscreen modal takeover with origin-aware animation.
3. Slideshow smoothly displays multiple real screenshots with caption and filmstrip.
4. Traversal controls (Prev/Next project & Prev/Next slide) function properly.
5. ESC and backdrop click close modal and restore focus.
6. Zero console errors, zero layout shifts.
</verification>
