let index = 0;
const images = document.querySelectorAll(".slides img");
const slideImage = document.getElementById("slide-image");

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

// Zoom functionality (fixed at 1x)
document.querySelector(".zoom-in").addEventListener("click", () => {
    slideImage.style.transform = "scale(1)";
});

document.querySelector(".zoom-out").addEventListener("click", () => {
    slideImage.style.transform = "scale(1)";
});

// Display the first image on page load
showSlide(index);
