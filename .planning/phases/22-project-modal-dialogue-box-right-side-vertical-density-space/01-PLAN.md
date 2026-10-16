# Phase 22: Project Modal Dialogue Box Right-Side Vertical Density & Space Optimization

## Context & Objectives
In the project case study dialogue box (`.project-modal`), the right side (`.modal-right-pane`) currently has excessive empty/white vertical dead space between the innovations/tech pills and the footer CTAs (`margin-top: auto`). This makes the modal feel hollow on standard desktop viewports (1080p, 900p, 768p).

The objective is to achieve a balanced, dense, and premium vertical space distribution:
- Proportional flex expansion across `.modal-narrative`, `.modal-innovations-grid`, `.modal-innovation-item`, `.modal-tech-pills`, and `.modal-ctas`.
- Enrich all 6 projects with deeper technical architecture highlights, metrics, and problem-solution insights in `src/js/projects-data.js`.
- Use fluid clamp sizing so content naturally occupies 100% of the modal height without awkward gaps and without forcing vertical scrollbars on standard desktop viewports (720p to 1440p+).

## Requirements Covered
- **PROJ-12**: Eliminate empty/white vertical dead space on right side of project dialogue box by expanding content distribution and vertical fill to span the full modal height without overflow.
- **PROJ-13**: Enrich modal narrative and innovation cards with deeper technical architecture highlights, metrics, and problem-solution insights tailored to each project.
- **PROJ-14**: Ensure seamless proportional vertical flex flow between narrative, innovation grid, tech stack capsules, and footer CTAs across all desktop screen heights (720p to 1440p+) in both dark and light themes.

## Implementation Tasks

1. **Enrich Project Data & Architecture Substance (`src/js/projects-data.js`)**:
   - For all 6 projects (BickerBape, StrokeCRM, Trinet, Archetype, CareerLoom, Marcutie), expand the 3 innovation entries with substantive technical architecture context, quantitative KPI metrics, and operational breakthroughs.
   - Refine the editorial narrative quotes for each project to provide punchy, high-leverage product framing.

2. **Proportional Vertical Flex Layout & Spacing (`src/styles/projects.css`)**:
   - Refactor `.modal-right-pane` to distribute content proportionally across the full vertical height of `.project-modal__chassis`.
   - Calibrate `.modal-narrative` font size, line-height, and padding.
   - Expand `.modal-innovation-item` with structured padding, subtle borders, and elevated metric chips.
   - Optimize `.modal-tech-pills` and `.modal-tech-pill` capsule sizes and spacing.
   - Style `.modal-ctas` with clean border-top, fluid height, and seamless bottom anchoring so the space between stack and CTAs is balanced and intentional with zero dead void.
   - Apply fluid clamp vertical sizing (`clamp(...)`) across gaps, padding, and font sizes to ensure 100% viewport fit without vertical scrollbars on standard 1080p, 900p, 768p, and 720p desktop heights (with thin themed scrollbar fallback on ultra-short windows).

3. **DOM Rendering & Attribute Alignment (`src/js/projects.js`)**:
   - Ensure `.modal-right-pane` renders the enriched innovation data with clean semantic hierarchy and high-contrast styling in both dark and light modes.
   - Verify keyboard traversal (prev/next project, ESC) maintains proper scroll positioning and layout density.

4. **Automated Verification & Regression Check**:
   - Author Playwright test `tests/projects-modal-density.spec.js`:
     - Verify right pane vertical space utilization and measure gap between tech pills and CTAs.
     - Verify enriched metrics and innovation items render across all 6 projects.
     - Verify 100% viewport fit and scrollbar absence on 1920x1080, 1440x900, 1366x768, and 1280x720 viewports.
     - Verify dark and light mode contrast and visual hierarchy.
   - Run full project test suite (`tests/projects.spec.js`, `tests/projects-contrast.spec.js`, `tests/projects-backdrop-layout.spec.js`, `tests/no-em-dash.spec.js`).
   - Validate Vite production build (`npm run build`).
