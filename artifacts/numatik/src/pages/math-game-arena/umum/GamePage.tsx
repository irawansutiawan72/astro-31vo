import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

type MoveInput = { x: number; y: number };
type QualitySetting = "low" | "medium" | "high";
type BoxInstanceSpec = {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  solid?: boolean;
};
type DroneState = {
  group: THREE.Group;
  parts: THREE.Mesh[];
  baseX: number;
  baseY: number;
  baseZ: number;
  phase: number;
  alive: boolean;
};

const QUALITY_PIXEL_RATIOS: Record<QualitySetting, number> = { low: 1, medium: 1.5, high: 2 };
const getQualityPixelRatio = (quality: QualitySetting) => (
  Math.min(window.devicePixelRatio || 1, QUALITY_PIXEL_RATIOS[quality])
);

const GamePage = () => {
  const navigate = useNavigate();
  const mountRef = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState(false);
  const [mobile, setMobile] = useState(false);
  const mobileRef = useRef(mobile);
  const [quality, setQuality] = useState<QualitySetting>("medium");
  const qualityRef = useRef<QualitySetting>("medium");
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [joystick, setJoystick] = useState<MoveInput>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [droneCount, setDroneCount] = useState(0);
  const fireRef = useRef<(() => void) | null>(null);
  const keys = useRef<Record<string, boolean>>({});
  const jumpRequested = useRef(false);
  const moveInput = useRef<MoveInput>({ x: 0, y: 0 });
  const lookDelta = useRef<MoveInput>({ x: 0, y: 0 });
  const lookPointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const joystickPointer = useRef<number | null>(null);

  useEffect(() => {
    const updateMobile = () => {
      const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 760;
      mobileRef.current = isMobile;
      setMobile(isMobile);
    };
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    let teardown: (() => void) | undefined;
    const initFrame = window.requestAnimationFrame(() => {
      if (!host.isConnected) return;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
      } catch (error) {
        console.error("Numatik Strike gagal membuat WebGLRenderer:", error);
        const fallback = document.createElement("div");
        fallback.className = "strike-render-error";
        const message = document.createElement("div");
        message.textContent = "Perangkat ini belum mendukung arena 3D.";
        const detail = document.createElement("small");
        detail.textContent = (error instanceof Error ? error.message : String(error)).slice(0, 240);
        fallback.append(message, detail);
        host.replaceChildren(fallback);
        return;
      }
    rendererRef.current = renderer;
    renderer.setPixelRatio(getQualityPixelRatio(qualityRef.current));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.shadowMap.enabled = false;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.domElement.className = "strike-canvas";
    renderer.domElement.setAttribute("aria-label", "Arena Numatik Strike");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ad7770");
    scene.fog = new THREE.Fog("#a47b78", 46, 138);
    const camera = new THREE.PerspectiveCamera(72, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 160);
    const player = new THREE.Group();
    player.position.set(0, 1.65, 51);
    scene.add(player);
    player.add(camera);

    scene.add(new THREE.HemisphereLight(0xffd9bd, 0x373c43, 2.1));
    const keyLight = new THREE.DirectionalLight(0xffc08c, 2.4);
    keyLight.position.set(-32, 42, -24);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x8b9fbd, 0.8);
    fillLight.position.set(28, 18, 34);
    scene.add(fillLight);

    const materials: THREE.Material[] = [];
    const material = (color: string, roughness = 0.72, metalness = 0.15) => {
      const mat = new THREE.MeshStandardMaterial({ color, roughness, metalness, flatShading: true });
      materials.push(mat);
      return mat;
    };
    const floorMat = material("#66594d", 0.96, 0.02);
    const roadMat = material("#4d4c49", 0.94, 0.04);
    const openZoneMat = material("#70604e", 0.98, 0.01);
    const perimeterMat = material("#575858", 0.92, 0.08);
    const bunkerMat = material("#77736b", 0.9, 0.05);
    const bunkerRoofMat = material("#494d4d", 0.88, 0.12);
    const lowWallMat = material("#8b8376", 0.94, 0.02);
    const crateMat = material("#655747", 0.88, 0.08);
    const towerMat = material("#454d51", 0.7, 0.28);
    const droneMat = new THREE.MeshStandardMaterial({ color: "#91a9bb", roughness: 0.4, metalness: 0.68 });
    const droneTrimMat = new THREE.MeshStandardMaterial({ color: "#243b4e", roughness: 0.46, metalness: 0.54 });
    const droneLightMat = new THREE.MeshStandardMaterial({ color: "#ff566d", emissive: "#b61136", emissiveIntensity: 2.2, roughness: 0.3 });
    materials.push(droneMat, droneTrimMat, droneLightMat);

    const skyGeometry = new THREE.SphereGeometry(145, 32, 20);
    const skyPositions = skyGeometry.getAttribute("position");
    const skyColors = new Float32Array(skyPositions.count * 3);
    const horizonColor = new THREE.Color("#e2a16d");
    const duskColor = new THREE.Color("#825e70");
    const zenithColor = new THREE.Color("#26314c");
    const skyColor = new THREE.Color();
    for (let i = 0; i < skyPositions.count; i += 1) {
      const height = THREE.MathUtils.clamp(skyPositions.getY(i) / 145, 0, 1);
      if (height < 0.48) {
        skyColor.copy(horizonColor).lerp(duskColor, height / 0.48);
      } else {
        skyColor.copy(duskColor).lerp(zenithColor, (height - 0.48) / 0.52);
      }
      skyColors[i * 3] = skyColor.r;
      skyColors[i * 3 + 1] = skyColor.g;
      skyColors[i * 3 + 2] = skyColor.b;
    }
    skyGeometry.setAttribute("color", new THREE.Float32BufferAttribute(skyColors, 3));
    const skyMaterial = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false });
    materials.push(skyMaterial);
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    sky.renderOrder = -1;
    scene.add(sky);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: "#ffca91", fog: true });
    materials.push(sunMaterial);
    const sun = new THREE.Mesh(new THREE.SphereGeometry(5.2, 20, 12), sunMaterial);
    sun.position.set(-28, 31, -42);
    scene.add(sun);

    type CollisionBox = { x: number; z: number; width: number; depth: number };
    const solidObstacles: CollisionBox[] = [];
    const instanceBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const addBoxInstances = (mat: THREE.Material, specs: BoxInstanceSpec[]) => {
      if (!specs.length) return;
      const mesh = new THREE.InstancedMesh(instanceBoxGeometry, mat, specs.length);
      const transform = new THREE.Object3D();
      specs.forEach((spec, index) => {
        transform.position.set(spec.x, spec.y, spec.z);
        transform.scale.set(spec.w, spec.h, spec.d);
        transform.updateMatrix();
        mesh.setMatrixAt(index, transform.matrix);
        if (spec.solid) {
          solidObstacles.push({ x: spec.x, z: spec.z, width: spec.w, depth: spec.d });
        }
      });
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingBox();
      mesh.computeBoundingSphere();
      scene.add(mesh);
      return mesh;
    };

    const addBox = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      return mesh;
    };
    const addGroundPatch = (w: number, d: number, mat: THREE.Material, x: number, z: number, y = -0.045) => {
      const patch = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
      patch.rotation.x = -Math.PI / 2;
      patch.position.set(x, y, z);
      scene.add(patch);
      return patch;
    };

    // A 120 x 120 dusk training zone with an open range, bunker corridor, crate yards, and watchtower.
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.09;
    scene.add(floor);
    addGroundPatch(22, 120, roadMat, 0, 0);
    addGroundPatch(52, 42, openZoneMat, 0, -8, -0.055);
    addGroundPatch(34, 34, roadMat, -34, -15);
    addGroundPatch(30, 34, roadMat, 37, -20);

    const boundaryWalls: BoxInstanceSpec[] = [
      { x: 0, y: 4.5, z: -60, w: 120, h: 9, d: 1.4 },
      { x: 0, y: 4.5, z: 60, w: 120, h: 9, d: 1.4 },
      { x: -60, y: 4.5, z: 0, w: 1.4, h: 9, d: 120 },
      { x: 60, y: 4.5, z: 0, w: 1.4, h: 9, d: 120 },
    ];
    addBoxInstances(perimeterMat, boundaryWalls);

    const bunkerWalls: BoxInstanceSpec[] = [
      { x: -46, y: 2.4, z: -15, w: 1.5, h: 4.8, d: 28, solid: true },
      { x: -22, y: 2.4, z: -15, w: 1.5, h: 4.8, d: 28, solid: true },
      { x: -34, y: 2.4, z: -29, w: 25, h: 4.8, d: 1.5, solid: true },
      { x: -41.75, y: 2.4, z: -1, w: 8.5, h: 4.8, d: 1.5, solid: true },
      { x: -26.25, y: 2.4, z: -1, w: 8.5, h: 4.8, d: 1.5, solid: true },
      { x: -38, y: 2.4, z: -21, w: 1.1, h: 4.8, d: 12, solid: true },
      { x: -30, y: 2.4, z: -10, w: 1.1, h: 4.8, d: 15, solid: true },
    ];
    addBoxInstances(bunkerMat, bunkerWalls);
    addBoxInstances(bunkerRoofMat, [
      { x: -41.5, y: 4.95, z: -15, w: 8.5, h: 0.3, d: 27 },
      { x: -26.5, y: 4.95, z: -15, w: 8.5, h: 0.3, d: 27 },
    ]);

    const lowWalls: BoxInstanceSpec[] = [
      { x: -12, y: 0.8, z: 4, w: 11, h: 1.6, d: 1.2, solid: true },
      { x: 12, y: 0.8, z: -2, w: 12, h: 1.6, d: 1.2, solid: true },
      { x: -1, y: 0.8, z: -17, w: 12, h: 1.6, d: 1.2, solid: true },
      { x: 20, y: 0.8, z: 12, w: 10, h: 1.6, d: 1.2, solid: true },
      { x: 5, y: 0.8, z: 28, w: 14, h: 1.6, d: 1.2, solid: true },
      { x: -27, y: 0.8, z: 13, w: 1.2, h: 1.6, d: 9, solid: true },
    ];
    addBoxInstances(lowWallMat, lowWalls);

    const makeCrate = (x: number, y: number, z: number, size = 2.6): BoxInstanceSpec => ({
      x, y, z, w: size, h: size, d: size, solid: true,
    });
    const crates: BoxInstanceSpec[] = [
      makeCrate(-19, 1.3, 20), makeCrate(-16, 1.3, 20), makeCrate(-19, 1.3, 23),
      makeCrate(-19, 3.9, 20), makeCrate(-16, 3.9, 23),
      makeCrate(18, 1.3, 20), makeCrate(21, 1.3, 20), makeCrate(18, 1.3, 23),
      makeCrate(21, 3.9, 20), makeCrate(18, 3.9, 23),
      makeCrate(-14, 1.3, -9), makeCrate(-11, 1.3, -9), makeCrate(-14, 3.9, -9),
      makeCrate(14, 1.3, -22), makeCrate(17, 1.3, -22), makeCrate(14, 1.3, -25),
      makeCrate(17, 3.9, -25), makeCrate(32, 1.3, 13), makeCrate(35, 1.3, 13),
    ];
    addBoxInstances(crateMat, crates);

    const towerLegs: BoxInstanceSpec[] = [
      { x: 32, y: 7.5, z: -29, w: 0.9, h: 15, d: 0.9, solid: true },
      { x: 42, y: 7.5, z: -29, w: 0.9, h: 15, d: 0.9, solid: true },
      { x: 32, y: 7.5, z: -19, w: 0.9, h: 15, d: 0.9, solid: true },
      { x: 42, y: 7.5, z: -19, w: 0.9, h: 15, d: 0.9, solid: true },
    ];
    addBoxInstances(towerMat, towerLegs);
    addBox(13, 0.9, 13, towerMat, 37, 15, -24);
    addBox(9, 0.7, 9, bunkerMat, 37, 19, -24);
    addBox(4.8, 3.2, 4.8, towerMat, 37, 17, -24);

    const drones: DroneState[] = [];
    const droneSpawns = [
      [-23, 3.4, -44], [-14, 2.7, -49], [-4, 3.5, -46],
      [7, 2.9, -51], [17, 3.1, -45], [26, 3.8, -42],
    ];
    droneSpawns.forEach(([x, y, z], index) => {
      const group = new THREE.Group();
      const parts: THREE.Mesh[] = [];
      const addDronePart = (geometry: THREE.BufferGeometry, mat: THREE.Material, px: number, py: number, pz: number) => {
        const mesh = new THREE.Mesh(geometry, mat);
        mesh.position.set(px, py, pz);
        group.add(mesh);
        parts.push(mesh);
      };
      addDronePart(new THREE.SphereGeometry(0.48, 12, 8), droneMat, 0, 0, 0);
      addDronePart(new THREE.BoxGeometry(1.7, 0.12, 0.14), droneTrimMat, 0, 0.04, 0);
      addDronePart(new THREE.BoxGeometry(0.14, 0.12, 1.7), droneTrimMat, 0, 0.04, 0);
      addDronePart(new THREE.SphereGeometry(0.19, 10, 8), droneLightMat, 0, -0.02, -0.43);
      for (const rotorX of [-0.78, 0.78]) {
        for (const rotorZ of [-0.78, 0.78]) {
          addDronePart(new THREE.CylinderGeometry(0.25, 0.25, 0.07, 10), droneTrimMat, rotorX, 0.1, rotorZ);
          addDronePart(new THREE.BoxGeometry(0.68, 0.035, 0.09), droneLightMat, rotorX, 0.16, rotorZ);
        }
      }
      group.position.set(x, y, z);
      scene.add(group);
      drones.push({
        group,
        parts,
        baseX: x,
        baseY: y,
        baseZ: z,
        phase: index * 1.17,
        alive: true,
      });
    });
    setDroneCount(drones.length);

    let yaw = 0;
    let pitch = 0;
    let verticalVelocity = 0;
    let frame = 0;
    let lastRenderAt = 0;
    let previousTime = performance.now();
    let elapsed = 0;
    let lastShotAt = 0;
    const raycaster = new THREE.Raycaster();
    raycaster.far = 155;
    const tracers: Array<{ line: THREE.Line; expiresAt: number }> = [];
    const playerLimit = 55;
    const fire = () => {
      const now = performance.now();
      if (now - lastShotAt < 160) return;
      lastShotAt = now;
      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const intersections = raycaster.intersectObjects(scene.children, true);
      const firstHit = intersections[0];
      const hitDrone = firstHit && drones.find((drone) => (
        drone.alive && drone.parts.includes(firstHit.object as THREE.Mesh)
      ));
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      const origin = camera.getWorldPosition(new THREE.Vector3());
      const endpoint = firstHit?.point ?? origin.clone().add(direction.multiplyScalar(34));
      const tracerGeometry = new THREE.BufferGeometry().setFromPoints([origin, endpoint]);
      const tracerMaterial = new THREE.LineBasicMaterial({
        color: hitDrone ? "#ff7587" : "#6cf6ff",
        transparent: true,
        opacity: 0.92,
      });
      const tracer = new THREE.Line(tracerGeometry, tracerMaterial);
      scene.add(tracer);
      tracers.push({ line: tracer, expiresAt: now + 105 });
      if (hitDrone) {
        hitDrone.alive = false;
        scene.remove(hitDrone.group);
        hitDrone.group.traverse((object) => {
          if (object instanceof THREE.Mesh) object.geometry.dispose();
        });
        setScore((current) => current + 100);
        setDroneCount((current) => Math.max(0, current - 1));
      }
    };
    fireRef.current = fire;
    const onResize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight, false);
      renderer.setPixelRatio(getQualityPixelRatio(qualityRef.current));
    };
    const onKeyDown = (event: KeyboardEvent) => {
      keys.current[event.code] = true;
      if (event.code === "Space") {
        event.preventDefault();
        jumpRequested.current = true;
      }
      if (event.code === "KeyF") fire();
    };
    const onKeyUp = (event: KeyboardEvent) => { keys.current[event.code] = false; };
    const onLockChange = () => setLocked(document.pointerLockElement === renderer.domElement);
    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== renderer.domElement) return;
      yaw -= event.movementX * 0.0022;
      pitch = THREE.MathUtils.clamp(pitch - event.movementY * 0.0022, -1.25, 1.25);
    };
    const onCanvasClick = () => {
      if (!mobileRef.current && renderer.domElement.requestPointerLock) renderer.domElement.requestPointerLock();
    };
    const onCanvasMouseDown = (event: MouseEvent) => {
      if (event.button === 0) fire();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    document.addEventListener("pointerlockchange", onLockChange);
    document.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("click", onCanvasClick);
    renderer.domElement.addEventListener("mousedown", onCanvasMouseDown);

    const animate = (now: number) => {
      frame = window.requestAnimationFrame(animate);
      if (lastRenderAt && now - lastRenderAt < 1000 / 60) return;
      const dt = Math.min((now - previousTime) / 1000, 0.05);
      previousTime = now;
      lastRenderAt = now;
      elapsed += dt;
      drones.forEach((drone) => {
        if (!drone.alive) return;
        drone.group.position.set(
          drone.baseX + Math.sin(elapsed * 0.62 + drone.phase) * 1.2,
          drone.baseY + Math.sin(elapsed * 1.45 + drone.phase) * 0.34,
          drone.baseZ + Math.cos(elapsed * 0.48 + drone.phase) * 0.8,
        );
        drone.group.rotation.y = Math.sin(elapsed * 0.8 + drone.phase) * 0.25;
      });
      for (let i = tracers.length - 1; i >= 0; i -= 1) {
        if (now < tracers[i].expiresAt) continue;
        scene.remove(tracers[i].line);
        tracers[i].line.geometry.dispose();
        (tracers[i].line.material as THREE.Material).dispose();
        tracers.splice(i, 1);
      }
      if (lookDelta.current.x || lookDelta.current.y) {
        yaw -= lookDelta.current.x * 0.004;
        pitch = THREE.MathUtils.clamp(pitch - lookDelta.current.y * 0.004, -1.25, 1.25);
        lookDelta.current = { x: 0, y: 0 };
      }
      const keysNow = keys.current;
      if (jumpRequested.current) {
        if (player.position.y <= 1.651) verticalVelocity = 7;
        jumpRequested.current = false;
      }
      const inputX = (keysNow.KeyD || keysNow.ArrowRight ? 1 : 0) - (keysNow.KeyA || keysNow.ArrowLeft ? 1 : 0) + moveInput.current.x;
      const inputY = (keysNow.KeyW || keysNow.ArrowUp ? 1 : 0) - (keysNow.KeyS || keysNow.ArrowDown ? 1 : 0) + moveInput.current.y;
      const length = Math.hypot(inputX, inputY);
      if (length > 0) {
        const speed = 7.2 * dt / Math.max(1, length);
        const dx = (Math.cos(yaw) * inputX + Math.sin(yaw) * inputY) * speed;
        const dz = (Math.sin(yaw) * inputX - Math.cos(yaw) * inputY) * speed;
        const collidesWithObstacle = (x: number, z: number) => solidObstacles.some(({ x: cx, z: cz, width, depth }) => (
          Math.abs(x - cx) < width / 2 + 0.45 && Math.abs(z - cz) < depth / 2 + 0.45
        ));
        const nextX = THREE.MathUtils.clamp(player.position.x + dx, -playerLimit, playerLimit);
        const nextZ = THREE.MathUtils.clamp(player.position.z + dz, -playerLimit, playerLimit);
        if (!collidesWithObstacle(nextX, player.position.z)) player.position.x = nextX;
        if (!collidesWithObstacle(player.position.x, nextZ)) player.position.z = nextZ;
      }
      if (player.position.y > 1.65 || verticalVelocity > 0) {
        verticalVelocity -= 18 * dt;
        player.position.y = Math.max(1.65, player.position.y + verticalVelocity * dt);
        if (player.position.y === 1.65) verticalVelocity = 0;
      }
      player.rotation.y = yaw;
      camera.rotation.x = pitch;
      renderer.render(scene, camera);
    };
    frame = window.requestAnimationFrame(animate);

    teardown = () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("pointerlockchange", onLockChange);
      document.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("click", onCanvasClick);
      renderer.domElement.removeEventListener("mousedown", onCanvasMouseDown);
      fireRef.current = null;
      if (rendererRef.current === renderer) rendererRef.current = null;
      if (document.pointerLockElement === renderer.domElement) document.exitPointerLock?.();
      tracers.forEach(({ line }) => {
        scene.remove(line);
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      const disposedGeometries = new Set<THREE.BufferGeometry>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && !disposedGeometries.has(object.geometry)) {
          object.geometry.dispose();
          disposedGeometries.add(object.geometry);
        }
      });
      materials.forEach((mat) => mat.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
    });

    return () => {
      window.cancelAnimationFrame(initFrame);
      teardown?.();
    };
  }, []);

  const updateJoystick = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.34);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.34);
    const length = Math.max(1, Math.hypot(dx, dy));
    const next = { x: THREE.MathUtils.clamp(dx / length, -1, 1), y: THREE.MathUtils.clamp(-dy / length, -1, 1) };
    moveInput.current = next;
    setJoystick(next);
  };
  const clearJoystick = () => {
    joystickPointer.current = null;
    moveInput.current = { x: 0, y: 0 };
    setJoystick({ x: 0, y: 0 });
  };
  const onTouchLookStart = (event: PointerEvent<HTMLDivElement>) => {
    lookPointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onTouchLookMove = (event: PointerEvent<HTMLDivElement>) => {
    const touch = lookPointer.current;
    if (!touch || touch.id !== event.pointerId) return;
    const dx = event.clientX - touch.x;
    const dy = event.clientY - touch.y;
    touch.x = event.clientX;
    touch.y = event.clientY;
    lookDelta.current.x += dx;
    lookDelta.current.y += dy;
  };
  const onJoystickPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    joystickPointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateJoystick(event);
  };

  return (
    <main className="strike-page">
      <style>{`
        .strike-page{position:relative;width:100%;height:100dvh;min-height:460px;overflow:hidden;background:#07101d;color:#e9f6ff;font-family:var(--font-body,'Exo 2'),sans-serif;isolation:isolate}
        .strike-canvas{display:block;width:100%;height:100%;touch-action:none;outline:none}
        .strike-render-error{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.55rem;padding:2rem;color:#b7d8e5;text-align:center}
        .strike-render-error small{max-width:min(80vw,720px);color:#7895a4;font:400 11px/1.5 var(--font-body,'Exo 2'),sans-serif;overflow-wrap:anywhere}
        .strike-hud{position:absolute;z-index:2;inset:0;pointer-events:none}
        .strike-top{position:absolute;left:clamp(16px,4vw,48px);right:clamp(16px,4vw,48px);top:clamp(16px,3vh,30px);display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
        .strike-brand{display:flex;align-items:center;gap:12px}
        .strike-mark{width:34px;height:34px;display:grid;place-items:center;border:1px solid rgba(69,224,237,.55);transform:rotate(45deg);background:rgba(14,41,57,.72);box-shadow:inset 0 0 18px rgba(53,215,231,.1)}
        .strike-mark:after{content:"";width:10px;height:10px;background:#43dce8;box-shadow:0 0 12px #43dce8}
        .strike-title{font:700 13px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.16em;color:#e9fbff}
        .strike-subtitle{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#76a1b2;margin-top:4px}
         .strike-status{font:500 10px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.1em;color:#8ab6c3;border:1px solid rgba(144,203,218,.2);background:rgba(5,16,28,.55);padding:9px 12px;white-space:nowrap}
         .strike-status span{color:rgba(144,203,218,.4);padding:0 4px}
        .strike-status i{display:inline-block;width:6px;height:6px;border-radius:50%;background:#45dfb1;margin-right:8px;box-shadow:0 0 8px #45dfb1}
        .strike-quality-control{position:absolute;right:clamp(16px,4vw,48px);top:68px;display:flex;align-items:center;gap:8px;padding:6px 8px;border:1px solid rgba(202,211,211,.2);background:rgba(19,24,30,.58);pointer-events:auto}
        .strike-quality-control label{font:500 8px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.1em;color:#aeb8b8}
        .strike-quality-control select{border:1px solid rgba(202,211,211,.28);border-radius:2px;background:#22282c;color:#e6e5dc;padding:4px 7px;font:500 10px var(--font-body,'Exo 2'),sans-serif;cursor:pointer}
        .strike-reticle{position:absolute;left:50%;top:50%;width:15px;height:15px;transform:translate(-50%,-50%);opacity:.62}
        .strike-reticle:before,.strike-reticle:after{content:"";position:absolute;background:#d6fbff}
        .strike-reticle:before{width:1px;height:15px;left:7px}.strike-reticle:after{height:1px;width:15px;top:7px}
        .strike-bottom{position:absolute;left:clamp(16px,4vw,48px);right:clamp(16px,4vw,48px);bottom:clamp(16px,3vh,30px);display:flex;align-items:flex-end;justify-content:space-between}
        .strike-hint{font-size:11px;color:rgba(207,231,239,.72);letter-spacing:.04em;line-height:1.8}
        .strike-hint b{font:600 9px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.1em;color:#83d9e1;margin-right:6px}
        .strike-lock{pointer-events:auto;border:1px solid rgba(60,220,233,.5);background:rgba(7,25,38,.84);color:#dffbff;padding:11px 16px;font:600 10px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.1em;cursor:pointer;transition:background .2s,border-color .2s}
        .strike-lock:hover{background:rgba(17,67,82,.88);border-color:#72f0f5}
         .strike-back{pointer-events:auto;display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(144,203,218,.24);background:rgba(5,16,28,.68);color:#c6e2ea;padding:9px 12px;font:600 9px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.08em;cursor:pointer}
         .strike-back:hover{border-color:rgba(60,220,233,.55);color:#e9fbff}
        .strike-mobile-control{position:absolute;pointer-events:auto;touch-action:none;user-select:none;-webkit-user-select:none}
        .strike-stick{width:118px;height:118px;border:1px solid rgba(157,224,231,.32);border-radius:50%;background:rgba(9,24,38,.32);left:25px;bottom:34px;display:grid;place-items:center}
        .strike-stick:before{content:"";position:absolute;inset:13px;border:1px solid rgba(157,224,231,.14);border-radius:50%}
        .strike-knob{position:absolute;width:43px;height:43px;border:1px solid rgba(105,231,237,.72);border-radius:50%;background:rgba(28,122,137,.48);box-shadow:0 0 16px rgba(39,207,217,.18)}
        .strike-look{right:0;top:18%;bottom:0;width:48%;pointer-events:auto;touch-action:none}
         .strike-jump{right:22px;bottom:26px;width:64px;height:64px;border:1px solid rgba(60,220,233,.65);border-radius:50%;background:rgba(7,25,38,.82);color:#dffbff;font:600 9px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.05em}
         .strike-fire{right:22px;bottom:104px;width:64px;height:64px;border:1px solid rgba(255,102,124,.72);border-radius:50%;background:rgba(76,17,36,.82);color:#ffe5e9;font:700 9px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.05em}
          @media(max-width:600px){.strike-status{font-size:8px;padding:8px}.strike-quality-control{top:62px;padding:5px 6px}.strike-quality-control label{font-size:7px}.strike-bottom{bottom:16px}.strike-hint{max-width:48%;font-size:9px}.strike-stick{left:18px;bottom:24px;width:108px;height:108px}.strike-look{top:28%;bottom:112px}.strike-jump{right:22px;bottom:24px}.strike-fire{right:22px;bottom:98px}}
        @media(prefers-reduced-motion:reduce){.strike-lock{transition:none}}
      `}</style>
      <div ref={mountRef} className="absolute inset-0" />
      <div className="strike-hud">
        <header className="strike-top">
          <div className="strike-brand">
            <button className="strike-back" onClick={() => navigate("/ruang-untuk-guru/numatik-game")} aria-label="Kembali ke menu Numatik Game">
              <ArrowLeft size={14} /> MENU
            </button>
            <span className="strike-mark" aria-hidden="true" />
            <div><div className="strike-title">NUMATIK STRIKE</div><div className="strike-subtitle">Zona latihan · tahap 02</div></div>
          </div>
          <div className="strike-status"><i />DRONE {String(droneCount).padStart(2, "0")} <span>·</span> SKOR {String(score).padStart(3, "0")}</div>
        </header>
        <div className="strike-quality-control">
          <label htmlFor="strike-quality">KUALITAS</label>
          <select
            id="strike-quality"
            value={quality}
            onChange={(event) => {
              const nextQuality = event.target.value as QualitySetting;
              qualityRef.current = nextQuality;
              setQuality(nextQuality);
              rendererRef.current?.setPixelRatio(getQualityPixelRatio(nextQuality));
            }}
          >
            <option value="low">Rendah</option>
            <option value="medium">Sedang</option>
            <option value="high">Tinggi</option>
          </select>
        </div>
        <div className="strike-reticle" aria-hidden="true" />
        {!mobile && <footer className="strike-bottom">
          <div className="strike-hint"><b>W A S D</b> bergerak &nbsp; <b>MOUSE</b> melihat/tembak &nbsp; <b>SPACE</b> lompat</div>
          <button className="strike-lock" onClick={() => {
            const canvas = mountRef.current?.querySelector("canvas");
            canvas?.requestPointerLock?.();
          }}>{locked ? "MOUSE TERKUNCI · KLIK KIRI TEMBAK" : "KLIK UNTUK MULAI · KLIK KIRI TEMBAK"}</button>
        </footer>}
        {mobile && <>
          <div
            className="strike-mobile-control strike-stick"
            aria-label="Joystick gerak"
            onPointerDown={onJoystickPointerDown}
            onPointerMove={(event) => { if (joystickPointer.current === event.pointerId) updateJoystick(event); }}
            onPointerUp={clearJoystick}
            onPointerCancel={clearJoystick}
          >
            <span className="strike-knob" style={{ transform: `translate(${joystick.x * 29}px, ${-joystick.y * 29}px)` }} />
          </div>
          <div
            className="strike-mobile-control strike-look"
            aria-label="Geser untuk melihat"
            onPointerDown={onTouchLookStart}
            onPointerMove={onTouchLookMove}
            onPointerUp={() => { lookPointer.current = null; }}
            onPointerCancel={() => { lookPointer.current = null; }}
          />
          <button
            className="strike-mobile-control strike-jump"
            onPointerDown={() => { jumpRequested.current = true; }}
            aria-label="Lompat"
          >LOMPAT</button>
          <button
            className="strike-mobile-control strike-fire"
            onPointerDown={(event) => { event.preventDefault(); fireRef.current?.(); }}
            aria-label="Tembak drone"
          >TEMBAK</button>
          <div className="strike-bottom"><div className="strike-hint"><b>GESER KANAN</b><br />untuk melihat</div></div>
        </>}
      </div>
    </main>
  );
};

export default GamePage;
