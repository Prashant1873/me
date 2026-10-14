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

## Scroll Controller State Machine (`section-scroll.js`)

- **Input Accumulation:** Normalizes wheel `deltaY` (pixels, lines, pages); triggers when `|wheelAccumulator| >= 18px` (~25ms response).
- **Anti-Lockout Fixed Cooldown (1 Swipe = 1 Page):**
  - Uses a fixed, non-sliding 550ms cooldown window since scroll initiation, plus a 650ms animation safety timer. Incoming wheel events during flight and decay do not push the cooldown into the future, guaranteeing pages never freeze or get stuck.
  - *Opposite Flick:* Immediately interrupts flight and reverses towards opposing section without dropped input.
- **Settling:** 0.5s `power3.out` transition with incoming container spring settling.

