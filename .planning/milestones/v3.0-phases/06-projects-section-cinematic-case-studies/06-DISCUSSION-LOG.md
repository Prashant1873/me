# Phase 6: Projects Section - Cinematic Case Studies - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-10-14
**Phase:** 06-projects-section-cinematic-case-studies
**Areas discussed:** Card Grid & Visual Hierarchy, Showcase Expansion Mechanics, Technical Badges & Innovation Proof

---

## Card Grid & Visual Hierarchy

| Option | Description | Selected |
|--------|-------------|----------|
| Asymmetric Editorial Grid | Top 2 flagship projects (BickerBape & StrokeCRM) get prominent wide cards; remaining 4 projects get balanced 2-column cards below | |
| Uniform 2x3 Grid | All 6 project cards share identical dimensions, visual weight, and layout | ✓ |
| Interactive Split-Screen Index | Left list/rail of 6 project titles with dynamic preview pane on right | |
| You decide | Agent picks layout | |

**User's choice:** Uniform 2x3 Grid - All 6 project cards share identical dimensions, visual weight, and layout
**Notes:** Provides a cohesive, balanced, modular aesthetic across the section.

| Option | Description | Selected |
|--------|-------------|----------|
| Screenshot Hero Card | 16:9 screenshot banner at top with subtle hover depth, followed by project title, category tag, one-line summary, tech pills, and expand arrow | ✓ |
| Editorial Paper-Frame Card | Elegant framed card highlighting personal backstory quote and core value first, with thumbnail inset below | |
| Terminal Spec Card | Technical header with live status pill, framed UI preview, and structured bullet list | |
| You decide | Agent picks internal composition | |

**User's choice:** Screenshot Hero Card
**Notes:** Visual-first presentation gives immediate proof of working software.

| Option | Description | Selected |
|--------|-------------|----------|
| Industrial Lift & Accent Border Glow | Card elevates -4px, border highlights in Royal Blue/Amber, screenshot gently scales 1.03x (200ms Structured Intensity timing) | ✓ |
| Restrained Border Contrast Shift | Card stays stationary, only fine border and title brighten to accent color | |
| 3D Mouse-Tilt Parallax | Card tilts dynamically with cursor movement with subtle specular light gleam | |
| You decide | Agent picks hover micro-interaction | |

**User's choice:** Industrial Lift & Accent Border Glow
**Notes:** Subtle, tactile feedback without excessive motion.

| Option | Description | Selected |
|--------|-------------|----------|
| Curated Impact Sequence | Fixed story order (BickerBape → StrokeCRM → TRINET → Archetype → CareerLoom → Marcutie) with category tags on cards, no filter tabs | ✓ (Agent Discretion) |
| Category Filter Pills | Top filter tabs with GSAP reflow filtering | |
| You decide | Agent chooses between filtering and fixed order | ✓ |

**User's choice:** You decide
**Notes:** Agent selected curated sequence with category badge tags to avoid sparse filter categories for 6 items.

---

## Showcase Expansion Mechanics

| Option | Description | Selected |
|--------|-------------|----------|
| Immersive Fullscreen Modal | Card expands into a focused cinematic viewport overlay with backdrop blur, locking background scroll for deep narrative focus | ✓ |
| In-Place Expanding Grid Drawer | Card unfolds directly in the page grid, pushing other cards down smoothly without an overlay modal | |
| Slide-Over Side Sheet | Deep-dive panel slides in from the right side of the screen | |
| You decide | Agent picks expansion mechanism | |

**User's choice:** Immersive Fullscreen Modal
**Notes:** Full immersion for deep reading and multi-screenshot inspection.

| Option | Description | Selected |
|--------|-------------|----------|
| Two-Column Cinematic Cockpit | Left column features interactive screenshot slideshow with caption strip; Right column features personal backstory, key innovations, tech architecture, and live links | ✓ (Agent Discretion) |
| Single Column Long-Form Case Study | Top hero slideshow banner followed by a flowing editorial article structure | |
| Tabbed Deep-Dive | Pinned screenshot view on left with switchable tabs on right | |
| You decide | Agent chooses modal layout | ✓ |

**User's choice:** You decide
**Notes:** Agent selected two-column cockpit layout for side-by-side visual inspection and narrative reading on desktop.

| Option | Description | Selected |
|--------|-------------|----------|
| Origin-Aware Bounding Box Expansion | Card springs smoothly from its clicked position to full modal bounds (240ms GSAP ease), collapsing back to its exact grid position | ✓ |
| Centered Editorial Scale-Fade | Modal quickly fades in from center (0.96 → 1.0 scale, 180ms timing) with dark backdrop blur | |
| Staggered Sheet Reveal | Dark backdrop dims immediately, modal slides up 20px with staggered reveals | |
| You decide | Agent picks animation choreography | |

**User's choice:** Origin-Aware Bounding Box Expansion
**Notes:** High spatial continuity; the card visibly transforms into the modal and returns.

| Option | Description | Selected |
|--------|-------------|----------|
| Direct Modal Traversal & Dismissal | Previous/Next project arrows (and keyboard Arrow keys) to cycle between projects directly inside the modal, plus ESC / ✕ / backdrop click to close | ✓ |
| Dismissal Back to Grid Only | Modal is single-project focused; ESC, backdrop click, or ✕ button closes it back to grid view | |
| Bottom Project Dock | Mini project switch dock fixed at modal bottom showing all 6 project icons | |
| You decide | Agent picks modal navigation | |

**User's choice:** Direct Modal Traversal & Dismissal
**Notes:** Allows seamless browsing through all 6 case studies without constant reopening.

---

## Technical Badges & Innovation Proof

| Option | Description | Selected |
|--------|-------------|----------|
| Monospace Technical Status Tag | Live technical tag on card thumbnail (e.g. [● 98/98 TESTS], [500+ MFRS]) and a dedicated 3-item Innovation & Proof grid inside modal | ✓ (Agent Discretion) |
| Standard Tech Stack Badges | Metrics presented simply as text chips alongside language/framework tags in footer | |
| Accent Metric Callout Ribbon | Prominent colored ribbon banner displaying the standout metric across card corner | |
| You decide | Agent picks proof metrics display | ✓ |

**User's choice:** You decide
**Notes:** Agent selected monospace status tags on card thumbnails paired with a 3-item proof block in the modal.

| Option | Description | Selected |
|--------|-------------|----------|
| Dual Action CTAs | Card click opens full case study modal; small discrete external icon on card allows instant direct jump; inside modal, high-contrast primary ('Launch Live App ↗') and secondary ('View on GitHub ↗') buttons | ✓ |
| Modal-Only CTAs | Cards strictly expand the modal to keep grid clean; all outbound links reside exclusively inside the expanded showcase | |
| Full Button Bar on Cards | Each card in the grid has visible 'Live Demo' and 'GitHub' buttons alongside 'Case Study' | |
| You decide | Agent picks CTA approach | |

**User's choice:** Dual Action CTAs
**Notes:** Direct access for power visitors; full depth for reviewers.

| Option | Description | Selected |
|--------|-------------|----------|
| Industrial Monospace Micro-Pills | IBM Plex Mono 11px, graphite background, stone border, with subtle accent dot on primary framework | ✓ |
| Minimalist Slash-Delimited Monospace | Clean inline text list with no pill background | |
| Standard Rounded SaaS Pills | Soft rounded pills in neutral grey with dark/light mode contrast adaptation | |
| You decide | Agent picks badge styling | |

**User's choice:** Industrial Monospace Micro-Pills
**Notes:** Perfectly aligned with Structured Intensity design language.

| Option | Description | Selected |
|--------|-------------|----------|
| Newsreader Editorial Personal Quote | Prominently styled in Newsreader italic at the top of the case study connecting personal motivation to product | |
| Dedicated 'Origin Story' Subheading | Standalone technical origin paragraph under a clear section header | |
| Integrated Narrative Flow | Weave personal motivation seamlessly into the opening lines of the project summary | ✓ |
| You decide | Agent picks backstory approach | |

**User's choice:** Integrated Narrative Flow
**Notes:** Organic, unified storytelling connecting personal human need directly into the product design.

---

## The Agent's Discretion

- **Curated project order:** Ordered as BickerBape → StrokeCRM → TRINET → Archetype → CareerLoom → Marcutie.
- **Two-Column Cockpit Layout:** 7 columns for screenshot slideshow and filmstrip, 5 columns for narrative, innovations, stack, and CTAs.
- **Technical Status Tags:** Monospace status pill on card thumbnail header + 3-item innovation proof grid inside modal.
- **Slideshow Transitions:** 200ms ease with chevron buttons, thumbnail track, and keyboard left/right arrow support.

## Deferred Ideas

- In-modal interactive live iframes/playgrounds (V2-08) - deferred to v2.
- Video preview walkthroughs - deferred to v2.
