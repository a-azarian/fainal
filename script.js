let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;

const allControls = document.querySelector(".controls");
const navButtons = document.querySelectorAll(".prev, .next");
const rotateIcon = document.getElementById("rotateIcon");
const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// نمایش اسلاید مشخص
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

    if (isMobile) {
      document.querySelector(".start-button").style.display = "none";
      rotateIcon.style.display = "block";
    } else {
      document.querySelector(".start-button").style.display = "inline-block";
      rotateIcon.style.display = "none";
    }
  } else {
    allControls.style.display = "flex";
    navButtons.forEach(btn => btn.style.display = "block");
    document.querySelector(".start-screen").style.display = "none";
  }
}

// شروع نمایش
function startPresentation() {
  const elem = document.documentElement;
  elem.requestFullscreen?.().catch(err => console.error("Fullscreen failed:", err));
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

// تمام صفحه
function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

// کنترل‌ها با موس
document.addEventListener("mousemove", () => {
  document.body.classList.add("visible-controls");
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 3000);
});

// جلوگیری از زوم لمسی
["gesturestart", "gesturechange", "gestureend"].forEach(event =>
  document.addEventListener(event, e => e.preventDefault())
);

// iOS/Android: چک کردن چرخش و شروع خودکار
function checkOrientation() {
  if (isMobile && index === 0) {
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    if (isLandscape) {
      startPresentation();
    }
  }
}

window.addEventListener("orientationchange", () => {
  setTimeout(checkOrientation, 500);
});
window.addEventListener("load", () => {
  showSlide(index);
  checkOrientation();
});
