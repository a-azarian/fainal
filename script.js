let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;

const allControls = document.querySelector(".controls");
const navButtons = document.querySelectorAll(".prev, .next");

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// نمایش اسلاید
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

// شروع
function startPresentation() {
  const elem = document.documentElement;
  elem.requestFullscreen?.().catch(() => {});
  index = 1;
  showSlide(index);
}

// بعدی
function nextSlide() {
  index = (index + 1) % images.length;
  showSlide(index);
}

// قبلی
function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide(index);
}

// زوم
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

// فول‌اسکرین
function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.();
  }
}

// ESC برای خروج از fullscreen
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.exitFullscreen?.();
  }
});

// کنترل‌ها با حرکت موس
function showControlsTemporarily() {
  document.body.classList.add("visible-controls");
  clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 3000);
}

document.addEventListener("mousemove", showControlsTemporarily);

// چرخش برای iOS
window.addEventListener("DOMContentLoaded", () => {
  if (isIOS) {
    const btn = document.getElementById("startBtn");
    const rotate = document.getElementById("rotateNotice");

    btn.style.display = "none";
    rotate.style.display = "block";

    window.addEventListener("orientationchange", () => {
      if (window.orientation === 90 || window.orientation === -90) {
        setTimeout(() => {
          document.documentElement.requestFullscreen?.().catch(() => {});
          index = 1;
          showSlide(index);
        }, 300);
      }
    });
  }
});

showSlide(index);
