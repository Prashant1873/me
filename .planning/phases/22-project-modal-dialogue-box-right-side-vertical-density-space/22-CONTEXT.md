# Phase 22 Context: Project Modal Dialogue Box Right-Side Vertical Density & Space Optimization

**Phase:** 22
**Milestone:** v4.0
**Requirements:** PROJ-12, PROJ-13, PROJ-14

## Problem Statement
In the project case study dialogue box (`.project-modal`), the right side (`.modal-right-pane`) currently leaves excessive empty/white vertical dead space between the tech pills/innovations and the footer `.modal-ctas` (`margin-top: auto`). This makes the modal feel hollow and incomplete on standard desktop viewports (1080p, 900p, 768p).

## Locked Decisions & User Preferences

### 1. Vertical Space Fill Strategy: Hybrid
- Use proportional flex expansion across existing containers:
  - Increase `.modal-narrative` font size and breathing room.
  - Expand the 3 `.modal-innovation-item` cards with structured technical depth (architectural decisions, quantitative impact metrics, and operational context).
  - Elevate tech stack pill hierarchy.
  - Anchor `.modal-ctas` at the bottom with balanced top padding and subtle divider.
- Proportional flex grow ensures the content naturally and elegantly occupies 100% of the available vertical height without empty white gaps.

### 2. Viewport Density & Scrollbar Strategy: Fluid Clamp
- Dynamic clamp sizing on padding, gaps, card heights, and font sizes so that on viewports from 720p to 1440p+, the content fits 100% inside the modal without vertical overflow or scrollbars.
- Custom slim themed scrollbar remains as a graceful fallback for very short browser windows (height < 700px).
- Zero regression on desktop grid: all desktop visual styling (`min-width: 769px`) outside the modal remains untouched.

## Deliverables
- `src/styles/projects.css`: Calibrated layout for `.modal-right-pane`, `.modal-narrative`, `.modal-innovations-grid`, `.modal-innovation-item`, `.modal-tech-pills`, and `.modal-ctas`.
- `src/js/projects-data.js` & `src/js/projects.js`: Enriched innovation bullet copy and architecture highlights for all 6 projects (BickerBape, StrokeCRM, Trinet, Archetype, CareerLoom, Marcutie).
- Targeted test suite (`tests/projects-modal-density.spec.js`) verifying vertical space fill and zero awkward white gaps.
