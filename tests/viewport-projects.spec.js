import { test, expect } from '@playwright/test';
import { PROJECT_IDS, expandProject } from './helpers/projects.js';

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
  await page.waitForTimeout(1000);

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

  const items = page.locator('#projects .project-item');
  await expect(items).toHaveCount(PROJECT_IDS.length);

  // Whichever row is expanded, every row and the open panel's content must stay inside the viewport
  for (const projectId of ['sage', 'trinet', 'marcutie']) {
    const openItem = await expandProject(page, projectId);

    for (let i = 0; i < PROJECT_IDS.length; i++) {
      const box = await items.nth(i).boundingBox();
      expect(box).not.toBeNull();
      console.log(`[${projectId} open] Row ${i + 1}: y=${box.y.toFixed(1)}, bottom=${(box.y + box.height).toFixed(1)}`);
      expect(box.y).toBeGreaterThanOrEqual(64);
      expect(box.y + box.height).toBeLessThanOrEqual(vh + 1); // 1px rounding tolerance
    }

    // Nothing in the expanded panel is clipped by the fixed-height layout
    const overflow = await openItem.evaluate((el) => {
      const body = el.querySelector('.project-item__body');
      const content = el.querySelector('.project-item__content');
      return {
        body: body.scrollHeight - body.clientHeight,
        content: content.scrollHeight - content.clientHeight
      };
    });
    expect(overflow.body).toBeLessThanOrEqual(1);
    expect(overflow.content).toBeLessThanOrEqual(1);

    const actionsBox = await openItem.locator('.project-actions').boundingBox();
    const panelBox = await openItem.locator('.project-item__panel').boundingBox();
    expect(actionsBox.y + actionsBox.height).toBeLessThanOrEqual(panelBox.y + panelBox.height);
  }

  // Capture screenshot of viewport
  await page.screenshot({ path: 'test-results/projects-viewport.png' });
  console.log('Projects section 100% viewport fit verified.');
});
