# Requirements: Prashant Shukla Portfolio

**Milestone:** v4.0 - Project Modal Density & Dedicated Mobile Experience  
**Defined:** 2026-10-16  
**Core Value:** The website must feel unmistakably personal - like meeting Prashant, not reading his resume.

## Milestone 4 Requirements

### Project Dialogue Box Right-Side Vertical Density
- [x] **PROJ-12**: Eliminate empty/white vertical dead space on right side of project dialogue box by expanding content distribution and vertical fill to span the full modal height without overflow.
- [x] **PROJ-13**: Enrich modal narrative and innovation cards with deeper technical architecture highlights, metrics, and problem-solution insights tailored to each project.
- [x] **PROJ-14**: Ensure seamless proportional vertical flex flow between narrative, innovation grid, tech stack capsules, and footer CTAs across all desktop screen heights (720p to 1440p+) in both dark and light themes.

### Dedicated Mobile Experience & Layout Fitting
- [x] **MOB-01**: Strict isolation of all mobile visual styles within `@media (max-width: 768px)` ensuring 0% change or drift on desktop/web viewports (`min-width: 769px`).
- [x] **MOB-02**: Optimize mobile viewport fitting, padding, font scaling, and component layout across all 5 sections (Hero, Experience, Projects, Education, Contact) eliminating cramped clipping or excessive scroll height across 320px to 428px viewport widths.
- [x] **MOB-03**: Mobile project case study modal overhaul: ergonomic single-column vertical card flow, touch-optimized swipeable slideshow, full-width touch-friendly CTAs, and accessible close/traversal controls.
- [x] **MOB-04**: Mobile navigation drawer & header refinement: tactile menu button, ergonomic link spacing, quick thumb-reach closing, and seamless scroll-lock without layout jump.

---

## Future Requirements (Backlog)
- **REC-01**: Recruiter Mode toggle with condensed executive summary
- **RES-01**: Styled dynamic PDF resume download generated matching the Structured Intensity design system
- **DEP-01**: Production deployment pipeline and custom domain configuration
- **OG-01**: OpenGraph meta tags and dynamic social share card generation

---

## Out of Scope
- Backend CMS / Database: Static portfolio site, zero runtime backend requirements
- Desktop visual restyling: Desktop/web layout is already approved and must remain 100% frozen
- Generic framework migration: Strictly maintaining Vite + Vanilla JS + Three.js + GSAP stack

---

## Milestone Traceability Matrix

| Requirement | Phase | Scope | Status |
|---|---|---|---|
| PROJ-12 | Phase 22 | Modal right-side vertical space utilization | Complete |
| PROJ-13 | Phase 22 | Enriched project innovations & architecture insights | Complete |
| PROJ-14 | Phase 22 | Proportional vertical rhythm across desktop viewports | Complete |
| MOB-01 | Phase 23 | Strict `@media (max-width: 768px)` isolation | Complete |
| MOB-02 | Phase 23 | Viewport fitting, padding & typography across 5 sections | Complete |
| MOB-03 | Phase 23 | Mobile project modal single-column flow & touch actions | Complete |
| MOB-04 | Phase 23 | Mobile drawer ergonomics, thumb targets & scroll-lock | Complete |

---

## Overall Requirement Statistics
- **Milestone 1:** 57 / 57 Complete
- **Milestone 2:** 9 / 9 Complete
- **Milestone 3:** 10 / 10 Complete
- **Milestone 4:** 7 / 7 Complete
- **Total Requirements Tracked:** 83
