import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * Full-Viewport Elastic Section Scroll Manager
 * - Strictly 1 section advance per swipe gesture
 * - Anti-lockout: fixed, non-sliding cooldown ensures pages NEVER get stuck
 * - Instant zero-lag initiation (~25ms response via 18px delta accumulator)
 * - Immediate mid-flight reversal on opposite flick
 * - Apple-style fluid spring settling and boundary bounce
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
  let lastScrollTriggerTime = 0;
  let animationSafetyTimer = null;

  let wheelAccumulator = 0;
  let accumulatorClearTimeout = null;
  const ACCUMULATOR_THRESHOLD = 18; // Fast, responsive initiation

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
      elasticBounce(sections[0], -24);
      lastScrollTriggerTime = Date.now() - 350; // Don't lockout when hitting boundary
      return;
    }
    if (newTargetIndex >= sections.length) {
      elasticBounce(sections[sections.length - 1], 24);
      lastScrollTriggerTime = Date.now() - 350; // Don't lockout when hitting boundary
      return;
    }

    const fromIndex = currentIndex;
    const dir = direction !== 0 ? direction : (newTargetIndex > fromIndex ? 1 : -1);

    // If already at target and settled, ignore
    if (newTargetIndex === currentIndex && !isAnimating) return;

    // 2. Clear any previous tweens immediately
    if (activeScrollTween) {
      activeScrollTween.kill();
      activeScrollTween = null;
    }
    if (activeContentTween) {
      activeContentTween.kill();
      activeContentTween = null;
    }

    isAnimating = true;
    lastScrollTriggerTime = Date.now();
    animDirection = dir;
    targetIndex = newTargetIndex;
    currentIndex = newTargetIndex;

    const targetSection = sections[targetIndex];
    const targetY = getSectionTop(targetSection);

    updateNav(targetSection.id);

    // Safety timeout: guarantees isAnimating ALWAYS resets, avoiding any freeze
    clearTimeout(animationSafetyTimer);
    animationSafetyTimer = setTimeout(() => {
      isAnimating = false;
    }, 650);

    // 3. Incoming section subtle elastic spring settling
    const incomingContainer = targetSection.querySelector('.grid-container') || targetSection.firstElementChild;
    if (incomingContainer) {
      activeContentTween = gsap.fromTo(incomingContainer,
        { y: dir * 28, opacity: 0.88 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
          clearProps: 'transform'
        }
      );
    }

    // 4. Fast, smooth scroll to target (0.5s duration)
    activeScrollTween = gsap.to(window, {
      scrollTo: { y: targetY, autoKill: false },
      duration: 0.5,
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

    const now = Date.now();

    // Normalize delta across input devices (pixels, lines, pages)
    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 28; // Lines (standard mouse wheel)
    else if (e.deltaMode === 2) delta *= window.innerHeight; // Pages

    if (Math.abs(delta) < 0.5) return;

    const inputDir = delta > 0 ? 1 : -1;

    // 1. MID-FLIGHT HANDLING:
    if (isAnimating) {
      // Reversal: if user flicks in OPPOSITE direction, immediately reverse back!
      if (inputDir !== animDirection) {
        wheelAccumulator = 0;
        const reverseTarget = inputDir > 0 
          ? Math.min(sections.length - 1, targetIndex + 1) 
          : Math.max(0, targetIndex - 1);
        goToSection(reverseTarget, inputDir);
      }
      // Strictly prevent multiple forward jumps from the same flight
      return;
    }

    // 2. FIXED TIME COOLDOWN (Anti-Double-Skip & Anti-Lockout):
    // Prevents trailing trackpad momentum from triggering a 2nd section.
    // Fixed window of 550ms since initiation (does NOT slide with subsequent events).
    if (now - lastScrollTriggerTime < 550) {
      // Reversal is always honored immediately
      if (inputDir !== animDirection) {
        wheelAccumulator = 0;
        goToSection(currentIndex + inputDir, inputDir);
        return;
      }
      // Discard trailing momentum of previous swipe in the same direction
      return;
    }

    // 3. RESTING STATE / NEW SWIPE ACCUMULATOR:
    if ((wheelAccumulator > 0 && delta < 0) || (wheelAccumulator < 0 && delta > 0)) {
      wheelAccumulator = 0;
    }

    wheelAccumulator += delta;

    clearTimeout(accumulatorClearTimeout);
    accumulatorClearTimeout = setTimeout(() => {
      wheelAccumulator = 0;
    }, 120);

    // 4. TRIGGER TRANSITION:
    if (Math.abs(wheelAccumulator) >= ACCUMULATOR_THRESHOLD) {
      const scrollDir = wheelAccumulator > 0 ? 1 : -1;
      wheelAccumulator = 0;
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
      goToSection(currentIndex + touchDir, touchDir);
    }
    touchStartY = 0;
  }

  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });

  // --- Nav Click Interception (Always responsive, interrupts flight) ---
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
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
      wheelAccumulator = 0;
      goToSection(1, 1);
    });
    scrollIndicatorBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        wheelAccumulator = 0;
        goToSection(1, 1);
      }
    });
  }

  // --- Resize Alignment ---
  window.addEventListener('resize', () => {
    if (sections[currentIndex]) {
      const targetY = getSectionTop(sections[currentIndex]);
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
