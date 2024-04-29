// İhtiyaç duyulan değişkenler
let camera, scene, renderer;
let sphereMesh;

// Three.js sahnesi oluşturma
function init() {
    // Kamera oluşturma
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.target = new THREE.Vector3(0, 0, 0);

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

        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 0.1),
                toRadians(deltaMove.x * 0.1),
                0,
                'XYZ'
            ));

        sphereMesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, sphereMesh.quaternion);
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
