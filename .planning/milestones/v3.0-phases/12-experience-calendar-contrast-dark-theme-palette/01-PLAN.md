---
phase: 12-experience-calendar-contrast-dark-theme-palette
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/experience.css
  - src/js/experience.js
  - tests/experience-calendar-contrast.spec.js
autonomous: true
requirements:
  - CAL-01
  - CAL-02
user_setup: []
must_haves:
  truths:
    - "D-01: Borderless Month Matrix (CAL-01) - Month cells have zero borders across all states (empty, active, future, light, dark), forming a clean modern mosaic"
    - "D-02: Rich Dark Thematic Color Palette (CAL-02) - All active company month cells utilize deep, sophisticated dark jewel/obsidian tones (deep navy, petrol, forest, violet, garnet) replacing discordant light pastel fills"
    - "D-03: High-Contrast Brand Typography & Emblems (CAL-02) - Month abbreviations and company logos display with sharp contrast and drop shadows against the dark tiles"
  artifacts:
    - src/styles/experience.css
    - src/js/experience.js
    - tests/experience-calendar-contrast.spec.js
  key_links:
    - "src/styles/experience.css defines calendar matrix borders, background colors, and hover transitions"
    - "src/js/experience.js renders month cells, binds navigation clicks, and chooses crisp contrasting logos"
    - "tests/experience-calendar-contrast.spec.js verifies borderless styling, dark palettes, and navigation"
---

<objective>
Execute Phase 12: Experience Calendar Contrast & Dark Theme Palette.
Deliver a modern borderless month grid (CAL-01), replace weird light pastel fills with rich dark jewel/obsidian tones matching the Structured Intensity design system (CAL-02), and ensure high-contrast typography and crisp company logos.
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Playwright Test Suite for Calendar Borderless Matrix & Dark Theme Palette (Wave 0)</name>
  <files>tests/experience-calendar-contrast.spec.js</files>
  <read_first>.planning/phases/12-experience-calendar-contrast-dark-theme-palette/12-CONTEXT.md, src/styles/experience.css</read_first>
  <action>
1. Create `tests/experience-calendar-contrast.spec.js`:
   - Open experience calendar modal via `#experience-detail-period-btn`.
   - Assert `.timeline-month-cell` elements have border-width 0px / `border-style: none`.
   - Assert `.timeline-month-cell.theme-iqvia`, `.theme-revolut`, `.theme-ketto`, `.theme-kalam-labs`, `.theme-faoud` have dark background colors (luminance < 0.35) in both dark and light modes, avoiding light pastel colors.
   - Assert month abbreviations (`.timeline-month-abbr`) have high contrast against the cell background.
   - Assert clicking an active company month cell still triggers `navigateToIndex` and updates `#experience-detail`.
  </action>
  <verify>
Run `npx playwright test tests/experience-calendar-contrast.spec.js --project=chromium` to ensure test executes.
  </verify>
  <acceptance_criteria>
    - `tests/experience-calendar-contrast.spec.js` exists and encodes all Phase 12 requirements
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Strip Month Cell Borders & Install Dark Theme Color Palette in CSS</name>
  <files>src/styles/experience.css</files>
  <read_first>src/styles/experience.css</read_first>
  <action>
1. In `src/styles/experience.css`:
   - On `.timeline-month-cell`:
     - Set `border: none;`.
     - Remove `border-left` on `.is-strategy` and `.is-product`.
     - Set `border-radius: 6px`.
   - Update dark mode company theme colors to deep, rich, saturated obsidian/jewel tones:
     - `theme-iqvia`: `background-color: #0F2752;`
     - `theme-revolut`: `background-color: #083344;`
     - `theme-ketto`: `background-color: #064E3B;`
     - `theme-kalam-labs`: `background-color: #2E1065;`
     - `theme-faoud`: `background-color: #5B1818;`
     - Remove all `border-color` declarations.
   - Update `html[data-theme="light"]` calendar overrides:
     - Remove all pastel backgrounds (`#DBEAFE`, `#CFFAFE`, `#D1FAE5`, `#EDE9FE`, `#FEE2E2`).
     - In light mode, keep the active company month cells as dark, rich, sophisticated tiles (`#0F2752`, `#083344`, `#064E3B`, `#2E1065`, `#5B1818`) with `border: none`.
     - Set empty month cells in light mode to `background-color: rgba(15, 23, 42, 0.05); border: none;`.
     - Ensure text abbreviations (`.timeline-month-abbr`) on dark tiles remain crisp off-white (`#F8FAFC`) with subtle opacity.
  </action>
  <verify>
Inspect `experience.css` rules for `.timeline-month-cell` and light/dark theme blocks.
  </verify>
  <acceptance_criteria>
    - No border lines exist on month cells.
    - Active month cells use rich dark colors in both dark and light modes.
    - No pastel/light fills remain.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Ensure Crisp White/Contrasting Logos on Dark Calendar Tiles</name>
  <files>src/js/experience.js</files>
  <read_first>src/js/experience.js</read_first>
  <action>
1. In `src/js/experience.js` (`renderCalendarGrid`):
   - When rendering `timeline-month-logo` inside active cells (`isActive && expData`), use `expData.logoDark || expData.logo` so that the crisp white logo variant (such as Revolut white logo) is always displayed on the dark tile, even when the page is in light mode.
   - Add a subtle drop-shadow to `.timeline-month-logo` for clean separation.
  </action>
  <verify>
Verify `renderCalendarGrid` in `src/js/experience.js`.
  </verify>
  <acceptance_criteria>
    - Logos on dark calendar cells are crisp, light, and 100% visible.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 4: Verification & Regression Audit</name>
  <files>tests/experience-calendar-contrast.spec.js</files>
  <read_first>tests/experience-calendar-contrast.spec.js</read_first>
  <action>
1. Execute full test suite: `npx playwright test tests/experience-calendar-contrast.spec.js --project=chromium`.
2. Run existing experience tests: `npx playwright test tests/experience.spec.js --project=chromium`.
3. Verify production build: `npm run build` succeeds cleanly.
4. Create `.planning/phases/12-experience-calendar-contrast-dark-theme-palette/01-SUMMARY.md` documenting deliverables and verified status.
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
