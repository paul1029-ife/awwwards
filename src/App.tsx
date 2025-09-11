import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import gsap from "gsap";

// Phone model component
function PhoneModel() {
  const { scene } = useGLTF("/models/iphone.glb");
  const ref = useRef<any>();

  // Idle rotation
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
    }
  });

  // GSAP entry animation
  useEffect(() => {
    if (ref.current) {
      gsap.from(ref.current.position, {
        y: -2,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(ref.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={2}
      position={[0, 0.5, 0]} // moved up (was -1.2 before)
      rotation={[0.1, Math.PI / 4, 0]}
    />
  );
}

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 bg-gradient-to-b from-white to-gray-100">
      {/* Left content */}
      <div className="z-10 max-w-xl text-center lg:text-left space-y-6">
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Experience the Future of Mobile
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
          A sleek new design, cutting-edge performance, and immersive 3D
          experience. This is the phone you’ve been waiting for.
        </p>
        <div className="flex gap-4 justify-center lg:justify-start">
          <button className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition">
            Pre-Order Now
          </button>
          <button className="px-6 py-3 rounded-2xl border border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* 3D model */}
      <div className="absolute lg:static right-0 bottom-0 w-full h-[500px] lg:w-[600px] lg:h-[600px]">
        <Canvas camera={{ position: [0, 0, 6], fov: 42 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <PhoneModel />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </section>
  );
}
