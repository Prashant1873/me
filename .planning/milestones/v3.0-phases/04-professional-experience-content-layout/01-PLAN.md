# Phase 4: Professional Experience - Content & Layout

## Goal
The 5 commercial, startup, and venture experience entries laid out with company details, roles, bullets, quantified metrics, authentic workplace photos from `Portfolio_images/`, and LinkedIn links, complete with category filter tabs matching Structured Intensity design standards.

*(Note: IIT Bombay institutional leadership bodies - Abhyuday and Placement Cell - have been strategically promoted to Section 03 "Education & Campus Impact" to elevate the IIT Bombay section into a high-stakes governance showcase).*

## Delivers
- EXP-02: Company cards for the 5 commercial/venture roles (IQVIA, Revolut, Ketto, Kalam Labs, FAOUD)
- EXP-03: Company name, role title, date range, 3–4 high-impact bullets, and quantified metric highlights
- EXP-04: Authentic workplace photos and branding from `Portfolio_images/`
- EXP-05: LinkedIn company links (clickable, opens in new tab with security attributes)
- EXP-06: Interactive category filters (All, Strategy & FinTech, Venture & Startups) with smooth transitions

## Plans

### PLAN-01: Centralized Commercial Experience Data Model & Asset Integration
- Create `src/js/experience-data.js` containing the 5 commercial entries:
  1. **IQVIA** (Strategy Consulting) - Analyst, Strategy Consulting [Jul 2026 – Present]
  2. **Revolut** (FinTech / CEO's Office) - CEO's Office Product Strategy Intern [Jan 2026 – Jun 2026]
  3. **Ketto.org** (HealthTech / Social Impact) - Product, Strategy & Operations Intern [Sep 2025 – Nov 2025]
  4. **Kalam Labs (YC S21)** (DeepTech / EdTech) - Founder's Office Intern [May 2025 – Jul 2025]
  5. **FAOUD** (0→1 Venture) - Head of Product [Dec 2024 – Apr 2025]
- Copy and wire photos from `Portfolio_images/` into `public/images/experience/`.
- Include verified LinkedIn URLs and key impact metrics for each entry.

### PLAN-02: Semantic HTML Structure & Category Filter Tabs
- Update `#experience` in `index.html` with:
  - Section tag: `01 // EXPERIENCE`
  - Editorial header: "Where I've Built & Scaled" + narrative subtitle
  - Filter bar: tablist with `All (7)`, `Work (4)`, `Entrepreneurship (1)`, `Leadership (2)`
  - Experience cards grid container (`#experience-grid`)

### PLAN-03: Structured Intensity Styling (`src/styles/experience.css`)
- Design industrial editorial cards matching pure black / dark mode and warm ivory / light mode tokens:
  - Header: Logo thumbnail, company name, date badge in `IBM Plex Mono`, category pill
  - Role title in `Plus Jakarta Sans` with subtle accent glow on hover
  - Impact metric callout banner (e.g. `£19.7M`, `150+ MSMEs`, `₹20M+ Raised`)
  - Crisp bullet points with monospaced custom arrows
  - Photo strip showing workplace photos with subtle zoom on hover
  - Outbound LinkedIn action link with SVG arrow
  - Filter tabs styling with glassmorphism, active indicator, and keyboard focus states
- Import `experience.css` in `src/styles/index.css`.

### PLAN-04: Dynamic Filtering Controller & Micro-interactions (`src/js/experience.js`)
- Render cards dynamically or progressively enhance markup
- Category tab switching with GSAP fade-scale stagger animations
- Workplace photo lightbox / expansion on click
- Wire up into `src/js/main.js`

### PLAN-05: Verification & Non-Regression Testing
- Verify all 7 entries render with accurate resume copy and photos
- Verify category filters work instantly and smoothly
- Verify all external LinkedIn links open in new tab
- Run automated tests (`tests/audit.spec.js`, `tests/zoom-out.spec.js`) to ensure zero regressions in scroll physics, layout bounding boxes, or performance

## UAT Checklist
- [x] All 5 commercial entries visible: IQVIA, Revolut, Ketto, Kalam Labs, FAOUD
- [x] Each entry displays: company name, role, date range, 3–4 bullet points, authentic photos, LinkedIn link
- [x] Authentic photos from `Portfolio_images/` render cleanly
- [x] Category tabs filter correctly: All (5), Strategy & FinTech (2), Venture & Startups (3)
- [x] LinkedIn links open correct company pages in new tab
- [x] Dark and light themes render flawlessly with WCAG AA contrast
- [x] Section scroll navigation advances smoothly without interference
