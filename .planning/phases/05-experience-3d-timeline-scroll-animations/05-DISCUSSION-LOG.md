# Phase 5: Experience — 3D Timeline & Scroll Animations - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-10-13
**Phase:** 5-experience-3d-timeline-scroll-animations
**Areas discussed:** Spatial Architecture & Layout Integration, Scroll Traversal & Camera Mechanics, 3D Visual Motif & Lighting, Category Filtering Dynamics

---

## Spatial Architecture & Layout Integration

| Option | Description | Selected |
|--------|-------------|----------|
| Hybrid Spatial & Detail Sync | Dedicated 3D timeline canvas alongside synchronized interactive card panel (preserves photos, metrics, and links) | ✓ |
| Overlay Depth Fly-Through | Full-width 3D scene in background with floating glassmorphic DOM cards | |
| Dual-View Toggle | Toggle between "3D Spatial Journey" and "Editorial Document View" | |

**User's choice:** Hybrid Spatial & Detail Sync

| Option | Description | Selected |
|--------|-------------|----------|
| 5-Col 3D Canvas / 7-Col Detail Card | Generous space for 3–4 bullets, metrics, and photos without cramping | ✓ |
| 50/50 Balanced Split | 6-col canvas / 6-col card | |
| 3D Center Spine with Floating Sticky Card | Center 3D spine with card pinned dynamically on right | |

**User's choice:** 5-Col 3D Canvas / 7-Col Detail Card

| Option | Description | Selected |
|--------|-------------|----------|
| 3D Nodes as Primary Navigation + Mono Date Rail | Raycast clicking on 3D nodes + minimalist mono date rail along edge | ✓ |
| Floating Prev/Next Milestone Controls | Overlaid chevron buttons on canvas | |
| Retain Compact 2-Col Company List | 2-col list + 4-col canvas + 6-col card | |

**User's choice:** 3D Nodes as Primary Navigation + Mono Date Rail

| Option | Description | Selected |
|--------|-------------|----------|
| Responsive Vertical Stack | Sticky ~240px 3D header above card on tablet/mobile with touch dragging | ✓ |
| Graceful 2D Fallback on Mobile | SVG timeline rail on small phones | |
| Full-Bleed Background 3D on Mobile | 3D canvas behind transparent mobile cards | |

**User's choice:** Responsive Vertical Stack

---

## Scroll Traversal & Camera Mechanics

| Option | Description | Selected |
|--------|-------------|----------|
| Pinned Scroll Scrubbing | Section pins via ScrollTrigger while user scrubs in z-depth through all 5 roles | ✓ |
| Smooth Parallax (Unpinned) | Unpinned natural document scroll | |
| Step-Snapped Scroll | Quantized scroll snapping per wheel tick | |

**User's choice:** Pinned Scroll Scrubbing

| Option | Description | Selected |
|--------|-------------|----------|
| Curved Aerospace Spline | Camera banks and glides along 3D spline trajectory | |
| Linear Z-Depth Dolly | Straight track along Z-axis; previous nodes dissolve behind camera plane | ✓ |
| Rotational Orbit | Camera revolves around central focal point | |

**User's choice:** Linear Z-Depth Dolly

| Option | Description | Selected |
|--------|-------------|----------|
| Crisp Editorial Crossfade & Metric Ticker | 200ms subtle fade + 6px Y-offset with metric counters (Structured Intensity standard) | ✓ |
| Vertical Conveyor Slide | Industrial data reel vertical slide | |
| Perspective 3D Tilt & Settle | Card tilts in 3D CSS perspective | |

**User's choice:** Crisp Editorial Crossfade & Metric Ticker

| Option | Description | Selected |
|--------|-------------|----------|
| Seamless GSAP Nav Sync + Progress Track | Nav clicks scroll to entry; includes % progress track & arrow key support | ✓ |
| Instant Anchor Jump | External nav bypasses internal scrub | |
| Include Quick Skip Button | "Skip 3D Journey ↓" link | |

**User's choice:** Seamless GSAP Nav Sync + Progress Track

---

## 3D Visual Motif & Lighting

| Option | Description | Selected |
|--------|-------------|----------|
| Aerospace Telemetry Waypoints | Radar rings, crosshairs, wireframe cores | |
| Architectural Datum Spine with Geometric Nodes | Clean linear datum cable with faceted octahedron nodes | |
| Particle Stream & Cosmic Dust Conduits | Glowing particle ribbon with concentrated star-clusters at role milestones | ✓ |

**User's choice:** Particle Stream & Cosmic Dust Conduits

| Option | Description | Selected |
|--------|-------------|----------|
| Tungsten Amber Primary (#C38B55) with Subtle Cyan/Blue Particles | Warm tungsten amber milestone glow with cool cosmic dust particles | ✓ |
| Monochromatic Coral & Royal Blue | Matches Hero canvas colors | |
| Category-Mapped Particle Colors | Tint nodes by role category | |

**User's choice:** Tungsten Amber Primary (#C38B55) with Subtle Cyan/Blue Particles

| Option | Description | Selected |
|--------|-------------|----------|
| Mouse Parallax + Raycast Hover Bloom | Subtle camera offset following cursor with halo bloom on hovered nodes | ✓ |
| Interactive Particle Magnetic Distortion | Particles swirl toward mouse | |
| Clean Static Framing | No mouse parallax | |

**User's choice:** Mouse Parallax + Raycast Hover Bloom

| Option | Description | Selected |
|--------|-------------|----------|
| Adaptive Particle Budget (400–600 particles) + IntersectionObserver Pausing | High density, pixelRatio capped at 2, RAF loop pauses off-screen | ✓ |
| Ultra-Lean Budget (<250 particles) | Guaranteed 60fps on low-power devices | |
| Rich Shader Simulation (1000+ particles) | Custom GLSL vertex shaders | |

**User's choice:** Adaptive Particle Budget (400–600 particles) + IntersectionObserver Pausing

---

## Category Filtering Dynamics

| Option | Description | Selected |
|--------|-------------|----------|
| Spatial Focus & Dimming with Camera Dolly | Inactive nodes dim to 15% opacity; camera smoothly glides to first matching role | ✓ |
| Dynamic Z-Depth Re-indexing | Timeline physically contracts | |
| Visual Highlight Only | All nodes stay bright, pulse rings on active | |

**User's choice:** Spatial Focus & Dimming with Camera Dolly

| Option | Description | Selected |
|--------|-------------|----------|
| Retain as Alternate 2D Calendar Matrix Modal | Separate full modal | |
| Remove 2D Modal | Delete modal completely | |
| Integrate as Toggle in the Detail Card | Small "View Dates" mini-chart inside the detail card instead of full modal | ✓ |

**User's choice:** Integrate as Toggle in the Detail Card

| Option | Description | Selected |
|--------|-------------|----------|
| Navigate Only Filtered Roles | Arrow keys jump strictly between active category milestones | ✓ |
| Chronological Traversal Auto-Switching Tabs | Arrow keys cycle all roles | |
| Pure Scroll Scrubbing | Arrow keys scrub scroll | |

**User's choice:** Navigate Only Filtered Roles

| Option | Description | Selected |
|--------|-------------|----------|
| Smooth Bloom & Restore Opacities | Dimmed nodes fade back over 400ms without displacing camera position | ✓ |
| Quick Wide-Angle Macro Flyby | Camera zooms back to show full timeline | |
| Snap Reset to Latest Role | Re-centers camera on IQVIA | |

**User's choice:** Smooth Bloom & Restore Opacities

---

## Deferred Ideas
None.
