import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0xFFFFFF);
renderer.setPixelRatio(2)



//lighting
var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 10);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);


const loader = new GLTFLoader();
loader.load('public/free_-_fantasy_town/scene.gltf', function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1); // Adjust the scale of the model
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});


camera.position.z = 5;
camera.position.y = 1;




const mouse = new THREE.Vector2();
const previousMouse = new THREE.Vector2();
let isDragging = false;

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (isDragging) {
        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        const rotationSpeed = 0.002;
        if (camera) {
            camera.rotation.y -= movementX * rotationSpeed;
            camera.rotation.x -= movementY * rotationSpeed;
            camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
        }

        previousMouse.set(mouse.x, mouse.y);
    }

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

});

document.addEventListener('mousedown', () => {
    isDragging = true;
    previousMouse.copy(mouse);
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        camera.translateZ(-0.1) // Move the camera forward on 'w' key press
    }
    if (event.key === 'ArrowDown') {
        camera.translateZ(0.1) // Move the camera forward on 'w' key press
    }
    if (event.key === 'ArrowLeft') {
        camera.translateX(-0.1)// Move the camera forward on 'w' key press
    }
    if (event.key === 'ArrowRight') {
        camera.translateX(0.1) // Move the camera forward on 'w' key press
    }
});









function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();
