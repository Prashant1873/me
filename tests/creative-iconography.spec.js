import { test, expect } from '@playwright/test';

test.describe('Phase 15: Creative & Athletics Iconography Refactoring', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/#education');
    await page.waitForTimeout(1000);
  });

  test('CREAT-01: Zero informal emoji characters in Creative & Athletics card', async ({ page }) => {
    const creativeCard = page.locator('.education-card--creative');
    await expect(creativeCard).toBeVisible();

    const textContent = await creativeCard.innerText();

    // Assert that none of the specific emojis are present
    expect(textContent).not.toContain('🎭');
    expect(textContent).not.toContain('🎙');
    expect(textContent).not.toContain('🏑');
    expect(textContent).not.toContain('🥇');

    // Assert regex check for standard emoji Unicode ranges
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]/u;
    expect(emojiRegex.test(textContent)).toBe(false);
  });

  test('CREAT-01: Bespoke vector SVG icons render for Stage, Speaking, Athletics, and Gold Medals', async ({ page }) => {
    const creativeCard = page.locator('.education-card--creative');
    await expect(creativeCard).toBeVisible();

    // 3 Category entries should have SVG icons
    const svgIcons = creativeCard.locator('.creative-svg-icon');
    await expect(svgIcons).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(svgIcons.nth(i)).toBeVisible();
    }

    // Gold Medalist badge should contain vector medal SVGs
    const goldBadge = creativeCard.locator('.creative-badge--gold');
    await expect(goldBadge).toBeVisible();
    const medalSvgs = goldBadge.locator('.medal-svg');
    await expect(medalSvgs).toHaveCount(2);
    await expect(medalSvgs.first()).toBeVisible();
  });

  test('CREAT-01: Multi-theme SVG rendering and contrast in dark and light modes', async ({ page }) => {
    const creativeCard = page.locator('.education-card--creative');
    const svgIcon = creativeCard.locator('.creative-svg-icon').first();
    await expect(svgIcon).toBeVisible();

    // Verify dark mode stroke
    const darkStroke = await svgIcon.evaluate((el) => window.getComputedStyle(el).stroke);
    expect(darkStroke).not.toBe('none');

    // Switch to light mode
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await page.waitForTimeout(300);

    await expect(svgIcon).toBeVisible();
    const lightStroke = await svgIcon.evaluate((el) => window.getComputedStyle(el).stroke);
    expect(lightStroke).not.toBe('none');
  });
});
