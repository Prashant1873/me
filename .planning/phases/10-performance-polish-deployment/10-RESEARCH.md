# Phase 10 Research: Performance, Polish & Deployment

## 1. Reduced Motion Architecture (RESP-07)
Web Content Accessibility Guidelines (WCAG) 2.2 AA require providing equivalent, non-vestibular experiences for users with motion sensitivity.
- **Media Query**: `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- **CSS Rules**:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- **Three.js Scene Adaptation**:
  - Halts the per-frame procedural wave sine calculation on `terrain.js`.
  - Freezes idle harmonic flutter in `particle-constellations.js`.
  - Sets camera travel duration to 0.05s or instant cuts.
  - Keeps static geometric form visible to preserve visual context without vertigo.

## 2. Low-Power & 60fps Optimization (3D-09, 3D-10)
- **FPS Monitoring**:
  - Sample elapsed frame delta times over 60 frames.
  - If frame rate consistently falls below 30fps for 45+ samples (indicating GPU saturation, mobile thermal throttling, or battery saver mode):
    - Enter `lowPowerMode`: clamp `renderer.setPixelRatio(1.0)`.
    - Skip procedural terrain elevation recalculation on alternate frames.
    - Limit background scene render frequency to 30fps while stationary.
- **WebGL Context Resilience**:
  - Listen for `webglcontextlost` and `webglcontextrestored`.
  - Prevent uncaught console errors by calling `event.preventDefault()`.
  - Display CSS atmospheric background fallback if GPU context cannot be recovered.

## 3. Rollup Chunking & Asset Optimization (DEPL-02)
- Vite build previously logged: `(!) Some chunks are larger than 500 kB after minification.`
- **Configuration Solution** in `vite.config.js`:
  ```js
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap'],
        },
      },
    },
  }
  ```
- Separates heavy external libraries into immutable chunks for long-term browser cache efficiency.

## 4. Automated GitHub Pages CI/CD Pipeline (DEPL-01)
- Workflow file: `.github/workflows/deploy.yml`.
- Target: GitHub Pages standard environment.
- Steps:
  1. Trigger on push to `master`.
  2. Setup Node.js 20.
  3. `npm ci`
  4. `npm run check:em-dash` (regression protection)
  5. `npm run build`
  6. Deploy `dist/` with `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4`.

## 5. SEO & Social Meta Specification (DEPL-03)
- `og:image`: High-contrast preview card thumbnail.
- `og:url`: `https://prashant1873.github.io/AboutMe/`.
- `twitter:card`: `summary_large_image`.
- `meta name="theme-color"`: `#000000` (dark) / `#FFFFFF` (light).
- Structured JSON-LD metadata for Person schema.
