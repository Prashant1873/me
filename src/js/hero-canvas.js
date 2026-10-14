/**
 * Hero Orbital Canvas - Three.js 3D scene
 * Wireframe core + floating particles (no rings)
 * Aerospace metaphor: coherent center with orbiting ideas
 */
import * as THREE from 'three';
import gsap from 'gsap';

const COLORS = {
  dark: {
    core: 0xE8655A,       // Coral
    particles: 0x2962FF,  // Royal Blue
    particlesAlt: 0xE8655A,
  },
  light: {
    core: 0xD44E43,
    particles: 0x1948D1,
    particlesAlt: 0xD44E43,
  },
};

export function initHeroCanvas(container) {
  if (!container) return null;

  const state = { destroyed: false };
  let width = container.clientWidth || 600;
  let height = container.clientHeight || 600;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  // --- Renderer ---
  const getPixelRatio = () => Math.min(window.devicePixelRatio, window.innerWidth <= 768 ? 1.5 : 2);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(getPixelRatio());
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // --- Scene & Camera ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.set(0, 0, 6);

  function getColors() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    return COLORS[theme] || COLORS.dark;
  }

  const colors = getColors();

  // --- Central Interactive Core Group ---
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // --- Central wireframe core (icosahedron) ---
  const coreGeo = new THREE.IcosahedronGeometry(1.22, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: colors.core,
    wireframe: true,
    transparent: true,
    opacity: 0.52,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  coreGroup.add(core);

  // --- Inner glow sphere ---
  const glowGeo = new THREE.SphereGeometry(0.8, 16, 16);
  const glowMat = new THREE.MeshBasicMaterial({
    color: colors.core,
    transparent: true,
    opacity: 0.07,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  coreGroup.add(glow);

  // --- Floating particles scattered widely across orbital space ---
  const particleCount = 180;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.7;
    const radius = 1.6 + Math.random() * 2.2;
    const tilt = (Math.random() - 0.5) * 2.4;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius * Math.cos(tilt) + (Math.random() - 0.5) * 0.35;
    positions[i * 3 + 2] = Math.sin(tilt) * radius * 0.85 + (Math.random() - 0.5) * 0.7;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: colors.particles,
    size: 0.046,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Core glow subtle breathing pulse
  gsap.to(glowMat, {
    opacity: 0.12,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  // --- Mouse pointer and proximity interaction ---
  let proximity = 0;
  let targetProximity = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;
  let currentScale = 1.0;
  let currentGlow = 0;

  function onMouseMove(e) {
    targetMouseX = ((e.clientX / window.innerWidth) - 0.5) * 2;
    targetMouseY = ((e.clientY / window.innerHeight) - 0.5) * 2;

    if (container) {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const activeRadius = rect.width * 0.9;
      targetProximity = Math.max(0, Math.min(1, 1 - dist / activeRadius));
    }
  }

  function onMouseLeave() {
    targetMouseX = 0;
    targetMouseY = 0;
    targetProximity = 0;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave, { passive: true });

  // --- Theme change listener ---
  const observer = new MutationObserver(() => {
    const c = getColors();
    core.material.color.setHex(c.core);
    glow.material.color.setHex(c.core);
    particleMat.color.setHex(c.particles);
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Start transparent for entrance animation
  renderer.domElement.style.opacity = '0';

  function fadeIn(delay = 0) {
    gsap.to(renderer.domElement, {
      opacity: 1,
      duration: 1.2,
      delay,
      ease: 'power2.out',
    });
  }

  // --- Render loop ---
  let lastTime = performance.now();

  function animate() {
    if (state.destroyed) return;
    requestAnimationFrame(animate);

    const now = performance.now();
    const delta = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;
    proximity += (targetProximity - proximity) * 0.08;

    if (!prefersReduced) {
      // Dynamic spin speed: accelerates smoothly when cursor is near polygon
      const baseSpin = 0.32;
      const hoverBoost = proximity * 0.72;
      const currentSpin = (baseSpin + hoverBoost) * delta;

      core.rotation.y += currentSpin;
      core.rotation.x += currentSpin * 0.5;

      // Particle orbit rotation
      particles.rotation.y += (0.14 + proximity * 0.22) * delta;
      particles.rotation.x = -mouseY * 0.12;

      // Fluid 3D tilt tracking: polygon tilts directly toward mouse pointer
      const targetTiltY = mouseX * 0.85;
      const targetTiltX = -mouseY * 0.65;
      const targetScale = 1.0 + proximity * 0.12;
      const targetGlow = proximity;

      currentTiltX += (targetTiltX - currentTiltX) * 0.07;
      currentTiltY += (targetTiltY - currentTiltY) * 0.07;
      currentScale += (targetScale - currentScale) * 0.08;
      currentGlow += (targetGlow - currentGlow) * 0.08;

      coreGroup.rotation.x = currentTiltX;
      coreGroup.rotation.y = currentTiltY;
      coreGroup.rotation.z = mouseX * 0.15;
      coreGroup.scale.set(currentScale, currentScale, currentScale);

      // Interactive brightness & glow amplification on proximity
      coreMat.opacity = 0.52 + currentGlow * 0.32;
      glowMat.opacity = 0.07 + currentGlow * 0.14;

      // Camera parallax
      camera.position.x = mouseX * 0.35;
      camera.position.y = -mouseY * 0.25;
      camera.lookAt(0, 0, 0);
    } else {
      core.rotation.y += 0.15 * delta;
      particles.rotation.y += 0.08 * delta;
    }

    renderer.render(scene, camera);
  }
  animate();

  // --- Resize handling via ResizeObserver (preserves strict 1:1 aspect ratio) ---
  function handleResize() {
    if (!container || state.destroyed) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w <= 0 || h <= 0) return;

    width = w;
    height = h;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(getPixelRatio());
  }

  const resizeObserver = new ResizeObserver(() => {
    handleResize();
  });
  resizeObserver.observe(container);
  window.addEventListener('resize', handleResize);

  return {
    fadeIn,
    destroy() {
      state.destroyed = true;
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    },
  };
}
