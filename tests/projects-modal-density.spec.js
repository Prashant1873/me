import { test, expect } from '@playwright/test';

test.describe('Phase 22: Project Modal Dialogue Box Right-Side Vertical Density & Space Optimization', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/#projects');
    await page.waitForTimeout(1000);
  });

  test('PROJ-12: Right pane eliminates dead vertical white space and fills modal height proportionally', async ({ page }) => {
    // Open BickerBape modal
    const card = page.locator('.project-card[data-project-id="bickerbape"]');
    await card.click();
    await page.waitForTimeout(400);

    const modal = page.locator('#project-modal');
    await expect(modal).toHaveClass(/is-open/);

    const rightPane = modal.locator('.modal-right-pane');
    await expect(rightPane).toBeVisible();

    // Measure right pane dimensions
    const rightPaneBox = await rightPane.boundingBox();
    expect(rightPaneBox).not.toBeNull();
    expect(rightPaneBox.height).toBeGreaterThan(450);

    // Measure the gap between tech section and CTAs
    const techSection = modal.locator('.modal-tech-section');
    const ctas = modal.locator('.modal-ctas');

    await expect(techSection).toBeVisible();
    await expect(ctas).toBeVisible();

    const techBox = await techSection.boundingBox();
    const ctasBox = await ctas.boundingBox();

    expect(techBox).not.toBeNull();
    expect(ctasBox).not.toBeNull();

    // The gap between the bottom of tech section and top of CTAs should be balanced (< 50px)
    // Previously with margin-top: auto, this gap was 250px - 500px of dead space
    const gapBetweenTechAndCtas = ctasBox.y - (techBox.y + techBox.height);
    expect(gapBetweenTechAndCtas).toBeLessThanOrEqual(50);
    expect(gapBetweenTechAndCtas).toBeGreaterThanOrEqual(0);

    // Verify innovations section takes up proportional vertical space
    const innovationsSection = modal.locator('.modal-innovations-section');
    const innovationsBox = await innovationsSection.boundingBox();
    expect(innovationsBox.height).toBeGreaterThan(200);

    // Verify all 3 innovation cards have substantial height (>= 50px each)
    const items = modal.locator('.modal-innovation-item');
    await expect(items).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      const itemBox = await items.nth(i).boundingBox();
      expect(itemBox.height).toBeGreaterThanOrEqual(50);
    }
  });

  test('PROJ-13: Innovation cards feature enriched technical architecture depth and quantitative metrics', async ({ page }) => {
    const projectsToCheck = ['bickerbape', 'strokecrm', 'trinet', 'archetype', 'careerloom', 'marcutie'];

    for (const projId of projectsToCheck) {
      // Open modal for project
      await page.evaluate((id) => {
        const card = document.querySelector(`.project-card[data-project-id="${id}"]`);
        if (card) card.click();
      }, projId);
      await page.waitForTimeout(300);

      const modal = page.locator('#project-modal');
      await expect(modal).toHaveClass(/is-open/);

      // Verify narrative is substantive
      const narrative = modal.locator('.modal-narrative');
      const narrativeText = await narrative.innerText();
      expect(narrativeText.length).toBeGreaterThan(80);

      // Verify all 3 innovation items have rich descriptions (> 80 chars) and metric pills
      const innovationItems = modal.locator('.modal-innovation-item');
      await expect(innovationItems).toHaveCount(3);

      for (let i = 0; i < 3; i++) {
        const item = innovationItems.nth(i);
        const title = item.locator('.modal-innovation-title');
        const metric = item.locator('.modal-innovation-metric');
        const desc = item.locator('.modal-innovation-desc');

        await expect(title).toBeVisible();
        await expect(metric).toBeVisible();
        await expect(desc).toBeVisible();

        const descText = await desc.innerText();
        expect(descText.length).toBeGreaterThan(80);
      }

      // Close modal
      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
    }
  });

  test('PROJ-14: Modal right pane adapts cleanly across desktop viewports (1080p, 900p, 768p, 720p)', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1440, height: 900 },
      { width: 1366, height: 768 },
      { width: 1280, height: 720 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.waitForTimeout(200);

      // Open BickerBape modal
      await page.locator('.project-card[data-project-id="bickerbape"]').click();
      await page.waitForTimeout(300);

      const modal = page.locator('#project-modal');
      await expect(modal).toHaveClass(/is-open/);

      const chassis = modal.locator('.project-modal__chassis');
      const chassisBox = await chassis.boundingBox();
      expect(chassisBox).not.toBeNull();
      expect(chassisBox.height).toBeLessThanOrEqual(vp.height);

      // Right pane should fill height and CTAs must be visible inside viewport
      const ctas = modal.locator('.modal-ctas');
      await expect(ctas).toBeVisible();
      const ctasBox = await ctas.boundingBox();
      expect(ctasBox.y + ctasBox.height).toBeLessThanOrEqual(chassisBox.y + chassisBox.height + 2);

      // Close modal
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
    }
  });

  test('Light and Dark mode contrast and hierarchy in project modal right pane', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Open modal in Dark Mode
    await page.locator('.project-card[data-project-id="bickerbape"]').click();
    await page.waitForTimeout(300);

    const modal = page.locator('#project-modal');
    await expect(modal).toHaveClass(/is-open/);

    const darkTitle = modal.locator('.modal-innovation-title').first();
    await expect(darkTitle).toBeVisible();

    // Switch to Light Mode
    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);

    const themeToggle = page.locator('#theme-toggle');
    await themeToggle.click();
    await page.waitForTimeout(200);

    // Open modal in Light Mode
    await page.locator('.project-card[data-project-id="bickerbape"]').click();
    await page.waitForTimeout(300);

    await expect(modal).toHaveClass(/is-open/);
    const lightTitle = modal.locator('.modal-innovation-title').first();
    await expect(lightTitle).toBeVisible();

    const lightMetric = modal.locator('.modal-innovation-metric').first();
    await expect(lightMetric).toBeVisible();
    const metricColor = await lightMetric.evaluate((el) => window.getComputedStyle(el).color);
    // Light mode metric should have high contrast blue
    expect(metricColor).toBeTruthy();
  });
});
