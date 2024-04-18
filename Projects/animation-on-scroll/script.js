const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const frameCount = 148;
const html = document.documentElement;

const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
);

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);

function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawImage() {
  const aspectRatio = img.width / img.height;
  let drawWidth = canvas.width;
  let drawHeight = canvas.height;

  if (canvas.width / canvas.height > aspectRatio) {
    drawWidth = canvas.height * aspectRatio;
  } else {
    drawHeight = canvas.width / aspectRatio;
  }

  const xOffset = (canvas.width - drawWidth) / 2;
  const yOffset = (canvas.height - drawHeight) / 2;

  context.drawImage(img, xOffset, yOffset, drawWidth, drawHeight);
}

function updateImage(index) {
  img.src = currentFrame(index);
  img.onload = drawImage;
}

function handleResize() {
  updateCanvasSize();
  drawImage();
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

window.addEventListener('resize', handleResize);

preloadImages();
updateCanvasSize();
updateImage(1);
