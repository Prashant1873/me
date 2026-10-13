# Phase 1: Project Scaffolding & Design System

## Goal

Initialize the Vite project with Three.js + GSAP, and codify the **Structured Intensity** design language into a complete CSS design system. Deliver a working dev server with all fonts loaded, all design tokens defined, and a demo page that proves the visual foundation is correct before building any sections.

## Requirements Covered

FOUND-01, FOUND-02, FOUND-03, FOUND-05, FOUND-06

## Plans

### Plan 1: Vite Project Initialization
**Priority:** P0 — everything depends on this
**Type:** setup
**Estimated effort:** small

#### Tasks

1. **Initialize Vite vanilla JS project**
   - Run `npm create vite@latest ./ -- --template vanilla` in the AboutMe directory
   - This creates: `index.html`, `main.js`, `style.css`, `vite.config.js`, `package.json`
   - Verify `npm run dev` serves on localhost

2. **Install core dependencies**
   ```bash
   npm install three gsap
   ```
   - Three.js for 3D graphics
   - GSAP (includes ScrollTrigger plugin) for animations

3. **Configure Vite for GitHub Pages deployment**
   - Update `vite.config.js`:
     ```javascript
     import { defineConfig } from 'vite';

     export default defineConfig({
       base: './',
       server: {
         host: true,
         port: 3000,
       },
       build: {
         outDir: 'dist',
         assetsDir: 'assets',
         sourcemap: false,
       },
     });
     ```

4. **Create source directory structure**
   ```
   src/
   ├── styles/
   │   ├── design-system.css    # All tokens, typography, colors, grid
   │   ├── reset.css            # CSS reset / normalize
   │   └── index.css            # Barrel import
   ├── js/
   │   └── main.js              # Entry point
   └── assets/
       └── (empty, for future images/resume)
   ```

5. **Set up .gitignore**
   - Add: `node_modules/`, `dist/`, `.DS_Store`
   - Keep existing `.planning/` tracked

6. **Verify**: `npm run dev` opens in browser, no errors in console

#### Must-haves
- [ ] `npm run dev` works
- [ ] `npm run build` produces static output in `dist/`
- [ ] Three.js and GSAP importable without errors
- [ ] Source structure matches planned layout

---

### Plan 2: CSS Reset & Google Fonts
**Priority:** P0 — typography is the spine of Structured Intensity
**Type:** implementation
**Estimated effort:** small
**Depends on:** Plan 1

#### Tasks

1. **Create CSS reset** (`src/styles/reset.css`)
   - Box-sizing border-box on all elements
   - Zero margins/padding on body, html
   - Smooth scroll behavior on html
   - Antialiased text rendering (`-webkit-font-smoothing: antialiased`)

2. **Load Horizon font via CDN** in `index.html`
   ```html
   <link href="https://fonts.cdnfonts.com/css/horizon" rel="stylesheet">
   ```
   - **Horizon** — geometric display font for hero headlines only (uppercase)

3. **Load Google Fonts in `index.html`**
   - Add preconnect hints and font links in `<head>`:
     ```html
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
     ```
   - Fonts:
     - **Plus Jakarta Sans** (400 regular, 500 medium, 600 semibold, 700 bold) — body, headings, UI
     - **IBM Plex Mono** (400 regular, 500 medium) — technical metadata
     - **Newsreader** (400 regular, 400 italic) — editorial statements

4. **Set up barrel import** (`src/styles/index.css`)
   ```css
   @import './reset.css';
   @import './design-system.css';
   ```

5. **Import styles in main.js**
   ```javascript
   import './styles/index.css';
   ```

#### Must-haves
- [ ] Horizon font renders from CDN (geometric uppercase display)
- [ ] Plus Jakarta Sans, IBM Plex Mono, Newsreader load from Google Fonts
- [ ] Font weights match the design language spec
- [ ] No FOUT (flash of unstyled text) — `display=swap` in font URLs

---

### Plan 3: Design System — Color Tokens & Dark/Light Mode Foundation
**Priority:** P0 — colors define the visual identity
**Type:** implementation
**Estimated effort:** medium
**Depends on:** Plan 2

#### Tasks

1. **Define color custom properties** in `src/styles/design-system.css`
   ```css
   :root {
     /* === Structured Intensity Color System === */

     /* Primary palette */
     --color-black: #000000;
     --color-warm-ivory: #F1EEE5;
     --color-royal-blue: #2962FF;
     --color-coral: #E8655A;

     /* Neutrals (true black spectrum) */
     --color-grey-950: #0A0A0A;
     --color-grey-900: #141414;
     --color-grey-800: #1F1F1F;
     --color-grey-700: #2E2E2E;
     --color-grey-600: #444444;
     --color-grey-500: #666666;
     --color-grey-400: #888888;
     --color-grey-300: #AAAAAA;
     --color-grey-200: #CCCCCC;
     --color-grey-100: #E0E0E0;

     /* Semantic tokens (resolved per theme) */
     --bg-primary: var(--color-black);
     --bg-secondary: var(--color-grey-950);
     --bg-surface: var(--color-grey-900);
     --text-primary: var(--color-warm-ivory);
     --text-secondary: var(--color-grey-300);
     --text-muted: var(--color-grey-500);
     --accent-primary: var(--color-royal-blue);
     --accent-warm: var(--color-coral);
     --border-subtle: var(--color-grey-800);
     --border-strong: var(--color-grey-600);
   }

   /* Light mode overrides */
   [data-theme="light"] {
     --bg-primary: var(--color-warm-ivory);
     --bg-secondary: #E8E4DB;
     --bg-surface: #DEDACE;
     --text-primary: var(--color-black);
     --text-secondary: var(--color-grey-600);
     --text-muted: var(--color-grey-400);
     --border-subtle: var(--color-grey-200);
     --border-strong: var(--color-grey-400);
   }
   ```

2. **Apply base theme to body**
   ```css
   body {
     background-color: var(--bg-primary);
     color: var(--text-primary);
     transition: background-color 280ms ease, color 280ms ease;
   }
   ```

3. **Verify WCAG 2.2 AA contrast ratios**
   - `--text-primary` on `--bg-primary` (dark): #F1EEE5 on #000000 → contrast ratio ≥ 15:1 ✓
   - `--text-secondary` on `--bg-primary`: #AAAAAA on #000000 → ~7.4:1 ✓
   - `--accent-primary` on `--bg-primary`: #2962FF on #000000 → ~4.2:1 ✓ (AA for large text)
   - `--accent-warm` on `--bg-primary`: #E8655A on #000000 → ~4.5:1 ✓

#### Must-haves
- [ ] All color tokens defined as CSS custom properties
- [ ] Dark mode renders correctly (default)
- [ ] Light mode renders correctly when `data-theme="light"` is set on `<html>`
- [ ] All text/background combinations pass WCAG 2.2 AA

---

### Plan 4: Design System — Typography Scale
**Priority:** P0 — typography carries the system per design doc
**Type:** implementation
**Estimated effort:** medium
**Depends on:** Plan 3

#### Tasks

1. **Define typography custom properties**
   ```css
   :root {
     /* === Typography System === */

     /* Font families */
     --font-hero: 'Horizon', 'Orbitron', sans-serif;
     --font-primary: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
     --font-technical: 'IBM Plex Mono', 'Fira Code', monospace;
     --font-expressive: 'Newsreader', 'Georgia', serif;

     /* Font sizes — desktop reference (will scale responsively) */
     --text-hero: clamp(3rem, 5vw, 5rem);        /* 48-80px */
     --text-section: clamp(1.75rem, 3vw, 2.5rem); /* 28-40px */
     --text-subsection: clamp(1.25rem, 2vw, 1.5rem); /* 20-24px */
     --text-body: clamp(1rem, 1.125vw, 1.125rem);  /* 16-18px */
     --text-ui: clamp(0.75rem, 0.875vw, 0.875rem);  /* 12-14px */
     --text-mono: clamp(0.6875rem, 0.8vw, 0.8125rem); /* 11-13px */
     --text-editorial: clamp(2rem, 3.5vw, 3.5rem); /* 32-56px */

     /* Font weights */
     --weight-regular: 400;
     --weight-medium: 500;
     --weight-semibold: 600;
     --weight-bold: 700;

     /* Line heights */
     --leading-tight: 1.1;
     --leading-snug: 1.25;
     --leading-normal: 1.5;
     --leading-relaxed: 1.65;

     /* Letter spacing */
     --tracking-tight: -0.02em;
     --tracking-normal: 0;
     --tracking-wide: 0.05em;
     --tracking-hero: 0.15em;
     --tracking-mono: 0.08em;
   }
   ```

2. **Create utility classes for typography roles**
   ```css
   .text-hero {
     font-family: var(--font-hero);
     font-size: var(--text-hero);
     font-weight: var(--weight-regular);
     line-height: var(--leading-tight);
     letter-spacing: var(--tracking-hero);
     text-transform: uppercase;
   }

   .text-section {
     font-family: var(--font-primary);
     font-size: var(--text-section);
     font-weight: var(--weight-semibold);
     line-height: var(--leading-snug);
   }

   .text-body {
     font-family: var(--font-primary);
     font-size: var(--text-body);
     font-weight: var(--weight-regular);
     line-height: var(--leading-relaxed);
   }

   .text-mono {
     font-family: var(--font-technical);
     font-size: var(--text-mono);
     line-height: var(--leading-normal);
     letter-spacing: var(--tracking-mono);
   }

   .text-editorial {
     font-family: var(--font-expressive);
     font-size: var(--text-editorial);
     font-weight: var(--weight-regular);
     line-height: var(--leading-snug);
     font-style: italic;
   }
   ```

#### Must-haves
- [ ] All 4 font families render at correct sizes
- [ ] `clamp()` values produce correct sizes at 320px, 768px, 1440px viewports
- [ ] Hero text is Horizon uppercase 56-80px with wide tracking
- [ ] Body/section text is Plus Jakarta Sans
- [ ] Mono text is IBM Plex Mono 11-13px range
- [ ] Editorial text is Newsreader 32-56px italic

---

### Plan 5: Design System — Spacing, Grid & Layout Tokens
**Priority:** P0 — the grid is the skeleton
**Type:** implementation
**Estimated effort:** medium
**Depends on:** Plan 3

#### Tasks

1. **Define spacing scale** (8px base system per design doc)
   ```css
   :root {
     /* === Spacing System (8px base) === */
     --space-1: 0.25rem;   /* 4px */
     --space-2: 0.5rem;    /* 8px */
     --space-3: 0.75rem;   /* 12px */
     --space-4: 1rem;      /* 16px */
     --space-5: 1.5rem;    /* 24px */
     --space-6: 2rem;      /* 32px */
     --space-8: 3rem;      /* 48px */
     --space-10: 4rem;     /* 64px */
     --space-12: 6rem;     /* 96px */
     --space-16: 8rem;     /* 128px */

     /* === Layout === */
     --grid-columns: 12;
     --grid-gap: var(--space-5);         /* 24px */
     --grid-margin: var(--space-10);     /* 64px — generous outer margins */
     --grid-margin-mobile: var(--space-4); /* 16px on mobile */

     /* Section heights */
     --section-min-height: 100vh;

     /* Corner radii — mostly 4-8px per design doc */
     --radius-sm: 4px;
     --radius-md: 6px;
     --radius-lg: 8px;
     --radius-xl: 12px;

     /* Borders — thin 1px in muted grey per design doc */
     --border-width: 1px;
     --border-style: solid;
   }
   ```

2. **Create grid container class**
   ```css
   .grid-container {
     display: grid;
     grid-template-columns: repeat(var(--grid-columns), 1fr);
     gap: var(--grid-gap);
     max-width: 1440px;
     margin-inline: auto;
     padding-inline: var(--grid-margin);
   }

   @media (max-width: 768px) {
     .grid-container {
       padding-inline: var(--grid-margin-mobile);
       gap: var(--space-4);
     }
   }
   ```

3. **Define motion timing tokens**
   ```css
   :root {
     /* === Motion (160-280ms per design doc) === */
     --duration-instant: 100ms;
     --duration-fast: 160ms;
     --duration-normal: 220ms;
     --duration-slow: 280ms;
     --duration-narrative: 600ms;    /* For storytelling sequences */

     --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
     --ease-out: cubic-bezier(0, 0, 0.25, 1);
     --ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
     --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
   }
   ```

#### Must-haves
- [ ] 12-column grid visible in browser dev tools
- [ ] Grid has generous outer margins (64px desktop, 16px mobile)
- [ ] Spacing scale follows 8px base (4, 8, 12, 16, 24, 32, 48, 64)
- [ ] Motion timings defined within 160-280ms range
- [ ] Corner radii are 4-8px (not excessive pill shapes)

---

### Plan 6: Design System Demo Page
**Priority:** P1 — proves the system works visually before building sections
**Type:** verification
**Estimated effort:** medium
**Depends on:** Plans 2, 3, 4, 5

#### Tasks

1. **Build demo page in `index.html`** showcasing all design tokens:

   **Section 1: Color Palette**
   - Swatches for all colors (Pure Black, Warm Ivory, Royal Blue, Coral, grey scale)
   - Side-by-side dark/light mode display
   - Contrast ratio labels on text/bg combinations

   **Section 2: Typography Scale**
   - All 7 type roles rendered with actual text:
     - Hero headline: "PRECISION IN THOUGHT."
     - Section heading: "Professional Experience"
     - Body text: Sample paragraph about Prashant
     - UI label: "2026 — Present"
     - Technical metadata: "48.8566° N, 2.3522° E"
     - Editorial statement: *"Depth in Expression."*

   **Section 3: Spacing & Grid**
   - Visual grid overlay showing 12 columns
   - Spacing scale visualization (colored blocks at each step)

   **Section 4: Signature Motifs Preview**
   - A fine 1px horizontal rule (editorial rule)
   - A small section identifier in IBM Plex Mono
   - The three design philosophy lines from the design doc:
     > PRECISION IN THOUGHT.
     > DEPTH IN EXPRESSION.
     > INTENT IN EXECUTION.

2. **Add a simple theme toggle button** (temporary, for verification)
   - Click toggles `data-theme` attribute on `<html>`
   - Button styled with Structured Intensity tokens
   - Transitions use `--duration-normal` (220ms)

3. **Take screenshots for review** — visual proof of the system

#### Must-haves
- [ ] All color swatches render correctly in both themes
- [ ] All 7 typography roles visible and correctly styled
- [ ] Grid overlay shows 12 columns with correct margins
- [ ] Theme toggle transitions smoothly (220ms)
- [ ] Page looks and feels like "Structured Intensity" — not generic

---

## Verification Checklist

After all plans are executed:

- [ ] `npm run dev` starts Vite dev server without errors
- [ ] `npm run build` produces clean static output
- [ ] All 4 fonts load (Horizon via CDN, Plus Jakarta Sans, IBM Plex Mono, Newsreader)
- [ ] All CSS custom properties defined (colors, typography, spacing, motion, grid)
- [ ] 12-column grid with 64px margins visible
- [ ] Dark mode is default, light mode toggleable
- [ ] WCAG 2.2 AA contrast ratios pass for all text/bg combinations
- [ ] Design system demo page renders all tokens visually
- [ ] The page "feels" like Structured Intensity — industrial, editorial, warm, not generic

---

## Risks

| Risk | Mitigation |
|------|------------|
| Google Fonts FOUT on slow connections | `display=swap` + `preconnect` hints |
| CSS custom property browser support | All modern browsers support; no IE11 concern |
| clamp() responsive sizing edge cases | Test at 320px, 768px, 1440px, 2560px breakpoints |
| Vite config conflicts with existing repo | Clean init in project root, `.gitignore` protects `node_modules/` |

---
*Plan created: 2026-10-13*
*Phase: 01 — Project Scaffolding & Design System*
