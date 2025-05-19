let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;
let hintTimer = null;

const allControls = document.querySelector(".controls");
const navButtons = document.querySelectorAll(".prev, .next");
const keyHint = document.getElementById("keyHint");

function showSlide(i) {
  images.forEach((img, idx) => {
    img.style.display = idx === i ? "block" : "none";
    img.style.transform = "scale(1)";
  });
  zoomed = false;

  if (i === 0) {
    allControls.style.display = "none";
    navButtons.forEach(btn => btn.style.display = "none");
    document.querySelector(".start-screen").style.display = "flex";
  } else {
    allControls.style.display = "flex";
    navButtons.forEach(btn => btn.style.display = "block");
    document.querySelector(".start-screen").style.display = "none";
  }
}

function startPresentation() {
  const elem = document.documentElement;
  elem.requestFullscreen().catch(err => console.error("Fullscreen failed:", err));
  index = 1;
  showSlide(index);
  showKeyHint();
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
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err =>
      console.error("Fullscreen failed:", err)
    );
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

function showControlsTemporarily() {
  document.body.classList.add("visible-controls");
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 3000);
}

function showKeyHint() {
  keyHint.classList.add("visible");
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => {
    keyHint.classList.remove("visible");
  }, 5000);
}

document.addEventListener("mousemove", showControlsTemporarily);
showSlide(index);
