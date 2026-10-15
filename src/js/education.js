/**
 * Education Section Component - Phase 7
 * Triple-Pillar Layout: Academics, Governance, Performing Arts & Skills Matrix
 */

import { ACADEMICS, GOVERNANCE, EXTRACURRICULARS, SKILLS } from './education-data.js';

export function initEducation() {
  const pillarsContainer = document.getElementById('education-pillars');
  const skillsContainer = document.getElementById('education-skills');

  if (!pillarsContainer || !skillsContainer) return;

  // 1. Render Pillar 1: Academics & Pedigree
  const academicsHtml = `
    <div class="education-card education-card--academics">
      <div class="education-card__header">
        <h3 class="education-card__title">Academic Excellence</h3>
        <span class="education-card__badge">PEDIGREE &amp; DEGREES</span>
      </div>
      
      <div class="education-card__body">
        <!-- IIT Bombay Featured Block -->
        <div class="academic-entry academic-entry--featured">
          <div class="academic-entry__crest">
            <img src="${ACADEMICS[0].logo}" alt="${ACADEMICS[0].institution} Crest" loading="lazy" />
          </div>
          <div class="academic-entry__info">
            <div class="academic-entry__inst">${ACADEMICS[0].institution}</div>
            <div class="academic-entry__degree">${ACADEMICS[0].degree}</div>
            <div class="academic-entry__meta">
              <span class="academic-pill">${ACADEMICS[0].timeline}</span>
              <span class="academic-pill academic-pill--accent">${ACADEMICS[0].badge}</span>
            </div>
            <div class="academic-highlights-row">
              ${ACADEMICS[0].metrics.map(m => `
                <div class="edu-stat-chip">
                  <span class="edu-stat-chip__val">${m.value}</span>
                  <span class="edu-stat-chip__lbl">${m.label}</span>
                </div>
              `).join('')}
              ${ACADEMICS[0].tags.map(t => `
                <span class="edu-tag-pill">● ${t}</span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Schooling Accolades (CMS & St. Francis) -->
        <div class="academic-school-row">
          ${ACADEMICS.slice(1).map(school => `
            <div class="school-mini-card">
              <div class="school-mini-card__crest">
                <img src="${school.logo}" alt="${school.institution} Logo" loading="lazy" />
              </div>
              <div class="school-mini-card__info">
                <div class="school-mini-card__name">${school.shortName}</div>
                <div class="school-mini-card__grade">${school.degree}</div>
                <div class="school-mini-card__badge">
                  <span class="gold-badge">● ${school.metrics[0].value}</span>
                  <span class="gold-badge gold-badge--warm">${school.metrics[1].value}</span>
                </div>
                <div class="school-mini-card__tags">
                  ${school.tags.map(t => `<span class="school-tag-pill">${t}</span>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // 2. Render Pillar 2: Campus Governance & High-Stakes Leadership
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
                <div class="governance-entry__role">${gov.title}</div>
              </div>
            </div>

            <!-- Visual Highlight Numbers -->
            <div class="governance-stats-grid">
              ${gov.metrics.map(m => `
                <div class="gov-stat-item">
                  <span class="gov-stat-item__val">${m.value}</span>
                  <span class="gov-stat-item__lbl">${m.label}</span>
                </div>
              `).join('')}
            </div>

            <div class="governance-entry__tags">
              ${gov.tags.map(t => `<span class="gov-tag-pill">● ${t}</span>`).join('')}
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

  const medalSvg = `<svg class="medal-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="14" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`;

  // 3. Render Pillar 3: Performing Arts, Athletics & Synthesis
  const creativeHtml = `
    <div class="education-card education-card--creative">
      <div class="education-card__header">
        <h3 class="education-card__title">Stage &amp; Synthesis</h3>
        <span class="education-card__badge">CREATIVE &amp; ATHLETICS</span>
      </div>

      <div class="education-card__body">
        ${EXTRACURRICULARS.map(extra => {
          const icon = getCategoryIcon(extra.id);
          const badgeHtml = extra.id === 'stage-dramatics'
            ? `<span class="creative-badge creative-badge--gold">${medalSvg} 2× GOLD MEDALIST ${medalSvg}</span>`
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

              <!-- Visual Highlight Cards -->
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

  // 4. Render Skills Matrix Row
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
