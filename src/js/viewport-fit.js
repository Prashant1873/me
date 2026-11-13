/**
 * Viewport Fit Guard
 *
 * Desktop sections are locked to exactly one viewport and clip their overflow.
 * That holds at common sizes, but a short window (a 768p laptop with browser
 * toolbars, a zoomed page, a large default font) can leave content cut off
 * with no way to reach it.
 *
 * This measures every section in its locked state and, where content does not
 * fit, switches just that section to "flow" mode (`.is-flow`): it grows to its
 * content and the scroll controller lets the wheel travel inside it before
 * snapping onward. Touch and narrow layouts already flow via CSS and are left
 * alone.
 */

const TOUCH_LAYOUT_QUERY = '(max-width: 1024px), (pointer: coarse)';
const CONTENT_SELECTOR = 'h1,h2,h3,h4,p,a,button,li,img,input,textarea,label,span,blockquote,footer';
const TOLERANCE_PX = 4;

function isRendered(el) {
  if (el.closest('[inert],[aria-hidden="true"]')) return false;
  if (typeof el.checkVisibility === 'function') {
    return el.checkVisibility({ visibilityProperty: true, checkVisibilityCSS: true });
  }
  return el.offsetParent !== null;
}

/** Content inside its own scroll container is reachable and never counts as cut off. */
function isInsideScroller(el, section) {
  for (let node = el.parentElement; node && node !== section; node = node.parentElement) {
    const overflowY = getComputedStyle(node).overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') return true;
  }
  return false;
}

function contentOverflows(section) {
  const limit = section.getBoundingClientRect().bottom + TOLERANCE_PX;
  const nodes = section.querySelectorAll(CONTENT_SELECTOR);
  for (const el of nodes) {
    const rect = el.getBoundingClientRect();
    if (rect.bottom <= limit || rect.height < 2 || rect.width < 2) continue;
    if (!isRendered(el) || isInsideScroller(el, section)) continue;
    return true;
  }
  return false;
}

/**
 * The projects accordion clips its open panel itself, so the generic check
 * cannot see a cut-off there. Compare what the open panel's content needs
 * against the room it was given.
 */
function projectsOverflow(section) {
  const openItem = section.querySelector('.project-item.is-open');
  if (!openItem) return false;

  const body = openItem.querySelector('.project-item__body');
  const content = openItem.querySelector('.project-item__content');
  if (!body || !content) return false;

  return (
    content.scrollHeight > content.clientHeight + TOLERANCE_PX ||
    body.scrollHeight > body.clientHeight + TOLERANCE_PX
  );
}

export function initViewportFit() {
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  if (!sections.length) return null;

  const touchLayout = window.matchMedia(TOUCH_LAYOUT_QUERY);

  function evaluate() {
    let changed = false;

    sections.forEach((section) => {
      const wasFlow = section.classList.contains('is-flow');
      // Always measure against the locked one-viewport layout
      section.classList.remove('is-flow');

      let needsFlow = false;
      if (!touchLayout.matches) {
        needsFlow = section.id === 'projects' ? projectsOverflow(section) : contentOverflows(section);
      }

      section.classList.toggle('is-flow', needsFlow);
      if (needsFlow !== wasFlow) changed = true;
    });

    if (changed) {
      window.dispatchEvent(new CustomEvent('viewportfit:change'));
    }
  }

  /**
   * A different project was expanded: its content may need more room than the
   * previous one. Only ever switch towards flow here so the layout cannot
   * flip back and forth while someone is browsing rows.
   */
  function growProjectsIfNeeded() {
    if (touchLayout.matches) return;
    const projects = sections.find((section) => section.id === 'projects');
    if (!projects || projects.classList.contains('is-flow')) return;
    if (projectsOverflow(projects)) {
      projects.classList.add('is-flow');
      window.dispatchEvent(new CustomEvent('viewportfit:change'));
    }
  }

  let resizeTimer = null;
  function scheduleEvaluate() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(evaluate, 140);
  }

  evaluate();
  window.addEventListener('resize', scheduleEvaluate);
  window.addEventListener('viewportfit:request', growProjectsIfNeeded);
  window.addEventListener('load', () => {
    evaluate();
    // Entrance animations and late images can still shift layout after load
    setTimeout(evaluate, 1200);
  });
  if (document.fonts?.ready) {
    document.fonts.ready.then(evaluate).catch(() => {});
  }
  if (typeof touchLayout.addEventListener === 'function') {
    touchLayout.addEventListener('change', evaluate);
  }

  return { evaluate };
}
