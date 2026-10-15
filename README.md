# Prashant Shukla - Personal Portfolio & Technical Showcase

> *"Engineering rigor meets behavioral empathy: building systems that outlast their creators and products people genuinely love."*

A high-performance, single-page portfolio engineered with **Vanilla JavaScript (ES Modules)**, **Three.js WebGL**, **GSAP**, and a custom **Structured Intensity** design system built in pure CSS. 

Designed for strict **100vh / 100dvh desktop viewport containment** across common laptop and desktop resolutions (1280×720, 1440×900, 1920×1080) with zero accidental scrollbars and seamless dark/light theme switching.

---

## ⚡ Core Sections & Interactive Features

### 1. 00 // Hero - 3D Orbital Dynamics
- **Interactive Three.js Canvas:** Real-time geometric particle constellation and multi-ring orbital polyhedron with smooth Euler mouse-tracking, proximity hover glow, and continuous subtle rotation.
- **Performance Optimized:** Off-screen rendering pause via `IntersectionObserver` and mobile pixel-ratio capping (`Math.min(devicePixelRatio, 1.5)`) to eliminate GPU thermal throttling.
- **Fast-Action Header:** One-click instant squarical triggers for direct phone calls and email alongside the theme toggle.

### 2. 01 // Experience - Product, Strategy & Scale
- **Chronological Milestones:** Detailed track record across **Revolut** (Product & Strategy), **IQVIA** (Strategy Consulting), **Kalam Labs** (Gaming & Product), and **Ketto** (Social Impact).
- **Interactive Chronology Matrix:** Dual-view timeline featuring a high-contrast, borderless month-grid calendar modal and dynamic modal inspector.
- **Dynamic 3D Particle Accents:** Subtle ambient particle flow integrated behind company milestones.

### 3. 02 // Projects - Zero-to-One Products & AI Systems
- **Aspect-Ratio Calibrated Cards (16:9):** Screen-matched presentation matching canonical 16:9 product dashboards with zero bottom-edge cutoff.
- **High-Clarity Glassmorphic Overlays:** Balanced background blur (`8px`) and contrast overlays (`rgba(0, 0, 0, 0.45)`) that maintain screenshot discoverability while keeping titles crisp.
- **Case Study Modal Inspector:** In-depth multi-slide walkthroughs with high-resolution slides, problem-solution statements, and technical tag pills.

### 4. 03 // Education & Governance - Triple-Pillar Excellence
- **Academic Pedigree:** Featured **IIT Bombay B.Tech Aerospace Engineering** (`AIR 1543 JEE Advanced`) alongside **City Montessori School (CMS)** (`98.25% ISC Gold Medal`) and **St. Francis' College** (`98.00% ICSE Gold Medal`).
- **High-Stakes Leadership:** Campus governance impact spanning **Abhyuday, IIT Bombay** (`₹10M+ Budget`, `50K+ Footfall`, `150+ Team Led`, `₹20M+ Raised`) and **Placement Cell, IIT Bombay** (`2,000+ Candidates`, `40+ Recruiters`, `16-Wk Bootcamp`).
- **Stage & Synthesis:** Bespoke SVG iconography showcasing creative and athletic accolades: **2× Inter IIT Cultural Gold Medalist** (Writer & Director), Stand-up Comedy & Conclave MC, and Varsity Mixed Hockey Championship.
- **Core Competencies & Toolkit:** Multi-category technical chip matrix covering Product & Strategy, Data Analytics, and AI & Automation.

### 5. 04 // Contact - Structured Action Center
- **Interactive 4-Card Channel Grid:** Dedicated action cards for LinkedIn, GitHub, Email, and Phone with built-in one-click clipboard copying and visual feedback toasts.
- **Full-Width Verified Resume Chassis:** Streamlined horizontal credentials bar featuring in-browser interactive PDF preview and direct verified resume download.
- **Editorial Brand Statement:** Newsreader expressive typography with glowing cobalt accents.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Core** | HTML5 (Semantic) + Vanilla JS (ES Modules) | Ultra-lightweight runtime, zero framework overhead |
| **Graphics** | [Three.js](https://threejs.org/) (WebGL) | 3D orbital constellations, geometric particle field |
| **Animation** | [GSAP](https://greensock.com/gsap/) | High-precision timeline choreography and micro-interactions |
| **Styling** | Vanilla CSS (Fluid Clamps & Custom Tokens) | Tailored design system, zero CSS bloat |
| **Build & Dev** | [Vite 6](https://vitejs.dev/) | Lightning-fast HMR and optimized production bundling |
| **Testing** | [Playwright](https://playwright.dev/) | Cross-viewport visual regression and layout verification |

---

## 📐 Design Philosophy: Structured Intensity

- **Strict 100vh Viewport Containment:** Every desktop section fits within a single viewport on 1280×720, 1440×900, and 1920×1080 screens without page-level scrollbars.
- **Subpixel Baseline Parity:** All 4 content section headings share exact vertical Y-offset alignment (0.00px variance) from the viewport top.
- **Dual-Theme Fidelity:** Native CSS custom property architecture supporting **Deep Space Dark** (default `#050811` background with electric cobalt accents) and **Clean Technical Light** (`#f8fafc` background with bold contrast).
- **Executive Scannability:** Elimination of dense text walls in favor of high-impact visual metric chips, badges, and tags.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/Prashant1873/me.git

# Navigate to project directory
cd me

# Install dependencies
npm install
```

### Development
```bash
# Start local development server with Hot Module Replacement
npm run dev
```
Open `http://localhost:3000` in your browser.

### Production Build
```bash
# Compile and optimize assets into dist/
npm run build

# Preview production build locally
npm run preview
```

### Verification & Testing
```bash
# Verify no accidental em-dashes exist in copy
npm run check:em-dash

# Run Playwright end-to-end tests
npm run test
```

---

## 📁 Repository Structure

```
├── .planning/               # GSD project plans, milestones, and roadmaps
├── public/                  # Static assets (images, logos, resumes)
│   ├── images/
│   │   ├── experience/      # Company and project event photography
│   │   ├── logos/           # High-resolution vector & raster institution logos
│   │   └── projects/        # Canonical 16:9 project screenshot slides
│   └── resume.pdf           # Official verified IIT Bombay technical CV
├── src/
│   ├── js/                  # Modular JavaScript components
│   │   ├── 3d/              # Three.js particle constellation & scene managers
│   │   ├── education.js     # Triple-pillar layout renderer
│   │   ├── experience.js    # Experience timeline & calendar modal logic
│   │   ├── projects.js      # Project grid & case study modal inspector
│   │   ├── contact.js       # Contact channels & resume preview logic
│   │   └── theme.js         # Dark/light theme toggle controller
│   └── styles/              # Structured Intensity CSS design system
│       ├── design-system.css# Global tokens, color palettes, and typography scale
│       ├── navigation.css   # Sticky header and action icons
│       ├── hero.css         # Hero 3D container and title typography
│       ├── experience.css   # Experience timeline & calendar grid
│       ├── projects.css     # 16:9 cards, glassmorphic overlays & modal styles
│       ├── education.css    # Full-width stacked cards & visual stat chips
│       └── contact.css      # Contact action grid & horizontal resume chassis
├── index.html               # Main semantic HTML entry point
├── package.json             # Project dependencies and script runner
├── neural_map.md            # Subsystem architecture, state machines, and layout specs
├── great_ideas.md           # Product and design enhancement roadmap
└── README.md                # Project documentation
```

---

## 📄 License

Created by **[Prashant Shukla](https://github.com/Prashant1873)**.  
Licensed under the [MIT License](LICENSE).
