document.addEventListener("DOMContentLoaded", function() {
    const mapContainer = document.getElementById("map-container");
    const mapFrame = document.getElementById("map-frame");
    const toggleButton = document.getElementById("toggleButton");
    const streetViewButton = document.getElementById("streetViewButton");
    const iconContainer = document.getElementById("icon-container");
    const profileWindowButton = document.getElementById("profileWindowButton");

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
            openProfileWindow("shanexx"); // shanexx profilini aç
        });

        icon2.addEventListener("click", function() {
            openProfileWindow("profile2"); // Profil adını buraya yazın
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

    // Profil penceresini açma butonuna tıklama olayını ekle
    profileWindowButton.addEventListener("click", function() {
        openBlankProfileWindow();
    });

    // Profil penceresini açan işlev
    function openBlankProfileWindow() {
        const profileLink = "https://mc-heads.net/user/"; // Boş bir profil bağlantısı

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
        closeButton.addEventListener("click", function() {
            document.body.removeChild(iframeContainer);
        });
        titleBar.appendChild(closeButton);

        iframeContainer.appendChild(titleBar);

        const iframe = document.createElement("iframe");
        iframe.src = profileLink;
        iframe.style.width = "100%";
        iframe.style.height = "calc(100% - 40px)";
        iframeContainer.appendChild(iframe);

        document.body.appendChild(iframeContainer);
    }
});

const switchInput = document.querySelector('.switch__input');

switchInput.addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});



document.addEventListener("DOMContentLoaded", function() {
	const sabitAlan = document.getElementById("sabitAlan");
    const uyeOlButon = document.getElementById("uyeOlButon");
    const uyeOlPencere = document.getElementById("uyeOlPencere");
    const overlay = document.getElementById("overlay");
    const pencereKapat = document.getElementById("pencereKapat");

    uyeOlButon.addEventListener("click", function() {
      sabitAlan.classList.add("blur-effect");
      uyeOlPencere.style.display = "block";
      overlay.style.display = "block";
      document.body.style.overflow = "hidden"; // Sayfanın kaydırılmasını engelle

      // Dışarıda bir yere tıklandığında pencereyi kapat
      document.addEventListener("click", closeWindow);
    });


// Dışarıda bir yere tıklandığında pencereyi kapat
function closeWindow(event) {
  if (event.target !== uyeOlButon && event.target !== pencereKapat && event.target !== uyeOlPencere && !uyeOlPencere.contains(event.target)) {
    uyeOlPencere.style.display = "none";
    overlay.style.display = "none";
    sabitAlan.classList.remove("blur-effect");
	document.body.style.overflow = "auto"; // Sayfanın kaydırılmasını aktif et
  }
}


    pencereKapat.addEventListener("click", function() {
      sabitAlan.classList.remove("blur-effect");
      uyeOlPencere.style.display = "none";
      overlay.style.display = "none";
      document.body.style.overflow = "auto"; // Sayfanın kaydırılmasını aktif et
      document.removeEventListener("click", closeWindow); // Event listener'ı kaldır
    });

    document.addEventListener("click", function closeWindow(event) {
  if (event.target !== uyeOlButon && event.target !== pencereKapat && event.target !== uyeOlPencere && !uyeOlPencere.contains(event.target)) {
    uyeOlPencere.style.display = "none";
    overlay.style.display = "none";
    sabitAlan.classList.remove("blur-effect");
    document.removeEventListener("click", closeWindow); // Event listener'ı kaldır
  }
});
});

// Resim öğesini seç
var resim = document.getElementById("uyeOlResim");

// Resme tıklanınca açılacak bağlantı URL'si
var linkURL = "https://www.twitch.tv/schvilo";

// Resme tıklanınca bağlantıyı açmak için bir olay dinleyici ekle
resim.addEventListener("click", function() {
    window.open(linkURL, "_blank");
});


window.onload = function() {
    var popupTrigger = document.getElementById("popupTrigger");
    if (popupTrigger) {
        popupTrigger.onclick = function() {
            openPopup();
        };
    } else {
        console.error("popupTrigger öğesi bulunamadı.");
    }
};

function openPopup() {
    var popup = document.getElementById("popup");
    var overlay = document.createElement("div"); // Overlay oluştur
   
    popup.style.display = "block"; // Pencereyi görünür yap
}
function closePopup() {
    var popup = document.getElementById("popup");
    var overlay = document.querySelector(".overlay"); // Overlay'i seç
    if (overlay) {
        overlay.parentNode.removeChild(overlay); // Overlay'i kaldır
    }
    popup.style.display = "none"; // Pencereyi gizle
}



function openLink() {
    window.open("https://vilosbot.github.io/vilonya.github.io/", "_blank");
}
















const button = document.getElementById('sabitButon');
const redstoneImg = document.querySelector('.redstone-container img');
const redstoneortaImg = document.querySelector('.redstone-container2 .redstone-image2');
const redstoneorta2Img = document.querySelector('.redstone-container2 .redstone-image3');
const jukeboxGif1 = document.querySelector('.juke-box2');
const jukeboxGif2 = document.querySelector('.juke-box3');

// Ses dosyalarının yolu
const audioFiles = [
    'replik/Aga.mp3',
    'replik/angara.mp3',
    'replik/aramizda.mp3',
    'replik/askinolayim.mp3',
    'replik/AyBune.mp3',
    'replik/bakisine.mp3',
    'replik/bir.mp3',
    'replik/heriliski.mp3',
    'replik/koylu.mp3',
    'replik/memis.mp3',
    'replik/op.mp3',
    'replik/takipci.mp3',
    'replik/terbiyesiz.mp3',
    'replik/yayin.mp3'
];

let lastPlayedAudios = []; // Son çalınan seslerin geçmişini tutacak dizi
const maxHistorySize = 7; // Geçmişte saklanacak son ses sayısı

let isAudioPlaying = false; // Aktif ses kontrolü

function getRandomUniqueAudio() {
    // Rasgele bir ses seç
    let randomAudio;
    do {
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        randomAudio = audioFiles[randomIndex];
    } while (lastPlayedAudios.includes(randomAudio)); // Daha önce çalınan sesleri kontrol et

    // Geçmişte çalınan sesleri sakla
    lastPlayedAudios.push(randomAudio);
    if (lastPlayedAudios.length > maxHistorySize) {
        lastPlayedAudios.shift(); // Geçmiş boyutunu kontrol et
    }

    return new Audio(randomAudio);
}

button.addEventListener('click', function() {
    if (!isAudioPlaying) { // Aktif ses yoksa
        isAudioPlaying = true; // Ses çalınıyor olarak işaretle

        // İlk resmin değişimi
        redstoneImg.src = 'redstone_working1.png';
        // İkinci resmin değişimi
        setTimeout(() => {
            redstoneortaImg.src = 'redstoneorta_working1.png';
            // Üçüncü resmin değişimi
            setTimeout(() => {
                redstoneorta2Img.src = 'redstoneorta2_working2.png';

                // Rasgele ve benzersiz sesi çal
                const audio = getRandomUniqueAudio();
                audio.play(); // Ses çal

                // Ses çalma tamamlandığında
                audio.onended = function() {
                    // Resimlerin orijinal haline dönmesi
                    redstoneImg.src = 'redstone.png';
                    redstoneortaImg.src = 'redstoneorta.png';
                    redstoneorta2Img.src = 'redstoneorta2.png';
                    isAudioPlaying = false; // Ses çalınmıyor olarak işaretle

                    // Gifleri gizle
                    jukeboxGif1.style.display = 'none';
                    jukeboxGif2.style.display = 'none';
                };

                // Gifleri görünür hale getir
                jukeboxGif1.style.display = 'inline-block';
                jukeboxGif2.style.display = 'inline-block';
            }, 300); // 0.3 saniye sonra
        }, 300); // 0.3 saniye sonra
    }
});
