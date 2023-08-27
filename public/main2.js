import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//default scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)

//lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);


document.body.appendChild(renderer.domElement);


//loading the external mesh
const loader = new GLTFLoader();
loader.load('public/xander_model_character_man_rigged_realisitc/scene.gltf', function (gltf) {
    const model = gltf.scene;

    scene.add(model);

}, undefined, function (error) {

    console.error(error);

});


camera.position.z = 5;
camera.position.y = 1;


const mouse = new THREE.Vector2();
const previousMouse = new THREE.Vector2();

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);

    // Calculate the change in mouse position
    const deltaMouse = new THREE.Vector2();
    deltaMouse.subVectors(mouse, previousMouse);

    // Rotate the cube based on mouse movement
    const model = scene.children.find(child => child.type === 'Group');// Assuming the model's name is 'scene'
    if (model) {
        model.rotation.x += deltaMouse.y * 2;
        model.rotation.y += deltaMouse.x * 2;
    }


    previousMouse.copy(mouse);

    renderer.render(scene, camera);
}


animate()