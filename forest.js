/**
 * forest.js - 3D Rendering of a forest biome for Whispers of the Biomes
 * Handles:
 * Dependencies:
 * - three.js
 * - OrbitControls
 */

// Imports
import * as THREE from 'three'; // three.js library
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // orbit controls to enable movement via mouse when viewing the webpage
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // loader for glTF 3D models


function main() {
    // Canvas setup
    const canvas = document.querySelector("#forest");
    
    // Create scene
    const scene = new THREE.Scene();

    // Camera setup
    const fieldOfView = 75;
    const aspectRatio = window.innerWidth / window.innerHeight;
    const minRenderDistance = 0.1;
    const maxRenderDistance = 1000;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, minRenderDistance, maxRenderDistance);
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Model importing
    const loader = new GLTFLoader();
}

main();
