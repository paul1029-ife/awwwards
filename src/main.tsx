import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import Three from "./Three.tsx";
// import LoadGLB from "./examples/LoadGLB.tsx";
// import Dieties from "./examples/Dieties.tsx";
import Redesign from "./examples/Redesign.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Redesign />
  </StrictMode>
);
