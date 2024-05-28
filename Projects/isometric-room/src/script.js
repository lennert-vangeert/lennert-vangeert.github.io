import GUI from "lil-gui";
import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * Base
 */
// Debug
const gui = new GUI({
  width: 400,
});

gui.show(false);
if ((window, location.hash === "#debug")) {
  gui.show();
}

const debugObject = {};

const loadingBarBackground = document.querySelector(".loading-background");
const loadingBarElement = document.querySelector(".loading-bar");
const percentage = document.querySelector(".percentage");

let sceneReady = false;
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () => {
    // ...
    window.setTimeout(() => {
      loadingBarBackground.classList.add("ended");
      loadingBarBackground.style.transform = "";
      loadingBarElement.classList.add("ended");
      percentage.classList.add("ended");
      loadingBarElement.style.transform = "";
      percentage.style.transform = "";
      window.setTimeout(() => {
        loadingBarBackground.remove();
        loadingBarElement.remove();
        percentage.remove();
      }, 5000);
    }, 500);
    window.setTimeout(() => {
      sceneReady = true;
    }, 3500);
  },
  (itemUrl, itemsLoaded, itemsTotal) => {
    const progressRatio = itemsLoaded / itemsTotal;
    loadingBarElement.style.transform = `scaleX(${progressRatio})`;
    percentage.innerText = (progressRatio * 100).toFixed(0) + " %";
  }
);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Audio
 */
let playAudio = false;
let audioPlaying = false;
window.addEventListener("click", () => {
  if (audioPlaying) return;
  playAudio = true;
});

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader(loadingManager);

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Textures
 */
const bakedTexture1 = textureLoader.load("/textures/baked.jpg");
bakedTexture1.flipY = false;
bakedTexture1.colorSpace = THREE.SRGBColorSpace;

/**
 * Materials
 */

const lanternEmissionMaterial = new THREE.MeshBasicMaterial({
  color: 0xfff2ad,
});

const candleEmmisionMaterial = new THREE.MeshBasicMaterial({
  color: 0xff531b,
});

//Baked Material

const material1 = new THREE.MeshBasicMaterial({
  map: bakedTexture1,
});
let mixer;
let animationObject = {
  actions: {},
};

let gltf;
gltfLoader.load("/models/isometric-room3.glb", (gltf) => {
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = material1;
    }
  });

  gltf.scene.children.find(
    (child) => child.name === "lantern-left-emmision"
  ).material = lanternEmissionMaterial;

  gltf.scene.children.find(
    (child) => child.name === "lantern-right-emmision"
  ).material = lanternEmissionMaterial;

  gltf.scene.children.find((child) => child.name === "candle-light").material =
    candleEmmisionMaterial;

  const circle = gltf.scene.children.find((child) => child.name === "circle");
  if (circle && circle.isMesh) {
    const circleTexture = textureLoader.load("/textures/circle.png");
    circleTexture.flipY = false;
    circleTexture.colorSpace = THREE.SRGBColorSpace;

    circle.material = new THREE.MeshBasicMaterial({
      map: circleTexture,
      transparent: true,
      depthWrite: false, // This ensures that the transparent parts are not rendered over by other objects
    });
  }

  mixer = new THREE.AnimationMixer(gltf.scene);
  animationObject.actions = gltf.animations.map((animation) =>
    mixer.clipAction(animation).play()
  );

  scene.add(gltf.scene);
});

/**
 * POI
 */

const points = [
  {
    position: new THREE.Vector3(-4.23, 6.68, 1.17),
    element: document.querySelector(".point-0"),
  },
  {
    position: new THREE.Vector3(0.37, 3.98, -4.03),
    element: document.querySelector(".point-1"),
  },
  {
    position: new THREE.Vector3(4.31, 1.27, -3.13),
    element: document.querySelector(".point-2"),
  },
  {
    position: new THREE.Vector3(-3.43, 2.58, -3.13),
    element: document.querySelector(".point-3"),
  },
];

debugObject.poi = true;
gui
  .add(debugObject, "poi")
  .onChange((val) => {
    for (const point of points) {
      if (!val) {
        point.element.classList.remove("visible");
      } else {
        point.element.classList.add("visible");
      }
    }
  })
  .name("Points of Interest");
// poi locations gui
const poiFolder = gui.addFolder("POI Locations");

points.forEach((point, index) => {
  const folder = poiFolder.addFolder(`Point ${index + 1}`);
  folder.add(point.position, "x").min(-5).max(10).step(0.01).name("X");
  folder.add(point.position, "y").min(-5).max(10).step(0.01).name("Y");
  folder.add(point.position, "z").min(-5).max(10).step(0.01).name("Z");
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 20;
camera.position.y = 9;
camera.position.z = 15;
const cameraLocationFolfder = gui.addFolder("Camera Location");
cameraLocationFolfder
  .add(camera.position, "x")
  .min(-10)
  .max(50)
  .step(0.01)
  .name("Camera X");
cameraLocationFolfder
  .add(camera.position, "y")
  .min(-10)
  .max(50)
  .step(0.01)
  .name("Camera Y");
cameraLocationFolfder
  .add(camera.position, "z")
  .min(-10)
  .max(50)
  .step(0.01)
  .name("Camera Z");

const cameraFocus = new THREE.Vector3(0, 0, 0);
// camera.lookAt(cameraFocus);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;
// Set limits for horizontal (azimuthal) rotation
controls.minAzimuthAngle = THREE.MathUtils.degToRad(-2); // -45 degrees in radians
controls.maxAzimuthAngle = THREE.MathUtils.degToRad(90); // 45 degrees in radians

// Set limits for vertical (polar) rotation
controls.minPolarAngle = THREE.MathUtils.degToRad(30); // 30 degrees in radians
controls.maxPolarAngle = THREE.MathUtils.degToRad(75); // 75 degrees in radians

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * poi interaction
 */
let poiActive = false;
const poiButton = document.getElementById("poi-button");
const poiFocus = new THREE.Vector3(-4.85, 6.12, 1.36);
const goBackButton = document.querySelector(".go-back");
poiButton.addEventListener("click", () => {
  poiActive = !poiActive;
  if (poiActive) {
    gsap.to(camera.position, {
      x: -4.54,
      y: 7.71,
      z: 1.2,
      duration: 1,
    });
    controls.target = poiFocus;
    goBackButton.classList.remove("hidden");
  } else {
    gsap.to(camera.position, {
      x: 20,
      y: 9,
      z: 15,
      duration: 1,
    });
    goBackButton.classList.add("hidden");
  }
});

goBackButton.addEventListener("click", (event) => {
  if (poiActive && event.target !== poiButton) {
    poiActive = false;
    gsap.to(camera.position, {
      x: 20,
      y: 9,
      z: 15,
      duration: 1,
    });
    goBackButton.classList.add("hidden");
    controls.target = cameraFocus;
  }
});

/**
 * Animate
 */

const raycaster = new THREE.Raycaster();

const clock = new THREE.Clock();
let previousTime = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  // Update controls
  controls.update();

  if (sceneReady) {
    if (mixer) {
      mixer.update(deltaTime);
    }

    for (const point of points) {
      const screenPosition = point.position.clone();
      screenPosition.project(camera);

      raycaster.setFromCamera(screenPosition, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length === 0 && debugObject.poi) {
        point.element.classList.add("visible");
      } else {
        const intersectionDistance = intersects[0].distance;
        const pointDistance = point.position.distanceTo(camera.position);

        if (intersectionDistance < pointDistance) {
          point.element.classList.remove("visible");
        } else if (intersectionDistance > pointDistance && debugObject.poi) {
          point.element.classList.add("visible");
        }
      }

      const translateX = screenPosition.x * sizes.width * 0.5;
      const translateY = -screenPosition.y * sizes.height * 0.5;
      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    }

    if (playAudio) {
      // Background music setup
      const backgroundMusic = new Audio("/audio/water.mp3");
      backgroundMusic.loop = true;
      backgroundMusic.autoplay = true;
      backgroundMusic.volume = 0.5;

      backgroundMusic.play().catch((error) => {
        console.error("Error playing background music:", error);
      });

      // Jumpscare sound setup
      const jumpscareSound = new Audio("/audio/jumpscare.mp3");
      jumpscareSound.volume = 0.5; // Adjust the volume as needed

      // Function to play jumpscare sound at random intervals
      function playJumpscareSound() {
        // Play the jumpscare sound
        jumpscareSound.play().catch((error) => {
          console.error("Error playing jumpscare sound:", error);
        });

        // Schedule the next jumpscare sound to play in 1-2 minutes
        const randomInterval = Math.random() * (120000 - 60000) + 60000; // 60000ms (1 min) to 120000ms (2 min)
        setTimeout(playJumpscareSound, randomInterval);
      }

      // Start the first jumpscare sound
      playJumpscareSound();
      audioPlaying = true;
      playAudio = false;
    }
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
