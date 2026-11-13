import { test, expect } from '@playwright/test';

const SECTION_IDS = ['hero', 'experience', 'projects', 'education', 'contact'];

async function gotoSection(page, id) {
  await page.goto(`http://localhost:3000/#${id}`);
  await page.waitForTimeout(2600);
}

/** Visible text, links, buttons and images in a section that end below the given limit. */
async function contentBelow(page, id, limitFromSectionTop) {
  return page.evaluate(
    ({ id, limitFromSectionTop }) => {
      const section = document.getElementById(id);
      const limit = section.getBoundingClientRect().top + limitFromSectionTop + 4;
      const out = [];
      section.querySelectorAll('h1,h2,h3,h4,p,a,button,li,img,span,blockquote').forEach((el) => {
        if (el.closest('[inert],[aria-hidden="true"]')) return;
        if (el.checkVisibility && !el.checkVisibility({ visibilityProperty: true })) return;
        const rect = el.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) return;
        if (rect.bottom > limit) out.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}`);
      });
      return out;
    },
    { id, limitFromSectionTop }
  );
}

test.describe('Viewport fit and scrolling across the whole site', () => {
  test.beforeEach(() => {
    test.setTimeout(120000);
  });

  for (const viewport of [
    { width: 1280, height: 720 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 }
  ]) {
    test(`FIT-01: every section is exactly one viewport with nothing clipped at ${viewport.width}x${viewport.height}`, async ({ page }) => {
      await page.setViewportSize(viewport);

      for (const id of SECTION_IDS) {
        await gotoSection(page, id);
        const box = await page.locator(`#${id}`).boundingBox();
        expect(Math.abs(box.y), `${id} top`).toBeLessThanOrEqual(1);
        expect(Math.abs(box.height - viewport.height), `${id} height`).toBeLessThanOrEqual(1);
        await expect(page.locator(`#${id}`)).not.toHaveClass(/is-flow/);
        expect(await contentBelow(page, id, viewport.height), `${id} clipped content`).toEqual([]);
      }

      const overflowX = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflowX).toBeLessThanOrEqual(0);
    });
  }

  test('FIT-02: a short desktop window flows instead of clipping, and all content stays reachable', async ({ page }) => {
    const viewport = { width: 1280, height: 620 };
    await page.setViewportSize(viewport);

    for (const id of SECTION_IDS.slice(1)) {
      await gotoSection(page, id);
      const section = page.locator(`#${id}`);
      const box = await section.boundingBox();
      expect(Math.abs(box.y), `${id} top`).toBeLessThanOrEqual(1);

      // Whatever the section's height, none of its content may extend past its own bottom edge
      expect(await contentBelow(page, id, box.height), `${id} content past section end`).toEqual([]);

      // A section taller than the viewport must be in flow mode, never silently clipped
      if (box.height > viewport.height + 1) {
        await expect(section).toHaveClass(/is-flow/);
      }
    }
  });

  test('FIT-03: the wheel travels inside a tall section before snapping to the next one', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 620 });
    await gotoSection(page, 'education');

    const education = page.locator('#education');
    await expect(education).toHaveClass(/is-flow/);
    const metrics = await education.evaluate((el) => ({ top: el.offsetTop, height: el.offsetHeight }));
    const sectionEnd = metrics.top + metrics.height - 620;
    expect(sectionEnd).toBeGreaterThan(metrics.top);

    await page.mouse.move(640, 320);

    // A fast flick of many wheel events must stop at the section's end, not skip to Contact
    for (let i = 0; i < 20; i++) {
      await page.mouse.wheel(0, 60);
      await page.waitForTimeout(16);
    }
    await page.waitForTimeout(900);
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - sectionEnd)).toBeLessThanOrEqual(2);
    await expect(page.locator('.site-nav__link[data-section="education"]')).toHaveClass(/is-active/);

    // A fresh gesture at the edge moves on to the next section
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(1000);
    await expect(page.locator('.site-nav__link[data-section="contact"]')).toHaveClass(/is-active/);
    const contactTop = await page.locator('#contact').evaluate((el) => el.offsetTop);
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - contactTop)).toBeLessThanOrEqual(2);

    // Scrolling back up lands on the end of the tall section, so reading continues upward
    await page.mouse.wheel(0, -100);
    await page.waitForTimeout(1000);
    await expect(page.locator('.site-nav__link[data-section="education"]')).toHaveClass(/is-active/);
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - sectionEnd)).toBeLessThanOrEqual(2);
  });

  test('FIT-04: one wheel notch still equals one section at a standard desktop size', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoSection(page, 'hero');
    await page.mouse.move(720, 450);

    for (let i = 1; i < SECTION_IDS.length; i++) {
      await page.mouse.wheel(0, 100);
      await page.waitForTimeout(1000);
      expect(await page.evaluate(() => window.scrollY)).toBe(i * 900);
      await expect(page.locator(`.site-nav__link[data-section="${SECTION_IDS[i]}"]`)).toHaveClass(/is-active/);
    }
  });

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 820, height: 1180 },
    { width: 844, height: 390 }
  ]) {
    test(`FIT-05: touch layout at ${viewport.width}x${viewport.height} has no sideways scroll and sections land under the nav`, async ({ browser }) => {
      const context = await browser.newContext({ viewport, hasTouch: true });
      const page = await context.newPage();

      for (const id of SECTION_IDS.slice(1)) {
        await gotoSection(page, id);

        const overflowX = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflowX, `${id} horizontal overflow`).toBeLessThanOrEqual(0);

        // The section starts at the top of the viewport; its own padding clears the fixed nav
        const layout = await page.evaluate((sectionId) => {
          const section = document.getElementById(sectionId);
          const tag = section.querySelector('.section-tag');
          const nav = document.getElementById('site-nav');
          return {
            sectionTop: section.getBoundingClientRect().top,
            tagTop: tag.getBoundingClientRect().top,
            navBottom: nav.getBoundingClientRect().bottom
          };
        }, id);
        expect(Math.abs(layout.sectionTop), `${id} top`).toBeLessThanOrEqual(2);
        const gap = layout.tagTop - layout.navBottom;
        expect(gap, `${id} gap under nav`).toBeGreaterThanOrEqual(8);
        expect(gap, `${id} gap under nav`).toBeLessThanOrEqual(48);

        // Nothing wider than the screen
        const tooWide = await page.evaluate((sectionId) => {
          const out = [];
          document.getElementById(sectionId).querySelectorAll('h2,h3,p,a,button,img,article').forEach((el) => {
            if (el.closest('[inert],[aria-hidden="true"]')) return;
            const rect = el.getBoundingClientRect();
            if (rect.width > 2 && rect.right > window.innerWidth + 1) out.push(String(el.className).split(' ')[0]);
          });
          return out;
        }, id);
        expect(tooWide, `${id} elements wider than the screen`).toEqual([]);
      }

      await context.close();
    });
  }

  test('FIT-06: the contact resume card keeps readable copy on tablets', async ({ browser }) => {
    for (const viewport of [{ width: 820, height: 1180 }, { width: 1024, height: 768 }]) {
      const context = await browser.newContext({ viewport, hasTouch: true });
      const page = await context.newPage();
      await gotoSection(page, 'contact');

      const info = await page.locator('.resume-chassis__info').boundingBox();
      const card = await page.locator('.resume-chassis').boundingBox();
      expect(info.width, `info width at ${viewport.width}`).toBeGreaterThan(200);
      expect(card.height, `card height at ${viewport.width}`).toBeLessThan(320);
      await context.close();
    }
  });

  test('FIT-07: the nav bar stays inside the viewport at every width', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(1500);

    for (const width of [320, 360, 390, 540, 768, 769, 800, 820, 844, 900, 960, 1024, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(250);

      const nav = await page.evaluate(() => {
        const inner = document.querySelector('.site-nav__inner');
        const visible = [...inner.querySelectorAll('*')].filter(
          (el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden'
        );
        const blocks = [...inner.children]
          .filter((el) => el.getClientRects().length)
          .map((el) => el.getBoundingClientRect());
        return {
          right: Math.max(...visible.map((el) => el.getBoundingClientRect().right)),
          overlap: blocks.some((rect, i) => i > 0 && rect.left < blocks[i - 1].right - 1),
          viewportWidth: window.innerWidth
        };
      });

      expect(nav.right, `nav right edge at ${width}px`).toBeLessThanOrEqual(nav.viewportWidth + 1);
      expect(nav.overlap, `nav blocks overlap at ${width}px`).toBe(false);
    }
  });

  test('FIT-08: touch targets in content sections are at least 40px tall on phones', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    const page = await context.newPage();

    for (const id of ['experience', 'projects', 'contact']) {
      await gotoSection(page, id);
      const small = await page.evaluate((sectionId) => {
        const out = [];
        document.getElementById(sectionId).querySelectorAll('a, button').forEach((el) => {
          if (el.closest('[inert],[aria-hidden="true"]')) return;
          if (el.checkVisibility && !el.checkVisibility({ visibilityProperty: true })) return;
          const rect = el.getBoundingClientRect();
          if (rect.width < 2 || rect.height < 2) return;
          if (rect.height < 40) out.push(`${String(el.className).split(' ')[0]} ${Math.round(rect.width)}x${Math.round(rect.height)}`);
        });
        return out;
      }, id);
      expect(small, `${id} undersized touch targets`).toEqual([]);
    }

    await context.close();
  });
});
