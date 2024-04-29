// İhtiyaç duyulan değişkenler
let camera, scene, renderer;
let sphereMesh;

// Three.js sahnesi oluşturma
function init() {
    // Kamera oluşturma
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 1); // Kamera uzaklığı ayarla (z ekseni)
    camera.rotation.reorder('YXZ'); // Kamera dönme düzenini ayarla

    // Sahne oluşturma
    scene = new THREE.Scene();

    // Sphere oluşturma
    const geometry = new THREE.SphereGeometry(1000, 60, 40); // Küresel geometri oluştur
    geometry.scale(-1, 1, 1); // Sphere'ü içe doğru döndürme
    const texture = new THREE.TextureLoader().load('cami360.png'); // 360 derece görüntünün yüklenmesi
    const material = new THREE.MeshBasicMaterial({ map: texture });
    sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);

    // Renderer oluşturma
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Fare olaylarını dinleme
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// Fare hareketleri için olay işleyicileri
let isDragging = false, previousMousePosition;
function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onMouseMove(event) {
    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        const scale = 0.01; // Döndürme hızını ayarla
        sphereMesh.rotation.y -= deltaMove.x * scale; // Yatay (sağa-sola) döndürme
        sphereMesh.rotation.x -= deltaMove.y * scale; // Dikey (yukarı-aşağı) döndürme

        // Dikey döndürme sınırları (90 derece ile sınırlandır)
        sphereMesh.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, sphereMesh.rotation.x));

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
}

function onMouseUp(event) {
    isDragging = false;
}

// Render döngüsü
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Sayfa yüklendiğinde başlatma
window.onload = () => {
    init();
    animate();
};
