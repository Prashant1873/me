import * as THREE from 'three';
import gsap from 'gsap';

export const PARTICLE_COUNT = 600;

// Dynamic circular point texture generator
function createPointTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  gradient.addColorStop(0.3, 'rgba(100, 200, 255, 0.85)');
  gradient.addColorStop(0.7, 'rgba(41, 98, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * 0. Hero: Aerospace Orbital Command
 * Spherical nucleus + 2 tilted elliptical orbital rings
 */
/**
 * 0. Hero: Aerospace Orbital Command
 * Spherical nucleus + 2 tilted elliptical orbital rings
 * Centered around the polygon located on the right side of the hero section
 */
export function generateHeroPositions(center = { x: 3.25, y: -0.23, z: 0 }) {
  const cx = center && center.x !== undefined ? center.x : 3.25;
  const cy = center && center.y !== undefined ? center.y : -0.23;
  const cz = center && center.z !== undefined ? center.z : 0;

  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const nucleusCount = 200;
  const ring1Count = 200;
  const ring2Count = 200;

  // Nucleus core (0 to 199)
  for (let i = 0; i < nucleusCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * 0.95;

    positions[i * 3] = cx + r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = cy + r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = cz + r * Math.cos(phi);
  }

  // Inner tilted ring (200 to 399)
  const tilt1 = 0.55; // ~31 deg
  for (let i = 0; i < ring1Count; i++) {
    const idx = nucleusCount + i;
    const angle = (i / ring1Count) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
    const radius = 2.0 + (Math.random() - 0.5) * 0.35;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * Math.cos(tilt1) + (Math.random() - 0.5) * 0.15;
    const z = Math.sin(angle) * radius * Math.sin(tilt1) + (Math.random() - 0.5) * 0.15;

    positions[idx * 3] = cx + x;
    positions[idx * 3 + 1] = cy + y;
    positions[idx * 3 + 2] = cz + z;
  }

  // Outer eccentric ring (400 to 599)
  const tilt2 = -0.72; // ~-41 deg
  for (let i = 0; i < ring2Count; i++) {
    const idx = nucleusCount + ring1Count + i;
    const angle = (i / ring2Count) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
    const radius = 3.2 + (Math.random() - 0.5) * 0.45;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * Math.cos(tilt2) + (Math.random() - 0.5) * 0.18;
    const z = Math.sin(angle) * radius * Math.sin(tilt2) + (Math.random() - 0.5) * 0.18;

    positions[idx * 3] = cx + x;
    positions[idx * 3 + 1] = cy + y;
    positions[idx * 3 + 2] = cz + z;
  }

  return positions;
}

/**
 * 1. Experience: Career Conduit Spine
 * Longitudinal sine conduit + 5 milestone nodal spheres
 */
export function generateExperiencePositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const conduitCount = 300;
  const nodesCount = 300;
  const nodeCenters = [-3.2, -1.6, 0.0, 1.6, 3.2];
  const zOffset = -16.0;

  // Conduit spline (0 to 299)
  for (let i = 0; i < conduitCount; i++) {
    const t = (i / conduitCount) * 2 - 1; // -1 to 1
    const x = t * 4.2;
    const y = Math.sin(t * Math.PI * 2) * 0.9 + (Math.random() - 0.5) * 0.25;
    const z = zOffset + Math.cos(t * Math.PI * 2) * 0.8 + (Math.random() - 0.5) * 0.25;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y + 0.8;
    positions[i * 3 + 2] = z;
  }

  // 5 Nodal milestone spheres (300 to 599)
  const perNode = Math.floor(nodesCount / nodeCenters.length);
  for (let n = 0; n < nodeCenters.length; n++) {
    const cx = nodeCenters[n];
    const cy = 0.8 + Math.sin((cx / 4.2) * Math.PI) * 0.9;
    const cz = zOffset;

    for (let j = 0; j < perNode; j++) {
      const idx = conduitCount + n * perNode + j;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 0.55;

      positions[idx * 3] = cx + r * Math.sin(phi) * Math.cos(theta);
      positions[idx * 3 + 1] = cy + r * Math.sin(phi) * Math.sin(theta);
      positions[idx * 3 + 2] = cz + r * Math.cos(phi);
    }
  }

  return positions;
}

/**
 * 2. Projects: Modular 3D Voxel Matrix
 * Volumetric lattice cube with structured engineering nodes
 */
export function generateProjectsPositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const zOffset = -32.0;
  const steps = 6;
  const stepSize = 0.85;

  let current = 0;
  for (let x = 0; x < steps; x++) {
    for (let y = 0; y < steps; y++) {
      for (let z = 0; z < steps; z++) {
        if (current >= PARTICLE_COUNT) break;
        // Keep outer shell or selective lattice ribs
        const isShell = x === 0 || x === steps - 1 || y === 0 || y === steps - 1 || z === 0 || z === steps - 1;
        const isCore = Math.abs(x - 2.5) < 1 && Math.abs(y - 2.5) < 1 && Math.abs(z - 2.5) < 1;

        if (isShell || isCore || current < 216) {
          positions[current * 3] = (x - (steps - 1) / 2) * stepSize + (Math.random() - 0.5) * 0.08;
          positions[current * 3 + 1] = 1.2 + (y - (steps - 1) / 2) * stepSize + (Math.random() - 0.5) * 0.08;
          positions[current * 3 + 2] = zOffset + (z - (steps - 1) / 2) * stepSize + (Math.random() - 0.5) * 0.08;
          current++;
        }
      }
    }
  }

  // Fill remaining particles if lattice ran short
  while (current < PARTICLE_COUNT) {
    const rx = (Math.random() - 0.5) * steps * stepSize;
    const ry = (Math.random() - 0.5) * steps * stepSize;
    const rz = (Math.random() - 0.5) * steps * stepSize;
    positions[current * 3] = rx;
    positions[current * 3 + 1] = 1.2 + ry;
    positions[current * 3 + 2] = zOffset + rz;
    current++;
  }

  return positions;
}

/**
 * 3. Education: Crystalline Stellated Octahedron
 * Academic & aerospace geometric facets radiating outward
 */
export function generateEducationPositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const zOffset = -48.0;

  // 6 Primary Octahedral Vertices
  const vertices = [
    [0, 2.4, 0],
    [0, -2.4, 0],
    [2.4, 0, 0],
    [-2.4, 0, 0],
    [0, 0, 2.4],
    [0, 0, -2.4],
  ];

  // 12 Edges connecting vertices
  const edges = [
    [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [1, 3], [1, 4], [1, 5],
    [2, 4], [4, 3], [3, 5], [5, 2],
  ];

  const perEdge = 30; // 12 * 30 = 360 particles along edges
  let idx = 0;

  for (let e = 0; e < edges.length; e++) {
    const [v1, v2] = edges[e];
    const p1 = vertices[v1];
    const p2 = vertices[v2];

    for (let k = 0; k < perEdge; k++) {
      const t = k / perEdge;
      positions[idx * 3] = p1[0] + (p2[0] - p1[0]) * t + (Math.random() - 0.5) * 0.1;
      positions[idx * 3 + 1] = 1.0 + (p1[1] + (p2[1] - p1[1]) * t) + (Math.random() - 0.5) * 0.1;
      positions[idx * 3 + 2] = zOffset + (p1[2] + (p2[2] - p1[2]) * t) + (Math.random() - 0.5) * 0.1;
      idx++;
    }
  }

  // Remaining 240 particles radiate inside the stellar core
  while (idx < PARTICLE_COUNT) {
    const r = Math.pow(Math.random(), 0.5) * 1.3;
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);

    positions[idx * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[idx * 3 + 1] = 1.0 + r * Math.sin(phi) * Math.sin(theta);
    positions[idx * 3 + 2] = zOffset + r * Math.cos(phi);
    idx++;
  }

  return positions;
}

/**
 * 4. Contact: Radial Concentric Signal Pulsar
 * Concentric expanding radio signal rings + central beacon
 */
export function generateContactPositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const zOffset = -64.0;
  const rings = 4;
  const particlesPerRing = 110;
  const beaconCount = PARTICLE_COUNT - rings * particlesPerRing; // 160

  // 4 Concentric planar rings
  let idx = 0;
  for (let r = 1; r <= rings; r++) {
    const radius = r * 0.95;
    for (let p = 0; p < particlesPerRing; p++) {
      const angle = (p / particlesPerRing) * Math.PI * 2;
      positions[idx * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.08;
      positions[idx * 3 + 1] = 0.5 + Math.sin(angle) * radius + (Math.random() - 0.5) * 0.08;
      positions[idx * 3 + 2] = zOffset + (Math.random() - 0.5) * 0.2;
      idx++;
    }
  }

  // Central emitter beacon (160 particles)
  while (idx < PARTICLE_COUNT) {
    const r = Math.cbrt(Math.random()) * 0.45;
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);

    positions[idx * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[idx * 3 + 1] = 0.5 + r * Math.sin(phi) * Math.sin(theta);
    positions[idx * 3 + 2] = zOffset + r * Math.cos(phi);
    idx++;
  }

  return positions;
}

export function getSectionPositions(sectionIndex, heroCenter) {
  switch (sectionIndex) {
    case 0:
      return generateHeroPositions(heroCenter);
    case 1:
      return generateExperiencePositions();
    case 2:
      return generateProjectsPositions();
    case 3:
      return generateEducationPositions();
    case 4:
      return generateContactPositions();
    default:
      return generateHeroPositions(heroCenter);
  }
}

/**
 * Pure Particle Constellation Engine
 */
export function createConstellations(scene, initialSection = 0, getHeroCenter) {
  const geometry = new THREE.BufferGeometry();
  const initialPositions = getSectionPositions(initialSection, getHeroCenter ? getHeroCenter() : undefined);

  const currentPositions = new Float32Array(initialPositions);
  const sourcePositions = new Float32Array(initialPositions);
  const targetPositions = new Float32Array(initialPositions);

  // Per-particle organic stagger delays (0.0 to 0.28)
  const delays = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    delays[i] = Math.random() * 0.28;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));

  const THEME_CONFIG = {
    dark: {
      color: 0x00E5FF,
      size: 0.082,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    },
    light: {
      color: 0x1948D1,
      size: 0.075,
      opacity: 0.75,
      blending: THREE.NormalBlending,
    },
  };

  const getTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';

  const pointTexture = createPointTexture();

  const material = new THREE.PointsMaterial({
    map: pointTexture,
    color: THEME_CONFIG[getTheme()].color,
    size: THEME_CONFIG[getTheme()].size,
    transparent: true,
    opacity: THEME_CONFIG[getTheme()].opacity,
    blending: THEME_CONFIG[getTheme()].blending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const pointsMesh = new THREE.Points(geometry, material);
  scene.add(pointsMesh);

  let activeSection = initialSection;
  const morphState = { progress: 1.0 };
  let currentTween = null;
  let reducedMotion = false;

  function setReducedMotion(val) {
    reducedMotion = !!val;
    if (reducedMotion) {
      if (currentTween) currentTween.kill();
      morphState.progress = 1.0;
      const posAttr = geometry.attributes.position;
      const heroCenter = getHeroCenter ? getHeroCenter() : undefined;
      const targets = getSectionPositions(activeSection, heroCenter);
      for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        sourcePositions[i] = targets[i];
        targetPositions[i] = targets[i];
        posAttr.array[i] = targets[i];
      }
      posAttr.needsUpdate = true;
    }
  }

  function recenterHero() {
    if (activeSection === 0) {
      const heroCenter = getHeroCenter ? getHeroCenter() : undefined;
      const targets = getSectionPositions(0, heroCenter);
      const posAttr = geometry.attributes.position;
      for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        targetPositions[i] = targets[i];
        if (morphState.progress >= 1.0) {
          sourcePositions[i] = targets[i];
          posAttr.array[i] = targets[i];
        }
      }
      posAttr.needsUpdate = true;
    }
  }

  function morphToSection(targetIndex, duration = 0.75) {
    if (targetIndex < 0 || targetIndex > 4) return;
    activeSection = targetIndex;

    const actualDuration = reducedMotion ? 0.05 : duration;

    // Snapshot current position as source
    const posAttr = geometry.attributes.position;
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      sourcePositions[i] = posAttr.array[i];
    }

    const heroCenter = getHeroCenter ? getHeroCenter() : undefined;
    const newTarget = getSectionPositions(targetIndex, heroCenter);
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      targetPositions[i] = newTarget[i];
    }

    if (currentTween) currentTween.kill();

    morphState.progress = 0.0;
    currentTween = gsap.to(morphState, {
      progress: 1.0,
      duration: actualDuration,
      ease: 'power2.inOut',
    });
  }

  function easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  function update(time) {
    if (reducedMotion && morphState.progress >= 1.0) return;
    const posAttr = geometry.attributes.position;
    const p = morphState.progress;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const delay = reducedMotion ? 0 : delays[i];
      // Staggered progress window
      let localP = (p - delay) / (1.0 - delay);
      if (localP < 0) localP = 0;
      if (localP > 1) localP = 1;

      const factor = easeInOutQuad(localP);
      const i3 = i * 3;

      // Subtle breathing motion (halted in reduced motion)
      const flutterX = reducedMotion ? 0 : Math.sin(time * 1.8 + i * 0.2) * 0.025;
      const flutterY = reducedMotion ? 0 : Math.cos(time * 1.5 + i * 0.25) * 0.025;
      const flutterZ = reducedMotion ? 0 : Math.sin(time * 1.2 + i * 0.15) * 0.025;

      posAttr.array[i3] = sourcePositions[i3] + (targetPositions[i3] - sourcePositions[i3]) * factor + flutterX;
      posAttr.array[i3 + 1] = sourcePositions[i3 + 1] + (targetPositions[i3 + 1] - sourcePositions[i3 + 1]) * factor + flutterY;
      posAttr.array[i3 + 2] = sourcePositions[i3 + 2] + (targetPositions[i3 + 2] - sourcePositions[i3 + 2]) * factor + flutterZ;
    }

    posAttr.needsUpdate = true;
  }

  function setTheme(theme) {
    const config = THEME_CONFIG[theme] || THEME_CONFIG.dark;
    material.color.setHex(config.color);
    material.size = config.size;
    material.opacity = config.opacity;
    material.blending = config.blending;
    material.needsUpdate = true;
  }

  return {
    mesh: pointsMesh,
    update,
    morphToSection,
    recenterHero,
    setTheme,
    setReducedMotion,
    getActiveSection: () => activeSection,
    getParticleCount: () => PARTICLE_COUNT,
  };
}
