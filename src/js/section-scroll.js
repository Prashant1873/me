import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * Full-Viewport Elastic Section Scroll Manager
 * - Strictly enforces 1 swipe = 1 page (no multiple section skips on strong flicks)
 * - Zero-lag trackpad response via normalized delta accumulation (15px threshold)
 * - Immediate mid-flight reversal on opposite flick
 * - Trackpad momentum suppression prevents decaying inertia from skipping extra pages
 * - Apple-style fluid spring physics with elastic boundary bounce
 */
export function initSectionScroll() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  if (!sections.length) return null;

  const navLinks = Array.from(document.querySelectorAll('.site-nav__link[data-section]'));
  let currentIndex = 0;
  let targetIndex = 0;
  let isAnimating = false;
  let activeScrollTween = null;
  let activeContentTween = null;
  let animDirection = 0;

  // Single-swipe gesture enforcement
  let activeGestureDir = 0;       // Direction of currently active continuous swipe
  let gestureResetTimer = null;   // Detects when physical swipe has ended
  let wheelAccumulator = 0;
  const ACCUMULATOR_THRESHOLD = 15; // Low threshold for instantaneous start (~30ms)

  let touchStartY = 0;
  let touchStartX = 0;

  function getSectionTop(sec) {
    return Math.round(sec.getBoundingClientRect().top + window.scrollY);
  }

  function getClosestSectionIndex() {
    const scrollMiddle = window.scrollY + window.innerHeight / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    sections.forEach((sec, idx) => {
      const top = getSectionTop(sec);
      const height = sec.offsetHeight;
      const middle = top + height / 2;
      const dist = Math.abs(scrollMiddle - middle);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });
    return closestIndex;
  }

  currentIndex = getClosestSectionIndex();
  targetIndex = currentIndex;

  function updateNav(sectionId) {
    navLinks.forEach(link => {
      const active = link.getAttribute('data-section') === sectionId;
      link.classList.toggle('is-active', active);
    });
  }

  updateNav(sections[currentIndex].id);

  function elasticBounce(element, offset) {
    if (!element) return;
    gsap.killTweensOf(element);
    gsap.to(element, {
      y: offset,
      duration: 0.18,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.set(element, { y: 0, clearProps: 'transform' });
      }
    });
  }

  function goToSection(newTargetIndex, direction = 0) {
    // 1. Boundary check: Elastic rubber-band rebound
    if (newTargetIndex < 0) {
      elasticBounce(sections[0], -28);
      return;
    }
    if (newTargetIndex >= sections.length) {
      elasticBounce(sections[sections.length - 1], 28);
      return;
    }

    const fromIndex = currentIndex;
    const dir = direction !== 0 ? direction : (newTargetIndex > fromIndex ? 1 : -1);

    // If already at target and settled, ignore
    if (newTargetIndex === currentIndex && !isAnimating) return;

    // 2. Interrupt active flight immediately for instant response
    if (activeScrollTween) {
      activeScrollTween.kill();
      activeScrollTween = null;
    }
    if (activeContentTween) {
      activeContentTween.kill();
      activeContentTween = null;
    }

    isAnimating = true;
    animDirection = dir;
    targetIndex = newTargetIndex;
    currentIndex = newTargetIndex;

    const targetSection = sections[targetIndex];
    const targetY = targetSection.offsetTop;

    updateNav(targetSection.id);

    // 3. Incoming section subtle elastic spring settling
    const incomingContainer = targetSection.querySelector('.grid-container') || targetSection.firstElementChild;
    if (incomingContainer) {
      activeContentTween = gsap.fromTo(incomingContainer,
        { y: dir * 30, opacity: 0.88 },
        {
          y: 0,
          opacity: 1,
          duration: 0.62,
          ease: 'power3.out',
          clearProps: 'transform'
        }
      );
    }

    // 4. Fast, fluid scroll to target (0.58s duration eliminates perceived sluggishness)
    activeScrollTween = gsap.to(window, {
      scrollTo: { y: targetY, autoKill: false },
      duration: 0.58,
      ease: 'power3.out',
      onComplete: () => {
        window.scrollTo(0, targetY);
        isAnimating = false;
        activeScrollTween = null;
      }
    });
  }

  // --- Wheel Event Interceptor ---
  function onWheel(e) {
    if (e.ctrlKey || e.metaKey) return;
    e.preventDefault();

    // Normalize delta across input devices (pixels, lines, pages)
    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 28; // Lines (standard mouse wheel)
    else if (e.deltaMode === 2) delta *= window.innerHeight; // Pages

    if (Math.abs(delta) < 0.5) return;

    const inputDir = delta > 0 ? 1 : -1;

    // Reset gesture detection after 180ms of silence (fingers lifted / inertia died)
    clearTimeout(gestureResetTimer);
    gestureResetTimer = setTimeout(() => {
      activeGestureDir = 0;
      wheelAccumulator = 0;
    }, 180);

    // 1. MID-FLIGHT REVERSAL:
    // If currently animating and user flicks in the OPPOSITE direction, immediately reverse
    if (isAnimating) {
      if (inputDir !== animDirection) {
        activeGestureDir = inputDir;
        wheelAccumulator = 0;
        const reverseTarget = inputDir > 0 ? Math.min(sections.length - 1, targetIndex + 1) : Math.max(0, targetIndex - 1);
        goToSection(reverseTarget, inputDir);
      }
      // Strictly prevent any same-direction advance during flight (enforces 1 swipe = 1 page)
      return;
    }

    // 2. ONE-SWIPE-ONE-PAGE LOCK:
    // If the active swipe gesture already triggered a section advance in this direction,
    // ignore all remaining events (including high-velocity momentum tail) of this swipe.
    if (activeGestureDir === inputDir) {
      return;
    }

    // 3. Resting / new swipe: accumulate delta
    if ((wheelAccumulator > 0 && delta < 0) || (wheelAccumulator < 0 && delta > 0)) {
      wheelAccumulator = 0;
    }

    wheelAccumulator += delta;

    // 4. Trigger section transition when threshold is met
    if (Math.abs(wheelAccumulator) >= ACCUMULATOR_THRESHOLD) {
      const scrollDir = wheelAccumulator > 0 ? 1 : -1;
      wheelAccumulator = 0;
      activeGestureDir = scrollDir; // Lock this swipe until user pauses
      goToSection(currentIndex + scrollDir, scrollDir);
    }
  }

  window.addEventListener('wheel', onWheel, { passive: false });

  // --- Keyboard Navigation ---
  function onKeyDown(e) {
    if (['ArrowDown', 'PageDown'].includes(e.key)) {
      e.preventDefault();
      goToSection(currentIndex + 1, 1);
    } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      goToSection(currentIndex - 1, -1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSection(0, -1);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSection(sections.length - 1, 1);
    } else if (e.key === ' ' && !e.target.matches('input, textarea, button')) {
      e.preventDefault();
      goToSection(e.shiftKey ? currentIndex - 1 : currentIndex + 1, e.shiftKey ? -1 : 1);
    }
  }

  window.addEventListener('keydown', onKeyDown);

  // --- Touch Gesture Navigation ---
  function onTouchStart(e) {
    if (e.touches.length !== 1) return;
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }

  function onTouchEnd(e) {
    if (!touchStartY) return;
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaY = touchStartY - touchEndY;
    const deltaX = touchStartX - touchEndX;

    if (Math.abs(deltaY) > 36 && Math.abs(deltaY) > Math.abs(deltaX)) {
      const touchDir = deltaY > 0 ? 1 : -1;
      if (isAnimating) {
        if (touchDir !== animDirection) {
          const reverseTarget = touchDir > 0 ? Math.min(sections.length - 1, targetIndex + 1) : Math.max(0, targetIndex - 1);
          goToSection(reverseTarget, touchDir);
        }
      } else {
        goToSection(currentIndex + touchDir, touchDir);
      }
    }
    touchStartY = 0;
  }

  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });

  // --- Nav Click Interception (Always responsive, interrupts flight) ---
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      activeGestureDir = 0;
      wheelAccumulator = 0;
      const secId = link.getAttribute('data-section');
      const idx = sections.findIndex(s => s.id === secId);
      if (idx !== -1) {
        goToSection(idx);
      }
    });
  });

  // --- Hero Scroll Button Click ---
  const scrollIndicatorBtn = document.getElementById('hero-scroll-btn');
  if (scrollIndicatorBtn) {
    scrollIndicatorBtn.addEventListener('click', () => {
      activeGestureDir = 0;
      wheelAccumulator = 0;
      goToSection(1, 1);
    });
    scrollIndicatorBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activeGestureDir = 0;
        wheelAccumulator = 0;
        goToSection(1, 1);
      }
    });
  }

  // --- Resize Alignment ---
  window.addEventListener('resize', () => {
    if (sections[currentIndex]) {
      const targetY = sections[currentIndex].offsetTop;
      window.scrollTo(0, targetY);
    }
  });

  return {
    goToSection,
    getCurrentIndex: () => currentIndex,
    destroy() {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    }
  };
}
