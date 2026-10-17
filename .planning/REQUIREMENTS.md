# Requirements: Prashant Shukla Portfolio

**Milestone:** v5.0 - Cross-Browser CSS Hygiene & Lint Zero-Tolerance  
**Defined:** 2026-10-17  
**Core Value:** The website must feel unmistakably personal - like meeting Prashant, not reading his resume.

## Milestone 5 Requirements

### Cross-Browser User Selection Support
- [x] **LINT-01**: Add `-webkit-user-select: none;` preceding `user-select: none;` in `education.css` (lines 344, 509), `experience.css` (line 350), `navigation.css` (line 151), and `projects.css` (line 430) to ensure full iOS Safari support and eradicate IDE errors.

### Vendor Prefix Ordering (Backdrop Filter)
- [x] **LINT-02**: Enforce standard vendor prefix order by listing `-webkit-backdrop-filter` before `backdrop-filter` in `experience.css` (lines 636, 740, 778, 799), `navigation.css` (lines 16, 149, 299, 471), `projects.css` (lines 189, 196, 202, 208, 247, 276, 546), and `contact.css` (line 422).

### Deprecated Property Cleanup & WebKit Scrollbar Harmonization
- [x] **LINT-03**: Remove deprecated legacy `-webkit-overflow-scrolling: touch;` in `navigation.css` (line 505 / IDE reported line 497).
- [x] **LINT-04**: Harmonize `.modal-slideshow__thumbs` scrollbar in `projects.css` with WebKit scrollbar rules (`::-webkit-scrollbar` with height 4px and rounded thumb) matching design system.

### HTML Separation of Concerns & Inline Style Removal
- [x] **LINT-05**: Move inline `--pill-color` custom property styles from `index.html` (lines 451-455) into semantic CSS modifier classes in `experience.css` (`.timeline-legend-pill--iqvia`, `.timeline-legend-pill--revolut`, `.timeline-legend-pill--ketto`, `.timeline-legend-pill--kalam`, `.timeline-legend-pill--faoud`), completely eliminating inline styles from HTML.

### Projects Image Pipeline & Fast Loading
- [x] **PROJ-IMG-01**: Batch convert all 33 raw project screenshots to high-efficiency WebP format (85% quality, 1600px max bounds), reducing project image payload from ~15 MB down to <1.5 MB (>85% reduction).
- [x] **PROJ-IMG-02**: Generate dedicated responsive WebP thumbnails (240px for modal filmstrip, 480px for project card backgrounds, <25 KB each) eliminating multi-megabyte thumbnail downloads on page load and modal open.
- [x] **PROJ-IMG-03**: Update `src/js/projects-data.js` and `src/js/projects.js` to serve WebP assets with robust fallback handling, and implement proactive memory preloading for card previews and modal slides via `requestIdleCallback`.
- [x] **PROJ-IMG-04**: Add a dedicated loading spinner / skeleton to `#slideshow-main-img` ensuring instant visual feedback with zero blank frames or frozen states during slide transitions.

---

## Future Requirements (Backlog)
- **REC-01**: Recruiter Mode toggle with condensed executive summary
- **RES-01**: Styled dynamic PDF resume download generated matching the Structured Intensity design system
- **DEP-01**: Production deployment pipeline and custom domain configuration
- **OG-01**: OpenGraph meta tags and dynamic social share card generation

---

## Out of Scope
- Altering `meta[name="theme-color"]` in `index.html`: standard for Chromium & Safari browser chrome tinting, safe fallback for Firefox.
- Changing `scrollbar-width: none;` in `experience.css` L279: already paired with `::-webkit-scrollbar { display: none; }`.
- Modifying desktop or mobile visual layouts: 0% visual drift required.

---

## Milestone Traceability Matrix

| Requirement | Phase | Scope | Status |
|---|---|---|---|
| LINT-01 | Phase 24 | `-webkit-user-select` cross-browser support | Complete |
| LINT-02 | Phase 24 | Vendor prefix order for `backdrop-filter` | Complete |
| LINT-03 | Phase 24 | Deprecated `-webkit-overflow-scrolling` cleanup | Complete |
| LINT-04 | Phase 24 | Modal thumbnail WebKit scrollbar styling | Complete |
| LINT-05 | Phase 24 | Remove inline styles on timeline legend pills | Complete |
| PROJ-IMG-01 | Phase 25 | Batch WebP conversion for 33 project screenshots | Complete |
| PROJ-IMG-02 | Phase 25 | Dedicated WebP thumbnails for cards & filmstrip | Complete |
| PROJ-IMG-03 | Phase 25 | WebP data migration & proactive memory preloading | Complete |
| PROJ-IMG-04 | Phase 25 | Slideshow loading skeleton & zero blank frames | Complete |

---

## Overall Requirement Statistics
- **Milestone 1:** 57 / 57 Complete
- **Milestone 2:** 9 / 9 Complete
- **Milestone 3:** 10 / 10 Complete
- **Milestone 4:** 7 / 7 Complete
- **Milestone 5:** 9 / 9 Complete (All 9 Shipped & Verified)
- **Total Requirements Tracked:** 92
