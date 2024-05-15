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



document.addEventListener('DOMContentLoaded', () => {
    // Sayfa yüklendiğinde bir miktar geri tekerlek olayını simüle etmek için
    const container = document.getElementById('container');

    // Container üzerinde bir miktar geri tekerlek olayını simüle etmek için
    container.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }));

    // 5 saniye boyunca tekerlek olaylarını engellemek için
    let isEventBlocked = true;
    setTimeout(() => {
        isEventBlocked = false;
    }, 5000);

    // Container üzerinde tekerlek olayını dinlemek ve engellemek
    container.addEventListener('wheel', (e) => {
        if (isEventBlocked) {
            e.preventDefault();
        }
    });
});

//resim geri zoom yapıldı


// Resmin URL'si
const imageUrl = '3DMapExport8k.png';






// Resim yüklendiğinde

image.onload = function() {
    const originalWidth = image.width;
    const originalHeight = image.height;

    canvas.width = originalWidth;
    canvas.height = originalHeight;

    // Resmi çiz
    context.drawImage(image, 0, 0);

    // Maksimum zoom-out ölçeğini hesapla
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const scaleX = containerWidth / originalWidth;
    const scaleY = containerHeight / originalHeight;
    const initialScale = Math.min(scaleX, scaleY); // İlk ölçek en küçük boyuta göre belirlenir

    // Resmi başlangıç ölçeğinde göster
    scale = initialScale;
    draggable.style.transform = `translate(-50%, -50%) scale(${scale})`;
};

// Resmi yükle
image.src = imageUrl;

// Sayfa yüklendiğinde maksimum zoom-out işlemi için simülasyon
window.addEventListener('load', () => {
    // Fare tekerini geriye doğru döndürmüş gibi davranarak zoom-out işlemi
    const wheelEvent = new WheelEvent('wheel', {
        deltaY: 100, // Geriye doğru hareket miktarı (fare tekerini geriye döndürmek gibi)
    });

    container.dispatchEvent(wheelEvent); // Wheel event'ını tetikle
});




// Fonksiyonlar burada tanımlanacak

function openModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.style.display = 'flex';
}

function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.style.display = 'none';
}

// Sayfa tamamen yüklendiğinde çalışacak kod
window.onload = function() {
    // Yükleme ekranını gizle
    document.getElementById('loadingScreen').style.display = 'none';
    // Ana içeriği göster
    document.getElementById('container').style.display = 'block';
};












let timer; // Metnin otomatik olarak kaybolması için timer
let zoomLevel = 1; // Başlangıç yakınlaştırma seviyesi
let timeoutId; // Metnin otomatik olarak kaybolması için timer

const zoomTextElement = createZoomTextElement(); // Metin elementini oluştur

// Metin elementini oluştur
function createZoomTextElement() {
    const zoomTextElement = document.createElement("div");
    zoomTextElement.classList.add("zoom-text");
    zoomTextElement.style.position = "fixed";
    zoomTextElement.style.top = "50%";
    zoomTextElement.style.left = "50%";
    zoomTextElement.style.transform = "translate(-50%, -50%)";
    zoomTextElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    zoomTextElement.style.color = "white";
    zoomTextElement.style.padding = "8px 12px";
    zoomTextElement.style.borderRadius = "4px";
    zoomTextElement.style.fontSize = "30px";
    zoomTextElement.style.zIndex = "9999";
    zoomTextElement.style.display = "none"; // Başlangıçta gizli yap
    document.body.appendChild(zoomTextElement);

    return zoomTextElement;
}













// Container üzerinde fare tekeri olayını dinle
// Koordinat hesaplamalarını temizle veya durdur
function clearCoordinates() {
    // Koordinat hesaplamalarını temizle veya başka bir işlem yap
}

container.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1; // Aşağı kaydırma (zoom out) ise -1, yukarı kaydırma (zoom in) ise 1

    // Zoom seviyesini güncelle
    zoomLevel = Math.min(Math.max(zoomLevel + delta, -1), 7); // Min: -1, Max: +7

    // Koordinat hesaplamalarını kontrol et
    if (zoomLevel >= 1) {
        const rect = container.getBoundingClientRect();
        const scaledX = (e.clientX - rect.left) / zoomLevel - offsetX;
        const scaledY = (e.clientY - rect.top) / zoomLevel - offsetY;

        // Koordinatları kullanarak yapılacak işlem
        // createProfileWindow(clickedProfile);
    } else {
        // 1 veya daha küçükse, koordinat hesaplamalarını durdur
        clearCoordinates();
    }

    // Metni güncelle
    updateZoomText(delta);
});

// Yakınlaştırma metnini güncelle
function updateZoomText(delta) {
    clearTimeout(timeoutId); // Önceki gizleme zamanlayıcısını iptal et
    zoomTextElement.textContent = `x${zoomLevel}`;

    // Metni 1 saniye sonra gizle
    timeoutId = setTimeout(() => {
        zoomTextElement.style.display = "none";
    }, 1000);

    // Metni göster
    zoomTextElement.style.display = "block";
}













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
});



// Profil bilgileri ve resim butonları için açılan pencere oluşturma işlevi
// Küçük resim elementlerini saklayacak dizi
// Küçük resim elementlerini saklayacak dizi
let smallImages = [];

// Profil bilgileri ve resim butonları için açılan pencere oluşturma işlevi
function createProfileWindow(profileName) {
    const profile = profileData[profileName];
    const modalExpanded = true; // Modal durumunu burada ayarlayın (örneğin: genişletilmiş olarak varsayalım)

    // Modal overlay oluşturma
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    // Modal container oluşturma
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    // Modal overlay'a tıklanınca modalı kapat
    modalOverlay.addEventListener("click", function(event) {
        // Tıklanan elementin modal container veya içeriği olup olmadığını kontrol et
        if (event.target === modalOverlay) {
            // Modal overlay'ı ve içeriğini kaldır
            document.body.removeChild(modalOverlay);
        }
    });

    // Başlık
    const titleElement = document.createElement("h2");
    titleElement.textContent = profile.title;
    titleElement.classList.add("modal-title");
	titleElement.style.fontSize = profile.fontSize; // Font büyüklüğünü profilden al
    modalContainer.appendChild(titleElement);

    // Kapatma butonunu oluştur ve modal container'a ekle
    const closeButton = createCloseButton(modalOverlay);
    modalContainer.appendChild(closeButton);

    // Resim container'ı oluşturma
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    // Büyük resim container'ı
    const largeImageContainer = document.createElement("div");
    largeImageContainer.classList.add("large-image-container");
    modalContainer.appendChild(largeImageContainer);

    // Küçük resimlerin üzerine tıklandığında büyük resmi göster
    profile.images.forEach(imageSrc => {
        const imageElement = document.createElement("img");
        imageElement.src = imageSrc;
        imageElement.classList.add("small-image");

        imageElement.addEventListener("click", function() {
            // Önceki büyük resmi temizle
            largeImageContainer.innerHTML = '';

            // Büyük resmi oluştur
            const largeImage = document.createElement("img");
            largeImage.src = imageSrc; // Küçük resmin dosya yolu
            largeImage.classList.add("large-image");
            largeImageContainer.appendChild(largeImage);

            // Büyük resmi boyutlandırma
            largeImage.style.maxWidth = "70%"; // Maksimum genişlik
            largeImage.style.maxHeight = "80vh"; // Maksimum yükseklik
            largeImage.style.objectFit = "contain"; // Resmi container içinde uygun şekilde sığdır

            // Büyük resmi sağ tarafta konumlandır
            largeImageContainer.style.position = "absolute";
            largeImageContainer.style.top = "50%";
            largeImageContainer.style.right = "-100px";
            largeImageContainer.style.transform = "translateY(-50%)";
            largeImageContainer.style.opacity = "0"; // Başlangıçta görünmez
            largeImageContainer.style.zIndex = "-999"; // Diğer elementlerin üstüne çıkması için

            // Büyük resmi animasyonla görünür yap
            setTimeout(function() {
                largeImageContainer.style.opacity = "1";
            }, 50);

            // Modal Container'ı genişlet (sağa doğru animasyon)
            modalContainer.style.width = "calc(100% - 100px)";
            modalContainer.style.transition = "width 0.5s ease";
            modalContainer.style.transform = "translateX(-100px)";

            // Profil bilgilerini sola kaydır
            moveProfileInfoToLeft();
        });

        imageContainer.appendChild(imageElement);
    });

    modalContainer.appendChild(imageContainer);

    // Tam bilgi text alanı oluşturma
    const infoTextElement = document.createElement("p");
    infoTextElement.textContent = profile.infoText;
	
	// Çerçeve stili tanımlama
infoTextElement.style.border = "2px solid black"; // Çerçeve rengini ve kalınlığını ayarla
infoTextElement.style.borderRadius = "10px"; // Çerçeve ovalleşme yarıçapını ayarla
infoTextElement.style.padding = "10px"; // İçeriği çerçeveden ayırma


// Sayfaya eklemek için kullanabileceğiniz örnek:
document.body.appendChild(infoTextElement); // Veya istediğiniz bir başka elemente ekleyebilirsiniz
    
    // Modal durumuna göre stil sınıfını ekle
    const infoTextClass = modalExpanded ? 'info-text' : 'info-text-closed';
    infoTextElement.classList.add(infoTextClass);

    modalContainer.appendChild(infoTextElement);

    // Yorumları ekleyin
    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");
	
	// Çerçeve stili tanımlama
commentsContainer.style.border = "2px solid black"; // Çerçeve rengini ve kalınlığını ayarla
commentsContainer.style.borderRadius = "10px"; // Çerçeve ovalleşme yarıçapını ayarla
commentsContainer.style.padding = "10px"; // İçeriği çerçeveden ayırma

// Sayfaya eklemek için kullanabileceğiniz örnek:
document.body.appendChild(commentsContainer); // Veya istediğiniz bir başka elemente ekleyebilirsiniz

    profile.comments.forEach(comment => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");

        const avatarElement = document.createElement("img");
        avatarElement.src = comment.avatarSrc; // Yorum yapanın avatarının dosya yolu
        avatarElement.classList.add("avatar");
        commentElement.appendChild(avatarElement);

        const commentContent = document.createElement("div");
        commentContent.classList.add("comment-content");

        const userRatingContainer = document.createElement("div");
        userRatingContainer.classList.add("user-rating-container");

        const userElement = document.createElement("p");
        userElement.classList.add("user-label");
        userElement.textContent = `Ziyaretçi: ${comment.username}`;
        userRatingContainer.appendChild(userElement);

        const ratingElement = document.createElement("div");
        ratingElement.classList.add("rating-label");

        // Yıldız ikonlarını yıldız sayısı kadar ekleyin
        for (let i = 0; i < comment.starRating; i++) {
            const starIcon = document.createElement("img");
            starIcon.src = "star.png"; // Yıldız ikonunun dosya yolu
            starIcon.classList.add("star-icon");
            ratingElement.appendChild(starIcon);
        }

        userRatingContainer.appendChild(ratingElement);
        commentContent.appendChild(userRatingContainer);

        const commentTextElement = document.createElement("p");
        commentTextElement.classList.add("comment-label");
        commentTextElement.textContent = ` ${comment.commentText}`;
		commentTextElement.style.fontFamily = "'Pacifico', cursive"; // Pacifico fontunu uygula
        commentContent.appendChild(commentTextElement);

        commentElement.appendChild(commentContent);
        commentsContainer.appendChild(commentElement);
    });

    modalContainer.appendChild(commentsContainer);

    // Test butonu oluşturma ve modal içine ekleme
const testButton = document.createElement("button");
testButton.textContent = "Yorum ekle";
testButton.addEventListener("click", function() {
    // Yeni sekme açma işlemi
    window.open("https://forms.gle/66tvJ6khbSaV9mDNA", "_blank");
});


// Butona CSS sınıfı ekleme
testButton.classList.add("custom-test-button");

// Butona özel CSS stilleri eklemek için yeni bir <style> elementi oluşturma
const customButtonStyle = document.createElement("style");
customButtonStyle.textContent = `
.custom-test-button {
    background-image: url('button72minik.png');
    background-size: contain;
	background-repeat: no-repeat; /* Tekrarlamayı önlemek için */
    background-color: transparent;
    width: 110px;
    height: 45px;
    position: relative;
    top: 15px;
    left: -1px;
    padding: 5px;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease; /* Hover efekti için dönüşüm geçişi */
}


.custom-test-button:hover {
    background-image: url('button72minikhover.png');
    
}
`;

// Oluşturulan stil elementini <head> içine ekleme
document.head.appendChild(customButtonStyle);




modalContainer.appendChild(testButton);





if (profileName === "shanexx") {
    // 360 derece butonunu oluşturma
    const degree360Button = document.createElement("button");
    degree360Button.textContent = "Street View";
    degree360Button.classList.add("custom-360-button");

    // 360 derece butonuna özel CSS stillerini ekleme
    const custom360ButtonStyle = document.createElement("style");
    custom360ButtonStyle.textContent = `
        .custom-360-button {
            background-image: url('button72minik.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-color: transparent;
            width: 110px;
            height: 45px;
            position: relative;
            top: -29.7px;
            left: 120px;
            padding: 5px;
            border: none;
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        .custom-360-button:hover {
            background-image: url('button72minikhover.png');
        }
    `;

    // Oluşturulan stil elementini <head> içine ekleme
    document.head.appendChild(custom360ButtonStyle);

    // Modal container'a 360 derece butonunu ekleme
    modalContainer.appendChild(degree360Button);

    // Buton olay işleyicisi
    degree360Button.addEventListener("click", function() {
        const degree360Url = profile.images[0]; // Profilin 360 derece resim URL'sini al

        if (degree360Url) {
            // Yeni sekme açma işlemi
            const newWindow = window.open("360/index.html", "_blank");
            if (newWindow) {
                newWindow.onload = function() {
                    // Yeni sekmede 360 derece görüntüyü göster
                    newWindow.document.querySelector("#360image").src = degree360Url;
                };
            } else {
                alert("Yeni pencere açılamadı. Lütfen tarayıcı ayarlarını kontrol edin.");
            }
        } else {
            alert("Profil için 360 derece resim yolu bulunamadı.");
        }
    });
}















    // Modal container'ı modal overlay'e ekleme
    modalOverlay.appendChild(modalContainer);

    // Modal overlay'u sayfaya ekleme
    document.body.appendChild(modalOverlay);
}

// Kapatma butonu oluşturma işlevi
function createCloseButton(modalOverlay) {
    const closeButton = document.createElement("button");
    closeButton.textContent = "";
    closeButton.classList.add("close-button");

    // Butona mouseover event listener ekleme
    closeButton.addEventListener("mouseover", function() {
        closeButton.style.cursor = "pointer"; // Fare imleci pointer olacak
    });

    // Butondan çıkıldığında (mouseout) imleci geri döndürme
    closeButton.addEventListener("mouseout", function() {
        closeButton.style.cursor = "default"; // Fare imleci varsayılan olacak
    });

    // Butonun arkaplan resmini ve boyutunu ayarla
    closeButton.style.backgroundImage = "url('gericon.png')";
    closeButton.style.backgroundSize = "cover";
    closeButton.style.backgroundColor = "white"; // Butonun arkaplan rengi
    closeButton.style.width = "55px"; // Buton genişliği
    closeButton.style.height = "45px"; // Buton yüksekliği
    closeButton.style.position = "relative";
    closeButton.style.top = "-60px"; // Profil başlığının üzerinde pozisyon
    closeButton.style.left = "-10px"; // Profil başlığının solunda pozisyon
    closeButton.style.padding = "15px"; // Buton içeriğinden kenar boşluğu
    closeButton.style.border = "none"; // Butonun kenarlığını kaldır

    closeButton.addEventListener("click", function() {
        // Modalı kapat
        document.body.removeChild(modalOverlay);
    });

    return closeButton;
}

// Profil bilgilerini sola kaydıran işlev
function moveProfileInfoToLeft() {
    const profileTitle = document.querySelector(".modal-title");
    const profileContent = document.querySelector(".modal-container");

    if (profileTitle && profileContent) {
        profileTitle.style.transition = "margin-left 0.5s ease";
        profileTitle.style.marginLeft = "-3px"; // Başlığı sola kaydır
        profileContent.style.transition = "margin-left 0.5s ease";
        profileContent.style.marginLeft = "20px"; // Diğer içerikleri sağa kaydır

        // Close button'un da sola kayması için stil ekleyin
        const closeButton = document.querySelector(".close-button");
        if (closeButton) {
            closeButton.style.transition = "margin-top 0.5s ease";
            closeButton.style.marginLeft = "10px"; // Close button'u sola kaydırın
        }
    }
}


// DOMContentLoaded olayını dinleyerek çalıştırılacak kodlar
document.addEventListener("DOMContentLoaded", function() {
    
});




// Tarayıcı üzerindeki zoom seviyesini belirleme
function getCurrentZoomLevel() {
    const zoomFactor = window.devicePixelRatio || 1; // Cihaz piksel oranı

    // Tarayıcıdan elde edilen zoom faktörüne dayalı olarak hesaplama yapma
    const zoomLevel = Math.log2(zoomFactor); // Zoom faktöründen zoom seviyesini hesaplama

    return zoomLevel;
}

// Mevcut zoom seviyesini konsola yazdırma
console.log("Mevcut Zoom Seviyesi:", getCurrentZoomLevel());









// Koordinatlara tıklama olayını dinleme
container.addEventListener("click", function(event) {
    const rect = container.getBoundingClientRect();
    const x = Math.round((event.clientX - rect.left) / scale - offsetX);
    const y = Math.round((event.clientY - rect.top) / scale - offsetY);

    let isClickable = false;
    let clickedProfile = null;

    const profiles = {
        "shanexx": [ 
          { startX: 2119, endX: 2164, startY: -285, endY: -243 }


        ],
		"kilise": [
          { startX: 1463, endX: 1494, startY: 70, endY: 101 }

            
        ],
		"arena": [
           { startX: 1986, endX: 2028, startY: -356, endY: -317 }

            
        ],
		"gozlem": [
           { startX: 1629, endX: 1664, startY: -517, endY: -491 }

            
        ],
        "ada": [
           { startX: 687, endX: 806, startY: -1219, endY: -1114 }


        ],
        "kutuphane": [
            { startX: 1841, endX: 1892, startY: -435, endY: -392 }

        ],
         "okul": [
           { startX: 1740, endX: 1788, startY: -516, endY: -476 }

        ],
		
        "karnaval": [
          { startX: 1692, endX: 1744, startY: -779, endY: -735 }


        ],
        "hayvanbahcesi": [
        { startX: 1393, endX: 1426, startY: -590, endY: -563 }

		
		],
        "hipodrom": [
       { startX: 851, endX: 880, startY: -326, endY: -300 }

	   ],
        "belediye": [
       { startX: 2652, endX: 2699, startY: -402, endY: -364 }

	   
	   ],
        "arena2": [
      { startX: 2597, endX: 2637, startY: -84, endY: -36 }

	   ],
        "bungalov": [
     { startX: 2173, endX: 2207, startY: 127, endY: 155 }





        ],
        // Diğer profiller buraya eklenebilir
    };

    for (const profileName in profiles) {
        const profile = profiles[profileName];
        for (const area of profile) {
            if (x >= area.startX && x <= area.endX && y >= area.startY && y <= area.endY) {
                isClickable = true;
                clickedProfile = profileName;
                break;
            }
        }
        if (isClickable) break;
    }

    if (isClickable) {
        createProfileWindow(clickedProfile);
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
          { startX: 2119, endX: 2164, startY: -285, endY: -243 }





        ],
		"kilise": [
         { startX: 1463, endX: 1494, startY: 70, endY: 101 }

           
        ],
		"arena": [
          { startX: 1986, endX: 2028, startY: -356, endY: -317 }

           
        ],
		"gozlem": [
           { startX: 1629, endX: 1664, startY: -517, endY: -491 }


        ],
        "ada": [
           { startX: 687, endX: 806, startY: -1219, endY: -1114 }


        ],
        "kutuphane": [
           { startX: 1841, endX: 1892, startY: -435, endY: -392 }



        ],
        "okul": [
           { startX: 1740, endX: 1788, startY: -516, endY: -476 }


        ],
        "karnaval": [
         { startX: 1692, endX: 1744, startY: -779, endY: -735 }

		],
        "hayvanbahcesi": [
        { startX: 1393, endX: 1426, startY: -590, endY: -563 }


        ],
        "hipodrom": [
       { startX: 851, endX: 880, startY: -326, endY: -300 }

	   ],
        "belediye": [
       { startX: 2652, endX: 2699, startY: -402, endY: -364 }


       ],
        "arena2": [
      { startX: 2597, endX: 2637, startY: -84, endY: -36 }

	   ],
        "bungalov": [
     { startX: 2173, endX: 2207, startY: 127, endY: 155 }




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

const profileData = {
    "shanexx": {
        title: "Vilonya Belediyesi Şirinminber Camii",
        images: [
            "rehber/cami1.png",
            "rehber/cami2.png",
            "rehber/cami3.png"
        ],
        infoText: "28-02-2024 tarihinde yapımına başlanan ve kısa süre içinde halkın hizmetine açılan bir yapıdır. Ramazan ve Bayram günlerinde çeşitli etkinlikler düzenlenmektedir. Caminin arkasında, cenaze işlemleri için özel bir alan bulunmaktadır. ",
        comments: [
            {
                username: "Sümeyye",
                starRating: 5,
                commentText: "Tatil dönüşü uğradık, manzarası harika. 🙏 ",
                avatarSrc: "avatars/Guest45.png" // User123 için avatar dosya yolu
            },
            {
                username: "ShaNexx",
                starRating: 5,
                commentText: "Hemen yanında park var, gayet temiz.",
                avatarSrc: "avatars/shanexavatar.png" // Guest45 için avatar dosya yolu
            }
        ]

    },
    // Diğer profiller buraya eklenebilir
	
	 "kilise": {
        title: "Vilonya Belediyesi St. Anthony Kilisesi",
		fontSize: "28px", // Shanexx profilinin başlık font büyüklüğü
        images: [
            "rehber/kilise1.png",
            "rehber/kilise2.png",
            "rehber/kilise3.png"
        ],
        infoText: "10-03-2024 tarihinde yapımına başlanan ve kısa süre içinde ziyarete açılan St. Anthony Kilisesi, su kanalının girişinde adeta gelenleri selamlıyor. Tek kule tasarımıyla sade ve zarif bir görünüme sahiptir; ayrıca tüm şehir sakinleri için adeta bir sığınak niteliği taşımaktadır.",
        comments: [
            {
                username: "Cohnny",
                starRating: 5,
                commentText: "Tam kanalın solunda kalıyor, çok iyi konum. ✟ ",
                avatarSrc: "avatars/Guest45.png" // User123 için avatar dosya yolu
            },
           
        ]
    },
	
	
	
	"arena": {
        title: "Vilonya Belediyesi Şehir Arenası",
        images: [
            "rehber/arena1.png",
            "rehber/arena2.png",
            "rehber/arena3.png"
        ],
        infoText: "Quartz bloklarla döşenmiş olan arena, içerideki çarpışmaların yarattığı heyecanı ve gerilimi bir nevi hafifleten bir çeşme ve bahçe tasarımıyla süslenmiştir. Dağların arasında konumlanan arena da etkinlikler başlamadan bir saat önce ücretsiz hotdog ve popcorn hizmeti sunulmaktadır.",
        comments: [
            {
                username: "Lonca lideri Mahmut",
                starRating: 5,
                commentText: "Gapışacak varsa gelsin, ortam güzel. 👍 ",
                avatarSrc: "avatars/Guest45.png" // User123 için avatar dosya yolu
            },
           
        ]
    },
	
	 "gozlem": {
        title: "Vilonya Belediyesi Gözlem Kulesi",
        images: [
            "rehber/gozlem1.png",
            "rehber/gozlem2.png",
            "rehber/gozlem3.png"
        ],
        infoText: "Cenevizlilerin Turris Sancte Crucis'i kadar kıymetli, şehrin tepe noktalarından birinde yer alan gözlem kulesi, ahşap süslemeleri ve taş temeli ile bizzat Başkan Schvilo tarafından yapılmıştır. Dileyen vatandaşlar istediği zaman ziyarette bulunabilir. ",
        comments: [
            {
                username: "Diyarbakır Olimpiyatları Yaşar",
                starRating: 5,
                commentText: "Yüksekliği muazzam, harika bir atlayış gerçekleştirdim. 🙏 ",
                avatarSrc: "avatars/Guest45.png" // User123 için avatar dosya yolu
            },
            {
                username: "ShaNexx",
                starRating: 5,
                commentText: "Devletimiz sağolsun, kız arkadaşım ile ziyaret ettik ancak ilaç saatim gelince kendisi kayboldu.",
                avatarSrc: "avatars/shanexavatar.png" // Guest45 için avatar dosya yolu
            }
        ]
	},
	
	
	
	"ada": {
        title: "Süslü Ada",
		fontSize: "28px", // Shanexx profilinin başlık font büyüklüğü
        images: [
            "rehber/404.png",
            "rehber/404.png",
            "rehber/404.png"
        ],
        infoText: "İçerisinde çarşı ve Başkan Schvilo'nun konutu da bulunan ada, Petrichor Antik Köprüsü ile ana karaya bağlanmaktadır. Süslü Ada ismi adanın çeşitli noktalarında bulunan ve kırmızı süsler gibi görünen mantar ağaçlarından gelmektedir.",
        comments: [
            {
                username: "Kahve Gurmesi123",
                starRating: 5,
                commentText: "Adada bulunan Vilobucks'ın kahveleri çok iyi. ",
                avatarSrc: "avatars/Guest45.png" // User123 için avatar dosya yolu
            },
           
        ]
    },
	
	"kutuphane": {
        title: "Vilonya Halk Kütüphanesi",
		fontSize: "28px", // Shanexx profilinin başlık font büyüklüğü
        images: [
            "rehber/404.png",
            "rehber/404.png",
            "rehber/404.png"
        ],
        infoText: "Nitelikli kitap çeşitleri ve her zaman ulaşılabilir olmasıyla, Vilonya Halk Kütüphanesi tüm kitapseverlerin hizmetine sunulmuştur.",
        comments: [
            {
                username: "Okumuyorzabbie",
                starRating: 5,
                commentText: "İstediğim saate ziyaret ettiğim muhteşem bir yer. Adeta beni büyülüyor.🍷 ",
                avatarSrc: "avatars/Guest45.png" // User123 için avatar dosya yolu
            },
           
        ]
    },
	
	"okul": {
        title: "Fikir Çınarı İlköğretim Okulu",
		fontSize: "28px", // Shanexx profilinin başlık font büyüklüğü
        images: [
            "rehber/404.png",
            "rehber/404.png",
            "rehber/404.png"
        ],
        infoText: "Okul, hem gezici karnaval alanına hem de kütüphaneye yakınlığıyla ilgi çekici bir noktada.",
        comments: [
            {
                username: "Nergis Whitewater",
                starRating: 5,
                commentText: "Okl güzl ama makyaj yapmama izin vermiyrlar. :( ",
                avatarSrc: "avatars/Guest45.png" // User123 için avatar dosya yolu
            },
           
        ]
    },
	
		"karnaval": {
        title: "Karnaval Alanı - Vilonya Bahar Karnavalı",
		fontSize: "28px", // Shanexx profilinin başlık font büyüklüğü
        images: [
            "rehber/404.png",
            "rehber/404.png",
            "rehber/404.png"
        ],
        infoText: "Belirli dönemlerde birçok eğlencenin bulunduğu Gezici Karnaval, geleneksel olarak düzenlenir ve uzun süre devam eder.",
        comments: [
            {
                username: "Gözüne dondurma saplanan adam",
                starRating: 5,
                commentText: "Alandaki dondurmaların tadı çok güzel, beynim dondu ama hala yiyorum. ",
                avatarSrc: "avatars/Guest45.png" // User123 için avatar dosya yolu
            },
           
        ]
    },
	
		"hayvanbahcesi": {
        title: "Vilonya Lunapark & Mini Hayvanat Bahçesi",
		fontSize: "28px", // Shanexx profilinin başlık font büyüklüğü
        images: [
            "rehber/lunapark1.png",
            "rehber/lunapark2.png",
            "rehber/lunapark3.png"
        ],
        infoText: "İçerisinde birçok canlıya ev sahipliği yapan Vilonya Lunapark, çocuklar başta olmak üzere her kesimden insanın ilgisini çekiyor.",
        comments: [
            {
                username: "Bilgemsu",
                starRating: 5,
                commentText: "Hayvanlar haaarika içeride hamburgerci bilem var. 🌺 ",
                avatarSrc: "avatars/Guest45.png" // User123 için avatar dosya yolu
            },
           
        ]
    },
	
			"hipodrom": {
        title: "Bilyboy Hipodromu",
		fontSize: "28px", // Shanexx profilinin başlık font büyüklüğü
        images: [
            "rehber/hipodrom1.png",
            "rehber/hipodrom2.png",
            "rehber/hipodrom3.png"
        ],
        infoText: "Bilyboy Hipodromu, eğitim, alışveriş ve etkinlik alanlarına sahiptir. Ayrıca henüz isimlendirilmemiş atları ziyaret ederek onlara isim verebilirsiniz.",
        comments: [
            {
                username: "Şahin",
                starRating: 5,
                commentText: "Gülbatur en sevdiğim at, güzel kızım benim. 🏇",
                avatarSrc: "avatars/Guest45.png" // User123 için avatar dosya yolu
            },
            {
                username: "Haru Urara *Yeni*",
                starRating: 1,
                commentText: "Belediye at yarışlarına izin vermemiş. I do not like it. 👎",
                avatarSrc: "avatars/Guest45.png" // User123 için avatar dosya yolu
            },
        ]
    },
	
		"belediye": {
        title: "Vilonya Belediye Binası",
		fontSize: "28px", // Shanexx profilinin başlık font büyüklüğü
        images: [
            "rehber/404.png",
            "rehber/404.png",
            "rehber/404.png"
        ],
        infoText: "Vilonya Belediye Binası, mesai saatleri içerisinde ilgili departmanlar kullanılabilir.",
        comments: [
            
			 
             
                
            
           
        ]
    },
	
	
	
		"arena2": {
        title: "-762 1404",
		fontSize: "28px", // Shanexx profilinin başlık font büyüklüğü
        images: [
            "rehber/404.png",
            "rehber/404.png",
            "rehber/404.png"
        ],
        infoText: "-762 1404 Güncellenecektir.",
        comments: [
            
			 
             
                
            
           
        ]
    },
	
	
	"bungalov": {
        title: "Vilpanca Bungalov",
		fontSize: "28px", // Shanexx profilinin başlık font büyüklüğü
        images: [
            "rehber/bungalov1.png",
            "rehber/bungalov2.png",
            "rehber/bungalov3.png"
        ],
        infoText: "Önünden geçen harika akarsu manzarası ve gizliliğe önem veren kabinleriyle birlikte, Vilpanca Bungalov ziyaretçilerini bekliyor.",
        comments: [
            {
                username: "Sümeyye",
                starRating: 5,
                commentText: "Harika bir tatil oldu.🤭 ",
                avatarSrc: "avatars/Guest45.png" // User123 için avatar dosya yolu
            },
			{
                username: "Ankaralı Dul Memet",
                starRating: 5,
                commentText: "Saatlik kiralana biliyor olması güzel özellik. Sahibi gizliliye önem veriyor.",
                avatarSrc: "avatars/memet.png" // Guest45 için avatar dosya yolu
            }
           
        ]
    },
	
};


document.addEventListener("DOMContentLoaded", function() {
    // Burada çalıştırılacak kodlar
});


// Test butonunu seçme
const testButton = document.getElementById("testButton");

// Butona tıklama işlevi ekleme
testButton.addEventListener("click", function() {
    // Yeni sekme açma işlemi
    window.open("https://forms.gle/66tvJ6khbSaV9mDNA", "_blank");
});














