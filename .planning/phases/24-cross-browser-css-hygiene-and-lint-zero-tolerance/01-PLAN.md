# Phase 24 Plan: Cross-Browser CSS Hygiene & Lint Zero-Tolerance

## Plan Information
- **Phase:** 24
- **Title:** Cross-Browser Vendor Prefixes, Prefix Ordering & Inline Styles Removal
- **Goal:** Resolve all reported IDE errors and warnings across CSS stylesheets and index.html with 0% visual drift.

## Tasks

### Task 1: Add `-webkit-user-select: none;` across stylesheets (LINT-01)
- `src/styles/education.css`: add `-webkit-user-select: none;` before `user-select: none;` at lines 344 and 509.
- `src/styles/experience.css`: add `-webkit-user-select: none;` before `user-select: none;` at line 350.
- `src/styles/navigation.css`: add `-webkit-user-select: none;` before `user-select: none;` at line 151.
- `src/styles/projects.css`: add `-webkit-user-select: none;` before `user-select: none;` at line 430.

### Task 2: Standardize `backdrop-filter` vendor prefix ordering (LINT-02)
- Reorder lines so `-webkit-backdrop-filter` is written before `backdrop-filter` in:
  - `src/styles/experience.css`: lines 636, 740, 778, 799
  - `src/styles/navigation.css`: lines 16, 149, 299, 479
  - `src/styles/projects.css`: lines 189, 196, 202, 208, 247, 276, 546
  - `src/styles/contact.css`: line 422

### Task 3: Clean up deprecated property & harmonize WebKit scrollbar (LINT-03, LINT-04)
- `src/styles/navigation.css`: remove obsolete `-webkit-overflow-scrolling: touch;`.
- `src/styles/projects.css`: add WebKit scrollbar rules (`::-webkit-scrollbar` and thumb) for `.modal-slideshow__thumbs`.

### Task 4: Extract inline styles from `index.html` to `experience.css` (LINT-05)
- In `src/styles/experience.css`: add classes:
  - `.timeline-legend-pill--iqvia { color: #2962FF; }`
  - `.timeline-legend-pill--revolut { color: #00D4FF; }`
  - `.timeline-legend-pill--ketto { color: #00A86B; }`
  - `.timeline-legend-pill--kalam { color: #7C3AED; }`
  - `.timeline-legend-pill--faoud { color: #E8655A; }`
- In `index.html`: replace inline `style="--pill-color: ...;"` on `.timeline-legend-pill` with the corresponding class names.

### Task 5: Verification & Regression Testing
- Verify all modified files have zero em dashes.
- Run tests (`npm run test` or `npx playwright test`).
- Run production build (`npm run build`).

## Success Criteria
- Zero errors and zero ordering warnings in IDE.
- Zero inline styles in `index.html`.
- All Playwright tests pass cleanly.
