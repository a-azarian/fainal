let index = 0;
const images = document.querySelectorAll(".slides img");
const slideImage = document.getElementById("slide-image");
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

// Zoom functionality (limited to 2x)
function zoomIn() {
    zoomLevel = Math.min(zoomLevel + 1, 2);
    slideImage.style.transform = `scale(${zoomLevel})`;
}

function zoomOut() {
    zoomLevel = Math.max(zoomLevel - 1, 1);
    slideImage.style.transform = `scale(${zoomLevel})`;
}

// Display the first image on page load
showSlide(index);
