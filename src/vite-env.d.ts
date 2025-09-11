/// <reference types="vite/client" />

declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera } from "three";
  export class OrbitControls {
    constructor(object: Camera, domElement?: HTMLElement);
    update(): void;
    dispose(): void;
    enableDamping: boolean;
    dampingFactor: number;
    enablePan: boolean;
  }
}
