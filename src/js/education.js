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
        <span class="education-card__badge">PEDIGREE &amp; DEGREES</span>
        <h3 class="education-card__title">Academic Excellence</h3>
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
            <p class="academic-entry__details">${ACADEMICS[0].details}</p>
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
        <span class="education-card__badge">CAMPUS GOVERNANCE</span>
        <h3 class="education-card__title">High-Stakes Leadership</h3>
      </div>

      <div class="education-card__body">
        ${GOVERNANCE.map(gov => `
          <div class="governance-entry">
            <div class="governance-entry__top">
              <div>
                <h4 class="governance-entry__title">${gov.organization}</h4>
                <div class="governance-entry__role">${gov.title}</div>
              </div>
              <span class="governance-tag">${gov.timeline}</span>
            </div>

            <div class="governance-entry__scale">
              <span class="scale-label">${gov.scale}</span>
              ${gov.patronages ? `<span class="patronage-label">Patronages: ${gov.patronages}</span>` : ''}
            </div>

            <ul class="governance-bullets">
              ${gov.impactBullets.slice(0, 3).map(b => `<li>${b}</li>`).join('')}
            </ul>

            <div class="governance-entry__metric-strip">
              <span>● ${gov.metricTag}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // 3. Render Pillar 3: Performing Arts, Athletics & Synthesis
  const creativeHtml = `
    <div class="education-card education-card--creative">
      <div class="education-card__header">
        <span class="education-card__badge">CREATIVE &amp; ATHLETICS</span>
        <h3 class="education-card__title">Stage &amp; Synthesis</h3>
      </div>

      <div class="education-card__body">
        ${EXTRACURRICULARS.map(extra => `
          <div class="creative-entry">
            <div class="creative-entry__header">
              <div>
                <h4 class="creative-entry__category">${extra.category}</h4>
                <div class="creative-entry__role">${extra.role}</div>
              </div>
              <span class="creative-badge">${extra.badge}</span>
            </div>
            <ul class="creative-bullets">
              ${extra.achievements.map(a => `<li>${a}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
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
