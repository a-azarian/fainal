let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;
let cursorTimer = null;

const allControls = document.querySelector(".controls");
const navButtons = document.querySelectorAll(".prev, .next");

let keyGuide;

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
  showKeyGuide();
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

// Space: زوم این و آوت با یک کلید
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    if (zoomed) zoomOut();
    else zoomIn();
    showKeyGuide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
    showKeyGuide();
  } else if (e.key === "ArrowLeft") {
    prevSlide();
    showKeyGuide();
  }
});

// تمام‌صفحه
function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => console.error("Fullscreen failed:", err));
    showKeyGuide();
  } else {
    document.exitFullscreen();
  }
}

// خروج از فول‌اسکرین با Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

// نوار راهنمای کلیدها
function showKeyGuide() {
  if (!keyGuide) {
    keyGuide = document.createElement("div");
    keyGuide.className = "key-guide";
    keyGuide.textContent = "Use ← → for slides, Space for zoom";
    document.body.appendChild(keyGuide);
  }

  keyGuide.classList.add("show");

  setTimeout(() => {
    keyGuide.classList.remove("show");
  }, 4000);
}

// کنترل‌های موس
function showControlsTemporarily() {
  document.body.classList.add("visible-controls");
  document.body.classList.remove("hide-cursor");

  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  if (cursorTimer) clearTimeout(cursorTimer);

  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 4000);

  cursorTimer = setTimeout(() => {
    document.body.classList.add("hide-cursor");
  }, 4000);
}

document.addEventListener("mousemove", showControlsTemporarily);

// نمایش اسلاید اول در شروع
showSlide(index);
