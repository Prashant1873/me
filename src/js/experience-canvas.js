/**
 * Experience 3D Canvas - Three.js Horizontal Spatial Timeline (Refactored)
 *
 * Implements:
 * - Prominent, thick 3D glowing energy conduit line spanning across left-to-right of page
 * - Strictly bounded linear Left-to-Right chronology (Reverse CV order: IQVIA -> Revolut -> Ketto -> Kalam Labs -> FAOUD)
 * - 3D Company Logo Medallions centered inside glowing celestial orbs, 100% upright in native aspect ratio
 * - Event-driven raycasting (pointermove & click, zero per-frame lag)
 * - Capped pixel ratio (1.5) for high performance
 */

import * as THREE from 'three';
import gsap from 'gsap';

// 5 Commercial roles spaced linearly on the horizontal X-axis (Reverse CV Order: Left = 2026 IQVIA -> Right = 2024 FAOUD)
export const MILESTONES = [
  { id: 'iqvia', company: 'IQVIA', x: -12.0, logoDark: './images/logos/IQVIA.png', logoLight: './images/logos/IQVIA.png', logo: './images/logos/IQVIA.png', logoW: 2.15, logoH: 0.40, color: 0x2962FF },
  { id: 'revolut', company: 'Revolut', x: -6.0, logoDark: './images/logos/revolut_white.png', logoLight: './images/logos/revolut_black.png', logo: './images/logos/revolut_white.png', logoW: 1.4, logoH: 1.4, color: 0x00D4FF },
  { id: 'ketto', company: 'Ketto.org', x: 0.0, logoDark: './images/logos/ketto_dark.png', logoLight: './images/logos/Ketto.png', logo: './images/logos/ketto_dark.png', logoW: 1.8, logoH: 0.86, color: 0x00A86B },
  { id: 'kalam-labs', company: 'Kalam Labs', x: 6.0, logoDark: './images/logos/kalamLabsLogo.png', logoLight: './images/logos/kalamLabsLogo_dark.png', logo: './images/logos/kalamLabsLogo.png', logoW: 1.5, logoH: 1.33, color: 0x7C3AED },
  { id: 'faoud', company: 'FAOUD', x: 12.0, logoDark: './images/logos/faoud_transparent.png', logoLight: './images/logos/faoud_dark.png', logo: './images/logos/faoud_transparent.png', logoW: 1.45, logoH: 1.47, color: 0xE8655A }
];

export const MILESTONE_X = MILESTONES.map(m => m.x);

const PALETTES = {
  dark: {
    activeAmber: 0xF59E0B,      // Radiant Tungsten Gold
    dustCyan: 0x4DD0E1,
    dustBlue: 0x2962FF,
    conduit: 0xF59E0B,
    beamCoreOpacity: 0.95,
    beamFlowOpacity: 0.55,
    glowBlending: THREE.AdditiveBlending,
    ringBlending: THREE.AdditiveBlending,
    ringActiveOpacity: 1.0,
    ringInactiveOpacity: 0.60,
    orbitRingActiveOpacity: 0.95,
    orbitRingInactiveOpacity: 0.50,
    haloActiveOpacity: 0.45,
    haloInactiveOpacity: 0.15,
    inactiveGhost: 0x334155,
    medallionRim: 0xF59E0B,
    medallionBack: 0x0E131F,    // Dark obsidian disc in dark mode
    medallionMetalness: 0.85,
    medallionRoughness: 0.3
  },
  light: {
    activeAmber: 0xD97706,      // Radiant Amber Gold
    dustCyan: 0x0891B2,
    dustBlue: 0x2563EB,
    conduit: 0xD97706,          // Radiant warm gold beam
    beamCoreOpacity: 0.95,
    beamFlowOpacity: 0.45,
    glowBlending: THREE.NormalBlending,
    ringBlending: THREE.NormalBlending,
    ringActiveOpacity: 1.0,
    ringInactiveOpacity: 0.75,  // Clearly visible rim
    orbitRingActiveOpacity: 0.95,
    orbitRingInactiveOpacity: 0.70, // High-contrast, clearly visible orbit rings for other companies
    haloActiveOpacity: 0.35,
    haloInactiveOpacity: 0.12,
    inactiveGhost: 0x64748B,
    medallionRim: 0xD97706,
    medallionBack: 0xFFFFFF,    // Pure white medallion disc in light mode
    medallionMetalness: 0.05,
    medallionRoughness: 0.15
  }
};

/**
 * Initialize Experience 3D Canvas
 * @param {HTMLElement} container - Canvas mounting element
 * @param {Object} options - Callbacks { onNodeClick: (index) => void }
 */
export function initExperienceCanvas(container, options = {}) {
  if (!container) return null;

  const onNodeClick = options.onNodeClick || (() => {});
  let width = container.clientWidth || 1000;
  let height = container.clientHeight || 215;

  let destroyed = false;
  let isIntersecting = true;
  let activeIndex = 0;

  // Parallax & Camera state
  let targetCameraX = MILESTONE_X[0];
  let currentCameraX = MILESTONE_X[0];
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  // 1. WebGL Renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // 2. Camera & Scene (Orthographic projection prevents tangential elliptical distortion at horizon ends)
  const scene = new THREE.Scene();
  const frustumHeight = 5.4;
  let frustumWidth = frustumHeight * (width / height);
  const camera = new THREE.OrthographicCamera(
    -frustumWidth / 2,
    frustumWidth / 2,
    frustumHeight / 2,
    -frustumHeight / 2,
    0.1,
    100
  );
  camera.position.set(currentCameraX, 0, 10);
  camera.lookAt(currentCameraX, 0, 0);

  // Balanced Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
  keyLight.position.set(5, 8, 10);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xC38B55, 1.3);
  fillLight.position.set(-5, -4, 6);
  scene.add(fillLight);

  function getThemePalette() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    return PALETTES[theme] || PALETTES.dark;
  }
  let colors = getThemePalette();

  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.95)');
    grad.addColorStop(0.65, 'rgba(255,255,255,0.4)');
    grad.addColorStop(0.9, 'rgba(255,255,255,0.08)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }
  const particleMap = createParticleTexture();

  function createCircleParticleGeo(radius, count, jitter = 0) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * jitter;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * jitter;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }

  // 3. 3D Horizontal Glowing Particle Conduit Beam (End-to-End Behind Logos)
  // A. Dense Core Particle Stream (2200 particles along X from -80 to +80)
  const beamCoreCount = 2200;
  const beamCorePositions = new Float32Array(beamCoreCount * 3);
  for (let i = 0; i < beamCoreCount; i++) {
    beamCorePositions[i * 3] = -80.0 + (i / beamCoreCount) * 160.0 + (Math.random() - 0.5) * 0.08;
    beamCorePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.06;
    beamCorePositions[i * 3 + 2] = -0.4 + (Math.random() - 0.5) * 0.06;
  }
  const beamCoreGeo = new THREE.BufferGeometry();
  beamCoreGeo.setAttribute('position', new THREE.BufferAttribute(beamCorePositions, 3));
  const beamCoreMat = new THREE.PointsMaterial({
    size: 0.28,
    color: colors.conduit,
    map: particleMap,
    transparent: true,
    opacity: colors.beamCoreOpacity,
    blending: colors.glowBlending,
    depthWrite: false
  });
  const beamCorePoints = new THREE.Points(beamCoreGeo, beamCoreMat);
  scene.add(beamCorePoints);

  // B. Radiant Shimmer Flow Stream (700 flowing particles with subtle wider dispersion)
  const beamFlowCount = 700;
  const beamFlowPositions = new Float32Array(beamFlowCount * 3);
  for (let i = 0; i < beamFlowCount; i++) {
    beamFlowPositions[i * 3] = -80.0 + Math.random() * 160.0;
    beamFlowPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.22;
    beamFlowPositions[i * 3 + 2] = -0.4 + (Math.random() - 0.5) * 0.18;
  }
  const beamFlowGeo = new THREE.BufferGeometry();
  beamFlowGeo.setAttribute('position', new THREE.BufferAttribute(beamFlowPositions, 3));
  const beamFlowMat = new THREE.PointsMaterial({
    size: 0.44,
    color: colors.activeAmber,
    map: particleMap,
    transparent: true,
    opacity: colors.beamFlowOpacity,
    blending: colors.glowBlending,
    depthWrite: false
  });
  const beamFlowPoints = new THREE.Points(beamFlowGeo, beamFlowMat);
  scene.add(beamFlowPoints);

  // 4. Subtle Cosmic Dust Motes (75 particles for zero lag)
  const dustCount = 75;
  const dustPositions = new Float32Array(dustCount * 3);
  const dustColors = new Float32Array(dustCount * 3);

  const cAmber = new THREE.Color(colors.activeAmber);
  const cCyan = new THREE.Color(colors.dustCyan);
  const cBlue = new THREE.Color(colors.dustBlue);

  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3] = -80.0 + Math.random() * 160.0;
    dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 1.8;
    dustPositions[i * 3 + 2] = -0.4 + (Math.random() - 0.5) * 1.2;

    const rnd = Math.random();
    const c = rnd < 0.35 ? cAmber : (rnd < 0.7 ? cCyan : cBlue);
    dustColors[i * 3] = c.r;
    dustColors[i * 3 + 1] = c.g;
    dustColors[i * 3 + 2] = c.b;
  }

  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

  const dustMat = new THREE.PointsMaterial({
    size: 0.14,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    map: particleMap,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const dustPoints = new THREE.Points(dustGeo, dustMat);
  scene.add(dustPoints);

  // 5. 3D Company Logo Medallions & Prominent Celestial Orbs
  const textureLoader = new THREE.TextureLoader();
  const milestoneNodes = [];
  const raycastObjects = [];

  // Scaled up prominent particle geometries
  const sharedRingGeo = createCircleParticleGeo(1.48, 160, 0.015);
  const sharedOrbitRingGeo = createCircleParticleGeo(1.82, 200, 0.025);
  const sharedBackGeo = new THREE.CylinderGeometry(1.35, 1.35, 0.1, 32);
  sharedBackGeo.rotateX(Math.PI / 2);
  const sharedHaloGeo = new THREE.PlaneGeometry(3.6, 3.6);
  const sharedHitGeo = new THREE.SphereGeometry(1.8, 16, 16);

  const isInitialLight = (document.documentElement.getAttribute('data-theme') || 'dark') === 'light';

  MILESTONES.forEach((milestone, idx) => {
    const nodeGroup = new THREE.Group();
    nodeGroup.position.set(milestone.x, 0, 0);

    // A. Outer Stationary Particle Rim
    const ringMat = new THREE.PointsMaterial({
      size: 0.24,
      map: particleMap,
      color: idx === activeIndex ? colors.activeAmber : milestone.color,
      transparent: true,
      opacity: idx === activeIndex ? colors.ringActiveOpacity : colors.ringInactiveOpacity,
      blending: colors.ringBlending,
      depthWrite: false
    });
    const ring = new THREE.Points(sharedRingGeo, ringMat);
    ring.position.z = 0.05;
    nodeGroup.add(ring);

    // B. Outer Orbiting Particle Ring (Continuously rotating 3D celestial orbit)
    const orbitRingMat = new THREE.PointsMaterial({
      size: 0.26,
      map: particleMap,
      color: colors.activeAmber,
      transparent: true,
      opacity: idx === activeIndex ? colors.orbitRingActiveOpacity : colors.orbitRingInactiveOpacity,
      blending: colors.ringBlending,
      depthWrite: false
    });
    const orbitRing = new THREE.Points(sharedOrbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = 0.45; // ~25° celestial inclination
    orbitRing.rotation.y = idx * 0.7; // Staggered phase per milestone
    nodeGroup.add(orbitRing);

    // C. Medallion Backing Disc (Pure white in light mode, dark obsidian in dark mode)
    const backMaterial = new THREE.MeshStandardMaterial({
      color: colors.medallionBack,
      metalness: colors.medallionMetalness,
      roughness: colors.medallionRoughness,
      transparent: true,
      opacity: 0.98
    });
    const backMesh = new THREE.Mesh(sharedBackGeo, backMaterial);
    nodeGroup.add(backMesh);

    // D. Front Logo Face (100% Upright Native Aspect Plane - No 90° Rotation!)
    const logoDarkTexture = textureLoader.load(milestone.logoDark || milestone.logo);
    logoDarkTexture.colorSpace = THREE.SRGBColorSpace;
    logoDarkTexture.generateMipmaps = true;
    logoDarkTexture.minFilter = THREE.LinearMipmapLinearFilter;
    logoDarkTexture.magFilter = THREE.LinearFilter;

    const logoLightTexture = textureLoader.load(milestone.logoLight || milestone.logo);
    logoLightTexture.colorSpace = THREE.SRGBColorSpace;
    logoLightTexture.generateMipmaps = true;
    logoLightTexture.minFilter = THREE.LinearMipmapLinearFilter;
    logoLightTexture.magFilter = THREE.LinearFilter;

    const currentLogoTexture = isInitialLight ? logoLightTexture : logoDarkTexture;

    // PlaneGeometry in XY plane naturally faces camera (+Z) with standard upright orientation
    const logoPlaneGeo = new THREE.PlaneGeometry(milestone.logoW, milestone.logoH);
    const logoMat = new THREE.MeshBasicMaterial({
      map: currentLogoTexture,
      transparent: true,
      opacity: 1.0,
      depthWrite: false
    });
    const logoMesh = new THREE.Mesh(logoPlaneGeo, logoMat);
    logoMesh.position.z = 0.065; // Sit slightly in front of medallion face
    nodeGroup.add(logoMesh);

    // E. Soft Halo Glow Mesh behind medallion
    const haloMat = new THREE.MeshBasicMaterial({
      map: particleMap,
      color: idx === activeIndex ? colors.activeAmber : milestone.color,
      transparent: true,
      opacity: idx === activeIndex ? colors.haloActiveOpacity : colors.haloInactiveOpacity,
      blending: colors.ringBlending,
      depthWrite: false
    });
    const halo = new THREE.Mesh(sharedHaloGeo, haloMat);
    halo.position.z = -0.08;
    nodeGroup.add(halo);

    // F. Invisible Hit Sphere for Raycasting
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitSphere = new THREE.Mesh(sharedHitGeo, hitMat);
    hitSphere.userData = { milestoneIndex: idx };
    nodeGroup.add(hitSphere);
    raycastObjects.push(hitSphere);

    // Initial scale (selected orb significantly larger for clear emphasis)
    const initScale = idx === activeIndex ? 1.28 : 0.88;
    nodeGroup.scale.set(initScale, initScale, initScale);

    scene.add(nodeGroup);

    milestoneNodes.push({
      group: nodeGroup,
      ring,
      orbitRing,
      backMesh,
      backMaterial,
      logoMesh,
      logoMat,
      logoDarkTexture,
      logoLightTexture,
      halo,
      hit: hitSphere,
      data: milestone
    });
  });

  // 6. Event-Driven Raycasting (Zero Per-Frame Raycasting Overhead)
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(-999, -999);
  let hoveredIndex = -1;

  function updateHoverState() {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(raycastObjects);

    if (intersects.length > 0) {
      const hitIdx = intersects[0].object.userData.milestoneIndex;
      if (hitIdx !== hoveredIndex) {
        hoveredIndex = hitIdx;
        renderer.domElement.style.cursor = 'pointer';
        gsap.to(milestoneNodes[hitIdx].group.scale, {
          x: hitIdx === activeIndex ? 1.34 : 0.98,
          y: hitIdx === activeIndex ? 1.34 : 0.98,
          z: hitIdx === activeIndex ? 1.34 : 0.98,
          duration: 0.18,
          overwrite: 'auto'
        });
      }
    } else if (hoveredIndex !== -1) {
      const prevIdx = hoveredIndex;
      hoveredIndex = -1;
      renderer.domElement.style.cursor = 'default';
      if (milestoneNodes[prevIdx]) {
        const isAct = prevIdx === activeIndex;
        gsap.to(milestoneNodes[prevIdx].group.scale, {
          x: isAct ? 1.28 : 0.88,
          y: isAct ? 1.28 : 0.88,
          z: isAct ? 1.28 : 0.88,
          duration: 0.18,
          overwrite: 'auto'
        });
      }
    }
  }

  function onPointerMove(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    targetMouseX = pointer.x;
    targetMouseY = pointer.y;

    updateHoverState();
  }

  function onPointerLeave() {
    pointer.x = -999;
    pointer.y = -999;
    targetMouseX = 0;
    targetMouseY = 0;
    updateHoverState();
  }

  function onClick(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const clickPointer = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    raycaster.setFromCamera(clickPointer, camera);
    const intersects = raycaster.intersectObjects(raycastObjects);
    if (intersects.length > 0) {
      const idx = intersects[0].object.userData.milestoneIndex;
      onNodeClick(idx);
    }
  }

  renderer.domElement.addEventListener('pointermove', onPointerMove, { passive: true });
  renderer.domElement.addEventListener('pointerleave', onPointerLeave, { passive: true });
  renderer.domElement.addEventListener('click', onClick);

  // 7. Navigation Focus & Linear X-Dolly
  function focusNode(index, duration = 0.5) {
    if (index < 0 || index >= MILESTONES.length) return;
    activeIndex = index;
    targetCameraX = MILESTONES[index].x;

    // Smooth camera translation on the X-axis
    gsap.to(camera.position, {
      x: targetCameraX,
      duration,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    // Update node visual emphasis
    milestoneNodes.forEach((node, k) => {
      const isActive = k === index;
      const targetScale = isActive ? 1.28 : 0.88;

      gsap.to(node.group.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      const ringCol = isActive ? colors.activeAmber : node.data.color;
      node.ring.material.color.setHex(ringCol);
      node.halo.material.color.setHex(ringCol);

      gsap.to(node.ring.material, {
        opacity: isActive ? colors.ringActiveOpacity : colors.ringInactiveOpacity,
        duration: 0.25,
        overwrite: 'auto'
      });
      gsap.to(node.orbitRing.material, {
        opacity: isActive ? colors.orbitRingActiveOpacity : colors.orbitRingInactiveOpacity,
        duration: 0.25,
        overwrite: 'auto'
      });
      gsap.to(node.halo.material, {
        opacity: isActive ? colors.haloActiveOpacity : colors.haloInactiveOpacity,
        duration: 0.25,
        overwrite: 'auto'
      });
    });
  }

  function scrubTo(progress) {
    const clamped = Math.max(0, Math.min(1, progress));
    const startX = MILESTONE_X[0];
    const endX = MILESTONE_X[MILESTONE_X.length - 1];
    targetCameraX = startX + clamped * (endX - startX);
    camera.position.x = targetCameraX;
  }

  // 8. Theme Reactivity
  function updateThemeColors() {
    colors = getThemePalette();
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    beamCoreMat.color.setHex(colors.conduit);
    beamCoreMat.opacity = colors.beamCoreOpacity;
    beamCoreMat.blending = colors.glowBlending;
    beamCoreMat.needsUpdate = true;

    beamFlowMat.color.setHex(colors.activeAmber);
    beamFlowMat.opacity = colors.beamFlowOpacity;
    beamFlowMat.blending = colors.glowBlending;
    beamFlowMat.needsUpdate = true;

    milestoneNodes.forEach((node, k) => {
      const isActive = k === activeIndex;
      const ringCol = isActive ? colors.activeAmber : node.data.color;

      node.ring.material.color.setHex(ringCol);
      node.ring.material.blending = colors.ringBlending;
      node.ring.material.opacity = isActive ? colors.ringActiveOpacity : colors.ringInactiveOpacity;
      node.ring.material.needsUpdate = true;

      node.orbitRing.material.color.setHex(colors.activeAmber);
      node.orbitRing.material.blending = colors.ringBlending;
      node.orbitRing.material.opacity = isActive ? colors.orbitRingActiveOpacity : colors.orbitRingInactiveOpacity;
      node.orbitRing.material.needsUpdate = true;

      node.backMaterial.color.setHex(colors.medallionBack);
      node.backMaterial.metalness = colors.medallionMetalness;
      node.backMaterial.roughness = colors.medallionRoughness;

      // Swap to black Revolut / dark logos in light mode, and white in dark mode
      node.logoMat.map = isLight ? node.logoLightTexture : node.logoDarkTexture;
      node.logoMat.needsUpdate = true;

      node.halo.material.color.setHex(ringCol);
      node.halo.material.blending = colors.ringBlending;
      node.halo.material.opacity = isActive ? colors.haloActiveOpacity : colors.haloInactiveOpacity;
      node.halo.material.needsUpdate = true;
    });
  }

  const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.attributeName === 'data-theme') {
        updateThemeColors();
      }
    });
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // 9. Viewport Resize & IntersectionObserver
  function onResize() {
    if (!container || destroyed) return;
    width = container.clientWidth || 1000;
    height = container.clientHeight || 215;
    frustumWidth = frustumHeight * (width / height);
    camera.left = -frustumWidth / 2;
    camera.right = frustumWidth / 2;
    camera.top = frustumHeight / 2;
    camera.bottom = -frustumHeight / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  const resizeObserver = new ResizeObserver(() => onResize());
  resizeObserver.observe(container);

  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isIntersecting = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  intersectionObserver.observe(container);

  // 10. Render Loop
  let animationFrameId = null;
  let clock = new THREE.Clock();

  function animate() {
    if (destroyed) return;

    if (isIntersecting) {
      const elapsedTime = clock.getElapsedTime();

      // Smooth horizontal mouse parallax damping only (Y is strictly locked)
      mouseX += (targetMouseX - mouseX) * 0.05;

      camera.position.y = 0;
      camera.lookAt(camera.position.x, 0, 0);

      // Horizontal floating tilt on nodes (Y is strictly fixed)
      milestoneNodes.forEach((node, k) => {
        node.group.position.y = 0;
        node.group.rotation.y = Math.sin(elapsedTime * 0.7 + k) * 0.05 + mouseX * 0.08;
        node.group.rotation.x = 0;
        node.ring.rotation.z += 0.003;
        // Ring itself rotates throughout continuously in 3D
        node.orbitRing.rotation.y += 0.008;
      });

      // Continuous particle conduit energy flow along X
      const bCoreArr = beamCoreGeo.attributes.position.array;
      for (let i = 0; i < beamCoreCount; i++) {
        bCoreArr[i * 3] += 0.04;
        if (bCoreArr[i * 3] > 80.0) bCoreArr[i * 3] -= 160.0;
      }
      beamCoreGeo.attributes.position.needsUpdate = true;

      const bFlowArr = beamFlowGeo.attributes.position.array;
      for (let i = 0; i < beamFlowCount; i++) {
        bFlowArr[i * 3] += 0.02;
        if (bFlowArr[i * 3] > 80.0) bFlowArr[i * 3] -= 160.0;
      }
      beamFlowGeo.attributes.position.needsUpdate = true;

      // Subtle particle drift
      dustPoints.rotation.y = Math.sin(elapsedTime * 0.1) * 0.03;

      renderer.render(scene, camera);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  // 11. Cleanup & Disposal
  function dispose() {
    destroyed = true;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    themeObserver.disconnect();
    intersectionObserver.disconnect();
    resizeObserver.disconnect();

    renderer.domElement.removeEventListener('pointermove', onPointerMove);
    renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
    renderer.domElement.removeEventListener('click', onClick);

    beamCoreGeo.dispose();
    beamCoreMat.dispose();
    beamFlowGeo.dispose();
    beamFlowMat.dispose();
    dustGeo.dispose();
    dustMat.dispose();
    particleMap.dispose();
    sharedRingGeo.dispose();
    sharedOrbitRingGeo.dispose();
    sharedBackGeo.dispose();
    sharedHaloGeo.dispose();
    sharedHitGeo.dispose();

    milestoneNodes.forEach((node) => {
      node.ring.material.dispose();
      node.orbitRing.material.dispose();
      node.backMesh.material.dispose();
      node.logoMesh.geometry.dispose();
      if (node.logoDarkTexture) node.logoDarkTexture.dispose();
      if (node.logoLightTexture) node.logoLightTexture.dispose();
      node.logoMat.dispose();
      node.halo.material.dispose();
      node.hit.material.dispose();
    });

    renderer.dispose();
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }

  return {
    scrubTo,
    focusNode,
    dispose,
    MILESTONES,
    MILESTONE_X
  };
}
