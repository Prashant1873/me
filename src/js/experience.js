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
  const lightboxCaption = document.getElementById('experience-lightbox-caption');
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
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
    );
  }

  // ------------------------------------------------------------------------
  // 3. Render Experience List
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
        <div class="experience-item__top">
          <span class="experience-item__company">${exp.company}</span>
          <span class="experience-item__period">${exp.period}</span>
        </div>
        <div class="experience-item__role">${exp.role}</div>
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
  // 4. Render Active Detail Card
  // ------------------------------------------------------------------------
  function renderDetail(exp, animate = false) {
    if (!exp) return;

    detailContainer.setAttribute('data-badge', exp.badgeColor);

    const photosHtml = exp.photos && exp.photos.length > 0
      ? `
        <div class="experience-detail__photo-strip">
          ${exp.photos.map((p, i) => `
            <div class="experience-photo-thumb" data-photo-idx="${i}" title="${p.caption}">
              <img src="${p.url}" alt="${p.caption}" loading="lazy" />
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
        <div class="experience-detail__top-row">
          <div class="experience-detail__company">${exp.company}</div>
          <div class="experience-detail__period">${exp.period}</div>
        </div>
        <div class="experience-detail__role">${exp.role}</div>
        <div class="experience-detail__tagline">${exp.tagline}</div>
      </div>

      <div class="experience-detail__metric" data-badge="${exp.badgeColor}">
        <span class="experience-detail__metric-text">⚡ KEY IMPACT: ${exp.metricHighlight}</span>
      </div>

      <ul class="experience-detail__bullets">
        ${exp.bullets.map(b => `<li class="experience-detail__bullet">${b}</li>`).join('')}
      </ul>

      <div class="experience-detail__photos">
        ${photosHtml}
        <a href="${exp.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="experience-detail__linkedin-btn" aria-label="Visit ${exp.company} on LinkedIn">
          <span>LinkedIn</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="7" y1="17" x2="17" y2="7"/>
            <polyline points="7 7 17 7 17 17"/>
          </svg>
        </a>
      </div>
    `;

    // Wire up thumbnail clicks to lightbox
    const thumbElements = detailContainer.querySelectorAll('.experience-photo-thumb');
    thumbElements.forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        const photoIdx = parseInt(thumb.getAttribute('data-photo-idx'), 10);
        const photo = exp.photos[photoIdx];
        if (photo) openLightbox(photo);
      });
    });

    if (animate) {
      gsap.fromTo(detailContainer,
        { opacity: 0.88, y: 8 },
        { opacity: 1, y: 0, duration: 0.24, ease: 'power2.out' }
      );
    }
  }

  // ------------------------------------------------------------------------
  // 5. Lightbox Modal Controller
  // ------------------------------------------------------------------------
  function openLightbox(photo) {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;
    lightboxImg.src = photo.url;
    lightboxImg.alt = photo.caption;
    lightboxCaption.textContent = photo.caption;
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
