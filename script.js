let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;

// همه دکمه‌های کنترل
const allControls = document.querySelector(".controls");
const navButtons = document.querySelectorAll(".prev, .next");

// نمایش اسلاید خاص
function showSlide(i) {
  images.forEach((img, idx) => {
    img.style.display = idx === i ? "block" : "none";
    img.style.transform = "scale(1)";
  });
  zoomed = false;

  // اگر اسلاید صفر بود، فقط دکمه شروع را نشان بده
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

// شروع ارائه: فعال کردن fullscreen و رفتن به اسلاید دوم
function startPresentation() {
  const elem = document.documentElement;
  elem.requestFullscreen().catch(err => console.error("Fullscreen failed:", err));
  index = 1;
  showSlide(index);
}

// رفتن به اسلاید بعدی
function nextSlide() {
  index = (index + 1) % images.length;
  showSlide(index);
}

// رفتن به اسلاید قبلی
function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide(index);
}

// گرفتن تصویر فعلی
function getCurrentImage() {
  return images[index];
}

// زوم فقط در دو مرحله (1x و 1.5x)
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

// فعال‌سازی/خروج fullscreen
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

// خروج از fullscreen با کلید Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

// نمایش کنترل‌ها هنگام حرکت موس
function showControlsTemporarily() {
  document.body.classList.add("visible-controls");
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 3000);
}

document.addEventListener("mousemove", showControlsTemporarily);

// شروع از اسلاید صفر
showSlide(index);
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
