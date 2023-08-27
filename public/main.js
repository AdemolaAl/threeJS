import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


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
    cube.rotation.x += deltaMouse.y * 2;
    cube.rotation.y += deltaMouse.x * 2;
    

    previousMouse.copy(mouse);

    renderer.render(scene, camera);
}


animate()