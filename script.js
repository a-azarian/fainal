let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;

// نمایش اسلاید مشخص
function showSlide(i) {
  images.forEach((img, idx) => {
    img.style.display = idx === i ? "block" : "none";
    img.style.transform = "scale(1)";
  });
  zoomed = false;
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

// زوم این به 1.5x
function zoomIn() {
  if (!zoomed) {
    getCurrentImage().style.transform = "scale(1.5)";
    zoomed = true;
  }
}

// زوم اوت به 1x
function zoomOut() {
  if (zoomed) {
    getCurrentImage().style.transform = "scale(1)";
    zoomed = false;
  }
}

// فعال‌سازی/خروج از حالت تمام صفحه
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
  }, 3000); // ۳ ثانیه پس از آخرین حرکت موس
}

document.addEventListener("mousemove", showControlsTemporarily);

// نمایش اسلاید اول در شروع
showSlide(index);
