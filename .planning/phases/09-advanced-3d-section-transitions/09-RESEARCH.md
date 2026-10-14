# Phase 9 Research: Advanced 3D & Section Transitions Architecture

## 1. Scene & Canvas Hierarchy

### 1.1 Single Unified WebGL Canvas (`#bg-canvas`)
Consolidating the background into a single WebGL canvas offers dramatic advantages over multi-canvas approaches:
- **Zero WebGL Context Loss:** Browsers impose strict limits (typically 8–16) on simultaneous active WebGL contexts. Running multiple standalone canvases risks context thrashing or unexpected memory leaks.
- **Unified GPU Draw Loop:** Single `requestAnimationFrame` loop maintaining 60fps on modern GPUs while sharing geometry, materials, and renderer buffers.
- **Continuous Spatial Continuity:** As the user scrolls across sections, the camera travels along a continuous 3D spatial spline through the terrain rather than jumping between disconnected canvases.

### 1.2 Viewport & DOM Layering
```
DOM Layering (Back to Front):
├── <canvas id="bg-canvas"> (fixed inset: 0, z-index: 0, pointer-events: none)
├── <main> (relative, z-index: 10, background: transparent)
│   ├── #hero (transparent background)
│   ├── #experience (semi-transparent / blurred background)
│   ├── #projects (transparent background)
│   ├── #education (transparent background)
│   └── #contact (transparent background)
└── <nav id="site-nav"> (fixed top, z-index: 1000, glass blur)
```

---

## 2. Morphing Particle Constellation Engine (`3D-03`, `3D-04`)

### 2.1 Pure Particle Constellation Formations
Rather than rigid polygon models, each section is identified by a constellation of 600–800 luminous particles:
1. **Hero (Section 00 - Orbital Command):**
   - Core particle cluster (radius 0.8, 200 points).
   - Inner orbital ring tilted 25° (radius 2.2, 250 points).
   - Outer eccentric elliptical trajectory (semi-major axis 3.4, 250 points).
2. **Experience (Section 01 - Milestone Conduit):**
   - Central linear energy conduit spine spanning horizontally `x = -6` to `+6`.
   - 5 localized nodal clusters corresponding to the career milestone hubs (IQVIA, Revolut, Ketto, Kalam Labs, FAOUD).
3. **Projects (Section 02 - Architectural Matrix):**
   - 3D regular voxel lattice / matrix grid `(6 × 4 × 4)`.
   - Represents software engineering, database schemas, and structured modularity.
4. **Education (Section 03 - Crystalline Polyhedron):**
   - Double-tetrahedron (Merkaba / Stellated Octahedron) constellation vertices and edge particles.
   - Represents IIT Bombay academic rigor, geometric truth, and aerospace dynamics.
5. **Contact (Section 04 - Radial Signal Pulsar):**
   - Expanding concentric spherical wave shells radiating outward from a central emitter.
   - Represents open communication channels, broadcast, and connectivity.

### 2.2 Fluid Morphing Mathematics
- Particles utilize a `THREE.BufferGeometry` containing:
  - `position` (`Float32Array` of size `N * 3`).
  - Pre-computed target coordinate tables for each section: `POSITIONS_HERO`, `POSITIONS_EXP`, `POSITIONS_PROJ`, `POSITIONS_EDU`, `POSITIONS_CONT`.
- On section transition, an animation controller interpolates the current positions toward the target section's positions using damped exponential smoothing or GSAP:
  ```javascript
  // Per-frame morphing with gentle organic delay
  for (let i = 0; i < particleCount; i++) {
    const idx = i * 3;
    const progress = Math.min(1, morphProgress + (i / particleCount) * 0.1);
    currentPos[idx]     += (targetPos[idx]     - currentPos[idx])     * 0.08;
    currentPos[idx + 1] += (targetPos[idx + 1] - currentPos[idx + 1]) * 0.08;
    currentPos[idx + 2] += (targetPos[idx + 2] - currentPos[idx + 2]) * 0.08;
  }
  geometry.attributes.position.needsUpdate = true;
  ```

---

## 3. Continuous Topological Terrain Mesh (`3D-02`)

### 3.1 Geometry & Material
- `THREE.PlaneGeometry(80, 160, 48, 80)` oriented horizontally (`rotation.x = -Math.PI / 2`).
- Positioned beneath the camera path at `y = -3.5`.
- Material: `THREE.MeshBasicMaterial` with `wireframe: true`, subtle opacity `0.16` in Dark Mode, `0.22` in Light Mode.
- Elevation undulation:
  ```javascript
  // Layered procedural elevation simulating desert dunes / topographical survey
  const zOffset = elapsedTime * 0.2;
  for (let i = 0; i < vertexCount; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getY(i) + zOffset; // Y in plane geometry is Z in 3D
    const elevation = Math.sin(x * 0.12) * Math.cos(z * 0.08) * 1.8 
                    + Math.sin(x * 0.24 + z * 0.15) * 0.6;
    posAttr.setZ(i, elevation);
  }
  terrainGeo.computeVertexNormals();
  posAttr.needsUpdate = true;
  ```

---

## 4. Camera Spline Traversal & Cinematic Section Transitions (`3D-07`, `3D-08`)

### 4.1 3D Camera Waypoints Along Section Continuum
| Section Index | Section ID | Camera Position `[x, y, z]` | Target LookAt `[x, y, z]` |
| :--- | :--- | :--- | :--- |
| **0** | `#hero` | `[0.0, 1.2, 7.5]` | `[0.0, 0.0, 0.0]` |
| **1** | `#experience` | `[3.2, 2.0, -8.0]` | `[0.0, 0.8, -16.0]` |
| **2** | `#projects` | `[-3.5, 2.5, -24.0]` | `[0.0, 1.2, -32.0]` |
| **3** | `#education` | `[2.8, 2.2, -40.0]` | `[0.0, 1.0, -48.0]` |
| **4** | `#contact` | `[0.0, 1.8, -56.0]` | `[0.0, 0.5, -64.0]` |

### 4.2 Cinematic Motion Timings
- **Camera Spline Interpolation:** `700ms` duration with `power2.inOut` easing, triggered by `section-scroll.js` `scrollToSection(index)`.
- **Particle Constellation Morph:** `800ms` duration with staggered particle arrival.
- **UI Content Reveal:** `220ms` micro-transition fade-and-rise on active section DOM elements.

---

## 5. Parallax Depth & Ambient Cosmic Dust (`3D-04`, `3D-05`)

### 5.1 Multi-Layered Spatial Hierarchy
1. **Background Layer:** Topological wireframe terrain at `z-depth = -80` to `+20` (parallax factor: `0.2x`).
2. **Midground Layer:** Ambient cosmic dust motes (300 motes distributed in a `30 × 20 × 100` volume, parallax factor: `0.5x`).
3. **Focal Midground:** Thematic particle constellation at `z = activeSectionCenter` (parallax factor: `1.0x`).
4. **Foreground:** HTML DOM content with sharp typography and glass card overlays.

### 5.2 Mouse Parallax Smoothing
```javascript
// Damped spring mouse tracking
currentMouse.x += (targetMouse.x - currentMouse.x) * 0.04;
currentMouse.y += (targetMouse.y - currentMouse.y) * 0.04;

camera.position.x = baseCamPos.x + currentMouse.x * 0.6;
camera.position.y = baseCamPos.y + currentMouse.y * 0.4;
camera.lookAt(targetLookAt.x + currentMouse.x * 0.2, targetLookAt.y, targetLookAt.z);
```

---

## 6. Theme Reactivity & Mobile Performance Safeguards

### 6.1 Theme Palettes
- **Dark Mode (Default):**
  - Scene fog: `THREE.FogExp2(0x000000, 0.018)`
  - Terrain wireframe: `0x2962FF` (Royal Blue, opacity 0.15)
  - Constellation particles: Dual-tone Coral (`0xE8655A`) and Royal Blue (`0x2962FF`) with `THREE.AdditiveBlending`
  - Cosmic dust motes: Cyan/White (`0x4DD0E1`, `0xFFFFFF`)
- **Light Mode:**
  - Scene fog: `THREE.FogExp2(0xF6F7F9, 0.015)`
  - Terrain wireframe: Slate/Graphite (`0x94A3B8`, opacity 0.25)
  - Constellation particles: Radiant Amber Gold (`0xD97706`) and Cobalt (`0x1D4ED8`) with `THREE.NormalBlending`
  - Cosmic dust motes: Deep Charcoal (`0x334155`)

### 6.2 Mobile & Performance Budget
- Cap pixel ratio: `Math.min(window.devicePixelRatio, window.innerWidth <= 768 ? 1.5 : 2.0)`.
- On mobile (`width <= 768px`), reduce terrain resolution to `32 × 48` and constellation particles to `400` points.
- Pause WebGL rendering loop when page is hidden or minimized via `document.visibilityState`.
