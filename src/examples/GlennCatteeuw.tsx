import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Renderer,
  Vec2,
  Vec4,
  Geometry,
  Texture,
  Program,
  Mesh,
  Flowmap,
} from "ogl";

const vertexShader = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform sampler2D tMap1;
  uniform sampler2D tMap2;
  uniform sampler2D tFlow;
  uniform float uTime;
  uniform float uMix; // 0.0 = Image A, 1.0 = Image B
  uniform vec4 uResolution;
  varying vec2 vUv;

  void main() {
    vec3 flow = texture2D(tFlow, vUv).rgb;
    
    // Logic to keep the image covering the screen (background-size: cover)
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (uResolution.z / uResolution.w), 1.0),
      min((uResolution.y / uResolution.x) / (uResolution.w / uResolution.z), 1.0)
    );
    
    vec2 uvCover = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // --- CHROMATIC ABERRATION & SAMPLING ---
    float distortionStrength = 0.05; 
    
    // Calculate offsets for RGB split based on flow
    vec2 rOffset = flow.rg * distortionStrength;
    vec2 gOffset = flow.rg * (distortionStrength * 1.1);
    vec2 bOffset = flow.rg * (distortionStrength * 1.2);

    // Sample Image A (tMap1)
    float r1 = texture2D(tMap1, uvCover + rOffset).r;
    float g1 = texture2D(tMap1, uvCover + gOffset).g;
    float b1 = texture2D(tMap1, uvCover + bOffset).b;
    vec4 color1 = vec4(r1, g1, b1, 1.0);

    // Sample Image B (tMap2)
    float r2 = texture2D(tMap2, uvCover + rOffset).r;
    float g2 = texture2D(tMap2, uvCover + gOffset).g;
    float b2 = texture2D(tMap2, uvCover + bOffset).b;
    vec4 color2 = vec4(r2, g2, b2, 1.0);

    // Smoothly mix between the two images
    gl_FragColor = mix(color1, color2, uMix);
  }
`;

const items = [
  "Coca-Cola X Marshme",
  "Shopify",
  "Premier League",
  "NBA X NFL",
  "Game of Thrones",
  "Lionnel Messi",
  "AVANTI",
  "Red Bull",
  "Interstellar",
  "Stranger Things",
];

const GlennCatteeuw = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const programRef = useRef(null);

  useEffect(() => {
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      canvas: canvasRef.current,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    let time = 0;

    const flowmap = new Flowmap(gl, {
      falloff: 0.3,
      dissipation: 0.92,
      alpha: 0.5,
    });

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    const texture1 = new Texture(gl);
    const img1 = new Image();
    img1.onload = () => {
      texture1.image = img1;
      onResizeGL();
    };
    img1.src = "/webgl.jpg";

    const texture2 = new Texture(gl);
    const img2 = new Image();
    img2.onload = () => {
      texture2.image = img2;
    };
    img2.src = "/webgl2.jpg";

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        tMap1: { value: texture1 },
        tMap2: { value: texture2 },
        tFlow: flowmap.uniform,
        uTime: { value: 0 },
        uMix: { value: 0 },
        uResolution: { value: new Vec4(0, 0, 1, 1) },
      },
    });

    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    const mouse = new Vec2(-1);
    const lastMouse = new Vec2(-1);
    const velocity = new Vec2(0);

    const onMouseMove = (e) => {
      mouse.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );

      if (lastMouse.x === -1) lastMouse.copy(mouse);

      velocity.set(mouse.x - lastMouse.x, mouse.y - lastMouse.y);
      velocity.needsUpdate = true;

      flowmap.aspect = window.innerWidth / window.innerHeight;
      flowmap.mouse.copy(mouse);

      const liquidStrength = 20.0;
      velocity.multiply(liquidStrength);

      flowmap.velocity.lerp(velocity, 1.0);

      lastMouse.copy(mouse);
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResizeGL = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      const imgWidth = img1.naturalWidth || 1;
      const imgHeight = img1.naturalHeight || 1;
      program.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight,
        imgWidth,
        imgHeight
      );
    };
    window.addEventListener("resize", onResizeGL);
    onResizeGL();

    const glTicker = (t) => {
      time = t;
      program.uniforms.uTime.value = time;

      if (!velocity.needsUpdate) {
        flowmap.mouse.set(-1);
        velocity.set(0);
      }
      velocity.needsUpdate = false;

      flowmap.update();
      renderer.render({ scene: mesh });
    };

    gsap.ticker.add(glTicker);

    const el = containerRef.current;
    let currentY = 0;
    let targetY = 0;
    let itemHeight = el.scrollHeight / 2;

    const onResizeScroll = () => {
      itemHeight = el.scrollHeight / 2;
      onResizeGL();
    };
    window.addEventListener("resize", onResizeScroll);

    const onWheel = (e) => {
      targetY -= e.deltaY;
    };

    const updateScroll = () => {
      currentY += (targetY - currentY) * 0.1;
      const wrappedY = gsap.utils.wrap(-itemHeight, 0, currentY);
      gsap.set(el, { y: wrappedY });
    };

    window.addEventListener("wheel", onWheel);
    gsap.ticker.add(updateScroll);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResizeScroll);
      window.removeEventListener("resize", onResizeGL);
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(updateScroll);
      gsap.ticker.remove(glTicker);
    };
  }, []);

  const handleItemEnter = (index) => {
    if (!programRef.current) return;

    const isEven = index % 2 === 0;
    const targetMix = isEven ? 1.0 : 0.0;

    gsap.to(programRef.current.uniforms.uMix, {
      value: targetMix,
      duration: 0.8,
      ease: "power2.out",
      overwrite: true,
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="fixed inset-0 pointer-events-none">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      <ul
        ref={containerRef}
        className="relative z-10 flex flex-col items-start gap-1.5 px-4 w-full will-change-transform"
      >
        {[...items, ...items].map((text, index) => (
          <li
            key={index}
            onMouseEnter={() => handleItemEnter(index)}
            className="w-fit uppercase font-bold text-7xl tracking-tighter text-white select-none mix-blend-overlay opacity-90 transition-transform duration-300 ease-out origin-left hover:-skew-x-12 cursor-pointer"
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlennCatteeuw;
