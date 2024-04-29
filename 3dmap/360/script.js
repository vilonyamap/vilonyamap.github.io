let camera, scene, renderer;
let sphereMesh;

function init() {
    // Kamera oluşturma
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1); // Kamerayı daha yakın bir konuma getir

    // Sahne oluşturma
    scene = new THREE.Scene();

    // Sphere oluşturma
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Sphere'ü içe doğru döndürme
    const texture = new THREE.TextureLoader().load('cami360.png'); // 360 derece görüntünün yüklenmesi
    const material = new THREE.MeshBasicMaterial({ map: texture });
    sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);

    // Renderer oluşturma
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvasContainer').appendChild(renderer.domElement);

    // Fare olaylarını dinleme
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// Fare hareketleri için olay işleyicileri
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

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

        // Dikey hareketi kontrol et
        const rotationX = toRadians(deltaMove.y * 0.1); // Dikey hareket

        // Yatay dönüşü engelle
        const rotationY = 0; // Yatay hareket sıfırlandı

        // Kameranın dikey dönüş açısını sınırla (-90 ile 90 derece arası)
        camera.rotation.x = THREE.MathUtils.clamp(camera.rotation.x + rotationX, -Math.PI / 2, Math.PI / 2);

        // Yatay dönüşü doğrudan uygula (sıfırlandı)
        camera.rotation.y += rotationY;

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
}

function onMouseUp(event) {
    isDragging = false;
}

// Radyanları dereceye dönüştürme fonksiyonu
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.onload = () => {
    init();
    animate();
};
