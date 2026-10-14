import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

test.describe('Platform Policy: Zero Em Dashes Enforced', () => {
  const TARGET_CHAR = String.fromCharCode(0x2014); // em dash

  test('Rendered DOM contains zero em dashes across all sections and metadata', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(1000);

    // 1. Check document title
    const title = await page.title();
    expect(title).not.toContain(TARGET_CHAR);

    // 2. Check meta tags
    const metaDescriptions = await page.$$eval('meta[name="description"]', els => els.map(e => e.getAttribute('content')));
    metaDescriptions.forEach(desc => expect(desc || '').not.toContain(TARGET_CHAR));

    const ogTitles = await page.$$eval('meta[property="og:title"]', els => els.map(e => e.getAttribute('content')));
    ogTitles.forEach(t => expect(t || '').not.toContain(TARGET_CHAR));

    // 3. Check visible body text across full page
    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText).not.toContain(TARGET_CHAR);

    // 4. Check specific sections explicitly
    const sections = ['#hero', '#experience', '#projects', '#education', '#contact', '.site-footer'];
    for (const selector of sections) {
      const el = page.locator(selector);
      if (await el.count() > 0) {
        const text = await el.innerText();
        expect(text).not.toContain(TARGET_CHAR);
      }
    }
  });

  test('Source code in src/ and index.html contains zero em dashes', async () => {
    const filesToCheck = ['index.html'];

    function collectFiles(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          collectFiles(fullPath);
        } else if (/\.(js|css|html)$/.test(entry.name)) {
          filesToCheck.push(fullPath);
        }
      }
    }

    collectFiles('src');

    for (const file of filesToCheck) {
      const content = fs.readFileSync(file, 'utf-8');
      expect(content, `File ${file} contains an em dash`).not.toContain(TARGET_CHAR);
    }
  });
});
