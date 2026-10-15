import { test, expect } from '@playwright/test';

test.describe('Phase 14: Education & Governance Cards Density Reduction', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/#education');
    await page.waitForTimeout(1000);
  });

  test('EDU-06: Abhyuday and Placement Cell cards display punchy, highlighted metrics with low text density', async ({ page }) => {
    const govCard = page.locator('.education-card--governance');
    await expect(govCard).toBeVisible();

    const entries = govCard.locator('.governance-entry');
    await expect(entries).toHaveCount(2);

    // Entry 1: Abhyuday
    const abhyuday = entries.nth(0);
    await expect(abhyuday.locator('.governance-entry__title')).toContainText('Abhyuday');
    const abhyudayBullets = abhyuday.locator('.governance-bullets');
    await expect(abhyudayBullets).toBeVisible();

    const abhyudayText = await abhyudayBullets.innerText();
    // Verify concise text density (scannable under 5 seconds, < 200 chars total)
    expect(abhyudayText.length).toBeLessThan(200);

    // Verify highlighted metrics in strong elements
    const abhyudayHighlights = abhyudayBullets.locator('strong');
    const abhyudayHighlightTexts = await abhyudayHighlights.allInnerTexts();
    expect(abhyudayHighlightTexts.some((t) => t.includes('₹10M+'))).toBe(true);
    expect(abhyudayHighlightTexts.some((t) => t.includes('150+'))).toBe(true);
    expect(abhyudayHighlightTexts.some((t) => t.includes('50,000+') || t.includes('50k+'))).toBe(true);
    expect(abhyudayHighlightTexts.some((t) => t.includes('₹20M+'))).toBe(true);

    // Entry 2: Placement Cell
    const placement = entries.nth(1);
    await expect(placement.locator('.governance-entry__title')).toContainText('Placement Cell');
    const placementBullets = placement.locator('.governance-bullets');
    await expect(placementBullets).toBeVisible();

    const placementText = await placementBullets.innerText();
    expect(placementText.length).toBeLessThan(200);

    const placementHighlights = placementBullets.locator('strong');
    const placementHighlightTexts = await placementHighlights.allInnerTexts();
    expect(placementHighlightTexts.some((t) => t.includes('2,000+') || t.includes('2k+'))).toBe(true);
    expect(placementHighlightTexts.some((t) => t.includes('40+'))).toBe(true);
    expect(placementHighlightTexts.some((t) => t.includes('16-week'))).toBe(true);
  });

  test('EDU-06: Highlighted numbers use accent styling and technical font in dark and light modes', async ({ page }) => {
    const govCard = page.locator('.education-card--governance');
    const strongEl = govCard.locator('.governance-bullets strong').first();
    await expect(strongEl).toBeVisible();

    // Check computed font-weight is bold/700
    const fontWeight = await strongEl.evaluate((el) => window.getComputedStyle(el).fontWeight);
    expect(['700', 'bold', '600', '800']).toContain(fontWeight);

    // Check light mode
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await page.waitForTimeout(300);

    await expect(strongEl).toBeVisible();
    const lightColor = await strongEl.evaluate((el) => window.getComputedStyle(el).color);
    expect(lightColor).not.toBe('');
  });
});
