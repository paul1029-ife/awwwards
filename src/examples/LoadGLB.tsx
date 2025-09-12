import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import React, { useEffect, useRef } from "react";
import {
  AmbientLight,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const LoadGLB = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current === null) return;

    const scene = new Scene();

    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
    });
    const texture = new TextureLoader().load("/person.jpg");
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    const controls = new OrbitControls(camera, renderer.domElement);

    const light = new AmbientLight("#FFFFFF", 1);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load("iphone.glb", (gltf) => {
      const model = gltf.scene;

      model.traverse((child) => {
        if ((child as any).isMesh) {
          if (child.name === "Screen") {
            // change to your actual screen mesh name
            (child as any).material = new MeshStandardMaterial({
              map: texture,
              metalness: 0.2,
              roughness: 0.8,
            });
          }
        }
      });

      model.position.set(0, 0, 0);
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
      <canvas ref={canvasRef} className="fixed top-0 left-0"></canvas>
    </div>
  );
};

export default LoadGLB;
