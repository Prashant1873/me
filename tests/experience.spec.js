import { test, expect } from '@playwright/test';

test('Verify Experience Section: 5 Commercial Companies, Category Filters, Details, Photos, and LinkedIn', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  // 1. Verify Section Presence
  const expSection = page.locator('#experience');
  await expect(expSection).toBeVisible();

  // 2. Verify Category Filter Tabs
  const filters = page.locator('.experience-filter-btn');
  await expect(filters).toHaveCount(3);
  await expect(filters.nth(0)).toContainText('All Experience');
  await expect(filters.nth(1)).toContainText('Strategy & FinTech');
  await expect(filters.nth(2)).toContainText('0→1 Product & Startups');

  // 3. Verify All 5 Companies Present in List
  const items = page.locator('.experience-item');
  await expect(items).toHaveCount(5);

  const expectedCompanies = ['IQVIA', 'Revolut', 'Ketto.org', 'Kalam Labs (YC S21)', 'FAOUD'];
  for (let i = 0; i < expectedCompanies.length; i++) {
    await expect(items.nth(i)).toContainText(expectedCompanies[i]);
  }

  // 4. Verify Active Item (IQVIA by default)
  const detail = page.locator('#experience-detail');
  await expect(detail.locator('.experience-detail__company')).toHaveText('IQVIA');
  await expect(detail.locator('.experience-detail__role')).toHaveText('Analyst, Strategy Consulting');
  await expect(detail.locator('.experience-detail__metric')).toContainText('5+ AI Bots & 7+ Dashboards');
  await expect(detail.locator('.experience-detail__bullets li')).toHaveCount(3);

  // 5. Test Selecting Revolut
  await items.nth(1).click();
  await page.waitForTimeout(300);
  await expect(detail.locator('.experience-detail__company')).toHaveText('Revolut');
  await expect(detail.locator('.experience-detail__metric')).toContainText('£19.7M Fee Optimization');
  await expect(detail.locator('.experience-detail__linkedin-btn')).toHaveAttribute('href', 'https://www.linkedin.com/company/revolut/');
  await expect(detail.locator('.experience-detail__linkedin-btn')).toHaveAttribute('target', '_blank');

  // Verify Revolut photos
  const photoThumbs = detail.locator('.experience-photo-thumb');
  await expect(photoThumbs).toHaveCount(2);

  // 6. Test Filtering by Strategy & FinTech (Should show 2)
  await filters.nth(1).click();
  await page.waitForTimeout(300);
  const strategyItems = page.locator('.experience-item');
  await expect(strategyItems).toHaveCount(2);
  await expect(strategyItems.nth(0)).toContainText('IQVIA');
  await expect(strategyItems.nth(1)).toContainText('Revolut');

  // 7. Test Filtering by Startups (Should show 3)
  await filters.nth(2).click();
  await page.waitForTimeout(300);
  const startupItems = page.locator('.experience-item');
  await expect(startupItems).toHaveCount(3);
  await expect(startupItems.nth(0)).toContainText('Ketto.org');
  await expect(startupItems.nth(1)).toContainText('Kalam Labs (YC S21)');
  await expect(startupItems.nth(2)).toContainText('FAOUD');

  // 8. Test Lightbox Open/Close
  const kettoPhotos = detail.locator('.experience-photo-thumb');
  await kettoPhotos.first().click();
  await page.waitForTimeout(200);
  const lightbox = page.locator('#experience-lightbox');
  await expect(lightbox).toHaveClass(/is-open/);

  // Close lightbox with button
  await page.locator('#experience-lightbox-close').click();
  await page.waitForTimeout(200);
  await expect(lightbox).not.toHaveClass(/is-open/);

  console.log('✓ All Experience section features, filters, photos, and links verified successfully!');
});
