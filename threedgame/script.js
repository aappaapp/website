//scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Floor
const FloorGeo = new THREE.PlaneGeometry(1, 1);
const FloorMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const FloorPlane = new THREE.Mesh(FloorGeo, FloorMat);
scene.add(FloorPlane);
FloorPlane.scale.x = 10;
FloorPlane.scale.z = 10;

//Character
const CharGeo = new THREE.SphereGeometry(1, 32, 32);
const CharMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const CharSphere = new THREE.Mesh(CharGeo, CharMat);
scene.add(CharSphere);
CharSphere.scale.y = 2;
CharSphere.position.y = 2;

//render
camera.position.y = 5;
camera.position.z = 5;
camera.rotation.x = -1;

function animate() {
	requestAnimationFrame(animate);
	camera.rotation.x += 0.025;
	camera.rotation.y += 0.025;
	camera.rotation.z += 0.025;
	camera.position.x -= 0.025;
	camera.position.z -= 0.025;
	renderer.render(scene, camera);
}
animate();
