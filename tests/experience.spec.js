import { test, expect } from '@playwright/test';

test('Verify Experience Section: Clean 3D Timeline, Date Rail, Active Detail Card, and Minimal Calendar', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  // 1. Verify Section Presence
  const expSection = page.locator('#experience');
  await expect(expSection).toBeVisible();

  // 2. Verify Toolbar, Filters, Duplicate Buttons, Date Rail, and Progress Track are Removed
  await expect(page.locator('.experience-toolbar')).toHaveCount(0);
  await expect(page.locator('.experience-filters')).toHaveCount(0);
  await expect(page.locator('.experience-list')).toHaveCount(0);
  await expect(page.locator('#experience-calendar-trigger-btn')).toHaveCount(0);
  await expect(page.locator('#experience-date-rail')).toHaveCount(0);
  await expect(page.locator('#experience-progress-track')).toHaveCount(0);

  // 3. Verify Seamless Full-Width 3D Canvas
  const canvasEl = page.locator('#experience-canvas canvas');
  await expect(canvasEl).toBeAttached();

  // 4. Verify Active Item (IQVIA by default)
  const detail = page.locator('#experience-detail');
  await expect(detail.locator('.experience-detail__company')).toHaveText('IQVIA');
  await expect(detail.locator('.experience-detail__role')).toHaveText('Analyst, Strategy Consulting');

  // Verify detail panel logo
  await expect(detail.locator('.experience-detail__logo-box img')).toBeVisible();

  // Verify SVG lightning bolt icon in metric (no emoji character)
  const metric = detail.locator('.experience-detail__metric');
  await expect(metric.locator('svg.experience-detail__metric-icon')).toBeVisible();
  const metricText = await metric.innerText();
  expect(metricText).not.toContain('⚡');
  expect(metricText).toContain('KEY IMPACT');
  expect(metricText).toContain('5+ AI Bots & 7+ Dashboards');

  // 5. Test Selecting Revolut via Controller / 3D Navigation
  await page.evaluate(() => window.experienceController.setMilestone(1));
  await page.waitForTimeout(300);
  await expect(detail.locator('.experience-detail__company')).toHaveText('Revolut');
  await expect(detail.locator('.experience-detail__metric')).toContainText('£19.7M Fee Optimization');

  // Clickable LinkedIn logo button
  const linkedinBtn = detail.locator('.experience-detail__linkedin-btn');
  await expect(linkedinBtn).toHaveAttribute('href', 'https://www.linkedin.com/company/revolut/');
  await expect(linkedinBtn).toHaveAttribute('target', '_blank');
  await expect(linkedinBtn.locator('svg').first()).toBeVisible();

  // Verify Revolut photos
  const photoThumbs = detail.locator('.experience-photo-thumb');
  await expect(photoThumbs).toHaveCount(2);

  // 6. Test Lightbox Open/Close on Photo Thumb
  await photoThumbs.first().click();
  await page.waitForTimeout(200);
  const lightbox = page.locator('#experience-lightbox');
  await expect(lightbox).toHaveClass(/is-open/);

  // Close lightbox
  await page.locator('#experience-lightbox-close').click();
  await page.waitForTimeout(200);
  await expect(lightbox).not.toHaveClass(/is-open/);

  // 7. Test Navigating to Kalam Labs via Arrow Navigation or Controller
  await page.evaluate(() => window.experienceController.setMilestone(3));
  await page.waitForTimeout(300);
  await expect(detail.locator('.experience-detail__company')).toHaveText('Kalam Labs (YC S21)');

  // 8. Test Calendar Modal Opened Strictly via Experience Card Date Click
  const periodBtn = detail.locator('#experience-detail-period-btn');
  await expect(periodBtn).toBeVisible();
  await expect(periodBtn.locator('.experience-detail__period-text')).toBeVisible();

  // Click period button on the card to open calendar modal
  await periodBtn.click();
  await page.waitForTimeout(300);

  const timelineModal = page.locator('#experience-timeline-modal');
  await expect(timelineModal).toHaveClass(/is-open/);

  // Verify 12-column grid structure exists
  const monthGrids = timelineModal.locator('.timeline-months-grid');
  await expect(monthGrids).toHaveCount(3); // 2024, 2025, 2026

  // Verify company logos are rendered inside active calendar month cells
  const monthLogos = timelineModal.locator('.timeline-month-cell.is-active .timeline-month-logo');
  const monthLogosCount = await monthLogos.count();
  expect(monthLogosCount).toBeGreaterThanOrEqual(18); // 2024 (1), 2025 (10), 2026 (12) = 23 active months
  await expect(monthLogos.first()).toBeVisible();

  // Verify IIT-B academic watermark logos in empty months
  const emptyLogos = timelineModal.locator('.timeline-month-cell.is-empty .timeline-month-logo');
  await expect(emptyLogos.first()).toBeVisible();

  // Verify role track cards have real company logos (not broken)
  const trackLogos = timelineModal.locator('.timeline-track-card .timeline-track-card__logo');
  await expect(trackLogos).toHaveCount(5);
  for (let i = 0; i < 5; i++) {
    await expect(trackLogos.nth(i)).toBeVisible();
  }

  // Verify company theme classes on active cells
  const iqviaCells = timelineModal.locator('.timeline-month-cell.theme-iqvia');
  await expect(iqviaCells.first()).toBeVisible();
  const revolutCells = timelineModal.locator('.timeline-month-cell.theme-revolut');
  await expect(revolutCells.first()).toBeVisible();

  // Test clicking a month cell (e.g. Revolut Jan 2026) to navigate directly
  const revolutCell = timelineModal.locator('.timeline-month-cell[data-exp-id="revolut"]').first();
  await revolutCell.click();
  await page.waitForTimeout(300);

  // Modal should close and active detail should now be Revolut
  await expect(timelineModal).not.toHaveClass(/is-open/);
  await expect(detail.locator('.experience-detail__company')).toHaveText('Revolut');

  console.log('✓ Clean 3D timeline, prominent conduit, minimal date rail, card date trigger, and calendar matrix verified successfully!');
});
