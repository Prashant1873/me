# Phase 24 Context: Cross-Browser CSS Hygiene & Lint Zero-Tolerance

## Objective
Address and eliminate all reported IDE errors and warnings across `education.css`, `experience.css`, `navigation.css`, `projects.css`, `contact.css`, and `index.html`.

## Scope
1. **User Select Safari Support (`-webkit-user-select`)**:
   - `src/styles/education.css`: L344 (`.edu-metric-capsule__divider`), L509 (`.gov-kpi-chip__sep`)
   - `src/styles/experience.css`: L350 (`.experience-detail__period`)
   - `src/styles/navigation.css`: L151 (`.theme-toggle`)
   - `src/styles/projects.css`: L430 (`.project-btn`)
2. **Vendor Prefix Ordering (`-webkit-backdrop-filter` before `backdrop-filter`)**:
   - `src/styles/experience.css`: L636, L740, L778, L799
   - `src/styles/navigation.css`: L16, L149, L299, L479
   - `src/styles/projects.css`: L189, L196, L202, L208, L247, L276, L546
   - `src/styles/contact.css`: L422
3. **Deprecated Property Cleanup**:
   - `src/styles/navigation.css`: L505, remove `-webkit-overflow-scrolling: touch;`
4. **WebKit Scrollbar Harmonization**:
   - `src/styles/projects.css`: L787, add `::-webkit-scrollbar` rules for `.modal-slideshow__thumbs`
5. **Inline Styles Removal & External CSS Classes**:
   - `index.html`: L451-455, remove `style="--pill-color: ...;"`
   - `src/styles/experience.css`: add `.timeline-legend-pill--iqvia`, `.timeline-legend-pill--revolut`, `.timeline-legend-pill--ketto`, `.timeline-legend-pill--kalam`, `.timeline-legend-pill--faoud`
6. **Intentional Standards Retained (No Action Needed)**:
   - `index.html`: `meta[name="theme-color"]` (standard for Chromium & iOS Safari browser chrome tinting)
   - `src/styles/experience.css`: L279 `scrollbar-width: none;` (already paired with `::-webkit-scrollbar { display: none; }`)

## Verification Strategy
- Verify zero IDE errors in all affected files.
- Run Playwright test suites (e.g. mobile tests and desktop invariant).
- Run Vite production build (`npm run build`).
