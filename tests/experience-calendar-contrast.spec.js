import { test, expect } from '@playwright/test';

test('Verify Phase 12: Experience Calendar Contrast & Dark Theme Palette', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  // 1. Open the timeline calendar modal
  const periodBtn = page.locator('#experience-detail-period-btn');
  await expect(periodBtn).toBeVisible();
  await periodBtn.click();
  await page.waitForTimeout(400);

  const modal = page.locator('#experience-timeline-modal');
  await expect(modal).toHaveClass(/is-open/);

  // 2. Verify all month cells are borderless in dark mode
  const monthCells = page.locator('.timeline-month-cell');
  const count = await monthCells.count();
  expect(count).toBeGreaterThan(20);

  const firstCellBorder = await monthCells.first().evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      borderTopWidth: style.borderTopWidth,
      borderRightWidth: style.borderRightWidth,
      borderBottomWidth: style.borderBottomWidth,
      borderLeftWidth: style.borderLeftWidth,
      borderStyle: style.borderStyle
    };
  });
  expect(firstCellBorder.borderTopWidth).toBe('0px');
  expect(firstCellBorder.borderLeftWidth).toBe('0px');

  // Helper function to extract RGB luminance
  const getLuminance = (rgbStr) => {
    const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return 0.5;
    const r = parseInt(match[1]) / 255;
    const g = parseInt(match[2]) / 255;
    const b = parseInt(match[3]) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  // 3. Verify active month cells use rich dark colors in dark mode (luminance < 0.40)
  const activeCells = page.locator('.timeline-month-cell.is-active');
  const activeCount = await activeCells.count();
  expect(activeCount).toBeGreaterThan(10);

  for (let i = 0; i < Math.min(activeCount, 5); i++) {
    const bg = await activeCells.nth(i).evaluate(el => window.getComputedStyle(el).backgroundColor);
    const lum = getLuminance(bg);
    expect(lum).toBeLessThan(0.40);
  }

  // 4. Switch to Light Mode and verify calendar cells remain dark and borderless (no weird light pastels)
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(400);

  const lightActiveCells = page.locator('.timeline-month-cell.is-active');
  for (let i = 0; i < Math.min(activeCount, 5); i++) {
    const bg = await lightActiveCells.nth(i).evaluate(el => window.getComputedStyle(el).backgroundColor);
    const lum = getLuminance(bg);
    // Must NOT be a light pastel color (lum < 0.40)
    expect(lum).toBeLessThan(0.40);
  }

  const lightFirstCellBorder = await monthCells.first().evaluate((el) => {
    const style = window.getComputedStyle(el);
    return style.borderTopWidth;
  });
  expect(lightFirstCellBorder).toBe('0px');

  // 5. Verify clicking a month cell closes modal and selects milestone
  const faoudMonth = page.locator('.timeline-month-cell.theme-faoud').first();
  await faoudMonth.click();
  await page.waitForTimeout(400);

  await expect(modal).not.toHaveClass(/is-open/);
  const detail = page.locator('#experience-detail');
  await expect(detail.locator('.experience-detail__company')).toHaveText('FAOUD');

  // Switch back to dark mode
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(200);
});
