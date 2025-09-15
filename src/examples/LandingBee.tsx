import { useEffect, useRef } from "react";
import {
  AmbientLight,
  AnimationMixer,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function LandingBee() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current === null) return;

    const scene = new Scene();

    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // camera.position.z = 13;
    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    const light = new AmbientLight("#FFFFFF", 1);
    scene.add(light);

    const grid = new GridHelper(100, 100);
    scene.add(grid);
    const loader = new GLTFLoader();

    let mixer: AnimationMixer | null = null;

    loader.load("/microsoft_bee.glb", function (gltf) {
      const texture = new TextureLoader().load("person.jpg");
      const model = gltf.scene;
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[1]);
        action.play();
      }

      model.position.y = -1;
      model.position.x = 4;
      model.position.z = -40;
      model.rotation.y = 1.2;
      model.traverse((child) => {
        if ((child as Mesh).isMesh) {
          const mesh = child as Mesh;
          mesh.material = new MeshStandardMaterial({
            map: texture,
          });
        }
      });
      console.log(gltf.animations);
      model.position.set(1, -3, 1);
      scene.add(model);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(0.02);

      renderer.render(scene, camera);
    };
    animate();
  }, [canvasRef]);

  return (
    <div className="min-h-screen w-full">
      <canvas ref={canvasRef} className="fixed top-0 left-0 "></canvas>
    </div>
  );
}
