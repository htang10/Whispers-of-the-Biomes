/**
 * ======================================================
 * File: earth.js
 * Project: Whispers of the Biomes
 * Author: Huy Tang
 * Last Updated: Nov 5, 2025
 * ======================================================
 * Purpose:
 *   Renders the 3D interactive Earth scene for the homepage
 *   using Three.js. Includes lighting, starfield background,
 *   atmospheric glow, and continuous rotation animation.
 *
 * Responsibilities:
 *   - Initialize Three.js scene, camera, and renderer
 *   - Construct realistic Earth model with textures and glow
 *   - Add dynamic lighting and starfield for immersion
 *   - Continuously animate Earth rotation
 *   - Handle viewport resizing for responsiveness
 *
 * Dependencies:
 *   - three.js
 *   - OrbitControls (Three.js camera controls)
 *   - getStarfield.js (background star generator)
 *   - getFresnelMat.js (Fresnel atmospheric glow material)
 *
 * Key Features:
 *   - Layered Earth mesh (surface, clouds, lights, glow)
 *   - Smooth camera control via OrbitControls
 *   - Subtle continuous rotation for realism
 *   - Adaptive rendering on window resize
 * ======================================================
 */


// ======================================================
// CONTENTS
// ------------------------------------------------------
// 0. Imports & Constants
// 1. Scene Setup
// 2. Earth Model Construction
// 3. Environment & Lighting
// 4. Animation Loop
// 5. Responsive Resize Handling
// 6. Initialization
// ======================================================


// ======================================================
// 0. IMPORTS & CONSTANTS
// ======================================================


import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import getStarfield from "./external/getStarfield.js";
import { getFresnelMat } from "./external/getFresnelMat.js";

const ROTATION_SPEED = 0.0009; // Earth rotation speed (radians per frame)


// ======================================================
// 1. SCENE SETUP
// ======================================================


/**
 * Initializes and runs the 3D Earth scene.
 *
 * Sets up the camera, renderer, and scene environment using Three.js.
 * Constructs the Earth model with multiple layers, adds lighting and
 * starfield background, and starts the continuous rotation loop.
 *
 * Logic Flow:
 *   1. Create scene, camera, and renderer
 *   2. Load textures and construct the Earth group
 *   3. Add starfield and directional lighting
 *   4. Start animation loop for rotation
 *   5. Adjust rendering on window resize
 *
 * @returns {void}
 */
function main() {
  // Canvas & Camera setup
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


  // ======================================================
  // 2. EARTH MODEL CONSTRUCTION
  // ======================================================


    /**
   * Creates a layered 3D Earth model with textures for surface,
   * terrain, city lights, clouds, and an atmospheric glow.
   *
   * @returns {THREE.Group} The completed Earth group.
   */
  function createEarthModel() {
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180; // Earth's axial tilt

    const loader = new THREE.TextureLoader();
    const earthMap = loader.load("assets/earthmap1k.jpg");
    const earthSpec = loader.load("assets/earthspec1k.jpg");
    const earthBump = loader.load("assets/earthbump1k.jpg");
    const lightsTexture = loader.load("assets/earthlights1k.jpg");
    const cloudsTexture = loader.load("assets/earthcloudmap.jpg");

    const earthGeometry = new THREE.SphereGeometry(2, 100, 100);

    // Surface layer
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthMap,
      specularMap: earthSpec,
      bumpMap: earthBump,
      bumpScale: 0.04,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    // City lights layer
    const lightsMaterial = new THREE.MeshBasicMaterial({
      map: lightsTexture,
      blending: THREE.AdditiveBlending,
    });
    const lightsMesh = new THREE.Mesh(earthGeometry, lightsMaterial);
    earthGroup.add(lightsMesh);

    // Cloud layer
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const cloudsMesh = new THREE.Mesh(earthGeometry, cloudsMaterial);
    cloudsMesh.scale.setScalar(1.003);
    earthGroup.add(cloudsMesh);

    // Atmospheric glow
    const fresnelMat = getFresnelMat();
    const glowMesh = new THREE.Mesh(earthGeometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);
    earthGroup.add(glowMesh);

    return { earthGroup, earthMesh, lightsMesh, cloudsMesh, glowMesh };
  }

  const { earthGroup, earthMesh, lightsMesh, cloudsMesh, glowMesh } = createEarthModel();
  scene.add(earthGroup);


  // ======================================================
  // 3. ENVIRONMENT & LIGHTING
  // ======================================================


  // Background stars
  const stars = getStarfield({ numStars: 5000 });
  scene.add(stars);

  // Directional sunlight
  const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
  sunLight.position.set(-2, 0.5, 1.5);
  scene.add(sunLight);


  // ======================================================
  // 4. ANIMATION LOOP
  // ======================================================


  /**
   * Continuously animates the Earth’s rotation and updates the scene.
   * Each layer (surface, clouds, glow) rotates at slightly different speeds
   * for subtle parallax depth.
   *
   * @returns {void}
   */
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


  // ======================================================
  // 5. RESPONSIVE RESIZE HANDLING
  // ======================================================


  /**
   * Adjusts the camera and renderer when the browser window is resized.
   *
   * Maintains correct aspect ratio and ensures the 3D scene remains
   * fully visible and properly scaled.
   *
   * @returns {void}
   */
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}


// ======================================================
// 6. INITIALIZATION
// ======================================================


main();
