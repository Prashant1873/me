import { test, expect } from '@playwright/test';
import { PROJECT_IDS, expandProject, openCaseStudy } from './helpers/projects.js';

test.describe('Projects Section - Cinematic Case Studies (Phase 6)', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(1000);
  });

  test('PROJ-01 & PROJ-02: Render all 7 projects as accordion rows with authentic attributes', async ({ page }) => {
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();

    const accordion = page.locator('#projects-accordion');
    await expect(accordion).toBeVisible();

    const items = accordion.locator('.project-item');
    await expect(items).toHaveCount(7);

    const expectedTitles = [
      'Sage',
      'BickerBape',
      'StrokeCRM',
      'TRINET',
      'Know Your Archetype',
      'CareerLoom',
      'Marcutie'
    ];

    const expectedStatus = [
      'LIVE APP',
      '98/98 TESTS',
      'SELF-HOSTED',
      '500+ MFRS',
      '18 SCENARIOS',
      '200+ FIRMS',
      'LOCAL-FIRST'
    ];

    for (let i = 0; i < 7; i++) {
      const item = items.nth(i);
      await expect(item).toHaveAttribute('data-project-id', PROJECT_IDS[i]);
      await expect(item.locator('.project-item__title')).toHaveText(expectedTitles[i]);
      await expect(item.locator('.project-item__status')).toContainText(expectedStatus[i]);
      await expect(item.locator('.project-item__index')).toHaveText(String(i + 1).padStart(2, '0'));
      await expect(item.locator('.project-item__category')).toBeVisible();
      await expect(item.locator('.project-item__summary')).toBeVisible();

      // Panel content exists for every project, revealed only when expanded
      expect(await item.locator('.project-tag').count()).toBeGreaterThan(0);
      await expect(item.locator('.project-proof__item')).toHaveCount(3);
    }
  });

  test('PROJ-ACC-01: Accordion discloses one project at a time with correct ARIA state', async ({ page }) => {
    await page.evaluate(() => document.getElementById('projects').scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(900);

    const items = page.locator('.project-item');
    const openItems = page.locator('.project-item.is-open');

    // First project is expanded by default; every other panel is inert
    await expect(openItems).toHaveCount(1);
    await expect(items.first()).toHaveClass(/is-open/);
    await expect(items.first().locator('.project-item__header')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.project-item__panel[inert]')).toHaveCount(6);

    // Header and panel are cross-referenced
    const header = items.nth(2).locator('.project-item__header');
    const panelId = await header.getAttribute('aria-controls');
    await expect(page.locator(`#${panelId}`)).toHaveAttribute('aria-labelledby', await header.getAttribute('id'));

    // Expanding another row collapses the previous one
    const stroke = await expandProject(page, 'strokecrm');
    await expect(openItems).toHaveCount(1);
    await expect(stroke).toHaveClass(/is-open/);
    await expect(header).toHaveAttribute('aria-expanded', 'true');
    await expect(items.first().locator('.project-item__header')).toHaveAttribute('aria-expanded', 'false');
    await expect(stroke.locator('.project-item__narrative')).toContainText('self-hosted');
    await expect(stroke.locator('.project-preview__img')).toBeVisible();

    // Projects without a live deployment only offer case study and code
    await expect(stroke.locator('.project-action--live')).toHaveCount(0);
    await expect(stroke.locator('.project-action--code')).toHaveAttribute('href', 'https://github.com/Prashant1873/StrokeCRM');
    await expect(stroke.locator('.project-action--code')).toHaveAttribute('rel', 'noopener noreferrer');

    // Clicking the open row collapses it
    await header.click();
    await page.waitForTimeout(700);
    await expect(openItems).toHaveCount(0);
    await expect(header).toHaveAttribute('aria-expanded', 'false');
  });

  test('PROJ-ACC-02: Rows are keyboard operable without paging the section', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.evaluate(() => document.getElementById('projects').scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(900);
    const scrollBefore = await page.evaluate(() => window.scrollY);

    const header = page.locator('.project-item[data-project-id="trinet"] .project-item__header');
    await header.focus();
    await page.keyboard.press('Space');
    await page.waitForTimeout(800);

    await expect(page.locator('.project-item[data-project-id="trinet"]')).toHaveClass(/is-open/);
    expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);

    // Sage links to its live deployment
    const sage = await expandProject(page, 'sage');
    await expect(sage.locator('.project-action--live')).toHaveAttribute('href', 'https://sage-api-bke34nnd7q-uc.a.run.app/');
    await expect(sage.locator('.project-action--live')).toHaveAttribute('target', '_blank');
  });

  test('PROJ-03 & PROJ-07: Click-to-expand modal takeover with GSAP animation, scroll lock, and ESC close', async ({ page }) => {
    const item = page.locator('.project-item[data-project-id="bickerbape"]');
    await expect(item).toBeVisible();

    const modal = page.locator('#project-modal');
    await expect(modal).not.toHaveClass(/is-open/);

    // Expand the row, then open the case study modal
    await openCaseStudy(page, 'bickerbape');
    await page.waitForTimeout(400);

    // Modal should now be open
    await expect(modal).toHaveClass(/is-open/);
    await expect(modal.locator('#modal-project-title')).toHaveText('BickerBape');

    // Body scroll should be locked
    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).toBe('hidden');

    // Site nav and main should be marked inert for accessibility focus trap
    const mainInert = await page.locator('main').getAttribute('inert');
    expect(mainInert).not.toBeNull();

    // Press Escape to close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    // Modal should be closed and scroll restored
    await expect(modal).not.toHaveClass(/is-open/);
    const restoredOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(restoredOverflow).toBe('');
  });

  test('PROJ-04: Expanded modal cockpit renders narrative, 3 innovations, tech stack, and secure CTAs', async ({ page }) => {
    // Open BickerBape card
    await openCaseStudy(page, 'bickerbape');
    await page.waitForTimeout(400);

    const modal = page.locator('#project-modal');
    await expect(modal).toHaveClass(/is-open/);

    // Verify integrated narrative
    const narrative = modal.locator('.modal-narrative');
    await expect(narrative).toBeVisible();
    await expect(narrative).toContainText('first salary');

    // Verify 3-item Innovation & Proof grid
    const innovationItems = modal.locator('.modal-innovation-item');
    await expect(innovationItems).toHaveCount(3);
    await expect(innovationItems.first().locator('.modal-innovation-metric')).toBeVisible();

    // Verify tech stack pills
    const techPills = modal.locator('.modal-tech-pill');
    await expect(techPills).toHaveCount(5);

    // Verify CTAs with secure rel and target attributes
    const liveCta = modal.locator('.modal-cta--primary');
    await expect(liveCta).toBeVisible();
    await expect(liveCta).toHaveAttribute('target', '_blank');
    await expect(liveCta).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(liveCta).toHaveAttribute('href', 'https://prashant1873.github.io/BickerBape/');

    const githubCta = modal.locator('.modal-cta--secondary');
    await expect(githubCta).toBeVisible();
    await expect(githubCta).toHaveAttribute('target', '_blank');
    await expect(githubCta).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(githubCta).toHaveAttribute('href', 'https://github.com/Prashant1873/BickerBape');

    // Close modal
    await modal.locator('#modal-close-btn').click();
    await page.waitForTimeout(300);
    await expect(modal).not.toHaveClass(/is-open/);
  });

  test('PROJ-05 & PROJ-06: Interactive slideshow controls, filmstrip thumbnails, and keyboard navigation', async ({ page }) => {
    // Open BickerBape case study (has 7 screenshots)
    await openCaseStudy(page, 'bickerbape');
    await page.waitForTimeout(400);

    const modal = page.locator('#project-modal');
    const slideshow = modal.locator('.modal-slideshow');
    await expect(slideshow).toBeVisible();

    // Verify main slide image and caption
    const mainImg = slideshow.locator('.modal-slideshow__img');
    await expect(mainImg).toBeVisible();

    const caption = slideshow.locator('.modal-slideshow__caption');
    await expect(caption).toContainText('[1 / 7]');

    // Verify filmstrip thumbnails
    const thumbs = slideshow.locator('.modal-slideshow__thumb');
    await expect(thumbs).toHaveCount(7);
    await expect(thumbs.first()).toHaveClass(/is-active/);

    // Click Next Chevron
    const nextBtn = slideshow.locator('#slideshow-next-btn');
    await nextBtn.click();
    await page.waitForTimeout(300);

    // Caption should update to 2 / 7
    await expect(caption).toContainText('[2 / 7]');
    await expect(thumbs.nth(1)).toHaveClass(/is-active/);

    // Click Prev Chevron
    const prevBtn = slideshow.locator('#slideshow-prev-btn');
    await prevBtn.click();
    await page.waitForTimeout(300);
    await expect(caption).toContainText('[1 / 7]');

    // Click 4th thumbnail in filmstrip directly
    await thumbs.nth(3).click();
    await page.waitForTimeout(300);
    await expect(caption).toContainText('[4 / 7]');
    await expect(thumbs.nth(3)).toHaveClass(/is-active/);

    // Test Keyboard navigation (ArrowRight / ArrowLeft inside slideshow)
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);
    await expect(caption).toContainText('[5 / 7]');

    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(300);
    await expect(caption).toContainText('[4 / 7]');

    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await expect(modal).not.toHaveClass(/is-open/);
  });

  test('Modal project traversal: Prev / Next project controls switch between case studies smoothly', async ({ page }) => {
    // Open BickerBape (index 0)
    await openCaseStudy(page, 'bickerbape');
    await page.waitForTimeout(400);

    const modal = page.locator('#project-modal');
    await expect(modal.locator('#modal-project-title')).toHaveText('BickerBape');

    // Click Next Project button
    const nextProjectBtn = modal.locator('#modal-next-project-btn');
    await nextProjectBtn.click();
    await page.waitForTimeout(300);

    // Should now display StrokeCRM
    await expect(modal.locator('#modal-project-title')).toHaveText('StrokeCRM');
    await expect(modal.locator('.modal-slideshow__caption')).toContainText('[1 / 6]');

    // Click Prev Project button
    const prevProjectBtn = modal.locator('#modal-prev-project-btn');
    await prevProjectBtn.click();
    await page.waitForTimeout(300);

    // Should return to BickerBape
    await expect(modal.locator('#modal-project-title')).toHaveText('BickerBape');

    // Backdrop click closes modal
    await modal.locator('#modal-backdrop').click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(300);
    await expect(modal).not.toHaveClass(/is-open/);
  });
});
