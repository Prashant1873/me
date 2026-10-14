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

  // --- Central wireframe core (icosahedron) ---
  const coreGeo = new THREE.IcosahedronGeometry(1.22, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: colors.core,
    wireframe: true,
    transparent: true,
    opacity: 0.52,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

  // --- Inner glow sphere ---
  const glowGeo = new THREE.SphereGeometry(0.8, 16, 16);
  const glowMat = new THREE.MeshBasicMaterial({
    color: colors.core,
    transparent: true,
    opacity: 0.07,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  scene.add(glow);

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

  // --- GSAP ambient rotation ---
  gsap.to(core.rotation, { y: Math.PI * 2, x: Math.PI, duration: 25, repeat: -1, ease: 'none' });
  gsap.to(particles.rotation, { y: Math.PI * 2, duration: 45, repeat: -1, ease: 'none' });

  // Core glow pulse
  gsap.to(glowMat, {
    opacity: 0.12,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  // --- Mouse parallax ---
  function onMouseMove(e) {
    targetMouseX = ((e.clientX / window.innerWidth) - 0.5) * 2;
    targetMouseY = ((e.clientY / window.innerHeight) - 0.5) * 2;
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true });

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
  function animate() {
    if (state.destroyed) return;
    requestAnimationFrame(animate);

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    camera.position.x = mouseX * 0.3;
    camera.position.y = -mouseY * 0.2;
    camera.lookAt(0, 0, 0);

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
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    },
  };
}
