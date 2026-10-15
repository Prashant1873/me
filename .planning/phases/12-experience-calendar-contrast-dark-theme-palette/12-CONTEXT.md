# Phase 12 Context: Experience Calendar Contrast & Dark Theme Palette

## Background & Problem Statement
The timeline calendar modal in the Experience section provides a multi-year matrix (2024–2026) showcasing Prashant's commercial and academic journey.
However, two visual issues undermine its presentation:
1. **Unwanted Borders on Month Boxes:** Each month cell has rigid `border: 1px solid rgba(255, 255, 255, 0.08)` and `border-left: 2px solid ...`, which look busy, boxed-in, and outdated.
2. **Weird Light/Pastel Colors:** In light mode (and partially in dark mode), company month blocks use washed-out pastel fills (`#DBEAFE`, `#CFFAFE`, `#D1FAE5`, `#EDE9FE`, `#FEE2E2`) that clash with the industrial "Structured Intensity" design system. The contrast is weak, and logos/abbreviations look muddy.

## Target Experience & Requirements
- **CAL-01 (Borderless Month Matrix):**
  - Completely remove borders from all month cells (`.timeline-month-cell` border: none).
  - Remove `border-left` from category indicators.
  - Smooth rounded corner radii (`border-radius: 6px`) with subtle gap spacing (`gap: 6px` or `7px`), creating a sleek modern mosaic tile layout.
  - Empty months and future months must also be borderless with subtle tone differences.
- **CAL-02 (Refined Dark-Themed Color System & High Contrast):**
  - Implement purposeful, rich dark jewel/obsidian tones for active company months across both themes:
    - **IQVIA:** Deep Navy Obsidian (`#0B1E3D` / `#102A56`), crisp white/ice-blue abbreviation, high-visibility logo.
    - **Revolut:** Deep Petrol Teal (`#083344` / `#0A3F50`), crisp white/cyan abbreviation, high-visibility white logo.
    - **Ketto.org:** Deep Emerald Forest (`#063A2F` / `#064E3B`), crisp mint abbreviation, high-visibility logo.
    - **Kalam Labs:** Deep Cosmic Violet (`#2E1065` / `#3B176C`), crisp lavender abbreviation, high-visibility logo.
    - **FAOUD:** Deep Garnet / Burnt Crimson (`#4C1111` / `#5B1818`), crisp coral-white abbreviation, high-visibility logo.
  - On these rich dark blocks, consistently render the crisp light/white logo variants (`exp.logoDark || exp.logo`) so company emblems jump out with razor-sharp clarity.
  - Hover states: luminous ambient glow with gentle scale (`transform: translateY(-2px) scale(1.04)`).
  - Modal container & backdrop: ensure cohesive dark elevation and WCAG AA compliant typography.

## Affected Files
- `src/styles/experience.css`
- `src/js/experience.js`
- `tests/experience-calendar-contrast.spec.js`
