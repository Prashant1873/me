# Phase 14: Education & Governance Cards Density Reduction - Context

## 1. User Intent & Problem Statement
The user explicitly requested:
> "Reduce text density on Abhyuday and Placement Cell cards, keeping only key highlighted numbers. Plan one phase on that."

Currently, the Campus Governance cards (Abhyuday, IIT Bombay and Placement Cell, IIT Bombay) under the Education section contain redundant prose, repeating body descriptions alongside subtitle labels and metric tags. This causes visual clutter and slows down scannability.

## 2. Target Design & Requirements (EDU-06)
- **Eliminate Text Walls:** Cut verbose phrasing down to punchy, metric-first bullet points.
- **Bold/Highlighted Numbers:** Highlight key quantified achievements (`₹10M+`, `150+`, `50,000+`, `₹20M+`, `2,000+`, `40+`, `16-week`) using dedicated typography (`<strong>` or `.gov-highlight`) so they stand out instantly.
- **Scannability in < 5 Seconds:** A recruiter or visitor should grasp the magnitude of Prashant's campus leadership roles in an instant.
- **Structured Intensity Alignment:** Keep the IBM Plex Mono technical badges, Manrope headings, and rich dark mode palette with crisp borders and clean spacing.

## 3. Files Impacted
- `src/js/education-data.js` - Streamline impact bullets, remove fluff.
- `src/js/education.js` - Render bold numbers and concise pill/bullet structures.
- `src/styles/education.css` - Enhance typography, badges, and metric highlights.
- `tests/education-governance-density.spec.js` - Automated Playwright test verifying scannability and highlighted metrics.
