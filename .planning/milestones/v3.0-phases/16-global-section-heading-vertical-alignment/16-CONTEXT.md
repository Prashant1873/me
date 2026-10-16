# Phase 16: Global Section Heading Vertical Alignment - Context

## 1. User Intent & Problem Statement
The user explicitly requested:
> "6. Global Page Headings: Align all section headings to the exact same vertical Y-coordinate with consistent top breathing room. Plan one phase on that."

Currently, each section uses arbitrary, mismatched `padding-top` values:
- `sections.css` base: `calc(64px + clamp(14px, 2.4vh, 32px))`
- `experience.css`: `calc(56px + clamp(10px, 1.6vh, 22px))`
- `projects.css`: `calc(64px + clamp(8px, 1.2vh, 18px))`
- `education.css`: `calc(64px + clamp(10px, 1.8vh, 24px))`
- `contact.css`: `calc(64px + clamp(12px, 2vh, 28px))` with `margin-block: auto` centering the header
- `hero`: `calc(64px + clamp(0.5rem, 2vh, 1.5rem))` with `align-items: center`

As the user navigates between sections (or scrolls through the single-page experience), section headings jump up and down erratically by 10px to 80px+, breaking the visual anchor and perceived design cohesion.

## 2. Target Design & Requirements (LAYOUT-01)
- **Unified Section Padding Variable:** Define `--section-padding-top: calc(64px + clamp(12px, 1.8vh, 22px))` in the design system token set.
- **Identical Section Tag Y-Position:** Ensure `.section-tag` in Hero, Experience, Projects, Education, and Contact sits at the exact same Y-offset from the section top (within <= 1.5px subpixel tolerance).
- **Identical Section Title Y-Position:** Ensure `.section__title` in Experience, Projects, Education, and Contact sits at the exact same Y-offset from the section top.
- **Consistent Breathing Room:** Ensure generous, balanced breathing room below the fixed 64px navigation bar without header collisions.
- **Fixed Contact Grid Offset:** Remove `margin-block: auto` from `.section--contact .grid-container` so the contact header does not sag into the vertical middle of the screen.

## 3. Files Impacted
- `src/styles/design-system.css` - Codify `--section-padding-top` token.
- `src/styles/sections.css` - Standardize base section padding and Hero section alignment.
- `src/styles/experience.css` - Standardize `.section--experience` padding and header margins.
- `src/styles/projects.css` - Standardize `.section--projects` padding and header margins.
- `src/styles/education.css` - Standardize `.section--education` padding and header margins.
- `src/styles/contact.css` - Standardize `.section--contact` padding and remove centering margin sag.
- `tests/global-heading-alignment.spec.js` - Playwright test verifying identical vertical Y-coordinates across all sections.
