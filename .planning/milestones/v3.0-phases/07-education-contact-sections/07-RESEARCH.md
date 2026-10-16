# Phase 7 Research: Education & Contact Sections Architecture

## 1. Domain & Content Mapping

### 1.1 Education & Pedigree
- **IIT Bombay (Primary Anchor)**:
  - Degree: B.Tech Aerospace Engineering (2022–2026)
  - Logo Asset: `/images/logos/Indian_Institute_of_Technology_Bombay_Logo.svg.webp`
  - Core Focus: Flight dynamics, aerodynamics, autonomous control, fluid mechanics.
  - Highlights: President / leadership positions across Asia's largest student bodies.
- **City Montessori School (CMS), Lucknow**:
  - Class 12 (ISC Examination)
  - Result: **98.25% Gold Medal**
  - Logo Asset: `/images/logos/cms.png`
  - National ranking, mathematics & physics excellence.
- **St. Francis' College, Lucknow**:
  - Class 10 (ICSE Examination)
  - Result: **98.00% Gold Medal**
  - Logo Asset: `/images/logos/St._Francis_Lucknow.png`
  - Foundation in analytical rigor, oratory, and stage dramatics.

### 1.2 Campus Governance & Leadership
- **Abhyuday, IIT Bombay (Operations & Marketing Head)**:
  - Reach: 7M+ Pan-India reach | Budget: ₹10M+
  - Patronages: UNICEF, PETA, UNESCO
  - Key Milestones:
    - Organized *Advitya* annual festival (50,000+ footfall, ₹4M budget)
    - Impact Innovator Summit (₹20M+ on-spot venture funding)
    - City-wide Female Hygiene Campaign (5,000+ girls reached)
- **Placement Cell, IIT Bombay (Department Placement Coordinator)**:
  - Recruitment facilitation for 2,000+ students with 65+ coordinators
  - 40+ corporate partners aligned across strategy, consulting, and quantitative analytics
  - 16-week preparatory bootcamps for 100+ candidates across 5 key industries

### 1.3 Extracurriculars & Performing Arts
- **Dramatics**:
  - Writer & Director: 2024 & 2025 Gold Medal at Inter IIT Cultural Meet
  - 2023, 2024, 2025 Triple Gold at Inter-Hostel Dramatics Championship
- **Stage & Speaking**:
  - Stand-up comedy performer (Annual Showcase 2023)
  - Master of Ceremonies / Host for Abhyuday CSR+ESG Conclave
- **Competitive Athletics**:
  - Champion, Freshiesta Basketball League (2023)
  - Captain, Mixed Hockey Championship Team (2024)

### 1.4 Strategic & Technical Skills Matrix
- **Strategy & Product Leadership**:
  - `Storyboarding`, `GTM Playbooks`, `User Research & Persona Mapping`, `Demand Modeling`, `UI/UX Design Systems`
- **Data Architecture & Analytics**:
  - `Python`, `Power BI`, `Alteryx`, `Tableau`, `Financial Modeling & Advanced Excel`
- **Automation & Modern AI**:
  - `AI Agents`, `Production Python Bots`, `Selenium`, `MapLibre GL`, `Webhooks & API Integration`

---

## 2. Layout & Single-Viewport Budgeting

### Education Section (`#education`)
- Viewport target: `100vh` on desktop and laptop viewports (`1440x900`, `1280x720`).
- Total Available Height (720p): `720px - 76px (padding-top) - 16px (padding-bottom) = 628px`.
- Layout Structure:
  - Header: ~85px (`03 // EDUCATION`, `Where I Learned`, subtitle)
  - Grid: 3 modular column cards (Pillar 1: Academics, Pillar 2: Governance, Pillar 3: Arts & Athletics) ~390px tall.
  - Skills Marquee / Badges Row: ~90px at bottom.
  - Total vertical sum = ~565px <= 628px. Zero overflow on 720p!

### Contact Section (`#contact`) & Integrated Footer
- Total Available Height (720p): `720px - 76px (padding-top) = 644px`.
- Layout Structure:
  - Header: ~85px (`04 // CONTACT`, `Let's Connect`, subtitle)
  - Interactive Contact Grid (2x2 action cards: LinkedIn, GitHub, Email, Phone): ~240px.
  - Action Row (Resume Download + Newsreader Editorial Quote): ~130px.
  - Footer Bar: ~60px.
  - Total vertical sum = ~515px <= 644px. Zero overflow on 720p!

---

## 3. Resume Asset Delivery Strategy (`CONT-05`)
- A dedicated print-optimized resume view or pre-compiled clean resume artifact will be wired to the primary resume CTA (`/Prashant_Shukla_Resume_IITB.pdf` or triggerable print modal).
- Include both direct PDF download and inline view preview options for seamless recruiter access.
