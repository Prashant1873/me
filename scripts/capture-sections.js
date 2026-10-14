import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\u1233270\\.gemini\\antigravity-ide\\brain\\b5a35c68-62ca-4146-8b16-df768decb0dd';
const LOCAL_DIR = './screenshots';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1500);

  const sections = ['hero', 'experience', 'projects', 'education', 'contact'];
  const metrics = {};

  for (const theme of ['dark', 'light']) {
    console.log(`\n=== Capturing Theme: ${theme.toUpperCase()} ===`);
    await page.evaluate((t) => {
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('theme', t);
    }, theme);
    await page.waitForTimeout(400);

    metrics[theme] = {};

    for (const secId of sections) {
      console.log(`Capturing section: #${secId} (${theme})...`);
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'instant' });
      }, secId);
      await page.waitForTimeout(600);

      // Extract typography and spacing metrics
      const secMetrics = await page.evaluate((id) => {
        const sec = document.getElementById(id);
        if (!sec) return null;
        const tag = sec.querySelector('.section-tag');
        const title = sec.querySelector('.section__title') || sec.querySelector('.hero__name');
        const sub = sec.querySelector('.section__subtitle') || sec.querySelector('.hero__metadata');

        function getStyle(el) {
          if (!el) return null;
          const cs = window.getComputedStyle(el);
          return {
            fontFamily: cs.fontFamily,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            lineHeight: cs.lineHeight,
            letterSpacing: cs.letterSpacing,
            marginTop: cs.marginTop,
            marginBottom: cs.marginBottom,
            color: cs.color
          };
        }

        const secCs = window.getComputedStyle(sec);
        const rect = sec.getBoundingClientRect();

        return {
          id,
          rect: { top: rect.top, height: rect.height, width: rect.width },
          paddingTop: secCs.paddingTop,
          paddingBottom: secCs.paddingBottom,
          tag: getStyle(tag),
          title: getStyle(title),
          subtitle: getStyle(sub)
        };
      }, secId);

      metrics[theme][secId] = secMetrics;

      const filename = `${theme}-${secId}.png`;
      const localPath = path.join(LOCAL_DIR, filename);
      const artifactPath = path.join(ARTIFACT_DIR, filename);

      await page.screenshot({ path: localPath });
      fs.copyFileSync(localPath, artifactPath);
      console.log(`Saved screenshot: ${localPath}`);
    }

    // Capture Project Modal
    console.log(`Capturing Project Modal (${theme})...`);
    await page.evaluate(() => {
      const card = document.querySelector('.project-card[data-project-id="bickerbape"]');
      if (card) card.click();
    });
    await page.waitForTimeout(600);

    const modalFilename = `${theme}-project-modal.png`;
    const modalLocal = path.join(LOCAL_DIR, modalFilename);
    const modalArtifact = path.join(ARTIFACT_DIR, modalFilename);
    await page.screenshot({ path: modalLocal });
    fs.copyFileSync(modalLocal, modalArtifact);
    console.log(`Saved modal screenshot: ${modalLocal}`);

    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
  }

  // Also capture at standard 1280x720 (laptop viewport)
  console.log('\n=== Capturing 1280x720 Laptop Viewports ===');
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await page.waitForTimeout(400);

  for (const secId of sections) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }, secId);
    await page.waitForTimeout(600);

    const filename = `laptop-720p-${secId}.png`;
    const localPath = path.join(LOCAL_DIR, filename);
    const artifactPath = path.join(ARTIFACT_DIR, filename);

    await page.screenshot({ path: localPath });
    fs.copyFileSync(localPath, artifactPath);
    console.log(`Saved screenshot: ${localPath}`);
  }

  // Save metrics report
  const reportPath = path.join(LOCAL_DIR, 'typography-metrics.json');
  fs.writeFileSync(reportPath, JSON.stringify(metrics, null, 2));
  console.log(`\nMetrics written to ${reportPath}`);

  await browser.close();
  console.log('Capture complete!');
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
