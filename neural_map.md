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
- **Centered Showcase Typography & Proportions:** Enhanced `.project-card__middle` with center alignment (`text-align: center; align-items: center;`), larger prominent title (`clamp(16px, 2.2vh, 20px)`), larger legible description (`clamp(11.5px, 1.45vh, 13.5px)`), and card chassis height (`clamp(170px, 23vh, 220px)`).
- **Vertical Centering & Compact Row Spacing:** Grid tracks refactored to `repeat(2, auto)` with `gap: clamp(14px, 1.8vw, 24px)` and `margin: auto 0`, eliminating excessive 140px vertical row gaps and centering all 6 cards harmoniously in the viewport.
- **GSAP Origin-Aware Bounding Box Modal:** Expand/collapse tween (`power3.out`, 240ms) interpolating coordinates from clicked card `getBoundingClientRect()` to viewport modal chassis (`92vw × 88vh`).
- **Two-Column Cinematic Cockpit:** 7-column interactive slideshow with chevrons, thumbnail filmstrip, and caption bar; 5-column punchy italic narrative statement, 3-item innovation proof grid with authentic metrics, tech pills, and secure CTAs (`rel="noopener noreferrer"`).
- **Accessibility & Traversal Engine:** In-modal prev/next project navigation, keyboard `ArrowLeft`/`ArrowRight` slide navigation, `Escape` close, focus trapping with `inert` on `#site-nav` and `<main>`, and strict wheel/touch scroll isolation preventing background page movement.

## Education Subsystem Architecture (`src/js/education.js` & `src/js/education-data.js`)
- **Triple-Pillar Showcase Grid:** 3 structured cards with industrial dark elevated backgrounds and theme-specific accent borders:
  - *Academics:* IIT Bombay Aerospace Engineering (B.Tech 2026) with authentic crest, plus dual Gold Medals for CMS (ISC 98.25%) and St. Francis (ICSE 98.00%) with institutional crests.
  - *Campus Governance (Streamlined):* Punchy metric-first layout for Abhyuday (₹10M+ budget, 150+ team, 50,000+ footfall, ₹20M+ startup funding) and Placement Cell (2,000+ candidates, 40+ recruiters, 16-week bootcamp), highlighting quantified accomplishments and eliminating text walls for < 5s scannability.
  - *Creative & Athletics (Vector Iconography):* Zero informal emojis; bespoke vector SVG icons for Stage (theatrical mask), Speaking (broadcast mic), Athletics (victory trophy), and Gold Medals (vector medallion badge).
- **Categorized Skills Matrix:** Interactive micro-pills split across Strategy & Product, Data Analytics, and Automation & AI with micro-hover accent elevations.
- **Strict 100vh Containment:** `y = 120.9px` to `650.0px` on 1280x720 laptop screens (70px bottom clearance) with internal scroll containment.

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


