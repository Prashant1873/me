/**
 * Experience 3D Canvas — Three.js Horizontal Spatial Timeline
 *
 * Implements:
 * - Horizontal X-axis linear traversal connecting all 5 roles from left end to right end of page
 * - Strictly bounded linear Left-to-Right chronology (Option B: Reverse CV order: IQVIA -> Revolut -> Ketto -> Kalam Labs -> FAOUD)
 * - 3D Company Logo Medallions centered inside each glowing celestial orb with metallic rim lighting
 * - Connecting cosmic energy conduit line with drifting dust motes across the entire X span
 * - Dynamic category filtering (dim inactive nodes to 15%, 400ms bloom restoration)
 * - Pointer parallax tracking and Three.js Raycaster hit-testing for click-to-travel
 * - 60fps performance budget with IntersectionObserver pausing and capped pixel ratio
 */

import * as THREE from 'three';
import gsap from 'gsap';

// 5 Commercial roles spaced linearly on the horizontal X-axis (Reverse CV Order: Left = 2026 IQVIA -> Right = 2024 FAOUD)
export const MILESTONES = [
  { id: 'iqvia', company: 'IQVIA', x: -12.0, logo: './images/logos/IQVIA.png', category: 'strategy', color: 0x2962FF },
  { id: 'revolut', company: 'Revolut', x: -6.0, logo: './images/logos/revolut_white.png', logoDark: './images/logos/revolut_dark.png', category: 'strategy', color: 0x00D4FF },
  { id: 'ketto', company: 'Ketto.org', x: 0.0, logo: './images/logos/ketto_dark.png', category: 'product', color: 0x00A86B },
  { id: 'kalam-labs', company: 'Kalam Labs', x: 6.0, logo: './images/logos/kalamLabsLogo.png', category: 'product', color: 0x7C3AED },
  { id: 'faoud', company: 'FAOUD', x: 12.0, logo: './images/logos/faoud_transparent.png', category: 'product', color: 0xE8655A }
];

export const MILESTONE_X = MILESTONES.map(m => m.x);

const PALETTES = {
  dark: {
    activeAmber: 0xC38B55,      // Tungsten Amber
    dustCyan: 0x4DD0E1,
    dustBlue: 0x2962FF,
    conduit: 0xC38B55,
    inactiveGhost: 0x334155,
    medallionRim: 0xC38B55,
    medallionBack: 0x111625
  },
  light: {
    activeAmber: 0xA87038,
    dustCyan: 0x00838F,
    dustBlue: 0x1948D1,
    conduit: 0xA87038,
    inactiveGhost: 0xCBD5E1,
    medallionRim: 0xA87038,
    medallionBack: 0xE2E8F0
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
  let height = container.clientHeight || 200;

  let destroyed = false;
  let isIntersecting = true;
  let activeIndex = 0;
  let activeIndices = [0, 1, 2, 3, 4];
  let currentCategory = 'all';

  // Parallax & Camera state
  let targetCameraX = MILESTONE_X[0];
  let currentCameraX = MILESTONE_X[0];
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  // 1. WebGL Renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // 2. Camera & Scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(currentCameraX, 0, 7.8);
  camera.lookAt(currentCameraX, 0, 0);

  // Lighting for metallic medallions
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
  keyLight.position.set(5, 8, 10);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xC38B55, 1.4);
  fillLight.position.set(-5, -4, 6);
  scene.add(fillLight);

  function getThemePalette() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    return PALETTES[theme] || PALETTES.dark;
  }
  let colors = getThemePalette();

  // 3. Horizontal Conduit Line (Connecting Chain from left to right)
  const linePoints = [];
  const lineResolution = 64;
  for (let i = 0; i <= lineResolution; i++) {
    const t = i / lineResolution;
    const lx = -16.0 + t * 32.0;
    linePoints.push(new THREE.Vector3(lx, 0, 0));
  }
  const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
  const lineMat = new THREE.LineBasicMaterial({
    color: colors.conduit,
    transparent: true,
    opacity: 0.45,
    linewidth: 2
  });
  const conduitLine = new THREE.Line(lineGeo, lineMat);
  scene.add(conduitLine);

  // 4. Drifting Cosmic Dust Motes Along Horizontal Chain (300 particles)
  const dustCount = 300;
  const dustPositions = new Float32Array(dustCount * 3);
  const dustColors = new Float32Array(dustCount * 3);
  const dustSizes = new Float32Array(dustCount);

  const cAmber = new THREE.Color(colors.activeAmber);
  const cCyan = new THREE.Color(colors.dustCyan);
  const cBlue = new THREE.Color(colors.dustBlue);

  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3] = -18.0 + Math.random() * 36.0;
    dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 1.8;
    dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

    const rnd = Math.random();
    const c = rnd < 0.35 ? cAmber : (rnd < 0.7 ? cCyan : cBlue);
    dustColors[i * 3] = c.r;
    dustColors[i * 3 + 1] = c.g;
    dustColors[i * 3 + 2] = c.b;

    dustSizes[i] = 2.0 + Math.random() * 3.0;
  }

  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));
  dustGeo.setAttribute('size', new THREE.BufferAttribute(dustSizes, 1));

  // Canvas texture for smooth glowing circular dust particles
  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.7)');
    grad.addColorStop(0.8, 'rgba(255,255,255,0.15)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }
  const particleMap = createParticleTexture();

  const dustMat = new THREE.PointsMaterial({
    size: 0.16,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    map: particleMap,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const dustPoints = new THREE.Points(dustGeo, dustMat);
  scene.add(dustPoints);

  // 5. 3D Company Logo Medallions & Celestial Orbs
  const textureLoader = new THREE.TextureLoader();
  const milestoneNodes = [];
  const raycastObjects = [];

  MILESTONES.forEach((milestone, idx) => {
    const nodeGroup = new THREE.Group();
    nodeGroup.position.set(milestone.x, 0, 0);

    // A. Outer Glowing Ring / Halo
    const ringGeo = new THREE.TorusGeometry(1.4, 0.035, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: idx === activeIndex ? colors.activeAmber : milestone.color,
      transparent: true,
      opacity: idx === activeIndex ? 0.9 : 0.45,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    nodeGroup.add(ring);

    // B. Outer Orbiting Ring
    const orbitRingGeo = new THREE.TorusGeometry(1.65, 0.02, 16, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: colors.activeAmber,
      transparent: true,
      opacity: idx === activeIndex ? 0.7 : 0.2,
      blending: THREE.AdditiveBlending
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI * 0.25;
    nodeGroup.add(orbitRing);

    // C. 3D Medallion Disc with Centered Company Logo
    const discRadius = 1.1;
    const discThickness = 0.14;
    const discGeo = new THREE.CylinderGeometry(discRadius, discRadius, discThickness, 32);
    discGeo.rotateX(Math.PI / 2); // Face forward towards camera

    // Load company logo
    const logoTexture = textureLoader.load(milestone.logo);
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.minFilter = THREE.LinearFilter;
    logoTexture.magFilter = THREE.LinearFilter;

    // Medallion materials: rim, front face with logo, back face
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: idx === activeIndex ? colors.activeAmber : 0x475569,
      metalness: 0.85,
      roughness: 0.2,
      transparent: true,
      opacity: 0.95
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      map: logoTexture,
      transparent: true,
      roughness: 0.3,
      metalness: 0.1,
      opacity: 1.0
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      color: colors.medallionBack,
      metalness: 0.9,
      roughness: 0.3,
      transparent: true,
      opacity: 0.9
    });

    // Multi-material for cylinder: [side/rim, top/front, bottom/back]
    const medallionMesh = new THREE.Mesh(discGeo, [rimMaterial, frontMaterial, backMaterial]);
    nodeGroup.add(medallionMesh);

    // D. Soft Halo Glow Mesh behind medallion
    const haloGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const haloMat = new THREE.MeshBasicMaterial({
      map: particleMap,
      color: idx === activeIndex ? colors.activeAmber : milestone.color,
      transparent: true,
      opacity: idx === activeIndex ? 0.6 : 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.z = -0.1;
    nodeGroup.add(halo);

    // E. Invisible Hit Sphere for Raycasting
    const hitGeo = new THREE.SphereGeometry(1.6, 16, 16);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitSphere = new THREE.Mesh(hitGeo, hitMat);
    hitSphere.userData = { milestoneIndex: idx };
    nodeGroup.add(hitSphere);
    raycastObjects.push(hitSphere);

    // Initial scaling
    if (idx === activeIndex) {
      nodeGroup.scale.set(1.15, 1.15, 1.15);
    } else {
      nodeGroup.scale.set(0.95, 0.95, 0.95);
    }

    scene.add(nodeGroup);

    milestoneNodes.push({
      group: nodeGroup,
      ring,
      orbitRing,
      medallion: medallionMesh,
      rimMaterial,
      frontMaterial,
      halo,
      hit: hitSphere,
      data: milestone
    });
  });

  // 6. Raycasting Setup
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(-999, -999);
  let hoveredIndex = -1;

  function onPointerMove(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    targetMouseX = pointer.x;
    targetMouseY = pointer.y;
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
      if (activeIndices.includes(idx)) {
        onNodeClick(idx);
      }
    }
  }

  renderer.domElement.addEventListener('pointermove', onPointerMove, { passive: true });
  renderer.domElement.addEventListener('click', onClick);

  // 7. Navigation Focus & Linear X-Dolly
  function focusNode(index, duration = 0.6) {
    if (index < 0 || index >= MILESTONES.length) return;
    activeIndex = index;
    targetCameraX = MILESTONES[index].x;

    // Smooth camera translation on the X-axis
    gsap.to(camera.position, {
      x: targetCameraX,
      duration,
      ease: 'power2.out'
    });

    // Update node visual emphasis
    milestoneNodes.forEach((node, k) => {
      const isActive = k === index;
      const isFilteredActive = activeIndices.includes(k);

      const targetScale = isActive ? 1.15 : (isFilteredActive ? 0.95 : 0.85);
      gsap.to(node.group.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 0.4,
        ease: 'power2.out'
      });

      // Update ring and halo glow
      const ringCol = isActive ? colors.activeAmber : node.data.color;
      node.ring.material.color.setHex(ringCol);
      node.halo.material.color.setHex(ringCol);

      gsap.to(node.ring.material, {
        opacity: isActive ? 0.95 : (isFilteredActive ? 0.45 : 0.12),
        duration: 0.3
      });
      gsap.to(node.orbitRing.material, {
        opacity: isActive ? 0.75 : (isFilteredActive ? 0.2 : 0.05),
        duration: 0.3
      });
      gsap.to(node.halo.material, {
        opacity: isActive ? 0.65 : (isFilteredActive ? 0.2 : 0.05),
        duration: 0.3
      });
      gsap.to(node.rimMaterial, {
        opacity: isFilteredActive ? 0.95 : 0.15,
        duration: 0.3
      });
      gsap.to(node.frontMaterial, {
        opacity: isFilteredActive ? 1.0 : 0.15,
        duration: 0.3
      });
    });
  }

  // Linear scrubTo mapping progress (0.0 to 1.0) along X-axis
  function scrubTo(progress) {
    const clamped = Math.max(0, Math.min(1, progress));
    const startX = MILESTONE_X[0];
    const endX = MILESTONE_X[MILESTONE_X.length - 1];
    targetCameraX = startX + clamped * (endX - startX);
    camera.position.x = targetCameraX;
  }

  // 8. Category Filter Handler (Dim inactive nodes to 15%, 400ms bloom restoration)
  function setCategoryFilter(catId, indices) {
    currentCategory = catId;
    activeIndices = indices && indices.length > 0 ? indices : [0, 1, 2, 3, 4];

    milestoneNodes.forEach((node, k) => {
      const isIncluded = activeIndices.includes(k);
      const isCurrentActive = k === activeIndex;

      if (catId === 'all') {
        // Smooth 400ms bloom back to full brilliance
        gsap.to(node.group.scale, {
          x: isCurrentActive ? 1.15 : 0.95,
          y: isCurrentActive ? 1.15 : 0.95,
          z: isCurrentActive ? 1.15 : 0.95,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(node.frontMaterial, { opacity: 1.0, duration: 0.4 });
        gsap.to(node.rimMaterial, { opacity: 0.95, duration: 0.4 });
        gsap.to(node.ring.material, { opacity: isCurrentActive ? 0.95 : 0.45, duration: 0.4 });
        gsap.to(node.orbitRing.material, { opacity: isCurrentActive ? 0.75 : 0.2, duration: 0.4 });
        gsap.to(node.halo.material, { opacity: isCurrentActive ? 0.65 : 0.2, duration: 0.4 });
      } else {
        // Dim non-matching nodes to 15% opacity
        const targetOpacity = isIncluded ? 1.0 : 0.15;
        const targetScale = isIncluded ? (isCurrentActive ? 1.15 : 0.95) : 0.85;

        gsap.to(node.group.scale, {
          x: targetScale,
          y: targetScale,
          z: targetScale,
          duration: 0.35,
          ease: 'power2.out'
        });
        gsap.to(node.frontMaterial, { opacity: targetOpacity, duration: 0.35 });
        gsap.to(node.rimMaterial, { opacity: targetOpacity * 0.95, duration: 0.35 });
        gsap.to(node.ring.material, { opacity: isIncluded ? (isCurrentActive ? 0.95 : 0.45) : 0.1, duration: 0.35 });
        gsap.to(node.orbitRing.material, { opacity: isIncluded ? (isCurrentActive ? 0.75 : 0.2) : 0.05, duration: 0.35 });
        gsap.to(node.halo.material, { opacity: isIncluded ? (isCurrentActive ? 0.65 : 0.2) : 0.04, duration: 0.35 });
      }
    });

    // If activeIndex is not in activeIndices, slide to first valid index
    if (!activeIndices.includes(activeIndex) && activeIndices.length > 0) {
      focusNode(activeIndices[0]);
    }
  }

  // 9. Theme Reactivity
  function updateThemeColors() {
    colors = getThemePalette();
    lineMat.color.setHex(colors.conduit);

    milestoneNodes.forEach((node, k) => {
      const isActive = k === activeIndex;
      node.ring.material.color.setHex(isActive ? colors.activeAmber : node.data.color);
      node.halo.material.color.setHex(isActive ? colors.activeAmber : node.data.color);
      node.orbitRing.material.color.setHex(colors.activeAmber);
      node.rimMaterial.color.setHex(isActive ? colors.activeAmber : 0x475569);
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

  // 10. Viewport Resize & IntersectionObserver
  function onResize() {
    if (!container || destroyed) return;
    width = container.clientWidth || 1000;
    height = container.clientHeight || 200;
    camera.aspect = width / height;
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

  // 11. Render Loop
  let animationFrameId = null;
  let clock = new THREE.Clock();

  function animate() {
    if (destroyed) return;

    if (isIntersecting) {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Subtle camera parallax tilt
      camera.position.y = mouseY * 0.35;
      camera.lookAt(camera.position.x, 0, 0);

      // Gentle rotation & floating tilt on medallions
      milestoneNodes.forEach((node, k) => {
        // Medallion tilts subtly with mouse and time
        node.medallion.rotation.y = Math.sin(elapsedTime * 0.8 + k) * 0.12 + mouseX * 0.18;
        node.medallion.rotation.x = Math.cos(elapsedTime * 0.6 + k) * 0.08 - mouseY * 0.12;

        // Outer rings spin slowly
        node.ring.rotation.z += 0.004;
        node.orbitRing.rotation.y += 0.006;
      });

      // Drifting cosmic dust
      dustPoints.rotation.y = Math.sin(elapsedTime * 0.15) * 0.04;

      // Raycasting hover check
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(raycastObjects);

      if (intersects.length > 0) {
        const hitIdx = intersects[0].object.userData.milestoneIndex;
        if (hitIdx !== hoveredIndex && activeIndices.includes(hitIdx)) {
          hoveredIndex = hitIdx;
          renderer.domElement.style.cursor = 'pointer';
          gsap.to(milestoneNodes[hitIdx].group.scale, {
            x: hitIdx === activeIndex ? 1.25 : 1.05,
            y: hitIdx === activeIndex ? 1.25 : 1.05,
            z: hitIdx === activeIndex ? 1.25 : 1.05,
            duration: 0.2
          });
        }
      } else if (hoveredIndex !== -1) {
        const prevIdx = hoveredIndex;
        hoveredIndex = -1;
        renderer.domElement.style.cursor = 'default';
        if (milestoneNodes[prevIdx]) {
          const isAct = prevIdx === activeIndex;
          gsap.to(milestoneNodes[prevIdx].group.scale, {
            x: isAct ? 1.15 : 0.95,
            y: isAct ? 1.15 : 0.95,
            z: isAct ? 1.15 : 0.95,
            duration: 0.2
          });
        }
      }

      renderer.render(scene, camera);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  // 12. Cleanup & Disposal
  function dispose() {
    destroyed = true;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    themeObserver.disconnect();
    intersectionObserver.disconnect();
    resizeObserver.disconnect();

    renderer.domElement.removeEventListener('pointermove', onPointerMove);
    renderer.domElement.removeEventListener('click', onClick);

    lineGeo.dispose();
    lineMat.dispose();
    dustGeo.dispose();
    dustMat.dispose();
    particleMap.dispose();

    milestoneNodes.forEach((node) => {
      node.ring.geometry.dispose();
      node.ring.material.dispose();
      node.orbitRing.geometry.dispose();
      node.orbitRing.material.dispose();
      node.medallion.geometry.dispose();
      if (Array.isArray(node.medallion.material)) {
        node.medallion.material.forEach(m => {
          if (m.map) m.map.dispose();
          m.dispose();
        });
      }
      node.halo.geometry.dispose();
      node.halo.material.dispose();
      node.hit.geometry.dispose();
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
    setCategoryFilter,
    dispose,
    MILESTONES,
    MILESTONE_X
  };
}
