import { useEffect, useRef } from "react";
import {
  AmbientLight,
  BoxGeometry,
  GridHelper,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PointLight,
  PointLightHelper,
  Scene,
  SphereGeometry,
  TextureLoader,
  TorusGeometry,
} from "three";
import { PerspectiveCamera } from "three";
import { WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Three() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current === null) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new WebGLRenderer({
      canvas: ref.current,
    });

    const controls = new OrbitControls(camera, renderer.domElement);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    const spaceTexture = new TextureLoader().load("/space.jpg");
    scene.background = spaceTexture;

    const paulTexture = new TextureLoader().load("/person.jpg");
    const paul = new Mesh(
      new BoxGeometry(3, 3, 3),
      new MeshBasicMaterial({ map: paulTexture })
    );
    paul.position.set(5, 0, 0);

    const moonTexture = new TextureLoader().load("/moon.jpg");
    const normalTexture = new TextureLoader().load("/normal.jpg");
    const moon = new Mesh(
      new SphereGeometry(2, 32, 32),
      new MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
    );
    moon.position.set(-5, 4, 0);

    scene.add(moon);
    scene.add(paul);
    const geometry = new TorusGeometry(3, 0.4, 100, 16);
    const material = new MeshStandardMaterial({
      color: "#FF3322",
      wireframe: false,
    });
    const torus = new Mesh(geometry, material);

    scene.add(torus);

    const pointLight = new PointLight("#ffffff");
    const ambientLight = new AmbientLight("#ffffff");
    const lightHelper = new PointLightHelper(pointLight);
    const gridHelper = new GridHelper(200, 50);
    pointLight.position.set(0, 0, 5);

    scene.add(pointLight, ambientLight, lightHelper, gridHelper);

    function addStar() {
      const starGeometry = new SphereGeometry(0.5, 24, 24);
      const starMaterial = new MeshStandardMaterial({ color: "#ffffff" });
      const star = new Mesh(starGeometry, starMaterial);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      scene.add(star);
    }

    Array(100).fill().forEach(addStar);

    function moveCamera() {
      const t = document.body.getBoundingClientRect().top;
      moon.position.x += 0.001;
      moon.position.z += 0.005;
      moon.position.y += 0.01;

      // paul.position.x += 0.2;
      // paul.position.y += 0.02;

      camera.position.x = t * -0.001;
      camera.position.y = t * -0.02;
      camera.position.z = t * -0.003;
    }

    document.body.onscroll = moveCamera;

    function animate() {
      requestAnimationFrame(animate);
      controls.update();

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;
      renderer.render(scene, camera);
    }

    animate();
  }, [ref]);

  return (
    <div className="min-h-screen w-full">
      <canvas ref={ref} className="fixed top-0 left-0"></canvas>
      <main className="absolute text-2xl">
        <header>
          <h1>Jeff Delaney</h1>
          <p>🚀 Welcome to my website!</p>
        </header>

        <blockquote>
          <p>I like making stuff and putting it on the internet</p>
        </blockquote>

        <section>
          <h2>📜 Manifesto</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>

        <section className="light">
          <h2>👩🏽‍🚀 Projects</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h2>🏆 Accomplishments</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>

        <blockquote>
          <p>
            The best way out is always through <br />
            -Robert Frost
          </p>
        </blockquote>

        <section className="left">
          <h2>🌮 Work History</h2>

          <h3>McDonalds</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3>Burger King</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3>Taco Bell</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>

        <blockquote>
          <p>Thanks for watching!</p>
        </blockquote>
      </main>
    </div>
  );
}
