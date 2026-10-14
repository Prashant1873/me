# Phase 6: Projects Section — Cinematic Case Studies - Research

**Researched:** 2026-10-14  
**Domain:** Client-side Web Architecture, GSAP Bounding-Box Transitions, Accessible Slideshows, Modal Viewport Takeovers  
**Confidence:** HIGH  

## Summary

Phase 6 implements the complete Projects section (`#projects`) delivering all 6 commercial and deep-tech products: BickerBape, StrokeCRM, TRINET, Know Your Archetype, CareerLoom, and Marcutie. The technical architecture follows an industrial editorial aesthetic ("Structured Intensity") utilizing native Vanilla JS modules, modular CSS, and GSAP 3.12 for fluid, origin-aware bounding-box transitions.

Instead of heavy external modal or carousel dependencies, the section utilizes standard browser primitives: CSS Grid with `aspect-ratio: 16/9`, hardware-accelerated transforms, `inert` attribute for focus trapping, and GSAP timeline choreography. The authentic screenshots already present in the workspace (`BickerBape/`, `StrokeCRM/`, `Trinet/`, `Archetype/`, `Marcutie/`) provide authentic evidence of built systems with zero placeholder content.

**Primary recommendation:** Build a dedicated `projects-data.js` module exporting comprehensive case-study records, paired with a `projects.js` controller managing the uniform 2x3 grid, origin-aware bounding-box modal expansion (`power3.out`, 240ms), and an interactive 7-column slideshow cockpit.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01: Uniform 2x3 Grid Layout** — All 6 project cards share identical dimensions, visual weight, and modular layout (2 rows of 3 columns on desktop, 2 columns on tablet, single column on mobile).
- **D-02: Screenshot Hero Card Composition** — 16:9 screenshot banner at top with subtle hover depth, followed by project title, category tag in IBM Plex Mono, one-line summary, tech pills, and expand arrow.
- **D-03: Industrial Lift & Accent Border Glow** — Card elevates -4px Y on hover, border highlights in Royal Blue (`#2962FF`) or Tungsten Amber (`#C38B55`), screenshot gently scales 1.03x with 200ms Structured Intensity timing.
- **D-04: Curated Story Sequence with Category Badges** — Fixed narrative order: BickerBape → StrokeCRM → TRINET → Know Your Archetype → CareerLoom → Marcutie with category tags (`Fintech & Compounding`, `Cold Outreach`, `Manufacturing Intel`, `Behavioral Psych`, `Career Discovery`, `Creative Automation`), avoiding sparse filter tabs for 6 projects.
- **D-05: Immersive Fullscreen Modal Overlay** — Card click expands into a focused cinematic viewport overlay with backdrop blur (`backdrop-filter: blur(12px)`), locking background scroll for deep narrative focus (ESC key or ✕ button to dismiss).
- **D-06: Two-Column Cinematic Cockpit Layout** — Left column (7 cols on 12-col desktop grid) features the interactive screenshot slideshow with thumbnail/caption strip; Right column (5 cols) features the integrated narrative flow (personal motivation opening, core problem, key innovations 3-bullet proof block, tech architecture badges, and live action links).
- **D-07: Origin-Aware Bounding Box GSAP Animation** — Modal springs smoothly from the clicked card's exact grid coordinates (`getBoundingClientRect()`) to full modal bounds using GSAP ease (`power3.out`, ~240ms), collapsing back into its exact grid position upon close.
- **D-08: Direct Modal Traversal & Keyboard Controls** — Previous/Next project arrows and keyboard ArrowLeft / ArrowRight to cycle between projects directly inside the modal without returning to the grid, plus ESC, backdrop click, or ✕ button to close.
- **D-09: Monospace Technical Status Tags & Proof Grid** — Live technical tag on card thumbnail (e.g. `[● 98/98 TESTS]`, `[500+ MFRS]`, `[18 SCENARIOS]`) in IBM Plex Mono; inside modal, a dedicated 3-item Innovation & Proof grid highlights key innovations with metrics.
- **D-10: Dual Action CTAs** — Card click opens full case study modal; small discrete external link icon (`↗`) on card allows instant direct jump to demo/repo; inside modal, prominent high-contrast buttons: Primary "Launch Live App ↗" (Royal Blue/Amber) and Secondary "View on GitHub ↗" (dark graphite with GitHub icon).
- **D-11: Industrial Monospace Micro-Pills** — Tech stack badges rendered in IBM Plex Mono 11px with dark graphite background (`var(--color-bg-alt)`), stone border, and subtle accent dot for primary language/framework.
- **D-12: Integrated Narrative Flow** — Weave personal motivation seamlessly into the opening lines of the project summary (e.g., BickerBape: wanting to invest first salary without relying on black-box ratings; StrokeCRM: frustration with recurring SaaS fees and opaque spam algorithms; Archetype: deep behavioral psychology obsession mapping charisma into continuous vector math).

### The Agent's Discretion
- **Slideshow Controls & Transitions:** Integrated screenshot carousel uses next/prev chevron buttons, thumbnail navigation strip, and swipe/arrow-key support with smooth 200ms crossfade transitions conforming to Structured Intensity motion specs.
- **Responsive Stacking:** On tablet and mobile (< 900px), modal layout switches to a single vertical scrollable column with the screenshot slideshow pinned at the top.
- **Image Fallback:** High-fidelity SVG wireframes if any screenshot fails to load or during offline testing.

### Deferred Ideas (OUT OF SCOPE)
- Interactive embedded iframes / live sandbox playgrounds (V2-08) — deferred to v2.
- Video preview walkthroughs — deferred to v2.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| **PROJ-01** | Cinematic case-study cards for all 6 projects | Verified data model in `projects-data.js` covering BickerBape, StrokeCRM, TRINET, Archetype, CareerLoom, Marcutie. |
| **PROJ-02** | Each card: project name, one-line description, tech stack badges, thumbnail screenshot | Structured card template with 16:9 thumbnail, IBM Plex Mono status tag, Plus Jakarta Sans title, and monospace badges. |
| **PROJ-03** | Click-to-expand into full immersive showcase with multiple screenshots | Viewport modal overlay with backdrop blur and body scroll lock, mounting full project case study. |
| **PROJ-04** | Expanded view includes: detailed description, key innovations, tech stack, live URL / GitHub link | Two-column cockpit layout: 7-col slideshow + 5-col narrative, innovation proof grid, tech pills, and dual CTAs. |
| **PROJ-05** | Project screenshots displayed in integrated slideshow (not standalone images) | Interactive carousel component with main viewport, caption, and thumbnail strip. |
| **PROJ-06** | Slideshow transitions blend with site aesthetic (not generic carousel) | Structured Intensity motion timings (200ms `power2.out` crossfade + subtle translate). |
| **PROJ-07** | GSAP-powered expand/collapse animations | Origin-aware bounding box interpolation from clicked card to viewport modal using GSAP `power3.out` (240ms). |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Project Data & Metadata | Browser / Client (`projects-data.js`) | Static Files | Static portfolio with hardcoded authentic project history and image paths. |
| Card Grid Rendering | Browser / Client (`projects.js`) | CSS Grid | Dynamic injection of cards into `#projects-grid` in `index.html`. |
| Modal Takeover & Bounding-Box Zoom | Browser / Client (`projects.js` + GSAP) | DOM / Viewport | Coordinates computed via `getBoundingClientRect()` for seamless origin expansion. |
| Screenshot Slideshow | Browser / Client (`projects.js`) | DOM / CSS | State machine tracking active image index with keyboard/chevron controls. |
| Accessibility & Focus Trap | Browser / Client | Native HTML | `inert` attribute on `#site-nav` and `<main>` while modal is open, restoring focus on close. |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `gsap` | `^3.12.5` | Expand/collapse animations and card transitions | Already installed and bundled; highest performance Web animation engine [VERIFIED: package.json:13]. |
| Vanilla JS (ES Modules) | ES2022+ | Application logic and state management | Zero dependency overhead, maximum control over layout and DOM lifecycle. |
| Vanilla CSS | CSS3 | Industrial Editorial design system styling | Direct design token consumption (`var(--color-*)`, CSS grid, subgrid). |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@playwright/test` | `^1.64.0` | E2E and functional testing | Automated verification of modal expansion, slideshow transitions, and keyboard controls [VERIFIED: package.json:17]. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| GSAP FLIP Plugin | Custom bounding-box interpolation | Custom math avoids bundling commercial/extra plugins while providing full control over exact border radius and opacity easing. |
| Swiper.js / Embla | Custom Vanilla Carousel | Custom 60-line carousel component eliminates 40KB of external library code and integrates seamlessly with Structured Intensity tokens. |

---

## Package Legitimacy Audit

No new npm packages are required for Phase 6. All requirements are implemented using already verified and installed dependencies: `gsap` and `@playwright/test`.

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── js/
│   ├── projects-data.js      # Canonical project records, screenshots, metrics, innovations
│   ├── projects.js           # Grid renderer, modal lifecycle, GSAP animations, slideshow controller
│   └── main.js               # Entry point registering initProjects()
└── styles/
    ├── projects.css          # Grid layout, card styling, modal takeover, slideshow styles
    └── index.css             # Imports projects.css
```

### Pattern 1: Origin-Aware Bounding-Box Modal Expansion
```javascript
// Calculate card origin coordinates
const cardRect = cardEl.getBoundingClientRect();
const targetRect = {
  top: (window.innerHeight - modalHeight) / 2,
  left: (window.innerWidth - modalWidth) / 2,
  width: modalWidth,
  height: modalHeight
};

// Animate seamlessly from card bounds to modal bounds
gsap.fromTo(modalContainer, 
  {
    top: cardRect.top,
    left: cardRect.left,
    width: cardRect.width,
    height: cardRect.height,
    opacity: 0.8,
    borderRadius: '8px'
  },
  {
    top: targetRect.top,
    left: targetRect.left,
    width: targetRect.width,
    height: targetRect.height,
    opacity: 1,
    borderRadius: '12px',
    duration: 0.24,
    ease: 'power3.out'
  }
);
```

### Pattern 2: Body Scroll Lock without Layout Shift
```javascript
function lockScroll() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  document.body.style.paddingRight = '';
  document.body.style.overflow = '';
}
```

### Anti-Patterns to Avoid
- **Generic Carousels with tiny touch points:** Using generic pagination dots that fail WCAG 44px touch targets.
- **Overdone Glassmorphism:** Blurring every single container; reserve backdrop blur strictly for the modal underlay.
- **Missing Keyboard Accessibility:** Failing to trap tab focus or bind `ESC` and arrow keys.
- **Scroll Leaks:** Allowing background page scrolling while inspecting a case study.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Modal Focus Trapping | Complex custom keydown loop | `element.setAttribute('inert', '')` on sibling trees + `dialog` or focusable root | Native `inert` prevents focus leakage into background elements completely with zero edge cases. |
| Easing curves | Custom cubic bezier math | GSAP `power3.out` / `power2.out` | Hardware-accelerated, frame-synchronized easing. |

---

## Common Pitfalls

### Pitfall 1: Image Sizing and CLS in Slideshow
- **What goes wrong:** Slideshow jumps in height when switching between screenshots of differing aspect ratios.
- **Why it happens:** Images render at intrinsic dimensions before CSS layout constrains them.
- **How to avoid:** Lock the viewport container to a strict `aspect-ratio: 16 / 9` with `object-fit: contain` and background `#0C0C0C`, ensuring screenshots fit with letterboxing if needed.

### Pitfall 2: Modal Re-Opening with Stale State
- **What goes wrong:** Opening a project case study shows the previous project's active image index.
- **Why it happens:** Module-level index variable not reset on open.
- **How to avoid:** Explicitly reset `activeSlideIndex = 0` whenever `openProjectModal(projectId)` is called.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Playwright `^1.64.0` |
| Config file | `playwright.config.js` |
| Quick run command | `npx playwright test tests/projects.spec.js` |
| Full suite command | `npx playwright test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PROJ-01 | Render all 6 project cards in `#projects-grid` | E2E | `npx playwright test tests/projects.spec.js -g "all 6 project cards"` | ❌ Wave 0 |
| PROJ-02 | Card shows name, summary, badges, thumbnail, status tag | E2E | `npx playwright test tests/projects.spec.js -g "card internal elements"` | ❌ Wave 0 |
| PROJ-03 | Clicking card opens fullscreen modal with backdrop blur | E2E | `npx playwright test tests/projects.spec.js -g "modal expansion"` | ❌ Wave 0 |
| PROJ-04 | Modal displays innovations, stack, and functional CTAs | E2E | `npx playwright test tests/projects.spec.js -g "modal content and links"` | ❌ Wave 0 |
| PROJ-05 | Screenshot slideshow renders multiple images with thumbnails | E2E | `npx playwright test tests/projects.spec.js -g "slideshow rendering"` | ❌ Wave 0 |
| PROJ-06 | Slideshow transitions on next/prev click and arrow keys | E2E | `npx playwright test tests/projects.spec.js -g "slideshow controls"` | ❌ Wave 0 |
| PROJ-07 | GSAP animation runs and ESC key closes modal smoothly | E2E | `npx playwright test tests/projects.spec.js -g "modal collapse on ESC"` | ❌ Wave 0 |

### Wave 0 Gaps
- [ ] `tests/projects.spec.js` — comprehensive test suite covering all PROJ-01 through PROJ-07 requirements.

---

## Security Domain

### Applicable ASVS Categories
| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V5 Input Validation & Output Encoding | Yes | Text content injected safely via `textContent` or sanitized markup. |
| V14 Communication Security | Yes | All outbound links use `target="_blank"` and `rel="noopener noreferrer"`. |

---

## Sources

### Primary (HIGH confidence)
- `.planning/phases/06-projects-section-cinematic-case-studies/06-CONTEXT.md` [VERIFIED: this session]
- `.planning/phases/06-projects-section-cinematic-case-studies/06-UI-SPEC.md` [VERIFIED: this session]
- `package.json` [VERIFIED: gsap ^3.12.5, @playwright/test ^1.64.0]
- `src/styles/design-system.css` [VERIFIED: Structured Intensity tokens]

## Metadata
**Confidence breakdown:**
- Standard stack: HIGH — using verified local dependencies.
- Architecture: HIGH — verified pattern based on existing experience section.
- Pitfalls: HIGH — well-understood DOM modal and carousel gotchas.

**Research date:** 2026-10-14  
**Valid until:** 2026-11-14 (30 days)  
