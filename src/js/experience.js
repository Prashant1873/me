import gsap from 'gsap';
import { EXPERIENCES, CATEGORIES } from './experience-data.js';

/**
 * Initialize Experience Section Showcase
 */
export function initExperience() {
  const container = document.getElementById('experience');
  if (!container) return;

  const filtersContainer = document.getElementById('experience-filters');
  const listContainer = document.getElementById('experience-list');
  const detailContainer = document.getElementById('experience-detail');
  const lightbox = document.getElementById('experience-lightbox');
  const lightboxImg = document.getElementById('experience-lightbox-img');
  const lightboxClose = document.getElementById('experience-lightbox-close');

  if (!filtersContainer || !listContainer || !detailContainer) return;

  let currentCategory = 'all';
  let activeIndex = 0;
  let filteredExperiences = [...EXPERIENCES];

  // ------------------------------------------------------------------------
  // 1. Render Filter Buttons
  // ------------------------------------------------------------------------
  function renderFilters() {
    filtersContainer.innerHTML = '';
    CATEGORIES.forEach((cat) => {
      const btn = document.createElement('button');
      btn.className = `experience-filter-btn ${cat.id === currentCategory ? 'is-active' : ''}`;
      btn.setAttribute('type', 'button');
      btn.setAttribute('data-category', cat.id);
      btn.innerHTML = `
        <span>${cat.label}</span>
        <span class="experience-filter-btn__count">${cat.count}</span>
      `;
      btn.addEventListener('click', () => setCategory(cat.id));
      filtersContainer.appendChild(btn);
    });
  }

  // ------------------------------------------------------------------------
  // 2. Filter Handler
  // ------------------------------------------------------------------------
  function setCategory(catId) {
    if (currentCategory === catId) return;
    currentCategory = catId;

    // Update active filter button styling
    filtersContainer.querySelectorAll('.experience-filter-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-category') === catId);
    });

    // Filter list
    if (catId === 'all') {
      filteredExperiences = [...EXPERIENCES];
    } else {
      filteredExperiences = EXPERIENCES.filter((exp) => exp.category === catId);
    }

    // Reset active item to 0 of filtered list
    activeIndex = 0;
    renderList();
    renderDetail(filteredExperiences[activeIndex]);

    // Animate list update
    gsap.fromTo('.experience-item',
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.28, stagger: 0.04, ease: 'power2.out' }
    );
  }

  // ------------------------------------------------------------------------
  // 3. Render Experience List (with Company Logos)
  // ------------------------------------------------------------------------
  function renderList() {
    listContainer.innerHTML = '';
    filteredExperiences.forEach((exp, idx) => {
      const item = document.createElement('button');
      item.className = `experience-item ${idx === activeIndex ? 'is-active' : ''}`;
      item.setAttribute('type', 'button');
      item.setAttribute('data-index', idx);
      item.setAttribute('data-badge', exp.badgeColor);

      item.innerHTML = `
        <div class="experience-item__logo-box">
          <img src="${exp.logo}" alt="${exp.company} logo" loading="lazy" />
        </div>
        <div class="experience-item__info">
          <div class="experience-item__top">
            <span class="experience-item__company">${exp.company}</span>
            <span class="experience-item__period">${exp.period}</span>
          </div>
          <div class="experience-item__role">${exp.role}</div>
        </div>
      `;

      item.addEventListener('click', () => {
        if (activeIndex === idx) return;
        activeIndex = idx;
        updateActiveItem();
        renderDetail(exp, true);
      });

      listContainer.appendChild(item);
    });
  }

  function updateActiveItem() {
    listContainer.querySelectorAll('.experience-item').forEach((item, idx) => {
      item.classList.toggle('is-active', idx === activeIndex);
    });
  }

  // ------------------------------------------------------------------------
  // 4. Render Active Detail Card (Logos, SVG Lightning Bolt, Clean Photos, LinkedIn Logo)
  // ------------------------------------------------------------------------
  function renderDetail(exp, animate = false) {
    if (!exp) return;

    detailContainer.setAttribute('data-badge', exp.badgeColor);

    const photosHtml = exp.photos && exp.photos.length > 0
      ? `
        <div class="experience-detail__photo-strip">
          ${exp.photos.map((photoUrl, i) => `
            <div class="experience-photo-thumb" data-photo-idx="${i}">
              <img src="${photoUrl}" alt="${exp.company} workplace photo" loading="lazy" />
              <div class="experience-photo-thumb__overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
            </div>
          `).join('')}
        </div>
      `
      : '<div></div>';

    detailContainer.innerHTML = `
      <div class="experience-detail__header">
        <div class="experience-detail__brand-row">
          <div class="experience-detail__logo-box">
            <img src="${exp.logo}" alt="${exp.company} logo" />
          </div>
          <div class="experience-detail__brand-text">
            <div class="experience-detail__top-row">
              <div class="experience-detail__company">${exp.company}</div>
              <div class="experience-detail__period">${exp.period}</div>
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

    // Wire up thumbnail clicks to lightbox (photo only, no incorrect captions)
    const thumbElements = detailContainer.querySelectorAll('.experience-photo-thumb');
    thumbElements.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const photoIdx = parseInt(thumb.getAttribute('data-photo-idx'), 10);
        const photoUrl = exp.photos[photoIdx];
        if (photoUrl) openLightbox(photoUrl);
      });
    });

    if (animate) {
      gsap.fromTo(detailContainer,
        { opacity: 0.88, y: 6 },
        { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }
      );
    }
  }

  // ------------------------------------------------------------------------
  // 5. Clean Photo Lightbox Modal Controller (No Captions)
  // ------------------------------------------------------------------------
  function openLightbox(photoUrl) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = photoUrl;
    lightboxImg.alt = 'Workplace photo';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  // ------------------------------------------------------------------------
  // Initial Boot
  // ------------------------------------------------------------------------
  renderFilters();
  renderList();
  renderDetail(filteredExperiences[0]);
}
