function zoomIn() {
    zoomLevel = Math.min(zoomLevel + 0.2, 2);
    images[index].style.transform = `scale(${zoomLevel})`;

    // ✅ دکمه‌ها را همیشه بالای صفحه نگه می‌داریم
    document.querySelectorAll(".controls, .prev, .next").forEach(btn => {
        btn.style.position = "fixed";
    });
}

function zoomOut() {
    zoomLevel = Math.max(zoomLevel - 0.2, 1);
    images[index].style.transform = `scale(${zoomLevel})`;

    // ✅ دکمه‌ها را به حالت اولیه برمی‌گردانیم
    document.querySelectorAll(".controls, .prev, .next").forEach(btn => {
        btn.style.position = "absolute";
    });
}
