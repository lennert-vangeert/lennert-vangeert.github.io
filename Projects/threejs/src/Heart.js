import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const heart = () => {
  localStorage.setItem("currentScene", "heart");
  //canvas
  const canvas = document.querySelector("canvas.webgl");

  //scene

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

  // Add the mesh to the scene
  scene.add(heartMesh);

  //camera
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.z = 15;
  camera.lookAt(heartMesh.position);
  scene.add(camera);

  // controls
  const cursor = {
    x: 0,
    y: 0,
  };

  window.addEventListener("mousemove", (event) => {
    cursor.x = -(event.clientX / sizes.width - 0.5);
    cursor.y = -(event.clientY / sizes.height - 0.5);
    // console.log(cursor);
  });
  const controls = new OrbitControls(camera, canvas);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.rotateSpeed = 1.2;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;

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

    // heartMesh.rotation.y = elapsedTime * 1.5;
    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();

  //Resize

  // resize
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const toggleFullScreen = () => {
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  window.addEventListener("dblclick", () => {
    toggleFullScreen();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "f") {
      toggleFullScreen();
    }
  });
};

// https://threejs.org/docs/#api/en/extras/core/Shape
