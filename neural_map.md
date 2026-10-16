# Neural Map: Prashant Shukla Portfolio

## Architecture Overview

```
Single-Page Scrollable Portfolio
├── Vite (build tool, dev server, static export)
├── Vanilla JS (no framework)
├── Three.js (3D rendering)
│   ├── Hero: Orbital geometry canvas (concentric circles, trajectories)
│   ├── Experience: Horizontal X-axis linear spatial track (company logo medallions, orbs, conduit)
│   ├── Per-section: Interactive 3D objects
│   ├── Background: Terrain landscape + particle systems
│   └── Global: Parallax depth layers on scroll
├── GSAP (animation engine)
│   ├── ScrollToPlugin (1 swipe = 1 page full viewport navigation)
│   ├── Timeline (entrance sequences, bloom, milestone transitions)
│   ├── Section transitions (cinematic reveals)
│   └── UI micro-interactions (hover, expand/collapse)
└── CSS (Structured Intensity design system)
    ├── Custom properties (tokens, standardized grid margins)
    ├── 12-column grid
    ├── Dark/light mode
    └── Typography scale (Manrope / IBM Plex Mono / Newsreader)
```

## Experience Subsystem Architecture (`src/js/experience-canvas.js` & `src/js/experience.js`)
- **Spatial X-Axis Traversal:** Reverse CV order `[x = -12 (IQVIA 2026), -6 (Revolut 2025), 0 (Ketto 2025), 6 (Kalam Labs 2024), 12 (FAOUD 2024)]`. Strict linear bounds, no infinite loop.
- **Visual Nodes:** Company medallions with double-sided transparent logo textures, hardware depth occluder disc (`colorWrite: false`, `depthWrite: true`, radius 1.40) enforcing realistic Z-axis depth culling so revolving orbit particles vanish behind logos, scaled prominent celestial particles (1.25–1.45 size), high-contrast light-mode tungsten tones, and interconnecting glowing energy conduit.
- **Attached Detailed Card (Option A):** Anchored directly below the centered 3D orb with live progress track and date rail markers.
- **Filter State Engine:** Non-matching company nodes dim to 15% opacity with 400ms bloom on filter restore.
- **Calendar Modal Subsystem:** Minimalist multi-year grid (2024–2026) featuring borderless mosaic tiles with rich, saturated dark jewel/obsidian palettes (`#0F2752`, `#083344`, `#064E3B`, `#2E1065`, `#5B1818`), high-contrast crisp off-white typography, and white company emblems across both themes.

## Projects Subsystem Architecture (`src/js/projects.js` & `src/js/projects-data.js`)
- **Uniform 2x3 Grid & Identifiable Backdrops:** 6 canonical projects with authentic screenshot hero cards, calibrated subtle backdrop blur (`2.5px`, down from opaque 14px fog), translucent scrims, and enhanced image brightness letting product UI previews shine through.
- **Atmospheric Feathering Vignette (No Box Artifacts):** `.project-card__middle` replaced rectangular box background with an elliptical radial vignette (`ellipse 100% 90% at 50% 50%`) and dual-axis radial feathering mask (`mask-image: radial-gradient(ellipse 95% 85% at 50% 50%, black 35%, transparent 100%)`) providing high-contrast text backing with zero hard edges or rectangular container lines.
- **Unified 9999px Capsule Pill System:** All card and modal pills (`.project-card__category`, `.project-card__status-tag`, `.project-tag`, `.modal-header__category`, `.modal-innovation-metric`, `.modal-tech-pill`) adhere strictly to the website capsule pill geometry (`border-radius: 9999px`, `var(--font-primary)` Plus Jakarta Sans, optical vertical centering). Dark mode utilizes obsidian backings with luminous cyan/slate borders and specular reflection highlights; light mode utilizes crisp porcelain/white gradients with high-contrast text (4.5:1 to 16:1 contrast ratios).
- **Tactile High-Contrast Action Buttons:** Replaced unstyled trigger text and naked icons with dual tactile capsule buttons in `.project-card__footer`:
  - *Primary Action (`.project-btn--case-study`):* Radiant blue capsule with arrow icon, dark mode luminous glow, and solid `#0284C7` (light mode) with pure white text.
  - *Secondary Action (`.project-btn--website`):* Obsidian (dark) or crisp white (light) button linking directly to live website when available (`liveUrl`) or GitHub repository (`githubUrl`) with external link indicator icon.
- **Vertical Centering & Compact Row Spacing:** Grid tracks refactored to `repeat(2, auto)` with `gap: clamp(14px, 1.8vw, 24px)` and `margin: auto 0`, eliminating excessive 140px vertical row gaps and centering all 6 cards harmoniously in the viewport.
- **GSAP Origin-Aware Bounding Box Modal:** Expand/collapse tween (`power3.out`, 240ms) interpolating coordinates from clicked card `getBoundingClientRect()` to viewport modal chassis (`92vw × clamp(540px, 92vh, 920px)` with `94vh` at `<=820px` height).
- **Two-Column Cinematic Cockpit:** 7-column interactive slideshow with chevrons, thumbnail filmstrip, and caption bar; 5-column punchy italic narrative statement, 3-item innovation proof grid with authentic metrics, tech pills (`Next.js 16`, `React 19`, etc.), and secure CTAs (`rel="noopener noreferrer"`). All right-pane elements utilize fluid clamp vertical density (`clamp(14px, 1.8vh, 22px)` padding, `clamp(8px, 1.2vh, 16px)` gaps, `clamp(32px, 3.8vh, 38px)` CTA heights) with thin custom scrollbar fallback, guaranteeing zero off-screen push or pill cropping on 720p/768p laptop viewports.
- **Card Footer Tag Containment:** `.project-card__tags` configured with `flex-wrap: nowrap`, `overflow: hidden`, and `flex-shrink: 0` on `.project-tag` badges, displaying the top 2 primary stack badges (`Next.js 16` and `React 19` for BickerBape) in pristine, uncropped 9999px capsules alongside the `Case Study` and `Website`/`Code` action buttons.
- **Accessibility & Traversal Engine:** In-modal prev/next project navigation, keyboard `ArrowLeft`/`ArrowRight` slide navigation, `Escape` close, focus trapping with `inert` on `#site-nav` and `<main>`, and strict wheel/touch scroll isolation preventing background page movement.

## Education Subsystem Architecture (`src/js/education.js` & `src/js/education-data.js`)
- **Triple-Pillar Showcase Grid:** 3 structured cards with industrial dark elevated backgrounds and theme-specific accent borders:
  - *Academics:* IIT Bombay Aerospace Engineering (B.Tech) with authentic crest, plus dual Gold Medals for CMS (ISC Examination Class XII, 98.25%) and St. Francis (ICSE Examination Class X, 98.00%) with institutional crests. Clean single mentions of graduation and gold medals with zero redundant meta badge rows.
  - *High-Contrast Capsule Pills:* Sculpted 9999px capsule geometry for metrics and badges with theme-aware high-contrast palettes: dark mode utilizes obsidian/black backgrounds (`#000000`) with glowing cyan/amber/slate borders and crisp `#FFFFFF` values; light mode utilizes refined frosted porcelain and tinted glass gradients (`#FFFFFF` to `#F0F9FF` / `#FEF3C7`) with high-contrast `#0284C7` (blue), `#B45309` (amber), and `#0F172A` (charcoal) values (5:1 to 18:1 contrast ratios).
  - *Symmetric Optical Vertical Centering:* Eliminates top-heavy ascent drift across `.gov-kpi-chip`, `.edu-metric-capsule`, `.creative-badge`, and `.skill-pill` by using calibrated symmetric vertical padding (`clamp(5.5px, 0.75vh, 6.5px)` for chips, `clamp(4px, 0.55vh, 5px)` for capsules), `align-items: center; justify-content: center;`, and `align-self: center;` on optical dividers, achieving verified 0 to 0.5px sub-pixel vertical alignment in both light and dark themes.
  - *Campus Governance (Hero Number Tags):* Sentences completely removed to avoid restating metric data. Highlighted with prominent 2x2 grid of enlarged capsule number tags (`₹10M+ · Budget`, `50K+ · Footfall`, `150+ · Team Led`, `₹20M+ · Raised` for Abhyuday; `2,000+ · Candidates`, `40+ · Recruiters`, `16-Wk · Bootcamp`, `100% · Placement Support` for Placement Cell) with bold numbers, centered optical dividers, and luminous cyan accents.
  - *Creative & Athletics (Vector Iconography):* Zero informal emojis; bespoke vector SVG icons for Stage (theatrical mask), Speaking (broadcast mic), Athletics (victory trophy), and Gold Medals (vector medallion badge).
- **Categorized Skills Matrix & Fluid Clearance:** Interactive micro-pills split across Strategy & Product, Data Analytics, and Automation & AI with micro-hover accent elevations and smooth capsule radii. Compact fluid clearance (`padding-top: calc(64px + clamp(4px, 0.7vh, 12px))`, `--edu-card-gap: clamp(5px, 0.85vh, 14px)`, `padding: clamp(3px, 0.45vh, 6px)`) guarantees `DAX Architecture` and `API Architecture` remain fully visible with generous bottom clearance across 720p, 768p, 900p, and 1080p viewports.
- **Strict 100vh Containment:** Content fits inside 100vh with verified bottom clearances across all standard display viewports.

## Navigation & Routing Synchronization (`src/js/section-scroll.js`)
- **URL Hash & Reload State Preservation:** Navigation transitions call `history.replaceState` to synchronize active section hashes (`#hero`, `#experience`, `#projects`, `#education`, `#contact`).
- **Initial Section Detection:** On page load or browser refresh, `getInitialSectionIndex()` resolves the current section from `window.location.hash` or restored `window.scrollY` offset, ensuring the top navigation bar immediately and persistently points to the active page rather than resetting to Home.

## Global Section Layout & Heading Anchoring (`src/styles/design-system.css` & `src/styles/sections.css`)
- **Hero Vertical Centering:** The Hero section maintains its immersive, vertically-centered orientation (`display: flex; align-items: center; justify-content: center;` with centered grid container) to balance headline, badges, and 3D orbital canvas within the full viewport.
- **Unified Vertical Y-Anchor for Content Sections:** All four subsequent sections (`#experience`, `#projects`, `#education`, `#contact`) share the exact same `--section-padding-top: calc(64px + clamp(12px, 1.8vh, 22px))` with `display: flex; flex-direction: column;` on `.section__header`.
- **Zero Heading Jitter:** Measured section tag offset is identical at `80.1875px` across all content sections (`0.00000px` variance) and title offset at `103.046875px`, anchoring page-to-page navigation smoothly.

## Contact Subsystem Architecture (`src/js/contact.js` & `src/js/contact-data.js`)
- **4-Card Interactive Action Row:** Direct high-contrast cards for LinkedIn, GitHub, Email, and Phone with micro-hover physics.
- **1-Click Clipboard Engine:** Clicking Email triggers clipboard copy with instant 2s visual confirmation toast and copy icon feedback.
- **Resume Download Chassis:** Prominent CTA linking to authentic resume text/PDF asset with dual action buttons.
- **Newsreader Editorial Statement:** Closing statement in expressive Newsreader italic serif with royal blue quotation mark: *"Engineering rigor meets behavioral empathy - building systems that outlast their creators and products people genuinely love."*
- **Anchored Site Footer:** Minimalist footer with copyright, tech stack specs, and coordinates anchored inside the single 100vh screen.

## Page Flow (Top to Bottom)

1. **Hero** → Full viewport, 3D orbital canvas, name + narrative statement
2. **Experience** → 3D timeline, 7 entries across 4 categories
3. **Projects** → 6 cinematic case-study cards, click-to-expand
4. **Education** → IIT Bombay, achievements, extracurriculars
5. **Contact** → Links (LinkedIn, GitHub, Email, Phone), resume PDF, editorial closing

## Design System: Structured Intensity

- Primary Dark: `#000000` (Pure Black)
- Primary Light: `#F1EEE5` (Warm Ivory)
- Accent 1: `#2962FF` (Royal Blue)
- Accent 2: `#E8655A` (Coral)
- Fonts: Horizon (hero display), Plus Jakarta Sans (primary body/UI), IBM Plex Mono (technical), Newsreader (expressive)
- Motion: 160–280ms for UI, longer for narrative
- Grid: 12-column, 8px base spacing

## Key Files (Planned)

```
src/
├── index.html          # Single page with all sections
├── styles/
│   ├── design-system.css  # Tokens, typography, colors, grid
│   ├── sections.css       # Per-section styling
│   └── components.css     # Cards, buttons, nav, toggle
├── js/
│   ├── main.js            # Entry point, section orchestrator
│   ├── section-scroll.js  # Elastic full-viewport scroll controller & boundary physics
│   ├── hero-canvas.js     # Three.js orbital wireframe core & particles
│   ├── experience/
│   │   ├── timeline3d.js  # Three.js 3D timeline
│   │   ├── data.js        # Experience entries data
│   │   └── filters.js     # Category filtering
│   ├── projects/
│   │   ├── cards.js       # Case-study card logic
│   │   ├── slideshow.js   # Screenshot slideshow
│   │   └── data.js        # Project entries data
│   ├── sections/
│   │   ├── education.js   # Education section
│   │   └── contact.js     # Contact section
│   └── 3d/
│       ├── terrain.js     # Background terrain landscape
│       ├── particles.js   # Particle systems
│       └── parallax.js    # Depth layers
└── assets/
    ├── fonts/             # (Google Fonts CDN, no local files)
    ├── images/            # Project screenshots, logos
    └── resume.pdf         # Downloadable resume
```

## Responsive & Mobile Adaptation Subsystem Architecture (Phase 8)
- **Dual-Mode Scroll Engine:**
  - *Desktop (> 1024px, pointer: fine):* Strict 100vh full-page snap scroll with trackpad cooldown and 1 swipe = 1 section jump.
  - *Mobile/Tablet (<= 1024px or pointer: coarse):* Wheel/touch interception disabled; sections expand to `min-height: 100vh; height: auto;` allowing natural touch scrolling through taller multi-card sections. `IntersectionObserver` dynamically synchronizes the active nav item.
- **Mobile Navigation Drawer Subsystem (`NAV-04`):**
  - `#nav-toggle` (44px × 44px) morphs 3-bar hamburger to "X" with spring physics.
  - `#mobile-nav-drawer` full-screen/right-slide glass panel (`backdrop-filter: blur(20px)`) with focus trap, Escape key handling, and auto-closing on section selection.
- **Touch & Accessibility Subsystem (`RESP-04`, `RESP-05`):**
  - All interactive buttons, nav links, filter tabs, modal close triggers, and cards adhere to WCAG 2.5.5 / 2.5.8 minimum tap target area (≥ 44px × 44px).
  - Explicit `:focus-visible` outline rings (`2px solid var(--accent-primary)`) with logical tab cycle.
  - Verified WCAG 2.2 AA contrast across Dark Mode (`#000000`/`#141414`) and Light Mode (`#FFFFFF`/`#F6F7F9`).
- **Mobile 3D Canvas Adaptation:**
  - Hero 3D canvas positioned in background with opacity 0.28 on mobile.
  - WebGL pixel ratio capped at `Math.min(window.devicePixelRatio, 1.5)` on mobile to prevent GPU thermal throttling.
  - IntersectionObserver throttles/pauses rendering loop when off-screen.

## Projects Card Geometry & Backdrop Architecture (Post-Milestone 2)
- **Aspect Ratio Calibration:** `.project-card` enforces `aspect-ratio: 16 / 9; height: auto; min-height: 180px;`. This dynamically locks the card height to its computed column width (e.g. 212px at 1280x720, 239px at 1440x900, 253px at 1920x1080).
- **Background Screenshot Geometry:** Matches canonical 16:9 / 1.85:1 project dashboard screenshots. `.project-card__bg-img` configured with `object-fit: cover; object-position: center; transform: none;`, eliminating vertical bottom-cutoff and premature zoom-cropping while retaining subtle `1.03` hover zoom.
- **Strict Viewport Containment:** 2-row grid bottom reaches ~668px at 720px viewport, leaving ~51px safety margin above the 720px boundary without page scrollbars.

## Education Full-Width Stacked Cards & Unified Gap Architecture (Post-Milestone 2)
- **100% Width Stacked Pillar Rows:** `.education-pillars` converted from 3 columns to `display: flex; flex-direction: column; width: 100%;`. Each pillar card (Academic Excellence, High-Stakes Leadership, Stage & Synthesis) spans full section width.
- **Internal Multi-Column Horizontal Spread:**
  - *Academic Excellence:* 2-column grid (`1.2fr 1fr`). IIT Bombay featured block on left; CMS and St. Francis side-by-side (`1fr 1fr`) on right. Zero horizontal dead space.
  - *High-Stakes Leadership:* 2-column grid (`1fr 1fr`). Abhyuday and Placement Cell side-by-side with punchy metrics.
  - *Stage & Synthesis:* 3-column grid (`repeat(3, 1fr)`). Stage & Dramatics, Speaking & Comedy, and Competitive Athletics side-by-side with bespoke SVGs.
- **Strict Gap Uniformity & Doubled Inter-Card Spacing:** Doubled inter-card spacing token to `--edu-card-gap: clamp(8px, 1.35vh, 18px);`. Gap between Card 1→Card 2, Card 2→Card 3, and Card 3→Core Competencies is strictly uniform across all viewports (`14.6px` at 1080p, `9.7px` at 720p).
- **1cm Upward Shift & Header Proximity:** Shifted `.education__content` upwards by ~38px (~1 centimeter), locking `TopSpace` to `24.0px` (`Card0_Y=210.9px` at 1080p, `189.1px` at 720p), optimizing vertical balance and bottom canvas clearance.
- **Visual Highlight Numbers & Zero Sentences:** Eliminated narrative bullet paragraphs. Replaced with high-impact metric chips and badges: `AIR 1543 JEE ADV`, `₹10M+ Budget`, `50K+ Footfall`, `150+ Team Led`, `₹20M+ Raised`, `2,000+ Candidates`, `40+ Recruiters`, `16-Wk Bootcamp`, `2× Inter IIT Gold`, `3× Inter-Hostel Gold`, `Mixed Hockey Champion`, and `Basketball Champion`.
- **Enlarged Typography & Strict 100vh Containment:** Font scale expanded across institution names, roles, and skills. Bottom clearance maintains `262.4px` at 1080p and `9.9px` at 720p without scrollbars.

## Contact Section Full-Width Stacked Cards & Vertical Proportions (Post-Milestone 2)
- **Stacked Full-Width Action Row:** `.contact-action-row` set to `display: contents;`, promoting `#contact-resume` and `#contact-editorial` as direct full-width children of `.contact__content` alongside `.contact-channels`.
- **Card Vertical Scale & Logo Expansion:** Expanded contact card padding (`clamp(16px, 2.8vh, 32px) clamp(14px, 1.6vw, 22px)`), gap (`clamp(12px, 2vh, 22px)`), logo container (`clamp(42px, 5.8vh, 62px)` with `clamp(22px, 3.2vh, 34px)` SVGs), and scaled handle typography to `clamp(1.02rem, 1.7vh, 1.3rem)`. Card height expanded to **276.6px** at 1080p, **239.6px** at 900p, and **202.5px** at 720p.
- **Resume Chassis & Editorial Quote Expansion:** Resume chassis height expanded to **157.9px** at 1080p (padding `clamp(16px, 2.8vh, 32px)`, title `clamp(1.18rem, 2vh, 1.55rem)`), and editorial quote expanded to **128.7px** at 1080p (padding `clamp(16px, 2.8vh, 30px)`, quote font `clamp(1.12rem, 2vh, 1.5rem)`).
- **Reduced Awkward Inter-Card Gaps:** Total vertical card heights increased by +114.2px, reducing inter-card spacing to **63.9px** at 1080p, **41.3px** at 900p, and **13.0px** at 720p with zero vertical overflow.
- **Expansive Horizontal Resume Chassis:** `.resume-chassis` converted from narrow column box to full-width horizontal bar (`flex-direction: row; justify-content: space-between; align-items: center;`), placing official credentials on the left and CTA buttons on the right.
- **Full-Width Editorial Quote:** `.contact__quote` spans 100% width with Newsreader expressive typography and subtle accent border.

## Global Section Typography Scaling (Post-Milestone 2)
- **Fluid Scale Expansion:** `--text-section` increased from `clamp(1.75rem, 3.2vh, 2.35rem)` to `clamp(2.125rem, 3.8vh, 2.85rem)` (~34px to ~46px), enhancing title authority across all content sections (`#experience`, `#projects`, `#education`, `#contact`).
- **Subheading Proportionality:** `--text-section-sub` increased from `clamp(0.875rem, 1.4vh, 1.05rem)` to `clamp(0.975rem, 1.65vh, 1.2rem)` (~15.6px to ~19.2px) for improved scannability and contrast.
- **Hero Exclusion & Alignment Preservation:** Hero section typography (`--text-hero`, `.hero__name`, 70.4px–80px) left completely untouched. Strict vertical baseline Y-offset parity (0.00px variance) maintained across all 4 content sections.

## Milestone 3 Subsystem Architecture Upgrades
- **Photo Pipeline Subsystem (`src/js/experience.js`):** WebP assets with instant placeholder reset (`img.src = ''`), skeleton loading spinners, and proactive prefetching (`next/prev`).
- **Project Scrim & Typography Subsystem (`src/styles/projects.css`):** Radial scrims (`rgba(0, 0, 0, 0.45)`), deepened card backdrop linear gradient (`rgba(6, 10, 20, 0.84)`), micro-capsule pill category backing (`rgba(41, 98, 255, 0.16)`), and 320px viewport overflow hardening (`max-width: 100%`).
- **Education Interior Layout Engine (`src/js/education.js`, `src/styles/education.css`):** Equal 3-column academic distribution (`repeat(3, 1fr)`), clean metrics hierarchy without nested spreadsheet boxes, clean "2× GOLD MEDALIST" badge without flanking medal SVGs, and expanded 26-skill matrix eliminating empty space.
- **Editorial Subsystem (`src/js/contact-data.js`):** Streamlined single-sentence editorial statement.
- **Tactile Mobile Navigation Drawer (`src/styles/navigation.css`, `index.html`):** Semantic index numerals (`01`-`05`), directional micro-chevrons, tactile glassmorphism surfaces, and Apple fluid spring physics (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`).

