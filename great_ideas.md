# Great Ideas

Valuable concepts, design directions, and feature ideas for the portfolio.

## Design Direction
- **"Structured Intensity"** is the brand: industrial editorial minimalism + cinematic warmth
- Dark mode as signature; light mode as working/reading mode
- Orbital geometry motif = aerospace background + multiple interests orbiting coherent center
- Never compete with content — motifs support information, not replace it

## 3D Vision
- Hero orbital canvas: concentric circles with intersecting trajectories — feels like a command center
- Experience 3D timeline: literally floating in space, scroll through time as z-depth traversal
- Terrain landscape: weathered stone aesthetic as scrollable background narrative
- Particle systems: subtle, ethereal royal blue and silver particles that drift like dust motes in directional light
- Per-section objects: architectural/geometric forms that reinforce each section's theme

## Storytelling Arc
- The website tells Prashant's story linearly: who he is → what he's done → what he's built → where he learned → how to reach him
- Hero narrative: "thinker-builder hybrid" — behavioral psychology + automation obsession
- Not a resume on screen — a cinematic experience of meeting someone

## Technical Ideas
- GSAP ScrollTrigger for all scroll-linked animations — industry standard, best performance
- Full-viewport elastic section scroll: single long scroll advances exactly one section end-to-end with Apple fluid spring deceleration, rubber-band boundary bounce, zero-lag trackpad accumulator (14px threshold), and interruptible mid-flight reversals & chaining
- Three.js scenes should share a single WebGL renderer for performance
- Progressive enhancement: detect GPU capability, simplify 3D for mobile
- Prefers-reduced-motion: disable all 3D and transitions, show clean static layout
