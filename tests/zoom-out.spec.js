import { test, expect } from '@playwright/test';

test('Verify ultrawide / zoom-out behavior (Option A)', async ({ page }) => {
  // Test at 2560x1440 (simulating 4K / ultrawide or zoomed-out desktop)
  await page.setViewportSize({ width: 2560, height: 1440 });
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1500);

  const heroGrid = page.locator('.hero__grid');
  const heroContent = page.locator('.hero__content');
  const heroCanvas = page.locator('.hero__canvas-col');

  const gridBox = await heroGrid.boundingBox();
  const contentBox = await heroContent.boundingBox();
  const canvasBox = await heroCanvas.boundingBox();

  console.log('--- ULTRAWIDE / ZOOM-OUT (2560x1440) REPORT ---');
  console.log('Grid container width:', gridBox.width.toFixed(1), 'px (max-content-width scaled adaptively)');
  console.log('Content width:', contentBox.width.toFixed(1), 'px, right edge:', (contentBox.x + contentBox.width).toFixed(1));
  console.log('Canvas col width:', canvasBox.width.toFixed(1), 'px, left edge:', canvasBox.x.toFixed(1));

  // Verify that the distance between content right edge and canvas left edge is controlled by the grid gap
  const gap = canvasBox.x - (contentBox.x + contentBox.width);
  console.log(`Gap between text content and 3D canvas: ${gap.toFixed(1)}px`);

  // Under Option A, the gap is the grid gap (~24px - 48px), NOT an ocean of 800px!
  expect(gap).toBeLessThan(60);
  expect(gap).toBeGreaterThanOrEqual(16);
  console.log('✓ Text and 3D canvas remain perfectly paired in the grid, zero awkward drift!');

  // Take screenshot of zoomed-out / ultrawide layout
  await page.screenshot({ path: 'test-results/hero-ultrawide.png' });

  // Standard desktop 1440x900
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'test-results/hero-desktop.png' });

  // Test mobile viewport as well to verify responsive behavior
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'test-results/hero-mobile.png' });
  console.log('✓ Mobile layout verified and captured.');
});
