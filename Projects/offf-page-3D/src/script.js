import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI, { Controller } from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";

/**
 * Base
 */
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Models
 */
const gltfLoader = new GLTFLoader();

const animationObject = {
  actions: {},
};

let suitcase;
let mixer = null;
gltfLoader.load(
  "/models/suitcase/suitcase.gltf",
  (gltf) => {
    suitcase = gltf;
    console.log("finished");
    mixer = new THREE.AnimationMixer(suitcase.scene);
    animationObject.actions.suitcase = [
      mixer.clipAction(suitcase.animations[0]),
      mixer.clipAction(suitcase.animations[1]),
      mixer.clipAction(suitcase.animations[2]),
      mixer.clipAction(suitcase.animations[3]),
    ];
    suitcase.scene.scale.set(0.5, 0.5, 0.5);
    scene.add(suitcase.scene);
  },
  () => {
    console.log("loading");
  },
  () => {
    console.log("error");
  }
);

let perfume;
let mixer2 = null;
gltfLoader.load(
  "/models/perfume/perfume.gltf",
  (gltf) => {
    perfume = gltf;
    console.log("finished");
    mixer2 = new THREE.AnimationMixer(perfume.scene);
    animationObject.actions.perfume = [
      mixer2.clipAction(perfume.animations[0]),
      mixer2.clipAction(perfume.animations[1]),
    ];
    perfume.scene.scale.set(0.5, 0.5, 0.5);
    perfume.scene.position.set(0, 0, 2);
    scene.add(perfume.scene);
  },
  () => {
    console.log("loading");
  },
  () => {
    console.log("error");
  }
);

// debug
const lightFolder = gui.addFolder("Light");
const animationFolder = gui.addFolder("Animation speed");
const modelFolder = gui.addFolder("Model");
const cameraFolder = gui.addFolder("Camera");
const helperFolder = gui.addFolder("Helpers");

gui.show(false);

document.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    gui.show(gui._hidden);
  }
});

const modelVisibility = {
  suitcase: true,
  perfume: true,
};
modelFolder
  .add(modelVisibility, "suitcase")
  .name("Suitcase")
  .onChange((value) => {
    suitcase.scene.visible = value;
  });
modelFolder
  .add(modelVisibility, "perfume")
  .name("Perfume")
  .onChange((value) => {
    perfume.scene.visible = value;
  });

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

lightFolder.add(directionalLight, "intensity").min(0).max(10).step(0.01);
lightFolder.add(directionalLight.position, "x").min(-10).max(10).step(0.01);
lightFolder.add(directionalLight.position, "y").min(-10).max(10).step(0.01);
lightFolder.add(directionalLight.position, "z").min(-10).max(10).step(0.01);

/**
 * Sizes
 */
const sizes = {
  width: "700",
  height: "800",
};

window.addEventListener("resize", () => {
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(3, 2, 2);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);
cameraFolder.add(camera.position, "z").min(-10).max(10).step(0.01);
cameraFolder.add(camera.position, "x").min(-10).max(10).step(0.01);
cameraFolder.add(camera.position, "y").min(-10).max(10).step(0.01);

if (window.innerWidth < 800) {
  sizes.width = window.innerWidth;
  camera.position.set(5, 2, 2);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
}
// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 1);
controls.enableDamping = true;
controls.enableZoom = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// helpers
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);
axesHelper.visible = false;
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);
cameraHelper.visible = false;
helperFolder.add(axesHelper, "visible").name("Axes Helper");
helperFolder.add(cameraHelper, "visible").name("Camera Helper");
const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(lightHelper);
lightHelper.visible = false;
helperFolder.add(lightHelper, "visible").name("Light Helper");

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  if (suitcase) {
    console.log(suitcase);
    animationObject.actions.suitcase.forEach((action) => {
      action.play();
    });
  }
  if (perfume) {
    animationObject.actions.perfume.forEach((action) => {
      action.play();
    });
  }

  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  mixer?.update(deltaTime);
  mixer2?.update(deltaTime);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

// animationspeed
const animationSpeed = {
  suitcase: 1,
  perfume: 1,
};
animationFolder
  .add(animationSpeed, "suitcase")
  .min(0)
  .max(2)
  .step(0.01)
  .name("Suitcase")
  .onChange((value) => {
    animationObject.actions.suitcase.forEach((action) => {
      action.timeScale = value;
    });
  });
animationFolder
  .add(animationSpeed, "perfume")
  .min(0)
  .max(2)
  .step(0.01)
  .name("Perfume")
  .onChange((value) => {
    animationObject.actions.perfume.forEach((action) => {
      action.timeScale = value;
    });
  });

animationFolder
  .add({ reset: () => mixer?.stopAllAction() }, "reset")
  .name("Restart animation Suitcase");
animationFolder
  .add({ reset: () => mixer2?.stopAllAction() }, "reset")
  .name("Restart animation Perfume");

tick();
