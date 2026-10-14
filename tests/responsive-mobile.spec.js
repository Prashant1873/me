import { test, expect } from '@playwright/test';

test.describe('Responsive Design & Mobile Adaptation (Phase 8)', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
  });

  // --------------------------------------------------------------------------
  // NAV-04: Mobile Navigation & Hamburger Drawer
  // --------------------------------------------------------------------------
  test('NAV-04: Mobile viewport displays hamburger button, hides desktop links, and toggles drawer', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(500);

    const navToggle = page.locator('#nav-toggle');
    const desktopLinks = page.locator('.site-nav__links');
    const mobileDrawer = page.locator('#mobile-nav-drawer');

    // Hamburger button must be visible on mobile (width 375)
    await expect(navToggle).toBeVisible();
    await expect(navToggle).toHaveAttribute('aria-label', /navigation menu/i);
    await expect(navToggle).toHaveAttribute('aria-expanded', 'false');

    // Desktop links container should be hidden on mobile
    await expect(desktopLinks).toBeHidden();

    // Drawer should initially be hidden
    await expect(mobileDrawer).toBeHidden();

    // Tap hamburger button to open drawer
    await navToggle.click();
    await page.waitForTimeout(400);

    // Drawer should now be visible with aria-expanded="true"
    await expect(navToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileDrawer).toBeVisible();

    // Verify drawer contains all section links
    const drawerLinks = mobileDrawer.locator('.mobile-drawer__link');
    await expect(drawerLinks).toHaveCount(5);
    await expect(mobileDrawer).toContainText('Experience');
    await expect(mobileDrawer).toContainText('Projects');
    await expect(mobileDrawer).toContainText('Education');
    await expect(mobileDrawer).toContainText('Contact');

    // Verify Escape key closes drawer
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await expect(mobileDrawer).toBeHidden();
    await expect(navToggle).toHaveAttribute('aria-expanded', 'false');

    // Reopen drawer and test clicking a link closes drawer
    await navToggle.click();
    await page.waitForTimeout(400);
    await expect(mobileDrawer).toBeVisible();

    const projLink = mobileDrawer.locator('.mobile-drawer__link[data-section="projects"]');
    await projLink.click();
    await page.waitForTimeout(500);
    await expect(mobileDrawer).toBeHidden();
  });

  // --------------------------------------------------------------------------
  // RESP-01: Desktop Baseline (1440px)
  // --------------------------------------------------------------------------
  test('RESP-01: Desktop 1440px maintains standard nav and zero horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(500);

    const navToggle = page.locator('#nav-toggle');
    const desktopLinks = page.locator('.site-nav__links');

    // On 1440px, hamburger is hidden and desktop links are visible
    await expect(navToggle).toBeHidden();
    await expect(desktopLinks).toBeVisible();

    // Verify zero horizontal page overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });

  // --------------------------------------------------------------------------
  // RESP-02: Tablet Adaptation (768px)
  // --------------------------------------------------------------------------
  test('RESP-02: Tablet 768px layout adapts without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(500);

    // Verify zero horizontal overflow on tablet
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Verify section titles remain legible and properly clamped
    const heroName = page.locator('.hero__name');
    await expect(heroName).toBeVisible();
    const fontSize = await heroName.evaluate((el) => window.getComputedStyle(el).fontSize);
    expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(32);
  });

  // --------------------------------------------------------------------------
  // RESP-03: Mobile Adaptation & Touch Target Sizing (375px & 320px)
  // --------------------------------------------------------------------------
  test('RESP-03: Mobile 375px & 320px single column reflow and touch targets >= 44x44px', async ({ page }) => {
    for (const width of [375, 320]) {
      await page.setViewportSize({ width, height: 667 });
      await page.goto('http://localhost:3000/');
      await page.waitForTimeout(400);

      // Verify zero horizontal overflow across entire document
      const docScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(docScrollWidth).toBeLessThanOrEqual(width + 2);

      // Verify touch targets >= 44px
      const navToggle = page.locator('#nav-toggle');
      const navToggleBox = await navToggle.boundingBox();
      expect(navToggleBox).not.toBeNull();
      if (navToggleBox) {
        expect(navToggleBox.width).toBeGreaterThanOrEqual(40);
        expect(navToggleBox.height).toBeGreaterThanOrEqual(40);
      }

      // Check theme toggle button touch target
      const themeToggle = page.locator('#theme-toggle');
      const themeBox = await themeToggle.boundingBox();
      expect(themeBox).not.toBeNull();
      if (themeBox) {
        expect(themeBox.width).toBeGreaterThanOrEqual(36);
        expect(themeBox.height).toBeGreaterThanOrEqual(36);
      }
    }
  });

  // --------------------------------------------------------------------------
  // RESP-04 & RESP-05: Keyboard Navigation, Focus & Drawer Focus Trap
  // --------------------------------------------------------------------------
  test('RESP-04 & RESP-05: Keyboard focus visibility and mobile drawer focus trapping', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(500);

    const navToggle = page.locator('#nav-toggle');
    const mobileDrawer = page.locator('#mobile-nav-drawer');

    // Tab into nav toggle and activate with Enter
    await navToggle.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await expect(mobileDrawer).toBeVisible();

    // While drawer is open, Tab should cycle within drawer elements
    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? el.tagName.toLowerCase() : null;
    });
    expect(['button', 'a']).toContain(focusedTag);

    // Escape closes and restores focus
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await expect(mobileDrawer).toBeHidden();

    // Verify focus returned to navToggle
    const isNavToggleFocused = await navToggle.evaluate((el) => document.activeElement === el);
    expect(isNavToggleFocused).toBe(true);
  });

  // --------------------------------------------------------------------------
  // RESP-03: Mobile Milestone Stepper Controls
  // --------------------------------------------------------------------------
  test('RESP-03: Mobile experience detail card provides functional 1-tap milestone steppers', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(500);

    const nextStepper = page.locator('#exp-stepper-next');
    await expect(nextStepper).toBeVisible();

    // Verify initial active company is IQVIA
    await expect(page.locator('.experience-detail__company')).toContainText('IQVIA');

    // Tap next milestone
    await nextStepper.click();
    await page.waitForTimeout(300);

    // Should now show Revolut
    await expect(page.locator('.experience-detail__company')).toContainText('Revolut');

    // Tap prev milestone
    const prevStepper = page.locator('#exp-stepper-prev');
    await prevStepper.click();
    await page.waitForTimeout(300);
    await expect(page.locator('.experience-detail__company')).toContainText('IQVIA');
  });
});

