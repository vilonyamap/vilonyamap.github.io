const container = document.getElementById("container");
const draggable = document.getElementById("draggable");

let scale = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let prevMouseX;
let prevMouseY;

// Canvas elementini oluştur
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
container.appendChild(canvas);

// PNG resminin yüklenmesini bekle
const image = new Image();
image.onload = function() {
    // Resmin orijinal boyutlarını al
    const originalWidth = image.width;
    const originalHeight = image.height;

    // Canvas boyutlarını resmin orijinal boyutlarına göre ayarla
    canvas.width = originalWidth;
    canvas.height = originalHeight;

    // PNG resmini Canvas üzerine çiz
    context.drawImage(image, 0, 0);

  // Tıklama olayını dinle
draggable.addEventListener("click", function(event) {
    // Tıklama noktasının koordinatlarını al
    const rect = draggable.getBoundingClientRect();
    const x = Math.round((event.clientX - rect.left) / scale - offsetX);
    const y = Math.round((event.clientY - rect.top) / scale - offsetY);

    // Koordinatları konsola yaz
    console.log(`Tıklama Koordinatları: (${x}, ${y})`);

    // Yeni aralığın başlangıç ve bitiş koordinatlarını belirle
    const startX = 6315;
    const endX = 6615;
    const startY = 2299;
    const endY = 2799;

    // Yeni aralık içinde mi kontrol et
    if (x >= startX && x <= endX && y >= startY && y <= endY) {
        // Belirli bir aralıkta tıklama yapıldığında iframe içinde gömülü bir pencere aç
        const iframeContainer = document.createElement("div");
        iframeContainer.style.position = "fixed";
        iframeContainer.style.top = "50%";
        iframeContainer.style.left = "50%";
        iframeContainer.style.transform = "translate(-50%, -50%)";
        iframeContainer.style.zIndex = "9999";
        iframeContainer.style.backgroundColor = "#fff";
        iframeContainer.style.padding = "20px";
        iframeContainer.style.borderRadius = "8px";
        iframeContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
        iframeContainer.style.width = "800px";
        iframeContainer.style.height = "800px";

        // Başlık çubuğu oluştur
        const titleBar = document.createElement("div");
        titleBar.style.display = "flex";
        titleBar.style.justifyContent = "space-between";
        titleBar.style.alignItems = "center";
        titleBar.style.marginBottom = "10px";

        // Başlık metni ekle
        const titleText = document.createElement("span");
        titleText.textContent = "Profil Bilgileri";
        titleText.style.fontWeight = "bold";
        titleBar.appendChild(titleText);

        // Kapatma düğmesi oluştur
        const closeButton = document.createElement("button");
        closeButton.textContent = "X";
        closeButton.style.border = "none";
        closeButton.style.backgroundColor = "transparent";
        closeButton.style.cursor = "pointer";
        closeButton.style.fontWeight = "bold";
        closeButton.style.fontSize = "16px";
        closeButton.style.color = "#999";
        closeButton.addEventListener("click", function() {
            // İframe penceresini kapat
            document.body.removeChild(iframeContainer);
        });
        titleBar.appendChild(closeButton);

        // Başlık çubuğunu iframe konteynırına ekle
        iframeContainer.appendChild(titleBar);

        // İframe oluştur
        const iframe = document.createElement("iframe");
        iframe.src = "https://mc-heads.net/user/0d04475c780e4443b698b5fe42190584";
        iframe.style.width = "100%";
        iframe.style.height = "calc(100% - 30px)"; // Başlık çubuğu yüksekliğini çıkar
        iframe.style.border = "none";

        // İframe'i konteynıra ekle
        iframeContainer.appendChild(iframe);

        // Konteynırı sayfaya ekle
        document.body.appendChild(iframeContainer);
    } else {
        // Yeni aralık dışında bir yere tıklandığında geri bildirimde bulun
        console.log("Belirli bir aralıkta tıklama yapılmadı.");
    }
});




    // Debug için kareleri çiz
    for (let x = 0; x < canvas.width; x += 10) {
        for (let y = 0; y < canvas.height; y += 10) {
            context.strokeStyle = "rgba(255, 0, 0, 0.5)";
            context.strokeRect(x, y, 10, 10);
        }
    }
};
image.src = draggable.src;

container.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.005; // Daha düşük zoom hassasiyeti
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Calculate mouse position relative to container center
    const mouseXRelativeToCenter = mouseX - containerRect.left - containerWidth / 2;
    const mouseYRelativeToCenter = mouseY - containerRect.top - containerHeight / 2;

    // Adjust scale based on mouse position
    const newScale = Math.min(Math.max(0.125, scale + delta), 4);

    // Calculate new offset based on mouse position and new scale
    offsetX -= mouseXRelativeToCenter * (newScale - scale);
    offsetY -= mouseYRelativeToCenter * (newScale - scale);

    // Limit offset to keep image within container
    const maxOffsetX = (draggable.clientWidth * newScale - containerWidth) / 2;
    const maxOffsetY = (draggable.clientHeight * newScale - containerHeight) / 2;

    offsetX = Math.min(Math.max(offsetX, -maxOffsetX), maxOffsetX);
    offsetY = Math.min(Math.max(offsetY, -maxOffsetY), maxOffsetY);

    scale = newScale;

    // Apply zoom with smooth transition
    draggable.style.transition = "transform 0.5s ease-in-out";
    draggable.style.transform = `translate(-50%, -50%) scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
});

draggable.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const deltaX = mouseX - prevMouseX;
    const deltaY = mouseY - prevMouseY;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    const imageWidth = draggable.clientWidth * scale;
    const imageHeight = draggable.clientHeight * scale;

    // Calculate maximum offset to keep image within container
    const maxOffsetX = (imageWidth - containerWidth) / 2;
    const maxOffsetY = (imageHeight - containerHeight) / 2;

    // Update offset within limits
    offsetX = Math.min(Math.max(offsetX + deltaX, -maxOffsetX), maxOffsetX);
    offsetY = Math.min(Math.max(offsetY + deltaY, -maxOffsetY), maxOffsetY);

    // Update image transform without animation
    draggable.style.transition = "none";
    draggable.style.transform = `translate(-50%, -50%) scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;

    prevMouseX = mouseX;
    prevMouseY = mouseY;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});
