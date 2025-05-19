let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;
let hintTimer = null;

const keyHint = document.getElementById("keyHint");
const fullscreenHint = document.getElementById("fullscreenHint");

function showSlide(i) {
  images.forEach((img, idx) => {
    img.style.display = idx === i ? "block" : "none";
    img.style.transform = "scale(1)";
  });
  zoomed = false;

  if (i === 0) {
    document.querySelector(".start-screen").style.display = "flex";
  } else {
    document.querySelector(".start-screen").style.display = "none";
  }
}

function startPresentation() {
  document.documentElement.requestFullscreen().catch(console.error);
  index = 1;
  showSlide(index);
  showKeyHint();
  showFullscreenHint();
}

function nextSlide() {
  index = (index + 1) % images.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide(index);
}

function zoomIn() {
  if (!zoomed) {
    images[index].style.transform = "scale(1.5)";
    zoomed = true;
  }
}

function zoomOut() {
  if (zoomed) {
    images[index].style.transform = "scale(1)";
    zoomed = false;
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextSlide();
  if (event.key === "ArrowLeft") prevSlide();
  if (event.code === "Space") {
    event.preventDefault();
    zoomed ? zoomOut() : zoomIn();
  }
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

function showKeyHint() {
  keyHint.classList.add("visible");
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => {
    keyHint.classList.remove("visible");
  }, 5000);
}

let fullscreenHintTimer = null;

function showFullscreenHint() {
  fullscreenHint.classList.add("visible");
  clearTimeout(fullscreenHintTimer);
  fullscreenHintTimer = setTimeout(() => {
    fullscreenHint.classList.remove("visible");
  }, 5000);
}

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    showKeyHint();
    showFullscreenHint();
  }
});

showSlide(index);
