import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Three from "./Three.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Three />
  </StrictMode>
);
