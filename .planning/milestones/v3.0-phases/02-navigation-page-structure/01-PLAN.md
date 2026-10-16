# Phase 2: Navigation & Page Structure

## Goal
Sticky navigation bar, semantic HTML sections for all 5 areas, smooth scroll-to-section, dark/light mode toggle, active section highlighting.

## Plans

### PLAN-01: Replace demo page with portfolio HTML structure
- Replace `index.html` demo content with semantic single-page portfolio structure
- Sections: `#hero`, `#experience`, `#projects`, `#education`, `#contact`
- Proper landmark elements: `<header>`, `<main>`, `<section>`, `<footer>`
- Single `<h1>` for hero, proper heading hierarchy throughout
- Placeholder content in each section (real content comes in later phases)

### PLAN-02: Sticky navigation bar with section links
- Fixed/sticky `<nav>` at top with glassmorphic background
- Nav links: Home, Experience, Projects, Education, Contact
- Plus Jakarta Sans typography for nav items
- Logo/name on left, links on right
- Compact when scrolled (slightly smaller height)
- CSS transitions for background/height changes on scroll

### PLAN-03: Navigation CSS in new file `src/styles/navigation.css`
- Nav bar styles: glassmorphic backdrop, border-bottom
- Nav link styles: hover states, active indicator
- Scroll-aware compact state
- Active section indicator (underline or dot)
- Import into `index.css`

### PLAN-04: Smooth scroll + active section tracking in JS
- Click nav link → smooth scroll to section (using native `scrollIntoView` + CSS `scroll-behavior: smooth`)
- IntersectionObserver to track which section is in view
- Update active nav link class based on visible section
- Scroll-aware nav compaction (add class on scroll past threshold)

### PLAN-05: Dark/light mode toggle in nav
- Move theme toggle into the navigation bar
- Sun/moon icon toggle (inline SVG, no deps)
- Preserve localStorage persistence from Phase 1
- Smooth theme transition on body

### PLAN-06: Section layout CSS in `src/styles/sections.css`
- Base section styles: min-height, padding, consistent spacing
- Section heading patterns
- Import into `index.css`

## UAT Checklist
- [ ] Clicking any nav button smoothly scrolls to the correct section
- [ ] Scroll position updates the active nav indicator
- [ ] Dark mode is default; toggle switches to light mode and back
- [ ] HTML passes semantic structure check (h1 hierarchy, landmarks)
- [ ] Navigation typography matches Plus Jakarta Sans spec
- [ ] Nav becomes compact on scroll
- [ ] Glassmorphic nav background visible
