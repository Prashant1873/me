---
phase: 09-advanced-3d-section-transitions
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - index.html
  - src/js/3d/background-scene.js
  - src/js/3d/particle-constellations.js
  - src/js/3d/terrain.js
  - src/js/main.js
  - src/js/section-scroll.js
  - src/styles/sections.css
  - tests/advanced-3d-transitions.spec.js
autonomous: true
requirements:
  - 3D-02
  - 3D-03
  - 3D-04
  - 3D-05
  - 3D-07
  - 3D-08
user_setup: []
must_haves:
  truths:
    - "D-01: Single Unified Background 3D Canvas (3D-02, 3D-04) - A single fixed full-viewport WebGL canvas (#bg-canvas) behind DOM sections running at 60fps, consolidating GPU resources and eliminating context loss"
    - "D-02: Continuous Undulating Terrain Landscape (3D-02) - A low-polygon wireframe terrain mesh beneath camera trajectory undulating with procedural elevation waves in Structured Intensity hues"
    - "D-03: Pure Particle Constellations (3D-03) - 5 unique thematic particle formations (Orbital Command, Conduit Spine, Matrix Voxel, Crystalline Octahedron, Radial Pulsar) without solid wireframe meshes"
    - "D-04: Fluid Constellation Morphing Engine (3D-03, 3D-08) - Particles smoothly interpolate coordinates between section formations with organic staggered arrival over 700ms–800ms"
    - "D-05: Camera Spline Traversal & Parallax (3D-05, 3D-07) - Camera journeys along a continuous 3D spatial spline between section waypoints synchronized with section-scroll.js, with mouse parallax damping"
    - "D-06: Cinematic Section Transitions (3D-07, 3D-08) - Section transitions execute coordinated 700ms 3D camera travel + particle morphing + 220ms DOM content reveals adhering to Structured Intensity timing tokens"
  artifacts:
    - src/js/3d/background-scene.js
    - src/js/3d/particle-constellations.js
    - src/js/3d/terrain.js
    - tests/advanced-3d-transitions.spec.js
  key_links:
    - "index.html defines #bg-canvas directly behind <main>"
    - "src/js/main.js initializes initBackgroundScene() and connects it to sectionScroll"
    - "src/js/section-scroll.js notifies backgroundScene.onSectionChange(idx) on every transition"
    - "src/styles/sections.css keeps section backgrounds atmospheric and transparent to reveal 3D canvas"
---

<objective>
Build and orchestrate the unified Three.js background canvas with continuous undulating wireframe terrain, cosmic dust particle field, pure particle constellations that fluidly morph into thematic section shapes (Hero, Experience, Projects, Education, Contact), 3D camera spline traversal, mouse parallax depth, and cinematic scroll-triggered GSAP section transitions. Delivers requirements 3D-02, 3D-03, 3D-04, 3D-05, 3D-07, and 3D-08.
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Playwright 3D Experiential & Section Transition Test Suite (Wave 0)</name>
  <files>tests/advanced-3d-transitions.spec.js</files>
  <read_first>.planning/phases/09-advanced-3d-section-transitions/09-CONTEXT.md, .planning/phases/09-advanced-3d-section-transitions/09-UI-SPEC.md, .planning/REQUIREMENTS.md</read_first>
  <action>
1. Create `tests/advanced-3d-transitions.spec.js` asserting all Phase 9 requirements:
   - **3D-02**: `#bg-canvas` exists, is rendered via WebGL, and occupies the full viewport behind content (`z-index: 0`).
   - **3D-03**: The background 3D engine initializes with morphing particle constellations; exposes controller methods to inspect active constellation state for each section (0 to 4).
   - **3D-04**: Ambient particle field (cosmic dust) is populated with >= 200 points.
   - **3D-05**: Pointer movement over window changes camera parallax offset; scrolling through sections advances camera z-depth along the spline.
   - **3D-07 & 3D-08**: Navigating between sections triggers smooth 3D camera waypoint transition and particle position interpolation within the specified timing envelope (600–800ms narrative duration, 160–280ms UI duration).
   - **Theme Reactivity**: Toggling dark/light mode updates fog color and particle materials cleanly without WebGL context recreation.
  </action>
  <verify>
Run `npx playwright test tests/advanced-3d-transitions.spec.js --project=chromium` to verify the test suite initializes and detects 3D contract specifications.
  </verify>
  <acceptance_criteria>
    - `tests/advanced-3d-transitions.spec.js` exists and encodes test cases for 3D-02, 3D-03, 3D-04, 3D-05, 3D-07, and 3D-08
  </acceptance_criteria>
  <done>
Playwright test contract for Phase 9 established.
  </done>
</task>

<task type="auto">
  <name>Task 2: Continuous Undulating Wireframe Terrain & Cosmic Dust System (3D-02, 3D-04)</name>
  <files>src/js/3d/terrain.js, src/js/3d/background-scene.js, index.html, src/styles/sections.css, src/js/main.js</files>
  <read_first>src/js/hero-canvas.js, src/styles/sections.css, .planning/phases/09-advanced-3d-section-transitions/09-RESEARCH.md</read_first>
  <action>
1. In `index.html`:
   - Add `<canvas id="bg-canvas" class="bg-canvas" aria-hidden="true"></canvas>` right before `<main>`.
2. In `src/styles/sections.css`:
   - Add `.bg-canvas` styles: `position: fixed; inset: 0; width: 100vw; height: 100vh; height: 100dvh; z-index: 0; pointer-events: none;`.
   - Update `.section` background transparency so the 3D scene shines through cleanly while preserving high card contrast.
3. Create `src/js/3d/terrain.js`:
   - Function `createTerrain()` returning mesh with procedural sine/noise elevation waves.
   - Responsive resolution: 48x80 grid on desktop, 32x48 on mobile.
   - In Dark Mode: Royal Blue wireframe with subtle obsidian fog; In Light Mode: Slate/Graphite wireframe with warm fog.
4. Create `src/js/3d/background-scene.js`:
   - Single WebGLRenderer with `alpha: true`, antialiasing, and capped pixel ratio (1.5 mobile, 2.0 desktop).
   - Atmospheric `THREE.FogExp2`.
   - Ambient cosmic dust motes (250–300 particles) with gentle continuous drift.
   - Mounts terrain mesh beneath camera path.
5. In `src/js/main.js`:
   - Initialize `initBackgroundScene()`.
  </action>
  <verify>
Open in browser: verify `#bg-canvas` renders animated wireframe terrain and cosmic dust behind sections.
  </verify>
  <acceptance_criteria>
    - `#bg-canvas` renders at 60fps in background
    - Continuous wireframe terrain undulates beneath camera
    - Ambient cosmic dust motes drift gently across viewport
  </acceptance_criteria>
  <done>
Continuous terrain and cosmic dust background engine operational.
  </done>
</task>

<task type="auto">
  <name>Task 3: Pure Particle Constellation Engine & Fluid Morphing (3D-03, 3D-04)</name>
  <files>src/js/3d/particle-constellations.js, src/js/3d/background-scene.js</files>
  <read_first>.planning/phases/09-advanced-3d-section-transitions/09-UI-SPEC.md, src/js/3d/background-scene.js</read_first>
  <action>
1. Create `src/js/3d/particle-constellations.js`:
   - Export generator functions for 600 particles:
     - `generateHeroPositions()`: Orbital spherical nucleus + inner/outer tilted rings.
     - `generateExperiencePositions()`: Horizontal sine spine + 5 nodal milestone spheres.
     - `generateProjectsPositions()`: 3D modular voxel lattice matrix.
     - `generateEducationPositions()`: Stellated octahedron crystalline aerospace star.
     - `generateContactPositions()`: Radial concentric expanding signal pulsar rings.
   - Export `createConstellation(scene, initialSection)`:
     - Builds `THREE.BufferGeometry` with dynamic `position` attribute.
     - Custom glow texture or circular point material with `THREE.AdditiveBlending` (Dark) and `THREE.NormalBlending` (Light).
     - Exposes `morphToSection(sectionIndex, duration)` interpolating current coordinates to target section coordinates with organic per-particle delay.
2. In `src/js/3d/background-scene.js`:
   - Mount particle constellation and connect per-frame position updates in render loop.
  </action>
  <verify>
Verify in browser: calling `morphToSection(1)` through `morphToSection(4)` fluidly transforms particles into respective thematic shapes.
  </verify>
  <acceptance_criteria>
    - 5 distinct particle constellation shapes generated
    - Particle morphing between shapes is fluid and organic without popping or dropped frames
    - Dark and light theme colors apply seamlessly
  </acceptance_criteria>
  <done>
Pure particle constellation morphing engine live and verified.
  </done>
</task>

<task type="auto">
  <name>Task 4: Camera Spline Traversal & Cinematic Section Transitions (3D-05, 3D-07, 3D-08)</name>
  <files>src/js/3d/background-scene.js, src/js/section-scroll.js, src/styles/sections.css, src/js/main.js</files>
  <read_first>src/js/section-scroll.js, src/js/3d/background-scene.js, .planning/phases/09-advanced-3d-section-transitions/09-RESEARCH.md</read_first>
  <action>
1. In `src/js/3d/background-scene.js`:
   - Define camera waypoints for sections 0 to 4 (`CAMERA_WAYPOINTS` with position and lookAt vectors).
   - Implement `transitionToSection(index)`:
     - GSAP tween on camera position and lookAt target (700ms `power2.inOut`).
     - Calls constellation `morphToSection(index, 750ms)`.
   - Implement mouse parallax:
     - Pointermove listener updates `targetMouseX` and `targetMouseY`.
     - Smooth spring interpolation nudges camera offset and lookAt in per-frame render loop.
2. In `src/js/section-scroll.js`:
   - Hook into `scrollToSection(index)` and the `IntersectionObserver` callback:
     - Call `window.backgroundScene?.transitionToSection(index)` to synchronize camera travel with scroll navigation.
3. In `src/styles/sections.css`:
   - Add cinematic reveal animations on section active state (`.section.is-active .section__header`, `.section.is-active .section-tag`).
  </action>
  <verify>
Test in browser: scrolling or clicking navigation links smoothly triggers 3D camera travel through terrain and morphs constellation to match the new section.
  </verify>
  <acceptance_criteria>
    - Section transitions coordinate 3D camera movement and constellation morphing
    - Mouse parallax produces subtle 3D spatial depth across layers
    - Motion timings follow 160–280ms UI and 700ms narrative specs
  </acceptance_criteria>
  <done>
Camera spline traversal and cinematic section transitions fully operational.
  </done>
</task>

<task type="auto">
  <name>Task 5: End-to-End Verification, Performance & Regression Audit</name>
  <files>tests/advanced-3d-transitions.spec.js, tests/responsive-mobile.spec.js, tests/education-contact.spec.js, tests/projects.spec.js</files>
  <read_first>tests/advanced-3d-transitions.spec.js</read_first>
  <action>
1. Run Playwright test suite `tests/advanced-3d-transitions.spec.js` in Chromium to verify all 3D requirements.
2. Run full regression test suite (`tests/responsive-mobile.spec.js`, `tests/education-contact.spec.js`, `tests/projects.spec.js`).
3. Check 60fps frame rate and zero WebGL memory leaks during continuous section switching.
4. Run `npm run check:em-dash` and `npm run build` to guarantee zero syntax or production bundling regressions.
  </action>
  <verify>
`npx playwright test tests/advanced-3d-transitions.spec.js --project=chromium` passes 100% green.
  </verify>
  <acceptance_criteria>
    - All tests in `tests/advanced-3d-transitions.spec.js` pass
    - Desktop and mobile tests pass with zero regressions
    - Build completes cleanly with zero errors
  </acceptance_criteria>
  <done>
Phase 9 complete, verified, and ready for milestone polish.
  </done>
</task>

</tasks>
