let index = 0;
const images = document.querySelectorAll(".slides img");
const startScreen = document.querySelector(".start-screen");
const sliderContainer = document.querySelector(".slider-container");
const body = document.body;

function showSlide(i) {
  images.forEach((img, idx) => {
    img.classList.toggle("active", idx === i);
    img.style.transform = "scale(1)";
  });
  index = i;
  zoomed = false;
}

function startPresentation() {
  // درخواست فول اسکرین
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
  body.classList.add("started");
  startScreen.style.display = "none";
  showSlide(1);
}

// نمایش اسلاید بعدی و قبلی
function nextSlide() {
  let nextIndex = (index + 1) % images.length;
  if(nextIndex === 0) nextIndex = 1; // جلوگیری از اسلاید شروع
  showSlide(nextIndex);
}

function prevSlide() {
  let prevIndex = (index - 1 + images.length) % images.length;
  if(prevIndex === 0) prevIndex = images.length - 1;
  showSlide(prevIndex);
}

// زوم این و اوت
let zoomed = false;
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

// فول اسکرین کنترل دستی
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

// مخفی کردن نوار مرورگر در موبایل با تغییر اندازه و چرخش
function hideAddressBar() {
  // در صورت موبایل یا تبلت
  if(window.innerHeight < window.innerWidth) {
    // حالت افقی
    document.documentElement.style.height = window.innerHeight + "px";
    body.style.height = window.innerHeight + "px";
    sliderContainer.style.height = window.innerHeight + "px";

    // فول اسکرین خودکار درخواست شود
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  } else {
    // حالت عمودی
    document.documentElement.style.height = "100vh";
    body.style.height = "100vh";
    sliderContainer.style.height = "100vh";
  }
}

// به روز رسانی روی تغییر اندازه صفحه یا چرخش
window.addEventListener("resize", () => {
  hideAddressBar();
});

// اجرای اولیه برای مخفی کردن نوار مرورگر در موبایل
hideAddressBar();

// جلوگیری از زوم دو انگشتی در موبایل
document.addEventListener("touchmove", e => {
  if (e.touches.length > 1) e.preventDefault();
}, { passive: false });

// شروع نمایش اسلاید اول که استارت نشده
showSlide(0);
