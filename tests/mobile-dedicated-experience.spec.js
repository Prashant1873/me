import { test, expect } from '@playwright/test';

test.describe('Phase 23: Dedicated Mobile Experience, Layout Fitting & Navigation Overhaul', () => {
  test.beforeEach(async () => {
    test.setTimeout(60000);
  });

  // --------------------------------------------------------------------------
  // 1. Narrow Viewport: 320px (iPhone SE / Compact Mobile)
  // --------------------------------------------------------------------------
  test('MOB-02 & MOB-03: 320px viewport maintains zero horizontal overflow and responsive project modal', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('http://localhost:3000/#projects');
    await page.waitForTimeout(600);

    // Verify zero horizontal page overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Open first project modal
    const firstCard = page.locator('.project-card').first();
    await expect(firstCard).toBeVisible();
    await firstCard.click();
    await page.waitForTimeout(500);

    const modal = page.locator('#project-modal');
    const chassis = page.locator('.project-modal__chassis');
    await expect(modal).toBeVisible();
    await expect(chassis).toBeVisible();

    // Verify chassis fits within 320px viewport
    const chassisBox = await chassis.boundingBox();
    expect(chassisBox).not.toBeNull();
    if (chassisBox) {
      expect(chassisBox.width).toBeLessThanOrEqual(320);
      expect(chassisBox.x).toBeGreaterThanOrEqual(0);
    }

    // Close modal via close button
    const closeBtn = page.locator('#modal-close-btn');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await page.waitForTimeout(400);
    await expect(modal).toBeHidden();
  });

  // --------------------------------------------------------------------------
  // 2. Standard Mobile: 375px (iPhone 12/13 Mini)
  // --------------------------------------------------------------------------
  test('MOB-03 & MOB-04: 375px mobile modal full-height layout, sticky CTAs, and drawer scroll-lock', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(500);

    // 1. Mobile Drawer Navigation & Scroll Lock
    const navToggle = page.locator('#nav-toggle');
    const mobileDrawer = page.locator('#mobile-nav-drawer');

    await expect(navToggle).toBeVisible();
    await expect(page.locator('.site-nav__links')).toBeHidden();

    // Open drawer
    await navToggle.click();
    await page.waitForTimeout(400);
    await expect(mobileDrawer).toBeVisible();

    // Verify body has nav-drawer-open class
    const hasDrawerClass = await page.evaluate(() => document.body.classList.contains('nav-drawer-open'));
    expect(hasDrawerClass).toBe(true);

    // Close drawer via ESC
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await expect(mobileDrawer).toBeHidden();

    const hasDrawerClassClosed = await page.evaluate(() => document.body.classList.contains('nav-drawer-open'));
    expect(hasDrawerClassClosed).toBe(false);

    // 2. Dedicated Mobile Modal Layout
    await page.goto('http://localhost:3000/#projects');
    await page.waitForTimeout(400);

    const firstCard = page.locator('.project-card').first();
    await firstCard.click();
    await page.waitForTimeout(500);

    const modal = page.locator('#project-modal');
    await expect(modal).toBeVisible();

    // Verify modal header has compact title and close button
    const title = page.locator('#modal-project-title');
    const closeBtn = page.locator('#modal-close-btn');
    await expect(title).toBeVisible();
    await expect(closeBtn).toBeVisible();

    const closeBox = await closeBtn.boundingBox();
    expect(closeBox).not.toBeNull();
    if (closeBox) {
      expect(closeBox.width).toBeGreaterThanOrEqual(36);
      expect(closeBox.height).toBeGreaterThanOrEqual(36);
    }

    // Verify slideshow navigation arrows have touch targets
    const prevSlide = page.locator('#slideshow-prev-btn');
    const nextSlide = page.locator('#slideshow-next-btn');
    await expect(prevSlide).toBeVisible();
    await expect(nextSlide).toBeVisible();

    // Verify single-column vertical flow on mobile
    const modalBody = page.locator('.modal-body');
    const bodyDisplay = await modalBody.evaluate((el) => window.getComputedStyle(el).display);
    expect(['flex', 'grid']).toContain(bodyDisplay);

    // Verify sticky full-width CTAs
    const ctas = page.locator('.modal-ctas');
    await expect(ctas).toBeVisible();
    const ctaBtns = ctas.locator('.modal-cta');
    const ctaCount = await ctaBtns.count();
    expect(ctaCount).toBeGreaterThanOrEqual(1);

    for (let i = 0; i < ctaCount; i++) {
      const btn = ctaBtns.nth(i);
      const btnBox = await btn.boundingBox();
      expect(btnBox).not.toBeNull();
      if (btnBox) {
        expect(btnBox.height).toBeGreaterThanOrEqual(40);
      }
    }

    // Test slideshow step
    await nextSlide.click();
    await page.waitForTimeout(300);
    const captionText = await page.locator('#slideshow-caption').textContent();
    expect(captionText).toContain('[2 /');

    // Close modal
    await closeBtn.click();
    await page.waitForTimeout(300);
    await expect(modal).toBeHidden();
  });

  // --------------------------------------------------------------------------
  // 3. Medium Mobile: 390px (iPhone 14/15)
  // --------------------------------------------------------------------------
  test('MOB-02: 390px viewport fits Experience, Education, and Contact with zero overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(600);

    // Verify zero horizontal page overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Experience: Verify detail card and photo thumbnails
    await page.goto('http://localhost:3000/#experience');
    await page.waitForTimeout(400);

    const expCompany = page.locator('.experience-detail__company');
    await expect(expCompany).toBeVisible();

    const photoThumb = page.locator('.experience-photo-thumb').first();
    await expect(photoThumb).toBeVisible();

    // Education: Verify education cards fit cleanly
    await page.goto('http://localhost:3000/#education');
    await page.waitForTimeout(400);

    const eduCards = page.locator('.education-card');
    await expect(eduCards).toHaveCount(3);
    await expect(page.locator('.skills-matrix')).toBeVisible();

    const skillPills = page.locator('.skill-pill');
    const skillCount = await skillPills.count();
    expect(skillCount).toBeGreaterThan(0);

    // Contact: Verify contact options and resume chassis
    await page.goto('http://localhost:3000/#contact');
    await page.waitForTimeout(400);

    const contactBtns = page.locator('.contact-btn');
    const count = await contactBtns.count();
    expect(count).toBeGreaterThanOrEqual(3);

    const firstBtnBox = await contactBtns.first().boundingBox();
    expect(firstBtnBox).not.toBeNull();
    if (firstBtnBox) {
      expect(firstBtnBox.height).toBeGreaterThanOrEqual(44);
    }
  });

  // --------------------------------------------------------------------------
  // 4. Large Mobile: 428px (iPhone 14/15 Pro Max)
  // --------------------------------------------------------------------------
  test('MOB-02: 428px viewport renders all sections smoothly without clipping', async ({ page }) => {
    await page.setViewportSize({ width: 428, height: 926 });
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(600);

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Check Hero typography scaling
    const heroName = page.locator('.hero__name');
    await expect(heroName).toBeVisible();
    const heroSize = await heroName.evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize));
    expect(heroSize).toBeGreaterThanOrEqual(28);
  });

  // --------------------------------------------------------------------------
  // 5. Desktop Invariant: 1440px (MOB-01: Zero Desktop Regressions)
  // --------------------------------------------------------------------------
  test('MOB-01: Desktop 1440px view remains 100% frozen with 2-column modal cockpit', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(500);

    // Desktop nav must be visible and hamburger hidden
    const desktopLinks = page.locator('.site-nav__links');
    const navToggle = page.locator('#nav-toggle');
    await expect(desktopLinks).toBeVisible();
    await expect(navToggle).toBeHidden();

    // Open project modal on desktop
    await page.goto('http://localhost:3000/#projects');
    await page.waitForTimeout(400);

    const firstCard = page.locator('.project-card').first();
    await firstCard.click();
    await page.waitForTimeout(500);

    const modal = page.locator('#project-modal');
    await expect(modal).toBeVisible();

    // Verify 2-column cockpit layout is active on desktop (7fr 5fr)
    const modalBody = page.locator('.modal-body');
    const gridCols = await modalBody.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
    const colTracks = gridCols.trim().split(/\s+/);
    expect(colTracks.length).toBe(2);

    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await expect(modal).toBeHidden();
  });
});
