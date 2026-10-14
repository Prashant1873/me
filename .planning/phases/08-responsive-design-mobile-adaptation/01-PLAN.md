---
phase: 08-responsive-design-mobile-adaptation
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - index.html
  - src/styles/navigation.css
  - src/styles/sections.css
  - src/styles/design-system.css
  - src/styles/experience.css
  - src/styles/projects.css
  - src/styles/education.css
  - src/styles/contact.css
  - src/js/main.js
  - src/js/section-scroll.js
  - src/js/hero-canvas.js
  - src/js/experience.js
  - tests/responsive-mobile.spec.js
autonomous: true
requirements:
  - NAV-04
  - RESP-01
  - RESP-02
  - RESP-03
  - RESP-04
  - RESP-05
user_setup: []
must_haves:
  truths:
    - "D-01: Responsive Hamburger Navigation Drawer (NAV-04) - On viewports <= 768px, desktop links hide and an accessible #nav-toggle hamburger button opens an animated slide-out glass drawer with links, theme switch, CV download, and backdrop blur"
    - "D-02: Dual-Mode Scroll Architecture (RESP-01, RESP-02, RESP-03) - Desktop maintains strict 100vh snap-scroll at 1440px and 720p laptops, while mobile and tablet (<= 1024px or touch) switch to natural fluid document scrolling allowing complete section visibility"
    - "D-03: Responsive Section Reflows (RESP-02, RESP-03) - Hero, Experience, Projects, Education, and Contact adapt seamlessly into 1-column mobile and 2-column tablet layouts without horizontal overflow or text clipping"
    - "D-04: Strict Touch Target Sizing (RESP-03, RESP-05) - All interactive controls, nav links, buttons, modal triggers, and contact cards have tap areas >= 44x44px with >= 8px separation"
    - "D-05: Three.js Mobile Optimization - Hero and Experience 3D WebGL renderers cap pixel ratios at 1.5 on mobile/tablet, position gracefully, and throttle rendering when offscreen"
    - "D-06: WCAG 2.2 AA Contrast & Keyboard Accessibility (RESP-04, RESP-05) - All text passes 4.5:1 contrast in dark and light modes, and all interactive elements feature visible :focus-visible outline rings with focus trap in modals and drawer"
  artifacts:
    - tests/responsive-mobile.spec.js
    - src/styles/navigation.css
    - src/styles/sections.css
    - src/js/section-scroll.js
    - src/js/main.js
  key_links:
    - "index.html defines #nav-toggle and #mobile-nav-drawer with full ARIA semantics"
    - "src/js/main.js initializes mobile drawer event listeners, focus trap, and touch handlers"
    - "src/js/section-scroll.js enables fluid scroll and IntersectionObserver on viewports <= 1024px"
    - "src/styles/navigation.css controls hamburger icon morphing and drawer slide animations"
---

<objective>
Execute the complete responsive design and mobile adaptation for Prashant Shukla's portfolio across mobile (320px–767px), tablet (768px–1024px), and desktop (1440px+). Deliver an accessible, animated hamburger navigation drawer, touch-friendly interactions (>= 44x44px), dual-mode scroll architecture, mobile-adapted 3D scenes, fluid typography scaling, and verified WCAG 2.2 AA contrast and keyboard accessibility. Delivers requirements NAV-04, RESP-01, RESP-02, RESP-03, RESP-04, and RESP-05.
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Playwright Multi-Viewport & Accessibility Test Suite (Wave 0)</name>
  <files>tests/responsive-mobile.spec.js</files>
  <read_first>.planning/phases/08-responsive-design-mobile-adaptation/08-CONTEXT.md, .planning/phases/08-responsive-design-mobile-adaptation/08-UI-SPEC.md, .planning/REQUIREMENTS.md</read_first>
  <action>
1. Create `tests/responsive-mobile.spec.js` asserting all Phase 8 requirements across Mobile (375x667, 390x844), Tablet (768x1024), and Desktop (1440x900):
   - **NAV-04**: 
     - At width 375px: `#nav-toggle` is visible and desktop `.site-nav__links` is hidden.
     - Clicking `#nav-toggle` sets `aria-expanded="true"`, reveals `#mobile-nav-drawer`, and locks body scroll.
     - Pressing `Escape` or clicking `#drawer-close` or a navigation link closes the drawer and restores focus to `#nav-toggle`.
   - **RESP-01**:
     - At width 1440px: 12-column grid active, all 5 sections fit within 100vh without page overflow.
   - **RESP-02**:
     - At width 768px: Projects grid renders in 2 columns, Education pillars stack or wrap cleanly, horizontal scrollbar is absent (`scrollWidth <= innerWidth`).
   - **RESP-03**:
     - At width 375px and 320px: Single-column layout across all sections, zero horizontal overflow (`scrollWidth === clientWidth`), touch targets for all primary buttons and links are >= 44px in width and height.
   - **RESP-04**:
     - Text elements (headings, subtitles, badges, body bullets, links) pass WCAG 2.2 AA contrast in both Dark and Light modes.
   - **RESP-05**:
     - Interactive elements receive visible focus rings on keyboard `Tab` navigation.
     - Modals and mobile navigation drawer trap focus while open.
  </action>
  <verify>
Run `npx playwright test tests/responsive-mobile.spec.js --project=chromium` to verify test suite initializes and detects responsive requirements.
  </verify>
  <acceptance_criteria>
    - `tests/responsive-mobile.spec.js` exists and encodes test scenarios for NAV-04, RESP-01, RESP-02, RESP-03, RESP-04, and RESP-05
    - Tests assert viewport states at 375px, 768px, and 1440px
  </acceptance_criteria>
  <done>
Multi-viewport responsive and accessibility Playwright test contract established.
  </done>
</task>

<task type="auto">
  <name>Task 2: Dual-Mode Scroll Architecture & Mobile Viewport Decoupling</name>
  <files>src/js/section-scroll.js, src/styles/sections.css, src/styles/design-system.css</files>
  <read_first>src/js/section-scroll.js, src/styles/sections.css, .planning/phases/08-responsive-design-mobile-adaptation/08-RESEARCH.md</read_first>
  <action>
1. In `src/styles/sections.css`:
   - Add media query for `@media (max-width: 1024px), (pointer: coarse)`:
     - Set `.section` to `min-height: 100vh; min-height: 100dvh; height: auto; max-height: none; overflow: visible;`.
     - Set `.section--hero` to `min-height: 100vh; height: auto; max-height: none; overflow: visible;`.
     - Ensure mobile padding accommodates fixed header: `padding-top: calc(56px + 20px); padding-bottom: 32px;`.
2. In `src/js/section-scroll.js`:
   - Detect responsive mode: `const isMobileOrTablet = () => window.innerWidth <= 1024 || window.matchMedia('(pointer: coarse)').matches;`
   - In `onWheel`:
     - If `isMobileOrTablet()`, return early and do not `preventDefault()` (allowing native vertical scrolling).
   - In touch listeners (`touchstart`, `touchend`):
     - If `isMobileOrTablet()`, do not hijack vertical swipe gestures with `scrollToSection()`. Allow native momentum scroll.
     - Retain horizontal touch scrubbing over `#experience-timeline-track` for milestone exploration.
   - In `updateNav`:
     - Add an `IntersectionObserver` observing all sections with `threshold: [0.2, 0.5]` that updates `currentIndex` and toggles `.is-active` on both desktop and mobile nav links as user scrolls naturally.
   - In `scrollToSection`:
     - Calculate target scroll offset with sticky header clearance (`offset - (isMobileOrTablet() ? 60 : 70)`).
  </action>
  <verify>
Test in browser at width 375px and 1440px: verify desktop still snaps between sections on scroll while mobile scrolls freely and updates the active nav link.
  </verify>
  <acceptance_criteria>
    - Desktop (1440px) maintains 100vh section snap
    - Mobile (<= 1024px) allows native vertical scrolling through sections without locking
    - IntersectionObserver highlights the current active section in nav during mobile scrolling
  </acceptance_criteria>
  <done>
Dual-mode scroll architecture operational and verified across screen sizes.
  </done>
</task>

<task type="auto">
  <name>Task 3: Mobile Hamburger Navigation Drawer, Focus Trap & Touch Targets (NAV-04, RESP-05)</name>
  <files>index.html, src/styles/navigation.css, src/js/main.js</files>
  <read_first>src/styles/navigation.css, index.html, .planning/phases/08-responsive-design-mobile-adaptation/08-UI-SPEC.md</read_first>
  <action>
1. In `index.html`:
   - Add `#nav-toggle` button inside `.site-nav__inner`:
     - `aria-label="Toggle navigation menu"`, `aria-expanded="false"`, `aria-controls="mobile-nav-drawer"`.
     - Inner span elements for 3 animated bars.
   - Add `#mobile-nav-drawer` markup right before `</nav>` or at root of body:
     - Backdrop element `#drawer-backdrop`.
     - Panel `#drawer-panel` with header (`00 // MENU` tag + `#drawer-close` button).
     - Navigation links: Home, Experience, Projects, Education, Contact with `data-section` attributes.
     - Footer section with theme toggle clone, official resume download link, and quick social links (LinkedIn, GitHub, Email).
2. In `src/styles/navigation.css`:
   - Add styling for `.nav-toggle`:
     - Hidden on desktop (`@media (min-width: 769px) { display: none; }`).
     - Visible on `max-width: 768px`, minimum dimensions `44px × 44px`.
     - Animated 3-bar morph to "X" when `.is-open`.
   - Add styling for `.mobile-drawer`:
     - Fixed overlay (`z-index: 1050`, inset: 0).
     - Glassmorphic backdrop (`backdrop-filter: blur(20px)`).
     - Drawer panel: right-aligned, width `min(86vw, 360px)`, background `var(--bg-glass-heavy)` with subtle border.
     - Mobile nav links: `min-height: 48px`, font-size 18px, uppercase, flex align center with subtle left border indicator on active.
     - Focus-visible outline rings on all drawer controls.
3. In `src/js/main.js`:
   - Implement `initMobileNav()`:
     - Open/close toggle logic with GSAP slide animation.
     - Keyboard trap: handle `Tab` and `Shift+Tab` within drawer.
     - `Escape` key closes drawer and returns focus to `#nav-toggle`.
     - Clicking any drawer link scrolls smoothly to target section and closes drawer.
     - Clicking backdrop closes drawer.
     - Lock body scrolling (`document.body.style.overflow = 'hidden'`) while drawer is open.
  </action>
  <verify>
Verify in browser at 375px: click hamburger button, drawer slides in, active links work, Escape closes drawer, body scroll is locked when open.
  </verify>
  <acceptance_criteria>
    - `#nav-toggle` is visible on mobile and hidden on desktop
    - Drawer opens with smooth 60fps animation and closes cleanly
    - Keyboard navigation (Tab trap, Escape to exit) fully functional
    - All touch targets in drawer are >= 48px tall
  </acceptance_criteria>
  <done>
Mobile hamburger navigation drawer live, accessible, and verified.
  </done>
</task>

<task type="auto">
  <name>Task 4: Responsive Section Reflows, 3D Canvas Adaptation & Touch Optimization (RESP-01 to RESP-05)</name>
  <files>src/styles/sections.css, src/styles/experience.css, src/styles/projects.css, src/styles/education.css, src/styles/contact.css, src/js/hero-canvas.js, src/js/experience.js</files>
  <read_first>src/styles/experience.css, src/styles/projects.css, src/styles/education.css, src/styles/contact.css</read_first>
  <action>
1. **Hero Section (`src/styles/sections.css`, `src/js/hero-canvas.js`)**:
   - Ensure headline text uses fluid `clamp(2.25rem, 7.5vw, 4.5rem)`.
   - On `≤ 900px`, 3D canvas positioned in background with `opacity: 0.28` and pointer-events disabled.
   - Cap `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))` on mobile in `hero-canvas.js`.
2. **Experience Section (`src/styles/experience.css`, `src/js/experience.js`)**:
   - In `experience.js`: add touch-friendly Next/Prev milestone arrow buttons (`.experience-nav-btn`) to the active company card on mobile for direct 1-tap milestone progression.
   - Timeline track canvas height set to `140px` on mobile with smooth touch drag.
   - Detail card padding, fonts, and impact bullets reflow cleanly into 1 column.
   - Timeline calendar and photo lightbox modals adapt to full-screen sheets on mobile with >= 44px close button.
3. **Projects Section (`src/styles/projects.css`)**:
   - Grid: 2 columns on tablet (`768px-1024px`), 1 column on mobile (`< 768px`).
   - Project cards: Full width, minimum tap target >= 44px for card clicks.
   - Modal case study: Fullscreen takeover on mobile, sticky close button, touch-friendly carousel arrows (44x44px).
4. **Education Section (`src/styles/education.css`)**:
   - 3 pillars stack into 1 column on `≤ 1024px`.
   - Badges, logos, and metric tags wrap without horizontal clipping.
   - Skills matrix pills wrap into clean grid rows with >= 36px tap targets.
5. **Contact Section (`src/styles/contact.css`)**:
   - Channels grid: 2 columns on tablet, 1 column on mobile (`< 480px`).
   - All contact cards >= 56px height.
   - Dedicated email copy button with 44x44px touch target.
   - Resume download hero CTA full width on mobile (`height: 48px`).
   - Footer metadata stacks neatly on mobile without truncation.
6. **Focus-Visible & Contrast (`src/styles/design-system.css`)**:
   - Verify `:focus-visible` styling on all buttons and anchors.
   - Ensure all text passes WCAG 2.2 AA (4.5:1 for body, 3:1 for headers) across dark and light themes.
  </action>
  <verify>
Run `npx playwright test tests/responsive-mobile.spec.js --project=chromium` and inspect pages at 320px, 375px, 768px, and 1440px.
  </verify>
  <acceptance_criteria>
    - All sections reflow smoothly without horizontal scrolling on 320px, 375px, and 768px
    - Touch targets for all interactive elements are >= 44px
    - 3D canvases operate smoothly without lag on mobile viewports
    - Text contrast passes WCAG 2.2 AA in both dark and light modes
  </acceptance_criteria>
  <done>
All portfolio sections fully responsive, touch-optimized, and WCAG AA compliant.
  </done>
</task>

<task type="auto">
  <name>Task 5: End-to-End Multi-Viewport Regression Verification</name>
  <files>tests/responsive-mobile.spec.js, tests/audit.spec.js, tests/education-contact.spec.js, tests/projects.spec.js</files>
  <read_first>tests/responsive-mobile.spec.js</read_first>
  <action>
1. Execute full Playwright test suite for Phase 8:
   `npx playwright test tests/responsive-mobile.spec.js --project=chromium`
2. Run regression checks on existing tests to guarantee zero desktop regressions:
   `npx playwright test tests/education-contact.spec.js tests/projects.spec.js --project=chromium`
3. Verify that `npm run build` succeeds without bundle or CSS errors.
4. Verify that no em-dashes exist across the repository: `npm run check:em-dash`.
  </action>
  <verify>
`npx playwright test tests/responsive-mobile.spec.js --project=chromium` passes with 100% green.
  </verify>
  <acceptance_criteria>
    - All tests in `tests/responsive-mobile.spec.js` pass
    - Existing desktop tests remain green
    - Production build (`npm run build`) completes successfully
    - No em-dash check passes
  </acceptance_criteria>
  <done>
Phase 8 responsive design and mobile adaptation verified end-to-end.
  </done>
</task>

</tasks>
