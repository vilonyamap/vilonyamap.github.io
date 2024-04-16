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
    mapContainer.addEventListener('wheel', function(e) {
        e.preventDefault(); // Sayfanın kaydırılmasını engelle
        var zoomSpeed = 0.1; // Yakınlaştırma hızı
        var zoom = e.deltaY * zoomSpeed;
        var currentWidth = mapImage.clientWidth;
        var currentHeight = mapImage.clientHeight;
        var newWidth = currentWidth + zoom;
        var newHeight = currentHeight + zoom;
        
        // Min ve max boyutları belirle
        var minZoom = 100;
        var maxZoom = 1000;
        newWidth = Math.min(Math.max(newWidth, minZoom), maxZoom);
        newHeight = Math.min(Math.max(newHeight, minZoom), maxZoom);
        
        // Yakınlaştırma işlemi için merkez noktayı hesapla
        var mouseX = e.clientX - mapImage.offsetLeft;
        var mouseY = e.clientY - mapImage.offsetTop;
        var widthDiff = newWidth - currentWidth;
        var heightDiff = newHeight - currentHeight;
        var zoomX = (mouseX / currentWidth) * widthDiff;
        var zoomY = (mouseY / currentHeight) * heightDiff;

        // Boyutları ve pozisyonu güncelle
        mapImage.style.width = newWidth + 'px';
        mapImage.style.height = newHeight + 'px';
        mapContainer.scrollLeft += zoomX;
        mapContainer.scrollTop += zoomY;
    });
});
