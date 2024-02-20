import * as THREE from "three";

const versionOneButton = document.getElementById("btn1");
const versionTwoButton = document.getElementById("btn2");
// console.log(THREE);

//canvas
const canvas = document.querySelector("canvas.webgl");

//scene

const versionOneObject = () => {
  const scene = new THREE.Scene();

  // axeshelper
  // const axesHelper = new THREE.AxesHelper(2);
  // scene.add(axesHelper);

  //Object

  const heartShape = new THREE.Shape();
  heartShape.moveTo(2.5, 2.5);
  heartShape.bezierCurveTo(2.5, 2.5, 2.0, 0, 0, 0);
  heartShape.bezierCurveTo(-3.0, 0, -3.0, 3.5, -3.0, 3.5);
  heartShape.bezierCurveTo(-3.0, 5.5, -1.0, 7.7, 2.5, 9.5);
  heartShape.bezierCurveTo(6.0, 7.7, 8.0, 5.5, 8.0, 3.5);
  heartShape.bezierCurveTo(8.0, 3.5, 8.0, 0, 5.0, 0);
  heartShape.bezierCurveTo(3.5, 0, 2.5, 2.5, 2.5, 2.5);

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
  const heartMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);

  heartMesh.rotateX(Math.PI);
  heartMesh.position.y = 0;

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

    heartMesh.rotation.y = elapsedTime;

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };

  tick();
};

const versionTwoObject = () => {
  const scene = new THREE.Scene();

  // axeshelper
  // const axesHelper = new THREE.AxesHelper(2);
  // scene.add(axesHelper);

  //Object

  const heartShape = new THREE.Shape();
  heartShape.moveTo(2.5, 2.5);
  heartShape.bezierCurveTo(2.5, 2.5, 2.0, 0, 0, 0);
  heartShape.bezierCurveTo(-3.0, 0, -3.0, 3.5, -3.0, 3.5);
  heartShape.bezierCurveTo(-3.0, 5.5, -1.0, 7.7, 2.5, 9.5);
  heartShape.bezierCurveTo(6.0, 7.7, 8.0, 5.5, 8.0, 3.5);
  heartShape.bezierCurveTo(8.0, 3.5, 8.0, 0, 5.0, 0);
  heartShape.bezierCurveTo(3.5, 0, 2.5, 2.5, 2.5, 2.5);

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

  let isMouseDown = false;
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener("mousemove", onDocumentMouseMove);
  document.addEventListener("mousedown", onDocumentMouseDown);
  document.addEventListener("mouseup", onDocumentMouseUp);

  function onDocumentMouseMove(event) {
    if (isMouseDown) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }
  }

  function onDocumentMouseDown(event) {
    if (event.button === 0) {
      isMouseDown = true;
    }
  }

  function onDocumentMouseUp(event) {
    if (event.button === 0) {
      isMouseDown = false;
    }
  }

  const updateRotation = () => {
    targetRotationX = mouseX * 0.01;
    targetRotationY = mouseY * 0.01;
  };

  //Animation
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    if (isMouseDown) {
      updateRotation();
      heartMesh.rotation.x += 0.05 * (targetRotationY - heartMesh.rotation.x);
      heartMesh.rotation.y += 0.05 * (targetRotationX - heartMesh.rotation.y);
    }

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };

  tick();
};

const addInfo = () => {
  const info = document.createElement("div");
  info.className = "info";
  info.innerHTML = "Click and drag to rotate the heart";
  document.body.appendChild(info);
};

const removeInfo = () => {
  const info = document.querySelector(".info");
  if (info) {
    info.remove();
  }
};

let date = "";
const versionOne = () => {
  versionOneObject();
  removeInfo();
  date = "20/02/2024";
  document.querySelector(".date").innerHTML = date;
};

const versionTwo = () => {
  versionTwoObject();
  addInfo();
  date = "20/02/2024";
  document.querySelector(".date").innerHTML = date;
};

window.onload = versionOne;
versionOneButton.addEventListener("click", versionOne);
versionTwoButton.addEventListener("click", versionTwo);

// https://threejs.org/docs/#api/en/extras/core/Shape
