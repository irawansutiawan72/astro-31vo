declare module "three" {
  export type ColorRepresentation = string | number;

  export class Vector3 {
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }

  export class Euler {
    x: number;
    y: number;
    z: number;
  }

  export class Object3D {
    position: Vector3;
    rotation: Euler;
    add(...objects: Object3D[]): this;
  }

  export class Color {
    constructor(value: ColorRepresentation);
  }

  export class Fog {
    constructor(color: ColorRepresentation, near: number, far: number);
  }

  export class Scene extends Object3D {
    background: Color | null;
    fog: Fog | null;
    traverse(callback: (object: Object3D) => void): void;
  }

  export class Group extends Object3D {}

  export class Camera extends Object3D {}

  export class PerspectiveCamera extends Camera {
    aspect: number;
    constructor(fov: number, aspect: number, near: number, far: number);
    updateProjectionMatrix(): void;
  }

  export class Material {
    dispose(): void;
  }

  export interface MeshStandardMaterialParameters {
    color?: ColorRepresentation;
    emissive?: ColorRepresentation;
    emissiveIntensity?: number;
    roughness?: number;
    metalness?: number;
    flatShading?: boolean;
  }

  export class MeshStandardMaterial extends Material {
    constructor(parameters?: MeshStandardMaterialParameters);
  }

  export class BufferGeometry {
    dispose(): void;
  }

  export class BoxGeometry extends BufferGeometry {
    constructor(width?: number, height?: number, depth?: number);
  }

  export class PlaneGeometry extends BufferGeometry {
    constructor(width?: number, height?: number);
  }

  export class CylinderGeometry extends BufferGeometry {
    constructor(
      radiusTop?: number,
      radiusBottom?: number,
      height?: number,
      radialSegments?: number,
    );
  }

  export class Mesh extends Object3D {
    geometry: BufferGeometry;
    material: Material | Material[];
    constructor(geometry?: BufferGeometry, material?: Material | Material[]);
  }

  export class Light extends Object3D {}
  export class HemisphereLight extends Light {
    constructor(skyColor?: ColorRepresentation, groundColor?: ColorRepresentation, intensity?: number);
  }
  export class DirectionalLight extends Light {
    constructor(color?: ColorRepresentation, intensity?: number);
  }
  export class PointLight extends Light {
    constructor(color?: ColorRepresentation, intensity?: number, distance?: number, decay?: number);
  }

  export interface WebGLRendererParameters {
    antialias?: boolean;
    alpha?: boolean;
    powerPreference?: "default" | "high-performance" | "low-power";
  }

  export class WebGLRenderer {
    constructor(parameters?: WebGLRendererParameters);
    domElement: HTMLCanvasElement;
    outputColorSpace: string;
    toneMapping: number;
    toneMappingExposure: number;
    setPixelRatio(ratio: number): void;
    setSize(width: number, height: number, updateStyle?: boolean): void;
    render(scene: Scene, camera: Camera): void;
    dispose(): void;
  }

  export const SRGBColorSpace: string;
  export const ACESFilmicToneMapping: number;
  export const MathUtils: {
    clamp(value: number, min: number, max: number): number;
  };
}
