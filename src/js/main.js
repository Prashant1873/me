import '../styles/index.css';
import * as THREE from 'three';
import gsap from 'gsap';

console.log('Structured Intensity Design System initialized.');
console.log('Three.js version:', THREE.REVISION);
console.log('GSAP version:', gsap.version);

// --------------------------------------------------------------------------
// Theme Toggle Logic
// --------------------------------------------------------------------------
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeToggleLabel(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleLabel(newTheme);

    // Micro-animation on theme change
    gsap.fromTo(
      'body',
      { opacity: 0.96 },
      { opacity: 1, duration: 0.22, ease: 'power2.out' }
    );
  });
}

function updateThemeToggleLabel(theme) {
  if (!themeToggleBtn) return;
  const labelEl = themeToggleBtn.querySelector('.theme-label');
  if (labelEl) {
    labelEl.textContent = theme === 'dark' ? 'DARK MODE [ACTIVE]' : 'LIGHT MODE [ACTIVE]';
  }
}

// --------------------------------------------------------------------------
// Grid Overlay Toggle (for verification)
// --------------------------------------------------------------------------
const gridToggleBtn = document.getElementById('grid-toggle');
const gridOverlay = document.getElementById('grid-overlay');

if (gridToggleBtn && gridOverlay) {
  gridToggleBtn.addEventListener('click', () => {
    const isHidden = gridOverlay.style.display === 'none' || !gridOverlay.style.display;
    gridOverlay.style.display = isHidden ? 'grid' : 'none';
    gridToggleBtn.classList.toggle('active', isHidden);
  });
}

// --------------------------------------------------------------------------
// Three.js Sanity Verification (Subtle background orbital wireframe)
// --------------------------------------------------------------------------
const canvasContainer = document.getElementById('three-sanity-canvas');
if (canvasContainer) {
  const scene = new THREE.Scene();
  const width = canvasContainer.clientWidth || 300;
  const height = canvasContainer.clientHeight || 300;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasContainer.appendChild(renderer.domElement);

  // Orbital rings (Aerospace motif)
  const ringGeo = new THREE.RingGeometry(1.2, 1.22, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x2962FF, // Royal Blue
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.6,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  scene.add(ring);

  const innerGeo = new THREE.IcosahedronGeometry(0.7, 1);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xE8655A, // Coral
    wireframe: true,
    transparent: true,
    opacity: 0.7,
  });
  const core = new THREE.Mesh(innerGeo, innerMat);
  scene.add(core);

  // GSAP ambient pulsation
  gsap.to(core.rotation, {
    y: Math.PI * 2,
    x: Math.PI * 2,
    duration: 20,
    repeat: -1,
    ease: 'none',
  });

  gsap.to(ring.rotation, {
    z: Math.PI * 2,
    duration: 15,
    repeat: -1,
    ease: 'none',
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    if (!canvasContainer) return;
    const w = canvasContainer.clientWidth;
    const h = canvasContainer.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}
