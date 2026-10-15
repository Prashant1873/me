---
phase: 16-global-section-heading-vertical-alignment
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/design-system.css
  - src/styles/sections.css
  - src/styles/experience.css
  - src/styles/projects.css
  - src/styles/education.css
  - src/styles/contact.css
  - tests/global-heading-alignment.spec.js
autonomous: true
requirements:
  - LAYOUT-01
user_setup: []
must_haves:
  truths:
    - "D-01: Global Heading Y-Coordinate Uniformity (LAYOUT-01) - Section titles and tags across Hero, Experience, Projects, Education, and Contact share the exact same top Y-offset from the viewport top"
    - "D-02: Consistent Breathing Room Below Nav - Balanced top padding (calc(64px + clamp(12px, 1.8vh, 22px))) avoids navbar collisions and establishes rhythm"
    - "D-03: Zero Heading Jumping on Page Transitions - Switching sections preserves stationary heading anchor line"
  artifacts:
    - src/styles/design-system.css
    - src/styles/sections.css
    - src/styles/experience.css
    - src/styles/projects.css
    - src/styles/education.css
    - src/styles/contact.css
    - tests/global-heading-alignment.spec.js
  key_links:
    - "src/styles/design-system.css defines --section-padding-top token"
    - "src/styles/sections.css applies token to base sections and Hero"
    - "tests/global-heading-alignment.spec.js asserts identical tag and title offsets across all 5 sections"
---

<objective>
Execute Phase 16: Global Section Heading Vertical Alignment.
Standardize top padding, header offsets, and grid margins so that all section headings share the exact same vertical Y-coordinate with consistent top breathing room (LAYOUT-01).
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Playwright Test Suite for Global Heading Alignment (Wave 0)</name>
  <files>tests/global-heading-alignment.spec.js</files>
  <read_first>.planning/phases/16-global-section-heading-vertical-alignment/16-CONTEXT.md</read_first>
  <action>
1. Create `tests/global-heading-alignment.spec.js`:
   - Set viewport to 1440x900.
   - Measure relative vertical offset `(tagBox.y - sectionBox.y)` for `.section-tag` in each section (`#hero`, `#experience`, `#projects`, `#education`, `#contact`):
     - Assert maximum difference across all 5 sections is <= 1.5px (pixel-perfect alignment).
   - Measure relative vertical offset `(titleBox.y - sectionBox.y)` for `.section__title` across the 4 content sections (`#experience`, `#projects`, `#education`, `#contact`):
     - Assert maximum difference across all 4 sections is <= 1.5px.
   - Assert top breathing room from viewport top is >= 76px and <= 100px.
   - Repeat check at 1280x720.
  </action>
  <verify>
Run `npx playwright test tests/global-heading-alignment.spec.js --project=chromium`.
  </verify>
  <acceptance_criteria>
    - Test validates identical relative Y-offsets across sections.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Codify --section-padding-top Token in design-system.css</name>
  <files>src/styles/design-system.css</files>
  <read_first>src/styles/design-system.css</read_first>
  <action>
1. In `src/styles/design-system.css`:
   - Add `--section-padding-top: calc(64px + clamp(12px, 1.8vh, 22px));` under layout tokens.
   - Add `--section-header-mb: clamp(4px, 0.8vh, 10px);`.
  </action>
  <verify>
Check variables in `src/styles/design-system.css`.
  </verify>
  <acceptance_criteria>
    - Variables defined in `:root`.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Unify Section Padding and Header Margins Across All Stylesheets</name>
  <files>src/styles/sections.css, src/styles/experience.css, src/styles/projects.css, src/styles/education.css, src/styles/contact.css</files>
  <read_first>src/styles/sections.css, src/styles/experience.css, src/styles/projects.css, src/styles/education.css, src/styles/contact.css</read_first>
  <action>
1. In `src/styles/sections.css`:
   - In `.section`, set `padding-top: var(--section-padding-top);`.
   - In `.section--hero`, set `padding-top: var(--section-padding-top); align-items: stretch; justify-content: flex-start;`.
   - In `.hero__content .section-tag`, set `margin-bottom: clamp(2px, 0.4vh, 4px); margin-top: 0;`.
   - In `.section__header`, set `margin-top: 0; margin-bottom: var(--section-header-mb);`.
   - In `.section__header .section-tag`, set `margin-top: 0; margin-bottom: clamp(2px, 0.4vh, 4px);`.
   - In `.section__title`, set `margin-top: 2px; margin-bottom: clamp(2px, 0.5vh, 4px); line-height: 1.15;`.
2. In `src/styles/experience.css`:
   - Set `.section--experience { padding-top: var(--section-padding-top); }`.
   - Set `.section--experience .section__header { margin-top: 0; margin-bottom: var(--section-header-mb); }`.
3. In `src/styles/projects.css`:
   - Set `.section--projects { padding-top: var(--section-padding-top); }`.
   - Set `.section--projects .section__header { margin-top: 0; margin-bottom: var(--section-header-mb); }`.
4. In `src/styles/education.css`:
   - Set `.section--education { padding-top: var(--section-padding-top); }`.
   - Set `.section--education .section__header { margin-top: 0; margin-bottom: var(--section-header-mb); }`.
5. In `src/styles/contact.css`:
   - Set `.section--contact { padding-top: var(--section-padding-top); }`.
   - Set `.section--contact .section__header { margin-top: 0; margin-bottom: var(--section-header-mb); }`.
   - In `.section--contact .grid-container`, set `justify-content: flex-start; margin-block: 0;`.
  </action>
  <verify>
Inspect all 5 CSS files to ensure `padding-top: var(--section-padding-top);` and identical header offsets are applied.
  </verify>
  <acceptance_criteria>
    - All sections use `--section-padding-top`.
    - No rogue margins or auto centering push headers off the anchor line.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 4: Verification & Full Regression Audit</name>
  <files>tests/global-heading-alignment.spec.js</files>
  <read_first>tests/global-heading-alignment.spec.js</read_first>
  <action>
1. Run Playwright test suite: `npx playwright test tests/global-heading-alignment.spec.js --project=chromium`.
2. Run regression tests across all key suites (`tests/experience.spec.js`, `tests/projects.spec.js`, `tests/education-contact.spec.js`).
3. Verify production build: `npm run build` exits 0.
4. Create `.planning/phases/16-global-section-heading-vertical-alignment/01-SUMMARY.md` documenting deliverables.
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
