# Phase 13 Context: Projects Section Layout & Backdrop Clarity

## Background & Problem Statement
The Projects section presents 6 canonical case studies in a 2x3 grid. Two layout and aesthetic issues compromise its impact:
1. **Excessive Background Blur & Opaque Scrim:** The card screenshot background is currently occluded by `backdrop-filter: blur(14px)` and near-90% opaque gradient veils (`rgba(..., 0.78 to 0.88)`). The screenshots are completely obscured into a blurry fog, preventing viewers from seeing any hint of the actual product UI, maps, charts, or screener tables.
2. **Disjointed Vertical Layout & Row Gap:** The grid container uses `flex: 1` with `grid-template-rows: repeat(2, 1fr)` while `.project-card` is capped at `clamp(140px, 20vh, 180px)`. This causes the two rows of 3 cards to stretch across the full viewport with an enormous empty gap (100–140px) between row 1 and row 2. The cards are not vertically centered as a coherent cluster.

## Target Experience & Requirements
- **PROJ-08 (Calibrated Backdrop Blur & Screenshot Preview Clarity):**
  - Reduce `backdrop-filter` from `blur(14px)` to `blur(2.5px)` so the UI layout and features in the background screenshot are clearly recognizable.
  - Lower veil gradient opacity from 80–90% down to 40–60% in dark mode and 50–70% in light mode.
  - Boost `brightness` on `.project-card__bg-img` to ~0.85 (dark mode) and ~0.96 (light mode).
  - Add clean text drop-shadows to ensure high contrast and WCAG AA readability over the visible screenshot preview.
- **PROJ-09 (Vertical Centering & Uniform 2x3 Grid Spacing):**
  - Change `.projects-grid` row definition from `repeat(2, 1fr)` with stretched tracks to `repeat(2, auto)` with cohesive uniform gaps (`clamp(14px, 1.8vw, 24px)`).
  - Center the entire 6-card grid vertically (`justify-content: center`, `align-items: center`, `margin: auto 0`) within the section viewport chassis.
  - Set comfortable, proportional card heights (`clamp(160px, 22vh, 210px)`).

## Affected Files
- `src/styles/projects.css`
- `tests/projects-backdrop-layout.spec.js`
