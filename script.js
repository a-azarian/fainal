let index = 0;
const slides = document.querySelectorAll(".slides img, .welcome-slide");
let zoomed = false;
let hideControlsTimer = null;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.style.display = idx === i ? "block" : "none";
    if (slide.tagName === "IMG") {
      slide.style.transform = "scale(1)";
    }
  });

  zoomed = false;
  if (i === 0) {
    document.body.classList.remove("visible-controls");
  } else {
    document.body.classList.add("visible-controls");
  }
  index = i;
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

function getCurrentImage() {
  return slides[index].tagName === "IMG" ? slides[index] : null;
}

function zoomIn() {
  const img = getCurrentImage();
  if (img && !zoomed) {
    img.style.transform = "scale(1.5)";
    zoomed = true;
  }
}

function zoomOut() {
  const img = getCurrentImage();
  if (img && zoomed) {
    img.style.transform = "scale(1)";
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

// ورود از اسلاید صفر
function startPresentation() {
  toggleFullscreen();
  showSlide(1); // برو به اسلاید اول واقعی
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

function showControlsTemporarily() {
  if (index === 0) return;
  document.body.classList.add("visible-controls");
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 3000);
}

document.addEventListener("mousemove", showControlsTemporarily);

// شروع با اسلاید صفر
showSlide(0);
