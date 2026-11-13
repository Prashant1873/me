/**
 * Shared helpers for the Projects accordion.
 * Disclosure levels: row header -> expanded panel -> case study modal.
 */

export const PROJECT_IDS = [
  'sage',
  'bickerbape',
  'strokecrm',
  'trinet',
  'archetype',
  'careerloom',
  'marcutie'
];

/** Expand a project's accordion panel if it is not already open. */
export async function expandProject(page, projectId) {
  const item = page.locator(`.project-item[data-project-id="${projectId}"]`);
  const isOpen = await item.evaluate((el) => el.classList.contains('is-open'));
  if (!isOpen) {
    await item.locator('.project-item__header').click();
  }
  await waitForAccordionSettled(page);
  return item;
}

/**
 * Resolve once every open/close transition in the accordion has finished.
 * Clicking into a panel that is still growing makes Playwright auto-scroll
 * the page to reach the half-clipped target, so always settle first.
 */
export async function waitForAccordionSettled(page) {
  await page.waitForFunction(() => {
    const root = document.getElementById('projects-accordion');
    if (!root) return false;
    return !root
      .getAnimations({ subtree: true })
      .some((anim) => anim instanceof CSSTransition && anim.playState === 'running');
  });
  await page.waitForTimeout(60);
}

/** Expand a project's panel, then open its case study modal. */
export async function openCaseStudy(page, projectId) {
  const item = await expandProject(page, projectId);
  await item.locator('.project-action--primary').click();
}

/** Open the case study of whichever project is expanded by default. */
export async function openDefaultCaseStudy(page) {
  await waitForAccordionSettled(page);
  await page.locator('.project-item.is-open .project-action--primary').click();
}
