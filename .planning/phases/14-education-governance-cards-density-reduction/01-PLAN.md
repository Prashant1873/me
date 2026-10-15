---
phase: 14-education-governance-cards-density-reduction
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/js/education-data.js
  - src/js/education.js
  - src/styles/education.css
  - tests/education-governance-density.spec.js
autonomous: true
requirements:
  - EDU-06
user_setup: []
must_haves:
  truths:
    - "D-01: Metric-First Punchy Bullets (EDU-06) - Abhyuday and Placement Cell cards contain concise, highlighted metrics (₹10M+ budget, 50k+ footfall, 2k+ students, 40+ recruiters) without redundant prose"
    - "D-02: Instant Scannability - Key figures stand out in high-contrast bold accent text, scannable in < 5 seconds"
    - "D-03: Layout & Hierarchy Integrity - Cards align neatly within the 3-pillar education layout in both dark and light modes"
  artifacts:
    - src/js/education-data.js
    - src/js/education.js
    - src/styles/education.css
    - tests/education-governance-density.spec.js
  key_links:
    - "src/js/education-data.js defines GOVERNANCE data array"
    - "src/js/education.js renders .governance-entry and its metric elements"
    - "tests/education-governance-density.spec.js verifies text density and key number visibility"
---

<objective>
Execute Phase 14: Education & Governance Cards Density Reduction.
Streamline Abhyuday and Placement Cell cards by stripping verbose filler, emphasizing highlighted key metrics, and optimizing visual scannability (EDU-06).
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Playwright Test Suite for Governance Density & Metrics</name>
  <files>tests/education-governance-density.spec.js</files>
  <read_first>.planning/phases/14-education-governance-cards-density-reduction/14-CONTEXT.md, src/js/education-data.js</read_first>
  <action>
1. Create `tests/education-governance-density.spec.js`:
   - Navigate to `#education`.
   - Verify both Abhyuday and Placement Cell entries exist within `.education-card--governance`.
   - Assert key numbers are highlighted with strong/emphasis or metric badges:
     - Abhyuday: '₹10M+', '150+', '50,000+' (or '50k+'), '₹20M+'.
     - Placement Cell: '2,000+' (or '2k+'), '40+', '16-week'.
   - Assert total character count of bullet points is compact (< 250 characters per card), avoiding text walls.
   - Verify dark and light mode rendering and contrast.
  </action>
  <verify>
Run `npx playwright test tests/education-governance-density.spec.js --project=chromium`.
  </verify>
  <acceptance_criteria>
    - Test file exists and verifies metric highlights and low text density.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Refactor GOVERNANCE Data in education-data.js</name>
  <files>src/js/education-data.js</files>
  <read_first>src/js/education-data.js</read_first>
  <action>
1. In `src/js/education-data.js`, streamline `GOVERNANCE`:
   - For Abhyuday:
     - Keep clean metadata: `id: 'abhyuday'`, `title: 'Operations & Marketing Head'`, `organization: 'Abhyuday, IIT Bombay'`, `timeline: '2024 - 2025'`.
     - Update `impactBullets` to punchy metric-first lines with `<strong>` tags on key figures:
       - `<strong>₹10M+</strong> budget & <strong>150+</strong> team across nationwide campaigns`
       - `<strong>50,000+</strong> footfall at flagship conclave & <strong>₹20M+</strong> raised for startups`
     - Keep concise `metricTag`: `₹10M+ Budget // 50k+ Footfall`.
   - For Placement Cell:
     - Keep clean metadata: `id: 'placement-cell'`, `title: 'Department Placement Coordinator'`, `organization: 'Placement Cell, IIT Bombay'`, `timeline: '2025 - 2026'`.
     - Update `impactBullets` to punchy metric-first lines with `<strong>` tags on key figures:
       - `<strong>2,000+</strong> candidates placed across <strong>40+</strong> global tier-1 recruiters`
       - `<strong>16-week</strong> industry bootcamp spanning quant, strategy & tech`
     - Keep concise `metricTag`: `2,000+ Students // 40+ Recruiters`.
  </action>
  <verify>
Inspect `src/js/education-data.js` GOVERNANCE definition.
  </verify>
  <acceptance_criteria>
    - Bullets contain only high-impact accomplishments with highlighted figures.
    - Redundant text walls eliminated.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Polish Governance Card Styling & Metric Highlights</name>
  <files>src/styles/education.css, src/js/education.js</files>
  <read_first>src/styles/education.css, src/js/education.js</read_first>
  <action>
1. In `src/styles/education.css`:
   - Style `.governance-bullets strong`:
     - Font weight 700, `color: var(--accent-primary)`, `font-family: var(--font-technical)`.
     - In light mode: ensure high-contrast blue/slate.
   - Adjust `.governance-bullets`:
     - Tight spacing `gap: 4px`, clean line-height `1.35`.
   - Adjust `.governance-entry`:
     - Clean padding and subtle hover elevation.
  </action>
  <verify>
Check styling of governance entries and ensure seamless integration with pillar cards.
  </verify>
  <acceptance_criteria>
    - Highlighted numbers pop with accent color and technical font styling.
    - Card looks clean, balanced, and scannable in < 5 seconds.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 4: Verification & Regression Audit</name>
  <files>tests/education-governance-density.spec.js</files>
  <read_first>tests/education-governance-density.spec.js</read_first>
  <action>
1. Run Playwright test suite: `npx playwright test tests/education-governance-density.spec.js --project=chromium`.
2. Run existing education tests: `npx playwright test tests/education-contact.spec.js --project=chromium`.
3. Verify production build: `npm run build` exits 0.
4. Create `.planning/phases/14-education-governance-cards-density-reduction/01-SUMMARY.md` documenting deliverables.
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
