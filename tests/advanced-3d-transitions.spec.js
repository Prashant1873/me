import { test, expect } from '@playwright/test';

test.describe('Advanced 3D & Section Transitions (Phase 9)', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(1000);
  });

  test('3D-02: Fixed background WebGL canvas exists behind DOM sections with continuous terrain', async ({ page }) => {
    const bgCanvas = page.locator('#bg-canvas');
    await expect(bgCanvas).toBeAttached();

    // Verify canvas styling: fixed, full viewport, z-index 0
    const canvasStyles = await bgCanvas.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        position: computed.position,
        zIndex: computed.zIndex,
        pointerEvents: computed.pointerEvents,
      };
    });

    expect(canvasStyles.position).toBe('fixed');
    expect(canvasStyles.zIndex).toBe('0');
    expect(canvasStyles.pointerEvents).toBe('none');

    // Verify WebGL context and terrain mesh existence in scene
    const is3DInitialized = await page.evaluate(() => {
      return !!(window.backgroundScene && window.backgroundScene.isReady);
    });
    expect(is3DInitialized).toBe(true);

    const hasTerrain = await page.evaluate(() => {
      return !!(window.backgroundScene && window.backgroundScene.terrainMesh);
    });
    expect(hasTerrain).toBe(true);
  });

  test('3D-03: Pure particle constellations exist and morph per section', async ({ page }) => {
    // Check initial section constellation (Hero = 0)
    const initialConstellation = await page.evaluate(() => {
      return window.backgroundScene?.getActiveSection();
    });
    expect(initialConstellation).toBe(0);

    // Verify particle count for constellation is 600
    const constellationCount = await page.evaluate(() => {
      return window.backgroundScene?.getConstellationParticleCount();
    });
    expect(constellationCount).toBe(600);

    // Test transitionToSection(1) triggers Experience constellation
    await page.evaluate(() => {
      window.backgroundScene?.transitionToSection(1);
    });
    await page.waitForTimeout(300);

    const isTransitioning = await page.evaluate(() => {
      return window.backgroundScene?.getActiveSection();
    });
    expect(isTransitioning).toBe(1);

    // Test all 5 thematic constellation generators return valid coordinates
    const validGenerators = await page.evaluate(() => {
      const bs = window.backgroundScene;
      if (!bs) return false;
      return [0, 1, 2, 3, 4].every(idx => {
        const coords = bs.getSectionPositions(idx);
        return coords && coords.length === 600 * 3;
      });
    });
    expect(validGenerators).toBe(true);
  });

  test('3D-04: Ambient cosmic dust particle system populated with >= 200 points', async ({ page }) => {
    const dustCount = await page.evaluate(() => {
      return window.backgroundScene?.getCosmicDustCount();
    });
    expect(dustCount).toBeGreaterThanOrEqual(200);
  });

  test('3D-05: Multi-layer parallax depth on mouse movement and camera traversal', async ({ page }) => {
    // Initial camera position
    const initialCamZ = await page.evaluate(() => {
      return window.backgroundScene?.getCameraPosition().z;
    });

    // Move mouse across viewport to test parallax response
    await page.mouse.move(100, 100);
    await page.waitForTimeout(100);
    const parallaxOffset1 = await page.evaluate(() => {
      return window.backgroundScene?.getParallaxOffset();
    });

    await page.mouse.move(700, 500);
    await page.waitForTimeout(100);
    const parallaxOffset2 = await page.evaluate(() => {
      return window.backgroundScene?.getParallaxOffset();
    });

    expect(parallaxOffset1).toBeDefined();
    expect(parallaxOffset2).toBeDefined();
    // Verify target mouse offset changed
    expect(parallaxOffset1.x).not.toBe(parallaxOffset2.x);

    // Advance to Projects section (index 2)
    await page.evaluate(() => {
      window.backgroundScene?.transitionToSection(2);
    });
    await page.waitForTimeout(900);

    const newCamZ = await page.evaluate(() => {
      return window.backgroundScene?.getCameraPosition().z;
    });
    // Z-depth should have moved forward into 3D scene (negative Z direction)
    expect(newCamZ).toBeLessThan(initialCamZ);
  });

  test('3D-07 & 3D-08: Coordinated cinematic section transitions on navigation', async ({ page }) => {
    // Navigate using site nav link for Experience
    const expLink = page.locator('.site-nav__link[data-section="experience"]');
    await expLink.click();
    await page.waitForTimeout(800);

    const activeSec = await page.evaluate(() => {
      return window.backgroundScene?.getActiveSection();
    });
    expect(activeSec).toBe(1);

    // Verify DOM section active state
    const expSection = page.locator('#experience');
    await expect(expSection).toHaveClass(/is-active/);

    // Navigate to Contact section
    const contactLink = page.locator('.site-nav__link[data-section="contact"]');
    await contactLink.click();
    await page.waitForTimeout(800);

    const contactSec = await page.evaluate(() => {
      return window.backgroundScene?.getActiveSection();
    });
    expect(contactSec).toBe(4);
  });

  test('Theme Reactivity: Theme switch updates 3D scene materials without context loss', async ({ page }) => {
    const themeBtn = page.locator('#theme-toggle');
    await themeBtn.click();
    await page.waitForTimeout(300);

    const theme = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });
    expect(theme).toBe('light');

    const sceneTheme = await page.evaluate(() => {
      return window.backgroundScene?.getCurrentTheme();
    });
    expect(sceneTheme).toBe('light');

    // Switch back to dark
    await themeBtn.click();
    await page.waitForTimeout(300);

    const returnTheme = await page.evaluate(() => {
      return window.backgroundScene?.getCurrentTheme();
    });
    expect(returnTheme).toBe('dark');
  });
});
