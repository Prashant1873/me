# Phase 21: Mobile Navigation Drawer Redesign

## Context & Objectives
Redesign the mobile drawer navigation items using `frontend-skill` into tactile, styled command-module cards with distinct active/hover micro-interactions and Apple fluid spring physics.

## Requirements Covered
- **NAV-06**: Redesign mobile drawer navigation items using frontend-skill into tactile, styled command-module cards with distinct active/hover micro-interactions.

## Implementation Tasks
1. **Markup Updates (`index.html`)**:
   - Enhance `.mobile-drawer__link` items with a structured container: index badge capsule (`.mobile-drawer__num`), bold uppercase label (`.mobile-drawer__label`), and directional action chevron (`.mobile-drawer__chevron`).
2. **Tactile Command Card Styling (`src/styles/navigation.css`)**:
   - Style `.mobile-drawer__link` with glassmorphic depth, concentric borders (`rgba(255, 255, 255, 0.1)`), subtle gradient fill, and drop shadow.
   - Micro-capsule badge for `.mobile-drawer__num` with glowing cyan accent.
   - Fluid spring physics on hover (`translateY(-2px) scale(1.01)`) and active press (`scale(0.97)`).
   - High-contrast active state (`.is-active`) with prominent accent glow.
   - Tactical styling for `.mobile-drawer__resume-btn` and drawer panel header/footer.
   - Complete light mode adaptation (`[data-theme="light"]`).
3. **Verification**:
   - Write automated Playwright test `tests/mobile-drawer-redesign.spec.js` asserting command card styling, chevron presence, active state, and spring transitions.
   - Run `tests/responsive-mobile.spec.js` and `tests/no-em-dash.spec.js`.
   - Verify production build.
