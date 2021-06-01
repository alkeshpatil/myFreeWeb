import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import randomColor from "randomcolor";
import { NearestFilter } from "three";
import * as dat from "dat.gui";
const scene = new THREE.Scene();
// const gui = new dat.GUI();
//
//Materials
//ambientOcclusion

const loadTexture = new THREE.TextureLoader();
const doorColorTexture = loadTexture.load("/textures/door/color.jpg");
const doorAlphaTexture = loadTexture.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = loadTexture.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = loadTexture.load("/textures/door/height.jpg");
const doorMetalnessTexture = loadTexture.load("/textures/door/metalness.jpg");
const doorNormalTexture = loadTexture.load("/textures/door/normal.jpg");
const doorRoughnessTexture = loadTexture.load("/textures/door/roughness.jpg");
const matCapsTexture = loadTexture.load("/textures/matcaps/8.png");
const gradentTexture = loadTexture.load("/textures/gradients/5.jpg");
gradentTexture.magFilter = NearestFilter;
gradentTexture.minFilter = NearestFilter;
gradentTexture.generateMipmaps = false;
//I
//Objects
//

const material = new THREE.MeshNormalMaterial();
// //
// material.flatShading= true
// const material1 = new THREE.MeshMatcapMaterial();
// material1.matcap = matCapsTexture;
// const material = new THREE.MeshDepthMaterial();
// material.flatShading= true
// const material = new THREE.MeshPhongMaterial();
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradentTexture
// material.wireframe= true
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.displacementMap = doorHeightTexture;
// material.aoMapIntensity = 1;
// material.displacementScale = -0.4;
// gui.add(material, "metalness").min(0).max(1);
// gui.add(material, "roughness").min(0).max(1);
// gui.add(material, "displacementScale").min(-10).max(10);

// gui.add(material, "wireframe");
const material1 = new THREE.MeshPhongMaterial();
material.metalness = 0.03;
material.roughness = 0.46;
material.wireframe = true;
material1.wireframe = true;
material1.shininess = 100;
material1.specular = new THREE.Color("cyan");

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 4, 4),
  material
);
plane.position.y = -0.5;
plane.position.x = 0.1;

const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1, 9, 9, 9),
  material1
);
cube.position.x = 2.2;
cube.position.y = 1.2;
const triangle = new THREE.Mesh(
  new THREE.TetrahedronGeometry(0.8, 1),
  material1
);
triangle.position.x = -4;
triangle.position.y = -1.4;

scene.add(cube, triangle);
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.6, 16, 16),
  material1
);
// material1.color.set("cyan")
sphere.position.x = 3.7;
sphere.position.y = -1.5;

const tours = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.5, 0.2, 12, 32),
  material1
);
tours.position.x = -2.5;
tours.position.y = 1;

const ambiventLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight("white", 0.4);
pointLight.position.x = 4;
pointLight.position.y = 5;
pointLight.position.z = 6;

scene.add(tours, sphere, plane, pointLight);

//
//sizes
//
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
//
//Resizing screen
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
});
//
//Camers
//
const camera = new THREE.PerspectiveCamera(45, size.width / size.height);

camera.position.z = 5;

//renderd at html element
const canvas = document.querySelector(".webgl");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
renderer.setSize(size.width, size.height);
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);
  plane.rotation.x = 0.3 * elapsedTime;
  cube.rotation.x = 0.3 * elapsedTime;


  cube.rotation.y = 0.3 * elapsedTime;
  triangle.rotation.x = 0.3 * elapsedTime;
  triangle.rotation.y = 0.3 * elapsedTime;

  sphere.rotation.x = 0.3 * elapsedTime;
  tours.rotation.x = 0.3 * elapsedTime;
  plane.rotation.y = 0.3 * elapsedTime;
  sphere.rotation.y = 0.3 * elapsedTime;
  tours.rotation.y = 0.3 * elapsedTime;
  var color = randomColor();
  // material.color.set(color);

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
