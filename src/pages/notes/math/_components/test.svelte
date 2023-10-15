<script>
    import * as THREE from "three";
    import { onMount } from "svelte";

    let container;

    onMount(() => {
        const width = 300;
        const height = 100;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        const camera = new THREE.OrthographicCamera(
            -width / 100,
            width / 100,
            height / 100,
            -height / 100,
            0.1,
            2000
        );

        const geometry = new THREE.ConeGeometry(1, 1, 3);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.z = -1;
        scene.add(cube);

        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            cube.rotation.y += delta;
            renderer.render(scene, camera);
        }
        animate();
    });
</script>

<div bind:this={container} />
