let index = 0;
const images = document.querySelectorAll(".slides img");
let zoomLevel = 1;

// Show only the selected slide
function showSlide(i) {
    images.forEach((img, idx) => {
        img.style.display = (idx === i) ? "block" : "none";
        img.style.transform = "scale(1)";
    });
    zoomLevel = 1;
}

function nextSlide() {
    index = (index + 1) % images.length;
    showSlide(index);
}

function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    showSlide(index);
}

// Fullscreen toggle
function toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => console.error("Fullscreen failed:", err));
    } else {
        document.exitFullscreen();
    }
}

// Escape key exits fullscreen
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.fullscreenElement) {
        document.exitFullscreen();
    }
});

// Get currently visible image
function getCurrentImage() {
    return images[index];
}

// Zoom functions
function zoomIn() {
    zoomLevel = Math.min(zoomLevel + 0.2, 2);
    getCurrentImage().style.transform = `scale(${zoomLevel})`;
}

function zoomOut() {
    zoomLevel = Math.max(zoomLevel - 0.2, 1);
    getCurrentImage().style.transform = `scale(${zoomLevel})`;
}

// Initialize
showSlide(index);
