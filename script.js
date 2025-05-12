let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomed = false;
let hideControlsTimer = null;

// نمایش اسلاید خاص
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

// دریافت تصویر فعلی
function getCurrentImage() {
  return images[index];
}

// زوم این: فقط یک بار (تا 2x)
function zoomIn() {
  if (!zoomed) {
    getCurrentImage().style.transform = "scale(2)";
    zoomed = true;
  }
}

// زوم اوت: بازگشت به اندازه عادی (1x)
function zoomOut() {
  if (zoomed) {
    getCurrentImage().style.transform = "scale(1)";
    zoomed = false;
  }
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

// خروج از fullscreen با کلید Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

// نمایش موقت کنترل‌ها با حرکت موس
function showControlsTemporarily() {
  document.body.classList.add("visible-controls");
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    document.body.classList.remove("visible-controls");
  }, 3000);
}

document.addEventListener("mousemove", showControlsTemporarily);

// نمایش اسلاید اول هنگام بارگذاری
showSlide(index);
