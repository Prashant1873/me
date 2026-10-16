# Phase 19: Education Page UI/UX & Card Interior Redesign

## Context & Objectives
Overhaul the visual hierarchy and internal card formatting across all 4 Education cards (Academic Excellence, High-Stakes Leadership, Stage & Synthesis, Core Competencies) to eliminate visual traffic, declutter stat representations, eliminate noisy pill overload, and deliver balanced spacing, elegant curvatures, and clean vector favicons.

Preserve the 4-card stack chassis:
1. Academic Excellence
2. High-Stakes Leadership
3. Stage & Synthesis
4. Core Competencies & Toolkits

## Requirements Covered
- **EDU-07**: Expand Core Competencies & Toolkit items and categories sourced from resume to eliminate excess blank card space.
- **EDU-08**: Equally distribute Academic Excellence space within the existing card into 3 balanced columns across IIT Bombay, CMS, and St. Francis College.
- **EDU-09**: Remove emoji and medal icons flanking "2× GOLD MEDALIST" in the Stage & Synthesis pill.
- **EDU-10**: Overhaul Education page UI/UX and card interior formatting: reduce visual traffic, declutter stat representations, eliminate noisy pill overload, and refine curvatures and iconography.

## Implementation Tasks
1. **Academic Excellence 3-Column Equal Grid (`src/js/education-data.js`, `src/js/education.js`, `src/styles/education.css`)**:
   - Change `.education-card--academics .education-card__body` from `1.25fr 1fr` into an equal 3-column grid (`repeat(3, 1fr)`).
   - Render IIT Bombay, CMS, and St. Francis College as peer cards with identical crest sizes (36px), title hierarchy, timeline pills, and clean score/honor pills.
   - Remove conflicting pill classes (`.edu-stat-chip`, `.edu-tag-pill`, `.gold-badge--warm`, etc.) in favor of unified, elegant credential pills.
2. **High-Stakes Leadership Formatting (`src/js/education.js`, `src/styles/education.css`)**:
   - Replace cluttered 4-box spreadsheet grid with clean, high-impact scannable KPI bullet lines (`.governance-bullets`) with bold `<strong>` accent numbers for Abhyuday and Placement Cell.
   - Maintain concise, authoritative hierarchy with zero nested box traffic.
3. **Stage & Synthesis Formatting & Icon Cleanliness (`src/js/education.js`, `src/styles/education.css`)**:
   - Remove flanking `${medalSvg}` icons from the `2× GOLD MEDALIST` badge in Stage & Dramatics (`EDU-09`).
   - Retain bespoke vector icons for the 3 categories (Theater, Mic, Trophy) with refined curvatures and padding.
   - Streamline highlight stat chips into clean, balanced key-value pairs.
4. **Core Competencies & Toolkit Expansion (`src/js/education-data.js`, `src/js/education.js`, `src/styles/education.css`)**:
   - Sourced from resume: expand Strategy & Product, Data Systems & Analytics, and Engineering & AI Automation domains to eliminate excess empty space on desktop.
   - Style `.skill-pill` with tactile micro-interactions and smooth curvatures.
5. **Verification**:
   - Update `tests/creative-iconography.spec.js` to assert `2× GOLD MEDALIST` has zero flanking medal SVGs.
   - Run `tests/education-contact.spec.js`, `tests/education-governance-density.spec.js`, and `tests/creative-iconography.spec.js`.
   - Verify `tests/no-em-dash.spec.js` and production build.
