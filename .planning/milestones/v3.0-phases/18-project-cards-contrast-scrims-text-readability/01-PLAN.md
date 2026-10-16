# Phase 18: Project Cards Contrast, Scrims & Text Readability

## Context & Objectives
Ensure 100% effortless readability and contrast for all text elements across the 6 project cards:
- Eyebrows / category tags (e.g., "Fintech & Compounding", "Healthcare AI & Workflow", "Supply Chain & B2B Logistics")
- Card headers / titles (`.project-card__title`)
- Card one-liner descriptions (`.project-card__desc`)
- Status tags and bottom tech stack badges

All text must achieve WCAG AA contrast in dark and light themes over high-resolution project screenshot backdrops, while preserving background screenshot visibility and satisfying existing layout rules (`blur <= 4px`, `brightness >= 0.8`, `row gap <= 36px`).

## Requirements Covered
- **PROJ-10**: High-contrast, styled category badges / eyebrows with crisp background pill backing and legibility over busy screenshot textures.
- **PROJ-11**: Headings and descriptions calibrated with high-contrast color tokens and dark/light mode scrim protection.

## Implementation Tasks
1. **Card Background & Scrim Calibration (`src/styles/projects.css`)**:
   - Deepen `.project-card__backdrop` linear gradient in dark mode (`rgba(6, 10, 20, 0.72)` to `rgba(8, 14, 28, 0.86)`) and light mode (`rgba(255, 255, 255, 0.82)` to `rgba(248, 250, 252, 0.92)`).
   - Set backdrop blur at 3.5px (maintains `<= 4px` test requirement).
   - On hover, keep comfortable contrast veil (`rgba(6, 10, 20, 0.62)` to `rgba(8, 14, 28, 0.78)` with `blur(2.5px)`).
2. **Text & Badge Styling (`src/styles/projects.css`)**:
   - Style `.project-card__category` with a tactical micro-capsule pill: dark mode background `rgba(6, 10, 22, 0.75)`, border `1px solid rgba(56, 189, 248, 0.25)`, glowing cyan text `#38bdf8`, light mode crisp slate/blue.
   - Add focal center scrim behind `.project-card__middle` using an elliptical radial gradient to guarantee description and title isolation from background noise.
   - Refine `.project-card__title` with pure contrast `#ffffff` (dark) and `#0f172a` (light) with calibrated drop shadows.
   - Refine `.project-card__desc` with high-contrast `rgba(241, 245, 249, 0.94)` (dark) and `#334155` (light) with crisp shadow.
   - Style `.project-card__tags .project-tag` with higher contrast pill backgrounds.
3. **Verification**:
   - Write automated Playwright test `tests/projects-contrast.spec.js` asserting contrast properties and text visibility across both themes.
   - Run full project test suite (`tests/projects.spec.js`, `tests/projects-backdrop-layout.spec.js`, `tests/projects-contrast.spec.js`, `tests/no-em-dash.spec.js`).
   - Verify production build.
