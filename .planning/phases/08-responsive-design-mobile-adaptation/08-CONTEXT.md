# Phase 8 Context: Responsive Design & Mobile Adaptation

## Phase Goal
Transform Prashant Shukla's single-page portfolio into a responsive, mobile-first and tablet-adapted experience across viewports from 320px up to 1440px+, introducing an accessible animated hamburger navigation drawer, touch-optimized interactions (≥ 44px targets), mobile-adapted Three.js scenes, fluid typography scaling, and verified WCAG 2.2 AA accessibility and keyboard navigation. Delivers requirements NAV-04, RESP-01, RESP-02, RESP-03, RESP-04, and RESP-05.

---

## 1. Requirement Tracing

| Requirement | Description | Target Implementation & Viewport Scope |
| :--- | :--- | :--- |
| **NAV-04** | Mobile-responsive hamburger menu | Accessible toggle button (`#nav-toggle`) visible on `≤ 768px`, triggers animated slide-out glass drawer (`#mobile-nav-drawer`) with focus trap, Escape key handling, backdrop blur, and auto-close on navigation |
| **RESP-01** | Desktop-first design (1440px reference width) | Maintain 12-column grid, 100vh single-swipe presentation on standard desktop/laptop screens (1440x900, 1280x720) without regression |
| **RESP-02** | Tablet adaptation (768px–1024px) | Fluid 2-column project grid, stacked/wrapped education pillars, responsive 3D timeline track with touch scrubbing, adjusted padding |
| **RESP-03** | Mobile adaptation (320px–767px) | Single-column reflow across all sections, fluid typography clamps (`clamp()`), touch-friendly spacing, native vertical scroll enabling full section content visibility |
| **RESP-04** | WCAG 2.2 AA color contrast ratios for all text | Minimum 4.5:1 contrast for normal text and 3:1 for large headers/tags across both Dark Mode and Light Mode |
| **RESP-05** | Keyboard navigation for all interactive elements | High-contrast `:focus-visible` outline rings (`2px solid var(--accent-primary)`), logical tab order, modal focus trapping and restoration |

---

## 2. Locked Decisions

- **D-01: Dual-Mode Scroll Architecture (Desktop Snap vs Mobile Fluid)**:
  - On desktop (`> 1024px` with pointer: fine), keep full-viewport single-swipe section snapping (`section-scroll.js`) for the cinematic 100vh narrative.
  - On mobile & tablet (`≤ 1024px` or touch devices), disable wheel/touch hijacking to allow natural, buttery smooth vertical scrolling. When a section exceeds the mobile screen height (e.g. 6 project cards or 3 education pillars), users can scroll through all content naturally.
  - Implement an `IntersectionObserver` on sections to synchronize the active navigation link indicator during free mobile scrolling.
- **D-02: Structured Intensity Mobile Navigation Drawer**:
  - Hamburger button placed on the right of the sticky nav with animated three-bar icon morphing into an "X".
  - Full-screen or 320px right-anchored frosted glass drawer (`backdrop-filter: blur(20px)`) with dark obsidian (`rgba(10, 10, 10, 0.94)`) in dark mode and warm ivory (`rgba(255, 255, 255, 0.96)`) in light mode.
  - Contains section navigation links, theme switcher, quick contact links, and official CV download CTA.
  - Fully accessible: `aria-expanded`, `aria-controls="mobile-nav-drawer"`, focus trap within drawer, closes on `Escape` key or backdrop tap or link navigation.
- **D-03: Strict Touch Target Enforcement (≥ 44x44px)**:
  - Every interactive button, nav link, filter tab, modal close button, carousel arrow, and contact card meets or exceeds WCAG 2.5.5 / 2.5.8 minimum touch target dimensions (≥ 44px × 44px) on touch viewports.
  - Minimum 8px spacing between adjacent touch targets to eliminate accidental taps.
- **D-04: Mobile 3D Canvas Adaptation & Performance Protection**:
  - On mobile/tablet, cap WebGL renderer pixel ratio to `Math.min(window.devicePixelRatio, 1.5)` to prevent GPU throttling on 3x/4x high-density mobile screens.
  - Hero 3D canvas reflows to an ambient background layer behind headline text on small viewports with reduced opacity (`0.28`), preventing collision with typography.
  - Experience 3D horizontal timeline canvas maintains compact height (`140px`) with touch swipe support and dedicated Left/Right milestone buttons for touch-friendly stepping.
- **D-05: Modal Takeover & Bottom Sheet Pattern on Small Screens**:
  - Project case study modal, experience photo lightbox, work experience timeline calendar, and resume preview modal adapt on mobile to full-viewport modal sheets with sticky header, visible close buttons (≥ 44px), and internal momentum scrolling.
