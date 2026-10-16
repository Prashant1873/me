# Phase 11 Context: Experience 3D Canvas Polish & Particle Occlusion

## Background & Problem Statement
In Milestone 1, the Experience section was outfitted with a 3D horizontal spatial timeline featuring company medallions and revolving orbital particle rings. However, two primary visual defects persist:
1. **Particle Invisibility & Small Sizing:** Particle points across orbit rings, conduit beams, and dust are too minute to be noticed, especially on high-DPI displays. In light mode, pale particle colors blend into the background, making individual particles almost unrecognizable.
2. **Missing Z-Axis Occlusion:** Orbit rings rotating around company medallions currently render with `depthTest: false`, `renderOrder: 20`, and `position.z = 0.08`. When particles revolve into the rear half of their elliptical orbit (behind the medallion along the Z-axis), they remain completely visible on top of the logo, breaking physical depth and orbital realism.

## Target Experience & Requirements
- **EXP-3D-01 (Prominent Particle Scaling & Light Mode Visibility):**
  - Significantly scale up particle sizes across:
    - Orbit rings (from 0.52 to ~1.3–1.6)
    - Rim rings (from 0.46 to ~1.1–1.3)
    - Conduit core & flow streams (from 0.48/0.68 to ~1.2–1.6)
    - Cosmic dust motes (from 0.18 to ~0.55–0.75)
  - Adjust particle sprite texture to provide high radial definition with soft celestial halos.
  - In light mode, ensure saturated amber/gold, cyan, and deep royal blue tones with tuned opacity so particles stand out boldly against light ivory/white surfaces.
- **EXP-3D-02 (True Z-Axis Occlusion / Rear Attenuation):**
  - Center `orbitRing` along the Z-axis (`position.z = 0.0`) coincident with the medallion origin.
  - Enable `depthTest: true` and align render order so that particles passing behind the solid medallion disc (`backMesh` at z=0, depthWrite=true) are naturally occluded by the depth buffer.
  - Furthermore, incorporate Z-depth opacity attenuation or rear half fading so particles naturally diminish/disappear as they traverse behind the medallion z-plane.
  - Maintain 60fps performance across modern displays.

## Affected Files
- `src/js/experience-canvas.js`
- `tests/experience-canvas.spec.js` (or test suite)
