import * as THREE from "three";

// console.log(THREE);

//canvas
const canvas = document.querySelector("canvas.webgl");

//scene

const scene = new THREE.Scene();

// axeshelper
// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

//Object

// Define the heart shape
const heartShape = new THREE.Shape();
heartShape.moveTo(2.5, 2.5);
heartShape.bezierCurveTo(2.5, 2.5, 2.0, 0, 0, 0);
heartShape.bezierCurveTo(-3.0, 0, -3.0, 3.5, -3.0, 3.5);
heartShape.bezierCurveTo(-3.0, 5.5, -1.0, 7.7, 2.5, 9.5);
heartShape.bezierCurveTo(6.0, 7.7, 8.0, 5.5, 8.0, 3.5);
heartShape.bezierCurveTo(8.0, 3.5, 8.0, 0, 5.0, 0);
heartShape.bezierCurveTo(3.5, 0, 2.5, 2.5, 2.5, 2.5);

// Extrude the shape to create geometry
const extrudeSettings = {
  depth: 1,
  bevelEnabled: true,
  bevelSegments: 4,
  steps: 2,
  bevelSize: 0.1,
  bevelThickness: 0.1,
};

const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
heartGeometry.center();
// Create a mesh using the geometry and material
const heartMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);

heartMesh.rotateX(Math.PI);
heartMesh.position.y = 0;

// Add the mesh to the scene
scene.add(heartMesh);

//camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 20;
camera.lookAt(heartMesh.position);
scene.add(camera);

//Renderer

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//Animation
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  heartMesh.rotation.y = elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// https://threejs.org/docs/#api/en/extras/core/Shape
