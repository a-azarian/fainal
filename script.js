let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;
let hideCursorTimer = null;

const allControls = document.querySelector(".controls");
const navButtons = document.querySelectorAll(".prev, .next");
const helpBar = document.querySelector(".keyboard-help");

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

    // نمایش راهنمای پایین فقط هنگام ورود به fullscreen
    helpBar.style.display = "block";
    setTimeout(() => {
      helpBar.style.display = "none";
    }, 4000);
  }).catch(err => console.error("Fullscreen failed:", err));
}

// کنترل کیبورد
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  else if (e.key === "ArrowLeft") prevSlide();
  else if (e.code === "Space") {
    e.preventDefault();
    zoomed ? zoomOut() : zoomIn();
  }
});

// کنترل دکمه‌ها
function nextSlide() {
  if (index < images.length - 1) {
    index++;
    showSlide(index);
  }
}

function prevSlide() {
  if (index > 1) {
    index--;
    showSlide(index);
  }
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

// تمام‌صفحه
function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().then(() => {
      helpBar.style.display = "block";
      setTimeout(() => {
        helpBar.style.display = "none";
      }, 4000);
    });
  } else {
    document.exitFullscreen();
  }
}

// کنترل موس و کنترل‌ها
function showControlsTemporarily() {
  document.body.classList.add("visible-controls");
  document.body.classList.remove("hide-cursor");

  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  if (hideCursorTimer) clearTimeout(hideCursorTimer);

  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 4000);

  hideCursorTimer = setTimeout(() => {
    document.body.classList.add("hide-cursor");
  }, 4000);
}

document.addEventListener("mousemove", showControlsTemporarily);

// شروع با اسلاید اول
showSlide(index);
