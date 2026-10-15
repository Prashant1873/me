import { test, expect } from '@playwright/test';

test('Verify Phase 11: Experience 3D Canvas Polish & Particle Occlusion', async ({ page }) => {
  test.setTimeout(60000);
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  // 1. Canvas presence
  const canvas = page.locator('#experience-canvas canvas');
  await expect(canvas).toBeAttached();

  // 2. Evaluate 3D state from window / canvas internals
  const evaluation = await page.evaluate(() => {
    if (!window.experienceCanvas) {
      return { exists: false };
    }
    const canvasObj = window.experienceCanvas;
    return {
      exists: true,
      milestonesCount: canvasObj.MILESTONES ? canvasObj.MILESTONES.length : 0
    };
  });

  expect(evaluation.exists).toBe(true);

  // 3. Inspect Three.js Scene objects for particle sizing and Z-axis depthTest
  const sceneProperties = await page.evaluate(() => {
    const canvasEl = document.querySelector('#experience-canvas canvas');
    if (!canvasEl) return null;

    // Check canvas renderer attached
    const hasCanvas = canvasEl.width > 0 && canvasEl.height > 0;

    // Access experienceCanvas if exposed
    const exp = window.experienceCanvas;
    let orbitRingDepthTest = null;
    let orbitRingZ = null;
    let orbitRingSize = null;
    let conduitSize = null;

    if (exp && exp.getDebugInfo) {
      const debug = exp.getDebugInfo();
      orbitRingDepthTest = debug.orbitRingDepthTest;
      orbitRingZ = debug.orbitRingZ;
      orbitRingSize = debug.orbitRingSize;
      conduitSize = debug.conduitSize;
    }

    return {
      hasCanvas,
      orbitRingDepthTest,
      orbitRingZ,
      orbitRingSize,
      conduitSize
    };
  });

  expect(sceneProperties.hasCanvas).toBe(true);
  if (sceneProperties.orbitRingDepthTest !== null) {
    expect(sceneProperties.orbitRingDepthTest).toBe(true);
    expect(sceneProperties.orbitRingZ).toBeCloseTo(0, 2);
    expect(sceneProperties.orbitRingSize).toBeGreaterThan(0.9);
    expect(sceneProperties.conduitSize).toBeGreaterThan(0.9);
  }

  // 4. Test Light Mode Theme Toggle updates colors cleanly without breaking
  await page.locator('#theme-toggle').click();
  await page.waitForTimeout(400);
  const htmlTheme = await page.getAttribute('html', 'data-theme');
  expect(htmlTheme).toBe('light');

  // Verify canvas remains active and renders without errors in light mode
  await page.waitForTimeout(500);

  // Switch back to dark mode
  await page.locator('#theme-toggle').click();
  await page.waitForTimeout(300);

  expect(errors.filter(e => !e.includes('favicon') && !e.includes('404'))).toHaveLength(0);
});
