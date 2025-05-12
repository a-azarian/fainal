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

// Enable fullscreen mode automatically
function openFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
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

// Zoom functionality
document.querySelector(".zoom-in").addEventListener("click", () => {
    zoomLevel = Math.min(zoomLevel + 0.5, 2);
    slideImage.style.transform = `scale(${zoomLevel})`;
});

document.querySelector(".zoom-out").addEventListener("click", () => {
    zoomLevel = Math.max(zoomLevel - 0.5, 1);
    slideImage.style.transform = `scale(${zoomLevel})`;
});

// Display the first image on page load
showSlide(index);
