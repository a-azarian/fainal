let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;

const allControls = document.querySelector(".controls");
const navButtons = document.querySelectorAll(".prev, .next");
const rotateHint = document.getElementById("rotateHint");

// نمایش اسلاید مشخص
function showSlide(i) {
  images.forEach((img, idx) => {
    img.style.display = idx === i ? "block" : "none";
    img.style.transform = "scale(1)";
  });
  zoomed = false;
}

// شروع خودکار هنگام چرخش افقی
function startPresentation() {
  const elem = document.documentElement;
  elem.requestFullscreen?.();
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

// زوم در
function zoomIn() {
  if (!zoomed) {
    images[index].style.transform = "scale(1.5)";
    zoomed = true;
  }
}

// زوم بیرون
function zoomOut() {
  if (zoomed) {
    images[index].style.transform = "scale(1)";
    zoomed = false;
  }
}

// حالت تمام صفحه
function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen?.();
  } else {
    document.exitFullscreen();
  }
}

// خروج با ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

// کنترل‌ها
function showControlsTemporarily() {
  document.body.classList.add("visible-controls");
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 3000);
}
document.addEventListener("mousemove", showControlsTemporarily);

// غیرفعال کردن زوم با دو انگشت
document.addEventListener("gesturestart", (e) => e.preventDefault());
document.addEventListener("gesturechange", (e) => e.preventDefault());
document.addEventListener("gestureend", (e) => e.preventDefault());

// چک‌کردن جهت دستگاه
function checkOrientation() {
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;

  if (isMobile && index === 0) {
    if (!isLandscape) {
      rotateHint.style.display = "flex";
    } else {
      rotateHint.style.display = "none";
      startPresentation();
    }
  }
}

window.addEventListener("orientationchange", () => setTimeout(checkOrientation, 500));
window.addEventListener("load", checkOrientation);

// شروع از اسلاید اول
showSlide(index);
