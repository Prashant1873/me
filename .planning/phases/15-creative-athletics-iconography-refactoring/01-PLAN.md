---
phase: 15-creative-athletics-iconography-refactoring
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/js/education.js
  - src/styles/education.css
  - tests/creative-iconography.spec.js
autonomous: true
requirements:
  - CREAT-01
user_setup: []
must_haves:
  truths:
    - "D-01: Zero Emoji Characters (CREAT-01) - 🎭, 🎙️, 🏑, and 🥇 are completely eradicated from the Creative & Athletics pillar and medal badges"
    - "D-02: Bespoke Vector SVG Iconography - Stage, Speaking, Athletics, and Gold Medals render crisp vector SVGs"
    - "D-03: Multi-Theme Consistency - SVGs scale cleanly (16x16 / 12x12) and adapt gracefully to dark and light modes with proper stroke and fill"
  artifacts:
    - src/js/education.js
    - src/styles/education.css
    - tests/creative-iconography.spec.js
  key_links:
    - "src/js/education.js renders .creative-entry__icon and .creative-badge--gold"
    - "src/styles/education.css styles .creative-svg-icon and .medal-svg"
    - "tests/creative-iconography.spec.js asserts absence of emojis and presence of SVG icons"
---

<objective>
Execute Phase 15: Creative & Athletics Iconography Refactoring.
Eradicate all informal emojis from the Creative & Athletics section and replace them with bespoke, razor-sharp vector SVG icons (CREAT-01).
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Playwright Test Suite for Vector Iconography (Wave 0)</name>
  <files>tests/creative-iconography.spec.js</files>
  <read_first>.planning/phases/15-creative-athletics-iconography-refactoring/15-CONTEXT.md, src/js/education.js</read_first>
  <action>
1. Create `tests/creative-iconography.spec.js`:
   - Navigate to `#education`.
   - Inspect `.education-card--creative`.
   - Verify that NO emojis (`🎭`, `🎙️`, `🏑`, `🥇`, or any character in `[\u{1F300}-\u{1F9FF}]`) exist in the text content of `.education-card--creative`.
   - Verify that 3 `.creative-svg-icon` elements exist for Stage, Speaking, and Athletics entries.
   - Verify that `.creative-badge--gold` contains SVG medal icons (`.medal-svg`), not emoji text.
   - Verify dark and light mode rendering and SVG stroke colors.
  </action>
  <verify>
Run `npx playwright test tests/creative-iconography.spec.js --project=chromium`.
  </verify>
  <acceptance_criteria>
    - Test verifies zero emojis and validates SVG vector elements.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Replace Emojis with Vector SVGs in education.js</name>
  <files>src/js/education.js</files>
  <read_first>src/js/education.js</read_first>
  <action>
1. In `src/js/education.js`:
   - Refactor `getCategoryIcon(id)`:
     - Return inline SVG for `'stage-dramatics'` (theatrical drama mask vector).
     - Return inline SVG for `'speaking-comedy'` (microphone vector).
     - Return inline SVG for `'athletics'` (athletic trophy vector).
     - Default: return inline spark SVG.
   - In `.creative-badge--gold`:
     - Replace `<span class="medal-icon">🥇</span>` with `<svg class="medal-svg" width="12" height="12" ...>...</svg>`.
  </action>
  <verify>
Inspect `src/js/education.js` and verify zero emoji characters remain.
  </verify>
  <acceptance_criteria>
    - No emoji characters exist in `src/js/education.js`.
    - Clean SVGs are rendered in their place.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Refactor CSS Styling for Creative SVGs</name>
  <files>src/styles/education.css</files>
  <read_first>src/styles/education.css</read_first>
  <action>
1. In `src/styles/education.css`:
   - Style `.creative-svg-icon`:
     - `width: 16px; height: 16px; display: inline-block; vertical-align: middle; stroke: var(--accent-warm); fill: none; flex-shrink: 0;`
   - Style `.medal-svg`:
     - `width: 12px; height: 12px; display: inline-block; vertical-align: middle; stroke: currentColor; fill: none; flex-shrink: 0;`
   - Adjust `.creative-entry__icon` container:
     - `display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 6px; background: rgba(232, 101, 90, 0.1); border: 1px solid rgba(232, 101, 90, 0.2);`
   - Ensure clean appearance in both dark and light modes.
  </action>
  <verify>
Check element styling and verify alignment.
  </verify>
  <acceptance_criteria>
    - SVGs look crisp, vertically aligned, and styled in both themes.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 4: Verification & Regression Audit</name>
  <files>tests/creative-iconography.spec.js</files>
  <read_first>tests/creative-iconography.spec.js</read_first>
  <action>
1. Run Playwright test suite: `npx playwright test tests/creative-iconography.spec.js --project=chromium`.
2. Run existing education tests: `npx playwright test tests/education-contact.spec.js --project=chromium --workers=1`.
3. Verify production build: `npm run build` exits 0.
4. Create `.planning/phases/15-creative-athletics-iconography-refactoring/01-SUMMARY.md` documenting deliverables.
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
