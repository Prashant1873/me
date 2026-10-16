# Phase 23: Dedicated Mobile Experience, Layout Fitting & Navigation Overhaul

## Context & Objectives
Milestone 4 concludes with Phase 23, delivering a dedicated, polished mobile experience across smartphone viewports (320px to 428px widths) with strict isolation within `@media (max-width: 768px)`. The web/desktop view (`min-width: 769px`) remains 100% frozen with zero visual drift or regression.

The primary focus areas are:
1. **Dedicated Project Modal Experience (`MOB-03`)**: Transform the project dialogue box into a full-height overlay card (95vw width, 94vh height) with a compact mobile header, touch-friendly 16:9 slideshow, vertically scrollable narrative and innovation cards with visible metrics, wrap-friendly tech pills, and sticky full-width bottom CTAs.
2. **Viewport Fitting & Section Polish (`MOB-02`)**: Calibrate spacing, typography clamps, and card layouts across all 5 sections (Hero, Experience, Projects, Education, Contact) to eliminate horizontal overflow, awkward text clipping, or dead zones across 320px, 375px, 390px, and 428px screens.
3. **Ergonomic Navigation & Drawer Flow (`MOB-04`)**: Ensure the fixed 56px top bar, 44x44px hamburger toggle, and tactile command-module drawer provide effortless thumb reach, clear active states, and reliable scroll-lock without layout jump.
4. **Strict Isolation Invariant (`MOB-01`)**: All style modifications must reside inside `@media (max-width: 768px)` (or narrower), preserving desktop layout fidelity with zero regressions.

## Requirements Covered
- **MOB-01**: Strict isolation of all mobile visual styles within `@media (max-width: 768px)` ensuring 0% change or drift on desktop/web viewports (`min-width: 769px`).
- **MOB-02**: Optimize mobile viewport fitting, padding, font scaling, and component layout across all 5 sections (Hero, Experience, Projects, Education, Contact) eliminating cramped clipping or excessive scroll height across 320px to 428px viewport widths.
- **MOB-03**: Mobile project case study modal overhaul: ergonomic single-column vertical card flow, touch-optimized swipeable slideshow, full-width touch-friendly CTAs, and accessible close/traversal controls.
- **MOB-04**: Mobile navigation drawer & header refinement: tactile menu button, ergonomic link spacing, quick thumb-reach closing, and seamless scroll-lock without layout jump.

## Implementation Tasks

### Task 1: Dedicated Mobile Project Modal Overhaul (`src/styles/projects.css`)
- Under `@media (max-width: 768px)`:
  - Configure `.project-modal__chassis`:
    - `width: 95vw; max-width: 100%;`
    - `height: 94vh; max-height: 94dvh;`
    - `border-radius: 12px;`
    - `margin: auto;`
  - Re-engineer `.modal-header`:
    - Layout: `display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; gap: 8px;`
    - Make `.modal-header__info` compact: `.modal-header__title` font size `1.05rem`, `.modal-header__category` font size `10px`, line-height `1`.
    - Adjust `.modal-header__actions`:
      - Keep `.modal-close-btn` at minimum 44x44px touch area, prominent and easy to tap.
      - Streamline `.modal-traversal-btn` into compact icon-oriented buttons (`padding: 0 8px; font-size: 10px; min-height: 36px;`) so the header never wraps or squishes the title.
  - Re-engineer `.modal-slideshow`:
    - `aspect-ratio: 16 / 9; width: 100%; padding: 8px; border-right: none; border-bottom: 1px solid var(--border-subtle);`
    - Slideshow navigation arrows: `min-width: 40px; min-height: 40px; background: rgba(10, 10, 10, 0.85);` for reliable thumb tapping.
    - Thumbnails strip: hide or scroll horizontally with compact 48x27px previews.
  - Re-engineer `.modal-body` & `.modal-right-pane`:
    - `.modal-body`: `grid-template-columns: 1fr; overflow-y: auto; overscroll-behavior: contain;`
    - `.modal-right-pane`: `height: auto; min-height: auto; overflow: visible; padding: 14px; gap: 14px;`
    - `.modal-narrative`: font size `0.85rem`, line-height `1.45`, clean breathing room.
    - `.modal-innovations-grid`: `display: flex; flex-direction: column; gap: 10px;`
    - `.modal-innovation-item`: `padding: 10px 12px; border-radius: 8px;`
    - `.modal-innovation-header`: `gap: 8px; align-items: flex-start; justify-content: space-between;`
    - `.modal-innovation-metric`: `font-size: 10px; padding: 2px 7px; white-space: nowrap;`
    - `.modal-tech-pills`: `gap: 5px; flex-wrap: wrap;`
    - `.modal-tech-pill`: `font-size: 10.5px; padding: 4px 8px;`
  - Re-engineer `.modal-ctas`:
    - Sticky bottom placement inside right pane: `position: sticky; bottom: 0; background: var(--bg-surface); padding: 10px 0 2px; border-top: 1px solid var(--border-subtle); z-index: 5;`
    - Layout: `flex-direction: column; width: 100%; gap: 8px;`
    - `.modal-cta`: `width: 100%; min-height: 46px; justify-content: center; font-size: 13px;` for thumb-friendly tap targets.

### Task 2: Sections 1 to 5 Viewport Fitting & Responsive Polish (`src/styles/*.css`)
1. **Hero Section (`src/styles/sections.css`)**:
   - Under `@media (max-width: 768px)`:
     - Section padding: `padding-top: calc(56px + clamp(1rem, 3vh, 2rem)); padding-bottom: clamp(1.5rem, 4vh, 2.5rem);`
     - `.hero__name`: font size clamp `clamp(2rem, 9vw, 3.25rem);` with zero line break collisions.
     - `.hero__status`: wrap neatly with status indicator.
     - Hero action buttons: stack vertically or wrap cleanly on narrow screens (`<= 480px`) with min 44px tap targets.
2. **Experience Section (`src/styles/experience.css`)**:
   - Under `@media (max-width: 768px)`:
     - `.experience-timeline-track`: smooth touch momentum scrolling (`-webkit-overflow-scrolling: touch; scrollbar-width: none;`).
     - Milestone pills: clear active indicator and touch target >= 40px height.
     - `.experience-detail`: `padding: 16px; border-radius: 12px;`
     - Photo gallery thumbnails: `width: 64px; height: 48px; border-radius: 6px;` with touch feedback.
     - Lightbox controls: close button and prev/next chevrons >= 44x44px touch targets.
3. **Projects Section Grid (`src/styles/projects.css`)**:
   - Under `@media (max-width: 768px)`:
     - `.projects-grid`: `grid-template-columns: 1fr; gap: 16px;`
     - `.project-card`: `padding: 16px; border-radius: 12px; max-width: 100%;`
     - Card category badge and title contrast verified against screenshot scrims.
4. **Education Section Cards (`src/styles/education.css`)**:
   - Under `@media (max-width: 768px)`:
     - `.education-card`: `padding: 14px 16px; gap: 10px; border-radius: 12px;`
     - Card 1 (Academic Excellence): 3 institution entries stacked cleanly with crisp separators, clean logo alignment, and distinct credential badges.
     - Card 2 (High-Stakes Leadership): Abhyuday and Placement Cell metric boxes stacked or 2-column grid without text overlap.
     - Card 3 (Stage & Synthesis): 3 categories (Dramatics, Speaking, Athletics) with clean vector icons and badge pills.
     - Card 4 (Core Competencies & Toolkits): skills matrix groups wrap cleanly on 320px screens with zero horizontal overflow.
5. **Contact Section (`src/styles/contact.css`)**:
   - Under `@media (max-width: 768px)`:
     - Editorial statement: font size `clamp(1.1rem, 4vw, 1.35rem); line-height: 1.4;`
     - Contact action buttons (Email, LinkedIn, GitHub): stacked 1-column layout, `min-height: 48px; font-size: 13px;`
     - `.resume-chassis`: stacked layout with `min-height: 46px` download and preview buttons.
     - Resume preview modal: `width: 95vw; height: 90vh;` with thumb-sized close button.

### Task 3: Mobile Navigation Header & Drawer Hardening (`src/styles/navigation.css` & `src/js/navigation.js`)
- Under `@media (max-width: 768px)`:
  - `.site-nav`: height `56px`, fixed top with backdrop blur.
  - `.site-nav__name`: font size `0.85rem`, tagline `9.5px`.
  - `.nav-toggle`: `width: 44px; height: 44px; min-width: 44px; min-height: 44px;` with distinct touch active state.
  - `.mobile-drawer__panel`: `width: min(85vw, 340px); padding: 18px 16px;`
  - `.mobile-drawer__link`: tactile command card styling with clear active indicator (Phase 21 baseline preserved).
  - Body scroll lock: verify `body.nav-drawer-open` sets `overflow: hidden; touch-action: none;` without scroll jumping.

### Task 4: Automated Mobile Test Suite & Verification (`tests/mobile-dedicated-experience.spec.js`)
- Author comprehensive Playwright test suite `tests/mobile-dedicated-experience.spec.js`:
  - **320px Viewport (iPhone SE / narrow)**:
    - Zero horizontal document overflow (`document.documentElement.scrollWidth <= window.innerWidth`).
    - All 5 sections render without clipping.
    - Project modal opens, fits within viewport, and can be navigated and closed.
  - **375px Viewport (iPhone 12/13 Mini)**:
    - Zero horizontal overflow.
    - All touch targets >= 44x44px (nav toggle, drawer links, modal close, slideshow arrows, CTAs).
    - Modal body scrolls vertically and sticky CTAs are reachable.
  - **390px Viewport (iPhone 14/15/16)**:
    - Experience timeline ribbon swiping and role detail card display.
    - Education cards 1-4 internal spacing and skill pill wrapping.
    - Contact buttons and resume download ergonomics.
  - **428px Viewport (iPhone Pro Max)**:
    - Proportional layout scaling and visual balance.
  - **1440px Viewport (Desktop Invariant Check - MOB-01)**:
    - Desktop navigation bar visible, hamburger hidden.
    - Project modal renders 2-column cockpit (7fr left / 5fr right).
    - 0% visual drift or regression from Milestone 3/4 baseline.
- Run git pre-commit validation ensuring zero em dashes (code \u2014).
- Execute production build (`npm run build`).

## Testable Checkpoints
1. `tests/mobile-dedicated-experience.spec.js` passes 100% across all 4 mobile viewports and desktop invariant.
2. Existing test suites (`tests/responsive-mobile.spec.js`, `tests/mobile-drawer-redesign.spec.js`, `tests/projects-modal-density.spec.js`, `tests/no-em-dash.spec.js`) pass without regression.
3. Production Vite build completes with zero errors.
