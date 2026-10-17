# Phase 25 Context: Projects Image Pipeline Optimization, WebP Conversion & Fast Loading

## User Request
"the github page doesnt load projects images fast and sometimes at all add that phase as well to fix"

## Problem Analysis
1. **Asset Weight:**
   - `public/images/projects/` contains 33 uncompressed PNG screenshots across 6 projects totaling nearly 15 MB (e.g. `trinet/slide-1.png` is 1.51 MB, `marcutie/slide-1.png` is 944 KB, `careerloom/slide-4.png` is 763 KB).
   - Card previews on the home page load full-resolution 1-1.5 MB PNGs for background thumbnails.
   - Modal filmstrip renders 5-7 full-resolution PNGs simultaneously for 72x42px buttons.
2. **Network Bottleneck on GitHub Pages:**
   - Over standard mobile/broadband connections, fetching multiple multi-megabyte PNGs causes queueing, slow rendering, and connection timeouts on GitHub Pages Fastly CDN edge.
3. **Absence of Preloading & Loading Skeleton:**
   - No preloading exists for adjacent project slides, causing stutter or blank viewports when navigating screenshots.
   - No loading spinner/skeleton on `#slideshow-main-img` during asset resolution.

## Solution Architecture
1. **Batch WebP Conversion Script:**
   - Create `scripts/optimize_project_photos.py` using Pillow with Lanczos downsampling.
   - Generate full-resolution WebP (quality 85, max 1600px dimension) -> drops ~15 MB down to <1.5 MB (>85% reduction).
   - Generate dedicated WebP thumbnails (`thumb_slide-X.webp`, max 360px width, quality 82, ~10-20 KB each).
2. **Data & Component Migration:**
   - Update `src/js/projects-data.js` to reference optimized WebP files for both `src` (full) and `thumb` (compact).
   - Update `src/js/projects.js` to render `thumb` for `.project-card__thumb` and `.modal-slideshow__thumb img`.
3. **Proactive Memory Preloading & Idle Caching:**
   - Cache-warm card preview thumbnails on page load via `requestIdleCallback`.
   - Preload active project modal slides when a project case study is opened.
4. **Instant Loading Skeleton State:**
   - Add `#slideshow-spinner` and CSS loading pulse to prevent blank or frozen frames during slide switches.

## Verification
- Run `node scripts/check-no-em-dash.js`.
- Run `npm run build` to verify production bundle.
- Verify asset loading speed and fallback resilience in Playwright.
