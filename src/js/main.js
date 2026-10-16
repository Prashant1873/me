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
// Viscoelastic Stretch-and-Squish Theme Toggle Controller
// --------------------------------------------------------------------------
const themeToggleContainer = document.getElementById('theme-toggle');
const themeThumb = document.getElementById('theme-toggle-thumb');
const btnDark = document.getElementById('theme-opt-dark');
const btnLight = document.getElementById('theme-opt-light');
const htmlEl = document.documentElement;

let currentTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', currentTheme);

function getThumbTargetX(theme) {
  if (!btnDark || !btnLight) return 0;
  if (theme === 'dark') {
    return 0;
  }
  return btnLight.offsetLeft - btnDark.offsetLeft;
}

function updateThemeUI(theme, animate = true) {
  currentTheme = theme;
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (btnDark && btnLight) {
    const isDark = theme === 'dark';
    btnDark.classList.toggle('is-active', isDark);
    btnDark.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    btnLight.classList.toggle('is-active', !isDark);
    btnLight.setAttribute('aria-pressed', !isDark ? 'true' : 'false');
  }

  if (!themeThumb) return;

  const targetX = getThumbTargetX(theme);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!animate || prefersReduced) {
    gsap.killTweensOf(themeThumb);
    gsap.set(themeThumb, { x: targetX, scaleX: 1, scaleY: 1 });
    return;
  }

  // Viscoelastic stretch-and-squish animation with Poisson volume conservation
  gsap.killTweensOf(themeThumb);
  const tl = gsap.timeline();

  // 1. Acceleration and Elongation: stretch along transit axis, compress vertical thickness
  tl.to(themeThumb, {
    x: targetX,
    duration: 0.24,
    ease: 'power2.inOut'
  }, 0)
  .to(themeThumb, {
    scaleX: 1.34,
    scaleY: 0.82,
    duration: 0.11,
    ease: 'power2.in'
  }, 0)
  // 2. Deceleration and Squish Impact: compress along movement axis, expand vertically
  .to(themeThumb, {
    scaleX: 0.88,
    scaleY: 1.12,
    duration: 0.11,
    ease: 'power2.out'
  }, 0.11)
  // 3. Equilibrium Rebound: settle with fluid Apple spring decay
  .to(themeThumb, {
    scaleX: 1.0,
    scaleY: 1.0,
    duration: 0.28,
    ease: 'elastic.out(1.15, 0.45)'
  }, 0.22);

  // Subtle ambient body cross-fade
  gsap.fromTo('body', { opacity: 0.98 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
}

// Initial positioning on page load without animation
if (themeThumb) {
  requestAnimationFrame(() => {
    updateThemeUI(currentTheme, false);
  });

  if (window.ResizeObserver && themeToggleContainer) {
    const ro = new ResizeObserver(() => {
      gsap.set(themeThumb, { x: getThumbTargetX(currentTheme), scaleX: 1, scaleY: 1 });
    });
    ro.observe(themeToggleContainer);
  }
}

// Unified click handler for both direct option buttons and container toggle
if (themeToggleContainer) {
  themeToggleContainer.addEventListener('click', (e) => {
    const clickedBtn = e.target.closest('.theme-toggle-pill__btn');
    if (clickedBtn) {
      const chosen = clickedBtn.getAttribute('data-theme-val');
      if (chosen === currentTheme) {
        updateThemeUI(currentTheme === 'dark' ? 'light' : 'dark', true);
      } else {
        updateThemeUI(chosen, true);
      }
    } else {
      updateThemeUI(currentTheme === 'dark' ? 'light' : 'dark', true);
    }
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
    document.body.classList.add('nav-drawer-open');

    // Set initial focus to close button
    if (drawerClose) drawerClose.focus();
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('is-active');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.body.classList.remove('nav-drawer-open');

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
        } else {
          const currentIndex = focusables.indexOf(document.activeElement);
          if (currentIndex > 0) {
            e.preventDefault();
            focusables[currentIndex - 1].focus();
          }
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        } else {
          const currentIndex = focusables.indexOf(document.activeElement);
          if (currentIndex !== -1 && currentIndex < focusables.length - 1) {
            e.preventDefault();
            focusables[currentIndex + 1].focus();
          }
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

