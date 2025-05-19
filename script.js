let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;
let hideCursorTimer = null;
let keyboardHelpTimeout = null;

const allControls = document.querySelector(".controls");
const navButtons = document.querySelectorAll(".prev, .next");
const keyboardHelp = document.querySelector(".keyboard-help");

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
  } else {
    allControls.style.display = "flex";
    navButtons.forEach(btn => btn.style.display = "block");
    document.querySelector(".start-screen").style.display = "none";
  }
}

// شروع نمایش
function startPresentation() {
  const elem = document.documentElement;
  elem.requestFullscreen().catch(err => console.error("Fullscreen failed:", err));
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

// تغییر حالت تمام صفحه
function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().then(() => {
      showKeyboardHelp();
    }).catch(err => console.error("Fullscreen failed:", err));
  } else {
    document.exitFullscreen();
  }
}

// کمک‌نمای پایین صفحه
function showKeyboardHelp() {
  keyboardHelp.classList.add("show");
  clearTimeout(keyboardHelpTimeout);
  keyboardHelpTimeout = setTimeout(() => {
    keyboardHelp.classList.remove("show");
  }, 4000);
}

// خروج از تمام صفحه با Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }

  if (event.key === "ArrowRight") nextSlide();
  if (event.key === "ArrowLeft") prevSlide();
  if (event.key === " ") {
    event.preventDefault();
    zoomed ? zoomOut() : zoomIn();
  }
});

// نمایش کنترل‌ها و موس با حرکت
function showControlsTemporarily() {
  document.body.classList.add("visible-controls");
  document.body.classList.remove("hide-cursor");

  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 4000);

  if (hideCursorTimer) clearTimeout(hideCursorTimer);
  hideCursorTimer = setTimeout(() => {
    document.body.classList.add("hide-cursor");
  }, 4000);
}

document.addEventListener("mousemove", showControlsTemporarily);

// شروع با اسلاید اول
showSlide(index);
