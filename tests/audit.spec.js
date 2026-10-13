import { test, expect } from '@playwright/test';

test('Audit updated layout, 3D canvas placement, and elastic section scroll', async ({ page }) => {
  test.setTimeout(45000);
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000); // let entrance animations settle

  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  const vh = viewport.height;
  const vw = viewport.width;

  console.log(`\n================ AUDIT REPORT ================`);
  console.log(`Viewport: ${vw}x${vh}`);

  // 1. Verify 3D Canvas Positioning vs Hero Content
  const heroContent = page.locator('.hero__content');
  const heroCanvas = page.locator('#hero-canvas');
  const contentBox = await heroContent.boundingBox();
  const canvasBox = await heroCanvas.boundingBox();

  console.log('\n--- 1. HERO & 3D CANVAS AUDIT ---');
  console.log(`Hero Content: x=${contentBox.x.toFixed(1)}, width=${contentBox.width.toFixed(1)}, rightEdge=${(contentBox.x + contentBox.width).toFixed(1)}px`);
  console.log(`3D Canvas:    x=${canvasBox.x.toFixed(1)}, width=${canvasBox.width.toFixed(1)}, leftEdge=${canvasBox.x.toFixed(1)}px`);

  expect(canvasBox.x).toBeGreaterThanOrEqual(vw * 0.48);
  console.log(`✓ 3D canvas is positioned cleanly in the right half of the screen (x >= ${vw * 0.48}px).`);

  // 2. Verify Full-Viewport Section Heights
  const sectionIds = ['hero', 'experience', 'projects', 'education', 'contact'];
  console.log('\n--- 2. SECTION HEIGHT AUDIT ---');
  for (const id of sectionIds) {
    const sec = page.locator(`#${id}`);
    const box = await sec.boundingBox();
    const ratio = box.height / vh;
    console.log(`Section #${id}: height=${box.height.toFixed(1)}px (ratio to viewport: ${ratio.toFixed(2)})`);
    expect(box.height).toBeGreaterThanOrEqual(vh - 2);
  }
  console.log('✓ All sections fill 100% of viewport height end-to-end.');

  // 3. Test Scroll Mechanics — Single Trackpad Wheel Trigger moves exactly 1 full section
  console.log('\n--- 3. ELASTIC SECTION SCROLL & ZERO-LAG AUDIT ---');
  const initialScrollY = await page.evaluate(() => window.scrollY);
  expect(initialScrollY).toBe(0);

  // Gentle trackpad wheel event (18px) to verify low-threshold zero-lag trigger
  console.log('Dispatching gentle trackpad wheel event (18px) to test zero-lag activation...');
  await page.mouse.wheel(0, 18);
  await page.waitForTimeout(800);

  const expBox = await page.locator('#experience').boundingBox();
  console.log(`Experience section viewport position: top=${expBox.y.toFixed(1)}px`);
  expect(Math.abs(expBox.y)).toBeLessThan(2);
  console.log('✓ Low-delta trackpad gesture instantly triggered section transition without deadzone lag.');

  // Verify active nav link is now "experience"
  const activeNavText = await page.locator('.site-nav__link.is-active').textContent();
  expect(activeNavText).toBe('Experience');

  // 4. Test Mid-Flight Interruption (Reverse Flick)
  console.log('\n--- 4. MID-FLIGHT REVERSAL INTERRUPTION AUDIT ---');
  // From Experience, scroll down towards Projects, but immediately (at 100ms) flick UP to reverse back to Experience
  console.log('Triggering scroll towards projects...');
  await page.mouse.wheel(0, 50);
  await page.waitForTimeout(100); // Mid-flight!
  console.log('Flicking UP mid-flight to interrupt and reverse...');
  await page.mouse.wheel(0, -50);
  await page.waitForTimeout(800);

  const expBoxInterrupted = await page.locator('#experience').boundingBox();
  console.log(`Experience section after mid-flight reversal: top=${expBoxInterrupted.y.toFixed(1)}px`);
  expect(Math.abs(expBoxInterrupted.y)).toBeLessThan(2);
  console.log('✓ Mid-flight reversal was accepted immediately with zero dropped input!');

  // 5. Test Mid-Flight Chaining (Advance forward)
  console.log('\n--- 5. MID-FLIGHT CHAINING AUDIT ---');
  // Scroll down towards Projects, and at 220ms flick down again to chain to Education
  console.log('Triggering scroll towards projects...');
  await page.mouse.wheel(0, 60);
  await page.waitForTimeout(230);
  console.log('Flicking down again mid-flight to chain directly to education...');
  await page.mouse.wheel(0, 60);
  await page.waitForTimeout(900);

  const eduBox = await page.locator('#education').boundingBox();
  console.log(`Education section position after chaining: top=${eduBox.y.toFixed(1)}px`);
  expect(Math.abs(eduBox.y)).toBeLessThan(2);
  console.log('✓ Mid-flight forward chaining seamlessly accelerated to section #education!');

  // 6. Test Nav click direct return
  console.log('\n--- 6. NAV DIRECT LINK AUDIT ---');
  await page.locator('.site-nav__link[data-section="hero"]').click();
  await page.waitForTimeout(800);
  const heroBoxReturn = await page.locator('#hero').boundingBox();
  expect(Math.abs(heroBoxReturn.y)).toBeLessThan(2);
  console.log('✓ Nav link returned cleanly to Hero section.');

  // 7. Test Hero scroll button
  await page.locator('#hero-scroll-btn').click({ force: true });
  await page.waitForTimeout(800);
  const expBoxFromBtn = await page.locator('#experience').boundingBox();
  expect(Math.abs(expBoxFromBtn.y)).toBeLessThan(2);
  console.log('✓ Hero scroll indicator smoothly navigated to experience section.');

  console.log('\n================ ALL AUDIT & INTERRUPTIBILITY CHECKS PASSED ================\n');
});
