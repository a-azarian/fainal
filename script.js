let index = 0;
const images = document.querySelectorAll(".slides img");

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

// نمایش اولین تصویر هنگام بارگذاری صفحه
showSlide(index);
