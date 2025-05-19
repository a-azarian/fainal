let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;
const allControls = document.querySelector(".controls");
const navButtons = document.querySelectorAll(".prev, .next");
const keyHint = document.querySelector(".key-hint");

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

  keyHint.classList.add("visible"); // نمایش نوار راهنما
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
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }

  if (document.fullscreenElement) {
    if (event.key === "ArrowRight") {
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      prevSlide();
    } else if (event.key === " " || event.code === "Space") {
      event.preventDefault();
      if (zoomed) {
        zoomOut();
      } else {
        zoomIn();
      }
    }
  }
});

function showControlsTemporarily() {
  document.body.classList.add("visible-controls");
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 3000);
}

document.addEventListener("mousemove", showControlsTemporarily);

// اسلاید اول را نمایش بده
showSlide(index);
