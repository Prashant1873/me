import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * Simple Full-Viewport Section Scroll
 * - Strictly 1 swipe / scroll gesture = 1 section
 * - Blocks any trailing trackpad momentum during animation
 * - Zero complex state machines, zero cursor-move dependencies
 */
export function initSectionScroll() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  if (!sections.length) return null;

  const navLinks = Array.from(document.querySelectorAll('.site-nav__link[data-section]'));
  let currentIndex = 0;
  let isScrolling = false;
  let safetyTimer = null;

  function updateNav(index) {
    currentIndex = index;
    const secId = sections[index]?.id;
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('data-section') === secId);
    });
  }

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length || index === currentIndex) return;
    
    isScrolling = true;
    updateNav(index);

    const targetY = sections[index].offsetTop;

    // Safety timeout: guarantees isScrolling ALWAYS resets even if tween gets killed
    clearTimeout(safetyTimer);
    safetyTimer = setTimeout(() => {
      isScrolling = false;
    }, 1100);

    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: false },
      duration: 0.75,
      ease: 'power2.inOut',
      onComplete: () => {
        window.scrollTo(0, targetY);
        // Generous 250ms buffer after landing ensures trackpad momentum is 100% dead
        setTimeout(() => {
          isScrolling = false;
        }, 250);
      }
    });
  }

  // --- Wheel: 1 scroll gesture = strictly 1 section ---
  function onWheel(e) {
    if (e.ctrlKey || e.metaKey) return;
    e.preventDefault();

    // While animating or absorbing swipe momentum, completely ignore all wheel events
    if (isScrolling) return;

    // Filter out resting touchpad noise / micro-jitters
    if (Math.abs(e.deltaY) < 18) return;

    if (e.deltaY > 0) {
      scrollToSection(currentIndex + 1);
    } else {
      scrollToSection(currentIndex - 1);
    }
  }

  window.addEventListener('wheel', onWheel, { passive: false });

  // --- Keyboard navigation ---
  function onKeyDown(e) {
    if (isScrolling) return;
    if (['ArrowDown', 'PageDown', ' '].includes(e.key) && !e.target.matches('input, textarea')) {
      e.preventDefault();
      scrollToSection(currentIndex + 1);
    } else if (['ArrowUp', 'PageUp'].includes(e.key) && !e.target.matches('input, textarea')) {
      e.preventDefault();
      scrollToSection(currentIndex - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      scrollToSection(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      scrollToSection(sections.length - 1);
    }
  }

  window.addEventListener('keydown', onKeyDown);

  // --- Touch swipe navigation (Mobile) ---
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (isScrolling || !touchStartY) return;
    const deltaY = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) > 40) {
      scrollToSection(deltaY > 0 ? currentIndex + 1 : currentIndex - 1);
    }
    touchStartY = 0;
  }, { passive: true });

  // --- Nav links click ---
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const secId = link.getAttribute('data-section');
      const idx = sections.findIndex(s => s.id === secId);
      if (idx !== -1) {
        scrollToSection(idx);
      }
    });
  });

  // --- Hero scroll indicator button ---
  const scrollIndicatorBtn = document.getElementById('hero-scroll-btn');
  if (scrollIndicatorBtn) {
    scrollIndicatorBtn.addEventListener('click', () => {
      scrollToSection(1);
    });
  }

  // --- Resize handling ---
  window.addEventListener('resize', () => {
    if (sections[currentIndex]) {
      window.scrollTo(0, sections[currentIndex].offsetTop);
    }
  });

  // Initialize at current scroll position
  updateNav(0);

  return {
    getCurrentIndex: () => currentIndex,
    goToSection: scrollToSection,
  };
}
