---
phase: 05.1-light-mode-contrast-and-logo-visibility
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/design-system.css
  - src/styles/sections.css
  - src/styles/experience.css
  - src/styles/navigation.css
  - src/styles/skeleton.css
  - src/js/experience-canvas.js
  - src/js/experience-data.js
  - src/js/experience.js
  - tests/experience.spec.js
autonomous: true
requirements:
  - CONTRAST-01
  - LOGO-01
user_setup: []
must_haves:
  truths:
    - "D-01: Light mode background is crisp, clean, and high-contrast (eliminating muddy #F1EEE5 tan/beige tint)"
    - "D-02: Light mode text satisfies WCAG 2.2 AAA contrast standards (>= 7:1 for body and headings)"
    - "D-03: Light mode surface cards (#FFFFFF / #F8FAFC) have distinct borders (#E2E8F0) and subtle elevation shadows"
    - "D-04: 3D canvas medallions maintain high-contrast dark enamel backing (#0F172A / 0x0F172A) with metallic tungsten amber rim in light mode, ensuring all white logos pop with 100% legibility"
    - "D-05: HTML experience detail card and calendar modal render logos with dark background badge boxes or adaptive dark variants so zero logos disappear against light cards"
    - "D-06: Seamless dark/light theme switching without visual artifacts, contrast degradation, or unreadable badges"
  artifacts:
    - src/styles/design-system.css
    - src/styles/sections.css
    - src/styles/experience.css
    - src/styles/navigation.css
    - src/js/experience-canvas.js
    - src/js/experience-data.js
    - src/js/experience.js
    - tests/experience.spec.js
---

<objective>
Overhaul light mode contrast throughout the entire portfolio and fix logo visibility. Eliminate the muddy/dirty beige background in favor of a crisp, high-contrast modern palette, and ensure all logos (especially white logos like Revolut, FAOUD, Kalam Labs, Ketto) remain bold, distinct, and completely legible in both 3D canvas and HTML cards.
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Global Light Mode Color System & Contrast Overhaul</name>
  <files>src/styles/design-system.css, src/styles/sections.css, src/styles/navigation.css, src/styles/skeleton.css</files>
  <action>
    - In `src/styles/design-system.css`:
      - Replace muddy `[data-theme="light"]` tokens:
        - `--bg-primary: #FFFFFF;` (or `#FAFAF9` ultra-clean porcelain)
        - `--bg-secondary: #F4F5F7;`
        - `--bg-surface: #FFFFFF;`
        - `--bg-surface-elevated: #F8FAFC;`
        - `--bg-glass: rgba(255, 255, 255, 0.88);`
        - `--text-primary: #0F172A;` (true deep slate/black, 15:1+ contrast)
        - `--text-secondary: #334155;` (slate 700, 7:1+ contrast)
        - `--text-muted: #64748B;` (slate 500)
        - `--border-subtle: #E2E8F0;`
        - `--border-strong: #CBD5E1;`
        - `--accent-primary: #1D4ED8;`
        - `--accent-warm: #DC2626;`
    - Update `src/styles/sections.css`:
      - Fix `.hero__meta .badge` in light mode: clear border, high-contrast text `#0F172A`, surface `#FFFFFF` with `#E2E8F0` border.
      - Ensure `.section-tag` and `.section__title` have crisp contrast.
    - Update `src/styles/navigation.css`:
      - Ensure navigation links, logo text, and active indicators have high-contrast text and crisp hover states.
    - Update `src/styles/skeleton.css` for clean light mode shimmer.
  </action>
</task>

<task type="auto">
  <name>Task 2: 3D Canvas Light Mode Medallion & Logo Contrast</name>
  <files>src/js/experience-canvas.js</files>
  <action>
    - In `src/js/experience-canvas.js`:
      - Update `PALETTES.light`:
        - Change `medallionBack` from washed-out `0xE2E8F0` to rich obsidian `0x0F172A` (deep enamel coin backing).
        - Maintain metallic rim `medallionRim: 0xA87038` and active ring colors.
        - Result: In light mode, the 3D celestial medallions look like luxury dark enamel tokens on the crisp light page, making white logos (`revolut_white.png`, `ketto_dark.png`, `kalamLabsLogo.png`, `faoud_transparent.png`) and colored logos (`IQVIA.png`) 100% visible, sharp, and high-contrast.
      - Ensure lighting: `ambientLight` and `directionalLight` in light mode maintain strong specular highlights without washing out logos.
  </action>
</task>

<task type="auto">
  <name>Task 3: HTML Detail Card, Photo Strips & Calendar Modal Logo Contrast</name>
  <files>src/styles/experience.css, src/js/experience.js, src/js/experience-data.js</files>
  <action>
    - In `src/styles/experience.css`:
      - Style `.experience-detail__logo-box` in light mode:
        - `background-color: #0F172A;` (or dark enamel badge backing) with `border: 1px solid rgba(0, 0, 0, 0.12);` so white and transparent logos pop with maximum contrast.
      - Update `.experience-detail`:
        - Crisp card surface: `background-color: #FFFFFF;`, `border: 1px solid #E2E8F0;`, `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);`.
      - Update `.experience-detail__period`:
        - `background-color: #F1F5F9;`, `color: #0F172A;`, `border: 1px solid #E2E8F0;`.
      - Update `.experience-detail__metric`:
        - Crisp high-contrast badge in light mode with bold text and visible icon.
      - Update calendar modal (`.timeline-track-card__logo-box`, `.timeline-month-cell`):
        - Ensure active month theme cells and track card logos have solid contrast and no washed-out white text.
  </action>
</task>

<task type="auto">
  <name>Task 4: Automated Playwright Verification & Multi-Browser Regression Test</name>
  <files>tests/experience.spec.js</files>
  <action>
    - In `tests/experience.spec.js`:
      - Add light mode test suite:
        - Toggle theme to light mode.
        - Verify body and section computed background colors are high-contrast (not #F1EEE5 muddy tan).
        - Verify heading and text computed colors have >= 4.5:1 contrast against background.
        - Verify logo images inside `.experience-detail__logo-box` are visible and unobstructed.
        - Verify calendar modal in light mode opens with legible text and visible company logos.
    - Run `npx playwright test tests/experience.spec.js` across Chromium, Firefox, WebKit.
  </action>
</task>

</tasks>
