import { test, expect } from '@playwright/test';
import { PROJECT_IDS, expandProject, openCaseStudy } from './helpers/projects.js';

test.describe('Projects accordion: layout, alignment and spacing', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/#projects');
    await page.waitForTimeout(1200);
  });

  test('PROJ-08: Row columns share one grid so titles, categories and summaries align', async ({ page }) => {
    const items = page.locator('.project-item');
    await expect(items).toHaveCount(PROJECT_IDS.length);

    for (const selector of ['.project-item__index', '.project-item__title', '.project-item__category', '.project-item__summary']) {
      const lefts = await page.locator(selector).evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().left)));
      expect(new Set(lefts).size, `${selector} left edges: ${lefts.join(', ')}`).toBe(1);
    }

    // Expanded content lines up under the title column
    const openItem = page.locator('.project-item.is-open');
    const titleLeft = await openItem.locator('.project-item__title').evaluate((el) => el.getBoundingClientRect().left);
    const previewLeft = await openItem.locator('.project-preview').evaluate((el) => el.getBoundingClientRect().left);
    expect(Math.abs(titleLeft - previewLeft)).toBeLessThanOrEqual(1);
  });

  test('PROJ-09: Rows stack flush with uniform height and stay inside the viewport', async ({ page }) => {
    const items = page.locator('.project-item');
    const boxes = [];
    for (let i = 0; i < PROJECT_IDS.length; i++) {
      const box = await items.nth(i).boundingBox();
      expect(box).not.toBeNull();
      boxes.push(box);
    }

    // No gaps or overlaps between consecutive rows
    for (let i = 1; i < boxes.length; i++) {
      const gap = boxes[i].y - (boxes[i - 1].y + boxes[i - 1].height);
      expect(Math.abs(gap)).toBeLessThanOrEqual(1);
    }

    // Collapsed rows share one height (the last row carries the closing border)
    const collapsedHeights = boxes.slice(1).map((b) => Math.round(b.height));
    expect(Math.max(...collapsedHeights) - Math.min(...collapsedHeights)).toBeLessThanOrEqual(2);

    const viewport = page.viewportSize();
    expect(boxes[0].y).toBeGreaterThanOrEqual(64);
    expect(boxes[boxes.length - 1].y + boxes[boxes.length - 1].height).toBeLessThanOrEqual(viewport.height + 1);

    // The expanded row takes the remaining height instead of leaving dead space
    expect(boxes[0].height).toBeGreaterThan(collapsedHeights[0] * 3);
  });

  test('PROJ-08 & PROJ-09: Preview keeps a screenshot-friendly aspect ratio in both themes', async ({ page }) => {
    for (const theme of ['dark', 'light']) {
      await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
      await page.waitForTimeout(300);

      const item = await expandProject(page, 'careerloom');
      const box = await item.locator('.project-preview').boundingBox();
      expect(box).not.toBeNull();
      const ratio = box.width / box.height;
      expect(ratio).toBeGreaterThan(1.3);
      expect(ratio).toBeLessThan(1.8);

      const img = item.locator('.project-preview__img');
      await expect.poll(async () => img.evaluate((el) => el.naturalWidth)).toBeGreaterThan(0);
    }
  });

  test('Modal cockpits remain 100% operational with launch and close', async ({ page }) => {
    const modal = page.locator('#project-modal');
    await expect(modal).not.toHaveClass(/is-open/);

    await openCaseStudy(page, 'bickerbape');
    await page.waitForTimeout(400);

    await expect(modal).toHaveClass(/is-open/);
    await expect(modal.locator('#modal-project-title')).toHaveText('BickerBape');

    // Close with Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    await expect(modal).not.toHaveClass(/is-open/);

    // The preview frame is a second route into the same case study
    await page.locator('.project-item.is-open .project-preview').click();
    await page.waitForTimeout(400);
    await expect(modal).toHaveClass(/is-open/);
    await expect(modal.locator('#modal-project-title')).toHaveText('BickerBape');
  });
});
