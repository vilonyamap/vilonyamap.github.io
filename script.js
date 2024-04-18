document.addEventListener("DOMContentLoaded", function() {
    const mapContainer = document.getElementById("map-container");
    const mapFrame = document.getElementById("map-frame");
    const toggleButton = document.getElementById("toggleButton");
    const streetViewButton = document.getElementById("streetViewButton");
    const iconContainer = document.getElementById("icon-container");

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Iconları ekleyen işlev
    function addIcons() {
        // Iconları harita resminin içine ekleyin
        const icon1 = document.createElement("div");
        icon1.classList.add("map-icon");
        icon1.style.left = "100px";
        icon1.style.top = "200px";
        iconContainer.appendChild(icon1);

        const icon2 = document.createElement("div");
        icon2.classList.add("map-icon");
        icon2.style.left = "1150px";
        icon2.style.top = "410px";
        iconContainer.appendChild(icon2);

        // Iconlara tıklama işlevi
        icon1.addEventListener("click", function() {
            alert("İkon 1'e tıklandı!");
        });

        icon2.addEventListener("click", function() {
            alert("İkon 2'ye tıklandı!");
        });
    }

    // Iconları gizleyen işlev
    function hideIcons() {
        iconContainer.style.display = "none";
    }

    // Iconları gösteren işlev
    function showIcons() {
        iconContainer.style.display = "block";
    }

    // 3D harita geçiş butonuna tıklama olayını ekle
    toggleButton.addEventListener("click", function() {
        if (toggleButton.textContent === "3D") {
            // 2D harita görünümünden 3D harita görünümüne geç
            mapFrame.src = "3dmap/index.html";
            toggleButton.textContent = "2D";
            streetViewButton.style.display = "inline-block"; // Street View butonunu göster
            showIcons(); // Iconları göster
        } else {
            // 3D harita görünümünden 2D harita görünümüne geç
            mapFrame.src = "unmined.index.html";
            toggleButton.textContent = "3D";
            streetViewButton.style.display = "none"; // Street View butonunu gizle
            hideIcons(); // Iconları gizle
        }
        resetMapSettings(); // Yakınlaştırma, uzaklaştırma ve kaydırma ayarlarını sıfırla
    });

    function resetMapSettings() {
        mapContainer.scrollLeft = 0;
        mapContainer.scrollTop = 0;
    }

    mapContainer.addEventListener("mousedown", function(event) {
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

            mapContainer.scrollLeft -= deltaX;
            mapContainer.scrollTop -= deltaY;

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
        const oldWidth = mapContainer.clientWidth;
        const oldHeight = mapContainer.clientHeight;

        // Yakınlaştırma işlemi için merkez noktayı hesapla
        const mouseX = event.offsetX || event.layerX;
        const mouseY = event.offsetY || event.layerY;

        // Yakınlaştırma işlemi
        mapContainer.style.width = oldWidth * zoomFactor + "px";
        mapContainer.style.height = oldHeight * zoomFactor + "px";

        // Yeni konumları hesapla
        const newScrollLeft = mapContainer.scrollLeft + mouseX * (oldWidth * zoomFactor / oldWidth) - mouseX;
        const newScrollTop = mapContainer.scrollTop + mouseY * (oldHeight * zoomFactor / oldHeight) - mouseY;

        // Yeni konumlara kaydır
        mapContainer.scrollLeft = newScrollLeft;
        mapContainer.scrollTop = newScrollTop;
    });

    // Iconları ekle
    addIcons();

    // Başlangıçta iconları gizle
    hideIcons();
});
