# Phase 25 Plan: Projects Image Pipeline Optimization, WebP Conversion & Fast Loading

## Plan Information
- **Phase:** 25
- **Title:** Projects Image Pipeline Optimization, WebP Conversion & Fast Loading
- **Goal:** Transform the project images pipeline by converting 33 screenshots to lightweight WebP, generating compact thumbnails, implementing proactive preloading, and adding loading states for instant, resilient delivery on GitHub Pages.

## Tasks

### Task 1: Batch Convert Project Screenshots to WebP & Generate Thumbnails (PROJ-IMG-01, PROJ-IMG-02)
- Create `scripts/optimize_project_photos.py` modeled after `scripts/optimize_experience_photos.py`.
- Run script to convert all PNGs in `public/images/projects/` (`bickerbape`, `strokecrm`, `trinet`, `archetype`, `careerloom`, `marcutie`) to:
  - Full-size WebP: `slide-X.webp` (quality 85, max dimension 1600px).
  - Compact Thumbnail WebP: `thumb_slide-X.webp` (quality 82, max dimension 360px).
- Verify payload reduction (>85% total size reduction).

### Task 2: Upgrade Project Data Model (PROJ-IMG-03)
- Update `src/js/projects-data.js` to provide structured screenshot objects:
  ```javascript
  {
    src: './images/projects/bickerbape/slide-1.webp',
    thumb: './images/projects/bickerbape/thumb_slide-1.webp',
    caption: '...',
    alt: '...'
  }
  ```

### Task 3: Enhance Projects Controller & Slideshow Ergonomics (PROJ-IMG-03, PROJ-IMG-04)
- Update `src/js/projects.js`:
  - Use `s.thumb || s.src` for `.project-card__bg-img` on home page grid.
  - Use `s.thumb || s.src` for `.modal-slideshow__thumb img`.
  - Add `#slideshow-spinner` loading indicator inside `.modal-slideshow__viewport`.
  - Implement proactive image preloading for all card thumbnails on page load via `requestIdleCallback`.
  - Implement active project slides preloader when case study modal opens.
  - Implement graceful fade-in when `slideshow-main-img` finishes loading.

### Task 4: Style Slideshow Loading State
- In `src/styles/projects.css`, add styling for `#slideshow-spinner` and `.modal-slideshow__img.is-loading`.

### Task 5: Verification & Production Build
- Run `node scripts/check-no-em-dash.js`.
- Run `npm run build` to verify production assets and paths.
- Write and run a focused Playwright test `tests/project-photo-pipeline.spec.js`.
