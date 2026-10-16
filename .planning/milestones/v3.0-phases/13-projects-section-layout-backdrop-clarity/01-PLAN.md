---
phase: 13-projects-section-layout-backdrop-clarity
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/projects.css
  - tests/projects-backdrop-layout.spec.js
autonomous: true
requirements:
  - PROJ-08
  - PROJ-09
user_setup: []
must_haves:
  truths:
    - "D-01: Calibrated Backdrop Blur & Screenshot Preview (PROJ-08) - Product screenshots behind cards are clearly identifiable with subtle blur (<= 3px) and translucent scrim rather than impenetrable 14px fog"
    - "D-02: Vertical Centering & Compact Row Spacing (PROJ-09) - All 6 cards are vertically centered on the page with a uniform, compact gap between row 1 and row 2, eliminating awkward empty gaps"
    - "D-03: Modal Cockpit Functionality Preserved - Click-to-expand modal, slideshow controls, and case study interactions remain 100% operational"
  artifacts:
    - src/styles/projects.css
    - tests/projects-backdrop-layout.spec.js
  key_links:
    - "src/styles/projects.css defines .section--projects, .projects-grid, .project-card, and .project-card__backdrop"
    - "tests/projects-backdrop-layout.spec.js verifies blur values, row gaps, vertical centering, and modal launch"
---

<objective>
Execute Phase 13: Projects Section Layout & Backdrop Clarity.
Deliver identifiable product screenshot previews by reducing blur and opacity (PROJ-08), and vertically center all 6 project cards with uniform row and column spacing (PROJ-09).
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Playwright Test Suite for Projects Backdrop & Centered Layout (Wave 0)</name>
  <files>tests/projects-backdrop-layout.spec.js</files>
  <read_first>.planning/phases/13-projects-section-layout-backdrop-clarity/13-CONTEXT.md, src/styles/projects.css</read_first>
  <action>
1. Create `tests/projects-backdrop-layout.spec.js`:
   - Navigate to `#projects`.
   - Measure computed `backdrop-filter` or blur on `.project-card__backdrop`: assert blur radius is <= 4px.
   - Measure vertical distance between bottom of Card 0 (Row 1) and top of Card 3 (Row 2): assert gap is <= 36px (cohesive, not an empty chasm).
   - Verify all 6 project cards are visible within the viewport.
   - Click Card 0 (BickerBape) and assert the modal expands with `.is-open`.
   - Close modal via Escape and assert modal closes.
  </action>
  <verify>
Run `npx playwright test tests/projects-backdrop-layout.spec.js --project=chromium`.
  </verify>
  <acceptance_criteria>
    - `tests/projects-backdrop-layout.spec.js` exists and encodes all Phase 13 requirements
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Calibrate Backdrop Blur, Scrim Opacity & Image Brightness</name>
  <files>src/styles/projects.css</files>
  <read_first>src/styles/projects.css</read_first>
  <action>
1. In `src/styles/projects.css`:
   - On `.project-card__backdrop`:
     - Reduce `backdrop-filter: blur(14px)` to `backdrop-filter: blur(2.5px); -webkit-backdrop-filter: blur(2.5px);`.
     - Calibrate dark background gradient to `linear-gradient(135deg, rgba(8, 12, 22, 0.42) 0%, rgba(10, 16, 32, 0.62) 100%)`.
     - Calibrate dark hover gradient to `linear-gradient(135deg, rgba(8, 12, 22, 0.25) 0%, rgba(10, 16, 32, 0.45) 100%)` with `blur(1.5px)`.
     - In `[data-theme="light"] .project-card__backdrop`, calibrate light gradient to `linear-gradient(135deg, rgba(255, 255, 255, 0.52) 0%, rgba(248, 250, 252, 0.72) 100%)`.
     - In light hover, calibrate to `linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(248, 250, 252, 0.55) 100%)` with `blur(1.5px)`.
   - On `.project-card__bg-img`:
     - Set `filter: brightness(0.85) saturate(1.15) contrast(1.05);`.
     - In light mode, set `filter: brightness(0.96) saturate(1.1) contrast(1.02);`.
   - On `.project-card__title` and `.project-card__desc`:
     - Add clean text-shadows for high legibility over screenshot details in both dark and light modes.
  </action>
  <verify>
Inspect `projects.css` rules for `.project-card__backdrop` and `.project-card__bg-img`.
  </verify>
  <acceptance_criteria>
    - Backdrop blur is reduced to 2.5px.
    - Screenshot graphics and UI are identifiable through the scrim.
    - Text maintains strong contrast and legibility.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Refactor Grid for Vertical Centering and Compact Row Gap</name>
  <files>src/styles/projects.css</files>
  <read_first>src/styles/projects.css</read_first>
  <action>
1. In `src/styles/projects.css`:
   - In `.section--projects .grid-container > .col-span-12:not(.section__header)`:
     - Set `justify-content: center; align-items: center;`.
   - In `.projects-grid`:
     - Change `grid-template-rows: repeat(2, 1fr)` to `grid-template-rows: repeat(2, auto)`.
     - Set `gap: clamp(14px, 1.8vw, 24px)`.
     - Set `margin: auto 0; max-width: 1400px;`.
   - On `.project-card`:
     - Update card height from `clamp(140px, 20vh, 180px)` to `clamp(160px, 22vh, 210px)` for rich screenshot showcase without overflowing viewport.
  </action>
  <verify>
Measure computed element bounds and verify all 6 cards are vertically centered with uniform row and column spacing.
  </verify>
  <acceptance_criteria>
    - Gap between row 1 and row 2 is identical to column gap (`clamp(14px, 1.8vw, 24px)`).
    - Entire 2x3 block is vertically centered in the section.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 4: Verification & Regression Audit</name>
  <files>tests/projects-backdrop-layout.spec.js</files>
  <read_first>tests/projects-backdrop-layout.spec.js</read_first>
  <action>
1. Run Playwright test suite: `npx playwright test tests/projects-backdrop-layout.spec.js --project=chromium`.
2. Run existing projects tests: `npx playwright test tests/projects.spec.js --project=chromium`.
3. Verify production build: `npm run build` exits 0.
4. Create `.planning/phases/13-projects-section-layout-backdrop-clarity/01-SUMMARY.md` documenting deliverables.
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
