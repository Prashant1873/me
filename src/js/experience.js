/**
 * Experience Section Showcase & 3D Horizontal Spatial Timeline Controller (Refactored)
 *
 * Implements:
 * - Linear X-Axis reverse CV chronology (IQVIA -> Revolut -> Ketto -> Kalam Labs -> FAOUD)
 * - Prominent 3D glowing energy conduit track spanning left to right
 * - Upright, proportional 3D company logo medallions centered inside glowing orbs
 * - Minimal, non-redundant timeline navigation: single clean date rail + 3D orb click
 * - Minimalist, color-coded multi-year calendar modal (opened strictly via card period click)
 * - Synchronized detail card crossfade (200ms) with metric ticker animation
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES, TIMELINE_YEARS, CHRONOLOGICAL_ROLES, getExperienceLogo } from './experience-data.js';
import { initExperienceCanvas } from './experience-canvas.js';

gsap.registerPlugin(ScrollTrigger);

export function initExperience() {
  const container = document.getElementById('experience');
  if (!container) return;

  const detailContainer = document.getElementById('experience-detail');
  const canvasContainer = document.getElementById('experience-canvas');


  // Lightbox elements
  const lightbox = document.getElementById('experience-lightbox');
  const lightboxImg = document.getElementById('experience-lightbox-img');
  const lightboxClose = document.getElementById('experience-lightbox-close');
  const lightboxPrev = document.getElementById('experience-lightbox-prev');
  const lightboxNext = document.getElementById('experience-lightbox-next');
  const lightboxCounter = document.getElementById('experience-lightbox-counter');

  // Timeline calendar modal elements
  const timelineModal = document.getElementById('experience-timeline-modal');
  const timelineClose = document.getElementById('experience-timeline-close');
  const timelineGrid = document.getElementById('timeline-calendar-grid') || document.getElementById('experience-timeline-grid');
  const timelineTracks = document.getElementById('timeline-role-tracks') || document.getElementById('experience-timeline-tracks');

  if (!detailContainer) return;

  // State
  let activeIndex = 0; // 0 to 4: IQVIA -> Revolut -> Ketto -> Kalam Labs -> FAOUD
  let activePhotos = [];
  let currentPhotoIdx = 0;

  // ------------------------------------------------------------------------
  // 1. Initialize 3D Experience Canvas (Prominent Horizontal Conduit)
  // ------------------------------------------------------------------------
  let experienceCanvas = null;
  if (canvasContainer) {
    experienceCanvas = initExperienceCanvas(canvasContainer, {
      onNodeClick: (nodeIdx) => {
        navigateToIndex(nodeIdx);
      }
    });
    window.experienceCanvas = experienceCanvas;
  }



  // ------------------------------------------------------------------------
  // 4. Render Synchronized Detail Card (Attached Below Active 3D Orb)
  // ------------------------------------------------------------------------
  function renderDetail(exp, animate = false) {
    if (!detailContainer || !exp) return;

    detailContainer.setAttribute('data-badge', exp.badgeColor);

    const hasPhotos = exp.photos && exp.photos.length > 0;
    const photosHtml = hasPhotos
      ? `
        <div class="experience-detail__photos-group">
          <div class="experience-detail__photo-strip">
            ${exp.photos.map((photoUrl, i) => {
              const thumbUrl = photoUrl.replace(/([^/]+)$/, 'thumb_$1');
              return `
              <div class="experience-photo-thumb" data-photo-idx="${i}" title="View workplace snapshot" role="button" tabindex="0" aria-label="View photo ${i + 1}">
                <img src="${thumbUrl}" onerror="this.onerror=null;this.src='${photoUrl}'" alt="${exp.company} workplace photo" loading="lazy" decoding="async" width="80" height="80" />
                <div class="experience-photo-thumb__overlay">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
              </div>
            `;}).join('')}
          </div>
        </div>
      `
      : '<div></div>';

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const logoSrc = getExperienceLogo(exp, isLight);

    detailContainer.innerHTML = `
      <div class="experience-detail__header">
        <div class="experience-detail__brand-row">
          <div class="experience-detail__logo-box">
            <img id="experience-detail-company-logo" src="${logoSrc}" alt="${exp.company} logo" />
          </div>
          <div class="experience-detail__brand-text">
            <div class="experience-detail__top-row">
              <div class="experience-detail__company">${exp.company}</div>
              <button type="button" class="experience-detail__period" id="experience-detail-period-btn" aria-label="Open timeline calendar" title="Click to view timeline calendar">
                <svg class="experience-detail__period-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span class="experience-detail__period-text">${exp.period}</span>
                <svg class="experience-detail__period-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6.5M11.5 4.5V9.5"/>
                </svg>
              </button>
            </div>
            <div class="experience-detail__role">${exp.role}</div>
            <div class="experience-detail__tagline">${exp.tagline}</div>
          </div>
        </div>
      </div>

      <div class="experience-detail__metric" data-badge="${exp.badgeColor}">
        <svg class="experience-detail__metric-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
        <span class="experience-detail__metric-label">KEY IMPACT:</span>
        <span class="experience-detail__metric-val">${exp.metricHighlight}</span>
      </div>

      <ul class="experience-detail__bullets">
        ${exp.bullets.map(b => `<li class="experience-detail__bullet">${b}</li>`).join('')}
      </ul>

      <div class="experience-detail__photos">
        ${photosHtml}
        <a href="${exp.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="experience-detail__linkedin-btn" aria-label="${exp.company} on LinkedIn" title="${exp.company} on LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.3a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
          </svg>
        </a>
      </div>
    `;

    // Bind period button to open timeline calendar modal
    const periodBtn = document.getElementById('experience-detail-period-btn');
    if (periodBtn) {
      periodBtn.addEventListener('click', () => {
        openTimelineModal();
      });
    }

    // Bind photo click lightbox events
    if (hasPhotos) {
      activePhotos = exp.photos;
      detailContainer.querySelectorAll('.experience-photo-thumb').forEach((thumb) => {
        thumb.addEventListener('click', () => {
          const pIdx = parseInt(thumb.getAttribute('data-photo-idx'), 10);
          openLightbox(pIdx);
        });
      });
    }

    if (animate) {
      gsap.fromTo(detailContainer,
        { opacity: 0.8, y: 4 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
      );

      const metricVal = detailContainer.querySelector('.experience-detail__metric-val');
      if (metricVal) {
        gsap.fromTo(metricVal,
          { opacity: 0.6, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.22, ease: 'power2.out' }
        );
      }
    }
  }

  // ------------------------------------------------------------------------
  // 5. Navigation & Milestone Switching Helper
  // ------------------------------------------------------------------------
  function navigateToIndex(targetIdx) {
    if (targetIdx < 0 || targetIdx >= EXPERIENCES.length) return;
    if (targetIdx === activeIndex) return;

    activeIndex = targetIdx;
    renderDetail(EXPERIENCES[activeIndex], true);

    if (experienceCanvas) {
      experienceCanvas.focusNode(activeIndex);
    }
  }

  // ------------------------------------------------------------------------
  // 6. Lightbox Handlers
  // ------------------------------------------------------------------------
  function openLightbox(idx) {
    if (!lightbox || !lightboxImg || !activePhotos.length) return;
    currentPhotoIdx = idx;
    updateLightboxImage();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    if (!lightboxImg || !activePhotos.length) return;
    lightboxImg.src = activePhotos[currentPhotoIdx];
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentPhotoIdx + 1} / ${activePhotos.length}`;
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentPhotoIdx = (currentPhotoIdx - 1 + activePhotos.length) % activePhotos.length;
      updateLightboxImage();
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentPhotoIdx = (currentPhotoIdx + 1) % activePhotos.length;
      updateLightboxImage();
    });
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // ------------------------------------------------------------------------
  // 7. Minimalist Thematic Calendar Modal Handlers
  // ------------------------------------------------------------------------
  function openTimelineModal() {
    if (!timelineModal) return;
    renderCalendarGrid();
    renderRoleTracks();
    timelineModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeTimelineModal() {
    if (!timelineModal) return;
    timelineModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (timelineClose) timelineClose.addEventListener('click', closeTimelineModal);
  if (timelineModal) {
    timelineModal.addEventListener('click', (e) => {
      if (e.target === timelineModal) closeTimelineModal();
    });
  }

  // Minimal, color-coded calendar grid (clean company theme blocks)
  function renderCalendarGrid() {
    if (!timelineGrid) return;
    timelineGrid.innerHTML = '';

    TIMELINE_YEARS.forEach((yrData) => {
      const yearRow = document.createElement('div');
      yearRow.className = 'timeline-year-row';

      const label = document.createElement('div');
      label.className = 'timeline-year-badge';
      label.textContent = yrData.year;
      yearRow.appendChild(label);

      const monthsContainer = document.createElement('div');
      monthsContainer.className = 'timeline-months-grid';

      yrData.months.forEach((m) => {
        const cell = document.createElement('div');
        const isFuture = !!m.isFuture;
        const isActive = m.expId !== null;
        const expData = isActive ? EXPERIENCES.find(e => e.id === m.expId) : null;
        const categoryClass = expData ? (expData.category === 'strategy' ? 'is-strategy' : 'is-product') : '';
        const companyClass = expData ? `theme-${expData.id}` : '';

        const stateClass = isFuture ? 'is-future' : (isActive ? 'is-active ' + categoryClass + ' ' + companyClass : 'is-empty');
        cell.className = `timeline-month-cell ${stateClass}`;
        if (m.expId) cell.setAttribute('data-exp-id', m.expId);

        let logoHtml = '';
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isActive && expData) {
          const logoSrc = expData.logoDark || expData.logo;
          logoHtml = `<img src="${logoSrc}" alt="${expData.company} logo" class="timeline-month-logo" />`;
        } else if (!isFuture) {
          logoHtml = `<img src="./images/logos/Indian_Institute_of_Technology_Bombay_Logo.svg.webp" alt="IIT Bombay logo" class="timeline-month-logo timeline-month-logo--iitb" />`;
        }

        cell.innerHTML = `
          <span class="timeline-month-abbr">${m.name}</span>
          <div class="timeline-month-logo-box">${logoHtml}</div>
        `;

        if (isActive && expData) {
          cell.addEventListener('click', () => {
            const expIdx = EXPERIENCES.findIndex(e => e.id === m.expId);
            if (expIdx !== -1) {
              navigateToIndex(expIdx);
              closeTimelineModal();
            }
          });
        }

        monthsContainer.appendChild(cell);
      });

      yearRow.appendChild(monthsContainer);
      timelineGrid.appendChild(yearRow);
    });
  }

  function renderRoleTracks() {
    if (!timelineTracks) return;
    timelineTracks.innerHTML = '';
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    CHRONOLOGICAL_ROLES.forEach((r) => {
      const card = document.createElement('div');
      card.className = `timeline-track-card ${r.category === 'strategy' ? 'is-strategy' : 'is-product'}`;
      const logoSrc = getExperienceLogo(r, isLight);

      card.innerHTML = `
        <div class="timeline-track-card__logo-box">
          <img src="${logoSrc}" alt="${r.company} logo" class="timeline-track-card__logo" />
        </div>
        <div class="timeline-track-card__body">
          <div class="timeline-track-card__title-row">
            <span class="timeline-track-card__company">${r.company}</span>
            <span class="timeline-track-card__duration">${r.duration}</span>
          </div>
          <div class="timeline-track-card__role">${r.role}</div>
          <div class="timeline-track-card__period">${r.period}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        const expIdx = EXPERIENCES.findIndex(e => e.id === r.id);
        if (expIdx !== -1) {
          navigateToIndex(expIdx);
          closeTimelineModal();
        }
      });

      timelineTracks.appendChild(card);
    });
  }

  // ------------------------------------------------------------------------
  // 8. Coordinate with Global Section Scroll Controller
  // ------------------------------------------------------------------------
  window.experienceController = {
    next: () => {
      if (activeIndex < EXPERIENCES.length - 1) {
        navigateToIndex(activeIndex + 1);
        return true;
      }
      return false;
    },
    prev: () => {
      if (activeIndex > 0) {
        navigateToIndex(activeIndex - 1);
        return true;
      }
      return false;
    },
    setMilestone: (idx) => navigateToIndex(idx),
    getIndex: () => activeIndex,
    getCount: () => EXPERIENCES.length
  };

  // Keyboard navigation on container (Left / Right keys cycle milestones)
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      if (window.experienceController.next()) e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      if (window.experienceController.prev()) e.preventDefault();
    }
  });

  // ------------------------------------------------------------------------
  // 9. Initial Boot & Theme Reactivity
  // ------------------------------------------------------------------------
  renderDetail(EXPERIENCES[activeIndex]);

  if (experienceCanvas) {
    experienceCanvas.focusNode(0, 0.1);
  }

  // Theme observer to re-sync logo images on theme switch
  const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.attributeName === 'data-theme') {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const logoEl = document.getElementById('experience-detail-company-logo');
        if (logoEl && EXPERIENCES[activeIndex]) {
          logoEl.src = getExperienceLogo(EXPERIENCES[activeIndex], isLight);
        }
        if (timelineModal && timelineModal.classList.contains('is-open')) {
          renderCalendarGrid();
          renderRoleTracks();
        }
      }
    });
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}
