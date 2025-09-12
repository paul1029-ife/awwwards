import { useEffect, useRef } from "react";
import {
  AmbientLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function LandingBee() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current === null) return;

    const scene = new Scene();

    const camera = new PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // camera.position.z = 13;
    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    const light = new AmbientLight("#FFFFFF", 1);
    scene.add(light);

    const grid = new GridHelper(10, 10);
    scene.add(grid);
    const loader = new GLTFLoader();
    loader.load("/microsoft_bee.glb", function (gltf) {
      const model = gltf.scene;
      model.position.set(1, -3, 1);
      scene.add(model);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      renderer.render(scene, camera);
    };
    animate();
  }, [canvasRef]);

  return (
    <div className="min-h-screen w-full">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none"
      ></canvas>
    </div>
  );
}
