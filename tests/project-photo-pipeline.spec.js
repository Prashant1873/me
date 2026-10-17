import { test, expect } from '@playwright/test';

test.describe('Phase 25: Projects Image Pipeline Optimization & Fast Loading', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(1000);
  });

  test('PROJ-IMG-01 & PROJ-IMG-02: Project card backgrounds use lightweight WebP thumbnails', async ({ page }) => {
    // Scroll to projects section so lazy-loaded cards enter viewport
    await page.evaluate(() => {
      document.getElementById('projects')?.scrollIntoView();
    });
    await page.waitForTimeout(600);

    const cards = page.locator('.project-card');
    const cardCount = await cards.count();
    expect(cardCount).toBe(6);

    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      await card.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }));
      const thumb = card.locator('.project-card__thumb');
      await expect(thumb).toBeAttached();

      const src = await thumb.getAttribute('src');
      expect(src).toContain('.webp');
      expect(src).toContain('thumb_');

      // Verify that image decoded successfully
      await expect.poll(async () => {
        return await thumb.evaluate((img) => img.naturalWidth);
      }).toBeGreaterThan(0);
    }
  });

  test('PROJ-IMG-03 & PROJ-IMG-04: Case study modal opens with WebP full image, filmstrip thumbs, and spinner', async ({ page }) => {
    const firstCard = page.locator('.project-card').first();
    await firstCard.click({ force: true });
    await page.waitForTimeout(400);

    const modal = page.locator('#project-modal');
    await expect(modal).toHaveClass(/is-open/);

    // Verify spinner element exists in slideshow viewport
    const spinner = page.locator('#slideshow-spinner');
    await expect(spinner).toBeAttached();

    // Verify main slideshow image is full-resolution WebP
    const mainImg = page.locator('#slideshow-main-img');
    await expect(mainImg).toBeVisible();
    const mainSrc = await mainImg.getAttribute('src');
    expect(mainSrc).toContain('.webp');
    expect(mainSrc).not.toContain('thumb_');

    const naturalWidth = await mainImg.evaluate((img) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);

    // Verify filmstrip thumbnails use WebP thumb versions
    const filmstripThumbs = page.locator('.modal-slideshow__thumb img');
    const thumbCount = await filmstripThumbs.count();
    expect(thumbCount).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < thumbCount; i++) {
      const thumbImg = filmstripThumbs.nth(i);
      const thumbSrc = await thumbImg.getAttribute('src');
      expect(thumbSrc).toContain('.webp');
      expect(thumbSrc).toContain('thumb_');
    }
  });

  test('PROJ-IMG-04: Slideshow traversal across screenshots updates images smoothly without errors', async ({ page }) => {
    const firstCard = page.locator('.project-card').first();
    await firstCard.click({ force: true });
    await page.waitForTimeout(400);

    const nextBtn = page.locator('#slideshow-next-btn');
    await expect(nextBtn).toBeVisible();

    // Click next slide
    await nextBtn.click({ force: true });
    await page.waitForTimeout(400);

    const mainImg = page.locator('#slideshow-main-img');
    const slide2Src = await mainImg.getAttribute('src');
    expect(slide2Src).toContain('slide-2.webp');

    const naturalWidth = await mainImg.evaluate((img) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);

    // Verify caption updated
    const caption = page.locator('#slideshow-caption');
    await expect(caption).toContainText('[2 / ');
  });
});
