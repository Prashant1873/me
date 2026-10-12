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
    └── Typography scale (Manrope / IBM Plex Mono / Newsreader)
```

## Page Flow (Top to Bottom)

1. **Hero** → Full viewport, 3D orbital canvas, name + narrative statement
2. **Experience** → 3D timeline, 7 entries across 4 categories
3. **Projects** → 6 cinematic case-study cards, click-to-expand
4. **Education** → IIT Bombay, achievements, extracurriculars
5. **Contact** → Links (LinkedIn, GitHub, Email, Phone), resume PDF, editorial closing

## Design System: Structured Intensity

- Primary Dark: `#171916` (Obsidian)
- Primary Light: `#F1EEE5` (Warm Ivory)
- Accent 1: `#737A58` (Engineered Olive)
- Accent 2: `#C38B55` (Tungsten Amber)
- Fonts: Manrope (primary), IBM Plex Mono (technical), Newsreader (expressive)
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
│   ├── nav.js             # Sticky nav, scroll spy, smooth scroll
│   ├── theme.js           # Dark/light mode toggle
│   ├── hero/
│   │   ├── scene.js       # Three.js orbital geometry
│   │   └── entrance.js    # GSAP entrance timeline
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
