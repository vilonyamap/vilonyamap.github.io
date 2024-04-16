// Minecraft haritasını yükleyin ve görüntüleyin
document.addEventListener("DOMContentLoaded", function() {
    var mapContainer = document.getElementById("map-container");
    var mapImage = new Image();
    mapImage.src = "minecraft_map2d.png"; // Minecraft haritasının dosya adını buraya ekleyin
    mapContainer.appendChild(mapImage);
});
