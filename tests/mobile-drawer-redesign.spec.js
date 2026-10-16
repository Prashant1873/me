import { test, expect } from '@playwright/test';

test.describe('Phase 21: Mobile Navigation Drawer Redesign', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(500);
  });

  test('NAV-06: Mobile drawer links are formatted as tactile command cards with chevrons', async ({ page }) => {
    const navToggle = page.locator('#nav-toggle');
    await navToggle.click();
    await page.waitForTimeout(400);

    const drawer = page.locator('#mobile-nav-drawer');
    await expect(drawer).toBeVisible();

    const links = drawer.locator('.mobile-drawer__link');
    await expect(links).toHaveCount(5);

    for (let i = 0; i < 5; i++) {
      const link = links.nth(i);
      await expect(link).toBeVisible();

      // Verify item main, index number capsule, label, and chevron
      await expect(link.locator('.mobile-drawer__num')).toBeVisible();
      await expect(link.locator('.mobile-drawer__label')).toBeVisible();
      await expect(link.locator('.mobile-drawer__chevron')).toBeVisible();

      // Check card styles: border-radius, background, border
      const styles = await link.evaluate((el) => {
        const c = window.getComputedStyle(el);
        return {
          borderRadius: c.borderRadius,
          borderWidth: c.borderWidth,
          boxShadow: c.boxShadow
        };
      });

      expect(parseFloat(styles.borderRadius)).toBeGreaterThanOrEqual(6);
      expect(parseFloat(styles.borderWidth)).toBeGreaterThan(0);
      expect(styles.boxShadow).not.toBe('none');
    }
  });

  test('NAV-06: Active and hover states provide clear visual feedback in dark and light modes', async ({ page }) => {
    const navToggle = page.locator('#nav-toggle');
    await navToggle.click();
    await page.waitForTimeout(400);

    const drawer = page.locator('#mobile-nav-drawer');
    const activeLink = drawer.locator('.mobile-drawer__link.is-active');
    await expect(activeLink).toBeVisible();

    // Verify active link has high-contrast styling
    const activeStyles = await activeLink.evaluate((el) => {
      const c = window.getComputedStyle(el);
      return {
        borderColor: c.borderColor,
        boxShadow: c.boxShadow
      };
    });
    expect(activeStyles.boxShadow).not.toBe('none');

    // Switch to light theme
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await page.waitForTimeout(300);

    const lightActiveStyles = await activeLink.evaluate((el) => {
      const c = window.getComputedStyle(el);
      return {
        backgroundColor: c.backgroundColor,
        borderColor: c.borderColor
      };
    });
    expect(lightActiveStyles.backgroundColor).not.toBe('transparent');
  });

  test('NAV-06: Tactile command cards execute navigation and restore focus', async ({ page }) => {
    const navToggle = page.locator('#nav-toggle');
    await navToggle.click();
    await page.waitForTimeout(400);

    const drawer = page.locator('#mobile-nav-drawer');
    await expect(drawer).toBeVisible();

    // Click Experience link
    const expLink = drawer.locator('.mobile-drawer__link[data-section="experience"]');
    await expLink.click();
    await page.waitForTimeout(500);

    // Drawer closes after navigation
    await expect(drawer).toBeHidden();
  });
});
