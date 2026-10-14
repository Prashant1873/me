import '../styles/index.css';
import gsap from 'gsap';
import { initHeroCanvas } from './hero-canvas.js';
import { initBackgroundScene } from './3d/background-scene.js';
import { initSectionScroll } from './section-scroll.js';
import { initExperience } from './experience.js';
import { initProjects } from './projects.js';
import { initEducation } from './education.js';
import { initContact } from './contact.js';

// --------------------------------------------------------------------------
// Theme Toggle
// --------------------------------------------------------------------------
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);

    gsap.fromTo('body', { opacity: 0.96 }, { opacity: 1, duration: 0.22, ease: 'power2.out' });
  });
}

// --------------------------------------------------------------------------
// Sticky Nav - Compact on Scroll
// --------------------------------------------------------------------------
const siteNav = document.getElementById('site-nav');
const COMPACT_THRESHOLD = 60;

function onScroll() {
  if (!siteNav) return;
  const scrolled = window.scrollY > COMPACT_THRESHOLD;
  siteNav.classList.toggle('is-compact', scrolled);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// --------------------------------------------------------------------------
// Mobile Navigation Drawer (NAV-04, RESP-05)
// --------------------------------------------------------------------------
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  if (!navToggle || !mobileDrawer) return;

  const drawerLinks = Array.from(mobileDrawer.querySelectorAll('.mobile-drawer__link, .mobile-drawer__resume-btn, .mobile-drawer__socials a'));
  const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function openDrawer() {
    mobileDrawer.removeAttribute('hidden');
    // Force layout reflow before triggering transition
    void mobileDrawer.offsetWidth;
    mobileDrawer.classList.add('is-active');
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Set initial focus to close button or first link
    setTimeout(() => {
      if (drawerClose) drawerClose.focus();
    }, 100);
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('is-active');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    setTimeout(() => {
      if (!mobileDrawer.classList.contains('is-active')) {
        mobileDrawer.setAttribute('hidden', '');
      }
    }, 350);

    // Return focus to navToggle
    navToggle.focus();
  }

  navToggle.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.contains('is-active');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Focus trap and Escape key listener
  mobileDrawer.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = Array.from(mobileDrawer.querySelectorAll(focusableSelector)).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
      if (!focusables.length) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });
}

initMobileNav();

// --------------------------------------------------------------------------
// Unified 3D Background Engine (Phase 9: 3D-02, 3D-03, 3D-04, 3D-05, 3D-07, 3D-08)
// --------------------------------------------------------------------------
const bgScene = initBackgroundScene();

// --------------------------------------------------------------------------
// Elastic Full-Viewport Section Scroll Controller
// --------------------------------------------------------------------------
const sectionScroll = initSectionScroll();

// --------------------------------------------------------------------------
// Hero 3D Canvas
// --------------------------------------------------------------------------
const heroCanvasContainer = document.getElementById('hero-canvas');
const heroScene = initHeroCanvas(heroCanvasContainer);

// --------------------------------------------------------------------------
// Experience Showcase (Phase 4)
// --------------------------------------------------------------------------
initExperience();

// --------------------------------------------------------------------------
// Projects Case Studies Showcase (Phase 6)
// --------------------------------------------------------------------------
initProjects();

// --------------------------------------------------------------------------
// Education & Achievements Showcase (Phase 7)
// --------------------------------------------------------------------------
initEducation();

// --------------------------------------------------------------------------
// Contact & Action Channels (Phase 7)
// --------------------------------------------------------------------------
initContact();

// --------------------------------------------------------------------------
// Dismiss Loading Skeleton & Trigger Orchestrated Entrance
// --------------------------------------------------------------------------
const skeletonEl = document.getElementById('site-skeleton');

function revealSite() {
  if (skeletonEl) {
    skeletonEl.classList.add('is-loaded');
    setTimeout(() => {
      skeletonEl.remove();
    }, 400);
  }

  // Entrance Animation (GSAP) - staggered reveal with 3D fade-in
  gsap.fromTo('.site-nav',
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, delay: 0.05, ease: 'power2.out' }
  );
  gsap.fromTo('.hero__name',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.85, delay: 0.12, ease: 'power3.out' }
  );
  gsap.fromTo('.hero__metadata',
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power3.out' }
  );
  gsap.fromTo('.hero__meta',
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, delay: 0.45, ease: 'power3.out' }
  );

  // Fade in the 3D canvas after text reveals
  if (heroScene) {
    heroScene.fadeIn(0.4);
  }
}

// Reveal as soon as document fonts are ready (or max fallback timeout 180ms)
if (document.fonts && document.fonts.ready) {
  Promise.race([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 200))
  ]).then(revealSite);
} else {
  setTimeout(revealSite, 50);
}

