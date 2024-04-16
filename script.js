document.addEventListener("DOMContentLoaded", function() {
    var mapContainer = document.getElementById("map-container");
    var mapImage = document.getElementById("map-image");

    // Harita görüntüsünü sürüklemek için etkinleştirme
    var isDragging = false;
    var startX = 0;
    var startY = 0;

    mapImage.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX - mapContainer.offsetLeft;
        startY = e.clientY - mapContainer.offsetTop;
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            e.preventDefault();
            var newX = e.clientX - mapContainer.offsetLeft;
            var newY = e.clientY - mapContainer.offsetTop;
            var deltaX = newX - startX;
            var deltaY = newY - startY;
            mapContainer.scrollLeft -= deltaX;
            mapContainer.scrollTop -= deltaY;
            startX = newX;
            startY = newY;
        }
    });

    // Fare tekerleği ile yakınlaştırma ve uzaklaştırma
    mapContainer.addEventListener('wheel', function(e) {
        e.preventDefault(); // Sayfanın kaydırılmasını engelle

        var delta = e.deltaY || e.detail || e.wheelDelta;

        var zoomSpeed = 0.1; // Yakınlaştırma hızı

        // Yakınlaştırma faktörünü belirle
        var zoomFactor = 1 + (delta > 0 ? -zoomSpeed : zoomSpeed); 

        // Görüntünün mevcut genişliği ve yüksekliği
        var oldWidth = mapImage.clientWidth;
        var oldHeight = mapImage.clientHeight;

        // Yeni genişlik ve yükseklik hesapla
        var newWidth = oldWidth * zoomFactor;
        var newHeight = oldHeight * zoomFactor;

        // Fare imleci konumuna göre yakınlaştırma işlemi
        var mouseX = e.clientX - mapImage.offsetLeft;
        var mouseY = e.clientY - mapImage.offsetTop;

        // Yakınlaştırma işlemi için merkez noktayı hesapla
        var widthDiff = newWidth - oldWidth;
        var heightDiff = newHeight - oldHeight;
        var scrollLeft = mapContainer.scrollLeft + mouseX * (widthDiff / oldWidth);
        var scrollTop = mapContainer.scrollTop + mouseY * (heightDiff / oldHeight);

        // Boyutları ve pozisyonu güncelle
        mapImage.style.width = newWidth + 'px';
        mapImage.style.height = newHeight + 'px';
        mapContainer.scrollLeft = scrollLeft;
        mapContainer.scrollTop = scrollTop;
    });
});
