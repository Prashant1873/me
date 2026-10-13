# Phase 5: Experience — 3D Timeline & Scroll Animations - Context

**Gathered:** 2026-10-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Transform the Professional Experience section (#experience) from the static master-detail layout into an interactive 3D spatial timeline floating in space using Three.js and GSAP ScrollTrigger. Delivers requirements EXP-01, EXP-07, EXP-08, and 3D-06 while preserving all rich commercial experience content (IQVIA, Revolut, Ketto, Kalam Labs, FAOUD), authentic workplace photos, impact metrics, and category filtering.
</domain>

<decisions>
## Implementation Decisions

### Spatial Architecture & Layout Integration
- **D-01:** Dedicated 3D timeline canvas paired side-by-side with synchronized interactive card panel (preserves photos, metrics, and links) — **Reversibility:** costly — couples 3D WebGL renderer state to DOM layout structure.
- **D-02:** 12-column grid apportionment: 5-column 3D spatial canvas on the left, 7-column detail card on the right — **Reversibility:** reversible — CSS grid column distribution.
- **D-03:** 3D nodes serve as primary navigation with hover raycasting and click-to-travel, paired with a minimalist IBM Plex Mono date rail (2024–2026) overlaid along the canvas edge — **Reversibility:** reversible — Three.js raycasting and CSS overlay.
- **D-04:** Responsive vertical stack on tablet/mobile (<1024px) with sticky/anchored compact 3D canvas header (~240px height) above the active card with touch dragging support — **Reversibility:** reversible — media query styles.

### Scroll Traversal & Camera Mechanics
- **D-05:** Pinned scroll scrubbing via GSAP ScrollTrigger: section pins while user scrubs through all 5 roles in z-depth, unpinning smoothly to continue down to #projects — **Reversibility:** costly — ScrollTrigger pin spacing alters document height and scrolling flow.
- **D-06:** Linear Z-depth dolly: camera tracks straight along the Z-axis, flying past previous nodes that dissolve behind the camera plane — **Reversibility:** reversible — camera positioning logic in render loop.
- **D-07:** Crisp editorial crossfade & metric ticker: 200ms subtle fade + 6px Y-offset with animated metric counters and staggered bullets (Structured Intensity motion timings) — **Reversibility:** reversible — card content transition GSAP timeline.
- **D-08:** Seamless navigation sync & progress tracking: header nav click smoothly navigates to entry point; scroll scrubber includes a subtle % progress bar and keyboard ArrowUp/Down / ArrowLeft/Right support — **Reversibility:** reversible — keyboard and click event listeners.

### 3D Visual Motif & Lighting
- **D-09:** Particle stream & cosmic dust conduits: glowing particle ribbon with concentrated star-clusters at each role milestone along the Z-axis — **Reversibility:** costly — custom Three.js buffer geometries and point materials.
- **D-10:** Tungsten Amber (#C38B55) primary highlight for active milestone star-cluster glow with subtle cool cyan/blue cosmic dust particles; adapts with muted deep amber in light mode — **Reversibility:** reversible — color constants and theme change observer.
- **D-11:** Mouse parallax + raycast hover bloom: subtle camera offset following cursor with expanding halo bloom on hovered milestone nodes (clickable to travel) — **Reversibility:** reversible — mousemove and raycaster handlers.
- **D-12:** Adaptive particle budget (400–600 particles) + IntersectionObserver pausing: pixelRatio capped at 2, RAF loop stopped when section is off-screen for 0% idle CPU/GPU load — **Reversibility:** reversible — performance optimization.

### Category Filtering Dynamics
- **D-13:** Spatial focus & dimming with camera dolly: inactive nodes dim to 15% ghost opacity; 3D camera smoothly glides to the first matching role; scroll limits to matching milestones — **Reversibility:** reversible — material opacity tweens and filtered indices.
- **D-14:** Replace 2D calendar modal with inline toggle in detail card: add a small "View Dates" mini-chart inside the detail card instead of a separate overlay modal — **Reversibility:** reversible — inlines Gantt overview into card DOM.
- **D-15:** Keyboard and swipe navigation filtered: Arrow keys cycle strictly between active category milestones with smooth camera glide and card crossfade — **Reversibility:** reversible — navigation controller filtering logic.
- **D-16:** Smooth bloom & restore opacities: all dimmed star-clusters and paths fade back to full brilliance over 400ms without displacing current camera position when resetting to All Experience — **Reversibility:** reversible — GSAP material opacity tweens.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design & Architecture Specifications
- `.planning/ROADMAP.md` § Phase 5 — Requirements, deliverables (EXP-01, EXP-07, EXP-08, 3D-06), and UAT criteria.
- `.planning/REQUIREMENTS.md` § Professional Experience & 3D — Specifications for 3D timeline, nodes, and performance.
- `src/styles/design-system.css` — Structured Intensity color tokens (Tungsten Amber `--color-accent-amber`, Coral `--color-accent-coral`, Royal Blue `--color-accent-blue`), typography, and motion timings.
- `src/js/experience-data.js` — Canonical 5 commercial experience records, categories, and chronological timeline data.
- `src/js/hero-canvas.js` — Reference Three.js implementation for renderer setup, theme switching, mouse parallax, and cleanup.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/js/hero-canvas.js`: Pattern for WebGLRenderer, theme-reactive materials, responsive resizing, and RAF management.
- `src/js/experience-data.js`: Complete data structure for all 5 roles (`EXPERIENCES`) with categories, metrics, bullets, and photo paths.
- `src/styles/experience.css`: Production card styles, metric callout banners, photo strips, and filter tabs.

### Established Patterns
- GSAP + ScrollTrigger for scroll-driven animations and section pinning.
- Theme switching observer via `data-theme` attribute mutation on `<html>`.
- Zero-FOUC CSS custom properties and 12-column grid system.

### Integration Points
- `#experience` section in `index.html`: replace left company list with `#experience-canvas` while keeping the `#experience-detail` card panel.
- `src/js/experience.js`: upgrade controller to bridge Three.js timeline canvas state with card rendering.
- `src/js/main.js`: initialize the 3D experience timeline module on DOM ready.
</code_context>

<specifics>
## Specific Ideas
- Visual metaphor: Cosmic particle stream / dust conduit with concentrated star-clusters marking Prashant's career milestones.
- Active milestone glow: Tungsten Amber (#C38B55) halo bloom.
- Inactive / filtered nodes: Ghosted to 15% opacity rather than hidden, preserving the spatial sense of chronological progression.
- Inline date mini-chart toggle inside the detail card to replace the bulky modal.
</specifics>

<deferred>
## Deferred Ideas
None — discussion stayed strictly within Phase 5 scope.
</deferred>

---

*Phase: 05-experience-3d-timeline-scroll-animations*
*Context gathered: 2026-10-13*
