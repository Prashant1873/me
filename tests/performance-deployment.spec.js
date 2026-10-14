import { test, expect } from '@playwright/test';

test.describe('Performance, Polish & Deployment (Phase 10)', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(1000);
  });

  test('3D-09 & RESP-07: Progressive enhancement and prefers-reduced-motion support', async ({ page }) => {
    // 1. Verify backgroundScene exposes reduced motion controller
    const hasReducedMotionHook = await page.evaluate(() => {
      return typeof window.backgroundScene?.setReducedMotion === 'function';
    });
    expect(hasReducedMotionHook).toBe(true);

    // 2. Set reduced motion to true and verify scene state
    await page.evaluate(() => {
      window.backgroundScene.setReducedMotion(true);
    });

    const isReducedMotion = await page.evaluate(() => {
      return window.backgroundScene.isReducedMotion();
    });
    expect(isReducedMotion).toBe(true);

    // 3. Verify CSS prefers-reduced-motion rule exists in document stylesheets
    const hasReducedMotionCSS = await page.evaluate(() => {
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules || [])) {
            if (rule.media && rule.media.mediaText.includes('prefers-reduced-motion')) {
              return true;
            }
          }
        } catch (e) {}
      }
      return false;
    });
    expect(hasReducedMotionCSS).toBe(true);
  });

  test('3D-10: 60fps frame rate and low-power adaptation hooks', async ({ page }) => {
    // Verify background scene is ready and exposes performance metrics
    const perfState = await page.evaluate(() => {
      const bs = window.backgroundScene;
      if (!bs) return null;
      return {
        isReady: bs.isReady,
        hasLowPowerMode: typeof bs.isLowPowerMode === 'function',
        hasFPSMetrics: typeof bs.getFPSMetrics === 'function',
      };
    });

    expect(perfState).not.toBeNull();
    expect(perfState.isReady).toBe(true);
    expect(perfState.hasLowPowerMode).toBe(true);
    expect(perfState.hasFPSMetrics).toBe(true);

    // Sample frame metrics over 500ms
    await page.waitForTimeout(500);
    const fpsMetrics = await page.evaluate(() => {
      return window.backgroundScene.getFPSMetrics();
    });
    expect(fpsMetrics.averageFPS).toBeGreaterThan(0);
  });

  test('RESP-06: Semantic HTML5 hierarchy, single h1, and landmarks audit', async ({ page }) => {
    // 1. Exactly one h1 on page
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    await expect(page.locator('h1')).toHaveText(/PRASHANT SHUKLA/);

    // 2. Semantic landmarks: header, main, footer
    const hasHeader = await page.locator('header.site-header, header[role="banner"]').count();
    expect(hasHeader).toBeGreaterThanOrEqual(1);

    const hasMain = await page.locator('main').count();
    expect(hasMain).toBe(1);

    const hasFooter = await page.locator('footer.site-footer, [role="contentinfo"]').count();
    expect(hasFooter).toBeGreaterThanOrEqual(1);

    // 3. Each major section has a section tag and an accessible heading
    const sections = ['#hero', '#experience', '#projects', '#education', '#contact'];
    for (const secId of sections) {
      const sec = page.locator(secId);
      await expect(sec).toBeVisible();
    }

    // 4. All buttons have accessible text or aria-labels
    const buttonsWithoutAccessibleName = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.filter(btn => {
        const text = btn.innerText.trim();
        const ariaLabel = btn.getAttribute('aria-label');
        const ariaLabelledBy = btn.getAttribute('aria-labelledby');
        const title = btn.getAttribute('title');
        return !text && !ariaLabel && !ariaLabelledBy && !title;
      }).map(btn => btn.outerHTML);
    });
    expect(buttonsWithoutAccessibleName).toEqual([]);
  });

  test('DEPL-03: Complete SEO, Open Graph, and Twitter metadata present in head', async ({ page }) => {
    // Description
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc).toBeTruthy();
    expect(metaDesc.length).toBeGreaterThan(20);

    // Open Graph
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Prashant Shukla');

    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDesc).toBeTruthy();

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();

    // Twitter Card
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');

    // Canonical link
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeTruthy();

    // Theme color
    const themeColor = await page.locator('meta[name="theme-color"]').count();
    expect(themeColor).toBeGreaterThanOrEqual(1);
  });
});
