let index = 0;
const images = document.querySelectorAll(".slides img");
const fullscreenBtn = document.getElementById("fullscreen-btn");
let zoomed = false;
let hideControlsTimer = null;

function showSlide(i) {
  images.forEach((img, idx) => {
    img.style.display = idx === i ? "block" : "none";
    img.style.transform = "scale(1)";
  });
  zoomed = false;

  // حالت صفحه اول
  if (i === 0) {
    document.body.classList.add("initial-slide");
    fullscreenBtn.classList.add("center");
  } else {
    document.body.classList.remove("initial-slide");
    fullscreenBtn.classList.remove("center");
  }
}

function nextSlide() {
  index = (index + 1) % images.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide(index);
}

function getCurrentImage() {
  return images[index];
}

function zoomIn() {
  if (!zoomed) {
    getCurrentImage().style.transform = "scale(1.5)";
    zoomed = true;
  }
}

function zoomOut() {
  if (zoomed) {
    getCurrentImage().style.transform = "scale(1)";
    zoomed = false;
  }
}

// ترکیب fullscreen و رفتن به اسلاید دوم
function handleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().then(() => {
      index = 1;
      showSlide(index);
    }).catch(err => console.error("Fullscreen failed:", err));
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

// نمایش کنترل‌ها با حرکت موس
document.addEventListener("mousemove", () => {
  document.body.classList.add("visible-controls");
  clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 3000);
});

// شروع با اسلاید اول
showSlide(index);
