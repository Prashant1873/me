# Phase 9 Context: Advanced 3D & Section Transitions

## Phase Goal
Layer on the ambitious 3D experiential elements that elevate Prashant Shukla's portfolio into a cinematic, personal command center: a unified Three.js background canvas with continuous undulating terrain, cosmic particle systems, pure particle constellations that fluidly morph into thematic section shapes, multi-layer mouse/scroll parallax, and cinematic scroll-triggered GSAP section transitions. Delivers requirements 3D-02, 3D-03, 3D-04, 3D-05, 3D-07, and 3D-08.

---

## 1. Requirement Tracing

| Requirement | Description | Target Architecture & Implementation |
| :--- | :--- | :--- |
| **3D-02** | 3D terrain/landscape that user scrolls through as background narrative | Continuous low-polygon wireframe terrain mesh in unified background WebGL canvas, undulating via sine/noise harmonics, camera traversing along a spline in z/y depth |
| **3D-03** | Interactive 3D objects per section | Pure particle constellations that fluidly morph into thematic section shapes: Orbital core (Hero), Network conduit (Experience), Matrix grid (Projects), Crystalline field (Education), and Radiant beacon (Contact) |
| **3D-04** | Particle systems as section backgrounds (subtle, not overwhelming) | Multi-tier particle systems: ambient cosmic dust motes (200–300 motes) with subtle Brownian drift + morphing thematic constellation particles |
| **3D-05** | 3D parallax depth layers on scroll | Multi-layered spatial hierarchy: foreground content DOM -> midground particle constellations -> background terrain mesh, with camera offset responding to pointer position |
| **3D-07** | Section transitions with cinematic scroll-triggered GSAP animations | Section changes trigger synchronized camera spline translation, particle constellation morphing, and staggered DOM content reveals |
| **3D-08** | Motion timing follows design language | 160–280ms for UI micro-interactions, 600–800ms for 3D camera and particle narrative transitions with power2.inOut easing |

---

## 2. Locked Decisions (Confirmed by User)

- **D-01: Single Unified Background 3D Canvas (`#bg-canvas`)**:
  - A single fixed full-viewport Three.js WebGL canvas positioned at `z-index: 0` behind all section DOM layers.
  - Consolidates rendering into a single WebGL context, eliminating multi-context GPU memory overhead and context switching lag.
  - Guarantees 60fps performance on modern desktop hardware.
- **D-02: Pure Particle Constellations with Fluid Morphing (User Chosen)**:
  - Each section features a unique thematic formation rendered purely out of glowing particles rather than solid wireframe meshes:
    - *Hero (00):* Concentric orbital particle rings & pulsing core.
    - *Experience (01):* Linear conduit spine with clustering milestone node constellations.
    - *Projects (02):* Matrix / voxel lattice cloud representing modular system architecture.
    - *Education (03):* Sacred geometry crystalline particle star (IIT Bombay & analytical rigor).
    - *Contact (04):* Radiant pulsar beacon expanding concentric signal waves.
  - Morphing engine smoothly interpolates particle positions between section states using custom BufferGeometry attributes or GSAP timeline tweens.
- **D-03: Continuous Terrain Landscape Narrative**:
  - A topological wireframe terrain mesh positioned at the base of the 3D scene.
  - Terrain subtly shifts elevation and geometry as the camera travels forward in z-space during section progression.
  - Color styling: Subtle obsidian/graphite wireframe with Tungsten Amber (`#C38B55`) and Royal Blue (`#2962FF`) ambient vertex glow.
- **D-04: Cinematic Camera Spline Traversal**:
  - The Three.js camera moves along a defined 3D trajectory `(x, y, z)` linked to `currentIndex` from `section-scroll.js`.
  - Camera position and lookAt target interpolate smoothly over 700ms (`power2.inOut`), creating the physical sensation of journeying through a continuous aerospace landscape.
- **D-05: Non-Competing Visual Hierarchy**:
  - The background 3D scene remains atmospheric and supportive - opacity and particle luminosity are carefully balanced so text readability, card contrast, and interactive buttons are never compromised.
  - In Light Mode, particle colors shift to Deep Slate, Radiant Gold, and Cobalt Blue with inverted canvas fog.
