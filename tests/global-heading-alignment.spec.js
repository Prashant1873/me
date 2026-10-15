import { test, expect } from '@playwright/test';

test.describe('Phase 16: Global Section Heading Vertical Alignment', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(1000);
  });

  test('LAYOUT-01: Content section tags and titles share identical relative Y-offset at 1440x900', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(400);

    const sectionIds = ['#experience', '#projects', '#education', '#contact'];
    const tagOffsets = [];
    const titleOffsets = [];

    for (const id of sectionIds) {
      const section = page.locator(id);
      await expect(section).toBeVisible();

      const secBox = await section.boundingBox();
      expect(secBox).not.toBeNull();

      // Find section tag within the section
      const tag = section.locator('.section-tag').first();
      await expect(tag).toBeVisible();
      const tagBox = await tag.boundingBox();
      expect(tagBox).not.toBeNull();

      const relTagY = tagBox.y - secBox.y;
      tagOffsets.push({ id, relTagY });

      // Measure section title
      const title = section.locator('.section__title').first();
      await expect(title).toBeVisible();
      const titleBox = await title.boundingBox();
      expect(titleBox).not.toBeNull();

      const relTitleY = titleBox.y - secBox.y;
      titleOffsets.push({ id, relTitleY });
    }

    // Verify tag offsets difference is <= 1.5px across all 4 content sections
    const tagValues = tagOffsets.map((o) => o.relTagY);
    const minTag = Math.min(...tagValues);
    const maxTag = Math.max(...tagValues);
    const tagSpread = maxTag - minTag;

    // Verify title offsets difference is <= 1.5px across all 4 content sections
    const titleValues = titleOffsets.map((o) => o.relTitleY);
    const minTitle = Math.min(...titleValues);
    const maxTitle = Math.max(...titleValues);
    const titleSpread = maxTitle - minTitle;

    expect(tagSpread).toBeLessThanOrEqual(1.5);
    expect(titleSpread).toBeLessThanOrEqual(1.5);

    // Assert generous breathing room below 64px fixed nav
    expect(minTag).toBeGreaterThanOrEqual(76);
    expect(maxTag).toBeLessThanOrEqual(105);
  });

  test('LAYOUT-01: Content section tags and titles share identical relative Y-offset at 1280x720', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(400);

    const sectionIds = ['#experience', '#projects', '#education', '#contact'];
    const tagOffsets = [];
    const titleOffsets = [];

    for (const id of sectionIds) {
      const section = page.locator(id);
      const secBox = await section.boundingBox();
      expect(secBox).not.toBeNull();

      const tag = section.locator('.section-tag').first();
      const tagBox = await tag.boundingBox();
      expect(tagBox).not.toBeNull();

      const relTagY = tagBox.y - secBox.y;
      tagOffsets.push(relTagY);

      const title = section.locator('.section__title').first();
      const titleBox = await title.boundingBox();
      expect(titleBox).not.toBeNull();
      titleOffsets.push(titleBox.y - secBox.y);
    }

    const tagSpread = Math.max(...tagOffsets) - Math.min(...tagOffsets);
    const titleSpread = Math.max(...titleOffsets) - Math.min(...titleOffsets);

    expect(tagSpread).toBeLessThanOrEqual(1.5);
    expect(titleSpread).toBeLessThanOrEqual(1.5);
  });

  test('Hero section orientation is vertically centered in the viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(400);

    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    const heroStyles = await hero.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        alignItems: computed.alignItems,
        justifyContent: computed.justifyContent,
      };
    });

    expect(heroStyles.alignItems).toBe('center');
    expect(heroStyles.justifyContent).toBe('center');

    const heroGrid = page.locator('#hero .grid-container');
    const gridStyles = await heroGrid.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        alignItems: computed.alignItems,
      };
    });

    expect(gridStyles.alignItems).toBe('center');
  });
});
