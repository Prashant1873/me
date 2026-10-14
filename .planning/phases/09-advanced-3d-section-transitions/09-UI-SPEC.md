# Phase 9 UI Specification: Advanced 3D & Section Transitions

## 1. Visual Hierarchy & Canvas Integration

All 3D elements strictly adhere to the Structured Intensity design system and maintain zero interference with text legibility:

### 1.1 Canvas Chassis (`#bg-canvas`)
- Position: `fixed; inset: 0; width: 100vw; height: 100vh; height: 100dvh;`
- Layering: `z-index: 0; pointer-events: none;`
- Clear color: `0x000000` (Dark) / `0xF6F7F9` (Light) with atmospheric depth fog.

### 1.2 Section Transparency Contract
- `.section`: Background set to transparent or subtle backdrop tint (`rgba(0, 0, 0, 0.25)` Dark / `rgba(255, 255, 255, 0.45)` Light) to allow the continuous 3D spatial terrain and particles to be visible.
- Cards, modals, and detail containers retain high-contrast surface backgrounds (`var(--bg-surface)` / `var(--bg-card)`) with crisp borders to ensure 100% WCAG 2.2 AA text readability.

---

## 2. Color Palettes & Material Shaders

| Element | Dark Mode Token / Hex | Light Mode Token / Hex | Material Type & Blending |
| :--- | :--- | :--- | :--- |
| **Atmospheric Fog** | `#000000` (density 0.016) | `#F8FAFC` (density 0.014) | `THREE.FogExp2` |
| **Terrain Wireframe** | `#2962FF` / `#1E293B` (opacity 0.16) | `#94A3B8` / `#CBD5E1` (opacity 0.22) | `MeshBasicMaterial`, wireframe: true |
| **Cosmic Dust Motes** | `#4DD0E1` / `#FFFFFF` (opacity 0.65) | `#475569` (opacity 0.45) | `PointsMaterial`, Additive (Dark) / Normal (Light) |
| **Hero Particles** | `#E8655A` (Core) / `#2962FF` (Rings) | `#D44E43` (Core) / `#1D4ED8` (Rings) | `PointsMaterial`, size: 3.5px |
| **Experience Particles** | `#C38B55` (Tungsten Amber) | `#D97706` (Radiant Gold) | `PointsMaterial`, size: 3.2px |
| **Projects Particles** | `#2962FF` (Royal Blue) | `#1D4ED8` (Cobalt Blue) | `PointsMaterial`, size: 3.0px |
| **Education Particles** | `#E8655A` (Coral Gold) | `#D97706` (Amber Bronze) | `PointsMaterial`, size: 3.4px |
| **Contact Particles** | `#2962FF` (Signal Blue) | `#2563EB` (Electric Blue) | `PointsMaterial`, size: 3.6px |

---

## 3. Thematic Particle Constellations (`3D-03`)

### 3.1 Formation Blueprints (600 Particles)
1. **Hero (Section 00) - Concentric Orbital Command:**
   - 180 particles form a dense pulsing spherical core (r = 0.9).
   - 240 particles form an inner equatorial ring (r = 2.4).
   - 180 particles form an inclined polar trajectory (r = 3.6, tilt = 40°).
2. **Experience (Section 01) - Career Energy Conduit:**
   - 250 particles form a horizontal sinusoidal conduit line spanning `x = -7` to `+7`.
   - 350 particles cluster into 5 spherical orbital nodes centered at `x = [-6, -3, 0, 3, 6]`.
3. **Projects (Section 02 - Architectural Voxel Matrix:**
   - 600 particles distributed evenly along the nodes of a 3D isometric lattice (`8 × 5 × 5` grid with slight jitter).
4. **Education (Section 03) - Stellated Octahedron Crystalline Star:**
   - 600 particles outlining the vertices and intersecting edges of an aerospace star polyhedron (tetrahedral duality).
5. **Contact (Section 04) - Radial Wave Pulsar:**
   - 3 concentric spherical wavefront rings expanding from `(0, 0, 0)` with oscillating radial pulse.

---

## 4. Cinematic Motion & Transition Contract (`3D-07`, `3D-08`)

### 4.1 Section Transition Choreography
When `scrollToSection(targetIndex)` fires in `section-scroll.js`:
- **Step 1 (0ms–700ms):** Camera moves smoothly from current waypoint to target waypoint along a curved spline using GSAP `power2.inOut` (700ms).
- **Step 2 (50ms–800ms):** Particle constellation morphs from current formation to target formation using damped position interpolation with randomized per-particle lead/lag.
- **Step 3 (200ms–450ms):** Target section DOM elements trigger staggered content reveal:
  - Header & Tag: `y: 20 -> 0`, `opacity: 0 -> 1` (duration 240ms).
  - Main Cards / Grid: `y: 24 -> 0`, `opacity: 0 -> 1` (duration 280ms).

### 4.2 Interactive Parallax Motion
- Mouse movement over viewport gently nudges camera position:
  - Camera X offset: `mouse.x * 0.75`
  - Camera Y offset: `mouse.y * 0.45`
  - LookAt target offset: `mouse.x * 0.3`
  - Smooth spring damping: `0.05` per frame.

---

## 5. Performance & Accessibility Contracts

- **Frame Rate Target:** Consistent 60fps on modern desktop hardware.
- **Memory Safety:** Single WebGL renderer, single Scene, reusable BufferGeometries.
- **Reduced Motion Support (`RESP-07` / `prefers-reduced-motion`):**
  - If `prefers-reduced-motion: reduce` is active:
    - Particle morphing transitions snap instantaneously or use minimal fade.
    - Camera spline traversal is replaced by instant position jumping.
    - Terrain elevation undulation is static.
