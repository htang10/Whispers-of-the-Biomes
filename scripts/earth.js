/**
 * ======================================================
 *  earth.js — 3D Earth Rendering for Whispers of the Biomes
 * ======================================================
 * Handles:
 *  1. Scene setup using Three.js (camera, renderer, lighting)
 *  2. Earth model creation with realistic surface, lights, clouds, and glow
 *  3. Background starfield for immersive environment
 *  4. Continuous Earth rotation and responsive resizing
 * ------------------------------------------------------
 * Dependencies:
 *  - three.js
 *  - OrbitControls (camera interaction)
 *  - getStarfield.js (generates background stars)
 *  - getFresnelMat.js (adds outer atmospheric glow)
 * ======================================================
 */

// === Imports ===
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import getStarfield from "./external/getStarfield.js";
import { getFresnelMat } from "./external/getFresnelMat.js";

// === Constants ===
const ROTATION_SPEED = 0.0009; // Earth rotation speed (radians per frame)

/**
 * ======================================================
 *  main() — Initializes and runs the 3D Earth scene
 * ======================================================
 * Steps:
 *  1. Create scene, camera, and renderer
 *  2. Load textures and construct layered Earth model
 *  3. Add ambient stars and directional light (sun)
 *  4. Start continuous rotation animation loop
 *  5. Adjust rendering on window resize
 */
function main() {
  // ===== Canvas & Camera Setup =====
  const canvas = document.querySelector("#earth");
  const fov = 75; // Field of view in degrees
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1; // Minimum render distance
  const far = 1000; // Maximum render distance

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.setZ(5); // Pull camera back to view full Earth

  const scene = new THREE.Scene();
  const controls = new OrbitControls(camera, renderer.domElement);

  // ===== Earth Group =====
  const earthGroup = new THREE.Group();
  earthGroup.rotation.z = (-23.4 * Math.PI) / 180; // Tilt to match Earth’s axial tilt

  // ===== Texture Loading =====
  const loader = new THREE.TextureLoader();
  const earthMap = loader.load("/assets/earthmap1k.jpg"); // Diffuse color map
  const earthSpec = loader.load("/assets/earthspec1k.jpg"); // Specular highlights (oceans)
  const earthBump = loader.load("/assets/earthbump1k.jpg"); // Terrain elevation
  const lightsTexture = loader.load("/assets/earthlights1k.jpg"); // Night city lights
  const cloudsTexture = loader.load("/assets/earthcloudmap.jpg"); // Cloud layer

  // ===== Base Earth Mesh =====
  const earthGeometry = new THREE.SphereGeometry(2, 100, 100);
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthMap,
    specularMap: earthSpec,
    bumpMap: earthBump,
    bumpScale: 0.04,
  });
  const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  earthGroup.add(earthMesh);

  // ===== City Lights Layer =====
  const lightsMaterial = new THREE.MeshBasicMaterial({
    map: lightsTexture,
    blending: THREE.AdditiveBlending,
  });
  const lightsMesh = new THREE.Mesh(earthGeometry, lightsMaterial);
  earthGroup.add(lightsMesh);

  // ===== Cloud Layer =====
  const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: cloudsTexture,
    blending: THREE.AdditiveBlending,
  });
  const cloudsMesh = new THREE.Mesh(earthGeometry, cloudsMaterial);
  cloudsMesh.scale.setScalar(1.003); // Slightly larger to sit above the surface
  earthGroup.add(cloudsMesh);

  // ===== Atmospheric Glow (Fresnel Effect) =====
  const fresnelMat = getFresnelMat();
  const glowMesh = new THREE.Mesh(earthGeometry, fresnelMat);
  glowMesh.scale.setScalar(1.01); // Slightly larger for outer glow
  earthGroup.add(glowMesh);

  // Add everything to the scene
  scene.add(earthGroup);

  // ===== Background Stars =====
  const stars = getStarfield({ numStars: 5000 });
  scene.add(stars);

  // ===== Lighting Setup =====
  const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
  sunLight.position.set(-2, 0.5, 1.5);
  scene.add(sunLight);

  // ===== Animation Loop =====
  function animate() {
    requestAnimationFrame(animate);
    earthMesh.rotation.y += ROTATION_SPEED;
    lightsMesh.rotation.y += ROTATION_SPEED;
    cloudsMesh.rotation.y += ROTATION_SPEED * 1.5;
    glowMesh.rotation.y += ROTATION_SPEED;
    stars.rotation.y -= ROTATION_SPEED; // Opposite rotation for parallax depth
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // ===== Responsive Resize Handling =====
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Initialize the Earth scene
main();
