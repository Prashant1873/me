# Phase 7 UI Specification: Education & Contact Sections

## 1. Design System & Typography Binding

All components adhere strictly to the Structured Intensity design system and tokens:
- **Section Tag**:
  - `font-family: var(--font-technical);`
  - `font-size: clamp(10px, 1.2vh, 11.5px);` (Evaluates to `10.8px` on 900p/720p)
  - `letter-spacing: var(--tracking-wider);` (`0.12em`)
  - `color: var(--accent-primary);` (`#2962FF` Dark / `#1D4ED8` Light)
- **Section Title**:
  - `font-family: var(--font-primary);`
  - `font-size: var(--text-section);` (`clamp(1.75rem, 3.2vh, 2.35rem)` -> `28.8px` on 900p / `28px` on 720p)
  - `font-weight: var(--weight-bold);` (`700`)
  - `line-height: 1.15;`
  - `letter-spacing: var(--tracking-tight);`
- **Section Subtitle**:
  - `font-family: var(--font-primary);`
  - `font-size: var(--text-section-sub);` (`clamp(0.875rem, 1.4vh, 1.05rem)` -> `14px`)
  - `color: var(--text-secondary);` (`#AAAAAA` Dark / `#334155` Light)
  - `line-height: 1.45;`
- **Editorial Closing Quote (`CONT-06`)**:
  - `font-family: var(--font-expressive);` (`Newsreader`, serif italic)
  - `font-size: clamp(1.1rem, 1.8vh, 1.35rem);`
  - `line-height: 1.5;`
  - `color: var(--text-primary);`

---

## 2. Component Blueprint: Education Section (`#education`)

### 2.1 Education Grid (3-Pillar Chassis)
- Container: `.education-pillars` (3 columns on desktop, 1 column scrollable on mobile).
- Gap: `clamp(10px, 1.6vh, 20px)`.
- Cards:
  1. `.education-card--academics`:
     - Crest / School badge header row (`IIT Bombay`, `CMS`, `St. Francis`).
     - Gold Medal accolade pills in Royal Blue / Warm Ivory.
     - Key engineering modules: Aerodynamics, Fluid Mechanics, Flight Control.
  2. `.education-card--governance`:
     - Abhyuday & Placement Cell leadership blocks.
     - Quantified impact metrics: `₹10M+ Budget`, `7M+ Reach`, `2000+ Students`.
     - High-contrast verification tags.
  3. `.education-card--creative`:
     - Performing arts & stage honors (Inter IIT Gold x2, Triple Gold Inter-Hostel).
     - Stand-up comedy & conclave hosting.
     - Inter-collegiate basketball & hockey captaincy.

### 2.2 Skills Matrix Row (`EDU-04`)
- Container: `.education-skills` (horizontal flex with category grouping: Strategy, Analytics, AI Engineering).
- Interactive pills: Hover elevates 2px, accent border glow.

---

## 3. Component Blueprint: Contact Section (`#contact`)

### 3.1 Contact Action Grid
- 4 interactive contact channel cards:
  1. **LinkedIn** (`CONT-01`): Direct link with LinkedIn brand blue hover accent.
  2. **GitHub** (`CONT-02`): Direct repository link with dark graphite / crisp white hover accent.
  3. **Email** (`CONT-03`): Direct `mailto:` link + discrete "Copy Email" icon button with 2s copied tooltip confirmation.
  4. **Phone** (`CONT-04`): Direct `tel:` link with phone icon and formatted number `+91 96967 21493`.

### 3.2 Resume Download Hero (`CONT-05`)
- High-visibility primary action button:
  - Text: `Download Official CV (PDF) ↓`
  - Secondary view action: `Preview In Browser ↗`
  - Elevated Royal Blue gradient / glow on hover.

### 3.3 Closing Editorial Block (`CONT-06`)
- Stylized quote card with Newsreader serif typography, royal blue quotation accent bar, and personal sign-off signature.

### 3.4 Site Footer
- Full-width technical metadata:
  - Left: `PRASHANT SHUKLA // IIT BOMBAY AEROSPACE // B.TECH 2026`
  - Right: `STRUCTURED INTENSITY V1.0 // 2026`

---

## 4. Theme & Accessibility Contracts
- All interactive links have `:focus-visible` outline rings with `var(--accent-primary-glow)`.
- Contrast ratios pass WCAG 2.2 AA (minimum 4.5:1 for body text, 3:1 for large headers).
- All cards feature smooth 160ms–240ms transition timings adhering to Structured Intensity token rules.
