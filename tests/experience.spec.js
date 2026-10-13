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
  await expect(linkedinBtn.locator('svg')).toBeVisible();

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

  console.log('✓ Experience section updated with logos, Strategy/Product categories, SVG icon, and LinkedIn logo!');
});
