# Phase 5: Experience — 3D Timeline & Scroll Animations - Research

**Researched:** 2026-10-13  
**Domain:** Three.js WebGL Particle Systems, GSAP ScrollTrigger Section Pinning, Z-Depth Dolly Camera Math, Hybrid DOM/WebGL Synchronization  
**Confidence:** HIGH  

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01 (Spatial Architecture):** Dedicated 3D timeline canvas paired side-by-side with synchronized interactive card panel (preserves photos, metrics, and links) — Reversibility: costly.
- **D-02 (Grid Allocation):** 12-column grid apportionment: 5-column 3D spatial canvas on the left, 7-column detail card on the right — Reversibility: reversible.
- **D-03 (Navigation):** 3D nodes serve as primary navigation with hover raycasting and click-to-travel, paired with a minimalist IBM Plex Mono date rail (2024–2026) overlaid along the canvas edge — Reversibility: reversible.
- **D-04 (Responsive):** Responsive vertical stack on tablet/mobile (<1024px) with sticky/anchored compact 3D canvas header (~240px height) above active card with touch dragging — Reversibility: reversible.
- **D-05 (Scroll Scrubbing):** Pinned scroll scrubbing via GSAP ScrollTrigger: section pins while user scrubs through all 5 roles in z-depth, unpinning smoothly to continue down to #projects — Reversibility: costly.
- **D-06 (Camera Trajectory):** Linear Z-depth dolly: camera tracks straight along the Z-axis, flying past previous nodes that dissolve behind the camera plane — Reversibility: reversible.
- **D-07 (Card Sync):** Crisp editorial crossfade & metric ticker: 200ms subtle fade + 6px Y-offset with animated metric counters and staggered bullets (Structured Intensity motion timings) — Reversibility: reversible.
- **D-08 (Nav Sync):** Seamless navigation sync & progress tracking: header nav click smoothly navigates to entry point; scroll scrubber includes a subtle % progress bar and keyboard ArrowUp/Down support — Reversibility: reversible.
- **D-09 (3D Geometry):** Particle stream & cosmic dust conduits: glowing particle ribbon with concentrated star-clusters at each role milestone along the Z-axis — Reversibility: costly.
- **D-10 (Color Palette):** Tungsten Amber (#C38B55) primary highlight for active milestone star-cluster glow with subtle cool cyan/blue cosmic dust particles; adapts with muted deep amber in light mode — Reversibility: reversible.
- **D-11 (Interactivity):** Mouse parallax + raycast hover bloom: subtle camera offset following cursor with expanding halo bloom on hovered milestone nodes (clickable to travel) — Reversibility: reversible.
- **D-12 (Performance Budget):** Adaptive particle budget (400–600 particles) + IntersectionObserver pausing: pixelRatio capped at 2, RAF loop stopped when section is off-screen for 0% idle CPU/GPU load — Reversibility: reversible.
- **D-13 (Spatial Filtering):** Spatial focus & dimming with camera dolly: inactive nodes dim to 15% ghost opacity; 3D camera smoothly glides to the first matching role; scroll limits to matching milestones — Reversibility: reversible.
- **D-14 (Integrated Date Mini-Chart):** Replace 2D calendar modal with inline toggle in detail card: add a small "View Dates" mini-chart inside the detail card instead of a separate overlay modal — Reversibility: reversible.
- **D-15 (Keyboard Traversal):** Keyboard arrow keys navigate strictly through filtered milestones — Reversibility: reversible.
- **D-16 (Filter Reset):** Smooth bloom & restore opacities: all dimmed star-clusters and paths fade back to full brilliance over 400ms without displacing current camera position when resetting to All Experience — Reversibility: reversible.

### the agent's Discretion
- Three.js particle geometry layout math (distribution equations along Z, spline vs ribbon jitter).
- Precise coordinate offsets along Z for the 5 milestones (`z = 0, -10, -20, -30, -40`).
- Exact particle size attenuation and blending modes (`THREE.AdditiveBlending` for dark mode, `THREE.NormalBlending` for light mode).
- Shader vs `PointsMaterial` implementation (PointsMaterial with generated circular canvas texture or custom point sprite).

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed strictly within Phase 5 scope.
</user_constraints>

<architectural_responsibility_map>
## Architectural Responsibility Map

Single-tier client-side Web application — all capabilities reside in Browser/Client.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| 3D WebGL Rendering (Three.js) | Browser/Client (WebGL) | — | Hardware-accelerated canvas rendering for particle conduits and camera dolly |
| Scroll Pinning & Scrubbing (GSAP ScrollTrigger) | Browser/Client (DOM/JS) | — | Viewport scroll observation, pinning layout calculations, scrub interpolation |
| Synchronized Detail Card & DOM Updates | Browser/Client (DOM/CSS) | — | Editorial typography, metric tickers, accessibility, outbound links |
| Raycasting & Touch Interaction | Browser/Client (JS Events) | — | Mouse pointer/touch coordinate normalization to Three.js NDC space |
</architectural_responsibility_map>

<research_summary>
## Summary

Phase 5 elevates the portfolio from a flat master-detail card layout to an interactive 3D spatial timeline. The engineering challenge is blending a high-framerate (60fps) Three.js WebGL scene with the high-density editorial DOM content codified in Phase 4 without causing scroll hitching, DOM re-layout thrashing, or high GPU memory overhead.

The industry-standard approach for spatial portfolios combines:
1. **Three.js BufferGeometry with `THREE.Points`**: Storing 400–600 cosmic dust particles along a linear Z-axis conduit, grouped into 5 milestone star-clusters with per-vertex colors and opacities.
2. **GSAP ScrollTrigger `pin: true` with `scrub: 0.5`**: Pinning `#experience` for a virtual scroll height (e.g., `+=2500px` for 5 stages), driving the camera's Z-position continuously from `z = 4` down to `z = -36`.
3. **Threshold-Triggered DOM State Syncing**: As camera Z crosses quantized milestones (`z_k`), triggering a decoupled GSAP timeline (200ms) to crossfade card contents and update the active date indicator, preventing DOM mutations from firing on every single scroll tick.
4. **Lifecycle & Power Optimization**: Using an `IntersectionObserver` to halt `requestAnimationFrame` when `#experience` is out of viewport, capping `pixelRatio` at 2, and explicitly disposing of WebGL geometries/materials on destroy.

**Primary recommendation:** Build `src/js/experience-canvas.js` as an autonomous Three.js controller exposing an imperative camera/node API (`scrubTo(progress)`, `focusNode(index)`, `setCategoryFilter(cat)`), wired to a single GSAP ScrollTrigger instance in `src/js/experience.js`.
</research_summary>

<standard_stack>
## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Three.js | ^0.170.0 (Installed) | WebGL 3D scene, camera, particle geometry, raycasting | Industry standard for WebGL graphics, already integrated in `hero-canvas.js` |
| GSAP | ^3.12.5 (Installed) | Animation sequencing, tweening, and easing | Premium fluid easing engine already powering entrance and scroll animations |
| GSAP ScrollTrigger | ^3.12.5 (Bundled with GSAP) | Pinned scroll scrubbing and timeline coordination | Gold standard for high-performance scroll-driven animations with pin spacing |

### Supporting
| Asset/Tool | Purpose | When to Use |
|------------|---------|-------------|
| `THREE.Raycaster` | Pointer interaction with 3D milestone nodes | Detecting clicks and mouse hover over star-clusters |
| `IntersectionObserver` | Viewport visibility detection | Halting RAF loop when `#experience` is scrolled off-screen |
| `ResizeObserver` | Container dimension tracking | Updating camera aspect ratio and renderer viewport without full window resize delays |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `THREE.Points` BufferGeometry | InstancedMesh with 3D icosahedrons | Heavier draw overhead per node; Points are significantly faster and render cleanly as glowing cosmic dust |
| Pinned ScrollTrigger scrub | Native window scroll with parallax offset | Parallax lacks z-depth fly-through traversal feel; pinning provides immersive chapter-based focus |
| Full 3D Text in WebGL | DOM detail card beside canvas | Full WebGL text has poor accessibility, blurred rendering on varying DPI, and complex layout for multi-line bullets and photos |

</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Component Architecture & Data Flow Diagram

```
                 [ User Window Scroll / Arrow Keys ]
                                  │
                                  ▼
                [ GSAP ScrollTrigger (pin: true) ]
                                  │
             ┌────────────────────┴────────────────────┐
             ▼                                         ▼
   [ Camera Z-Dolly Position ]              [ Milestone Index Quantizer ]
  (Continuous Scrub 0.0 → 1.0)              (Active Node Index: 0 to 4)
             │                                         │
             ▼                                         ▼
   [ Three.js Render Loop ]               [ Experience Card Controller ]
 - Update camera.position.z              - Check if activeIndex changed
 - Apply mouse parallax offset           - GSAP 200ms editorial crossfade
 - Rotate particle cluster dust          - Animate impact metric ticker
 - Update node glow opacities            - Highlight active date on rail
```

### Milestone Z-Coordinate Geometry
With 5 milestones (IQVIA, Revolut, Ketto, Kalam Labs, FAOUD), we define linear Z coordinates spaced uniformly along depth:
- `Milestone 0 (IQVIA)`: `z = 0` (Camera starts at `z = 4`, looking at `z = 0`)
- `Milestone 1 (Revolut)`: `z = -10`
- `Milestone 2 (Ketto)`: `z = -20`
- `Milestone 3 (Kalam Labs)`: `z = -30`
- `Milestone 4 (FAOUD)`: `z = -40`

When `progress = 0`, `camera.position.z = 4`.
When `progress = 1.0`, `camera.position.z = -36` (framing FAOUD).
Formula: `targetZ = 4 - progress * 40`.

### Particle System Layout
- Total particles: 500
- 150 particles dispersed as ambient cosmic dust along the spine `z ∈ [10, -50]`, `r ∈ [0.5, 3.5]`.
- 350 particles divided equally into 5 concentrated star-clusters (70 particles each) centered at `(0, 0, z_k)`.
- Star-cluster core: An invisible bounding sphere `r = 1.2` for raycasting, surrounding a glowing inner mesh node (faceted diamond/octahedron) and orbiting dust particles.
- Materials: `PointsMaterial` with dynamic vertex colors or dynamic uniform tinting (`Tungsten Amber: #C38B55` for active, `Muted Blue: #2962FF` for ambient, dimming to `0.15` opacity for filtered-out nodes).

### Anti-Patterns to Avoid
1. **DOM Updates Inside the Render Loop (60fps thrash):** Never update DOM elements (`innerHTML`, `classList`, or style attributes) on every `requestAnimationFrame` tick. Only dispatch card updates when the quantized active role index changes.
2. **Multiple Independent WebGL Canvases Competing for Resources:** Keep `hero-canvas.js` and `experience-canvas.js` independent, but ensure each pauses its RAF loop when scrolled out of view.
3. **ScrollTrigger Pin Spacing Broken by Dynamic Resizing:** Call `ScrollTrigger.refresh()` after card expansions or image load events so pin start/end scroll offsets remain mathematically exact.
4. **Memory Leaks on Filter Switching:** Do not re-create `BufferGeometry` or textures on category filter changes. Instead, manipulate existing buffer attribute arrays (`alpha`, `color`) or set material opacity / visibility.

</architecture_patterns>

<performance_budget>
## Performance & Memory Management

- **Target Framerate:** 60fps on modern desktop, ≥30fps on mobile/low-power.
- **Particle Count:** Fixed between 400 and 600 particles total.
- **Pixel Ratio:** Strictly capped via `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`.
- **Off-screen Idle CPU/GPU:** `IntersectionObserver` observing `#experience` sets `state.active = false` and cancels RAF when out of viewport.
- **Disposal Safety:** Clean `dispose()` method freeing geometries, materials, renderer context, and ScrollTrigger instances.
</performance_budget>

## Validation Architecture

### Verification Strategy
Automated Playwright tests verifying the hybrid 3D canvas and DOM integration:
1. **Canvas Element Verification:** `#experience-canvas` exists and has an initialized WebGL canvas element with nonzero bounding box.
2. **Pinned Scroll Traversal:** Simulating scroll events into `#experience` verifies section pinning (`pin-spacer` active) and camera progression.
3. **Role Synchronization:** Scrubbing or clicking nodes transitions the active card (`IQVIA` → `Revolut` → `Ketto` → `Kalam Labs` → `FAOUD`) with matching impact metrics and workplace photos.
4. **Category Filtering:** Selecting 'Strategy' dims product nodes and filters role traversal to 2 items; selecting 'All' restores full visibility.
5. **No Regressions:** Full test suite (`npm test`) passes cleanly with zero layout shifts or console errors.

---
*Phase: 05-experience-3d-timeline-scroll-animations*
*Researched: 2026-10-13*
