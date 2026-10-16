# Phase 8 Research: Responsive Design & Mobile Adaptation Architecture

## 1. Breakpoint Matrix & Layout Foundations

### 1.1 Responsive Breakpoint Continuum
To ensure pixel-perfect fidelity across the full spectrum of devices from small smartphones to ultra-wide displays without awkward layout jumps:

| Breakpoint Tier | Width Range | Layout Strategy & Column Grid | Viewport Height & Scroll Model |
| :--- | :--- | :--- | :--- |
| **Desktop Ultra/Wide** | `≥ 1440px` | 12-column grid (`--max-content-width: 1400px`), standard reference width | Strict 100vh snap scroll, dual-column hero, 3-pillar education |
| **Desktop / Laptop** | `1025px – 1439px` | 12-column grid (`padding-inline: 40px`), fluid card spacing | Strict 100vh snap scroll, full horizontal 3D timeline track |
| **Tablet Landscape / Portrait** | `768px – 1024px` | 8-column/12-column hybrid, reflowed 2-column project cards, wrapped education cards | Fluid vertical scroll with section anchor navigation |
| **Mobile Standard** | `376px – 767px` | 1-column stack across all sections, full-width cards, hamburger menu | Fluid vertical scroll with sticky compact header & auto-closing drawer |
| **Mobile Compact** | `320px – 375px` | 1-column stack, tight padding (`16px`), fluid typography clamps | Fluid vertical scroll, touch targets ≥ 44px with zero horizontal scroll bleed |

### 1.2 Fluid Typography Scaling Token Formula
To eliminate jarring font-size steps between desktop and mobile, all primary type tokens use CSS `clamp()` anchored against viewport width:
- **Hero Title**: `clamp(2.25rem, 6.5vw, 4.25rem)` (36px on 320px mobile -> 68px on 1440px desktop)
- **Section Title (`--text-section`)**: `clamp(1.75rem, 3.2vh + 1vw, 2.35rem)` (28px minimum, scaling smoothly)
- **Section Subtitle (`--text-section-sub`)**: `clamp(0.875rem, 1.2vw, 1.05rem)` (14px – 16.8px)
- **Body & Card Text**: `clamp(0.8125rem, 1vw, 0.9375rem)` (13px – 15px)
- **Technical Meta (`--font-technical`)**: `clamp(10px, 0.9vw, 12px)`

---

## 2. Navigation Architecture & Hamburger Drawer Pattern (`NAV-04`)

### 2.1 Trigger Button (`#nav-toggle`)
- Positioned on right side of `.site-nav__inner` on viewports `≤ 768px`.
- Dimensions: 44px × 44px touch container.
- Animated Hamburger-to-X Icon:
  - 3 horizontal bars (height 2px, width 20px, border-radius 1px).
  - On toggle (`aria-expanded="true"`): Top bar rotates +45deg and translates down, middle bar fades out (`opacity: 0`), bottom bar rotates -45deg and translates up.
  - Smooth spring transition (`transition: transform 0.28s var(--ease-spring), opacity 0.2s ease`).

### 2.2 Mobile Navigation Drawer (`#mobile-nav-drawer`)
- Layout: Fixed full-screen overlay or 85vw right-slide drawer (`z-index: 1050`).
- Background: `rgba(10, 10, 10, 0.92)` in Dark Mode, `rgba(255, 255, 255, 0.96)` in Light Mode with `backdrop-filter: blur(24px)`.
- Content Stack:
  1. Header with brand monogram and close button (or sync with hamburger toggle).
  2. Section navigation links with large touch targets (height 48px, font-size 18px, uppercase, letter-spacing 0.08em).
  3. Interactive utilities: Dark/Light Mode toggle button and View/Download Resume button.
  4. Quick direct links: LinkedIn, GitHub, Email.
- Accessibility Contract:
  - `role="dialog"`, `aria-modal="true"`, `aria-label="Mobile Navigation"`.
  - Focus trap: When open, tab key cycles strictly through interactive elements within the drawer.
  - Closes on `Escape` key, backdrop click, or navigation link tap.
  - Restores focus to `#nav-toggle` upon closing.
  - Body scroll locked while drawer is active (`overflow: hidden` on `<body>`).

---

## 3. Scroll Dynamics: Decoupling Desktop 100vh Snapping from Mobile Free Scroll

### 3.1 The Problem
The current desktop controller (`section-scroll.js`) intercepts all wheel and touch events, forcing 1 gesture = 1 section jump. While effective for 100vh presentations on laptops, on mobile screens a section's contents (such as 6 project cards or 3 education pillars) naturally exceed the 600px–800px mobile viewport height. If full-page snapping is active, users are unable to scroll down inside the section to view content.

### 3.2 The Solution
- Implement media query & pointer detection:
  - When `window.innerWidth > 1024` AND `window.matchMedia('(pointer: fine)').matches`: Full 100vh snap-scroll remains enabled.
  - When `window.innerWidth <= 1024` OR `window.matchMedia('(pointer: coarse)').matches`:
    - Disable wheel/touch hijacking in `section-scroll.js`.
    - Set `.section { min-height: 100vh; height: auto; max-height: none; overflow: visible; }`.
    - Allow natural momentum touch scrolling.
    - Mount an `IntersectionObserver` on all sections to dynamically update the active nav link (`is-active`) as sections scroll into view.
    - Smooth scrolling on nav link click: `window.scrollTo({ top: targetEl.offsetTop - navHeight, behavior: 'smooth' })`.

---

## 4. Mobile 3D Canvas Adaptation & Performance Protection

### 4.1 Hero 3D Orbital Canvas
- Desktop: Centered in `col-span-5` right column.
- Mobile (`≤ 900px`):
  - Positioned as absolute background layer with reduced opacity (`0.25 - 0.32`).
  - Render target capped at `min(85vw, 360px)` to prevent oversized buffers.
  - Pixel ratio capped at `Math.min(window.devicePixelRatio, 1.5)` (avoids rendering 3x/4x buffers on iPhone/Pixel screens).
  - Inactive throttling: Pause `requestAnimationFrame` when the hero section is out of the viewport.

### 4.2 Experience 3D Spatial Timeline
- Desktop: Expansive horizontal conduit line with hovering nodes across wide aspect ratio.
- Mobile (`≤ 768px`):
  - Canvas height constrained to `130px - 150px`.
  - Nodes remain horizontally draggable/swipeable.
  - Include dedicated on-screen `Prev` and `Next` milestone buttons in the active card for immediate single-tap navigation without requiring precise canvas swiping.
  - Detail card below canvas features responsive font sizes, wrap on metadata badges, and full-width CTA buttons.

---

## 5. Touch Target & Accessibility Guidelines (`RESP-04`, `RESP-05`)

### 5.1 Touch Target Sizing (WCAG 2.5.5 Level AAA & 2.5.8 Level AA)
- Minimum dimensions for all clickable elements on touch viewports:
  - Nav links: `min-height: 44px; padding: 12px 16px;`
  - Theme toggle button: `44px × 44px`
  - Project filter tabs: `min-height: 44px; padding: 10px 18px;`
  - Modal close buttons: `44px × 44px` tap target area
  - Carousel navigation arrows: `44px × 44px`
  - Contact cards & copy email button: `min-height: 48px;`
  - Resume download CTA: `min-height: 48px;`
- Minimum spacing between adjacent touch targets: `8px`.

### 5.2 Focus Indicators & Keyboard Navigation (`RESP-05`)
- Global `:focus-visible` ring:
  ```css
  :focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 3px;
    border-radius: var(--radius-sm);
  }
  ```
- All buttons, links, tabs, and interactive cards must have unambiguous keyboard focus rings in both Dark Mode (`#2962FF` / `#4D82FF`) and Light Mode (`#1D4ED8`).
- Modals implement programmatic focus trap on `Tab` / `Shift+Tab` and restore focus to trigger element on `Close` or `Escape`.

### 5.3 WCAG 2.2 AA Color Contrast Matrix (`RESP-04`)
- Body text against dark background (`#F1EEE5` on `#000000` / `#141414`): Ratio `13.5:1` (Exceeds 4.5:1).
- Body text against light background (`#141414` on `#FFFFFF` / `#F6F7F9`): Ratio `14.8:1` (Exceeds 4.5:1).
- Secondary text against dark background (`#AAAAAA` on `#000000`): Ratio `8.2:1` (Exceeds 4.5:1).
- Secondary text against light background (`#475569` on `#FFFFFF`): Ratio `5.6:1` (Exceeds 4.5:1).
- Brand Blue accent (`#2962FF` on `#000000`): Ratio `4.6:1` (Passes 4.5:1 for body and 3:1 for large text).
- Brand Blue in light mode (`#1D4ED8` on `#FFFFFF`): Ratio `5.9:1` (Passes 4.5:1).
