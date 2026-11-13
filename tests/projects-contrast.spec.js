import { test, expect } from '@playwright/test';
import { PROJECT_IDS } from './helpers/projects.js';

/**
 * WCAG contrast of an element's text against the opaque colour it sits on.
 * Row backgrounds are translucent, so every ancestor layer is composited
 * down to the page background before measuring.
 */
async function contrastRatio(locator) {
  return locator.evaluate((el) => {
    const parse = (value) => {
      const m = value.match(/rgba?\(([^)]+)\)/);
      if (!m) return [0, 0, 0, 0];
      const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
      return [parts[0], parts[1], parts[2], parts.length > 3 ? parts[3] : 1];
    };
    const over = (top, bottom) => {
      const a = top[3];
      return [0, 1, 2].map((i) => top[i] * a + bottom[i] * (1 - a)).concat(1);
    };
    const luminance = (c) => {
      const [r, g, b] = c.slice(0, 3).map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const layers = [];
    for (let node = el; node; node = node.parentElement) {
      const bg = parse(getComputedStyle(node).backgroundColor);
      if (bg[3] > 0) layers.push(bg);
    }
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    let backdrop = isLight ? [255, 255, 255, 1] : [0, 0, 0, 1];
    layers.reverse().forEach((layer) => {
      backdrop = over(layer, backdrop);
    });

    const style = getComputedStyle(el);
    const text = parse(style.color);
    text[3] *= parseFloat(style.opacity);
    const fg = over(text, backdrop);

    const l1 = luminance(fg);
    const l2 = luminance(backdrop);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  });
}

const ROW_TEXT = ['.project-item__title', '.project-item__category', '.project-item__summary', '.project-item__status'];
const PANEL_TEXT = ['.project-item__narrative', '.project-proof__metric', '.project-proof__label', '.project-tag'];

test.describe('Projects accordion: text contrast and readability', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/#projects');
    await page.waitForTimeout(1200);
  });

  for (const theme of ['dark', 'light']) {
    test(`PROJ-10 & PROJ-11: Row and panel text meets WCAG AA in ${theme} mode`, async ({ page }) => {
      await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
      await page.waitForTimeout(400);

      const items = page.locator('.project-item');
      await expect(items).toHaveCount(PROJECT_IDS.length);

      for (let i = 0; i < PROJECT_IDS.length; i++) {
        for (const selector of ROW_TEXT) {
          const ratio = await contrastRatio(items.nth(i).locator(selector));
          expect(ratio, `${PROJECT_IDS[i]} ${selector} (${theme})`).toBeGreaterThanOrEqual(4.5);
        }
      }

      const openItem = page.locator('.project-item.is-open');
      for (const selector of PANEL_TEXT) {
        const ratio = await contrastRatio(openItem.locator(selector).first());
        expect(ratio, `open panel ${selector} (${theme})`).toBeGreaterThanOrEqual(4.5);
      }
    });
  }

  test('PROJ-10 & PROJ-11: Hover states keep row text legible while animating', async ({ page }) => {
    const item = page.locator('.project-item[data-project-id="trinet"]');
    await item.locator('.project-item__header').hover();
    await page.waitForTimeout(400);

    for (const selector of ROW_TEXT) {
      await expect(item.locator(selector)).toBeVisible();
      const ratio = await contrastRatio(item.locator(selector));
      expect(ratio, `hovered ${selector}`).toBeGreaterThanOrEqual(4.5);
    }

    // Hovering never expands a row; disclosure stays an explicit click
    await expect(item).not.toHaveClass(/is-open/);
  });
});
