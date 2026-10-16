# Phase 8 UI Specification: Responsive Design & Mobile Adaptation

## 1. Design System Tokens & Responsive Breakpoints

All components adhere strictly to the Structured Intensity design system with responsive extensions:

### 1.1 Breakpoint Tokens
- `--breakpoint-mobile-sm`: `375px` (Compact smartphones)
- `--breakpoint-mobile`: `767px` (Mobile upper limit)
- `--breakpoint-tablet`: `1024px` (Tablet portrait/landscape)
- `--breakpoint-desktop`: `1440px` (Desktop reference baseline)

### 1.2 Responsive Spacing & Padding
- **Desktop Grid Margin**: `var(--grid-margin)` = `clamp(2rem, 4vw, 4rem)` (32px–64px)
- **Tablet Grid Margin**: `clamp(1.5rem, 3vw, 2.5rem)` (24px–40px)
- **Mobile Grid Margin**: `var(--grid-margin-mobile)` = `16px` (320px–480px)
- **Section Vertical Padding (Desktop)**: `padding-top: calc(64px + clamp(14px, 2.4vh, 32px)); padding-bottom: clamp(12px, 2vh, 24px);`
- **Section Vertical Padding (Mobile)**: `padding-top: calc(56px + 20px); padding-bottom: 32px;`

### 1.3 Fluid Typography Scale
- **Hero Title**: `font-size: clamp(2.25rem, 7.5vw, 4.5rem); line-height: 1.05; letter-spacing: var(--tracking-hero);`
- **Section Title**: `font-size: clamp(1.65rem, 3vh + 1.2vw, 2.35rem); line-height: 1.15; letter-spacing: var(--tracking-tight);`
- **Section Subtitle**: `font-size: clamp(0.85rem, 1.2vw, 1.05rem); line-height: 1.5; color: var(--text-secondary);`
- **Card Titles**: `font-size: clamp(1rem, 1.5vw, 1.25rem); font-weight: var(--weight-bold);`
- **Body & Bullet Text**: `font-size: clamp(0.8125rem, 1vw, 0.9375rem); line-height: 1.55;`
- **Metadata / Section Tags**: `font-size: clamp(10px, 1.1vw, 11.5px); letter-spacing: var(--tracking-wider);`

---

## 2. Navigation Component Blueprint (`NAV-04`)

### 2.1 Sticky Header Layout (`.site-nav`)
- Height: `56px` on mobile (`≤ 768px`), `64px` on desktop.
- On Mobile (`≤ 768px`):
  - `.site-nav__logo`: Name + condensed tagline (`PRASHANT SHUKLA // IIT BOMBAY`).
  - `.site-nav__links`: Hidden (`display: none`).
  - Right cluster: Quick `#theme-toggle` (36px × 36px) + `#nav-toggle` hamburger button (44px × 44px).

### 2.2 Hamburger Toggle Button (`#nav-toggle`)
- Button Element:
  ```html
  <button id="nav-toggle" class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-nav-drawer">
    <span class="nav-toggle__bar"></span>
    <span class="nav-toggle__bar"></span>
    <span class="nav-toggle__bar"></span>
  </button>
  ```
- CSS Styling:
  - Width: `44px`, Height: `44px`, Display: `inline-flex`, `flex-direction: column`, `justify-content: center`, `align-items: center`, `gap: 5px`.
  - Bars: Width `22px`, Height `2px`, Background `var(--text-primary)`, Transition `transform 0.28s var(--ease-spring), opacity 0.2s ease`.
  - Active state (`.is-open`):
    - Bar 1: `transform: translateY(7px) rotate(45deg);`
    - Bar 2: `opacity: 0; transform: scaleX(0);`
    - Bar 3: `transform: translateY(-7px) rotate(-45deg);`

### 2.3 Mobile Navigation Drawer (`#mobile-nav-drawer`)
- HTML Structure:
  ```html
  <div id="mobile-nav-drawer" class="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation" hidden>
    <div class="mobile-drawer__backdrop" id="drawer-backdrop"></div>
    <div class="mobile-drawer__panel" id="drawer-panel">
      <div class="mobile-drawer__header">
        <span class="text-mono">00 // MENU</span>
        <button class="mobile-drawer__close" id="drawer-close" aria-label="Close navigation menu">✕</button>
      </div>
      <nav class="mobile-drawer__nav">
        <a href="#hero" class="mobile-drawer__link" data-section="hero">Home</a>
        <a href="#experience" class="mobile-drawer__link" data-section="experience">Experience</a>
        <a href="#projects" class="mobile-drawer__link" data-section="projects">Projects</a>
        <a href="#education" class="mobile-drawer__link" data-section="education">Education</a>
        <a href="#contact" class="mobile-drawer__link" data-section="contact">Contact</a>
      </nav>
      <div class="mobile-drawer__footer">
        <a href="/Prashant_Shukla_Resume_IIT_Bombay.pdf" download class="mobile-drawer__resume-btn">
          <span>Download Resume (PDF) ↓</span>
        </a>
        <div class="mobile-drawer__socials">
          <a href="https://www.linkedin.com/in/prashantmanishukla" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://github.com/Prashant1873" target="_blank" rel="noopener">GitHub</a>
          <a href="mailto:shuklaprashant847@gmail.com">Email</a>
        </div>
      </div>
    </div>
  </div>
  ```
- Drawer Animation:
  - Panel slides smoothly from the right (`transform: translateX(100%) -> translateX(0)`) over 300ms using `power3.out`.
  - Backdrop fades in from `opacity: 0 -> 1` with `backdrop-filter: blur(16px)`.
  - Links stagger reveal upward 10px with 40ms delays.

---

## 3. Section Reflow Blueprints

### 3.1 Hero Section (`#hero`)
- Layout on `≤ 900px`:
  - `col-span-7` and `col-span-5` stack.
  - Headline text takes 100% width with fluid `clamp(2.25rem, 7.5vw, 4.5rem)`.
  - 3D Canvas sits as ambient background behind text (`opacity: 0.28`, `pointer-events: none`).
  - Badges wrap horizontally with `gap: 6px`, min-height 28px each.
  - Scroll indicator centered at bottom, hides automatically if mobile viewport height `< 560px`.

### 3.2 Experience Section (`#experience`)
- Layout on `≤ 1024px`:
  - Section height switches from 100vh lock to `min-height: 100vh; height: auto;`.
  - 3D Timeline Track: Compact canvas height (`140px`).
  - Added Touch Controls: Previous / Next milestone arrow buttons (44px × 44px) placed adjacent to the active role card for 1-tap milestone cycling.
  - Detail card: Full width, padding `16px`, responsive font sizes, bullet points wrap cleanly with readable line-height (`1.55`).
  - Photo Lightbox & Timeline Calendar modals: Render as full-screen modal sheets with fixed top header and momentum-scrolled body.

### 3.3 Projects Section (`#projects`)
- Layout on `≤ 1024px`:
  - Section height switches to `min-height: 100vh; height: auto;`.
  - Grid: 2 columns on tablet (`768px – 1024px`), 1 column on mobile (`< 768px`).
  - Project Cards: Full width, touch target expands to whole card, tags wrap cleanly.
  - Modal Case Study Takeover:
    - Fullscreen overlay on mobile (`inset: 0`, `border-radius: 0`).
    - Sticky header bar with prominent Close button (`44px × 44px` tap target).
    - Screenshot slideshow: Full width aspect ratio `16 / 9` with large prev/next arrows (44px × 44px) and swipe gesture support.

### 3.4 Education Section (`#education`)
- Layout on `≤ 1024px`:
  - Section height switches to `min-height: 100vh; height: auto;`.
  - 3-Pillar Grid: Stacks into 1 column.
  - Cards: Spacing `16px`, logo crests sized `36px × 36px`, metrics badges wrapped with comfortable margins.
  - Skills Matrix: Categorized pills wrap cleanly across multiple lines, tap target height `36px` with `8px` gap.

### 3.5 Contact Section & Site Footer (`#contact`)
- Layout on `≤ 768px`:
  - Section height switches to `min-height: 100vh; height: auto;`.
  - Contact Action Grid: 2 columns on tablet, 1 column on mobile (`< 480px`).
  - Action Cards: Height `56px`, touch target `100% width × 56px`, icon + handle layout.
  - Copy Email Button: Dedicated touch button `44px × 44px` with clear toast feedback.
  - Resume Hero CTA: Full width, height `48px`, centered text with icon.
  - Editorial Quote: Newsreader serif, italic, centered, font-size `clamp(1rem, 2.5vw, 1.25rem)`.
  - Site Footer: Stacked column layout on mobile, centered text, `gap: 8px`.

---

## 4. Accessibility & Touch Target Contract (`RESP-04`, `RESP-05`)

### 4.1 Minimum Touch Targets (≥ 44px × 44px)
| Interactive Element | Mobile Selector | Touch Target Size |
| :--- | :--- | :--- |
| Hamburger Menu Button | `#nav-toggle` | 44px × 44px |
| Mobile Drawer Links | `.mobile-drawer__link` | 100% × 48px |
| Theme Toggle | `#theme-toggle` | 44px × 44px (touch container) |
| Milestone Steppers | `.experience-nav-btn` | 44px × 44px |
| Modal Close Buttons | `.modal-close`, `#drawer-close` | 44px × 44px |
| Slideshow Navigation | `.slideshow__btn` | 44px × 44px |
| Contact Channel Links | `.contact-channel-card` | 100% × 56px |
| Email Copy Button | `.contact-copy-btn` | 44px × 44px |
| Resume Download Buttons| `.resume-btn`, `.contact-resume-btn` | 100% × 48px |

### 4.2 Keyboard Navigation & Focus Ring Contract
- `:focus-visible` styling applied across all buttons, anchors, and interactive cards:
  ```css
  :focus-visible {
    outline: 2px solid var(--accent-primary) !important;
    outline-offset: 3px !important;
  }
  ```
- Focus trap implemented in `#mobile-nav-drawer`, `#project-modal`, and `#experience-timeline-modal`.
- Escape key listener active on all modals and mobile navigation drawer.
- Focus returns to the opening trigger button whenever a modal or drawer is dismissed.
