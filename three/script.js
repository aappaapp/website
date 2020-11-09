var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var loader = new THREE.ObjectLoader();

loader.load(
    // resource URL
    "scene.json",

    // onLoad callback
    // Here the loaded data is assumed to be an object
    function (obj) {
        // Add the loaded object to the scene
        scene.add(obj);
    },

    // onProgress callback
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },

    // onError callback
    function (err) {
        console.error('An error happened');
    }
);


// Alternatively, to parse a previously loaded JSON structure
//var object = loader.parse(a_json_object);

//scene.add(object);

camera.position.z = 5;
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
