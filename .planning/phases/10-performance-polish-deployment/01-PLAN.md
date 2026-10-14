---
phase: 10-performance-polish-deployment
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - .github/workflows/deploy.yml
  - index.html
  - src/js/3d/background-scene.js
  - src/js/3d/particle-constellations.js
  - src/js/3d/terrain.js
  - src/js/section-scroll.js
  - src/styles/index.css
  - src/styles/sections.css
  - tests/performance-deployment.spec.js
  - vite.config.js
autonomous: true
requirements:
  - 3D-09
  - 3D-10
  - RESP-06
  - RESP-07
  - DEPL-01
  - DEPL-02
  - DEPL-03
user_setup: []
must_haves:
  truths:
    - "D-01: Automated GitHub Actions CI/CD (DEPL-01) - Builds dist/ and deploys to GitHub Pages on every push to master"
    - "D-02: Progressive Enhancement & Low-Power Throttle (3D-09, 3D-10) - Automatic framerate monitoring and WebGL context-loss fallback preserves smooth rendering and prevents battery drain"
    - "D-03: prefers-reduced-motion Support (RESP-07) - Disables or simplifies camera sweeps, wave undulation, and particle flutter when user prefers reduced motion"
    - "D-04: Semantic HTML5 Structure & Accessibility (RESP-06) - Header, main, section, footer landmarks with single h1 and strict heading hierarchy"
    - "D-05: Rollup Vendor Chunking (DEPL-02) - Splits Three.js and GSAP into dedicated vendor chunks for optimal browser caching"
    - "D-06: Production SEO & Social Cards (DEPL-03) - Comprehensive Open Graph, Twitter Cards, canonical URL, and Structured Data"
  artifacts:
    - .github/workflows/deploy.yml
    - tests/performance-deployment.spec.js
    - vite.config.js
  key_links:
    - "index.html defines complete SEO metadata and semantic landmarks"
    - "src/js/3d/background-scene.js checks prefers-reduced-motion and monitors FPS"
    - "vite.config.js configures manualChunks and base path"
    - ".github/workflows/deploy.yml coordinates automated build and deployment"
---

<objective>
Execute Phase 10: Performance, Polish & Deployment. Deliver progressive enhancement for low-power devices (3D-09), maintain 60fps across 3D scenes (3D-10), implement prefers-reduced-motion support (RESP-07), audit semantic HTML5 hierarchy (RESP-06), set up automated GitHub Pages deployment via GitHub Actions (DEPL-01), optimize code chunking (DEPL-02), and complete production SEO meta tags (DEPL-03).
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Playwright Performance, Accessibility & Deployment Test Suite (Wave 0)</name>
  <files>tests/performance-deployment.spec.js</files>
  <read_first>.planning/phases/10-performance-polish-deployment/10-CONTEXT.md, .planning/REQUIREMENTS.md</read_first>
  <action>
1. Create `tests/performance-deployment.spec.js` asserting:
   - **3D-09 & RESP-07**: `backgroundScene.setReducedMotion(true)` pauses wave undulation and particle breathing; CSS respects `prefers-reduced-motion: reduce`.
   - **3D-10**: Background 3D scene renders without console errors and exposes FPS/cadence metrics.
   - **RESP-06**: Exactly one `<h1>` element on the page; proper landmark hierarchy (`header`, `main`, `footer`, `section[id]`); all interactive buttons have `aria-label` or accessible names.
   - **DEPL-02**: Production build assets are chunked cleanly without single monolithic bundle.
   - **DEPL-03**: `index.html` head contains essential SEO and social sharing meta tags: description, og:title, og:description, og:image, twitter:card, canonical link, and theme-color.
  </action>
  <verify>
Run `npx playwright test tests/performance-deployment.spec.js --project=chromium` to verify the test suite initializes and detects Phase 10 specifications.
  </verify>
  <acceptance_criteria>
    - `tests/performance-deployment.spec.js` exists and encodes all Phase 10 requirement test cases
  </acceptance_criteria>
  <done>
Playwright test contract for Phase 10 established.
  </done>
</task>

<task type="auto">
  <name>Task 2: Progressive Enhancement, Low-Power Throttle & Reduced Motion (3D-09, 3D-10, RESP-07)</name>
  <files>src/js/3d/background-scene.js, src/js/3d/terrain.js, src/js/3d/particle-constellations.js, src/styles/index.css, src/js/section-scroll.js</files>
  <read_first>src/js/3d/background-scene.js, .planning/phases/10-performance-polish-deployment/10-RESEARCH.md</read_first>
  <action>
1. In `src/styles/index.css`:
   - Add `@media (prefers-reduced-motion: reduce)` block setting transition and animation durations to 0.01ms and scroll-behavior to auto.
2. In `src/js/3d/terrain.js`:
   - Add `setReducedMotion(bool)`: when true, skips per-frame sine elevation recalculation and keeps static landscape geometry.
3. In `src/js/3d/particle-constellations.js`:
   - Add `setReducedMotion(bool)`: when true, disables idle harmonic breathing and sets morph duration to instantaneous.
4. In `src/js/3d/background-scene.js`:
   - Implement `checkReducedMotion()` on startup and listen for media query changes.
   - Implement rolling FPS monitor: if average delta > 33.3ms for 45+ frames, activate `lowPowerMode` (render every 2nd frame, clamp pixel ratio to 1.0, skip alternate wave updates).
   - Implement `webglcontextlost` listener: prevents uncaught exceptions, falls back gracefully to CSS atmospheric background.
5. In `src/js/section-scroll.js`:
   - Respect `prefers-reduced-motion`: set GSAP scroll duration to 0.05s when active.
  </action>
  <verify>
Verify in browser: reduced motion freezes undulation and makes section jumps instantaneous; low-power mode adapts rendering smoothly.
  </verify>
  <acceptance_criteria>
    - prefers-reduced-motion respected in both CSS and JavaScript
    - Low-power mode throttles frame rendering automatically without crashes
    - WebGL context loss is handled gracefully
  </acceptance_criteria>
  <done>
Progressive enhancement, 60fps optimizations, and reduced motion fully operational.
  </done>
</task>

<task type="auto">
  <name>Task 3: Semantic HTML5 Structure & Heading Hierarchy Audit (RESP-06)</name>
  <files>index.html, src/styles/nav.css</files>
  <read_first>index.html</read_first>
  <action>
1. In `index.html`:
   - Ensure `#site-nav` is wrapped in semantic `<header class="site-header" role="banner">`.
   - Verify single `<h1>` for Prashant Shukla in `#hero`.
   - Ensure each section (`#experience`, `#projects`, `#education`, `#contact`) has an `<h2>` for its primary title.
   - Verify all landmark elements: `<header>`, `<main>`, `<section>`, `<footer>`.
   - Ensure all interactive elements without text have explicit `aria-label` attributes.
  </action>
  <verify>
Run Playwright semantic structure test in `tests/performance-deployment.spec.js`.
  </verify>
  <acceptance_criteria>
    - Single h1 heading exists on page
    - Valid landmark elements: header, main, section, footer
    - 100% accessible button labels
  </acceptance_criteria>
  <done>
Semantic HTML5 hierarchy and landmark audit verified.
  </done>
</task>

<task type="auto">
  <name>Task 4: Production SEO Meta Tags, Social Sharing & Rollup Code Splitting (DEPL-02, DEPL-03)</name>
  <files>index.html, vite.config.js</files>
  <read_first>vite.config.js, index.html</read_first>
  <action>
1. In `index.html`:
   - Add complete metadata:
     - `canonical` link to `https://prashant1873.github.io/AboutMe/`
     - `og:image`, `og:image:width`, `og:image:height`, `og:site_name`, `og:locale`
     - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator`
     - `theme-color` meta tags for dark and light modes
     - JSON-LD Structured Data script (`schema.org/Person`)
2. In `vite.config.js`:
   - Configure `rollupOptions.output.manualChunks` to split `three` and `gsap` into separate vendor chunks.
   - Set `chunkSizeWarningLimit: 800`.
3. Run `npm run build` and verify all chunk sizes are clean and warning-free.
  </action>
  <verify>
`npm run build` produces separate `vendor-three` and `vendor-gsap` chunks without warnings.
  </verify>
  <acceptance_criteria>
    - Complete SEO and Social Sharing meta tags in index.html
    - Vendor code-splitting active in vite.config.js
    - Clean production build under size limits
  </acceptance_criteria>
  <done>
SEO metadata and Rollup code-splitting configured and verified.
  </done>
</task>

<task type="auto">
  <name>Task 5: Automated GitHub Pages Deployment Workflow & Milestone Final Audit (DEPL-01)</name>
  <files>.github/workflows/deploy.yml</files>
  <read_first>.planning/phases/10-performance-polish-deployment/10-RESEARCH.md</read_first>
  <action>
1. Create `.github/workflows/deploy.yml`:
   - Trigger on push to `master`.
   - Environment: GitHub Pages.
   - Jobs:
     - `build`: checkout code, setup Node.js 20 with cache, run `npm ci`, `npm run check:em-dash`, `npm run build`, and upload `dist/` with `actions/upload-pages-artifact@v3`.
     - `deploy`: deploy artifact with `actions/deploy-pages@v4`.
2. Run full test suite across the repository (`tests/*.spec.js`).
3. Run `npm run check:em-dash` to verify zero em-dashes exist across the entire repository.
4. Run `npm run build` to verify final production artifact generation.
  </action>
  <verify>
Run `npm run check:em-dash` and `npm run build`; verify `.github/workflows/deploy.yml` syntax.
  </verify>
  <acceptance_criteria>
    - .github/workflows/deploy.yml exists with complete GitHub Pages deployment workflow
    - All tests pass with zero regressions
    - Production build succeeds
    - Zero em-dashes across all repo files
  </acceptance_criteria>
  <done>
Automated deployment pipeline configured and final milestone verification ready.
  </done>
</task>

</tasks>
