let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomLevel = 1;
let hideControlsTimer = null;

// نمایش اسلاید مشخص
function showSlide(i) {
  images.forEach((img, idx) => {
    img.style.display = idx === i ? "block" : "none";
    img.style.transform = "scale(1)";
  });
  zoomLevel = 1;
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

// فعال/غیرفعال کردن تمام‌صفحه
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

// خروج از حالت تمام‌صفحه با Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

// گرفتن تصویر فعال
function getCurrentImage() {
  return images[index];
}

// زوم این
function zoomIn() {
  zoomLevel = Math.min(zoomLevel + 0.2, 2);
  getCurrentImage().style.transform = `scale(${zoomLevel})`;
}

// زوم اوت
function zoomOut() {
  zoomLevel = Math.max(zoomLevel - 0.2, 1);
  getCurrentImage().style.transform = `scale(${zoomLevel})`;
}

// نمایش کنترل‌ها با حرکت موس
function showControlsTemporarily() {
  document.body.classList.add("visible-controls");
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 3000); // بعد از ۳ ثانیه مخفی می‌شود
}

document.addEventListener("mousemove", showControlsTemporarily);

// نمایش اسلاید اول هنگام بارگذاری
showSlide(index);
