---
phase: 6
slug: projects-section-cinematic-case-studies
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-10-14
---

# Phase 6 - Validation Strategy: Projects Section - Cinematic Case Studies

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright `^1.64.0` |
| **Config file** | `playwright.config.js` |
| **Quick run command** | `npx playwright test tests/projects.spec.js` |
| **Full suite command** | `npx playwright test` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx playwright test tests/projects.spec.js`
- **After every plan wave:** Run `npx playwright test`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 1 | PROJ-01, PROJ-02 | - | Escaped markup; authentic metadata | e2e | `npx playwright test tests/projects.spec.js -g "all 6 project cards"` | ❌ W0 | ⬜ pending |
| 06-01-02 | 01 | 1 | PROJ-03, PROJ-07 | - | Scroll lock; focus trap with inert | e2e | `npx playwright test tests/projects.spec.js -g "modal expansion and collapse"` | ❌ W0 | ⬜ pending |
| 06-01-03 | 01 | 2 | PROJ-04 | T-06-01 | `rel="noopener noreferrer"` on external URLs | e2e | `npx playwright test tests/projects.spec.js -g "modal content and links"` | ❌ W0 | ⬜ pending |
| 06-01-04 | 01 | 2 | PROJ-05, PROJ-06 | - | Image fallback on error; smooth transitions | e2e | `npx playwright test tests/projects.spec.js -g "slideshow rendering and controls"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/projects.spec.js` - test suite covering all 6 cards, modal expansion, keyboard traversal, and slideshow controls

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Fluid GSAP ease visual aesthetics | PROJ-07 | Subjective motion feel | Visually verify that modal expands with organic spring physics and backdrop blurs smoothly |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-10-14
