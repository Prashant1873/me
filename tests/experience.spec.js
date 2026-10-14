import { test, expect } from '@playwright/test';

test('Verify Experience Section: Logos, Strategy & Product categories, SVG lightning bolt, LinkedIn logo', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  // 1. Verify Section Presence
  const expSection = page.locator('#experience');
  await expect(expSection).toBeVisible();

  // 2. Verify Category Filter Tabs: All Experience, Strategy, Product
  const filters = page.locator('.experience-filter-btn');
  await expect(filters).toHaveCount(3);
  await expect(filters.nth(0)).toContainText('All Experience');
  await expect(filters.nth(1)).toContainText('Strategy');
  await expect(filters.nth(2)).toContainText('Product');

  // Verify pills have distinct category data attributes
  await expect(filters.nth(0)).toHaveAttribute('data-category', 'all');
  await expect(filters.nth(1)).toHaveAttribute('data-category', 'strategy');
  await expect(filters.nth(2)).toHaveAttribute('data-category', 'product');

  // 3. Verify All 5 Companies and their Logos in List
  const items = page.locator('.experience-item');
  await expect(items).toHaveCount(5);

  const expectedCompanies = ['IQVIA', 'Revolut', 'Ketto.org', 'Kalam Labs (YC S21)', 'FAOUD'];
  for (let i = 0; i < expectedCompanies.length; i++) {
    await expect(items.nth(i)).toContainText(expectedCompanies[i]);
    // Each item must contain a company logo image
    const logoImg = items.nth(i).locator('.experience-item__logo-box img');
    await expect(logoImg).toBeVisible();
  }

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

  // 5. Test Selecting Revolut
  await items.nth(1).click();
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

  // 6. Test Filtering by Strategy (Should show 2)
  await filters.nth(1).click();
  await page.waitForTimeout(300);
  const strategyItems = page.locator('.experience-item');
  await expect(strategyItems).toHaveCount(2);
  await expect(strategyItems.nth(0)).toContainText('IQVIA');
  await expect(strategyItems.nth(1)).toContainText('Revolut');

  // 7. Test Filtering by Product (Should show 3)
  await filters.nth(2).click();
  await page.waitForTimeout(300);
  const productItems = page.locator('.experience-item');
  await expect(productItems).toHaveCount(3);
  await expect(productItems.nth(0)).toContainText('Ketto.org');
  await expect(productItems.nth(1)).toContainText('Kalam Labs (YC S21)');
  await expect(productItems.nth(2)).toContainText('FAOUD');

  // 8. Test Clean Lightbox Open/Close (No captions)
  const kettoPhotos = detail.locator('.experience-photo-thumb');
  await kettoPhotos.first().click();
  await page.waitForTimeout(200);
  const lightbox = page.locator('#experience-lightbox');
  await expect(lightbox).toHaveClass(/is-open/);
  // Ensure no caption element is visible inside lightbox
  await expect(lightbox.locator('#experience-lightbox-caption')).toHaveCount(0);

  // Close lightbox
  await page.locator('#experience-lightbox-close').click();
  await page.waitForTimeout(200);
  await expect(lightbox).not.toHaveClass(/is-open/);

  // 9. Test Subtle Timeline Button & Calendar Modal with Company Logos
  const periodBtn = detail.locator('.experience-detail__period');
  await expect(periodBtn).toBeVisible();
  // Ensure the bulky badge is gone and period text is clean
  await expect(periodBtn.locator('.experience-detail__period-badge')).toHaveCount(0);
  await expect(periodBtn.locator('.experience-detail__period-text')).toBeVisible();

  // Click period button to open timeline modal
  await periodBtn.click();
  await page.waitForTimeout(300);

  const timelineModal = page.locator('#experience-timeline-modal');
  await expect(timelineModal).toHaveClass(/is-open/);

  // Verify company logos are rendered inside active calendar month cells
  const monthLogos = timelineModal.locator('.timeline-month-cell.is-active .timeline-month-logo');
  const monthLogosCount = await monthLogos.count();
  expect(monthLogosCount).toBeGreaterThanOrEqual(18); // 2024 (1), 2025 (10), 2026 (12) = 23 active months
  await expect(monthLogos.first()).toBeVisible();

  // Verify IIT-B academic watermark logos in empty months
  const emptyLogos = timelineModal.locator('.timeline-month-cell.is-empty .timeline-month-logo');
  await expect(emptyLogos.first()).toBeVisible();

  // Verify role track cards have company logos
  const trackLogos = timelineModal.locator('.timeline-track-card .timeline-track-card__logo');
  await expect(trackLogos).toHaveCount(5);

  // Test clicking a month cell (e.g. Revolut Jan 2026) to navigate directly
  const revolutCell = timelineModal.locator('.timeline-month-cell[data-exp-id="revolut"]').first();
  await revolutCell.click();
  await page.waitForTimeout(300);

  // Modal should close and active detail should now be Revolut
  await expect(timelineModal).not.toHaveClass(/is-open/);
  await expect(detail.locator('.experience-detail__company')).toHaveText('Revolut');

  // 10. Test Phase 5 Deliverables: 3D Canvas, Date Rail, Progress Track, Inline Mini-Chart
  // A. 3D Canvas presence
  const canvasEl = page.locator('#experience-canvas canvas');
  await expect(canvasEl).toBeAttached();

  // B. Minimalist Date Rail nodes
  const dateNodes = page.locator('.experience-date-node');
  await expect(dateNodes).toHaveCount(5);
  await expect(dateNodes.nth(1)).toHaveClass(/is-active/); // Revolut is active

  // C. Progress Track
  const progressTrack = page.locator('#experience-progress-track');
  await expect(progressTrack).toBeVisible();
  const progressLabel = page.locator('#experience-progress-label');
  await expect(progressLabel).toHaveText('25%'); // 1 of 4 = 25%

  // D. Date Rail click navigation (Click node 3 -> Kalam Labs)
  await dateNodes.nth(3).click();
  await page.waitForTimeout(300);
  await expect(detail.locator('.experience-detail__company')).toHaveText('Kalam Labs (YC S21)');
  await expect(progressLabel).toHaveText('75%'); // 3 of 4 = 75%
  await expect(dateNodes.nth(3)).toHaveClass(/is-active/);

  // E. Toolbar Calendar View Trigger & Company Themed Month Blocks
  const calTrigger = page.locator('#experience-calendar-trigger-btn');
  await expect(calTrigger).toBeVisible();
  await calTrigger.click();
  await page.waitForTimeout(300);
  await expect(timelineModal).toHaveClass(/is-open/);

  // Verify company theme classes on active cells
  const iqviaCells = timelineModal.locator('.timeline-month-cell.theme-iqvia');
  await expect(iqviaCells.first()).toBeVisible();
  const revolutCells = timelineModal.locator('.timeline-month-cell.theme-revolut');
  await expect(revolutCells.first()).toBeVisible();

  // Close calendar modal
  await page.locator('#experience-timeline-close').click();
  await page.waitForTimeout(200);
  await expect(timelineModal).not.toHaveClass(/is-open/);

  console.log('✓ Phase 5 Horizontal 3D Experience timeline, date rail, progress track, and minimal calendar verified successfully!');
});
