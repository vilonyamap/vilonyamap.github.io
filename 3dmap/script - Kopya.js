const container = document.getElementById("container");
const draggable = document.getElementById("draggable");

let scale = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let prevMouseX;
let prevMouseY;
let clickCount = 0;
let clickCoordinates = [];

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
        "SV13": [
           { startX: 1178, endX: 1232, startY: -171, endY: -136 },
            { startX: 838, endX: 890, startY: -406, endY: -375 },
            { startX: 713, endX: 767, startY: -494, endY: -460 }
        ],
		"Kodai_____": [
            { startX: 4523, endX: 4588, startY: 767, endY: 810 },
            { startX: 4181, endX: 4249, startY: 527, endY: 570 }
        ],
		"Mero": [
            { startX: 1926, endX: 1980, startY: 218, endY: 261 },
            { startX: 1926, endX: 1980, startY: 218, endY: 261 },
            { startX: 1471, endX: 1526, startY: -102, endY: -66 }
        ],
        "MightyManlyMe": [
            { startX: 1952, endX: 2007, startY: 105, endY: 136 },
            { startX: 1613, endX: 1667, startY: -134, endY: -101 },
            { startX: 1498, endX: 1553, startY: -214, endY: -180 }
        ],
        "cabi1r": [
            { startX: 2064, endX: 2117, startY: 99, endY: 131 },
            { startX: 1722, endX: 1776, startY: -139, endY: -107 },
            { startX: 1608, endX: 1662, startY: -219, endY: -186 }
        ],
        "TornadoWing": [
            { startX: 1504, endX: 1560, startY: 122, endY: 155 },
            { startX: 1220, endX: 1274, startY: -78, endY: -45 },
            { startX: 1118, endX: 1173, startY: -150, endY: -116 }
        ],
        "v4t0z": [
            { startX: 1229, endX: 1283, startY: 100, endY: 132 },
            { startX: 944, endX: 999, startY: -100, endY: -67 },
            { startX: 841, endX: 896, startY: -171, endY: -138 }
        ],
        "kuyruksuztilki": [
            { startX: 1252, endX: 1306, startY: 56, endY: 93 },
            { startX: 966, endX: 1021, startY: -140, endY: -108 },
            { startX: 862, endX: 918, startY: -213, endY: -179 }
        ],
        "iscanthere0": [
            { startX: 1187, endX: 1241, startY: -43, endY: -10 },
            { startX: 902, endX: 956, startY: -241, endY: -209 },
            { startX: 799, endX: 854, startY: -312, endY: -281 }
        ],
        "arif93": [
            { startX: 1179, endX: 1234, startY: -125, endY: -95 },
            { startX: 895, endX: 947, startY: -326, endY: -294 },
            { startX: 792, endX: 845, startY: -396, endY: -365 }
        ],
        "megas0xlr": [
            { startX: 1175, endX: 1228, startY: -316, endY: -286 },
            { startX: 892, endX: 945, startY: -518, endY: -486 },
            { startX: 789, endX: 843, startY: -589, endY: -558 }
        ],
        "Unvaksiya": [
            { startX: 1716, endX: 1772, startY: -312, endY: -279 },
            { startX: 1433, endX: 1485, startY: -511, endY: -477 },
            { startX: 1329, endX: 1384, startY: -582, endY: -549 }
        ],
        "TARHAN_16": [
            { startX: 940, endX: 995, startY: -523, endY: -488 },
            { startX: 655, endX: 710, startY: -721, endY: -687 },
			{ startX: 552, endX: 607, startY: -791, endY: -760 }
        ],
        "Tesla191": [
            { startX: 1812, endX: 1864, startY: -224, endY: -190 },
            { startX: 1526, endX: 1580, startY: -421, endY: -388 },
            { startX: 1424, endX: 1477, startY: -492, endY: -460 }
        ],
        "machinaobscura": [
            { startX: 1690, endX: 1744, startY: -222, endY: -189 },
            { startX: 1404, endX: 1459, startY: -421, endY: -389 }           
        ],
        "ekoo": [
            { startX: 436, endX: 490, startY: 300, endY: 333 },
            { startX: 151, endX: 206, startY: 101, endY: 132 },
            { startX: 48, endX: 102, startY: 29, endY: 62 }
        ]
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

// JavaScript dosyası

// Diğer kodlar...

container.addEventListener("mousemove", function(event) {
    const rect = container.getBoundingClientRect();
    const x = Math.round((event.clientX - rect.left) / scale - offsetX);
    const y = Math.round((event.clientY - rect.top) / scale - offsetY);

    let isClickable = false;
    let isDraggable = false; // Sürüklenebilir olup olmadığını kontrol etmek için eklenmiş bir değişken

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

    // Sürükleme işlemi kontrolü
    if (isDragging) {
        isDraggable = true;
    }

    // Eğer sürüklenmiyorsa ve tıklanabilir bir alandaysa, fare işaretini değiştir
    if (!isDraggable && isClickable) {
        container.style.cursor = "pointer";
    } else {
        container.style.cursor = "default";
    }
});

