---
phase: 17-experience-photo-pipeline-optimization-lightbox-state-fix
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - scripts/optimize_experience_photos.py
  - src/js/experience-data.js
  - src/js/experience.js
  - src/styles/experience.css
  - index.html
  - tests/experience-photo-pipeline.spec.js
autonomous: true
requirements:
  - IMG-01
  - IMG-02
user_setup: []
must_haves:
  truths:
    - "D-01: WebP Image Optimization (IMG-01) - Experience photos and thumbnails are converted to modern WebP format, reducing payload by >90% while preserving crisp fidelity"
    - "D-02: Zero Stale-Image Flicker (IMG-02) - Lightbox transitions show an elegant loading state and immediately clear the previous photo so stale images never linger during traversal"
    - "D-03: Proactive Preloading - Adjacent photos (prev/next) are preloaded in memory during lightbox view, and thumbnails are cached during idle time"
  artifacts:
    - scripts/optimize_experience_photos.py
    - src/js/experience-data.js
    - src/js/experience.js
    - src/styles/experience.css
    - index.html
    - tests/experience-photo-pipeline.spec.js
  key_links:
    - "scripts/optimize_experience_photos.py generates .webp full and thumb files in public/images/experience/"
    - "src/js/experience-data.js references optimized webp images with separate thumb and full paths"
    - "src/js/experience.js uses thumb paths for thumbnails and loads full paths asynchronously in the lightbox with loading states"
    - "tests/experience-photo-pipeline.spec.js verifies WebP loading and zero stale-image glitch"
---

<objective>
Execute Phase 17: Experience Photo Pipeline Optimization & Lightbox State Fix.
Eradicate initial page load latency and traversal lag caused by multi-megabyte raw photos; eliminate the lightbox stale-image caching flaw with loading indicators and race-safe image swapping (IMG-01, IMG-02).
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Python Script to Batch Optimize Experience Photos to WebP</name>
  <files>scripts/optimize_experience_photos.py</files>
  <action>
1. Write `scripts/optimize_experience_photos.py`:
   - Recursively inspect `public/images/experience/`.
   - Use Pillow to process every experience photo:
     - Full image: max dimension 1600px, WebP quality 82, auto-orient EXIF, strip metadata.
     - Thumbnail: max dimension 240px, WebP quality 80.
   - Save output as `<name>.webp` and `thumb_<name>.webp`.
   - Log before/after byte sizes and percentage savings.
2. Run the script via `python scripts/optimize_experience_photos.py`.
  </action>
  <verify>
Run `python scripts/optimize_experience_photos.py` and inspect generated `.webp` files in `public/images/experience/`.
  </verify>
  <acceptance_criteria>
    - Every experience photo has a `.webp` full version (< 250KB) and `thumb_*.webp` thumbnail (< 20KB).
    - Total photo payload reduced by >90%.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Update Experience Data Model with Structured Photo Objects</name>
  <files>src/js/experience-data.js</files>
  <action>
1. In `src/js/experience-data.js`:
   - Update `EXPERIENCES` photo arrays to provide structured objects:
     `{ full: './images/experience/.../<name>.webp', thumb: './images/experience/.../thumb_<name>.webp' }`
     and maintain backward compatibility with both string URLs and `{ full, thumb }` objects.
   - Point to the newly generated lightweight WebP assets.
  </action>
  <verify>
Check `src/js/experience-data.js` syntax and paths.
  </verify>
  <acceptance_criteria>
    - Photos array contains clean WebP references with distinct thumbnail and full-resolution URLs.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Overhaul Lightbox in index.html, experience.css, and experience.js</name>
  <files>index.html, src/styles/experience.css, src/js/experience.js</files>
  <action>
1. In `index.html`:
   - Add `#experience-lightbox-spinner` inside `.experience-lightbox__content`.
2. In `src/styles/experience.css`:
   - Style `.experience-lightbox__spinner`: centered pulsing ring / circular spinner matching design system amber/coral glow.
   - Style `.experience-lightbox__img`: smooth opacity transition (180ms ease).
   - Add `.experience-lightbox__img.is-loading { opacity: 0; }`.
   - Add `.experience-lightbox__spinner.is-active { display: block; opacity: 1; }`.
3. In `src/js/experience.js`:
   - Update `renderDetail`: render `<img src="${photo.thumb || photo}" ...>` for thumbnails with `loading="lazy"` and `decoding="async"`.
   - Update `openLightbox` and `updateLightboxImage`:
     - Maintain an incrementing `loadRequestId` token to prevent race conditions.
     - When changing photo, immediately add `is-loading` to image and `is-active` to spinner.
     - Create an off-screen `new Image()` loader.
     - On `loader.onload`, verify request token matches `loadRequestId`; if matched, set `lightboxImg.src = targetSrc`, remove `is-loading`, hide spinner.
     - Proactively preload adjacent images: `activePhotos[(currentPhotoIdx + 1) % len]` and `activePhotos[(currentPhotoIdx - 1 + len) % len]`.
4. In `src/js/experience.js`:
   - Add idle preloader for experience thumbnails using `requestIdleCallback` or 1s delayed timeout after initial page render.
  </action>
  <verify>
Inspect lightbox markup, CSS, and interaction logic.
  </verify>
  <acceptance_criteria>
    - Previous image is instantly hidden when traversing to a new image.
    - Spinner indicates active loading until image is ready.
    - Adjacent photos are cached in browser memory for instant next/prev clicks.
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 4: Playwright Test Suite for Experience Photo Pipeline</name>
  <files>tests/experience-photo-pipeline.spec.js</files>
  <action>
1. Create `tests/experience-photo-pipeline.spec.js`:
   - Test 1: Verify all experience thumbnails reference `.webp` files and have loaded naturalWidth > 0.
   - Test 2: Verify lightbox opening displays photo with WebP source.
   - Test 3: Verify navigating through photos updates counter and does not show broken image states.
   - Test 4: Verify spinner element exists and is managed during image load.
2. Run test suite: `npx playwright test tests/experience-photo-pipeline.spec.js --project=chromium`.
  </action>
  <verify>
Run `npx playwright test tests/experience-photo-pipeline.spec.js tests/experience.spec.js`.
  </verify>
  <acceptance_criteria>
    - All tests pass with 0 failures.
  </acceptance_criteria>
</task>

</tasks>
