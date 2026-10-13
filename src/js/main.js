import '../styles/index.css';
import gsap from 'gsap';
import { initHeroCanvas } from './hero-canvas.js';
import { initSectionScroll } from './section-scroll.js';

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
// Sticky Nav — Compact on Scroll
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
// Elastic Full-Viewport Section Scroll Controller
// --------------------------------------------------------------------------
const sectionScroll = initSectionScroll();

// --------------------------------------------------------------------------
// Hero 3D Canvas
// --------------------------------------------------------------------------
const heroCanvasContainer = document.getElementById('hero-canvas');
const heroScene = initHeroCanvas(heroCanvasContainer);

// --------------------------------------------------------------------------
// Entrance Animation (GSAP) — staggered reveal with 3D fade-in
// --------------------------------------------------------------------------
gsap.fromTo('.site-nav',
  { y: -20, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: 'power2.out' }
);
gsap.fromTo('.hero__name',
  { y: 40, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: 'power3.out' }
);
gsap.fromTo('.hero__metadata',
  { y: 15, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.6, delay: 0.45, ease: 'power3.out' }
);
gsap.fromTo('.hero__meta',
  { y: 15, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.6, delay: 0.65, ease: 'power3.out' }
);

// Fade in the 3D canvas after text reveals
if (heroScene) {
  heroScene.fadeIn(0.4);
}

