import { test, expect } from '@playwright/test';

test.describe('Education & Contact Sections (Phase 7)', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(1000);
  });

  test('EDU-01 & EDU-02: Render IIT Bombay B.Tech degree, crest, and school Gold Medals (CMS 98.25%, St. Francis 98%)', async ({ page }) => {
    const educationSec = page.locator('#education');
    await expect(educationSec).toBeVisible();

    // Verify section header
    await expect(educationSec.locator('.section__header .section-tag')).toHaveText('03 // EDUCATION');
    await expect(educationSec.locator('.section__title')).toHaveText('Where I Learned');

    // Verify IIT Bombay
    await expect(educationSec).toContainText('Indian Institute of Technology Bombay');
    await expect(educationSec).toContainText('Aerospace Engineering');
    const iitbLogo = educationSec.locator('img[alt*="IIT"], img[alt*="Bombay"]');
    await expect(iitbLogo.first()).toBeVisible();

    // Verify CMS and St. Francis Gold Medals
    await expect(educationSec).toContainText('City Montessori School');
    await expect(educationSec).toContainText('98.25%');
    await expect(educationSec).toContainText("St. Francis");
    await expect(educationSec).toContainText('98.00%');
  });

  test('EDU-03: Render Campus Governance (Abhyuday, Placement Cell) and Extracurriculars (Dramatics, Sports)', async ({ page }) => {
    const educationSec = page.locator('#education');

    // Abhyuday & Placement Cell
    await expect(educationSec).toContainText('Abhyuday');
    await expect(educationSec).toContainText('Placement Cell');
    await expect(educationSec).toContainText('₹10M+');

    // Performing arts & sports
    await expect(educationSec).toContainText('Dramatics');
    await expect(educationSec).toContainText('Inter IIT');
    await expect(educationSec).toContainText('Basketball');
  });

  test('EDU-04 & EDU-05: Render skills matrix and verify Structured Intensity design tokens', async ({ page }) => {
    const educationSec = page.locator('#education');

    // Verify skill pills
    const skillPills = educationSec.locator('.skill-pill');
    const count = await skillPills.count();
    expect(count).toBeGreaterThanOrEqual(10);

    // Verify skills include authentic entries
    await expect(educationSec).toContainText('Storyboarding');
    await expect(educationSec).toContainText('Python');
    await expect(educationSec).toContainText('Power BI');
    await expect(educationSec).toContainText('AI Agents');
  });

  test('CONT-01 to CONT-04: Render interactive contact channels (LinkedIn, GitHub, Email, Phone)', async ({ page }) => {
    const contactSec = page.locator('#contact');
    await expect(contactSec).toBeVisible();

    // Section header
    await expect(contactSec.locator('.section__header .section-tag')).toHaveText('04 // CONTACT');
    await expect(contactSec.locator('.section__title')).toHaveText("Let's Connect");

    // LinkedIn
    const linkedinLink = contactSec.locator('a[href*="linkedin.com/in/prashantmanishukla"]');
    await expect(linkedinLink).toBeVisible();

    // GitHub
    const githubLink = contactSec.locator('a[href*="github.com/Prashant1873"]');
    await expect(githubLink).toBeVisible();

    // Email
    const emailLink = contactSec.locator('a[href*="mailto:shuklaprashant847@gmail.com"], button[data-action="copy-email"]');
    await expect(emailLink.first()).toBeVisible();

    // Phone
    const phoneLink = contactSec.locator('a[href*="tel:+919696721493"]');
    await expect(phoneLink).toBeVisible();
  });

  test('CONT-05 & CONT-06: Downloadable resume CTA and Newsreader editorial closing quote', async ({ page }) => {
    const contactSec = page.locator('#contact');

    // Download Resume button (PDF)
    const downloadBtn = contactSec.locator('a[download*="Resume"], #download-resume-btn');
    await expect(downloadBtn).toBeVisible();
    const downloadHref = await downloadBtn.getAttribute('href');
    expect(downloadHref).toContain('Prashant_Shukla_Resume_IIT_Bombay.pdf');

    // Preview Resume button (Within webpage modal)
    const previewBtn = contactSec.locator('#preview-resume-btn');
    await expect(previewBtn).toBeVisible();

    // Open in-webpage preview modal
    await previewBtn.click();
    await page.waitForTimeout(300);

    const resumeModal = page.locator('#resume-modal');
    await expect(resumeModal).toBeVisible();
    await expect(resumeModal).toHaveClass(/is-open/);

    // Verify embedded PDF iframe
    const resumeIframe = resumeModal.locator('#resume-modal-iframe');
    await expect(resumeIframe).toBeVisible();
    const iframeSrc = await resumeIframe.getAttribute('src');
    expect(iframeSrc).toContain('Prashant_Shukla_Resume_IIT_Bombay.pdf');

    // Close modal via ESC
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await expect(resumeModal).not.toHaveClass(/is-open/);

    // Editorial quote in Newsreader (CONT-07)
    const editorialQuote = contactSec.locator('.contact__quote');
    await expect(editorialQuote).toBeVisible();
    await expect(editorialQuote).toContainText('Architecting category-defining product strategies from first principles');
    await expect(editorialQuote).not.toContainText('engineering rigor meets behavioral empathy');

    // Site Footer
    const footer = page.locator('.site-footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('PRASHANT SHUKLA');
  });

  test('Verify Education and Contact 100vh Viewport Containment at 1280x720', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Test #education
    await page.evaluate(() => {
      document.getElementById('education')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    const eduBox = await page.locator('#education').boundingBox();
    expect(eduBox).not.toBeNull();
    expect(eduBox.height).toBeLessThanOrEqual(721);

    // Test #contact
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    const contactBox = await page.locator('#contact').boundingBox();
    expect(contactBox).not.toBeNull();
    expect(contactBox.height).toBeLessThanOrEqual(721);
  });
});
