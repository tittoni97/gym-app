import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import glb from './model.glb';
import defineA from './ex_a.js';
import defineB from './ex_b.js';
import defineC from './ex_c.js';

const D = THREE.MathUtils.degToRad;
const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const wrap = document.getElementById('stage');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
wrap.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe6eaee);
scene.fog = new THREE.Fog(0xe6eaee, 7, 16);
const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 50);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.9, 0);
controls.enablePan = false; controls.minDistance = 1.4; controls.maxDistance = 8;
controls.maxPolarAngle = D(89); controls.enableDamping = true;

scene.add(new THREE.HemisphereLight(0xffffff, 0x9a948c, 1.6));
const key = new THREE.DirectionalLight(0xfff4e8, 2.4);
key.position.set(2.2, 4, 3); key.castShadow = true; key.shadow.mapSize.set(2048, 2048);
key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02;
Object.assign(key.shadow.camera, { left: -1.6, right: 1.6, top: 2.4, bottom: -0.3, near: 0.5, far: 10 });
scene.add(key);
const rim = new THREE.DirectionalLight(0xdfe9ff, 1.1); rim.position.set(-3, 2.5, -3); scene.add(rim);

const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: 0xcfd5db, roughness: 0.95 }));
floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
const plat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.02, 2.0), new THREE.MeshStandardMaterial({ color: 0x2f3338, roughness: 0.9 }));
plat.position.y = 0.01; plat.receiveShadow = true; scene.add(plat);
const PLAT_TOP = 0.02;

// barbell: 2.2 m bar, 28 mm shaft, 20 kg plates (450 mm)
const bar = new THREE.Group();
const steel = new THREE.MeshStandardMaterial({ color: 0xc3c8cd, metalness: 0.95, roughness: 0.28 });
const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 1.31, 20), steel);
shaft.rotation.z = Math.PI / 2; bar.add(shaft);
const plateMat = new THREE.MeshStandardMaterial({ color: 0xc8233a, roughness: 0.45, transparent: true });
const rubber = new THREE.MeshStandardMaterial({ color: 0x1b1d20, roughness: 0.8, transparent: true });
for (const s of [-1, 1]) {
  const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.44, 20), steel);
  sleeve.rotation.z = Math.PI / 2; sleeve.position.x = s * 0.875; bar.add(sleeve);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 20), steel);
  collar.rotation.z = Math.PI / 2; collar.position.x = s * 0.67; bar.add(collar);
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.225, 0.225, 0.045, 48), plateMat);
  plate.rotation.z = Math.PI / 2; plate.position.x = s * 0.715; bar.add(plate);
  const rim2 = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.016, 10, 48), rubber);
  rim2.rotation.y = Math.PI / 2; rim2.position.x = s * 0.715; bar.add(rim2);
}
bar.traverse(o => { if (o.isMesh) o.castShadow = true; });
scene.add(bar);

