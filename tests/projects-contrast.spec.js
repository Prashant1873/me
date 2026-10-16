import { test, expect } from '@playwright/test';

test.describe('Phase 18: Project Cards Contrast, Scrims & Text Readability', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/#projects');
    await page.waitForTimeout(1000);
  });

  test('PROJ-10: Category eyebrows have high-contrast micro-capsule pill backing and sharp text', async ({ page }) => {
    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(6);

    for (let i = 0; i < 6; i++) {
      const category = cards.nth(i).locator('.project-card__category');
      await expect(category).toBeVisible();

      const styles = await category.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          borderWidth: computed.borderWidth,
          color: computed.color,
          padding: computed.padding,
          textShadow: computed.textShadow,
          borderRadius: computed.borderRadius
        };
      });

      // Background should not be transparent
      expect(styles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(styles.backgroundColor).not.toBe('transparent');
      // Must have pill border and padding
      expect(parseFloat(styles.borderWidth)).toBeGreaterThan(0);
      expect(styles.textShadow).not.toBe('none');
    }
  });

  test('PROJ-11: Headings and descriptions have dedicated protective scrims and high-contrast text', async ({ page }) => {
    const card = page.locator('.project-card').first();
    const middle = card.locator('.project-card__middle');
    const title = card.locator('.project-card__title');
    const desc = card.locator('.project-card__desc');

    await expect(middle).toBeVisible();
    await expect(title).toBeVisible();
    await expect(desc).toBeVisible();

    // Check middle container protective scrim
    const middleBg = await middle.evaluate((el) => window.getComputedStyle(el).backgroundImage);
    expect(middleBg).toContain('radial-gradient');

    // Check dark mode text colors & shadows
    const titleStyle = await title.evaluate((el) => {
      const c = window.getComputedStyle(el);
      return { color: c.color, textShadow: c.textShadow };
    });
    expect(titleStyle.textShadow).not.toBe('none');
    // In dark mode, title should be bright white rgb(255, 255, 255)
    expect(titleStyle.color).toBe('rgb(255, 255, 255)');

    const descStyle = await desc.evaluate((el) => {
      const c = window.getComputedStyle(el);
      return { color: c.color, textShadow: c.textShadow };
    });
    expect(descStyle.textShadow).not.toBe('none');

    // Switch to light mode and verify contrast adaptation
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await page.waitForTimeout(300);

    const lightTitleColor = await title.evaluate((el) => window.getComputedStyle(el).color);
    const lightDescColor = await desc.evaluate((el) => window.getComputedStyle(el).color);
    const lightCategoryBg = await card.locator('.project-card__category').evaluate((el) => window.getComputedStyle(el).backgroundColor);

    // Light mode title: #0f172a -> rgb(15, 23, 42)
    expect(lightTitleColor).toBe('rgb(15, 23, 42)');
    // Light mode desc: #1e293b -> rgb(30, 41, 59)
    expect(lightDescColor).toBe('rgb(30, 41, 59)');
    // Category pill in light mode has solid light background
    expect(lightCategoryBg).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('PROJ-10 & PROJ-11: Hover states preserve text contrast while animating', async ({ page }) => {
    const card = page.locator('.project-card').first();
    await card.hover();
    await page.waitForTimeout(300);

    const backdrop = card.locator('.project-card__backdrop');
    const backdropFilter = await backdrop.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backdropFilter || style.webkitBackdropFilter || '';
    });

    const match = backdropFilter.match(/blur\((\d+(?:\.\d+)?)(px)?\)/);
    expect(match).not.toBeNull();
    const blurRadius = parseFloat(match[1]);
    expect(blurRadius).toBeLessThanOrEqual(4);
    expect(blurRadius).toBeGreaterThanOrEqual(1.5);

    // Text elements remain visible and legible on hover
    await expect(card.locator('.project-card__category')).toBeVisible();
    await expect(card.locator('.project-card__title')).toBeVisible();
    await expect(card.locator('.project-card__desc')).toBeVisible();
  });
});
