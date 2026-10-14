import { test, expect } from '@playwright/test';

test('Verify modal scrolling does not scroll background page underneath', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  // Navigate to #projects
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);

  const initialScrollY = await page.evaluate(() => window.scrollY);
  console.log(`Initial page scrollY on Projects: ${initialScrollY}`);
  expect(initialScrollY).toBeGreaterThanOrEqual(720); // Projects is section 2

  // Open BickerBape modal
  const card = page.locator('.project-card[data-project-id="bickerbape"]');
  await card.click();
  await page.waitForTimeout(400);

  const modal = page.locator('#project-modal');
  await expect(modal).toHaveClass(/is-open/);

  // 1. Dispatch wheel events over the modal backdrop
  console.log('Dispatching wheel events on modal backdrop...');
  await page.mouse.move(50, 50);
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(300);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(300);

  // Verify page scrollY has NOT changed at all
  const scrollYAfterBackdrop = await page.evaluate(() => window.scrollY);
  console.log(`ScrollY after backdrop wheel: ${scrollYAfterBackdrop}`);
  expect(scrollYAfterBackdrop).toBe(initialScrollY);

  // 2. Dispatch wheel events inside the modal right pane (reading pane)
  const rightPane = modal.locator('.modal-right-pane');
  await expect(rightPane).toBeVisible();

  const paneBox = await rightPane.boundingBox();
  expect(paneBox).not.toBeNull();

  console.log('Dispatching wheel events inside modal right pane...');
  await page.mouse.move(paneBox.x + paneBox.width / 2, paneBox.y + paneBox.height / 2);
  await page.mouse.wheel(0, 200);
  await page.waitForTimeout(300);

  // Verify page scrollY is STILL unchanged
  const scrollYAfterPane = await page.evaluate(() => window.scrollY);
  console.log(`ScrollY after right pane wheel: ${scrollYAfterPane}`);
  expect(scrollYAfterPane).toBe(initialScrollY);

  // Verify background section is still at top = 0
  const projBox = await page.locator('#projects').boundingBox();
  expect(Math.abs(projBox.y)).toBeLessThanOrEqual(5);

  // 3. Close modal and verify background page is still intact
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  await expect(modal).not.toHaveClass(/is-open/);

  const finalScrollY = await page.evaluate(() => window.scrollY);
  expect(finalScrollY).toBe(initialScrollY);
  console.log('✓ Modal scroll isolation strictly verified! Page underneath did not scroll.');
});
