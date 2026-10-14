import gsap from 'gsap';
import { PROJECTS } from './projects-data.js';

/**
 * Projects Section & Cinematic Modal Controller
 * Structured Intensity Portfolio - Phase 6
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

/**
 * Render the uniform 2x3 projects showcase grid
 */
function renderProjectsGrid() {
  const gridContainer = document.getElementById('projects-grid');
  if (!gridContainer) return;

  gridContainer.innerHTML = PROJECTS.map((proj) => {
    const thumbSrc = proj.screenshots[0]?.src || '';
    const tagsHtml = proj.techStack
      .map(
        (t) => `<span class="project-tag">${escapeHtml(t.name)}</span>`
      )
      .join('');

    return `
      <article 
        class="project-card" 
        data-project-id="${escapeHtml(proj.id)}" 
        role="button" 
        tabindex="0" 
        aria-label="Open case study for ${escapeHtml(proj.title)}"
      >
        <div class="project-card__thumb-box">
          <span class="project-card__status-tag text-mono">${escapeHtml(proj.statusTag)}</span>
          <img 
            class="project-card__thumb" 
            src="${escapeHtml(thumbSrc)}" 
            alt="${escapeHtml(proj.title)} screenshot preview" 
            loading="lazy" 
          />
        </div>
        <div class="project-card__body">
          <span class="project-card__category">${escapeHtml(proj.category)}</span>
          <h3 class="project-card__title">${escapeHtml(proj.title)}</h3>
          <p class="project-card__desc">${escapeHtml(proj.oneLiner)}</p>
          <div class="project-card__tags">
            ${tagsHtml}
          </div>
          <div class="project-card__footer">
            <span class="project-card__trigger">
              Explore Case Study
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            ${
              proj.liveUrl
                ? `<a href="${escapeHtml(proj.liveUrl)}" class="project-card__ext-link" target="_blank" rel="noopener noreferrer" aria-label="Open live site for ${escapeHtml(proj.title)}" onclick="event.stopPropagation();">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>`
                : ''
            }
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach card event listeners
  const cards = gridContainer.querySelectorAll('.project-card');
  cards.forEach((card) => {
    const projectId = card.getAttribute('data-project-id');
    card.addEventListener('click', () => {
      openProjectModal(projectId, card);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(projectId, card);
      }
    });
  });
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
        <img src="${escapeHtml(s.src)}" alt="Thumbnail ${idx + 1}" />
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

        <div>
          <div class="modal-section-title">ENGINEERING INNOVATIONS &amp; PROOF</div>
          <div class="modal-innovations-grid">
            ${innovationsHtml}
          </div>
        </div>

        <div>
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

  if (captionEl) {
    captionEl.textContent = `[${activeSlideIndex + 1} / ${total}] - ${slide.caption}`;
  }

  // Update thumbnail states
  const thumbButtons = chassisEl.querySelectorAll('.modal-slideshow__thumb');
  thumbButtons.forEach((btn, idx) => {
    btn.classList.toggle('is-active', idx === activeSlideIndex);
  });

  // GSAP crossfade image
  if (mainImg) {
    gsap.to(mainImg, {
      opacity: 0.3,
      duration: 0.1,
      ease: 'power1.out',
      onComplete: () => {
        mainImg.src = slide.src;
        mainImg.alt = slide.alt || project.title;
        gsap.to(mainImg, { opacity: 1, duration: 0.18, ease: 'power2.out' });
      }
    });
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

  renderProjectsGrid();

  // Backdrop click listener closes modal
  if (backdropEl) {
    backdropEl.addEventListener('click', closeProjectModal);
  }

  // Keyboard navigation
  window.addEventListener('keydown', onGlobalKeydown);
}
