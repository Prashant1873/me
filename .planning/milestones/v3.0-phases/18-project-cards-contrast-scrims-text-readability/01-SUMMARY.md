# Phase 18 Summary: Project Cards Contrast, Scrims & Text Readability

## Execution Details
- **Phase Goal:** Calibrate project card background scrim opacity, blur gradient, and text colors so category eyebrows (e.g. Fintech & Compounding), headings, and descriptions achieve prominent, effortless contrast without obscuring product identity.
- **Delivered Requirements:** `PROJ-10`, `PROJ-11`
- **Status:** Complete & Verified

## Key Changes
1. **Micro-Capsule Category Eyebrow Pill (`src/styles/projects.css`)**:
   - Styled `.project-card__category` as a frosted micro-capsule badge (`padding: 3px 8px`, `border-radius: var(--radius-xs)`).
   - In dark mode: dark slate backing `rgba(6, 10, 22, 0.78)`, glowing cyan border `1px solid rgba(56, 189, 248, 0.28)`, high-contrast cyan `#38bdf8`, and crisp text shadow `0 1px 2px rgba(0, 0, 0, 0.85)`.
   - In light mode: clean white backing `rgba(255, 255, 255, 0.92)`, deep blue `#0369a1`, subtle border `rgba(3, 105, 161, 0.28)`.
2. **Radial Center Scrim & Typography Isolation**:
   - Added radial gradient protective backing behind `.project-card__middle` (`radial-gradient(ellipse at center, rgba(6, 10, 22, 0.68) 0%, rgba(6, 10, 22, 0.38) 60%, transparent 100%)` in dark mode, light equivalent in light mode) preventing bright screenshot textures from interfering with title or description.
   - Refined `.project-card__title` to pure white `#ffffff` with deep drop shadow `0 2px 4px rgba(0, 0, 0, 0.9), 0 0 12px rgba(0, 0, 0, 0.7)`.
   - Elevated `.project-card__desc` to high-contrast `rgba(241, 245, 249, 0.95)` with `0 1px 3px rgba(0, 0, 0, 0.9)` text shadow in dark mode, and `#1e293b` in light mode.
3. **Calibrated Backdrop Filter & Status Pills**:
   - Set `.project-card__backdrop` to `blur(3px)` (strictly respecting `<= 4px` layout requirement) with calibrated linear gradients (`0.68` to `0.84` opacity in dark mode, `0.80` to `0.90` in light mode).
   - Enhanced `.project-card__status-tag` and `.project-tag` badges with higher contrast backing and borders.
4. **Automated Verification**:
   - Created `tests/projects-contrast.spec.js` asserting category pill background, border, text color, title/desc contrast, middle scrim, and theme adaptation (3/3 passed).
   - Verified backward compatibility with `tests/projects-backdrop-layout.spec.js` (4/4 passed) and `tests/projects.spec.js` (5/5 passed).
   - Verified `tests/no-em-dash.spec.js` (2/2 passed).
   - Verified `npm run build` succeeds cleanly.
