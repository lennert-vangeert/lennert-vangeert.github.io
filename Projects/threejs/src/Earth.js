import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const earth = () => {
  localStorage.setItem("currentScene", "earth");
  console.log("earth");
  //canvas
  const oldCanvas = document.querySelector("canvas.webgl");
  oldCanvas.remove();
  const canvas = document.createElement("canvas");
  canvas.classList.add("webgl");
  document.body.appendChild(canvas);

  //scene

  const scene = new THREE.Scene();

  //Object

  const textureLoader = new THREE.TextureLoader();

  // Load texture
  let map;
  function isNighttime() {
    const now = new Date();
    const currentHour = now.getHours();

    const nightStartHour = 20; // 8:00 PM
    const nightEndHour = 6; // 6:00 AM

    if (currentHour >= nightStartHour || currentHour < nightEndHour) {
      map = textureLoader.load("./textures/earth_nightmap.jpg");
    } else {
      map = textureLoader.load("./textures/earth_daymap.jpg");
    }
    console.log(currentHour);
  }
  isNighttime();

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(5, 64, 64),
    new THREE.MeshBasicMaterial({ map })
  );

  const cloudTexture = new THREE.MeshBasicMaterial({
    map: textureLoader.load("./textures/clouds_transparent.png"),
    transparent: true,
  });
  console.log(cloudTexture);
  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(5.05, 64, 64),
    cloudTexture
  );

  scene.add(earth, clouds);
  //camera
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const camera = new THREE.OrthographicCamera(
    sizes.width / -100,
    sizes.width / 100,
    sizes.height / 100,
    sizes.height / -100,
    1,
    100
  );
  camera.position.z = 12;
  camera.lookAt(earth.position);
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
  controls.enableDamping = true;
  controls.rotateSpeed = 1.2;
  controls.autoRotate = true;
  controls.autoRotateSpeed = -0.5;
  controls.maxZoom = 10;
  controls.minZoom = 1;
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

    // rotate clouds
    clouds.rotation.y = elapsedTime * 0.01;
    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();

  // resize
  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
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
  // document.getElementById("fullscreen").addEventListener("click", () => {
  //   toggleFullScreen();
  // });
};
// https://www.solarsystemscope.com/textures/
