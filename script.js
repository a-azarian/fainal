let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;

const allControls = document.querySelector(".controls");
const navButtons = document.querySelectorAll(".prev, .next");
const startScreen = document.querySelector(".start-screen");
const rotateIcon = document.querySelector(".rotate-icon");
const startButton = document.querySelector(".start-button");

// نمایش اسلاید مشخص
function showSlide(i) {
  images.forEach((img, idx) => {
    img.style.display = idx === i ? "block" : "none";
    img.style.transform = "scale(1)";
  });
  zoomed = false;

  if (i === 0) {
    allControls.style.display = "none";
    navButtons.forEach(btn => (btn.style.display = "none"));
    startScreen.style.display = window.innerWidth <= 1024 ? "flex" : "flex"; // موبایل: آیکون چرخش، دسکتاپ: دکمه
  } else {
    allControls.style.display = "flex";
    navButtons.forEach(btn => (btn.style.display = "block"));
    startScreen.style.display = "none";
  }
}

// شروع نمایش (فول اسکرین و نمایش اسلاید اول)
function startPresentation() {
  const elem = document.documentElement;
  elem.requestFullscreen().catch((err) => console.error("Fullscreen failed:", err));
  index = 1;
  showSlide(index);
}

// اسلاید بعدی
function nextSlide() {
  index = (index + 1) % images.length;
  showSlide(index);
}

// اسلاید قبلی
function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide(index);
}

// زوم در (1.5x)
function zoomIn() {
  if (!zoomed) {
    images[index].style.transform = "scale(1.5)";
    zoomed = true;
  }
}

// زوم بیرون (1x)
function zoomOut() {
  if (zoomed) {
    images[index].style.transform = "scale(1)";
    zoomed = false;
  }
}

// تغییر حالت تمام صفحه
function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => console.error("Fullscreen failed:", err));
  } else {
    document.exitFullscreen();
  }
}

// خروج از تمام صفحه با Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

// نمایش کنترل‌ها با حرکت موس
function showControlsTemporarily() {
  document.body.classList.add("visible-controls");
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 3000);
}

document.addEventListener("mousemove", showControlsTemporarily);

// غیرفعال کردن زوم دو انگشتی (پینچ) در موبایل و تبلت
document.addEventListener("touchmove", function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

// نمایش اسلاید اول در شروع
showSlide(index);
