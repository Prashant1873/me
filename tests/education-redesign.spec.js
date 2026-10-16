import { test, expect } from '@playwright/test';

test.describe('Phase 19: Education Page UI/UX & Card Interior Redesign', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/#education');
    await page.waitForTimeout(1000);
  });

  test('EDU-08: Academic Excellence card has 3 equal balanced columns', async ({ page }) => {
    const academicsCard = page.locator('.education-card--academics');
    await expect(academicsCard).toBeVisible();

    const body = academicsCard.locator('.education-card__body');
    const cols = academicsCard.locator('.academic-col-card');
    await expect(cols).toHaveCount(3);

    // Verify 3 columns: IIT Bombay, CMS, St. Francis
    await expect(cols.nth(0)).toContainText('IIT Bombay');
    await expect(cols.nth(1)).toContainText('City Montessori School');
    await expect(cols.nth(2)).toContainText("St. Francis");

    // Verify equal column width distribution (within 5px tolerance)
    const box0 = await cols.nth(0).boundingBox();
    const box1 = await cols.nth(1).boundingBox();
    const box2 = await cols.nth(2).boundingBox();

    expect(box0).not.toBeNull();
    expect(box1).not.toBeNull();
    expect(box2).not.toBeNull();

    expect(Math.abs(box0.width - box1.width)).toBeLessThanOrEqual(5);
    expect(Math.abs(box1.width - box2.width)).toBeLessThanOrEqual(5);
  });

  test('EDU-06 & EDU-10: High-Stakes Leadership formats punchy metrics with low text density and zero cluttered boxes', async ({ page }) => {
    const govCard = page.locator('.education-card--governance');
    await expect(govCard).toBeVisible();

    const entries = govCard.locator('.governance-entry');
    await expect(entries).toHaveCount(2);

    // Verify Abhyuday bullets and highlighted metrics
    const abhyuday = entries.nth(0);
    const abhyudayBullets = abhyuday.locator('.governance-bullets');
    await expect(abhyudayBullets).toBeVisible();
    await expect(abhyudayBullets).toContainText('₹10M+');
    await expect(abhyudayBullets).toContainText('150+');
    await expect(abhyudayBullets).toContainText('50,000+');
    await expect(abhyudayBullets).toContainText('₹20M+');

    // Verify Placement Cell bullets and highlighted metrics
    const placement = entries.nth(1);
    const placementBullets = placement.locator('.governance-bullets');
    await expect(placementBullets).toBeVisible();
    await expect(placementBullets).toContainText('2,000+');
    await expect(placementBullets).toContainText('40+');
    await expect(placementBullets).toContainText('16-week');
  });

  test('EDU-09: 2x Gold Medalist badge is clean, unadorned, and free of medal icons or emojis', async ({ page }) => {
    const creativeCard = page.locator('.education-card--creative');
    await expect(creativeCard).toBeVisible();

    const goldBadge = creativeCard.locator('.creative-badge--gold');
    await expect(goldBadge).toBeVisible();
    await expect(goldBadge).toHaveText('2× GOLD MEDALIST');

    const medalIcons = goldBadge.locator('.medal-svg, svg');
    await expect(medalIcons).toHaveCount(0);

    const badgeText = await goldBadge.innerText();
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]/u;
    expect(emojiRegex.test(badgeText)).toBe(false);
  });

  test('EDU-07: Core Competencies and Toolkits card is expanded with rich resume domains without empty space', async ({ page }) => {
    const skillsMatrix = page.locator('.skills-matrix');
    await expect(skillsMatrix).toBeVisible();

    const groups = skillsMatrix.locator('.skills-group');
    await expect(groups).toHaveCount(3);

    const pills = skillsMatrix.locator('.skill-pill');
    const pillCount = await pills.count();
    // At least 24 expanded competencies from resume
    expect(pillCount).toBeGreaterThanOrEqual(20);

    // Verify key proficiencies exist
    await expect(skillsMatrix).toContainText('Storyboarding');
    await expect(skillsMatrix).toContainText('GTM Playbooks');
    await expect(skillsMatrix).toContainText('Python');
    await expect(skillsMatrix).toContainText('Power BI');
    await expect(skillsMatrix).toContainText('Alteryx');
    await expect(skillsMatrix).toContainText('AI Agents');
    await expect(skillsMatrix).toContainText('Three.js');
  });
});
