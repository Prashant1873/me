import * as THREE from 'three';
import gsap from 'gsap';
import { createTerrain } from './terrain.js';
import { createConstellations, getSectionPositions, PARTICLE_COUNT } from './particle-constellations.js';

const COSMIC_DUST_COUNT = 280;

const CAMERA_WAYPOINTS = [
  // 0. Hero
  { pos: { x: 0.0, y: 1.2, z: 7.5 }, lookAt: { x: 0.0, y: 0.0, z: 0.0 } },
  // 1. Experience
  { pos: { x: 3.2, y: 2.0, z: -8.0 }, lookAt: { x: 0.0, y: 0.8, z: -16.0 } },
  // 2. Projects
  { pos: { x: -3.5, y: 2.5, z: -24.0 }, lookAt: { x: 0.0, y: 1.2, z: -32.0 } },
  // 3. Education
  { pos: { x: 2.8, y: 2.2, z: -40.0 }, lookAt: { x: 0.0, y: 1.0, z: -48.0 } },
  // 4. Contact
  { pos: { x: 0.0, y: 1.8, z: -56.0 }, lookAt: { x: 0.0, y: 0.5, z: -64.0 } },
];

export function initBackgroundScene() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return null;

  let width = window.innerWidth;
  let height = window.innerHeight;

  const getPixelRatio = () => Math.min(window.devicePixelRatio || 1, window.innerWidth <= 768 ? 1.5 : 2.0);

  // --- WebGL Renderer ---
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(getPixelRatio());
  renderer.setClearColor(0x000000, 0);

  // --- Scene & Camera ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 160);

  let activeSection = 0;
  const currentCameraPos = { ...CAMERA_WAYPOINTS[0].pos };
  const currentLookAt = { ...CAMERA_WAYPOINTS[0].lookAt };

  camera.position.set(currentCameraPos.x, currentCameraPos.y, currentCameraPos.z);
  camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);

  // --- Atmospheric Fog ---
  const FOG_CONFIG = {
    dark: { color: 0x050508, density: 0.015 },
    light: { color: 0xF1EEE5, density: 0.013 },
  };

  const getTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';
  let currentTheme = getTheme();

  const fog = new THREE.FogExp2(FOG_CONFIG[currentTheme].color, FOG_CONFIG[currentTheme].density);
  scene.fog = fog;

  // --- Ambient Cosmic Dust (3D-04) ---
  const dustGeometry = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(COSMIC_DUST_COUNT * 3);
  const dustVelocities = new Float32Array(COSMIC_DUST_COUNT * 3);

  for (let i = 0; i < COSMIC_DUST_COUNT; i++) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 50;
    dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 26 + 2;
    dustPositions[i * 3 + 2] = 12 - Math.random() * 85;

    dustVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
    dustVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
    dustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
  }

  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

  const DUST_THEME = {
    dark: { color: 0x4A6FA5, opacity: 0.38, size: 0.045 },
    light: { color: 0x64748B, opacity: 0.28, size: 0.040 },
  };

  const dustMaterial = new THREE.PointsMaterial({
    color: DUST_THEME[currentTheme].color,
    size: DUST_THEME[currentTheme].size,
    transparent: true,
    opacity: DUST_THEME[currentTheme].opacity,
    sizeAttenuation: true,
  });

  const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
  scene.add(dustParticles);

  // --- Procedural Terrain Landscape (3D-02) ---
  const terrain = createTerrain();
  scene.add(terrain.mesh);

  // --- Pure Particle Constellations (3D-03) ---
  const constellations = createConstellations(scene, activeSection);

  // --- Multi-Layer Mouse Parallax (3D-05) ---
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  function onPointerMove(e) {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });

  // --- Camera Waypoint Spline Transitions (3D-07, 3D-08) ---
  let cameraTween = null;

  function transitionToSection(targetIndex) {
    if (targetIndex < 0 || targetIndex >= CAMERA_WAYPOINTS.length) return;
    activeSection = targetIndex;

    const targetWaypoint = CAMERA_WAYPOINTS[targetIndex];

    if (cameraTween) cameraTween.kill();

    cameraTween = gsap.timeline();

    cameraTween.to(currentCameraPos, {
      x: targetWaypoint.pos.x,
      y: targetWaypoint.pos.y,
      z: targetWaypoint.pos.z,
      duration: 0.72,
      ease: 'power2.inOut',
    }, 0);

    cameraTween.to(currentLookAt, {
      x: targetWaypoint.lookAt.x,
      y: targetWaypoint.lookAt.y,
      z: targetWaypoint.lookAt.z,
      duration: 0.72,
      ease: 'power2.inOut',
    }, 0);

    constellations.morphToSection(targetIndex, 0.78);

    // Update section active classes in DOM
    const domSections = document.querySelectorAll('section[id]');
    domSections.forEach((sec, idx) => {
      sec.classList.toggle('is-active', idx === targetIndex);
    });
  }

  // --- Theme Switching ---
  function updateTheme(theme) {
    currentTheme = theme;
    const fogConf = FOG_CONFIG[theme] || FOG_CONFIG.dark;
    fog.color.setHex(fogConf.color);
    fog.density = fogConf.density;

    const dustConf = DUST_THEME[theme] || DUST_THEME.dark;
    dustMaterial.color.setHex(dustConf.color);
    dustMaterial.opacity = dustConf.opacity;
    dustMaterial.size = dustConf.size;
    dustMaterial.needsUpdate = true;

    terrain.setTheme(theme);
    constellations.setTheme(theme);
  }

  const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        const nextTheme = getTheme();
        if (nextTheme !== currentTheme) {
          updateTheme(nextTheme);
        }
      }
    });
  });

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  // --- Resize Handler ---
  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(getPixelRatio());
  }

  window.addEventListener('resize', onResize);

  // --- Render Loop (60fps Target) ---
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    const delta = clock.getDelta();

    // Mouse parallax spring smoothing
    currentMouseX += (targetMouseX - currentMouseX) * 0.055;
    currentMouseY += (targetMouseY - currentMouseY) * 0.055;

    // Apply camera position with parallax offset
    camera.position.x = currentCameraPos.x + currentMouseX * 0.85;
    camera.position.y = currentCameraPos.y + currentMouseY * 0.55;
    camera.position.z = currentCameraPos.z;

    camera.lookAt(
      currentLookAt.x + currentMouseX * 0.35,
      currentLookAt.y + currentMouseY * 0.25,
      currentLookAt.z
    );

    // Update undulating terrain
    terrain.update(elapsedTime);

    // Update morphing constellations
    constellations.update(elapsedTime);

    // Update cosmic dust motes
    const dustPos = dustGeometry.attributes.position;
    for (let i = 0; i < COSMIC_DUST_COUNT; i++) {
      let py = dustPos.getY(i) + Math.sin(elapsedTime * 0.8 + i) * 0.003;
      let pz = dustPos.getZ(i) + 0.015;
      if (pz > 12) pz = -75;
      dustPos.setY(i, py);
      dustPos.setZ(i, pz);
    }
    dustPos.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // Mark initial active section in DOM
  const domSections = document.querySelectorAll('section[id]');
  if (domSections.length) {
    domSections[0].classList.add('is-active');
  }

  // Controller API attached to window
  const controller = {
    isReady: true,
    terrainMesh: terrain.mesh,
    getActiveSection: () => activeSection,
    getConstellationParticleCount: () => constellations.getParticleCount(),
    getCosmicDustCount: () => COSMIC_DUST_COUNT,
    getParallaxOffset: () => ({ x: currentMouseX, y: currentMouseY, targetX: targetMouseX, targetY: targetMouseY }),
    getCameraPosition: () => ({ x: camera.position.x, y: camera.position.y, z: camera.position.z }),
    getCurrentTheme: () => currentTheme,
    transitionToSection,
    getSectionPositions,
  };

  window.backgroundScene = controller;
  return controller;
}
