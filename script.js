let index = 0;
const images = document.querySelectorAll(".slides img");

// زوم در 3 مرحله: 1 (عادی)، 1.5 (میانه)، 2 (حداکثر)
const zoomLevels = [1, 1.5, 2];
let zoomIndex = 0;
let hideControlsTimer = null;

// نمایش یک اسلاید خاص
function showSlide(i) {
  images.forEach((img, idx) => {
    img.style.display = idx === i ? "block" : "none";
    img.style.transform = "scale(1)";
  });
  zoomIndex = 0;
}

// دریافت تصویر فعلی
function getCurrentImage() {
  return images[index];
}

// حرکت به اسلاید بعدی
function nextSlide() {
  index = (index + 1) % images.length;
  showSlide(index);
}

// حرکت به اسلاید قبلی
function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide(index);
}

// زوم این (تا مرحله سوم)
function zoomIn() {
  if (zoomIndex < zoomLevels.length - 1) {
    zoomIndex++;
    applyZoom();
  }
}

// زوم اوت (تا مرحله اول)
function zoomOut() {
  if (zoomIndex > 0) {
    zoomIndex--;
    applyZoom();
  }
}

// اعمال زوم روی تصویر فعال
function applyZoom() {
  getCurrentImage().style.transform = `scale(${zoomLevels[zoomIndex]})`;
}

// تمام‌صفحه
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

// خروج از تمام‌صفحه با Escape
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

// شروع با اولین اسلاید
showSlide(index);
