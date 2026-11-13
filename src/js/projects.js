import gsap from 'gsap';
import { PROJECTS } from './projects-data.js';

/**
 * Projects Section: Accordion & Cinematic Case Study Modal Controller
 * Structured Intensity Portfolio
 */

let activeProjectIndex = 0;
let activeSlideIndex = 0;
let currentTriggerCard = null;
let isAnimating = false;
let isClosing = false;

// DOM Elements
let modalEl = null;
let backdropEl = null;
let chassisEl = null;
let siteNav = null;
let mainEl = null;
let slideRequestId = 0;

/**
 * Preload an image asset in memory for instant subsequent display
 */
function preloadImage(url) {
  if (!url) return;
  const img = new Image();
  img.src = url;
}

/**
 * Helper to escape HTML characters preventing DOM XSS (T-06-02)
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* --------------------------------------------------------------------------
   Projects Accordion
   Three levels of disclosure:
   1. Row      - index, title, category, one-liner, status (always visible)
   2. Panel    - preview, narrative, proof metrics, stack, actions (one open)
   3. Modal    - full case study with slideshow and innovation detail
   -------------------------------------------------------------------------- */

const ICON_ARROW = `<svg class="project-action__icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
const ICON_EXTERNAL = `<svg class="project-action__icon project-action__icon--external" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="8 7 17 7 17 16"></polyline></svg>`;

// Layouts where the section grows with its content instead of filling one viewport
const AUTO_HEIGHT_QUERY = '(max-width: 1023px), (max-height: 600px)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

let accordionEl = null;
let openProjectId = null;
let peekEl = null;
let peekImg = null;
let peekToX = null;
let peekToY = null;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function statusLabel(statusTag) {
  return String(statusTag || '').replace(/^●\s*/, '');
}

function renderProjectItem(proj, index, isOpen) {
  const id = escapeHtml(proj.id);
  const title = escapeHtml(proj.title);
  const cover = proj.screenshots[0] || {};
  const slideCount = proj.screenshots.length;

  const proofHtml = proj.innovations
    .map(
      (inv) => `
        <li class="project-proof__item">
          <span class="project-proof__metric">${escapeHtml(inv.metric)}</span>
          <span class="project-proof__label">${escapeHtml(inv.title)}</span>
        </li>`
    )
    .join('');

  const stackHtml = proj.techStack
    .map(
      (t) =>
        `<li class="project-tag${t.primary ? ' project-tag--primary' : ''}">${escapeHtml(t.name)}</li>`
    )
    .join('');

  const liveHtml = proj.liveUrl
    ? `<a href="${escapeHtml(proj.liveUrl)}" class="project-action project-action--ghost project-action--live" target="_blank" rel="noopener noreferrer" aria-label="Open live app for ${title}">
        <span>Live app</span>${ICON_EXTERNAL}
      </a>`
    : '';

  return `
    <article class="project-item${isOpen ? ' is-open' : ''}" data-project-id="${id}" style="--i: ${index}">
      <h3 class="project-item__heading">
        <button
          type="button"
          class="project-item__header"
          id="project-header-${id}"
          aria-expanded="${isOpen ? 'true' : 'false'}"
          aria-controls="project-panel-${id}"
        >
          <span class="project-item__index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
          <span class="project-item__title">${title}</span>
          <span class="project-item__category">${escapeHtml(proj.category)}</span>
          <span class="project-item__summary">${escapeHtml(proj.oneLiner)}</span>
          <span class="project-item__status"><span class="project-item__status-dot" aria-hidden="true"></span>${escapeHtml(statusLabel(proj.statusTag))}</span>
          <span class="project-item__toggle" aria-hidden="true"></span>
        </button>
      </h3>

      <div
        class="project-item__panel"
        id="project-panel-${id}"
        role="region"
        aria-labelledby="project-header-${id}"
        ${isOpen ? '' : 'inert'}
      >
        <div class="project-item__clip">
          <div class="project-item__body">
            <button
              type="button"
              class="project-preview project-item__reveal"
              style="--r: 0"
              data-open-case
              aria-label="Open case study for ${title}, ${slideCount} screenshots"
            >
              <span class="project-preview__chrome" aria-hidden="true">
                <i></i><i></i><i></i>
                <span class="project-preview__count">${slideCount} screens</span>
              </span>
              <span class="project-preview__frame">
                <img
                  class="project-preview__img"
                  ${isOpen ? `src="${escapeHtml(cover.src || '')}"` : `data-src="${escapeHtml(cover.src || '')}"`}
                  alt="${escapeHtml(cover.alt || proj.title)}"
                  decoding="async"
                />
                <span class="project-preview__glare" aria-hidden="true"></span>
                <span class="project-preview__hint" aria-hidden="true">Open case study ${ICON_ARROW}</span>
              </span>
            </button>

            <div class="project-item__content">
              <p class="project-item__narrative project-item__reveal" style="--r: 1">${escapeHtml(proj.narrative)}</p>

              <ul class="project-proof project-item__reveal" style="--r: 2" aria-label="Proof points">
                ${proofHtml}
              </ul>

              <div class="project-item__footer project-item__reveal" style="--r: 3">
                <ul class="project-stack" aria-label="Tech stack">
                  ${stackHtml}
                </ul>
                <div class="project-actions">
                  <button type="button" class="project-action project-action--primary" data-open-case aria-label="View case study for ${title}">
                    <span>Case study</span>${ICON_ARROW}
                  </button>
                  ${liveHtml}
                  <a href="${escapeHtml(proj.githubUrl)}" class="project-action project-action--ghost project-action--code" target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub for ${title}">
                    <span>Code</span>${ICON_EXTERNAL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Load the large preview image only once a panel is about to be seen
 */
function hydratePreview(item) {
  const img = item.querySelector('.project-preview__img[data-src]');
  if (!img) return;
  img.src = img.getAttribute('data-src');
  img.removeAttribute('data-src');
}

/**
 * On stacked layouts, closing a tall panel above can push the opened row
 * under the fixed nav. Bring it back once the height transition settles.
 */
function keepHeaderInView(item) {
  if (!window.matchMedia(AUTO_HEIGHT_QUERY).matches) return;
  const reduced = prefersReducedMotion();
  window.setTimeout(
    () => {
      const navHeight = window.innerWidth <= 768 ? 56 : 64;
      const top = item.getBoundingClientRect().top;
      if (top < navHeight + 8) {
        window.scrollBy({ top: top - navHeight - 12, behavior: reduced ? 'auto' : 'smooth' });
      }
    },
    reduced ? 0 : 480
  );
}

/**
 * Open one project panel (or pass null to collapse everything)
 */
export function setOpenProject(projectId) {
  if (!accordionEl) return;
  accordionEl.querySelectorAll('.project-item').forEach((item) => {
    const isOpen = projectId !== null && item.getAttribute('data-project-id') === projectId;
    item.classList.toggle('is-open', isOpen);
    item.querySelector('.project-item__header')?.setAttribute('aria-expanded', String(isOpen));
    item.querySelector('.project-item__panel')?.toggleAttribute('inert', !isOpen);
    if (isOpen) {
      hydratePreview(item);
      keepHeaderInView(item);
    }
  });
  openProjectId = projectId;
  hidePeek();
}

/**
 * Ink ripple from the click point on a row header
 */
function spawnRipple(header, e) {
  if (prefersReducedMotion() || e.detail === 0) return;
  const rect = header.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'project-item__ripple';
  ripple.style.left = `${e.clientX - rect.left}px`;
  ripple.style.top = `${e.clientY - rect.top}px`;
  header.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}

/**
 * Floating thumbnail that trails the cursor over collapsed rows
 */
function ensurePeek() {
  if (peekEl) return;
  peekEl = document.createElement('div');
  peekEl.className = 'project-peek';
  peekEl.setAttribute('aria-hidden', 'true');
  peekEl.innerHTML = '<img class="project-peek__img" alt="" />';
  document.body.appendChild(peekEl);
  peekImg = peekEl.querySelector('img');
  peekToX = gsap.quickTo(peekEl, 'x', { duration: 0.35, ease: 'power3.out' });
  peekToY = gsap.quickTo(peekEl, 'y', { duration: 0.35, ease: 'power3.out' });
}

function canPeek() {
  return (
    window.matchMedia(FINE_POINTER_QUERY).matches &&
    !window.matchMedia(AUTO_HEIGHT_QUERY).matches &&
    !prefersReducedMotion()
  );
}

function movePeek(e, snap) {
  if (!peekEl) return;
  const w = peekEl.offsetWidth;
  const h = peekEl.offsetHeight;
  let x = e.clientX + 28;
  if (x + w > window.innerWidth - 12) x = e.clientX - w - 28;
  const y = Math.min(Math.max(e.clientY - h / 2, 76), window.innerHeight - h - 12);
  if (snap) {
    peekToX(x, x);
    peekToY(y, y);
  } else {
    peekToX(x);
    peekToY(y);
  }
}

function showPeek(proj, e) {
  if (!canPeek()) return;
  const thumb = proj.screenshots[0]?.thumb || proj.screenshots[0]?.src;
  if (!thumb) return;
  ensurePeek();
  if (peekImg.getAttribute('src') !== thumb) peekImg.src = thumb;
  movePeek(e, !peekEl.classList.contains('is-visible'));
  peekEl.classList.add('is-visible');
}

function hidePeek() {
  if (peekEl) peekEl.classList.remove('is-visible');
}

/**
 * Render the accordion and wire its interactions
 */
function renderProjectsAccordion() {
  accordionEl = document.getElementById('projects-accordion');
  if (!accordionEl) return;

  openProjectId = PROJECTS[0]?.id ?? null;
  accordionEl.innerHTML = PROJECTS.map((proj, i) =>
    renderProjectItem(proj, i, proj.id === openProjectId)
  ).join('');

  accordionEl.querySelectorAll('.project-item').forEach((item) => {
    const projectId = item.getAttribute('data-project-id');
    const proj = PROJECTS.find((p) => p.id === projectId);
    const header = item.querySelector('.project-item__header');
    const preview = item.querySelector('.project-preview');
    const previewImg = item.querySelector('.project-preview__img');

    // Level 1 -> 2: toggle the panel
    header.addEventListener('click', (e) => {
      spawnRipple(header, e);
      setOpenProject(openProjectId === projectId ? null : projectId);
    });

    // Cursor spotlight + trailing thumbnail on collapsed rows
    header.addEventListener('pointerenter', (e) => {
      hydratePreview(item);
      if (!item.classList.contains('is-open')) showPeek(proj, e);
    });
    header.addEventListener('pointermove', (e) => {
      const rect = header.getBoundingClientRect();
      header.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      header.style.setProperty('--my', `${e.clientY - rect.top}px`);
      if (peekEl?.classList.contains('is-visible')) movePeek(e, false);
    });
    header.addEventListener('pointerleave', hidePeek);
    header.addEventListener('focus', () => hydratePreview(item));

    // Level 2 -> 3: open the full case study
    item.querySelectorAll('[data-open-case]').forEach((trigger) => {
      trigger.addEventListener('click', () => openProjectModal(projectId, trigger));
    });

    // Pointer-driven tilt and glare on the preview
    if (preview) {
      preview.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || prefersReducedMotion()) return;
        const rect = preview.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        preview.style.setProperty('--tilt-x', `${(-py * 5).toFixed(2)}deg`);
        preview.style.setProperty('--tilt-y', `${(px * 7).toFixed(2)}deg`);
        preview.style.setProperty('--glare-x', `${((px + 0.5) * 100).toFixed(1)}%`);
        preview.style.setProperty('--glare-y', `${((py + 0.5) * 100).toFixed(1)}%`);
      });
      preview.addEventListener('pointerleave', () => {
        preview.style.setProperty('--tilt-x', '0deg');
        preview.style.setProperty('--tilt-y', '0deg');
      });
    }

    if (previewImg) {
      previewImg.onerror = () => {
        previewImg.onerror = null;
        previewImg.src = createSvgFallback(proj.title, 0);
      };
    }
  });

  // Space activates buttons here; keep it from also paging to the next section
  accordionEl.addEventListener('keydown', (e) => {
    if (e.key === ' ' && e.target.closest('button, a')) e.stopPropagation();
  });

  // Staggered row entrance the first time the section scrolls into view
  if ('IntersectionObserver' in window && !prefersReducedMotion()) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          accordionEl.classList.add('is-revealed');
          revealObserver.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    revealObserver.observe(accordionEl);
  } else {
    accordionEl.classList.add('is-revealed');
  }
}

/**
 * Generate high-fidelity SVG wireframe fallback when a screenshot fails to load
 */
function createSvgFallback(title, index) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    <rect width="1280" height="720" fill="%230a0a0a"/>
    <rect x="2" y="2" width="1276" height="716" fill="none" stroke="%23222222" stroke-width="2"/>
    <line x1="0" y1="40" x2="1280" y2="40" stroke="%23222222" stroke-width="2"/>
    <circle cx="24" cy="20" r="6" fill="%23333333"/>
    <circle cx="44" cy="20" r="6" fill="%23333333"/>
    <circle cx="64" cy="20" r="6" fill="%23333333"/>
    <text x="640" y="340" fill="%232962FF" font-family="monospace" font-size="28" font-weight="bold" text-anchor="middle">${encodeURIComponent(title)}</text>
    <text x="640" y="385" fill="%23888888" font-family="monospace" font-size="16" text-anchor="middle">SCREENSHOT [${index + 1}] ARCHITECTURE WIREFRAME</text>
    <rect x="340" y="440" width="600" height="120" rx="6" fill="%23141414" stroke="%23333333" stroke-dasharray="6 6"/>
    <text x="640" y="505" fill="%23666666" font-family="sans-serif" font-size="14" text-anchor="middle">Interactive System Viewport</text>
  </svg>`;
}

/**
 * Render modal chassis content for a given project
 */
function renderModalContent(project) {
  if (!chassisEl) return;

  const totalSlides = project.screenshots.length;
  const currentSlide = project.screenshots[activeSlideIndex] || {
    src: '',
    caption: '',
    alt: ''
  };

  const thumbsHtml = project.screenshots
    .map(
      (s, idx) => `
      <button 
        class="modal-slideshow__thumb ${idx === activeSlideIndex ? 'is-active' : ''}" 
        data-slide-index="${idx}"
        aria-label="View screenshot ${idx + 1}: ${escapeHtml(s.caption)}"
      >
        <img src="${escapeHtml(s.thumb || s.src)}" alt="Thumbnail ${idx + 1}" loading="lazy" />
      </button>
    `
    )
    .join('');

  const innovationsHtml = project.innovations
    .map(
      (inv) => `
      <div class="modal-innovation-item">
        <div class="modal-innovation-header">
          <span class="modal-innovation-title">${escapeHtml(inv.title)}</span>
          <span class="modal-innovation-metric">${escapeHtml(inv.metric)}</span>
        </div>
        <p class="modal-innovation-desc">${escapeHtml(inv.desc)}</p>
      </div>
    `
    )
    .join('');

  const techPillsHtml = project.techStack
    .map(
      (tech) => `
      <span class="modal-tech-pill ${tech.primary ? 'modal-tech-pill--primary' : ''}">
        ${tech.primary ? '<span class="modal-tech-pill__dot"></span>' : ''}
        ${escapeHtml(tech.name)}
      </span>
    `
    )
    .join('');

  const ctasHtml = `
    ${
      project.liveUrl
        ? `<a href="${escapeHtml(project.liveUrl)}" class="modal-cta modal-cta--primary" target="_blank" rel="noopener noreferrer">
            Launch Live App
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>`
        : ''
    }
    <a href="${escapeHtml(project.githubUrl)}" class="modal-cta modal-cta--secondary" target="_blank" rel="noopener noreferrer">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
      View on GitHub ↗
    </a>
  `;

  chassisEl.innerHTML = `
    <header class="modal-header">
      <div class="modal-header__info">
        <h2 id="modal-project-title" class="modal-header__title">${escapeHtml(project.title)}</h2>
        <span class="modal-header__category">${escapeHtml(project.category)}</span>
      </div>
      <div class="modal-header__actions">
        <button id="modal-prev-project-btn" class="modal-traversal-btn" aria-label="Previous project case study">
          ← Prev
        </button>
        <button id="modal-next-project-btn" class="modal-traversal-btn" aria-label="Next project case study">
          Next →
        </button>
        <button id="modal-close-btn" class="modal-close-btn" aria-label="Close Case Study [ESC]">
          ✕
        </button>
      </div>
    </header>

    <div class="modal-body">
      <!-- Left Column: Interactive Screenshot Slideshow (7 Cols) -->
      <div class="modal-slideshow" role="region" aria-label="Screenshot Slideshow">
        <div class="modal-slideshow__viewport">
          <div id="slideshow-spinner" class="modal-slideshow__spinner" aria-hidden="true"></div>
          <button id="slideshow-prev-btn" class="modal-slideshow__nav modal-slideshow__nav--prev" aria-label="View Previous Screenshot ←">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <img 
            id="slideshow-main-img" 
            class="modal-slideshow__img" 
            src="${escapeHtml(currentSlide.src)}" 
            alt="${escapeHtml(currentSlide.alt || project.title)}" 
          />
          <button id="slideshow-next-btn" class="modal-slideshow__nav modal-slideshow__nav--next" aria-label="View Next Screenshot →">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
        <div id="slideshow-caption" class="modal-slideshow__caption">
          [1 / ${totalSlides}] - ${escapeHtml(currentSlide.caption)}
        </div>
        <div class="modal-slideshow__thumbs" role="tablist" aria-label="Screenshot thumbnails">
          ${thumbsHtml}
        </div>
      </div>

      <!-- Right Column: Narrative, Innovations, Tech Stack & CTAs (5 Cols) -->
      <div class="modal-right-pane">
        <blockquote class="modal-narrative">
          "${escapeHtml(project.narrative)}"
        </blockquote>

        <div class="modal-innovations-section">
          <div class="modal-section-title">ENGINEERING INNOVATIONS &amp; PROOF</div>
          <div class="modal-innovations-grid">
            ${innovationsHtml}
          </div>
        </div>

        <div class="modal-tech-section">
          <div class="modal-section-title">TECHNICAL ARCHITECTURE</div>
          <div class="modal-tech-pills">
            ${techPillsHtml}
          </div>
        </div>

        <div class="modal-ctas">
          ${ctasHtml}
        </div>
      </div>
    </div>
  `;

  // Wire fallback on broken main image
  const mainImg = chassisEl.querySelector('#slideshow-main-img');
  if (mainImg) {
    mainImg.onerror = () => {
      mainImg.src = createSvgFallback(project.title, activeSlideIndex);
    };
  }

  // Wire fallback on thumbnail images
  const thumbImgs = chassisEl.querySelectorAll('.modal-slideshow__thumb img');
  thumbImgs.forEach((img, idx) => {
    img.onerror = () => {
      img.src = createSvgFallback(project.title, idx);
    };
  });

  // Wire slideshow buttons
  const prevSlideBtn = chassisEl.querySelector('#slideshow-prev-btn');
  const nextSlideBtn = chassisEl.querySelector('#slideshow-next-btn');

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      stepSlide(-1);
    });
  }
  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      stepSlide(1);
    });
  }

  // Wire touch swipe on mobile slideshow viewport
  const viewportEl = chassisEl.querySelector('.modal-slideshow__viewport');
  if (viewportEl) {
    let touchStartX = 0;
    let touchStartY = 0;
    viewportEl.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    viewportEl.addEventListener('touchend', (e) => {
      const deltaX = touchStartX - e.changedTouches[0].clientX;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX > 0) {
          stepSlide(1);
        } else {
          stepSlide(-1);
        }
      }
    }, { passive: true });
  }

  // Wire filmstrip thumbnails
  const thumbButtons = chassisEl.querySelectorAll('.modal-slideshow__thumb');
  thumbButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-slide-index'), 10);
      setSlide(idx);
    });
  });

  // Wire modal header buttons
  const closeBtn = chassisEl.querySelector('#modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  const prevProjBtn = chassisEl.querySelector('#modal-prev-project-btn');
  const nextProjBtn = chassisEl.querySelector('#modal-next-project-btn');

  if (prevProjBtn) {
    prevProjBtn.addEventListener('click', () => {
      const prevIdx = (activeProjectIndex - 1 + PROJECTS.length) % PROJECTS.length;
      switchProject(prevIdx);
    });
  }
  if (nextProjBtn) {
    nextProjBtn.addEventListener('click', () => {
      const nextIdx = (activeProjectIndex + 1) % PROJECTS.length;
      switchProject(nextIdx);
    });
  }
}

/**
 * Transition the slideshow to a specific slide index
 */
function setSlide(index) {
  const project = PROJECTS[activeProjectIndex];
  if (!project || !project.screenshots.length) return;

  const total = project.screenshots.length;
  activeSlideIndex = (index + total) % total;
  const slide = project.screenshots[activeSlideIndex];

  const mainImg = chassisEl.querySelector('#slideshow-main-img');
  const captionEl = chassisEl.querySelector('#slideshow-caption');
  const spinner = chassisEl.querySelector('#slideshow-spinner');

  if (captionEl) {
    captionEl.textContent = `[${activeSlideIndex + 1} / ${total}] - ${slide.caption}`;
  }

  // Update thumbnail states
  const thumbButtons = chassisEl.querySelectorAll('.modal-slideshow__thumb');
  thumbButtons.forEach((btn, idx) => {
    btn.classList.toggle('is-active', idx === activeSlideIndex);
  });

  if (mainImg) {
    const reqId = ++slideRequestId;
    if (spinner) spinner.classList.add('is-active');
    mainImg.classList.add('is-loading');

    const loader = new Image();
    loader.onload = () => {
      if (reqId === slideRequestId) {
        mainImg.src = slide.src;
        mainImg.alt = slide.alt || project.title;
        mainImg.classList.remove('is-loading');
        if (spinner) spinner.classList.remove('is-active');
      }
    };
    loader.onerror = () => {
      if (reqId === slideRequestId) {
        mainImg.src = createSvgFallback(project.title, activeSlideIndex);
        mainImg.classList.remove('is-loading');
        if (spinner) spinner.classList.remove('is-active');
      }
    };
    loader.src = slide.src;

    // Proactively preload adjacent full-size slides
    const nextSlide = project.screenshots[(activeSlideIndex + 1) % total];
    const prevSlide = project.screenshots[(activeSlideIndex - 1 + total) % total];
    if (nextSlide?.src) preloadImage(nextSlide.src);
    if (prevSlide?.src) preloadImage(prevSlide.src);
  }
}

/**
 * Step slideshow slide forward or backward
 */
function stepSlide(step) {
  setSlide(activeSlideIndex + step);
}

/**
 * Switch the active project inside an open modal
 */
function switchProject(nextProjectIndex) {
  if (isAnimating) return;
  activeProjectIndex = nextProjectIndex;
  activeSlideIndex = 0;

  // Crossfade transition chassis body
  const modalBody = chassisEl.querySelector('.modal-body');
  if (modalBody) {
    gsap.to(modalBody, {
      opacity: 0,
      y: 6,
      duration: 0.14,
      ease: 'power2.in',
      onComplete: () => {
        renderModalContent(PROJECTS[activeProjectIndex]);
        const updatedBody = chassisEl.querySelector('.modal-body');
        if (updatedBody) {
          gsap.fromTo(
            updatedBody,
            { opacity: 0, y: -6 },
            { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
          );
        }
      }
    });
  } else {
    renderModalContent(PROJECTS[activeProjectIndex]);
  }
}

/**
 * Lock scroll with scrollbar padding compensation to avoid layout shifts
 */
function lockBodyScroll() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

/**
 * Unlock scroll and restore body padding
 */
function unlockBodyScroll() {
  document.body.style.paddingRight = '';
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

/**
 * Trap focus by setting inert on sibling trees
 */
function trapFocus() {
  if (siteNav) siteNav.setAttribute('inert', '');
  if (mainEl) mainEl.setAttribute('inert', '');
}

/**
 * Restore focus by removing inert
 */
function releaseFocus() {
  if (siteNav) siteNav.removeAttribute('inert');
  if (mainEl) mainEl.removeAttribute('inert');
}

/**
 * Open the case study modal with GSAP origin-aware bounding box expand
 */
export function openProjectModal(projectId, triggerCardEl) {
  if (!modalEl || isClosing) return;

  const projectIdx = PROJECTS.findIndex((p) => p.id === projectId);
  if (projectIdx === -1) return;

  activeProjectIndex = projectIdx;
  activeSlideIndex = 0;
  currentTriggerCard = triggerCardEl;

  // Initialize modal chassis content
  renderModalContent(PROJECTS[activeProjectIndex]);

  // Preload all full-size slides for the opened project
  const openedProj = PROJECTS[activeProjectIndex];
  if (openedProj && openedProj.screenshots) {
    openedProj.screenshots.forEach((s) => preloadImage(s.src));
  }

  // Lock scroll & trap focus
  lockBodyScroll();
  trapFocus();

  modalEl.classList.add('is-open');
  modalEl.setAttribute('aria-hidden', 'false');

  gsap.killTweensOf([chassisEl, backdropEl]);

  // Compute card origin rect for smooth origin-aware GSAP expansion
  const cardRect = triggerCardEl
    ? triggerCardEl.getBoundingClientRect()
    : {
        top: window.innerHeight / 2 - 100,
        left: window.innerWidth / 2 - 150,
        width: 300,
        height: 200
      };

  isAnimating = true;

  // Animate backdrop blur
  gsap.fromTo(
    backdropEl,
    { opacity: 0 },
    { opacity: 1, duration: 0.24, ease: 'power2.out' }
  );

  // Animate chassis bounding box from card origin to modal bounds
  gsap.fromTo(
    chassisEl,
    {
      scale: 0.88,
      y: cardRect.top - window.innerHeight / 2 + cardRect.height / 2,
      opacity: 0.4,
      borderRadius: '8px'
    },
    {
      scale: 1,
      y: 0,
      opacity: 1,
      borderRadius: '12px',
      duration: 0.24,
      ease: 'power3.out',
      onComplete: () => {
        isAnimating = false;
        // Move focus to close button
        const closeBtn = chassisEl.querySelector('#modal-close-btn');
        if (closeBtn) closeBtn.focus();
      }
    }
  );
}

/**
 * Close the case study modal and restore scroll
 */
export function closeProjectModal() {
  if (!modalEl || !modalEl.classList.contains('is-open') || isClosing) return;
  isClosing = true;
  isAnimating = false;

  gsap.killTweensOf([chassisEl, backdropEl]);

  // Animate backdrop
  gsap.to(backdropEl, {
    opacity: 0,
    duration: 0.18,
    ease: 'power2.in'
  });

  // Animate chassis collapse
  gsap.to(chassisEl, {
    scale: 0.94,
    opacity: 0,
    duration: 0.18,
    ease: 'power2.in',
    onComplete: () => {
      modalEl.classList.remove('is-open');
      modalEl.setAttribute('aria-hidden', 'true');
      unlockBodyScroll();
      releaseFocus();
      isClosing = false;

      // Restore focus to original card
      if (currentTriggerCard) {
        currentTriggerCard.focus();
        currentTriggerCard = null;
      }
    }
  });
}

/**
 * Keyboard handler for ESC and Arrow navigation
 */
function onGlobalKeydown(e) {
  if (!modalEl || !modalEl.classList.contains('is-open')) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    closeProjectModal();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    stepSlide(-1);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    stepSlide(1);
  }
}

/**
 * Initialize the Projects Section
 */
export function initProjects() {
  modalEl = document.getElementById('project-modal');
  backdropEl = document.getElementById('modal-backdrop');
  chassisEl = document.getElementById('modal-chassis');
  siteNav = document.getElementById('site-nav');
  mainEl = document.querySelector('main');

  renderProjectsAccordion();

  // Backdrop click listener closes modal
  if (backdropEl) {
    backdropEl.addEventListener('click', closeProjectModal);
  }

  // Keyboard navigation
  window.addEventListener('keydown', onGlobalKeydown);

  // Background idle preloading of all project card preview thumbnails
  if (typeof window !== 'undefined') {
    const idlePreload = () => {
      PROJECTS.forEach((p) => {
        if (p.screenshots?.[0]) {
          preloadImage(p.screenshots[0].thumb || p.screenshots[0].src);
        }
      });
    };
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(idlePreload, { timeout: 2000 });
    } else {
      setTimeout(idlePreload, 1200);
    }
  }
}
