# Phase 6: Projects Section - Cinematic Case Studies - Context

**Gathered:** 2026-10-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Build and render all 6 commercial and deep-tech products (BickerBape, StrokeCRM, TRINET, Know Your Archetype, CareerLoom, Marcutie) in the `#projects` section of the portfolio. Deliver cinematic project cards in a uniform grid, origin-aware GSAP click-to-expand showcases into full-viewport modal takeovers, integrated screenshot slideshows with design-system motion timings, monospace technical proof tags, and dual external CTAs (Live App & GitHub). Delivers requirements PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05, PROJ-06, and PROJ-07.
</domain>

<decisions>
## Implementation Decisions

### Card Grid & Visual Hierarchy
- **D-01:** Uniform 2x3 Grid Layout - All 6 project cards share identical dimensions, visual weight, and modular layout (2 rows of 3 columns on desktop, 2 columns on tablet, single column on mobile) - **Reversibility:** reversible - CSS grid column distribution.
- **D-02:** Screenshot Hero Card Composition - 16:9 screenshot banner at top with subtle hover depth, followed by project title, category tag in IBM Plex Mono, one-line summary, tech pills, and expand arrow - **Reversibility:** reversible - HTML template markup.
- **D-03:** Industrial Lift & Accent Border Glow - Card elevates -4px Y on hover, border highlights in Royal Blue (`#2962FF`) or Tungsten Amber (`#C38B55`), screenshot gently scales 1.03x with 200ms Structured Intensity timing - **Reversibility:** reversible - CSS transitions and hover states.
- **D-04:** Curated Story Sequence with Category Badges - Fixed narrative order: BickerBape → StrokeCRM → TRINET → Know Your Archetype → CareerLoom → Marcutie with category tags (`Fintech & Compounding`, `Cold Outreach`, `Manufacturing Intel`, `Behavioral Psych`, `Career Discovery`, `Creative Automation`), avoiding sparse filter tabs for 6 projects - **Reversibility:** reversible - data array ordering.

### Showcase Expansion Mechanics
- **D-05:** Immersive Fullscreen Modal Overlay - Card click expands into a focused cinematic viewport overlay with backdrop blur (`backdrop-filter: blur(12px)`), locking background scroll for deep narrative focus (ESC key or ✕ button to dismiss) - **Reversibility:** costly - modal component lifecycle, focus management, and scroll lock.
- **D-06:** Two-Column Cinematic Cockpit Layout - Left column (7 cols on 12-col desktop grid) features the interactive screenshot slideshow with thumbnail/caption strip; Right column (5 cols) features the integrated narrative flow (personal motivation opening, core problem, key innovations 3-bullet proof block, tech architecture badges, and live action links) - **Reversibility:** reversible - CSS grid layout within modal body.
- **D-07:** Origin-Aware Bounding Box GSAP Animation - Modal springs smoothly from the clicked card's exact grid coordinates (`getBoundingClientRect()`) to full modal bounds using GSAP ease (`power3.out`, ~240ms), collapsing back into its exact grid position upon close - **Reversibility:** costly - GSAP timeline coupled to DOM elements.
- **D-08:** Direct Modal Traversal & Keyboard Controls - Previous/Next project arrows and keyboard ArrowLeft / ArrowRight to cycle between projects directly inside the modal without returning to the grid, plus ESC, backdrop click, or ✕ button to close - **Reversibility:** reversible - event listeners in modal controller.

### Technical Badges & Innovation Proof
- **D-09:** Monospace Technical Status Tags & Proof Grid - Live technical tag on card thumbnail (e.g. `[● 98/98 TESTS]`, `[500+ MFRS]`, `[18 SCENARIOS]`) in IBM Plex Mono; inside modal, a dedicated 3-item Innovation & Proof grid highlights key innovations with metrics - **Reversibility:** reversible - card and modal templates.
- **D-10:** Dual Action CTAs - Card click opens full case study modal; small discrete external link icon (`↗`) on card allows instant direct jump to demo/repo; inside modal, prominent high-contrast buttons: Primary "Launch Live App ↗" (Royal Blue/Amber) and Secondary "View on GitHub ↗" (dark graphite with GitHub icon) - **Reversibility:** reversible - CTA link markup.
- **D-11:** Industrial Monospace Micro-Pills - Tech stack badges rendered in IBM Plex Mono 11px with dark graphite background (`var(--color-bg-alt)`), stone border, and subtle accent dot for primary language/framework - **Reversibility:** reversible - badge CSS utility class.
- **D-12:** Integrated Narrative Flow - Weave personal motivation seamlessly into the opening lines of the project summary (e.g., BickerBape: wanting to invest first salary without relying on black-box ratings; StrokeCRM: frustration with recurring SaaS fees and opaque spam algorithms; Archetype: deep behavioral psychology obsession mapping charisma into continuous vector math) - **Reversibility:** reversible - text content in project data records.

### The Agent's Discretion
- **Slideshow Controls & Transitions:** Integrated screenshot carousel uses next/prev chevron buttons, thumbnail navigation strip, and swipe/arrow-key support with smooth 200ms crossfade transitions conforming to Structured Intensity motion specs.
- **Responsive Stacking:** On tablet and mobile (< 900px), modal layout switches to a single vertical scrollable column with the screenshot slideshow pinned at the top.
- **Image Fallback:** High-fidelity SVG wireframes if any screenshot fails to load or during offline testing.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project & Design Specifications
- `.planning/ROADMAP.md` § Phase 6 - Requirements, deliverables (PROJ-01 to PROJ-07), and UAT criteria.
- `.planning/REQUIREMENTS.md` § Projects Section - Specifications for cards, expansion, slideshow, and stack badges.
- `src/styles/design-system.css` - Structured Intensity color tokens (Royal Blue `--color-accent-blue`, Coral `--color-accent-coral`, Tungsten Amber `--color-accent-amber`, Graphite backgrounds, borders), typography, and motion timings.
- `Structured_Intensity_Personal_Design_Language.docx` - Authoritative personal design language specification.
- `.planning/PROJECT.md` § Projects Portfolio - Comprehensive details for all 6 projects, tech stacks, and personal backstories.

### Project Media Assets
- `BickerBape/` - 7 authentic screenshots of mutual fund screener, SimSim compounding engine, and 98/98 tests.
- `StrokeCRM/` - 6 authentic screenshots of self-hosted cold email workspace and spam radar.
- `Trinet/` - 4 authentic screenshots of India Manufacturing Intelligence map and Gemini AI filters.
- `Archetype/` - 5 authentic screenshots of 18-scenario behavioral assessment and SVG radar charts.
- `Marcutie/` - 3 authentic screenshots of video generator and career intelligence tools.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/styles/design-system.css`: Complete set of design tokens for colors, typography, buttons, grid container, and badges.
- `src/js/experience-data.js` & `src/js/experience.js`: Established architectural pattern for clean data models separated from rendering controllers.
- `src/styles/experience.css`: Reference patterns for cards, tags, and theme-reactive border/contrast styles.

### Established Patterns
- GSAP + ScrollTrigger for animations and timeline choreographies.
- Theme switching observer (`data-theme="dark"` / `data-theme="light"`) with instant anti-FOUC support.
- Monospace metadata formatting with IBM Plex Mono for technical proof points.

### Integration Points
- `index.html`: Replace `#projects .section__placeholder` with `#projects-grid` and append `#project-modal` root.
- `src/js/projects-data.js`: New data module containing all 6 project records, screenshot paths, innovations, and links.
- `src/js/projects.js`: New UI module handling grid rendering, card hover interactions, GSAP modal expand/collapse, and slideshow carousel.
- `src/styles/projects.css`: Styles for project grid, cards, badges, modal takeover, and screenshot slideshow.
- `src/js/main.js`: Initialize `initProjects()` on DOM load.
</code_context>

<specifics>
## Specific Ideas
- Visual tone: Technical precision meets cinematic warmth; cards feel like physical, precision-crafted instrument consoles.
- Modal feel: Clicking a card feels like expanding a mission debrief or technical teardown.
- Screenshot slideshow: Built directly into the modal chassis with filmstrip indicators, not a generic floating carousel.
- Personal story connection: The opening sentence of each case study reveals why Prashant built it, keeping the site personal and authentic.
</specifics>

<deferred>
## Deferred Ideas
- Interactive embedded iframes / live sandbox playgrounds (V2-08) - deferred to v2.
- Video preview walkthroughs - deferred to v2.
</deferred>

---

*Phase: 06-projects-section-cinematic-case-studies*
*Context gathered: 2026-10-14*
