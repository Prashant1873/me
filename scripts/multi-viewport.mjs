import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/u1233270/.gemini/antigravity-ide/brain/334e1eee-4b8d-4a19-984e-bf48370e1e4f';

async function main() {
  const browser = await chromium.launch({ headless: true });
  for (const [w, h] of [[1280, 720], [1366, 768], [1440, 900], [1920, 1080]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto('http://localhost:3000/#projects');
    await page.waitForTimeout(500);
    await page.click('.project-card[data-project-id="bickerbape"]');
    await page.waitForTimeout(500);
    const modalPath = `./screenshots/modal_${w}x${h}.png`;
    await page.screenshot({ path: modalPath });
    fs.copyFileSync(modalPath, path.join(ARTIFACT_DIR, `modal_${w}x${h}.png`));

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const projPath = `./screenshots/projects_${w}x${h}.png`;
    await page.screenshot({ path: projPath });
    fs.copyFileSync(projPath, path.join(ARTIFACT_DIR, `projects_${w}x${h}.png`));

    await page.goto('http://localhost:3000/#education');
    await page.waitForTimeout(500);
    const eduPath = `./screenshots/education_${w}x${h}.png`;
    await page.screenshot({ path: eduPath });
    fs.copyFileSync(eduPath, path.join(ARTIFACT_DIR, `education_${w}x${h}.png`));
  }
  await browser.close();
  console.log('Done multi-viewport screenshots');
}

main().catch(console.error);
