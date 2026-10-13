# Neural Map: Prashant Shukla Portfolio

## Architecture Overview

```
Single-Page Scrollable Portfolio
├── Vite (build tool, dev server, static export)
├── Vanilla JS (no framework)
├── Three.js (3D rendering)
│   ├── Hero: Orbital geometry canvas (concentric circles, trajectories)
│   ├── Experience: 3D timeline floating in space
│   ├── Per-section: Interactive 3D objects
│   ├── Background: Terrain landscape + particle systems
│   └── Global: Parallax depth layers on scroll
├── GSAP (animation engine)
│   ├── ScrollTrigger (scroll-linked animations)
│   ├── Timeline (entrance sequences)
│   ├── Section transitions (cinematic reveals)
│   └── UI micro-interactions (hover, expand/collapse)
└── CSS (Structured Intensity design system)
    ├── Custom properties (tokens)
    ├── 12-column grid
    ├── Dark/light mode
    └── Typography scale (Horizon / Plus Jakarta Sans / IBM Plex Mono / Newsreader)
```

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

- **Input Accumulation:** Normalizes wheel `deltaY` (pixels, lines, pages); triggers when `|wheelAccumulator| >= 15px` (eliminates trackpad deadzone).
- **Single-Swipe Lock (1 Swipe = 1 Page):**
  - Once a continuous swipe triggers an advance in a direction, `activeGestureDir` locks that direction until physical gesture ends (180ms pause). Subsequent events and momentum tails are ignored, strictly preventing multi-page skips.
  - *Opposite Flick:* Immediately interrupts active GSAP tweens and reverses towards the opposing section without dropping input.
- **Settling:** 0.58s `power3.out` transition with incoming container elastic spring settling.

