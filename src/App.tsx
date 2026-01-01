import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import GlennCatteeeuw from "./examples/GlennCatteeuw";

function App() {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time);
    }

    const rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <GlennCatteeeuw />
    </>
  );
}

export default App;
