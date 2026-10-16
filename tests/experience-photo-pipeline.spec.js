import { test, expect } from '@playwright/test';

test.describe('Phase 17: Experience Photo Pipeline & Lightbox State Fix', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(1000);
  });

  test('IMG-01: Experience thumbnails use optimized WebP images and load successfully', async ({ page }) => {
    const detail = page.locator('#experience-detail');
    await expect(detail).toBeVisible();

    // Verify IQVIA photo thumbnails
    const thumbs = detail.locator('.experience-photo-thumb img');
    const thumbCount = await thumbs.count();
    expect(thumbCount).toBeGreaterThanOrEqual(2);

    for (let i = 0; i < thumbCount; i++) {
      const src = await thumbs.nth(i).getAttribute('src');
      expect(src).toContain('.webp');
      expect(src).toContain('thumb_');
      
      // Verify naturalWidth > 0 (image actually downloaded and decoded)
      const naturalWidth = await thumbs.nth(i).evaluate((img) => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('IMG-02: Lightbox opens with WebP image, spinner element exists, and resets on close', async ({ page }) => {
    const detail = page.locator('#experience-detail');
    const photoThumb = detail.locator('.experience-photo-thumb').first();
    await photoThumb.click();
    await page.waitForTimeout(200);

    const lightbox = page.locator('#experience-lightbox');
    await expect(lightbox).toHaveClass(/is-open/);

    // Verify spinner exists
    const spinner = page.locator('#experience-lightbox-spinner');
    await expect(spinner).toBeAttached();

    // Verify image source is WebP (full version, not thumb)
    const lightboxImg = page.locator('#experience-lightbox-img');
    await expect(lightboxImg).toBeVisible();
    const imgSrc = await lightboxImg.getAttribute('src');
    expect(imgSrc).toContain('.webp');
    expect(imgSrc).not.toContain('thumb_');

    // Verify counter
    const counter = page.locator('#experience-lightbox-counter');
    await expect(counter).toHaveText(/1 \/ \d+/);

    // Close lightbox and verify image src is reset to prevent stale image glitch
    await page.locator('#experience-lightbox-close').click();
    await page.waitForTimeout(200);
    await expect(lightbox).not.toHaveClass(/is-open/);
    const resetSrc = await lightboxImg.getAttribute('src');
    expect(resetSrc).toBe('');
  });

  test('IMG-02: Lightbox traversal across photos updates counter and loads target images seamlessly', async ({ page }) => {
    // Navigate to Revolut
    await page.evaluate(() => window.experienceController.setMilestone(1));
    await page.waitForTimeout(400);

    const detail = page.locator('#experience-detail');
    await expect(detail.locator('.experience-detail__company')).toHaveText('Revolut');

    const photoThumb = detail.locator('.experience-photo-thumb').first();
    await photoThumb.click();
    await page.waitForTimeout(200);

    const lightbox = page.locator('#experience-lightbox');
    await expect(lightbox).toHaveClass(/is-open/);

    const counter = page.locator('#experience-lightbox-counter');
    await expect(counter).toHaveText('1 / 2');

    // Click next
    const nextBtn = page.locator('#experience-lightbox-next');
    await nextBtn.click();
    await page.waitForTimeout(300);

    await expect(counter).toHaveText('2 / 2');
    const lightboxImg = page.locator('#experience-lightbox-img');
    const src2 = await lightboxImg.getAttribute('src');
    expect(src2).toContain('.webp');

    // Click previous
    const prevBtn = page.locator('#experience-lightbox-prev');
    await prevBtn.click();
    await page.waitForTimeout(300);
    await expect(counter).toHaveText('1 / 2');

    // Clean close
    await page.locator('#experience-lightbox-close').click();
    await page.waitForTimeout(200);
    await expect(lightbox).not.toHaveClass(/is-open/);
  });
});
