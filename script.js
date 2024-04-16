document.addEventListener("DOMContentLoaded", function() {
    var mapContainer = document.getElementById("map-container");
    var mapImage = document.getElementById("map-image");

    // Harita görüntüsünü sürüklemek için etkinleştirme
    var isDragging = false;
    var lastX = 0;
    var lastY = 0;

    mapImage.addEventListener('mousedown', function(e) {
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
    });

    mapImage.addEventListener('mouseup', function() {
        isDragging = false;
    });

    mapImage.addEventListener('mousemove', function(e) {
        if (isDragging) {
            var deltaX = e.clientX - lastX;
            var deltaY = e.clientY - lastY;
            mapContainer.scrollLeft -= deltaX;
            mapContainer.scrollTop -= deltaY;
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    // Fare tekerleği ile yakınlaştırma
    mapImage.addEventListener('wheel', function(e) {
        e.preventDefault(); // Sayfanın kaydırılmasını engelle
        var zoomSpeed = 0.1; // Yakınlaştırma hızı
        var zoom = e.deltaY * zoomSpeed;
        var currentWidth = mapImage.clientWidth;
        var currentHeight = mapImage.clientHeight;
        var newWidth = currentWidth + zoom;
        var newHeight = currentHeight + zoom;
        // Boyutları güncelle
        mapImage.style.width = newWidth + 'px';
        mapImage.style.height = newHeight + 'px';
        // Kaydırma oranını güncelle
        var deltaX = (e.clientX - mapImage.offsetLeft) * (newWidth / currentWidth) - e.clientX;
        var deltaY = (e.clientY - mapImage.offsetTop) * (newHeight / currentHeight) - e.clientY;
        mapContainer.scrollLeft += deltaX;
        mapContainer.scrollTop += deltaY;
    });
});
