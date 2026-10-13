# Phase 3: Hero Section with 3D Orbital Canvas

## Goal
Immersive full-viewport hero with Three.js orbital geometry, personal narrative text, entrance animations, mouse parallax.

## Plans

### PLAN-01: Three.js orbital geometry canvas module
- New file `src/js/hero-canvas.js` — self-contained Three.js scene
- Concentric orbital rings (aerospace metaphor): 3 nested rings at different tilts
- Central icosahedron wireframe core (coral accent)
- Floating orbital dots/particles along ring paths
- Gentle ambient rotation via GSAP
- Mouse-move parallax (subtle camera offset)
- Responsive resize handling
- Theme-aware colors (listen for data-theme changes)
- 60fps target, pixelRatio capped at 2

### PLAN-02: Update hero HTML with canvas container + metadata line
- Add `#hero-canvas` container div in the hero col-span-4 area
- Add IBM Plex Mono metadata line beneath the name
- Expand hero layout to position canvas as full-section background (not just right column)

### PLAN-03: Hero CSS refinements
- Canvas positioned absolute behind hero content
- Ensure hero text stays on top with z-index
- Add subtle gradient overlay for text readability over 3D
- Metadata line styling

### PLAN-04: Enhanced GSAP entrance animation
- Staggered reveal: nav → name → tagline → metadata → badges → 3D scene fade-in
- 3D scene starts transparent, fades in after text reveals
- Coordinate text and 3D timing for cinematic feel

### PLAN-05: Import and initialize hero canvas in main.js
- Import hero-canvas module
- Initialize after DOM ready
- Pass container element reference

## UAT
- [ ] Three.js canvas renders concentric orbital geometry at 60fps
- [ ] Hero headline uses Horizon font 56–80px
- [ ] IBM Plex Mono metadata line visible beneath name
- [ ] GSAP entrance animation plays on page load (text + 3D staggered reveal)
- [ ] Scroll indicator visible and animated at bottom of hero
- [ ] 3D scene responds to gentle mouse movement (parallax)
