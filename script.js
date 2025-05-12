let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomLevel = 1;

// Show only selected slide
function showSlide(i) {
  images.forEach((img, idx) => {
    img.style.display = (idx === i) ? "block" : "none";
    img.style.transform = "scale(1)";
    img.style.zIndex = 1;
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

// Fullscreen
function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => console.error("Fullscreen failed:", err));
  } else {
    document.exitFullscreen();
  }
}

// Escape exits fullscreen
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

// Get current active image
function getCurrentImage() {
  return images[index];
}

// Zoom functions
function zoomIn() {
  zoomLevel = Math.min(zoomLevel + 0.2, 2);
  const img = getCurrentImage();
  img.style.transform = `scale(${zoomLevel})`;
  img.style.zIndex = 1; // Keep image under controls
}

function zoomOut() {
  zoomLevel = Math.max(zoomLevel - 0.2, 1);
  const img = getCurrentImage();
  img.style.transform = `scale(${zoomLevel})`;
  img.style.zIndex = 1;
}

// Initialize first slide
showSlide(index);
