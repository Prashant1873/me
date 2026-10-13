import { test, expect } from '@playwright/test';

test('Audit updated layout, 3D canvas placement, and single-swipe scroll enforcement', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000); // let entrance animations settle

  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  const vh = viewport.height;
  const vw = viewport.width;

  console.log(`\n================ AUDIT REPORT ================`);
  console.log(`Viewport: ${vw}x${vh}`);

  // 1. Verify Hero Text Updates (Removed tagline and STATUS: DEPLOYED)
  console.log('\n--- 1. HERO CONTENT AUDIT ---');
  const heroText = await page.locator('#hero').innerText();
  expect(heroText).not.toContain('Engineering rigor meets behavioral empathy.');
  expect(heroText).not.toContain('STATUS: DEPLOYED');
  expect(heroText).toContain('IIT BOMBAY // AEROSPACE ENGINEERING // B.TECH 2026');
  console.log('✓ "Engineering rigor meets behavioral empathy." successfully removed.');
  console.log('✓ "// STATUS: DEPLOYED" successfully removed.');
  console.log('✓ Hero metadata verified: "IIT BOMBAY // AEROSPACE ENGINEERING // B.TECH 2026".');

  // 2. Verify 3D Canvas Positioning vs Hero Content
  const heroContent = page.locator('.hero__content');
  const heroCanvas = page.locator('#hero-canvas');
  const contentBox = await heroContent.boundingBox();
  const canvasBox = await heroCanvas.boundingBox();

  console.log('\n--- 2. HERO & 3D CANVAS AUDIT ---');
  console.log(`Hero Content: x=${contentBox.x.toFixed(1)}, width=${contentBox.width.toFixed(1)}, rightEdge=${(contentBox.x + contentBox.width).toFixed(1)}px`);
  console.log(`3D Canvas:    x=${canvasBox.x.toFixed(1)}, width=${canvasBox.width.toFixed(1)}, leftEdge=${canvasBox.x.toFixed(1)}px`);

  expect(canvasBox.x).toBeGreaterThanOrEqual(vw * 0.48);
  console.log(`✓ 3D canvas is positioned cleanly in the right half of the screen (x >= ${vw * 0.48}px).`);

  // 3. Verify Full-Viewport Section Heights
  const sectionIds = ['hero', 'experience', 'projects', 'education', 'contact'];
  console.log('\n--- 3. SECTION HEIGHT AUDIT ---');
  for (const id of sectionIds) {
    const sec = page.locator(`#${id}`);
    const box = await sec.boundingBox();
    const ratio = box.height / vh;
    expect(box.height).toBeGreaterThanOrEqual(vh - 2);
  }
  console.log('✓ All sections fill 100% of viewport height end-to-end.');

  // 4. Test Single Strong Swipe = Exactly 1 Page (No multi-page skipping)
  console.log('\n--- 4. STRONG SWIPE (1 SWIPE = 1 PAGE) AUDIT ---');
  const initialScrollY = await page.evaluate(() => window.scrollY);
  expect(initialScrollY).toBe(0);

  // Dispatch a very strong trackpad scroll swipe with rapid momentum events
  console.log('Dispatching a strong trackpad scroll swipe (wheel 450px + momentum 300px)...');
  await page.mouse.wheel(0, 450);
  await page.waitForTimeout(50);
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(50);
  await page.mouse.wheel(0, 150);
  await page.waitForTimeout(700);

  const expBox = await page.locator('#experience').boundingBox();
  const projBox = await page.locator('#projects').boundingBox();
  console.log(`After strong swipe:`);
  console.log(`  Experience section top: ${expBox.y.toFixed(1)}px`);
  console.log(`  Projects section top:   ${projBox.y.toFixed(1)}px`);

  // Experience must cover the screen (top ~ 0), and Projects must NOT be active
  expect(Math.abs(expBox.y)).toBeLessThan(2);
  expect(projBox.y).toBeGreaterThanOrEqual(vh - 2);
  console.log('✓ Strong swipe advanced exactly 1 section (Experience) and did NOT skip multiple sections!');

  // 5. Test Second Swipe advances exactly 1 more section
  console.log('\n--- 5. SECOND SWIPE AUDIT ---');
  await page.waitForTimeout(200);
  console.log('Dispatching second swipe...');
  await page.mouse.wheel(0, 100);
  await page.waitForTimeout(700);

  const projBox2 = await page.locator('#projects').boundingBox();
  console.log(`Projects section top after 2nd swipe: ${projBox2.y.toFixed(1)}px`);
  expect(Math.abs(projBox2.y)).toBeLessThan(2);
  console.log('✓ Second swipe cleanly advanced to Section 2 (Projects).');

  // 6. Test Mid-Flight Interruption (Reverse Flick)
  console.log('\n--- 6. MID-FLIGHT REVERSAL AUDIT ---');
  // Scroll down towards Education, but at 100ms flick UP to reverse back to Projects
  console.log('Triggering scroll towards education, then flicking UP mid-flight...');
  await page.mouse.wheel(0, 80);
  await page.waitForTimeout(100);
  await page.mouse.wheel(0, -80);
  await page.waitForTimeout(700);

  const projBoxInterrupted = await page.locator('#projects').boundingBox();
  console.log(`Projects section after mid-flight reversal: top=${projBoxInterrupted.y.toFixed(1)}px`);
  expect(Math.abs(projBoxInterrupted.y)).toBeLessThan(2);
  console.log('✓ Mid-flight reversal was accepted immediately without dropping input.');

  // 7. Test Nav Direct Links
  console.log('\n--- 7. NAV DIRECT LINK AUDIT ---');
  await page.locator('.site-nav__link[data-section="hero"]').click();
  await page.waitForTimeout(700);
  const heroBoxReturn = await page.locator('#hero').boundingBox();
  expect(Math.abs(heroBoxReturn.y)).toBeLessThan(2);
  console.log('✓ Nav link returned cleanly to Hero section.');

  // 8. Verify Browser Tab Favicon
  console.log('\n--- 8. BROWSER TAB FAVICON AUDIT ---');
  const faviconLink = page.locator('link[rel="icon"]');
  await expect(faviconLink).toHaveCount(1);
  const href = await faviconLink.getAttribute('href');
  expect(href).toContain('favicon.svg');

  const response = await page.request.get('http://localhost:3000/favicon.svg');
  expect(response.status()).toBe(200);
  const svgText = await response.text();
  expect(svgText).toContain('svg');
  expect(svgText).toContain('#E8655A'); // Coral wireframe color
  console.log('✓ 3D polygon wireframe favicon loaded with HTTP 200 and matches coral hero geometry.');

  // 9. Full Traversal Verification: Scroll sequentially through all sections without getting stuck
  console.log('\n--- 9. FULL TRAVERSAL AUDIT (NO STUCK PAGES) ---');
  const forwardSections = ['experience', 'projects', 'education', 'contact'];
  for (const secId of forwardSections) {
    console.log(`Scrolling forward to #${secId}...`);
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(650);
    const box = await page.locator(`#${secId}`).boundingBox();
    expect(Math.abs(box.y)).toBeLessThan(2);
    console.log(`  ✓ Arrived cleanly at #${secId}`);
  }

  const backwardSections = ['education', 'projects', 'experience', 'hero'];
  for (const secId of backwardSections) {
    console.log(`Scrolling backward to #${secId}...`);
    await page.mouse.wheel(0, -100);
    await page.waitForTimeout(650);
    const box = await page.locator(`#${secId}`).boundingBox();
    expect(Math.abs(box.y)).toBeLessThan(2);
    console.log(`  ✓ Arrived cleanly at #${secId}`);
  }
  console.log('✓ Full bidirectional traversal completed with zero stuck pages!');

  console.log('\n================ ALL AUDIT & SINGLE-SWIPE CHECKS PASSED ================\n');
});
