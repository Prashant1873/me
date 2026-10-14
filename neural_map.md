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
- **Visual Nodes:** Company medallions with double-sided transparent logo textures, translucent outer energy spheres (`MeshPhysicalMaterial`), specular rim rings, pulsing core halos, and interconnecting energy conduit.
- **Attached Detailed Card (Option A):** Anchored directly below the centered 3D orb with live progress track and date rail markers.
- **Filter State Engine:** Non-matching company nodes dim to 15% opacity with 400ms bloom on filter restore.
- **Calendar Modal Subsystem:** Minimalist multi-year grid (2024–2026) with company theme color cells (`theme-iqvia`, `theme-revolut`, `theme-ketto`, `theme-kalam-labs`, `theme-faoud`) replacing bulky text.

## Projects Subsystem Architecture (`src/js/projects.js` & `src/js/projects-data.js`)
- **Uniform 2x3 Grid:** 6 canonical projects (BickerBape, StrokeCRM, TRINET, Know Your Archetype, CareerLoom, Marcutie) with authentic screenshot hero cards, IBM Plex Mono status tags (`[● 98/98 TESTS]`, `[● 500+ MFRS]`, etc.), and tech micro-pills.
- **Unified Section Typography & 100% Viewport Chassis:** Harmonized `--text-section` (clamp 1.75rem to 2.35rem) and `--text-section-sub` across all sections, keeping all 6 cards strictly contained within 100vh (`y = 187.9px` to `629.0px` in 720p screens with 91px bottom clearance).
- **GSAP Origin-Aware Bounding Box Modal:** Expand/collapse tween (`power3.out`, 240ms) interpolating coordinates from clicked card `getBoundingClientRect()` to viewport modal chassis (`92vw × 88vh`).
- **Two-Column Cinematic Cockpit:** 7-column interactive slideshow with chevrons, thumbnail filmstrip, and caption bar; 5-column punchy italic narrative statement, 3-item innovation proof grid with authentic metrics, tech pills, and secure CTAs (`rel="noopener noreferrer"`).
- **Accessibility & Traversal Engine:** In-modal prev/next project navigation, keyboard `ArrowLeft`/`ArrowRight` slide navigation, `Escape` close, focus trapping with `inert` on `#site-nav` and `<main>`, and strict wheel/touch scroll isolation preventing background page movement.

## Education Subsystem Architecture (`src/js/education.js` & `src/js/education-data.js`)
- **Triple-Pillar Showcase Grid:** 3 structured cards with industrial dark elevated backgrounds and theme-specific accent borders:
  - *Academics:* IIT Bombay Aerospace Engineering (B.Tech 2026) with authentic crest, plus dual Gold Medals for CMS (ISC 98.25%) and St. Francis (ICSE 98.00%) with institutional crests.
  - *Campus Governance:* Quantified leadership chassis covering Abhyuday (Head, 7M+ reach, ₹10M+ budget, UNICEF/PETA patronages, ₹20M+ venture funding) and Placement Cell (Coordinator, 2000+ students, 40+ recruiters).
  - *Creative & Athletics:* Writer/Director Dramatics (Inter IIT 2x Gold, Inter-Hostel 3x Gold), Stand-up Comedy Annual Showcase, and Captain/Winner in Basketball and Mixed Hockey.
- **Categorized Skills Matrix:** Interactive micro-pills split across Strategy & Product, Data Analytics, and Automation & AI with micro-hover accent elevations.
- **Strict 100vh Containment:** `y = 120.9px` to `650.0px` on 1280x720 laptop screens (70px bottom clearance) with internal scroll containment.

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


