---
phase: 11-experience-3d-canvas-polish-particle-occlusion
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/js/experience-canvas.js
  - tests/experience-canvas-polish.spec.js
autonomous: true
requirements:
  - EXP-3D-01
  - EXP-3D-02
user_setup: []
must_haves:
  truths:
    - "D-01: Substantial Particle Sizing (EXP-3D-01) - Particles across orbit rings, conduit stream, and cosmic dust are visibly scaled up for clear presence on both high-DPI desktop and mobile screens"
    - "D-02: Vibrant Light Mode Contrast (EXP-3D-01) - In light mode, particles utilize saturated, high-contrast amber/cyan/blue tones that remain easily distinguishable against light backgrounds"
    - "D-03: Real Z-Axis Occlusion (EXP-3D-02) - Orbit rings circling around company medallions become invisible when revolving behind the logo along the Z-axis, rather than rendering on top of the logo face"
  artifacts:
    - src/js/experience-canvas.js
    - tests/experience-canvas-polish.spec.js
  key_links:
    - "src/js/experience-canvas.js defines particle sizes, textures, palettes, depthTest, and Z-axis transformation"
    - "tests/experience-canvas-polish.spec.js verifies depthTest, sizing, and theme responsiveness"
---

<objective>
Execute Phase 11: Experience 3D Canvas Polish & Particle Occlusion.
Deliver substantial particle size enlargement across all particle systems (EXP-3D-01), tune light mode colors for crisp visual distinction, and implement true Z-axis occlusion/depth attenuation so particles revolving behind company logo medallions become invisible (EXP-3D-02).
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Playwright Verification Suite for 3D Particle Polish & Occlusion (Wave 0)</name>
  <files>tests/experience-canvas-polish.spec.js</files>
  <read_first>.planning/phases/11-experience-3d-canvas-polish-particle-occlusion/11-CONTEXT.md, src/js/experience-canvas.js</read_first>
  <action>
1. Create `tests/experience-canvas-polish.spec.js`:
   - Assert `orbitRingMat.depthTest === true` and `depthWrite === false`.
   - Assert `orbitRing.position.z === 0` (centered at medallion origin, not forced forward to z=0.08).
   - Assert particle sizes on points materials are scaled up (> 0.8 for rings/conduit, > 0.4 for dust).
   - Assert medallion backing disc mesh has `depthWrite === true` and `depthTest === true`.
   - Assert light mode palette provides high-contrast particle colors and proper alpha values.
   - Assert experience canvas initializes cleanly without WebGL errors.
  </action>
  <verify>
Run `npx playwright test tests/experience-canvas-polish.spec.js --project=chromium` to ensure test scaffold executes.
  </verify>
  <acceptance_criteria>
    - `tests/experience-canvas-polish.spec.js` exists and encodes all Phase 11 checks
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Scale Up Particle Sizes & Refine Light Mode Palette</name>
  <files>src/js/experience-canvas.js</files>
  <read_first>src/js/experience-canvas.js</read_first>
  <action>
1. In `src/js/experience-canvas.js`:
   - Enlarge particle texture resolution in `createParticleTexture()` with a brighter, well-defined core and smooth radial gradient.
   - Scale up particle point sizes:
     - `ringMat.size`: Increase from `0.46` to `1.15`.
     - `orbitRingMat.size`: Increase from `0.52` to `1.35`.
     - `beamCoreMat.size`: Increase from `0.48` to `1.10`.
     - `beamFlowMat.size`: Increase from `0.68` to `1.50`.
     - `dustMat.size`: Increase from `0.18` to `0.50`.
   - In `PALETTES.light`:
     - Boost activeAmber to saturated deep tungsten `#B45309` / `#C2410C`.
     - Boost conduit to `#B45309`.
     - Boost dustCyan to `#0E7490` and dustBlue to `#1D4ED8`.
     - Increase `ringActiveOpacity` to `1.0` and `ringInactiveOpacity` to `0.95`.
     - Increase `orbitRingActiveOpacity` to `1.0` and `orbitRingInactiveOpacity` to `0.90`.
     - Ensure `glowBlending` and `ringBlending` in light mode provide rich, punchy, distinguishable particle dots.
  </action>
  <verify>
Inspect `experience-canvas.js` and verify particle point sizes and light mode palette values.
  </verify>
  <acceptance_criteria>
    - Orbit ring particles, rim particles, conduit particles, and dust are visibly enlarged.
    - Light mode particle colors provide strong, easily distinguishable contrast.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Implement True Z-Axis Occlusion & Rear Particle Fading</name>
  <files>src/js/experience-canvas.js</files>
  <read_first>src/js/experience-canvas.js</read_first>
  <action>
1. In `src/js/experience-canvas.js`:
   - Fix `orbitRing` setup:
     - Change `orbitRing.position.z = 0.08` to `orbitRing.position.z = 0.0`.
     - Change `orbitRingMat.depthTest = false` to `orbitRingMat.depthTest = true`.
     - Remove `orbitRing.renderOrder = 20`. Set `orbitRing.renderOrder = 4`.
   - Fix medallion backing disc and logo face:
     - `backMesh`: `position.z = 0.0`, `renderOrder = 1`, `material.depthTest = true`, `material.depthWrite = true`.
     - `logoMesh`: `position.z = 0.065`, `renderOrder = 3`, `material.depthTest = true`, `material.depthWrite = true`.
   - Implement dynamic rear particle attenuation / occlusion:
     - In `createCircleParticleGeo(radius, count, radialThickness)` or via custom vertex shader / dynamic buffer update:
     - Ensure particles whose local transformed Z position is < 0 (behind the medallion face) are occluded by the solid backing disc.
     - To ensure seamless occlusion even at grazing angles, customize or compute particle alpha/depth so that as particles swing into negative Z (behind the medallion), their opacity drops to 0, ensuring they are completely invisible while behind the logo.
  </action>
  <verify>
Run `npx playwright test tests/experience-canvas-polish.spec.js --project=chromium` and test visual rendering in dev server.
  </verify>
  <acceptance_criteria>
    - Orbit ring particles revolving along the Z-axis become invisible when passing behind the company logo.
    - Foreground particles (z > 0) render cleanly in front of the logo with celestial glow.
    - 60fps maintained on desktop canvas.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 4: Verification & Performance Audit</name>
  <files>tests/experience-canvas-polish.spec.js</files>
  <read_first>tests/experience-canvas-polish.spec.js</read_first>
  <action>
1. Execute full test suite: `npx playwright test tests/experience-canvas-polish.spec.js --project=chromium`.
2. Verify production build: `npm run build` succeeds without bundle or syntax warnings.
3. Update `.planning/phases/11-experience-3d-canvas-polish-particle-occlusion/01-SUMMARY.md` documenting deliverables, commits, and verified status.
  </action>
  <verify>
All tests pass; `npm run build` exits 0.
  </verify>
  <acceptance_criteria>
    - Playwright tests pass 100%.
    - `npm run build` exits 0.
  </acceptance_criteria>
</task>

</tasks>
