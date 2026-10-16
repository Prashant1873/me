import { test, expect } from '@playwright/test';

test.describe('User Fixes: Refresh Active Nav, Education Non-Mono, and Premium Pill Redesign', () => {
  test('Requirement 1: Refreshing on any section keeps the top menu pointing to that section, not Home', async ({ page }) => {
    // 1. Test Education
    await page.goto('http://localhost:3000/#education');
    await page.waitForTimeout(600);
    await expect(page.locator('.site-nav__link[data-section="education"]')).toHaveClass(/is-active/);
    await expect(page.locator('.site-nav__link[data-section="hero"]')).not.toHaveClass(/is-active/);

    // Refresh the page
    await page.reload();
    await page.waitForTimeout(600);
    await expect(page.locator('.site-nav__link[data-section="education"]')).toHaveClass(/is-active/);
    await expect(page.locator('.site-nav__link[data-section="hero"]')).not.toHaveClass(/is-active/);

    // 2. Test Projects
    await page.goto('http://localhost:3000/#projects');
    await page.waitForTimeout(600);
    await page.reload();
    await page.waitForTimeout(600);
    await expect(page.locator('.site-nav__link[data-section="projects"]')).toHaveClass(/is-active/);
    await expect(page.locator('.site-nav__link[data-section="hero"]')).not.toHaveClass(/is-active/);

    // 3. Test Experience
    await page.goto('http://localhost:3000/#experience');
    await page.waitForTimeout(600);
    await page.reload();
    await page.waitForTimeout(600);
    await expect(page.locator('.site-nav__link[data-section="experience"]')).toHaveClass(/is-active/);
    await expect(page.locator('.site-nav__link[data-section="hero"]')).not.toHaveClass(/is-active/);

    // 4. Test Contact
    await page.goto('http://localhost:3000/#contact');
    await page.waitForTimeout(600);
    await page.reload();
    await page.waitForTimeout(600);
    await expect(page.locator('.site-nav__link[data-section="contact"]')).toHaveClass(/is-active/);
    await expect(page.locator('.site-nav__link[data-section="hero"]')).not.toHaveClass(/is-active/);
  });

  test('Requirement 2: All mono font is removed from the education page', async ({ page }) => {
    await page.goto('http://localhost:3000/#education');
    await page.waitForTimeout(600);

    const monoCheck = await page.evaluate(() => {
      const eduSec = document.getElementById('education');
      if (!eduSec) return { foundMono: false, elements: [] };

      const allElements = Array.from(eduSec.querySelectorAll('*'));
      const offenders = [];

      allElements.forEach((el) => {
        // Only inspect elements with direct text
        if (el.children.length === 0 && el.textContent.trim().length > 0) {
          const font = window.getComputedStyle(el).fontFamily.toLowerCase();
          if (font.includes('mono') || font.includes('fira') || font.includes('courier')) {
            offenders.push({
              tag: el.tagName,
              class: el.className,
              text: el.textContent.trim().slice(0, 30),
              font: font
            });
          }
        }
      });

      return { foundMono: offenders.length > 0, offenders };
    });

    expect(monoCheck.foundMono).toBe(false);
    expect(monoCheck.offenders).toHaveLength(0);
  });

  test('Requirement 3: AIR 1543 rank and education pills have premium capsule geometry, contrast, and dividers', async ({ page }) => {
    await page.goto('http://localhost:3000/#education');
    await page.waitForTimeout(600);

    const rankCapsule = page.locator('.edu-metric-capsule--rank');
    await expect(rankCapsule).toBeVisible();
    await expect(rankCapsule).toContainText('AIR 1543');
    await expect(rankCapsule).toContainText('JEE ADVANCED');

    // Verify capsule shape (rounded pill)
    const borderRadius = await rankCapsule.evaluate(el => window.getComputedStyle(el).borderRadius);
    // In CSS border-radius is 9999px
    const pxRadius = parseFloat(borderRadius);
    expect(pxRadius).toBeGreaterThanOrEqual(10); // True capsule

    // Verify font is Plus Jakarta Sans
    const valFont = await rankCapsule.locator('.edu-metric-capsule__val').evaluate(el => window.getComputedStyle(el).fontFamily);
    expect(valFont.toLowerCase()).toContain('plus jakarta sans');

    // Verify optical divider exists
    const divider = rankCapsule.locator('.edu-metric-capsule__divider');
    await expect(divider).toBeVisible();
    await expect(divider).toHaveText('·');

    // Verify high-contrast color presence
    const valColor = await rankCapsule.locator('.edu-metric-capsule__val').evaluate(el => window.getComputedStyle(el).color);
    expect(valColor).toBeTruthy();

    // Verify all badges and pills across education section have pill radius
    const allPills = page.locator('#education .edu-badge-pill, #education .skill-pill, #education .gov-kpi-chip, #education .creative-badge');
    const pillCount = await allPills.count();
    expect(pillCount).toBeGreaterThan(15);
  });
});
