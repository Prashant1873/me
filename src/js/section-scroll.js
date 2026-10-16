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
  const drawerLinks = Array.from(document.querySelectorAll('.mobile-drawer__link[data-section]'));
  let currentIndex = 0;
  let isScrolling = false;
  let scrollDirection = 0; // 1 = forward/down, -1 = backward/up
  let safetyTimer = null;

  function isMobileOrTablet() {
    return window.innerWidth <= 1024 || window.matchMedia('(pointer: coarse)').matches;
  }

  function updateNav(index) {
    const prevIndex = currentIndex;
    currentIndex = index;
    const secId = sections[index]?.id;
    if (!secId) return;

    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('data-section') === secId);
    });
    drawerLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('data-section') === secId);
    });
    sections.forEach((sec, idx) => {
      sec.classList.toggle('is-active', idx === index);
    });

    // Synchronize URL hash with history.replaceState to avoid jumping
    const targetHash = `#${secId}`;
    if (window.location.hash !== targetHash) {
      try {
        history.replaceState(null, '', targetHash);
      } catch (e) {}
    }

    if (prevIndex !== index || !window.backgroundScene?.getActiveSection || window.backgroundScene.getActiveSection() !== index) {
      window.backgroundScene?.transitionToSection(index);
    }
  }

  // Active section observer for mobile native scroll
  const sectionObserver = new IntersectionObserver((entries) => {
    if (!isMobileOrTablet()) return;
    entries.forEach(entry => {
      if (entry.isIntersecting && !isScrolling) {
        const idx = sections.indexOf(entry.target);
        if (idx !== -1) {
          updateNav(idx);
        }
      }
    });
  }, {
    root: null,
    rootMargin: '-15% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(sec => sectionObserver.observe(sec));

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    
    scrollDirection = index > currentIndex ? 1 : -1;
    isScrolling = true;
    updateNav(index);
    window.backgroundScene?.transitionToSection(index);

    const navOffset = isMobileOrTablet() ? (window.innerWidth <= 768 ? 56 : 64) : 0;
    const targetY = Math.max(0, sections[index].offsetTop - navOffset);

    // Safety timeout: guarantees isScrolling ALWAYS resets even if tween gets killed
    clearTimeout(safetyTimer);
    safetyTimer = setTimeout(() => {
      isScrolling = false;
    }, 850);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollDuration = prefersReducedMotion ? 0.05 : (isMobileOrTablet() ? 0.55 : 0.45);

    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: false },
      duration: scrollDuration,
      ease: prefersReducedMotion ? 'none' : 'power2.inOut',
      overwrite: 'auto',
      onComplete: () => {
        setTimeout(() => {
          isScrolling = false;
        }, 200);
      }
    });
  }

  // --- Modal check helper ---
  function getActiveModal() {
    return document.querySelector('.project-modal.is-open, .timeline-modal.is-open, .experience-lightbox.is-open, [role="dialog"].is-open');
  }

  // --- Wheel: 1 scroll gesture = strictly 1 section (Desktop only) ---
  function onWheel(e) {
    if (e.ctrlKey || e.metaKey) return;
    if (isMobileOrTablet()) return;

    // If any modal dialog is open, NEVER scroll background sections!
    const activeModal = getActiveModal();
    if (activeModal) {
      // If scrolling directly inside modal content, allow native scrolling
      if (e.target && activeModal.contains(e.target)) {
        return;
      }
      // Otherwise prevent background page scroll
      e.preventDefault();
      return;
    }

    e.preventDefault();

    if (Math.abs(e.deltaY) < 18) return;
    const eventDir = e.deltaY > 0 ? 1 : -1;

    // While animating, allow immediate mid-flight reversal in opposite direction
    if (isScrolling) {
      if (eventDir !== scrollDirection && Math.abs(e.deltaY) > 30) {
        scrollToSection(currentIndex - scrollDirection);
      }
      return;
    }

    // If horizontal scrolling specifically over the 3D timeline track, scrub experience milestones
    const isOverTimelineTrack = e.target && e.target.closest && e.target.closest('#experience-timeline-track');
    if (isOverTimelineTrack && window.experienceController && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 0) {
        if (window.experienceController.next()) return;
      } else if (e.deltaX < 0) {
        if (window.experienceController.prev()) return;
      }
    }

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

    // If a modal dialog is open, let modal handle keyboard navigation
    if (getActiveModal()) return;

    // ArrowLeft / ArrowRight cycle milestones when on Experience section
    if (sections[currentIndex]?.id === 'experience' && window.experienceController) {
      if (e.key === 'ArrowRight' && window.experienceController.next()) {
        e.preventDefault();
        return;
      }
      if (e.key === 'ArrowLeft' && window.experienceController.prev()) {
        e.preventDefault();
        return;
      }
    }

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
  let touchStartX = 0;
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (isScrolling || !touchStartY) return;
    if (getActiveModal()) {
      touchStartY = 0;
      return;
    }
    const deltaY = touchStartY - e.changedTouches[0].clientY;
    const deltaX = touchStartX - e.changedTouches[0].clientX;

    // Horizontal swipe over experience track scrubs milestones
    if (sections[currentIndex]?.id === 'experience' && window.experienceController && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0 && window.experienceController.next()) {
        touchStartY = 0;
        return;
      } else if (deltaX < 0 && window.experienceController.prev()) {
        touchStartY = 0;
        return;
      }
    }

    // On mobile / tablet, do not hijack vertical swipes: allow native fluid scrolling!
    if (isMobileOrTablet()) {
      touchStartY = 0;
      return;
    }

    if (Math.abs(deltaY) > 40) {
      scrollToSection(deltaY > 0 ? currentIndex + 1 : currentIndex - 1);
    }
    touchStartY = 0;
  }, { passive: true });

  // --- Nav links click ---
  function bindLinkClicks(links) {
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const secId = link.getAttribute('data-section');
        const idx = sections.findIndex(s => s.id === secId);
        if (idx !== -1) {
          scrollToSection(idx);
        }
      });
    });
  }

  bindLinkClicks(navLinks);
  bindLinkClicks(drawerLinks);


  const logoLink = document.querySelector('.site-nav__logo');
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSection(0);
    });
  }

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

  // --- Initial Section Detection on Page Load / Refresh ---
  function getInitialSectionIndex() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const hashIdx = sections.findIndex(s => s.id === hash);
      if (hashIdx !== -1) return hashIdx;
    }
    // If browser restored scroll position without hash
    if (window.scrollY > 40) {
      const navOffset = isMobileOrTablet() ? (window.innerWidth <= 768 ? 56 : 64) : 0;
      const currentScroll = window.scrollY + navOffset + 60;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= currentScroll) {
          return i;
        }
      }
    }
    return 0;
  }

  const initialIndex = getInitialSectionIndex();
  currentIndex = initialIndex;
  updateNav(initialIndex);

  function alignToInitialSection() {
    if (initialIndex > 0 && sections[initialIndex]) {
      const navOffset = isMobileOrTablet() ? (window.innerWidth <= 768 ? 56 : 64) : 0;
      const targetY = Math.max(0, sections[initialIndex].offsetTop - navOffset);
      if (Math.abs(window.scrollY - targetY) > 8) {
        window.scrollTo(0, targetY);
      }
      window.backgroundScene?.transitionToSection(initialIndex);
    }
  }

  alignToInitialSection();
  requestAnimationFrame(alignToInitialSection);

  window.addEventListener('load', () => {
    alignToInitialSection();
    const verifiedIndex = getInitialSectionIndex();
    if (verifiedIndex !== currentIndex) {
      updateNav(verifiedIndex);
    }
  });

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '');
    const targetIdx = sections.findIndex(s => s.id === newHash);
    if (targetIdx !== -1 && targetIdx !== currentIndex) {
      scrollToSection(targetIdx);
    }
  });

  return {
    getCurrentIndex: () => currentIndex,
    goToSection: scrollToSection,
  };
}
