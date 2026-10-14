/**
 * Contact Section Component - Phase 7
 * Interactive Contact Channels, One-Click Clipboard Copy, Resume CTA & Newsreader Quote
 */

import { CONTACT_CHANNELS, EDITORIAL_STATEMENT, RESUME_DATA } from './contact-data.js';

export function initContact() {
  const channelsContainer = document.getElementById('contact-channels');
  const resumeContainer = document.getElementById('contact-resume');
  const editorialContainer = document.getElementById('contact-editorial');

  if (!channelsContainer || !resumeContainer || !editorialContainer) return;

  // 1. Render Interactive Channels (LinkedIn, GitHub, Email, Phone)
  channelsContainer.innerHTML = `
    <div class="contact-grid">
      ${CONTACT_CHANNELS.map(ch => `
        <div class="contact-card contact-card--${ch.id}" id="contact-card-${ch.id}">
          <div class="contact-card__icon">
            ${getChannelSvg(ch.icon)}
          </div>
          <div class="contact-card__info">
            <span class="contact-card__label">${ch.label}</span>
            <span class="contact-card__handle">${ch.handle}</span>
          </div>
          <div class="contact-card__action">
            ${ch.isCopyable ? `
              <button class="contact-btn contact-btn--copy" data-action="copy-email" data-email="${ch.handle}" aria-label="Copy email address to clipboard">
                <span class="btn-text">Copy Address</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            ` : `
              <a href="${ch.url}" target="_blank" rel="noopener noreferrer" class="contact-btn" aria-label="${ch.actionText}">
                <span class="btn-text">${ch.actionText}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </a>
            `}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Attach clipboard copy handler for Email
  const copyBtn = channelsContainer.querySelector('[data-action="copy-email"]');
  if (copyBtn) {
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = copyBtn.getAttribute('data-email');
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyBtn.querySelector('.btn-text').textContent;
        copyBtn.querySelector('.btn-text').textContent = 'Copied to Clipboard!';
        copyBtn.classList.add('is-copied');
        setTimeout(() => {
          copyBtn.querySelector('.btn-text').textContent = originalText;
          copyBtn.classList.remove('is-copied');
        }, 2200);
      } catch (err) {
        // Fallback open mail client
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // 2. Render Resume Bar (Preview within webpage & Download)
  resumeContainer.innerHTML = `
    <div class="resume-chassis">
      <div class="resume-chassis__info">
        <span class="section-tag">OFFICIAL CREDENTIALS</span>
        <h4 class="resume-chassis__title">Verified IIT Bombay Resume</h4>
        <p class="resume-chassis__sub">Download comprehensive technical CV or preview directly within the webpage.</p>
      </div>
      <div class="resume-chassis__actions">
        <button type="button" class="resume-btn resume-btn--secondary" id="preview-resume-btn" aria-label="Preview resume within webpage">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          <span>Preview Resume</span>
        </button>
        <a href="${RESUME_DATA.url}" download="${RESUME_DATA.fileName}" class="resume-btn resume-btn--primary" id="download-resume-btn" aria-label="Download resume PDF">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Download Resume</span>
        </a>
      </div>
    </div>
  `;

  // Attach Resume Modal Handlers (Within Webpage Preview)
  const resumeModal = document.getElementById('resume-modal');
  const previewBtn = document.getElementById('preview-resume-btn');
  const closeBtn = document.getElementById('resume-modal-close');
  const backdrop = document.getElementById('resume-modal-backdrop');
  const resumeIframe = document.getElementById('resume-modal-iframe');

  function openResumeModal() {
    if (!resumeModal) return;
    if (resumeIframe && !resumeIframe.getAttribute('src')) {
      resumeIframe.setAttribute('src', resumeIframe.getAttribute('data-src') || RESUME_DATA.url);
    }
    resumeModal.removeAttribute('hidden');
    void resumeModal.offsetWidth;
    resumeModal.classList.add('is-open');
    resumeModal.setAttribute('aria-hidden', 'false');
    window.addEventListener('keydown', handleResumeKeyDown);
    if (closeBtn) closeBtn.focus();
  }

  function closeResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.remove('is-open');
    resumeModal.setAttribute('aria-hidden', 'true');
    window.removeEventListener('keydown', handleResumeKeyDown);
    setTimeout(() => {
      if (!resumeModal.classList.contains('is-open')) {
        resumeModal.setAttribute('hidden', '');
      }
    }, 220);
    if (previewBtn) previewBtn.focus();
  }

  function handleResumeKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeResumeModal();
    }
  }

  if (previewBtn) {
    previewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeResumeModal();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      e.preventDefault();
      closeResumeModal();
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, { passive: false });
  }

  // 3. Render Newsreader Editorial Statement
  editorialContainer.innerHTML = `
    <blockquote class="contact__quote">
      <p class="contact__quote-text">"${EDITORIAL_STATEMENT.quote}"</p>
      <footer class="contact__quote-footer">
        <cite class="contact__quote-author">- ${EDITORIAL_STATEMENT.author}</cite>
        <span class="contact__quote-sub">${EDITORIAL_STATEMENT.sub}</span>
      </footer>
    </blockquote>
  `;
}

function getChannelSvg(type) {
  switch (type) {
    case 'linkedin':
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`;
    case 'github':
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
    case 'email':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
    case 'phone':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}
