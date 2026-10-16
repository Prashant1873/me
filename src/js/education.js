/**
 * Education Section Component - Milestone 3
 * Quad-Card Layout: Academic Excellence (3 Equal Columns), High-Stakes Leadership, Stage & Synthesis, Competencies
 */

import { ACADEMICS, GOVERNANCE, EXTRACURRICULARS, SKILLS } from './education-data.js';

export function initEducation() {
  const pillarsContainer = document.getElementById('education-pillars');
  const skillsContainer = document.getElementById('education-skills');

  if (!pillarsContainer || !skillsContainer) return;

  // 1. Render Card 1: Academic Excellence (3 Balanced Equal Columns)
  const academicsHtml = `
    <div class="education-card education-card--academics">
      <div class="education-card__header">
        <h3 class="education-card__title">Academic Excellence</h3>
        <span class="education-card__badge">PEDIGREE &amp; DEGREES</span>
      </div>
      
      <div class="education-card__body">
        ${ACADEMICS.map(item => `
          <div class="academic-col-card" id="academic-entry-${item.id}">
            <div class="academic-col-card__header">
              <div class="academic-col-card__crest">
                <img src="${item.logo}" alt="${item.institution} Crest" loading="lazy" />
              </div>
              <div class="academic-col-card__title-wrap">
                <h4 class="academic-col-card__inst">${item.shortName}</h4>
                <div class="academic-col-card__degree">${item.degree}</div>
                <div class="academic-col-card__subtext">${item.institution}</div>
              </div>
            </div>
            
            <div class="academic-col-card__meta">
              <span class="edu-badge-pill">${item.timeline}</span>
              <span class="edu-badge-pill edu-badge-pill--accent">${item.badge}</span>
            </div>

            <div class="academic-col-card__metrics">
              ${item.metrics.map(m => `
                <div class="edu-metric-capsule">
                  <span class="edu-metric-capsule__val">${m.value}</span>
                  <span class="edu-metric-capsule__lbl">${m.label}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // 2. Render Card 2: Campus Governance & High-Stakes Leadership
  const governanceHtml = `
    <div class="education-card education-card--governance">
      <div class="education-card__header">
        <h3 class="education-card__title">High-Stakes Leadership</h3>
        <span class="education-card__badge">CAMPUS GOVERNANCE</span>
      </div>

      <div class="education-card__body">
        ${GOVERNANCE.map(gov => `
          <div class="governance-entry">
            <div class="governance-entry__main">
              <div class="governance-entry__crest">
                <img src="${gov.logo}" alt="${gov.organization} Logo" loading="lazy" />
              </div>
              <div class="governance-entry__info">
                <div class="governance-entry__top">
                  <h4 class="governance-entry__title">${gov.organization}</h4>
                  <span class="governance-tag">${gov.timeline}</span>
                </div>
                <div class="governance-entry__role">${gov.title} · <span class="governance-entry__scale">${gov.scale}</span></div>
              </div>
            </div>

            <!-- Scannable Bullet Lines with Highlighted Numbers -->
            <div class="governance-bullets">
              ${gov.bullets.map(b => `
                <div class="governance-bullet-line">
                  <span class="governance-bullet-marker">●</span>
                  <p class="governance-bullet-text">${b}</p>
                </div>
              `).join('')}
            </div>

            <!-- Scannable KPI strip -->
            <div class="governance-kpis">
              ${gov.metrics.map(m => `
                <div class="gov-kpi-chip">
                  <span class="gov-kpi-chip__val">${m.value}</span>
                  <span class="gov-kpi-chip__lbl">${m.label}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Helper for category bespoke vector SVG icons
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'stage-dramatics':
        return `<svg class="creative-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 10.5a8.5 8.5 0 1 1 17 0c0 4.7-3.8 8.5-8.5 8.5S2 15.2 2 10.5Z"></path><path d="M7 9h.01"></path><path d="M14 9h.01"></path><path d="M7.5 13.5c.9 1 2 1.5 3 1.5s2.1-.5 3-1.5"></path></svg>`;
      case 'speaking-comedy':
        return `<svg class="creative-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line><line x1="8" y1="22" x2="16" y2="22"></line></svg>`;
      case 'athletics':
        return `<svg class="creative-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H7v2h10v-2h-2c-.55 0-1-.45-1-1v-2.34"></path><path d="M18 4H6v7a6 6 0 0 0 12 0V4Z"></path></svg>`;
      default:
        return `<svg class="creative-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }
  };

  // 3. Render Card 3: Performing Arts, Athletics & Synthesis
  const creativeHtml = `
    <div class="education-card education-card--creative">
      <div class="education-card__header">
        <h3 class="education-card__title">Stage &amp; Synthesis</h3>
        <span class="education-card__badge">CREATIVE &amp; ATHLETICS</span>
      </div>

      <div class="education-card__body">
        ${EXTRACURRICULARS.map(extra => {
          const icon = getCategoryIcon(extra.id);
          // EDU-09: Unadorned 2x Gold Medalist pill without flanking emojis or medal SVGs
          const badgeHtml = extra.id === 'stage-dramatics'
            ? `<span class="creative-badge creative-badge--gold">2× GOLD MEDALIST</span>`
            : `<span class="creative-badge">${extra.badge}</span>`;

          return `
            <div class="creative-entry">
              <div class="creative-entry__header">
                <div class="creative-entry__title-wrap">
                  <span class="creative-entry__icon" aria-hidden="true">${icon}</span>
                  <div>
                    <h4 class="creative-entry__category">${extra.category}</h4>
                    <div class="creative-entry__role">${extra.role}</div>
                  </div>
                </div>
                ${badgeHtml}
              </div>

              <!-- Visual Highlight Key Pairs -->
              <div class="creative-highlights-list">
                ${extra.highlights.map(h => `
                  <div class="creative-stat-item">
                    <span class="creative-stat-item__val">${h.value}</span>
                    <span class="creative-stat-item__lbl">${h.label}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  pillarsContainer.innerHTML = academicsHtml + governanceHtml + creativeHtml;

  // 4. Render Card 4: Expanded Skills & Core Competencies Matrix
  skillsContainer.innerHTML = `
    <div class="skills-matrix">
      <div class="skills-matrix__title">
        <span class="section-tag">CORE COMPETENCIES &amp; TOOLKIT</span>
      </div>
      <div class="skills-matrix__groups">
        ${SKILLS.map(grp => `
          <div class="skills-group">
            <span class="skills-group__label">${grp.category}:</span>
            <div class="skills-group__items">
              ${grp.items.map(skill => `
                <span class="skill-pill">${skill}</span>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
