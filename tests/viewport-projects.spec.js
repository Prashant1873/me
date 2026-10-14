import { test, expect } from '@playwright/test';

test('Verify Projects Section 100% Viewport Fit', async ({ page }) => {
  // Test at 1280x720 (standard laptop / 720p screen height)
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  // Navigate to #projects
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);

  const vh = 720;
  const projectsSec = page.locator('#projects');
  const secBox = await projectsSec.boundingBox();
  expect(secBox).not.toBeNull();
  console.log(`Projects Section Box: y=${secBox.y}, height=${secBox.height}`);

  // Header must be below fixed navbar (64px) and visible
  const header = page.locator('#projects .section__header');
  const headerBox = await header.boundingBox();
  expect(headerBox).not.toBeNull();
  console.log(`Header Box: y=${headerBox.y}, bottom=${headerBox.y + headerBox.height}`);
  expect(headerBox.y).toBeGreaterThanOrEqual(64);

  // All 6 cards must be fully inside the viewport (y >= 64 and y + height <= 720)
  const cards = page.locator('#projects .project-card');
  const count = await cards.count();
  expect(count).toBe(6);

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    const box = await card.boundingBox();
    expect(box).not.toBeNull();
    console.log(`Card ${i + 1} Box: y=${box.y.toFixed(1)}, height=${box.height.toFixed(1)}, bottom=${(box.y + box.height).toFixed(1)}`);
    expect(box.y).toBeGreaterThanOrEqual(64);
    expect(box.y + box.height).toBeLessThanOrEqual(vh + 1); // 1px rounding tolerance
  }

  // Capture screenshot of viewport
  await page.screenshot({ path: 'test-results/projects-viewport.png' });
  console.log('✓ Projects section 100% viewport fit verified!');
});
