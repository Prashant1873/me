# Phase 7 Context: Education & Contact Sections

## Phase Goal
Deliver the complete Education Section (`#education`) and Contact Section (`#contact`) with integrated footer, bringing Prashant Shukla's portfolio to 100% full-site content completion. Delivers requirements EDU-01 through EDU-05 and CONT-01 through CONT-06.

---

## 1. Requirement Tracing

| Requirement | Description | Data Source & Asset |
| :--- | :--- | :--- |
| **EDU-01** | IIT Bombay B.Tech Aerospace Engineering prominently displayed | `Prashant_Shukla_Resume_IITB.txt` (Aerospace Engineering, B.Tech 2026); Logo: `/images/logos/Indian_Institute_of_Technology_Bombay_Logo.svg.webp` |
| **EDU-02** | School achievements (ISC 98.25% Gold Medal, ICSE 98% Gold Medal) | City Montessori School (ISC 98.25% Gold Medal, `/images/logos/cms.png`); St. Francis' College (ICSE 98% Gold Medal, `/images/logos/St._Francis_Lucknow.png`) |
| **EDU-03** | Extracurriculars: Dramatics awards, stand-up comedy, sports achievements | Dramatics (Writer+Director Inter IIT Culturals 2024/2025 Gold, Inter-Hostel Triple Gold); Speaking (Stand-up Annual Showcase 2023, CSR+ESG Conclave host 2024); Sports (Freshiesta Basketball champion 2023, Mixed Hockey captain 2024) |
| **EDU-04** | Skills list: Storyboarding, Python, Power BI, Alteryx, AI Automation, etc. | Categorized interactive skill pills (Strategy/Product, Analytics/Data, Automation/AI) |
| **EDU-05** | Section visuals consistent with Structured Intensity | Modular cards, organic contours, editorial rules, identical typography scale (`--text-section`, `--text-section-sub`, `--tracking-wider`) |
| **CONT-01** | LinkedIn link | `https://www.linkedin.com/in/prashantmanishukla` |
| **CONT-02** | GitHub link | `https://github.com/Prashant1873` |
| **CONT-03** | Email link with click-to-copy | `shuklaprashant847@gmail.com` (`mailto:shuklaprashant847@gmail.com`) |
| **CONT-04** | Phone number display | `+91-9696721493` (`tel:+919696721493`) |
| **CONT-05** | Downloadable resume PDF button | Resume download action triggering clean resume asset |
| **CONT-06** | Contact section has Newsreader editorial statement as closing | Serif quote: *"Engineering rigor meets behavioral empathy — building systems that outlast their creators and products people genuinely love."* |

---

## 2. Locked Decisions

- **D-01: Modular Triple-Pillar Layout for Education (`#education`)**:
  - Pillar 1: **Academics & Pedigree** (IIT Bombay Crest, CMS, St. Francis with authentic gold medal metrics).
  - Pillar 2: **High-Stakes Campus Governance** (Abhyuday Head with ₹10M+ budget/UNICEF patronage; Placement Cell Coordinator for 2,000+ students).
  - Pillar 3: **Stage, Sports & Creative Synthesis** (Inter IIT Culturals 2x Gold Dramatics Writer/Director, Stand-up comedy, Basketball/Hockey championships).
  - Bottom Bar: **Technical & Strategic Capability Pills** (`EDU-04`) with interactive hover and category filters.
- **D-02: 100vh Viewport-Constrained Architecture**:
  - Both `#education` and `#contact` respect the established 100vh single-swipe scroll architecture on 1440x900 and 1280x720 laptops, with responsive wrap on mobile.
  - Navbar clearance: `calc(64px + clamp(14px, 2.4vh, 32px))` ensures zero overlap with the fixed header.
- **D-03: Contact Cockpit & Action Cluster (`#contact`)**:
  - Two-column or balanced center-out layout: Left/Top features large interactive action cards (LinkedIn, GitHub, Email with 1-click copy feedback, Phone with instant dialer); Right/Bottom features the downloadable resume button and Newsreader editorial statement.
- **D-04: High-Contrast Light Mode Support**:
  - Every card, badge, logo box, and link button features verified WCAG 2.2 AA contrast in both Dark Mode (`#000000`/`#141414`) and Light Mode (`#FFFFFF`/`#F6F7F9`).
