# Phase 15: Creative & Athletics Iconography Refactoring - Context

## 1. User Intent & Problem Statement
The user explicitly requested:
> "Creative & Athletics: Replace emoji glyphs (🎭, 🎙️, 🏑, 🥇) with clean bespoke vector/favicon icons. Plan one phase on that."

Informal OS-level emojis degrade the cinematic, technical aesthetic of the portfolio. They render inconsistently across operating systems (Apple, Windows, Android) and clash with the Structured Intensity design system.

## 2. Target Design & Requirements (CREAT-01)
- **Zero Emojis:** Eradicate all Unicode emoji glyphs (`🎭`, `🎙️`, `🏑`, `🥇`) from `education.js` and CSS.
- **Bespoke Vector SVG Iconography:**
  - **Stage & Dramatics:** Elegant theater comedy/drama mask SVG.
  - **Speaking & Standup Comedy:** High-definition broadcast microphone SVG.
  - **Athletics & Sports:** Precision athletic trophy / laurels SVG.
  - **2x Gold Medalist Badge:** High-finish vector medal ribbon / medallion SVG (`.medal-svg`).
- **Crisp Multi-Theme Rendering:** Vector icons inherit currentColor with accent accents (`var(--accent-warm)`, `var(--accent-primary)`, `#f59e0b` gold) looking razor-sharp in both dark and light modes.

## 3. Files Impacted
- `src/js/education.js` - Replace `getCategoryIcon` emoji returns with clean inline SVGs and replace `🥇` with SVG medal medallions.
- `src/styles/education.css` - SVG sizing, alignment, fill/stroke rules, and medal badge polish.
- `tests/creative-iconography.spec.js` - Playwright test verifying complete absence of emojis and presence of SVG vector glyphs.
