import { test, expect } from '@playwright/test';
import { PROJECT_IDS, expandProject, openDefaultCaseStudy } from './helpers/projects.js';

test.describe('Phase 25: Projects Image Pipeline Optimization & Fast Loading', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(1000);
  });

  test('PROJ-IMG-01 & PROJ-IMG-02: Accordion previews are WebP and deferred until a row is needed', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('projects')?.scrollIntoView();
    });
    await page.waitForTimeout(900);

    const items = page.locator('.project-item');
    await expect(items).toHaveCount(PROJECT_IDS.length);

    // The expanded project shows a decoded full-size WebP preview
    const openPreview = page.locator('.project-item.is-open .project-preview__img');
    const openSrc = await openPreview.getAttribute('src');
    expect(openSrc).toContain('.webp');
    expect(openSrc).not.toContain('thumb_');
    await expect.poll(async () => openPreview.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);

    // Collapsed projects have not requested their large preview yet
    const deferred = page.locator('.project-item:not(.is-open) .project-preview__img[data-src]');
    await expect(deferred).toHaveCount(PROJECT_IDS.length - 1);

    // Expanding a row hydrates its preview on demand
    const item = await expandProject(page, 'trinet');
    const hydrated = item.locator('.project-preview__img');
    expect(await hydrated.getAttribute('src')).toContain('slide-1.webp');
    await expect.poll(async () => hydrated.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
  });

  test('PROJ-IMG-03 & PROJ-IMG-04: Case study modal opens with WebP full image, filmstrip thumbs, and spinner', async ({ page }) => {
    await openDefaultCaseStudy(page);
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
    await openDefaultCaseStudy(page);
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
