document.addEventListener("DOMContentLoaded", function() {
    const mapContainer = document.getElementById("map-container");
    const mapFrame = document.getElementById("map-frame");
    const toggleButton = document.getElementById("toggleButton");
    const streetViewButton = document.getElementById("streetViewButton");

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let mapCenterX = 0;
    let mapCenterY = 0;
    let zoomLevel = 1;

    // Iconların referans noktalarını depolayacak bir dizi
    const iconReferences = [
        { x: 0.3, y: 0.4 }, // İkon 1 için referans noktası
        { x: 0.7, y: 0.6 }  // İkon 2 için referans noktası
    ];

    // 3D harita geçiş butonuna tıklama olayını ekle
    toggleButton.addEventListener("click", function() {
        if (toggleButton.textContent === "3D") {
            // 2D harita görünümünden 3D harita görünümüne geç
            mapFrame.src = "3dmap/index.html";
            toggleButton.textContent = "2D";
            streetViewButton.style.display = "inline-block"; // Street View butonunu göster
            addIcons(); // İkonları ekle
        } else {
            // 3D harita görünümünden 2D harita görünümüne geç
            mapFrame.src = "unmined.index.html";
            toggleButton.textContent = "3D";
            streetViewButton.style.display = "none"; // Street View butonunu gizle
            clearIcons(); // İkonları temizle
        }
        resetMapSettings(); // Yakınlaştırma, uzaklaştırma ve kaydırma ayarlarını sıfırla
    });

    // Street view butonuna tıklama olayını ekle
    streetViewButton.addEventListener("click", function() {
        // Burada street view işlemleri yapılabilir
    });

    function resetMapSettings() {
        mapContainer.scrollLeft = 0;
        mapContainer.scrollTop = 0;
        mapCenterX = 0;
        mapCenterY = 0;
        zoomLevel = 1;
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

        // Zoom seviyesini güncelle
        zoomLevel *= zoomFactor;

        // Haritanın merkez koordinatlarını güncelle
        mapCenterX += (event.offsetX - mapContainer.clientWidth / 2) * (1 - zoomFactor);
        mapCenterY += (event.offsetY - mapContainer.clientHeight / 2) * (1 - zoomFactor);

        // Haritayı zoomla
        mapContainer.style.transform = `scale(${zoomLevel})`;
        mapContainer.scrollLeft = mapCenterX;
        mapContainer.scrollTop = mapCenterY;

        // İkonların pozisyonunu güncelle
        updateIconPositions();
    });

    // Iconları ekleme fonksiyonu
    function addIcons() {
        iconReferences.forEach(function(ref, index) {
            const icon = document.createElement("div");
            icon.classList.add("map-icon");
            icon.style.left = ref.x * mapContainer.clientWidth + "px";
            icon.style.top = ref.y * mapContainer.clientHeight + "px";
            icon.style.backgroundImage = "url('icon.png')";
            mapContainer.appendChild(icon);

            // İkonlara tıklama işlevi
            icon.addEventListener("click", function() {
                alert("İkon " + (index + 1) + "'e tıklandı!");
            });
        });
    }

    // İkonların pozisyonunu güncelleme fonksiyonu
    function updateIconPositions() {
        iconReferences.forEach(function(ref, index) {
            const icon = document.querySelector(".map-icon:nth-child(" + (index + 1) + ")");
            if (icon) {
                icon.style.left = (ref.x * mapContainer.clientWidth - mapContainer.scrollLeft) + "px";
                icon.style.top = (ref.y * mapContainer.clientHeight - mapContainer.scrollTop) + "px";
            }
        });
    }

    // İkonları temizleme fonksiyonu
    function clearIcons() {
        const icons = document.querySelectorAll(".map-icon");
        icons.forEach(function(icon) {
            icon.parentNode.removeChild(icon);
        });
    }
});
