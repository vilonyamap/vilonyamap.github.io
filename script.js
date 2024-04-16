// Harita katmanları ve PNG dosyaları
const harita2D = document.getElementById('harita-2d');
const harita3D = document.getElementById('harita-3d');
const haritaPanoramik = document.getElementById('harita-panoramik');

const harita2DPng = 'minecraft_map2d.png';
const harita3DPng = 'harita3d.png';
const haritaPanoramikPng = 'harita_panoramik.png';

// Harita katmanlarını başlangıçta gizle
harita2D.style.opacity = 0;
harita3D.style.opacity = 0;
haritaPanoramik.style.opacity = 0;

// 2D haritayı varsayılan olarak göster
harita
