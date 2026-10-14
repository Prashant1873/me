import * as THREE from 'three';

/**
 * Procedural Undulating Terrain Landscape
 * Wireframe elevation waves beneath camera spatial spline
 */
export function createTerrain() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const segmentsW = isMobile ? 32 : 48;
  const segmentsH = isMobile ? 48 : 80;
  const width = 64;
  const depth = 160;

  const geometry = new THREE.PlaneGeometry(width, depth, segmentsW, segmentsH);
  // Rotate plane so it lies horizontally along X-Z plane
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, -2.8, -40);

  // Store base unperturbed Y positions
  const posAttr = geometry.attributes.position;
  const count = posAttr.count;
  const baseCoords = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    baseCoords[i * 3] = posAttr.getX(i);
    baseCoords[i * 3 + 1] = posAttr.getY(i);
    baseCoords[i * 3 + 2] = posAttr.getZ(i);
  }

  const THEME_COLORS = {
    dark: {
      color: 0x2962FF,
      opacity: 0.16,
    },
    light: {
      color: 0x4B6584,
      opacity: 0.12,
    },
  };

  const getTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';

  const material = new THREE.MeshBasicMaterial({
    color: THEME_COLORS[getTheme()].color,
    wireframe: true,
    transparent: true,
    opacity: THEME_COLORS[getTheme()].opacity,
  });

  const mesh = new THREE.Mesh(geometry, material);

  function update(time) {
    const pos = geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const x = baseCoords[i * 3];
      const z = baseCoords[i * 3 + 2];
      const baseY = baseCoords[i * 3 + 1];

      // Procedural sine waves for undulating topography
      const wave1 = Math.sin(x * 0.12 + time * 0.6) * 1.1;
      const wave2 = Math.cos(z * 0.08 + time * 0.45) * 1.4;
      const wave3 = Math.sin((x + z) * 0.06 + time * 0.3) * 0.7;

      pos.setY(i, baseY + wave1 + wave2 + wave3);
    }
    pos.needsUpdate = true;
  }

  function setTheme(theme) {
    const config = THEME_COLORS[theme] || THEME_COLORS.dark;
    material.color.setHex(config.color);
    material.opacity = config.opacity;
  }

  return {
    mesh,
    update,
    setTheme,
  };
}
