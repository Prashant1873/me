# Phase 10 UI Specification: Performance, Polish & Deployment

## 1. Reduced Motion Visual Behavior (RESP-07)
When `prefers-reduced-motion: reduce` is active:
- **Terrain**: Rendered with static baseline elevation waves; wireframe lines remain crisp and visible without undulating displacement.
- **Particle Constellations**: Preserves the geometric formation for the active section (nucleus, conduit, voxel matrix, star, pulsar), but halts micro-flutter.
- **Section Transitions**: Smooth crossfade/instant cut without rapid camera translation swoops.
- **DOM Animations**: Entrance fades, modal expands, and header reveals complete in <= 10ms.

## 2. Low-Power & Fallback State (3D-09)
If WebGL context is lost or unsupported:
- Canvas fades to zero opacity.
- Stacking context falls back to CSS atmospheric gradient:
  - Dark Mode: `radial-gradient(ellipse at 50% 20%, #121829 0%, #050508 70%)`
  - Light Mode: `radial-gradient(ellipse at 50% 20%, #E8EEF5 0%, #F5F3ED 70%)`
- Section content and cards remain 100% legible, maintaining WCAG 2.2 AA contrast.

## 3. Semantic Hierarchy & Landmarks (RESP-06)
- **Landmarks**:
  - `<header>`: `.site-nav` sticky navigation
  - `<main>`: Core portfolio sections
  - `<section>`: Hero, Experience, Projects, Education, Contact
  - `<footer>`: `.site-footer` with social channels and copyright
- **Heading Order**:
  - `h1`: Single instance `PRASHANT SHUKLA` in `#hero`
  - `h2`: Section titles (`01 // EXPERIENCE`, `02 // SELECTED WORK`, `03 // EDUCATION`, `04 // CONTACT`)
  - `h3`: Card titles and project titles
  - `h4`: Modal subheadings and innovation items

## 4. SEO & Social Preview Assets (DEPL-03)
- Favicon: Multi-resolution SVG polygon with dark and light adaptive strokes.
- OG Image: 1200x630px social card banner featuring Structured Intensity typography and aerospace motif.
- Meta Description: "Prashant Shukla - Product & Automation Architect, IIT Bombay Aerospace Engineering graduate. Portfolio featuring end-to-end case studies, 3D timelines, and engineering leadership."
