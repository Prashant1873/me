---
phase: 07-education-contact-sections
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/js/education-data.js
  - src/js/contact-data.js
  - src/js/education.js
  - src/js/contact.js
  - src/styles/education.css
  - src/styles/contact.css
  - src/styles/index.css
  - src/js/main.js
  - index.html
  - tests/education-contact.spec.js
autonomous: true
requirements:
  - EDU-01
  - EDU-02
  - EDU-03
  - EDU-04
  - EDU-05
  - CONT-01
  - CONT-02
  - CONT-03
  - CONT-04
  - CONT-05
  - CONT-06
user_setup: []
must_haves:
  truths:
    - "D-01: Triple-Pillar Education Showcase - Academics (IIT Bombay B.Tech, CMS 98.25% Gold, St. Francis 98% Gold), Campus Governance (Abhyuday & Placement Cell), and Creative Stage/Sports honours rendered in unified modular cards"
    - "D-02: Categorized Interactive Skills Matrix - Strategy & Product, Data Analytics, and Automation/AI rendered in responsive micro-pills with hover states"
    - "D-03: Instant Contact Channels - Direct interactive action cards for LinkedIn, GitHub, Email (with copy feedback), and Phone"
    - "D-04: Authentic Resume Delivery - One-click resume download/view CTA wired directly to authentic resume artifact"
    - "D-05: Expressive Newsreader Editorial Statement - Closing quote reflecting engineering rigor meets behavioral empathy"
    - "D-06: Strict 100vh Viewport Containment - Both #education and #contact fit cleanly within 100vh on 1440x900 and 1280x720 laptops without overflow"
    - "D-07: Harmonized Section Headers - Identical typography tokens (--text-section, --text-section-sub, --tracking-wider) across both sections"
  artifacts:
    - src/js/education-data.js
    - src/js/contact-data.js
    - src/js/education.js
    - src/js/contact.js
    - src/styles/education.css
    - src/styles/contact.css
    - tests/education-contact.spec.js
  key_links:
    - "src/js/main.js imports and initializes initEducation() and initContact()"
    - "src/styles/index.css imports ./education.css and ./contact.css"
    - "index.html defines #education and #contact container elements"
---

<objective>
Build the complete Education Section (#education) and Contact Section (#contact) with integrated footer, delivering authentic IIT Bombay academic credentials, campus governance, performing arts honors, skills matrix, contact channels, resume download, and Newsreader editorial statement. Delivers requirements EDU-01 through EDU-05 and CONT-01 through CONT-06.
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Authentic Data Models & Playwright Wave 0 Test Suite</name>
  <files>src/js/education-data.js, src/js/contact-data.js, tests/education-contact.spec.js</files>
  <read_first>Prashant_Shukla_Resume_IITB.txt, .planning/REQUIREMENTS.md</read_first>
  <action>
1. Create `src/js/education-data.js` exporting:
   - `ACADEMICS`:
     - IIT Bombay: B.Tech Aerospace Engineering (2022–2026), logo: `/images/logos/Indian_Institute_of_Technology_Bombay_Logo.svg.webp`, details: Flight mechanics, aerodynamics, autonomous control.
     - City Montessori School (CMS), Lucknow: ISC Examination Class 12, Gold Medal 98.25%, logo: `/images/logos/cms.png`.
     - St. Francis' College, Lucknow: ICSE Examination Class 10, Gold Medal 98.00%, logo: `/images/logos/St._Francis_Lucknow.png`.
   - `GOVERNANCE`:
     - Abhyuday, IIT Bombay: Operations & Marketing Head (2024–2025). Metrics: Reach: 7M+, Budget: ₹10M+, UNICEF/PETA patronages, Advitya 50K+ footfall, ₹20M+ venture funding.
     - Placement Cell, IIT Bombay: Department Placement Coordinator (2025–2026). Facilitating recruitment for 2,000+ students, 65+ coordinators, 40+ recruiters.
   - `EXTRACURRICULARS`:
     - Dramatics: Writer & Director - 2024 & 2025 Gold Medal at Inter IIT Cultural Meet; 2023–2025 Triple Gold at Inter-Hostel Dramatics.
     - Speaking: Stand-up comedy Annual Showcase (2023); Hosted Abhyuday CSR+ESG Conclave.
     - Athletics: Winner, Freshiesta Basketball League (2023); Captain, Mixed Hockey Championship Team (2024).
   - `SKILLS`:
     - Categorized into Strategy & Product, Data Analytics, and Automation & AI.
2. Create `src/js/contact-data.js` exporting:
   - `CONTACT_CHANNELS`:
     - LinkedIn: `https://www.linkedin.com/in/prashantmanishukla`, label: `LinkedIn`, handle: `/in/prashantmanishukla`
     - GitHub: `https://github.com/Prashant1873`, label: `GitHub`, handle: `@Prashant1873`
     - Email: `shuklaprashant847@gmail.com`, label: `Email`
     - Phone: `+91-9696721493`, label: `Phone`
   - `EDITORIAL_STATEMENT`: *"Engineering rigor meets behavioral empathy - building systems that outlast their creators and products people genuinely love."*
   - `RESUME_URL`: Link to downloadable resume asset.
3. Create `tests/education-contact.spec.js` asserting all 11 requirements:
   - EDU-01: IIT Bombay Aerospace Engineering and crest visible.
   - EDU-02: CMS (98.25%) and St. Francis (98%) Gold Medal achievements visible.
   - EDU-03: Dramatics gold medals, speaking, and sports achievements visible.
   - EDU-04: Categorized skills pills visible and rendered with correct tags.
   - EDU-05: Education section typography conforms to `--text-section` and Structured Intensity tokens.
   - CONT-01 to CONT-04: LinkedIn, GitHub, Email, Phone links are functional and visible.
   - CONT-05: Resume download button present and functional.
   - CONT-06: Newsreader editorial closing quote rendered with correct styling.
  </action>
  <verify>
Run `node -e "import('./src/js/education-data.js').then(e => import('./src/js/contact-data.js')).then(() => console.log('Data models verified!'))"` to ensure clean syntax.
  </verify>
  <acceptance_criteria>
    - `src/js/education-data.js` exports `ACADEMICS`, `GOVERNANCE`, `EXTRACURRICULARS`, `SKILLS`
    - `src/js/contact-data.js` exports `CONTACT_CHANNELS`, `EDITORIAL_STATEMENT`, `RESUME_URL`
    - `tests/education-contact.spec.js` exists and encodes all EDU-01 to EDU-05 and CONT-01 to CONT-06 assertions
  </acceptance_criteria>
  <done>
Authentic data models and Playwright testing contract established.
  </done>
</task>

<task type="auto">
  <name>Task 2: Education Section Architecture, Component & Styling</name>
  <files>index.html, src/js/education.js, src/styles/education.css, src/styles/index.css, src/js/main.js</files>
  <read_first>src/js/education-data.js, src/styles/sections.css, src/styles/design-system.css</read_first>
  <action>
1. In `index.html`:
   - Replace `#education` placeholder with modular 3-pillar layout container `#education-pillars` and skills container `#education-skills`.
2. Create `src/js/education.js`:
   - Function `initEducation()`:
     - Mounts Pillar 1 (Academics): IIT Bombay banner with crest, CMS and St. Francis gold medal badges.
     - Mounts Pillar 2 (Governance): Abhyuday and Placement Cell quantified leadership cards with impact metrics.
     - Mounts Pillar 3 (Creative & Athletics): Dramatics awards, Stand-up comedy, sports titles.
     - Mounts Skills Matrix: Categorized interactive pills (Strategy, Data, Automation).
3. Create `src/styles/education.css`:
   - Viewport chassis: Constrained to 100vh with flex column layout.
   - 3-pillar grid: Balanced flex/grid with industrial borders, dark surface elevation, and accent hover states.
   - Light mode overrides: Crisp white cards, slate text, subtle shadows.
4. Update `src/styles/index.css` to import `./education.css`.
5. Update `src/js/main.js` to call `initEducation()`.
  </action>
  <verify>
Check element rendering in browser and verify `#education-pillars` has 3 pillar cards populated.
  </verify>
  <acceptance_criteria>
    - `#education` renders 3 distinct pillars and skills matrix
    - IIT Bombay crest and school logos display cleanly
    - Dark mode and light mode contrast verified
  </acceptance_criteria>
  <done>
Education section live with complete authentic credentials and 100vh viewport fit.
  </done>
</task>

<task type="auto">
  <name>Task 3: Contact Section, Action Cards, Resume Download & Editorial Statement</name>
  <files>index.html, src/js/contact.js, src/styles/contact.css, src/styles/index.css, src/js/main.js</files>
  <read_first>src/js/contact-data.js, src/styles/sections.css, src/styles/design-system.css</read_first>
  <action>
1. In `index.html`:
   - Replace `#contact` placeholder with contact cockpit grid `#contact-channels`, resume download bar `#contact-resume`, and editorial quote `#contact-editorial`.
2. Create `src/js/contact.js`:
   - Function `initContact()`:
     - Mounts contact action cards: LinkedIn (CONT-01), GitHub (CONT-02), Email with 1-click clipboard copy + 2s feedback toast (CONT-03), Phone dialer (CONT-04).
     - Mounts resume download hero (CONT-05) linking to resume asset.
     - Mounts Newsreader editorial closing statement (CONT-06).
3. Create `src/styles/contact.css`:
   - Viewport chassis: Fits 100% inside 100vh along with the `.site-footer`.
   - Contact cards: High-contrast interactive blocks with icon, handle, and hover micro-animations.
   - Editorial quote: Newsreader serif italic typography with royal blue quote accent.
   - Light mode overrides for all contact elements.
4. Update `src/styles/index.css` to import `./contact.css`.
5. Update `src/js/main.js` to call `initContact()`.
  </action>
  <verify>
Verify all 4 contact cards render, email copy triggers toast, resume link is valid, and footer remains anchored.
  </verify>
  <acceptance_criteria>
    - LinkedIn, GitHub, Email, and Phone interactive elements present
    - Email click copies to clipboard with visual confirmation
    - Resume download CTA present
    - Newsreader editorial statement rendered
    - Contact + footer fit inside 100vh
  </acceptance_criteria>
  <done>
Contact section and footer fully operational and verified.
  </done>
</task>

<task type="auto">
  <name>Task 4: Cross-Section Visual Verification & 100vh Viewport Automated Audit</name>
  <files>tests/education-contact.spec.js, scripts/capture-sections.js</files>
  <read_first>tests/education-contact.spec.js, scripts/capture-sections.js</read_first>
  <action>
1. Run Playwright test suite `tests/education-contact.spec.js` in Chromium to verify all EDU-01 to EDU-05 and CONT-01 to CONT-06 requirements.
2. Run `node scripts/capture-sections.js` to capture high-res screenshots of `#education` and `#contact` in dark and light modes, and at 720p laptop viewport.
3. Verify `typography-metrics.json` to ensure section headers across Hero, Experience, Projects, Education, and Contact remain 100% harmonized.
4. Verify that `#education` and `#contact` both fit within 100vh without page overflow.
  </action>
  <verify>
Run `npx playwright test tests/education-contact.spec.js --project=chromium --workers=1` and ensure 100% tests pass.
  </verify>
  <acceptance_criteria>
    - All Phase 7 Playwright tests pass green
    - Screenshots captured in `screenshots/` and brain artifact directory
    - Header and subheader typography metrics match across all sections
  </acceptance_criteria>
  <done>
Phase 7 complete, verified across themes and viewports, ready for milestone review.
  </done>
</task>

</tasks>
