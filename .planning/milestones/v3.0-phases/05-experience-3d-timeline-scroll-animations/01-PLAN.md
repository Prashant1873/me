---
phase: 05-experience-3d-timeline-scroll-animations
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/js/experience-canvas.js
  - src/js/experience.js
  - src/styles/experience.css
  - index.html
  - tests/experience.spec.js
autonomous: true
requirements:
  - EXP-01
  - EXP-06
  - EXP-07
  - EXP-08
  - 3D-06
  - 3D-10
user_setup: []
must_haves:
  truths:
    - "D-01: Dedicated 3D timeline canvas paired side-by-side with synchronized interactive card panel"
    - "D-02: 12-column grid apportionment: 5-column 3D spatial canvas on left, 7-column detail card on right"
    - "D-03: 3D nodes serve as primary navigation with hover raycasting and minimalist IBM Plex Mono date rail"
    - "D-04: Responsive vertical stack on tablet/mobile with compact 3D canvas header above active card"
    - "D-05: Pinned scroll scrubbing via GSAP ScrollTrigger through all 5 roles in z-depth"
    - "D-06: Linear Z-depth dolly: camera tracks straight along Z-axis past dissolving nodes"
    - "D-07: Crisp editorial crossfade & metric ticker: 200ms subtle fade + 6px Y-offset with animated counter"
    - "D-08: Seamless navigation sync & progress tracking with % progress bar and keyboard arrow support"
    - "D-09: Particle stream & cosmic dust conduits: glowing particle ribbon with concentrated star-clusters"
    - "D-10: Tungsten Amber (#C38B55) primary highlight for active star-cluster glow with cyan/blue particles"
    - "D-11: Mouse parallax + raycast hover bloom: subtle camera offset with halo bloom on hovered nodes"
    - "D-12: Adaptive particle budget (400–600 particles) + IntersectionObserver pausing when off-screen"
    - "D-13: Spatial focus & dimming with camera dolly: inactive nodes dim to 15% opacity with smooth camera glide"
    - "D-14: Inline toggle in detail card: View Dates mini-chart inside card replacing separate 2D modal"
    - "D-15: Keyboard and swipe navigation filtered: Arrow keys cycle strictly between active category milestones"
    - "D-16: Smooth bloom & restore opacities: all dimmed star-clusters and paths fade back to full brilliance over 400ms"
  artifacts:
    - src/js/experience-canvas.js
    - src/js/experience.js
    - src/styles/experience.css
    - index.html
    - tests/experience.spec.js
  key_links:
    - "src/js/experience.js imports and initializes initExperienceCanvas from src/js/experience-canvas.js"
    - "GSAP ScrollTrigger on #experience scrubs experienceCanvas.scrubTo(progress)"
    - "Category filter buttons trigger experienceCanvas.setCategoryFilter(catId)"
---

<objective>
Transform the Professional Experience section into an interactive 3D spatial timeline floating in space using Three.js and GSAP ScrollTrigger. Delivers EXP-01, EXP-06, EXP-07, EXP-08, 3D-06, and 3D-10 by implementing a WebGL cosmic particle conduit, linear Z-depth camera dolly, pinned scroll scrubbing, synchronized editorial detail card, and spatial category filtering.
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Three.js Experience Canvas Module & Cosmic Particle Conduits</name>
  <files>src/js/experience-canvas.js</files>
  <read_first>src/js/hero-canvas.js, src/js/experience-data.js, src/styles/design-system.css</read_first>
  <action>
Create `src/js/experience-canvas.js` implementing the Three.js 3D timeline scene:
- D-01: Provide an autonomous WebGL renderer attached to `#experience-canvas` container.
- D-06: Set up `THREE.PerspectiveCamera` configured for linear Z-depth dolly along the -Z axis.
- D-09: Generate a cosmic particle ribbon buffer geometry containing 500 total particles (150 ambient dust motes along spine z ∈ [10, -50], and 350 particles grouped into 5 milestone star-clusters of 70 particles each at z = 0, -10, -20, -30, -40). Add wireframe geometric cores (octahedrons/rings) at each milestone.
- D-10: Color palette: Tungsten Amber (`#C38B55`) for the active milestone star-cluster halo bloom, cool cyan/blue (`#2962FF` / `#4DD0E1`) for cosmic dust motes. Include dynamic palette recalculation on `data-theme` changes.
- D-11: Implement pointer tracking for mouse parallax offset and `THREE.Raycaster` hit-testing on milestone star-clusters to trigger hover halo expansion and click callbacks.
- D-12: Enforce particle budget (400–600 particles), cap `pixelRatio` at `Math.min(window.devicePixelRatio, 2)`, and pause RAF loop via `IntersectionObserver` when `#experience` is off-screen. Provide a `dispose()` method.
- D-13: Implement `setCategoryFilter(catId, activeIndices)` to smoothly tween inactive milestone nodes to 15% ghost opacity while maintaining active nodes at full brilliance.
- D-16: Implement smooth 400ms bloom to restore all star-clusters and connecting particle streams to 100% opacity when resetting to All Experience.
  </action>
  <verify>
Node/browser check: `src/js/experience-canvas.js` exports `initExperienceCanvas` with `scrubTo`, `focusNode`, `setCategoryFilter`, and `destroy` API methods.
  </verify>
  <acceptance_criteria>
    - `src/js/experience-canvas.js` exists and contains `export function initExperienceCanvas(`
    - `src/js/experience-canvas.js` contains `D-01:`, `D-06:`, `D-09:`, `D-10:`, `D-11:`, `D-12:`, `D-13:`, `D-16:`
    - Particle count is bounded between 400 and 600 particles
    - WebGLRenderer configures alpha: true and caps pixelRatio at 2
  </acceptance_criteria>
  <done>
Three.js canvas module ready with cosmic particle conduit, milestone coordinates, raycasting, and theme reactivity.
  </done>
</task>

<task type="auto">
  <name>Task 2: Semantic HTML Structure & 12-Column Spatial Grid</name>
  <files>index.html, src/styles/experience.css</files>
  <read_first>index.html, src/styles/experience.css, src/styles/design-system.css</read_first>
  <action>
Update `#experience` markup and CSS for the hybrid 3D spatial layout:
- D-01: Pair `#experience-canvas-container` side-by-side with `#experience-detail`.
- D-02: Apportion the 12-column grid: 5 columns for `#experience-canvas-container` on the left, 7 columns for `#experience-detail` on the right.
- D-03: Add canvas overlay `#experience-date-rail` featuring IBM Plex Mono date markers (2024–2026) with active milestone indicators along the canvas edge.
- D-04: Configure responsive media queries: on screens <1024px, stack `#experience-canvas-container` as a sticky/anchored ~240px header above `#experience-detail` with touch swipe support.
- D-08: Add a subtle `%` scroll progress track bar overlay in `#experience-canvas-container`.
- D-14: Replace the separate 2D modal button with an inline "View Dates" mini-chart toggle button inside `#experience-detail`, and deprecate `#experience-timeline-modal`.
  </action>
  <verify>
Inspect `index.html` and `src/styles/experience.css` to verify 5-col / 7-col grid classes, `#experience-canvas`, date rail, and inline date chart container.
  </verify>
  <acceptance_criteria>
    - `index.html` contains `id="experience-canvas"` and `id="experience-date-rail"`
    - `index.html` contains `D-01:`, `D-02:`, `D-03:`, `D-04:`, `D-08:`, `D-14:`
    - `src/styles/experience.css` implements 5-col / 7-col desktop grid and responsive vertical stack on mobile
  </acceptance_criteria>
  <done>
Markup and CSS updated with 5-col 3D canvas viewport, mono date rail, progress track, and inline date chart container.
  </done>
</task>

<task type="auto">
  <name>Task 3: GSAP ScrollTrigger Pinned Scrub & Detail Card Controller</name>
  <files>src/js/experience.js, src/js/main.js</files>
  <read_first>src/js/experience.js, src/js/experience-data.js, src/js/experience-canvas.js</read_first>
  <action>
Upgrade `src/js/experience.js` to coordinate the 3D canvas, ScrollTrigger pin, and card states:
- D-05: Register GSAP `ScrollTrigger` on `#experience` with `pin: true` and `scrub: 0.5` across virtual scroll distance `+=2200px`. Scrub camera Z-depth smoothly via `experienceCanvas.scrubTo(progress)`.
- D-07: Implement quantized milestone triggers: when active index changes (0 to 4), execute a 200ms GSAP editorial crossfade on `#experience-detail` with 6px Y-offset, update role bullets and workplace photos, and animate metric number counters.
- D-08: Synchronize header navigation click (`#nav-experience`) to scroll to pin start, update % progress track, and bind keyboard ArrowUp/ArrowDown to jump between milestones.
- D-14: Render an inline collapsible date mini-chart inside `#experience-detail` showing chronological spans across 2024–2026 with clickable role bars.
- D-15: Ensure keyboard arrow keys and swipe gestures navigate strictly between active category milestones when filtered.
- Initialize `initExperience` properly from `src/js/main.js`.
  </action>
  <verify>
Check `src/js/experience.js` imports `ScrollTrigger` and `initExperienceCanvas`, and binds scrub and milestone handlers.
  </verify>
  <acceptance_criteria>
    - `src/js/experience.js` contains `ScrollTrigger.create(` or `gsap.timeline({ scrollTrigger:`
    - `src/js/experience.js` contains `D-05:`, `D-07:`, `D-08:`, `D-14:`, `D-15:`
    - Active card updates on milestone transition with 200ms animation
  </acceptance_criteria>
  <done>
GSAP ScrollTrigger pinned scrub controller fully coordinates 3D camera dolly with editorial card crossfade, progress track, and date rail.
  </done>
</task>

<task type="auto">
  <name>Task 4: Category Filtering Sync & Bloom Restorations</name>
  <files>src/js/experience.js, src/js/experience-canvas.js</files>
  <read_first>src/js/experience.js, src/js/experience-data.js</read_first>
  <action>
Implement 3D category filtering interactions:
- D-13: When a category filter button ("All Experience", "Strategy", "Product") is clicked, calculate active indices, tell `experienceCanvas.setCategoryFilter(catId, activeIndices)` to dim inactive nodes to 15% opacity, and smoothly glide the camera to the first matching role.
- D-15: Adjust ScrollTrigger scrub bounds or step navigation so arrow keys and scrub thresholds skip over dimmed roles when filtered.
- D-16: On switching back to "All Experience", trigger a 400ms smooth bloom restoring all 5 star-clusters and connecting particle conduits to full brilliance without snapping camera position.
  </action>
  <verify>
Test category filter tab clicks in browser to ensure 3D nodes dim/highlight and card updates cleanly.
  </verify>
  <acceptance_criteria>
    - `src/js/experience.js` contains `D-13:`, `D-15:`, `D-16:`
    - Filter tabs properly update `setCategoryFilter` on canvas
    - Returning to "all" restores full opacity over 400ms
  </acceptance_criteria>
  <done>
Category filter dynamics smoothly dim and restore 3D particle nodes while synchronizing role cards.
  </done>
</task>

<task type="auto">
  <name>Task 5: Automated Verification & Regression Test Suite</name>
  <files>tests/experience.spec.js</files>
  <read_first>tests/experience.spec.js, tests/audit.spec.js</read_first>
  <action>
Update `tests/experience.spec.js` to assert Phase 5 deliverables:
- EXP-01, 3D-06: Verify `#experience-canvas` contains an active `<canvas>` element with 5-col / 7-col layout.
- EXP-07: Verify pinned scroll scrub traverses through roles and updates `#experience-detail`.
- EXP-08: Verify active role milestone glow and Tungsten Amber styling tokens.
- EXP-06: Verify category filtering works in the 3D timeline layout.
- 3D-10: Verify 60fps performance and zero layout regressions.
Run `npx playwright test tests/experience.spec.js` and `npm test` to verify full green suite.
  </action>
  <verify>
Run `npm test` and confirm all Playwright test specs pass with zero failures.
  </verify>
  <acceptance_criteria>
    - `npx playwright test tests/experience.spec.js` passes with 0 failures
    - `npm test` passes all test suites cleanly
  </acceptance_criteria>
  <done>
All automated tests pass cleanly with verified 3D canvas rendering, scroll pinning, and zero regressions.
  </done>
</task>

</tasks>

## Artifacts this phase produces
- `src/js/experience-canvas.js`: Autonomous Three.js 3D spatial timeline canvas controller
- Functions: `initExperienceCanvas`, `scrubTo`, `focusNode`, `setCategoryFilter`, `dispose`
- DOM elements: `#experience-canvas-container`, `#experience-canvas`, `#experience-date-rail`, `#experience-progress-track`
- Test updates: `tests/experience.spec.js`

---

## UAT Checklist
- [ ] Experience section rendered as 3D spatial timeline (Three.js) in 5-col / 7-col layout
- [ ] Scrolling traverses through timeline in z-depth with smooth GSAP ScrollTrigger pinning
- [ ] Timeline star-clusters animate and bloom with Tungsten Amber (#C38B55) highlights
- [ ] Clicking 3D nodes or date rail items navigates directly to that role
- [ ] Detail card crossfades crisply with animated metric ticker and workplace photos
- [ ] Category filters (All, Strategy, Product) dim inactive nodes in 3D and filter scroll traversal
- [ ] Inline "View Dates" mini-chart displays within the detail card
- [ ] Performance: 60fps on modern desktop, IntersectionObserver pauses RAF when off-screen
- [ ] Responsive: Adapts to vertical stack on tablet/mobile (<1024px)
- [ ] Automated Playwright test suite passes cleanly with zero regressions
