document.addEventListener("DOMContentLoaded", function() {
    const mapContainer = document.getElementById("map-container");
    const mapImage = document.getElementById("map-image");

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function resetMapSettings() {
        mapImage.style.width = "100%";
        mapImage.style.height = "auto";
        mapContainer.scrollLeft = 0;
        mapContainer.scrollTop = 0;
    }

    mapImage.addEventListener("mousedown", function(event) {
        if (event.button === 0) { // Sadece sol fare düğmesi
            isDragging = true;
            startX = event.clientX - mapContainer.offsetLeft;
            startY = event.clientY - mapContainer.offsetTop;
        }
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
    });

    document.addEventListener("mousemove", function(event) {
        if (isDragging) {
            event.preventDefault();
            const newX = event.clientX - mapContainer.offsetLeft;
            const newY = event.clientY - mapContainer.offsetTop;
            const deltaX = newX - startX;
            const deltaY = newY - startY;

            // Yatay ve dikey sınır kontrolü
            if (mapContainer.scrollLeft - deltaX < 0) {
                mapContainer.scrollLeft = 0;
            } else if (mapContainer.scrollLeft - deltaX >= mapImage.offsetWidth - mapContainer.offsetWidth) {
                mapContainer.scrollLeft = mapImage.offsetWidth - mapContainer.offsetWidth;
            } else {
                mapContainer.scrollLeft -= deltaX;
            }

            if (mapContainer.scrollTop - deltaY < 0) {
                mapContainer.scrollTop = 0;
            } else if (mapContainer.scrollTop - deltaY >= mapImage.offsetHeight - mapContainer.offsetHeight) {
                mapContainer.scrollTop = mapImage.offsetHeight - mapContainer.offsetHeight;
            } else {
                mapContainer.scrollTop -= deltaY;
            }

            startX = newX;
            startY = newY;
        }
    });

    mapContainer.addEventListener("wheel", function(event) {
        event.preventDefault(); // Sayfanın kaydırılmasını engelle

        const delta = event.deltaY || event.detail || event.wheelDelta;
        const zoomSpeed = 0.1; // Yakınlaştırma hızı

        // Yakınlaştırma faktörünü belirle
        const zoomFactor = 1 + (delta > 0 ? -zoomSpeed : zoomSpeed);

        // Görüntünün mevcut genişliği ve yüksekliği
        const oldWidth = mapImage.clientWidth;
        const oldHeight = mapImage.clientHeight;

        // Fare imlecinin resimdeki konumunu hesapla
        const mouseX = event.offsetX || event.layerX;
        const mouseY = event.offsetY || event.layerY;

        // Yakınlaştırma işlemi için merkez noktayı hesapla
        const widthDiff = oldWidth * (zoomFactor - 1);
        const heightDiff = oldHeight * (zoomFactor - 1);
        const newScrollLeft = mapContainer.scrollLeft + mouseX * (widthDiff / oldWidth) - (widthDiff / 2);
        const newScrollTop = mapContainer.scrollTop + mouseY * (heightDiff / oldHeight) - (heightDiff / 2);

        // Boyutları ve pozisyonu güncelle
        mapImage.style.width = oldWidth * zoomFactor + "px";
        mapImage.style.height = oldHeight * zoomFactor + "px";
        mapContainer.scrollLeft = newScrollLeft;
        mapContainer.scrollTop = newScrollTop;
    });

    // 3D harita geçiş butonunu oluştur
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggleButton";
    toggleButton.textContent = "3D";
    document.body.appendChild(toggleButton);

    // 3D harita geçiş butonuna tıklama olayını ekle
    toggleButton.addEventListener("click", function() {
        if (mapImage.src.includes("minecraft_map2d.png")) {
            // 2D harita görünümünden 3D harita görünümüne geç
            mapImage.src = "3DMapExport8k.png";
            toggleButton.textContent = "2D";
            resetMapSettings(); // Yakınlaştırma, uzaklaştırma ve kaydırma ayarlarını sıfırla
        } else {
            // 3D harita görünümünden 2D harita görünümüne geç
            mapImage.src = "minecraft_map2d.png";
            toggleButton.textContent = "3D";
            resetMapSettings(); // Yakınlaştırma, uzaklaştırma ve kaydırma ayarlarını sıfırla
        }
    });
});
