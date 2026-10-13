---
phase: 5
slug: experience-3d-timeline-scroll-animations
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-10-13
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright |
| **Config file** | `playwright.config.js` |
| **Quick run command** | `npx playwright test tests/experience.spec.js` |
| **Full suite command** | `npm test` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx playwright test tests/experience.spec.js`
- **After every plan wave:** Run `npm test`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | EXP-01, 3D-06 | — | N/A | unit/e2e | `npx playwright test tests/experience.spec.js` | ✅ | ⬜ pending |
| 05-01-02 | 01 | 1 | EXP-07, 3D-06 | — | N/A | integration | `npx playwright test tests/experience.spec.js` | ✅ | ⬜ pending |
| 05-01-03 | 01 | 2 | EXP-08 | — | N/A | integration | `npx playwright test tests/experience.spec.js` | ✅ | ⬜ pending |
| 05-01-04 | 01 | 2 | EXP-06, 3D-10 | — | N/A | e2e | `npx playwright test tests/experience.spec.js` | ✅ | ⬜ pending |
| 05-01-05 | 01 | 3 | EXP-01..08 | — | N/A | regression | `npm test` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] `tests/experience.spec.js` — updated with assertions for `#experience-canvas`, WebGL initialization, and pinned scroll traversal.
- [x] Existing infrastructure covers all phase requirements.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 60fps Subjective Smoothness | 3D-10 | GPU frame pacing verification across physical display refresh rates | Open DevTools Performance tab / rendering FPS meter during scroll scrub |
| Ambient Particle Bloom | EXP-08 | Visual aesthetic subjective feel | Observe Tungsten Amber halo bloom around active star-cluster in dark and light modes |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-10-13
