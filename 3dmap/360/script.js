let camera, scene, renderer;
let sphereMesh;

function init() {
    // Kamera oluşturma
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 0, 2); // Kamerayı uzaklaştırarak görüntüyü daha küçük yapar

    // Sahne oluşturma
    scene = new THREE.Scene();

    // Sphere oluşturma
    const geometry = new THREE.SphereGeometry(1000, 60, 40);
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

        // Yalnızca yatay ve dikey yönlere izin vermek için
        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                0,
                toRadians(deltaMove.x * 0.1),
                toRadians(deltaMove.y * 0.1),
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

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.onload = () => {
    init();
    animate();
};
