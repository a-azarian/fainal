let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;
const allControls = document.querySelector(".controls");
const navButtons = document.querySelectorAll(".prev, .next");
const helpBox = document.querySelector(".keyboard-help");

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
  elem.requestFullscreen().then(() => {
    index = 1;
    showSlide(index);
    showHelpTemporarily(); // فقط وقتی وارد fullscreen شد
  }).catch(err => console.error("Fullscreen failed:", err));
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
    elem.requestFullscreen().then(() => {
      showHelpTemporarily(); // فقط هنگام ورود
    });
  } else {
    document.exitFullscreen();
  }
}

// نمایش موقت راهنمای کیبورد
function showHelpTemporarily() {
  helpBox.style.display = "block";
  setTimeout(() => {
    helpBox.style.display = "none";
  }, 4000); // 4 ثانیه
}

// خروج از تمام صفحه با Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }

  if (event.key === "ArrowRight") {
    nextSlide();
  } else if (event.key === "ArrowLeft") {
    prevSlide();
  } else if (event.key === " ") {
    event.preventDefault(); // جلوگیری از اسکرول
    zoomed ? zoomOut() : zoomIn();
  }
});

// نمایش کنترل‌ها با حرکت موس
function showControlsTemporarily() {
  document.body.classList.add("visible-controls");
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 4000); // افزایش به 4 ثانیه
}

document.addEventListener("mousemove", showControlsTemporarily);

// اسلاید اول در شروع
showSlide(index);
