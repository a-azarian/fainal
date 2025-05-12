let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomLevel = 1;

function showSlide(i) {
    images.forEach(img => img.style.display = "none");
    images[i].style.display = "block";
}

function nextSlide() {
    index = (index + 1) % images.length;
    showSlide(index);
}

function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    showSlide(index);
}

// Toggle fullscreen mode
function toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => console.error("Fullscreen failed:", err));
    } else {
        document.exitFullscreen();
    }
}

// Exit fullscreen on Escape key press
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
});

// ✅ **اصلاح زوم برای تمامی اسلایدها**
function zoomIn() {
    zoomLevel = Math.min(zoomLevel + 0.2, 2);
    images[index].style.transform = `scale(${zoomLevel})`;
}

function zoomOut() {
    zoomLevel = Math.max(zoomLevel - 0.2, 1);
    images[index].style.transform = `scale(${zoomLevel})`;
}

// نمایش اولین اسلاید در بارگذاری صفحه
showSlide(index);
