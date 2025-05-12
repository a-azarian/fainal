const slider = document.querySelector(".slider-container");
let scrollAmount = 0;
const step = 500; // Adjust scrolling speed

function scrollLeft() {
    scrollAmount -= step;
    slider.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
    });
}

function scrollRight() {
    scrollAmount += step;
    slider.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
    });
}
