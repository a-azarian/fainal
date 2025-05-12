let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomLevel = 1;
let hideControlsTimer = null;

function showSlide(i) {
  images.forEach((img, idx) => {
    img.style.display = (idx === i) ? "block" : "none";
    img.style.transform = "scale(1)";
  });
  zoomLevel = 1;
}

function nextSlide() {
  index = (index + 1) % images.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide(index);
}

function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => console.error("Fullscreen failed:", err));
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

function getCurrentImage() {
  return images[index];
}

function zoomIn() {
  zoomLevel = Math.min(zoomLevel + 0.2, 2);
  const img = getCurrentImage();
  img.style.transform = `scale(${zoomLevel})`;
}

function zoomOut() {
  zoomLevel = Math.max(zoomLevel - 0.2, 1);
  const img = getCurrentImage();
  img.style.transform = `scale(${zoomLevel})`;
}

// Show controls when mouse moves, then hide after timeout
function showControlsTemporarily() {
  document.body.classList.add('visible-controls');
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove('visible-controls');
  }, 3000); // 3 seconds delay
}

document.addEventListener('mousemove', showControlsTemporarily);

// Initialize first slide
showSlide(index);
