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
type SoldierMode = "patrol" | "chase" | "attack" | "cover" | "dead";
type SoldierState = {
  group: THREE.Group;
  parts: THREE.Mesh[];
  headParts: THREE.Mesh[];
  leftArmPivot: THREE.Group;
  rightArmPivot: THREE.Group;
  leftLegPivot: THREE.Group;
  rightLegPivot: THREE.Group;
  rifle: THREE.Group;
  muzzleFlash: THREE.Mesh;
  spawnX: number;
  spawnZ: number;
  patrolPoints: THREE.Vector3[];
  patrolIndex: number;
  health: number;
  maxHealth: number;
  alive: boolean;
  mode: SoldierMode;
  nextSenseAt: number;
  canSeePlayer: boolean;
  lastSeenAt: number;
  lastKnownPlayer: THREE.Vector3;
  nextShotAt: number;
  nextCoverAt: number;
  coverUntil: number;
  coverTarget: THREE.Vector3 | null;
  path: THREE.Vector3[];
  pathIndex: number;
  nextPathAt: number;
  pathTarget: THREE.Vector3;
  muzzleFlashUntil: number;
  recoilUntil: number;
  deathStartedAt: number;
  deathDirection: number;
  phase: number;
};
type HitFeedback = { id: number; damage: number; headshot: boolean; eliminated: boolean };

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
  const [enemyCount, setEnemyCount] = useState(0);
  const [wave, setWave] = useState(1);
  const waveRef = useRef(1);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [hitFeedback, setHitFeedback] = useState<HitFeedback | null>(null);
  const hitFeedbackIdRef = useRef(0);
  const hitFeedbackTimeoutRef = useRef<number | null>(null);
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
    const soldierUniformMat = material("#69765c", 0.94, 0.02);
    const soldierVestMat = material("#424a40", 0.86, 0.08);
    const soldierPantsMat = material("#50574c", 0.96, 0.01);
    const soldierHelmetMat = material("#59664f", 0.82, 0.12);
    const soldierSkinMat = material("#b68d6f", 0.88, 0.01);
    const soldierBootMat = material("#333633", 0.82, 0.12);
    const soldierWeaponMat = material("#292e2c", 0.62, 0.3);
    const soldierMetalMat = material("#74766d", 0.5, 0.48);
    const soldierMarkingMat = material("#a96348", 0.7, 0.12);
    const enemyTracerMat = new THREE.LineBasicMaterial({ color: "#ff604d", transparent: true, opacity: 0.84 });
    const muzzleFlashMat = new THREE.MeshBasicMaterial({ color: "#ffd59a", toneMapped: false });
    materials.push(enemyTracerMat, muzzleFlashMat);

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
    const worldOccluders: THREE.Object3D[] = [];
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
      if (specs.some((spec) => spec.solid)) worldOccluders.push(mesh);
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
      { x: 0, y: 4.5, z: -60, w: 120, h: 9, d: 1.4, solid: true },
      { x: 0, y: 4.5, z: 60, w: 120, h: 9, d: 1.4, solid: true },
      { x: -60, y: 4.5, z: 0, w: 1.4, h: 9, d: 120, solid: true },
      { x: 60, y: 4.5, z: 0, w: 1.4, h: 9, d: 120, solid: true },
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

    const soldierGeometries = new Set<THREE.BufferGeometry>();
    const soldierGeometry = <T extends THREE.BufferGeometry>(geometry: T) => {
      soldierGeometries.add(geometry);
      return geometry;
    };
    const torsoGeometry = soldierGeometry(new THREE.BoxGeometry(0.62, 0.82, 0.38));
    const vestGeometry = soldierGeometry(new THREE.BoxGeometry(0.68, 0.48, 0.42));
    const neckGeometry = soldierGeometry(new THREE.CylinderGeometry(0.11, 0.12, 0.18, 6));
    const headGeometry = soldierGeometry(new THREE.SphereGeometry(0.23, 8, 6));
    const helmetGeometry = soldierGeometry(new THREE.SphereGeometry(0.29, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2));
    const helmetBrimGeometry = soldierGeometry(new THREE.BoxGeometry(0.58, 0.07, 0.48));
    const upperArmGeometry = soldierGeometry(new THREE.BoxGeometry(0.2, 0.43, 0.22));
    const forearmGeometry = soldierGeometry(new THREE.BoxGeometry(0.17, 0.4, 0.18));
    const legGeometry = soldierGeometry(new THREE.BoxGeometry(0.23, 0.76, 0.25));
    const bootGeometry = soldierGeometry(new THREE.BoxGeometry(0.28, 0.16, 0.4));
    const shoulderGeometry = soldierGeometry(new THREE.BoxGeometry(0.27, 0.2, 0.3));
    const rifleReceiverGeometry = soldierGeometry(new THREE.BoxGeometry(0.15, 0.15, 0.62));
    const rifleBarrelGeometry = soldierGeometry(new THREE.CylinderGeometry(0.035, 0.045, 0.58, 6));
    const rifleStockGeometry = soldierGeometry(new THREE.BoxGeometry(0.16, 0.17, 0.3));
    const rifleGripGeometry = soldierGeometry(new THREE.BoxGeometry(0.12, 0.24, 0.13));
    const rifleSightGeometry = soldierGeometry(new THREE.BoxGeometry(0.12, 0.1, 0.14));
    const muzzleFlashGeometry = soldierGeometry(new THREE.SphereGeometry(0.085, 6, 4));

    const soldiers: SoldierState[] = [];
    const createSoldier = (x: number, z: number, index: number): SoldierState => {
      const group = new THREE.Group();
      const parts: THREE.Mesh[] = [];
      const headParts: THREE.Mesh[] = [];
      const addPart = (
        parent: THREE.Object3D,
        geometry: THREE.BufferGeometry,
        mat: THREE.Material,
        px: number,
        py: number,
        pz: number,
        targetable = true,
      ) => {
        const mesh = new THREE.Mesh(geometry, mat);
        mesh.position.set(px, py, pz);
        parent.add(mesh);
        if (targetable) parts.push(mesh);
        return mesh;
      };

      addPart(group, torsoGeometry, soldierUniformMat, 0, 1.22, 0);
      addPart(group, vestGeometry, soldierVestMat, 0, 1.23, -0.025);
      addPart(group, neckGeometry, soldierSkinMat, 0, 1.72, 0);
      const head = addPart(group, headGeometry, soldierSkinMat, 0, 1.91, 0);
      const helmet = addPart(group, helmetGeometry, soldierHelmetMat, 0, 2.035, 0);
      const helmetBrim = addPart(group, helmetBrimGeometry, soldierHelmetMat, 0, 1.98, -0.07);
      headParts.push(head, helmet, helmetBrim);
      addPart(group, shoulderGeometry, soldierUniformMat, -0.37, 1.42, -0.015);
      addPart(group, shoulderGeometry, soldierUniformMat, 0.37, 1.42, -0.015);
      addPart(group, new THREE.BoxGeometry(0.09, 0.28, 0.05), soldierMarkingMat, -0.35, 1.42, -0.18);
      soldierGeometries.add((parts[parts.length - 1]).geometry);

      const leftArmPivot = new THREE.Group();
      leftArmPivot.position.set(-0.34, 1.39, 0);
      group.add(leftArmPivot);
      addPart(leftArmPivot, upperArmGeometry, soldierUniformMat, 0, -0.2, -0.02);
      addPart(leftArmPivot, forearmGeometry, soldierUniformMat, 0, -0.49, -0.13);
      const rightArmPivot = new THREE.Group();
      rightArmPivot.position.set(0.34, 1.39, 0);
      group.add(rightArmPivot);
      addPart(rightArmPivot, upperArmGeometry, soldierUniformMat, 0, -0.2, -0.02);
      addPart(rightArmPivot, forearmGeometry, soldierUniformMat, 0, -0.49, -0.13);

      const leftLegPivot = new THREE.Group();
      leftLegPivot.position.set(-0.16, 0.94, 0);
      group.add(leftLegPivot);
      addPart(leftLegPivot, legGeometry, soldierPantsMat, 0, -0.38, 0);
      addPart(leftLegPivot, bootGeometry, soldierBootMat, 0, -0.81, -0.08);
      const rightLegPivot = new THREE.Group();
      rightLegPivot.position.set(0.16, 0.94, 0);
      group.add(rightLegPivot);
      addPart(rightLegPivot, legGeometry, soldierPantsMat, 0, -0.38, 0);
      addPart(rightLegPivot, bootGeometry, soldierBootMat, 0, -0.81, -0.08);

      const rifle = new THREE.Group();
      rifle.position.set(0.3, 1.24, -0.22);
      group.add(rifle);
      addPart(rifle, rifleReceiverGeometry, soldierWeaponMat, 0, 0, -0.26);
      const barrel = addPart(rifle, rifleBarrelGeometry, soldierMetalMat, 0, 0.025, -0.78);
      barrel.rotation.x = Math.PI / 2;
      addPart(rifle, rifleStockGeometry, soldierWeaponMat, 0, 0, 0.17);
      addPart(rifle, rifleGripGeometry, soldierWeaponMat, 0, -0.15, -0.09);
      addPart(rifle, rifleSightGeometry, soldierMetalMat, 0, 0.12, -0.27);
      const muzzleFlash = addPart(rifle, muzzleFlashGeometry, muzzleFlashMat, 0, 0.02, -1.08, false);
      muzzleFlash.visible = false;

      group.position.set(x, 0, z);
      group.lookAt(0, 0, player.position.z);
      scene.add(group);
      const patrolPoints = [
        new THREE.Vector3(x + (index % 2 ? 3.5 : -3.5), 0, z + 1.5),
        new THREE.Vector3(x + (index % 2 ? -2.5 : 2.5), 0, z + 3.8),
        new THREE.Vector3(x, 0, z - 2.8),
      ];
      return {
        group, parts, headParts, leftArmPivot, rightArmPivot, leftLegPivot, rightLegPivot, rifle, muzzleFlash,
        spawnX: x, spawnZ: z, patrolPoints, patrolIndex: index % patrolPoints.length,
        health: 100, maxHealth: 100, alive: true, mode: "patrol", nextSenseAt: 0, canSeePlayer: false,
        lastSeenAt: 0, lastKnownPlayer: new THREE.Vector3(x, 0, z), nextShotAt: 0, nextCoverAt: 0,
        coverUntil: 0, coverTarget: null, path: [], pathIndex: 0, nextPathAt: 0,
        pathTarget: new THREE.Vector3(Number.POSITIVE_INFINITY, 0, Number.POSITIVE_INFINITY),
        muzzleFlashUntil: 0, recoilUntil: 0, deathStartedAt: 0, deathDirection: index % 2 ? -1 : 1,
        phase: index * 1.31,
      };
    };

    const soldierSpawns = [
      [-23, -44], [-14, -49], [-4, -46], [7, -51], [17, -45], [26, -42],
    ];
    soldierSpawns.forEach(([x, z], index) => soldiers.push(createSoldier(x, z, index)));
    setEnemyCount(soldiers.length);
    setWave(1);
    waveRef.current = 1;

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
    const tracers: Array<{ line: THREE.Line; expiresAt: number; disposeMaterial: boolean }> = [];
    const sightRaycaster = new THREE.Raycaster();
    const playerLimit = 55;
    const worldCollisionRadius = 0.48;
    const isBlocked = (x: number, z: number, radius = worldCollisionRadius) => solidObstacles.some(({ x: cx, z: cz, width, depth }) => (
      Math.abs(x - cx) < width / 2 + radius && Math.abs(z - cz) < depth / 2 + radius
    ));
    const hasLineOfSight = (origin: THREE.Vector3, target: THREE.Vector3) => {
      const direction = target.clone().sub(origin);
      const distance = direction.length();
      if (distance < 0.5) return true;
      sightRaycaster.set(origin, direction.normalize());
      sightRaycaster.far = distance - 0.35;
      return sightRaycaster.intersectObjects(worldOccluders, false).length === 0;
    };
    const coverCandidates: THREE.Vector3[] = [];
    const coverKeys = new Set<string>();
    solidObstacles.forEach((box) => {
      const points = [
        [box.x - box.width / 2 - 1.2, box.z],
        [box.x + box.width / 2 + 1.2, box.z],
        [box.x, box.z - box.depth / 2 - 1.2],
        [box.x, box.z + box.depth / 2 + 1.2],
      ];
      points.forEach(([x, z]) => {
        if (x < -playerLimit || x > playerLimit || z < -playerLimit || z > playerLimit || isBlocked(x, z)) return;
        const key = `${Math.round(x * 2)}:${Math.round(z * 2)}`;
        if (coverKeys.has(key)) return;
        coverKeys.add(key);
        coverCandidates.push(new THREE.Vector3(x, 0, z));
      });
    });
    const chooseCoverPoint = (soldier: SoldierState, target: THREE.Vector3) => {
      const origin = new THREE.Vector3(0, 1.45, 0);
      const targetEye = target.clone().setY(1.3);
      let best: THREE.Vector3 | null = null;
      let bestScore = Number.POSITIVE_INFINITY;
      coverCandidates.forEach((candidate) => {
        const distanceToSoldier = candidate.distanceTo(soldier.group.position);
        const distanceToPlayer = candidate.distanceTo(target);
        if (distanceToSoldier > 28 || distanceToPlayer < 5 || distanceToPlayer > 48) return;
        origin.set(candidate.x, 1.45, candidate.z);
        if (hasLineOfSight(origin, targetEye)) return;
        const score = distanceToSoldier + distanceToPlayer * 0.18;
        if (score < bestScore) {
          best = candidate;
          bestScore = score;
        }
      });
      return best;
    };

    const gridStep = 3;
    const gridMin = -54;
    const gridCount = 37;
    const gridTotal = gridCount * gridCount;
    const cellIndex = (column: number, row: number) => row * gridCount + column;
    const cellCoordinates = (index: number) => ({ column: index % gridCount, row: Math.floor(index / gridCount) });
    const worldToCell = (value: number) => THREE.MathUtils.clamp(Math.round((value - gridMin) / gridStep), 0, gridCount - 1);
    const cellToWorld = (value: number) => gridMin + value * gridStep;
    const blockedCell = (column: number, row: number) => isBlocked(cellToWorld(column), cellToWorld(row), 0.62);
    const nearestOpenCell = (column: number, row: number) => {
      if (!blockedCell(column, row)) return { column, row };
      for (let radius = 1; radius <= 4; radius += 1) {
        let closest: { column: number; row: number } | null = null;
        let closestDistance = Number.POSITIVE_INFINITY;
        for (let dz = -radius; dz <= radius; dz += 1) {
          for (let dx = -radius; dx <= radius; dx += 1) {
            const candidateX = column + dx;
            const candidateZ = row + dz;
            if (candidateX < 0 || candidateX >= gridCount || candidateZ < 0 || candidateZ >= gridCount) continue;
            if (blockedCell(candidateX, candidateZ)) continue;
            const distance = dx * dx + dz * dz;
            if (distance < closestDistance) {
              closest = { column: candidateX, row: candidateZ };
              closestDistance = distance;
            }
          }
        }
        if (closest) return closest;
      }
      return { column, row };
    };
    const findPath = (startX: number, startZ: number, goalX: number, goalZ: number) => {
      let start = nearestOpenCell(worldToCell(startX), worldToCell(startZ));
      const goal = nearestOpenCell(worldToCell(goalX), worldToCell(goalZ));
      const startIndex = cellIndex(start.column, start.row);
      const goalIndex = cellIndex(goal.column, goal.row);
      if (startIndex === goalIndex) {
        return [new THREE.Vector3(goalX, 0, goalZ)];
      }

      const costs = new Float32Array(gridTotal);
      costs.fill(Number.POSITIVE_INFINITY);
      const parents = new Int32Array(gridTotal);
      parents.fill(-1);
      const closed = new Uint8Array(gridTotal);
      const openFlags = new Uint8Array(gridTotal);
      const open = [startIndex];
      openFlags[startIndex] = 1;
      costs[startIndex] = 0;
      const heuristic = (column: number, row: number) => {
        const { column: goalColumn, row: goalRow } = cellCoordinates(goalIndex);
        const dx = Math.abs(goalColumn - column);
        const dz = Math.abs(goalRow - row);
        return Math.max(dx, dz) + (Math.SQRT2 - 1) * Math.min(dx, dz);
      };
      let found = false;
      let examined = 0;
      while (open.length && examined < 520) {
        let bestPosition = 0;
        for (let i = 1; i < open.length; i += 1) {
          const current = cellCoordinates(open[i]);
          const best = cellCoordinates(open[bestPosition]);
          if (costs[open[i]] + heuristic(current.column, current.row) < costs[open[bestPosition]] + heuristic(best.column, best.row)) {
            bestPosition = i;
          }
        }
        const currentIndex = open.splice(bestPosition, 1)[0];
        openFlags[currentIndex] = 0;
        if (currentIndex === goalIndex) {
          found = true;
          break;
        }
        if (closed[currentIndex]) continue;
        closed[currentIndex] = 1;
        examined += 1;
        const current = cellCoordinates(currentIndex);
        for (let dz = -1; dz <= 1; dz += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            if (!dx && !dz) continue;
            const column = current.column + dx;
            const row = current.row + dz;
            if (column < 0 || column >= gridCount || row < 0 || row >= gridCount || blockedCell(column, row)) continue;
            if (dx && dz && (blockedCell(current.column + dx, current.row) || blockedCell(current.column, current.row + dz))) continue;
            const nextIndex = cellIndex(column, row);
            if (closed[nextIndex]) continue;
            const cost = costs[currentIndex] + (dx && dz ? Math.SQRT2 : 1);
            if (cost >= costs[nextIndex]) continue;
            costs[nextIndex] = cost;
            parents[nextIndex] = currentIndex;
            if (!openFlags[nextIndex]) {
              open.push(nextIndex);
              openFlags[nextIndex] = 1;
            }
          }
        }
      }
      if (!found) return [new THREE.Vector3(goalX, 0, goalZ)];
      const pathIndices: number[] = [];
      let currentIndex = goalIndex;
      while (currentIndex !== startIndex && currentIndex >= 0) {
        pathIndices.push(currentIndex);
        currentIndex = parents[currentIndex];
      }
      pathIndices.reverse();
      return pathIndices.map((index) => {
        const cell = cellCoordinates(index);
        return new THREE.Vector3(cellToWorld(cell.column), 0, cellToWorld(cell.row));
      });
    };
    const moveSoldier = (soldier: SoldierState, target: THREE.Vector3, speed: number, dt: number, now: number) => {
      const distanceToTarget = Math.hypot(target.x - soldier.group.position.x, target.z - soldier.group.position.z);
      if (distanceToTarget < 0.65) {
        soldier.path = [];
        soldier.pathIndex = 0;
        soldier.pathTarget.copy(target);
        soldier.nextPathAt = now + 650;
        soldier.leftLegPivot.rotation.x = 0;
        soldier.rightLegPivot.rotation.x = 0;
        soldier.leftArmPivot.rotation.x = 0.62;
        soldier.rightArmPivot.rotation.x = 0.62;
        return false;
      }
      if (now >= soldier.nextPathAt || soldier.pathTarget.distanceToSquared(target) > 9) {
        soldier.path = findPath(soldier.group.position.x, soldier.group.position.z, target.x, target.z);
        soldier.pathIndex = 0;
        soldier.pathTarget.copy(target);
        soldier.nextPathAt = now + 650;
      }
      while (
        soldier.pathIndex < soldier.path.length &&
        Math.hypot(
          soldier.path[soldier.pathIndex].x - soldier.group.position.x,
          soldier.path[soldier.pathIndex].z - soldier.group.position.z,
        ) < 0.8
      ) soldier.pathIndex += 1;
      const waypoint = soldier.path[soldier.pathIndex];
      if (!waypoint) {
        soldier.leftLegPivot.rotation.x = 0;
        soldier.rightLegPivot.rotation.x = 0;
        soldier.leftArmPivot.rotation.x = 0.62;
        soldier.rightArmPivot.rotation.x = 0.62;
        return false;
      }
      const dx = waypoint.x - soldier.group.position.x;
      const dz = waypoint.z - soldier.group.position.z;
      const distance = Math.hypot(dx, dz);
      if (distance < 0.001) return false;
      const step = Math.min(speed * dt, distance);
      const nextX = soldier.group.position.x + (dx / distance) * step;
      const nextZ = soldier.group.position.z + (dz / distance) * step;
      let moved = false;
      if (!isBlocked(nextX, soldier.group.position.z, 0.55)) {
        soldier.group.position.x = nextX;
        moved = true;
      }
      if (!isBlocked(soldier.group.position.x, nextZ, 0.55)) {
        soldier.group.position.z = nextZ;
        moved = true;
      }
      if (moved) soldier.group.lookAt(waypoint.x, soldier.group.position.y, waypoint.z);
      const swing = moved ? Math.sin(now * 0.009 + soldier.phase) * 0.42 : 0;
      soldier.leftLegPivot.rotation.x = swing;
      soldier.rightLegPivot.rotation.x = -swing;
      soldier.leftArmPivot.rotation.x = 0.62 - swing * 0.42;
      soldier.rightArmPivot.rotation.x = 0.62 + swing * 0.42;
      return moved;
    };

    const fire = () => {
      const now = performance.now();
      if (now - lastShotAt < 160) return;
      lastShotAt = now;
      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const intersections = raycaster.intersectObjects(scene.children, true);
      const firstHit = intersections[0];
      const hitSoldier = firstHit && soldiers.find((soldier) => (
        soldier.alive && soldier.parts.includes(firstHit.object as THREE.Mesh)
      ));
      const headshot = Boolean(hitSoldier && firstHit && hitSoldier.headParts.includes(firstHit.object as THREE.Mesh));
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      const origin = camera.getWorldPosition(new THREE.Vector3());
      const endpoint = firstHit?.point ?? origin.clone().add(direction.multiplyScalar(34));
      const tracerGeometry = new THREE.BufferGeometry().setFromPoints([origin, endpoint]);
      const tracerMaterial = new THREE.LineBasicMaterial({
        color: hitSoldier ? (headshot ? "#ffd087" : "#ff7587") : "#6cf6ff",
        transparent: true,
        opacity: 0.92,
      });
      const tracer = new THREE.Line(tracerGeometry, tracerMaterial);
      scene.add(tracer);
      tracers.push({ line: tracer, expiresAt: now + 105, disposeMaterial: true });
      if (hitSoldier) {
        const damage = Math.min(hitSoldier.health, headshot ? 80 : 32);
        hitSoldier.health = Math.max(0, hitSoldier.health - damage);
        const eliminated = hitSoldier.health === 0;
        if (eliminated) {
          hitSoldier.alive = false;
          hitSoldier.mode = "dead";
          hitSoldier.deathStartedAt = now;
          hitSoldier.muzzleFlash.visible = false;
          setEnemyCount((current) => Math.max(0, current - 1));
        }
        setScore((current) => current + (headshot ? 120 : 30) + (eliminated ? 100 : 0));
        hitFeedbackIdRef.current += 1;
        setHitFeedback({ id: hitFeedbackIdRef.current, damage, headshot, eliminated });
        if (hitFeedbackTimeoutRef.current !== null) window.clearTimeout(hitFeedbackTimeoutRef.current);
        hitFeedbackTimeoutRef.current = window.setTimeout(() => setHitFeedback(null), 720);
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

    const shootSoldier = (soldier: SoldierState, now: number, target: THREE.Vector3) => {
      const accuracy = Math.min(0.82, 0.32 + (waveRef.current - 1) * 0.055);
      const hitsPlayer = Math.random() < accuracy;
      const impact = target.clone();
      const missRadius = Math.max(0.8, soldier.group.position.distanceTo(target) * (1 - accuracy) * 0.12);
      if (!hitsPlayer) {
        impact.x += (Math.random() - 0.5) * missRadius * 2;
        impact.y += (Math.random() - 0.5) * missRadius;
      }
      soldier.group.updateMatrixWorld(true);
      const origin = soldier.muzzleFlash.getWorldPosition(new THREE.Vector3());
      const shotDirection = impact.clone().sub(origin);
      const shotDistance = shotDirection.length();
      sightRaycaster.set(origin, shotDirection.normalize());
      sightRaycaster.far = shotDistance;
      const blocker = sightRaycaster.intersectObjects(worldOccluders, false)[0];
      const endpoint = blocker?.point ?? impact;
      const tracerGeometry = new THREE.BufferGeometry().setFromPoints([origin, endpoint]);
      const tracer = new THREE.Line(tracerGeometry, enemyTracerMat);
      scene.add(tracer);
      tracers.push({ line: tracer, expiresAt: now + 180, disposeMaterial: false });
      soldier.nextShotAt = now + Math.max(620, 1750 - waveRef.current * 42) + Math.random() * 420;
      soldier.muzzleFlashUntil = now + 90;
      soldier.recoilUntil = now + 150;
      soldier.muzzleFlash.visible = true;
      if (hitsPlayer) setPlayerHealth((current) => Math.max(0, current - 9));
    };

    let waveTransitionAt = 0;
    const beginNextWave = (now: number) => {
      waveRef.current += 1;
      setWave(waveRef.current);
      soldiers.forEach((soldier, index) => {
        soldier.health = soldier.maxHealth;
        soldier.alive = true;
        soldier.mode = "patrol";
        soldier.group.visible = true;
        soldier.group.position.set(soldier.spawnX, 0, soldier.spawnZ);
        soldier.group.rotation.set(0, 0, 0);
        soldier.group.lookAt(player.position.x, 0, player.position.z);
        soldier.leftArmPivot.rotation.set(0, 0, 0);
        soldier.rightArmPivot.rotation.set(0, 0, 0);
        soldier.leftLegPivot.rotation.set(0, 0, 0);
        soldier.rightLegPivot.rotation.set(0, 0, 0);
        soldier.rifle.position.set(0.3, 1.24, -0.22);
        soldier.muzzleFlash.visible = false;
        soldier.patrolIndex = (index + waveRef.current) % soldier.patrolPoints.length;
        soldier.nextSenseAt = 0;
        soldier.canSeePlayer = false;
        soldier.lastSeenAt = 0;
        soldier.lastKnownPlayer.set(soldier.spawnX, 0, soldier.spawnZ);
        soldier.nextShotAt = now + 950 + Math.random() * 500;
        soldier.nextCoverAt = 0;
        soldier.coverUntil = 0;
        soldier.coverTarget = null;
        soldier.path = [];
        soldier.pathIndex = 0;
        soldier.nextPathAt = 0;
        soldier.pathTarget.set(Number.POSITIVE_INFINITY, 0, Number.POSITIVE_INFINITY);
        soldier.muzzleFlashUntil = 0;
        soldier.recoilUntil = 0;
        soldier.deathStartedAt = 0;
      });
      setEnemyCount(soldiers.length);
      waveTransitionAt = 0;
    };

    const animate = (now: number) => {
      frame = window.requestAnimationFrame(animate);
      if (lastRenderAt && now - lastRenderAt < 1000 / 60) return;
      const dt = Math.min((now - previousTime) / 1000, 0.05);
      previousTime = now;
      lastRenderAt = now;
      elapsed += dt;
      const playerPosition = new THREE.Vector3(player.position.x, 0, player.position.z);
      const playerAimPoint = new THREE.Vector3(player.position.x, player.position.y - 0.35, player.position.z);
      soldiers.forEach((soldier) => {
        if (!soldier.alive) {
          const fallProgress = THREE.MathUtils.clamp((now - soldier.deathStartedAt) / 680, 0, 1);
          soldier.group.rotation.x = soldier.deathDirection * fallProgress * 1.16;
          soldier.group.position.y = -0.08 * fallProgress;
          return;
        }

        if (now >= soldier.muzzleFlashUntil) soldier.muzzleFlash.visible = false;
        soldier.rifle.position.z = -0.22 + (now < soldier.recoilUntil ? 0.1 : 0);
        const offsetToPlayer = playerPosition.clone().sub(soldier.group.position);
        const distanceToPlayer = offsetToPlayer.length();
        if (now >= soldier.nextSenseAt) {
          const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(soldier.group.quaternion);
          forward.y = 0;
          forward.normalize();
          const directionToPlayer = offsetToPlayer.clone().normalize();
          const inFieldOfView = soldier.mode !== "patrol" || forward.dot(directionToPlayer) > 0.24;
          const eye = soldier.group.position.clone().add(new THREE.Vector3(0, 1.48, 0));
          soldier.canSeePlayer = distanceToPlayer < 62 && inFieldOfView && hasLineOfSight(eye, playerAimPoint);
          soldier.nextSenseAt = now + 240;
          if (soldier.canSeePlayer) {
            soldier.lastSeenAt = now;
            soldier.lastKnownPlayer.copy(playerPosition);
            if (soldier.mode !== "cover" && soldier.mode !== "attack") {
              soldier.mode = "attack";
              soldier.nextCoverAt = now + 2600;
            }
          } else if (soldier.mode !== "cover") {
            if (soldier.lastSeenAt && now - soldier.lastSeenAt < 6500) {
              soldier.mode = "chase";
            } else if (soldier.mode !== "patrol") {
              soldier.mode = "patrol";
              soldier.coverTarget = null;
              soldier.nextPathAt = 0;
            }
          }
        }

        if (
          soldier.mode === "attack" &&
          now >= soldier.nextCoverAt &&
          distanceToPlayer > 11 &&
          distanceToPlayer < 48
        ) {
          soldier.nextCoverAt = now + 9000;
          const cover = chooseCoverPoint(soldier, playerPosition);
          if (cover) {
            soldier.mode = "cover";
            soldier.coverTarget = cover;
            soldier.coverUntil = now + 1750;
            soldier.nextPathAt = 0;
          }
        }

        if (soldier.mode === "patrol") {
          const patrolTarget = soldier.patrolPoints[soldier.patrolIndex];
          if (Math.hypot(patrolTarget.x - soldier.group.position.x, patrolTarget.z - soldier.group.position.z) < 1.3) {
            soldier.patrolIndex = (soldier.patrolIndex + 1) % soldier.patrolPoints.length;
            soldier.nextPathAt = 0;
          }
          moveSoldier(soldier, soldier.patrolPoints[soldier.patrolIndex], 1.35, dt, now);
        } else if (soldier.mode === "cover" && soldier.coverTarget) {
          const distanceToCover = Math.hypot(
            soldier.coverTarget.x - soldier.group.position.x,
            soldier.coverTarget.z - soldier.group.position.z,
          );
          if (distanceToCover > 1.15) {
            moveSoldier(soldier, soldier.coverTarget, 2.35, dt, now);
          } else {
            moveSoldier(soldier, soldier.group.position.clone(), 0, dt, now);
            soldier.group.lookAt(playerPosition.x, soldier.group.position.y, playerPosition.z);
            if (now >= soldier.coverUntil) {
              soldier.mode = "chase";
              soldier.coverTarget = null;
              soldier.lastKnownPlayer.copy(playerPosition);
              soldier.nextPathAt = 0;
            }
          }
        } else if (soldier.mode === "chase") {
          const distanceToLastSeen = Math.hypot(
            soldier.lastKnownPlayer.x - soldier.group.position.x,
            soldier.lastKnownPlayer.z - soldier.group.position.z,
          );
          if (distanceToLastSeen > 1.5) {
            moveSoldier(soldier, soldier.lastKnownPlayer, 2.6, dt, now);
          } else if (!soldier.canSeePlayer && now - soldier.lastSeenAt > 2800) {
            soldier.mode = "patrol";
            soldier.nextPathAt = 0;
          }
        } else if (soldier.mode === "attack") {
          if (distanceToPlayer > 15) {
            moveSoldier(soldier, playerPosition, 2.15, dt, now);
          } else {
            moveSoldier(soldier, soldier.group.position.clone(), 0, dt, now);
            soldier.group.lookAt(playerPosition.x, soldier.group.position.y, playerPosition.z);
          }
          const muzzleOrigin = soldier.group.position.clone().add(new THREE.Vector3(0, 1.48, 0));
          if (
            soldier.canSeePlayer &&
            distanceToPlayer < 58 &&
            now >= soldier.nextShotAt &&
            hasLineOfSight(muzzleOrigin, playerAimPoint)
          ) {
            shootSoldier(soldier, now, playerAimPoint);
          }
        }
      });
      if (soldiers.every((soldier) => !soldier.alive)) {
        if (!waveTransitionAt) waveTransitionAt = now + 2300;
        if (now >= waveTransitionAt) beginNextWave(now);
      } else {
        waveTransitionAt = 0;
      }
      for (let i = tracers.length - 1; i >= 0; i -= 1) {
        if (now < tracers[i].expiresAt) continue;
        scene.remove(tracers[i].line);
        tracers[i].line.geometry.dispose();
        if (tracers[i].disposeMaterial) (tracers[i].line.material as THREE.Material).dispose();
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
      if (hitFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(hitFeedbackTimeoutRef.current);
        hitFeedbackTimeoutRef.current = null;
      }
      tracers.forEach(({ line }) => {
        scene.remove(line);
        line.geometry.dispose();
        if (tracers.some((tracer) => tracer.line === line && tracer.disposeMaterial)) {
          (line.material as THREE.Material).dispose();
        }
      });
      const disposedGeometries = new Set<THREE.BufferGeometry>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && !disposedGeometries.has(object.geometry)) {
          object.geometry.dispose();
          disposedGeometries.add(object.geometry);
        }
      });
      soldierGeometries.forEach((geometry) => {
        if (disposedGeometries.has(geometry)) return;
        geometry.dispose();
        disposedGeometries.add(geometry);
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
        .strike-hit-feedback{position:absolute;z-index:3;left:50%;top:50%;display:grid;justify-items:center;gap:10px;transform:translate(-50%,-50%);pointer-events:none;animation:strike-hit-pop .72s ease-out both}
        .strike-hit-marker{width:30px;height:30px;overflow:visible;filter:drop-shadow(0 0 5px rgba(66,238,187,.6))}
        .strike-hit-marker path{fill:none;stroke:#79f4c6;stroke-width:2.4;stroke-linecap:round}
        .strike-hit-number{padding:4px 8px;border:1px solid rgba(115,244,198,.55);background:rgba(5,20,25,.78);color:#a4ffda;font:700 10px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.08em;text-shadow:0 0 10px rgba(91,242,191,.55);white-space:nowrap}
        .strike-hit-feedback.is-headshot .strike-hit-marker path{stroke:#ffd087}
        .strike-hit-feedback.is-headshot .strike-hit-number{border-color:rgba(255,208,135,.65);color:#ffdda5;text-shadow:0 0 10px rgba(255,184,98,.55)}
        .strike-hit-feedback.is-eliminated .strike-hit-number{background:rgba(47,24,20,.86)}
        @keyframes strike-hit-pop{0%{opacity:0;transform:translate(-50%,-38%) scale(.78)}14%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}65%{opacity:1;transform:translate(-50%,-58%) scale(1)}100%{opacity:0;transform:translate(-50%,-86%) scale(.96)}}
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
          <div className="strike-status"><i />PRAJURIT {String(enemyCount).padStart(2, "0")} <span>·</span> SKOR {String(score).padStart(3, "0")}</div>
        </header>
        {hitFeedback && (
          <div
            key={hitFeedback.id}
            className={`strike-hit-feedback${hitFeedback.headshot ? " is-headshot" : ""}${hitFeedback.eliminated ? " is-eliminated" : ""}`}
            role="status"
            aria-live="polite"
          >
            <svg className="strike-hit-marker" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M4 4l7 7m10 10l7 7M28 4l-7 7M11 21l-7 7" />
            </svg>
            <span className="strike-hit-number">
              −{hitFeedback.damage}
              {hitFeedback.headshot ? " · HEADSHOT" : ""}
              {hitFeedback.eliminated ? " · ELIMINATED" : ""}
            </span>
          </div>
        )}
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
            aria-label="Tembak prajurit"
          >TEMBAK</button>
          <div className="strike-bottom"><div className="strike-hint"><b>GESER KANAN</b><br />untuk melihat</div></div>
        </>}
      </div>
    </main>
  );
};

export default GamePage;
