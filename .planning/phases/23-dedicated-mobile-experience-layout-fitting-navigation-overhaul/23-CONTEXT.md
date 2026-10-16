# Phase 23 Context: Dedicated Mobile Experience, Layout Fitting & Navigation Overhaul

**Phase:** 23  
**Milestone:** v4.0  
**Requirements:** MOB-01, MOB-02, MOB-03, MOB-04  

## Problem Statement
While the portfolio has an approved, polished desktop presentation, mobile viewports (320px to 428px widths, such as iPhone SE, iPhone 12/14/15, Pixel, Galaxy) require a dedicated, ergonomically tailored experience. Specifically:
1. The project case study dialogue box (`.project-modal`) needs a mobile-first overhaul: full-height overlay card, compact header that prevents button cramping, touch-friendly 16:9 slideshow, vertically scrollable narrative and innovation cards, and sticky full-width touch CTAs.
2. Across all 5 sections (Hero, Experience, Projects, Education, Contact), layout fitting, paddings, typography clamps, and card structures must eliminate awkward clipping, horizontal overflow, and excessive dead heights on mobile screens.
3. Mobile navigation and drawer must provide effortless thumb reach, tactile feedback, and seamless scroll-lock without layout jumping.
4. **Desktop Freeze Invariant:** The desktop/web presentation (`min-width: 769px`) is already approved and locked. Zero visual drift, regressions, or unintended overrides may affect desktop viewports.

## Locked Decisions & User Preferences

### 1. Strict Isolation Boundary (MOB-01)
- All mobile CSS rules must be placed strictly inside `@media (max-width: 768px)` or narrower breakpoints (`@media (max-width: 480px)`).
- Absolutely zero changes or rules outside these media queries that could affect screens with `min-width: 769px`.

### 2. Mobile Project Case Study Modal Presentation (MOB-03)
- **Style:** Full-height overlay card (`width: 95vw; height: 94vh; max-height: 94dvh;`).
- **Header:** Compact mobile header bar: project title and category badge cleanly displayed, with Close button positioned for easy thumb reach. Traversal controls (Prev/Next) rendered as compact icons or integrated touch pills without crowding the title.
- **Slideshow:** Touch-friendly 16:9 viewport with thumb-sized traversal arrows (>= 40x40px) and slide counter.
- **Content Flow:** Single-column vertical scroll inside `.modal-body`: narrative paragraph, stacked architecture innovation cards with visible metrics, wrap-friendly tech capsules.
- **Footer CTAs:** Full-width stacked buttons (`min-height: 46px`) with sticky bottom positioning inside the modal for immediate thumb access.

### 3. Experience Section Mobile Navigation (MOB-02)
- Horizontal swipeable milestone ribbon with touch momentum (`-webkit-overflow-scrolling: touch`), distinct active milestone indicator, and milestone navigation arrows.
- Role detail card optimized for vertical mobile reading: company badge, tenure pill, metrics highlights, and lightweight photo thumbnails with >= 44px tap targets.

### 4. Page Scroll Behavior (MOB-02)
- Natural fluid document scrolling (no rigid full-screen snap on mobile) allowing standard smooth finger flick and scroll ergonomics.
- Section paddings calibrated (`padding-top: calc(56px + 16px); padding-bottom: 32px;`) to prevent cramped top headings or bottom cutoffs.

### 5. Mobile Navigation & Drawer Ergonomics (MOB-04)
- 56px fixed top bar with legible logo and 44x44px hamburger toggle button.
- Drawer panel with tactile command-module cards (from Phase 21), high-contrast active indicator, thumb-friendly tap targets, and clean body scroll-lock (`body.nav-drawer-open { overflow: hidden; }`) without layout shift.

## Deliverables
- `src/styles/projects.css`: Mobile rules for `.project-modal__chassis`, `.modal-header`, `.modal-slideshow`, `.modal-body`, `.modal-right-pane`, `.modal-ctas`, and project grid.
- `src/styles/sections.css`: Mobile section padding and typography calibration across Hero, Experience, Projects, Education, and Contact.
- `src/styles/experience.css`: Mobile timeline track, milestone ribbon, detail card, and lightbox touch ergonomics.
- `src/styles/education.css`: Mobile layout for Academic 3-institution cards, Leadership stats, Stage & Synthesis pills, and Competencies grid.
- `src/styles/contact.css`: Mobile editorial statement typography, stacked contact channels, and resume chassis.
- `src/styles/navigation.css` & `src/js/navigation.js`: Mobile header and drawer scroll-lock verification.
- `tests/mobile-dedicated-experience.spec.js`: Automated Playwright test suite covering 320px (iPhone SE), 375px (iPhone 12 Mini), 390px (iPhone 14/15), and 428px (iPhone Pro Max), verifying zero horizontal overflow, touch target sizes >= 44px, project modal mobile flow, and zero desktop regressions at 1440px.
