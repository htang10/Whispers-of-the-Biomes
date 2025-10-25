import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("earth"),
  antialias: true 
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(8);
camera.position.setY(-0.5);

const controls = new OrbitControls(camera, renderer.domElement);

// === EARTH === 
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);

const earthGeometry = new THREE.SphereGeometry(2, 100, 100);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// // === Add background stars ===
// const starGeometry = new THREE.BufferGeometry();
// const starCount = 8000;
// const starVertices = [];

// for (let i = 0; i < starCount; i++) {
//   const x = (Math.random() - 0.5) * 2000;
//   const y = (Math.random() - 0.5) * 2000;
//   const z = (Math.random() - 0.5) * 2000;
//   starVertices.push(x, y, z);
// }

// starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
// const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
// const stars = new THREE.Points(starGeometry, starMaterial);
// scene.add(stars);

// === Add lights ===
const ambientLight = new THREE.AmbientLight(0x404040, 2); // soft light everywhere
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.003; // rotation speed
  controls.update();
  renderer.render(scene, camera);
}

animate();

// === Handle window resize ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});