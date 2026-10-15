import { test, expect } from '@playwright/test';

test.describe('Phase 13: Projects Section Layout & Backdrop Clarity', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/#projects');
    await page.waitForTimeout(1000);
  });

  test('PROJ-08: Calibrated backdrop blur <= 4px and screenshot visibility', async ({ page }) => {
    const backdrop = page.locator('.project-card__backdrop').first();
    await expect(backdrop).toBeVisible();

    const backdropFilter = await backdrop.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backdropFilter || style.webkitBackdropFilter || '';
    });

    // Check blur radius from computed backdrop-filter: blur(...)
    const match = backdropFilter.match(/blur\((\d+(?:\.\d+)?)(px)?\)/);
    expect(match).not.toBeNull();
    const blurRadius = parseFloat(match[1]);
    expect(blurRadius).toBeLessThanOrEqual(4);

    // Verify background image has high brightness and visibility
    const bgImg = page.locator('.project-card__bg-img').first();
    const imgFilter = await bgImg.evaluate((el) => window.getComputedStyle(el).filter);
    // Dark mode brightness should be >= 0.8
    const brightMatch = imgFilter.match(/brightness\((\d+(?:\.\d+)?)\)/);
    if (brightMatch) {
      expect(parseFloat(brightMatch[1])).toBeGreaterThanOrEqual(0.8);
    }
  });

  test('PROJ-09: Vertical centering & compact row gap between card rows', async ({ page }) => {
    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(6);

    // Card 0 (top left, row 1) and Card 3 (bottom left, row 2 in a 3-column grid)
    const card0Box = await cards.nth(0).boundingBox();
    const card3Box = await cards.nth(3).boundingBox();
    expect(card0Box).not.toBeNull();
    expect(card3Box).not.toBeNull();

    // Vertical gap between bottom of row 1 and top of row 2
    const verticalRowGap = card3Box.y - (card0Box.y + card0Box.height);
    expect(verticalRowGap).toBeGreaterThan(0);
    // Assert gap is compact and uniform (<= 36px), eliminating awkward 140px empty chasms
    expect(verticalRowGap).toBeLessThanOrEqual(36);

    // Verify all 6 cards are within viewport boundaries
    const viewportSize = page.viewportSize();
    expect(viewportSize).not.toBeNull();
    for (let i = 0; i < 6; i++) {
      const box = await cards.nth(i).boundingBox();
      expect(box).not.toBeNull();
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y + box.height).toBeLessThanOrEqual(viewportSize.height + 50); // within visible area
    }
  });

  test('PROJ-08 & PROJ-09: Light mode backdrop and layout stability', async ({ page }) => {
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await page.waitForTimeout(300);

    const backdrop = page.locator('.project-card__backdrop').first();
    const backdropFilter = await backdrop.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backdropFilter || style.webkitBackdropFilter || '';
    });
    const match = backdropFilter.match(/blur\((\d+(?:\.\d+)?)(px)?\)/);
    expect(match).not.toBeNull();
    const blurRadius = parseFloat(match[1]);
    expect(blurRadius).toBeLessThanOrEqual(4);

    // Ensure title text shadow provides legibility
    const title = page.locator('.project-card__title').first();
    const titleShadow = await title.evaluate((el) => window.getComputedStyle(el).textShadow);
    expect(titleShadow).not.toBe('none');
  });

  test('Modal cockpits remain 100% operational with launch and close', async ({ page }) => {
    const card = page.locator('.project-card[data-project-id="bickerbape"]');
    await expect(card).toBeVisible();

    const modal = page.locator('#project-modal');
    await expect(modal).not.toHaveClass(/is-open/);

    await card.click();
    await page.waitForTimeout(400);

    await expect(modal).toHaveClass(/is-open/);
    await expect(modal.locator('#modal-project-title')).toHaveText('BickerBape');

    // Close with Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    await expect(modal).not.toHaveClass(/is-open/);
  });
});
