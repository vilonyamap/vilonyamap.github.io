const container = document.getElementById("container");
const draggable = document.getElementById("draggable");

let scale = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let prevMouseX;
let prevMouseY;
let clickCount = 0; // Yeni değişkenler
let clickCoordinates = []; // Yeni değişkenler

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
container.appendChild(canvas);

const image = new Image();
image.onload = function() {
    const originalWidth = image.width;
    const originalHeight = image.height;

    canvas.width = originalWidth;
    canvas.height = originalHeight;

    context.drawImage(image, 0, 0);

    for (let x = 0; x < originalWidth; x += 10) {
        for (let y = 0; y < originalHeight; y += 10) {
            context.strokeStyle = "rgba(255, 0, 0, 0.5)";
            context.strokeRect(x, y, 10, 10);
        }
    }
};
image.src = draggable.src;

container.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.005;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    const mouseXRelativeToCenter = mouseX - containerRect.left - containerWidth / 2;
    const mouseYRelativeToCenter = mouseY - containerRect.top - containerHeight / 2;

    const newScale = Math.min(Math.max(0.125, scale + delta), 4);

    offsetX -= mouseXRelativeToCenter * (newScale - scale);
    offsetY -= mouseYRelativeToCenter * (newScale - scale);

    const maxOffsetX = (draggable.clientWidth * newScale - containerWidth) / 2;
    const maxOffsetY = (draggable.clientHeight * newScale - containerHeight) / 2;

    offsetX = Math.min(Math.max(offsetX, -maxOffsetX), maxOffsetX);
    offsetY = Math.min(Math.max(offsetY, -maxOffsetY), maxOffsetY);

    scale = newScale;

    draggable.style.transition = "transform 0.5s ease-in-out";
    draggable.style.transform = `translate(-50%, -50%) scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
});

container.addEventListener("mousedown", (e) => {
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

    const maxOffsetX = (imageWidth - containerWidth) / 2;
    const maxOffsetY = (imageHeight - containerHeight) / 2;

    offsetX = Math.min(Math.max(offsetX + deltaX, -maxOffsetX), maxOffsetX);
    offsetY = Math.min(Math.max(offsetY + deltaY, -maxOffsetY), maxOffsetY);

    draggable.style.transition = "none";
    draggable.style.transform = `translate(-50%, -50%) scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;

    prevMouseX = mouseX;
    prevMouseY = mouseY;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});


container.addEventListener("click", function(event) {
    const rect = container.getBoundingClientRect();
    const x = Math.round((event.clientX - rect.left) / scale - offsetX);
    const y = Math.round((event.clientY - rect.top) / scale - offsetY);

    console.log(`Tıklama Koordinatları: (${x}, ${y})`);

    if (clickCount < 4) {
        clickCoordinates.push({ x, y });
        clickCount++;
        if (clickCount === 4) {
            console.log("Dört nokta belirlendi:", clickCoordinates);
            clickCoordinates = [];
            clickCount = 0;
        }
    }

    const profiles = {
        "shanexx": [ 
             { startX: 1953, endX: 2009, startY: 24, endY: 60 },
            { startX: 1613, endX: 1669, startY: -214, endY: -180 },
            { startX: 1500, endX: 1555, startY: -294, endY: -260 }
        ],
        // Diğer profillerin koordinat aralıklarını buraya ekleyebilirsin
    };

    let clickedProfile;
    let profileLink;
    for (const profileName in profiles) {
        const profile = profiles[profileName];
        for (const area of profile) {
            if (x >= area.startX && x <= area.endX && y >= area.startY && y <= area.endY) {
                clickedProfile = profileName;
                profileLink = `https://mc-heads.net/user/${clickedProfile}`;
                break;
            }
        }
        if (clickedProfile) break;
    }

    if (clickedProfile) {
        const iframeContainer = document.createElement("div");
        iframeContainer.style.position = "fixed";
        iframeContainer.style.top = "40%";
        iframeContainer.style.left = "50%";
        iframeContainer.style.transform = "translate(-50%, -50%)";
        iframeContainer.style.zIndex = "9999";
        iframeContainer.style.backgroundColor = "#fff";
        iframeContainer.style.padding = "20px";
        iframeContainer.style.borderRadius = "8px";
        iframeContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
        iframeContainer.style.width = "800px";
        iframeContainer.style.height = "700px";

        const titleBar = document.createElement("div");
        titleBar.style.display = "flex";
        titleBar.style.justifyContent = "space-between";
        titleBar.style.alignItems = "center";
        titleBar.style.marginBottom = "10px";

        const titleText = document.createElement("span");
        titleText.textContent = "Profil Bilgileri";
        titleText.style.fontWeight = "bold";
        titleBar.appendChild(titleText);

        const closeButton = document.createElement("button");
        closeButton.textContent = "X";
        closeButton.style.border = "none";
        closeButton.style.backgroundColor = "transparent";
        closeButton.style.cursor = "pointer";
        closeButton.style.fontWeight = "bold";
        closeButton.style.fontSize = "16px";
        closeButton.style.color = "#999";
        closeButton.addEventListener("click", function() {
            document.body.removeChild(iframeContainer);
        });
        titleBar.appendChild(closeButton);

        iframeContainer.appendChild(titleBar);

        const iframe = document.createElement("iframe");
        iframe.src = profileLink;
        iframe.style.width = "100%";
        iframe.style.height = "calc(100% - 30px)";
        iframe.style.border = "none";

        iframeContainer.appendChild(iframe);

        document.body.appendChild(iframeContainer);
    } else {
        console.log("Belirli bir aralıkta tıklama yapılmadı.");
    }
});

container.addEventListener("mousemove", function(event) {
    const rect = container.getBoundingClientRect();
    const x = Math.round((event.clientX - rect.left) / scale - offsetX);
    const y = Math.round((event.clientY - rect.top) / scale - offsetY);

    let isClickable = false;
    let isDraggable = false;

    const profiles = {
        "shanexx": [ 
             { startX: 1953, endX: 2009, startY: 24, endY: 60 },
            { startX: 1613, endX: 1669, startY: -214, endY: -180 },
            { startX: 1500, endX: 1555, startY: -294, endY: -260 }
        ],
        // Diğer profillerin koordinat aralıklarını buraya ekleyebilirsin
    };

    for (const profileName in profiles) {
        const profile = profiles[profileName];
        for (const area of profile) {
            if (x >= area.startX && x <= area.endX && y >= area.startY && y <= area.endY) {
                isClickable = true;
                break;
            }
        }
        if (isClickable) break;
    }

    if (isClickable) {
        container.classList.add("clickable-profile");
    } else {
        container.classList.remove("clickable-profile");
    }

    if (isDragging) {
        isDraggable = true;
    }

    if (!isDraggable && isClickable) {
        container.style.cursor = "pointer";
    } else {
        container.style.cursor = "grab";
    }
});
