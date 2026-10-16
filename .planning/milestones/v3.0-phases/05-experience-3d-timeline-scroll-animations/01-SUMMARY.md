# Phase 5: Experience - 3D Timeline & Scroll Animations Summary

## Overview
Executed Phase 5 with the spatial timeline track, pivoting from an isolated box to a unified, full-width horizontal X-axis 3D timeline spanning the section from left to right. Attached detailed milestone cards anchor beneath the active company orb, coupled with a minimal, color-coded calendar modal and seamless 1-swipe full-viewport navigation.

## Architecture & Visual Implementation

### 1. Horizontal Linear X-Axis Spatial Timeline (`src/js/experience-canvas.js`)
- **Strict Linear Chronology (Option B):** Reverse CV order across the X-axis:
  - `IQVIA (Present 2026, x = -12)` -> `Revolut (2025, x = -6)` -> `Ketto (2025, x = 0)` -> `Kalam Labs (2024, x = 6)` -> `FAOUD (2024, x = 12)`
  - Bounded camera traversal (`[-12, +12]`), strictly no infinite loop or wrapping.
- **3D Brand Medallions & Orbs:**
  - Double-sided circular medallions textured with transparent company brand logos (`/images/logos/faoud_transparent.png`, `/images/logos/revolut_white.png`, `/images/logos/ketto_dark.png`, etc.).
  - Translucent outer protective energy orbs (`MeshPhysicalMaterial`, roughness `0.15`, transmission `0.65`, clearcoat `1.0`).
  - Pulsing outer core halo that intensifies when active.
  - Specular rim rings color-coded to each company brand identity.
- **Ambient Space & Conduit:**
  - Luminous energy conduit line (`#2A3548`) linking all nodes horizontally.
  - Dynamic energy pulse particles flowing along the timeline.
  - 300 cosmic dust motes floating gently across the spatial background.
- **Raycasting & Interactivity:**
  - Direct pointer raycasting on company orbs (`pointerdown` / `click` / hover cursor).
  - Smooth pointer parallax on timeline pitch and yaw (`gsap.to(camera, { ... })`).
  - Category filter dimming: Non-matching nodes dim to 15% opacity; restores with 400ms luminous bloom.

### 2. Integrated Layout & Attached Cards (Option A) (`index.html`, `src/styles/experience.css`)
- **Unified Section Layout:**
  - Standardized margins: `--grid-margin: clamp(14px, 2vw, 32px)` and `--max-content-width: min(96vw, 1540px)`.
  - Top `.experience-toolbar` holding category filters (`All Experience`, `Strategy`, `Product`) and minimal `CALENDAR VIEW` button.
  - Upper `.experience-timeline-track` containing `#experience-canvas`, live progress bar, and floating date markers (`JAN 2026`, `MAY 2025`, `DEC 2024`, etc.).
  - Lower `.experience-detail-container` housing the attached active company card (`.experience-card-attached`) and quick-switch dock (`.experience-list`).
- **Elimination of Gantt Chart:**
  - Completely removed inline Gantt chart (`#experience-dates-toggle`, `#experience-dates-mini-chart`).
- **Minimalist Color-Coded Calendar Modal:**
  - Stripped bulky text and paragraphs from modal.
  - Rendered clean 2024–2026 month blocks color-coded with company signature brand themes:
    - `theme-iqvia`: `#00A3E0`
    - `theme-revolut`: `#0075EB`
    - `theme-ketto`: `#00A88F`
    - `theme-kalam-labs`: `#F97316`
    - `theme-faoud`: `#8B5CF6`
  - Compact company color legend at footer for instant visual identification.

### 3. Scroll & Navigation Contract Preservation (`src/js/section-scroll.js`)
- Full viewport single-swipe scrolling (`1 swipe = 1 section`) strictly preserved across Hero, Experience, Projects, Education, and Contact.
- Experience milestone cycling accessible via:
  - Direct click on 3D orbs (raycasting)
  - Direct click on company pill tabs (`.experience-item`)
  - Keyboard navigation (`ArrowLeft` / `ArrowRight`)
  - Horizontal drag/wheel gesture over track

## Verification Results
- `tests/experience.spec.js`: **PASSED** (Chromium, Firefox, WebKit)
- `tests/audit.spec.js`: **PASSED** (Chromium, Firefox, WebKit)
- `tests/zoom-out.spec.js`: **PASSED** (Chromium, Firefox, WebKit)
- **Total:** 9 passed across all three browser engines, 0 regressions.
