/**
 * forest.js - 3D Rendering of a forest biome for Whispers of the Biomes
 * Handles:
 * Dependencies:
 * - three.js
 * - OrbitControls
 * Credits:
 * - Model: "Low Poly Forest" by mikeW on SketchFab
 * - This work is based on "Low Poly Forest" 
 *   (https://sketchfab.com/3d-models/low-poly-forest-74e0a8f713bb4998a678bffe0e40a455) 
 *   by mikeW (https://sketchfab.com/mikewee) licensed under CC-BY-4.0 
 *   (http://creativecommons.org/licenses/by/4.0/)
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
    scene.background = new THREE.Color(0xcdecff);

    // Camera setup
    const fieldOfView = 75;
    const aspectRatio = window.innerWidth / window.innerHeight;
    const minRenderDistance = 0.1;
    const maxRenderDistance = 1000;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, minRenderDistance, maxRenderDistance);
    camera.position.set(0.75, 0, 1.5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    // Horizontal orbit ranges
    controls.minAzimuthAngle = 10 * Math.PI / 180;
    controls.maxAzimuthAngle = 75 * Math.PI / 180;
    // Vertical orbit ranges
    controls.minPolarAngle = 80 * Math.PI / 180;
    controls.maxPolarAngle = 90 * Math.PI / 180;

    controls.enablePan = false; // disables the ability to move around the scene. rotating is still allowed
    controls.enableDamping = true; // adds inertia when rotating camera
    // controls.enabled = false;

    // Model importing
    const loader = new GLTFLoader();
    loader.load("forest-assets/low_poly_forest/scene.gltf", 
        function (gltf) { 
            const model = gltf.scene;
            model.position.set(1.5, -0.75, 1);
            model.rotation.y = 228 * Math.PI / 180;
            scene.add(model); 
        }, undefined, 
        function (error) { 
            console.error(error); 
        });

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 30); // used to light up the entire model
    const directionalLight = new THREE.DirectionalLight(0x404040, 80); // used to add shadows and depth
    scene.add(ambientLight, directionalLight);

    // Window Resize function
    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    // Animate function
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        console.log("Azimuth Angle: " + controls.getAzimuthalAngle() * (180 / Math.PI));
        console.log("Polar Angle: " + controls.getPolarAngle() * (180 / Math.PI));
    }

    // Helper function--adds helpers that visualize measurements, elements, and values
    function helper() {
        // add axes
        // The X axis is red. The Y axis is green. The Z axis is blue.
        const axesHelper = new THREE.AxesHelper( 5 );
        scene.add( axesHelper );
        // directional light helper
        const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
        scene.add( helper );
    }

    animate();
    // helper();
}

main();
