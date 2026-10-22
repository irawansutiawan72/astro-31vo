import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

type MoveInput = { x: number; y: number };
type QualitySetting = "low" | "medium" | "high";
type WeaponId = "rifle" | "pistol";
type GamePhase = "combat" | "supply" | "paused" | "gameover";
type SupplyQuestion = { prompt: string; answer: number; options: number[] };
type SoundCue = "rifle" | "pistol" | "hit" | "enemy" | "wave" | "correct" | "wrong" | "gameover";
type WeaponAmmo = { magazine: number; reserve: number };
type AmmoLoadout = Record<WeaponId, WeaponAmmo>;
type RadarContact = { id: number; x: number; y: number };
type KillFeedItem = { id: number; label: string; headshot: boolean };
type DamageDirection = { id: number; angle: number };
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

const createInitialAmmo = (): AmmoLoadout => ({
  rifle: { magazine: 30, reserve: 120 },
  pistol: { magazine: 12, reserve: 48 },
});
const WEAPON_CONFIG: Record<WeaponId, {
  label: string;
  magazineSize: number;
  fireInterval: number;
  bodyDamage: number;
  headDamage: number;
  reloadDuration: number;
  baseSpread: number;
}> = {
  rifle: {
    label: "SENAPAN SERBU",
    magazineSize: 30,
    fireInterval: 112,
    bodyDamage: 30,
    headDamage: 80,
    reloadDuration: 1450,
    baseSpread: 0.0026,
  },
  pistol: {
    label: "PISTOL SEMI-AUTO",
    magazineSize: 12,
    fireInterval: 290,
    bodyDamage: 42,
    headDamage: 88,
    reloadDuration: 1080,
    baseSpread: 0.0042,
  },
};
const MAX_ACTIVE_ENEMIES = 10;
const STARTING_ENEMIES = 6;
const BEST_SCORE_KEY = "numatik-strike-best-score";
const createSupplyQuestion = (waveNumber: number): SupplyQuestion => {
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  let prompt: string;
  let answer: number;

  if (waveNumber === 1) {
    const left = randomInt(3, 12);
    const right = randomInt(2, 9);
    prompt = `${left} + ${right} = ?`;
    answer = left + right;
  } else if (waveNumber === 2) {
    const left = randomInt(24, 75);
    const right = randomInt(8, left - 2);
    prompt = `${left} − ${right} = ?`;
    answer = left - right;
  } else if (waveNumber === 3) {
    const left = randomInt(3, 9);
    const right = randomInt(4, 12);
    prompt = `${left} × ${right} = ?`;
    answer = left * right;
  } else if (waveNumber === 4) {
    const left = randomInt(11, 24);
    const right = randomInt(4, 9);
    prompt = `${left} × ${right} = ?`;
    answer = left * right;
  } else if (waveNumber === 5) {
    const divisor = randomInt(3, 10);
    const quotient = randomInt(4, 12);
    prompt = `${divisor * quotient} ÷ ${divisor} = ?`;
    answer = quotient;
  } else if (waveNumber === 6) {
    const divisor = randomInt(6, 15);
    const quotient = randomInt(8, 20);
    prompt = `${divisor * quotient} ÷ ${divisor} = ?`;
    answer = quotient;
  } else if (waveNumber < 10) {
    const left = randomInt(7, 12 + waveNumber);
    const right = randomInt(3, 9);
    const extra = randomInt(4, 18);
    prompt = waveNumber % 2
      ? `${left} × ${right} + ${extra} = ?`
      : `(${left} + ${extra}) × ${right} = ?`;
    answer = waveNumber % 2 ? left * right + extra : (left + extra) * right;
  } else {
    const percent = [20, 25, 50][randomInt(0, 2)];
    const base = 100 * (1 + Math.floor((waveNumber - 10) / 2));
    prompt = `${percent}% dari ${base} = ?`;
    answer = (percent / 100) * base;
  }

  const candidates = new Set<number>([answer]);
  for (const offset of [2, -2, 5, -5, 10, -10, 1, -1, 12, -12]) {
    const candidate = answer + offset;
    if (candidate >= 0) candidates.add(candidate);
    if (candidates.size >= 4) break;
  }
  const options = [...candidates].slice(0, 4);
  for (let index = options.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [options[index], options[swapIndex]] = [options[swapIndex], options[index]];
  }
  return { prompt, answer, options };
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
  const scoreRef = useRef(0);
  const [bestScore, setBestScore] = useState(0);
  const [enemyCount, setEnemyCount] = useState(0);
  const [wave, setWave] = useState(1);
  const waveRef = useRef(1);
  const [playerHealth, setPlayerHealth] = useState(100);
  const playerHealthRef = useRef(100);
  const [playerArmor, setPlayerArmor] = useState(0);
  const playerArmorRef = useRef(0);
  const [gamePhase, setGamePhase] = useState<GamePhase>("combat");
  const gamePhaseRef = useRef<GamePhase>("combat");
  const [supplyQuestion, setSupplyQuestion] = useState<SupplyQuestion | null>(null);
  const supplyQuestionRef = useRef<SupplyQuestion | null>(null);
  const [supplyMessage, setSupplyMessage] = useState<string | null>(null);
  const supplyResolvedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [hitFeedback, setHitFeedback] = useState<HitFeedback | null>(null);
  const hitFeedbackIdRef = useRef(0);
  const hitFeedbackTimeoutRef = useRef<number | null>(null);
  const [activeWeapon, setActiveWeapon] = useState<WeaponId>("rifle");
  const activeWeaponRef = useRef<WeaponId>("rifle");
  const [ammo, setAmmo] = useState<AmmoLoadout>(createInitialAmmo);
  const ammoRef = useRef<AmmoLoadout>(ammo);
  const [aiming, setAiming] = useState(false);
  const aimingRef = useRef(false);
  const [sprinting, setSprinting] = useState(false);
  const sprintingRef = useRef(false);
  const reloadingRef = useRef(false);
  const [isReloading, setIsReloading] = useState(false);
  const [crosshairGap, setCrosshairGap] = useState(4);
  const [radarContacts, setRadarContacts] = useState<RadarContact[]>([]);
  const [killFeed, setKillFeed] = useState<KillFeedItem[]>([]);
  const [damageFlashId, setDamageFlashId] = useState(0);
  const [incomingDirection, setIncomingDirection] = useState<DamageDirection | null>(null);
  const damageDirectionIdRef = useRef(0);
  const damageDirectionTimeoutRef = useRef<number | null>(null);
  const killFeedIdRef = useRef(0);
  const killFeedTimeoutsRef = useRef<number[]>([]);
  const fireRef = useRef<(() => void) | null>(null);
  const swapWeaponRef = useRef<(() => void) | null>(null);
  const reloadWeaponRef = useRef<(() => void) | null>(null);
  const pauseGameRef = useRef<(() => void) | null>(null);
  const resumeGameRef = useRef<(() => void) | null>(null);
  const restartGameRef = useRef<(() => void) | null>(null);
  const answerSupplyRef = useRef<((answer: number) => void) | null>(null);
  const nextWaveRef = useRef<(() => void) | null>(null);
  const soundRef = useRef<((cue: SoundCue) => void) | null>(null);
  const firingRef = useRef(false);
  const keys = useRef<Record<string, boolean>>({});
  const jumpRequested = useRef(false);
  const moveInput = useRef<MoveInput>({ x: 0, y: 0 });
  const lookDelta = useRef<MoveInput>({ x: 0, y: 0 });
  const lookPointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const joystickPointer = useRef<number | null>(null);
  const [mobileSprintHeld, setMobileSprintHeld] = useState(false);

  useEffect(() => {
    const updateMobile = () => {
      const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 760;
      mobileRef.current = isMobile;
      setMobile(isMobile);
    };
    updateMobile();
    try {
      const saved = Number(window.localStorage.getItem(BEST_SCORE_KEY));
      if (Number.isFinite(saved) && saved > 0) setBestScore(saved);
    } catch {
      setBestScore(0);
    }
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
    const playerGunMat = material("#263138", 0.48, 0.52);
    const playerGunMetalMat = material("#5f7174", 0.38, 0.72);
    const playerGunAccentMat = material("#25c5cf", 0.58, 0.28);
    const enemyTracerMat = new THREE.LineBasicMaterial({ color: "#ff604d", transparent: true, opacity: 0.84 });
    const muzzleFlashMat = new THREE.MeshBasicMaterial({ color: "#ffd59a", toneMapped: false });
    const playerMuzzleMat = new THREE.MeshBasicMaterial({ color: "#ffbd55", toneMapped: false });
    const sparkMat = new THREE.LineBasicMaterial({ color: "#ffd27a", transparent: true, opacity: 0.95 });
    materials.push(enemyTracerMat, muzzleFlashMat, playerMuzzleMat, sparkMat);

    const addViewPart = (
      parent: THREE.Object3D,
      geometry: THREE.BufferGeometry,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number,
    ) => {
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    };
    const rifleView = new THREE.Group();
    camera.add(rifleView);
    addViewPart(rifleView, new THREE.BoxGeometry(0.17, 0.15, 0.5), playerGunMat, 0, 0, -0.13);
    addViewPart(rifleView, new THREE.BoxGeometry(0.13, 0.13, 0.34), playerGunMat, 0, 0.035, -0.52);
    const rifleBarrel = addViewPart(rifleView, new THREE.CylinderGeometry(0.022, 0.03, 0.34, 6), playerGunMetalMat, 0, 0.025, -0.84);
    rifleBarrel.rotation.x = -Math.PI / 2;
    addViewPart(rifleView, new THREE.BoxGeometry(0.14, 0.15, 0.24), playerGunMat, 0, -0.005, 0.22);
    addViewPart(rifleView, new THREE.BoxGeometry(0.11, 0.24, 0.13), playerGunMat, 0, -0.18, -0.05);
    addViewPart(rifleView, new THREE.BoxGeometry(0.12, 0.24, 0.15), playerGunMetalMat, 0, -0.19, -0.23);
    addViewPart(rifleView, new THREE.BoxGeometry(0.1, 0.075, 0.13), playerGunMetalMat, 0, 0.12, -0.17);
    addViewPart(rifleView, new THREE.BoxGeometry(0.18, 0.025, 0.08), playerGunAccentMat, 0, 0.084, -0.43);
    const rifleFlash = addViewPart(rifleView, new THREE.ConeGeometry(0.075, 0.22, 6), playerMuzzleMat, 0, 0.025, -1.08);
    rifleFlash.rotation.x = -Math.PI / 2;
    rifleFlash.visible = false;
    rifleView.position.set(0.34, -0.3, -0.58);

    const pistolView = new THREE.Group();
    camera.add(pistolView);
    addViewPart(pistolView, new THREE.BoxGeometry(0.15, 0.13, 0.3), playerGunMat, 0, 0.025, -0.1);
    addViewPart(pistolView, new THREE.BoxGeometry(0.14, 0.065, 0.25), playerGunMetalMat, 0, 0.115, -0.11);
    const pistolBarrel = addViewPart(pistolView, new THREE.CylinderGeometry(0.02, 0.025, 0.15, 6), playerGunMetalMat, 0, 0.08, -0.31);
    pistolBarrel.rotation.x = -Math.PI / 2;
    addViewPart(pistolView, new THREE.BoxGeometry(0.12, 0.23, 0.13), playerGunMat, 0, -0.13, 0.035);
    addViewPart(pistolView, new THREE.BoxGeometry(0.16, 0.025, 0.055), playerGunAccentMat, 0, 0.17, -0.13);
    const pistolFlash = addViewPart(pistolView, new THREE.ConeGeometry(0.065, 0.18, 6), playerMuzzleMat, 0, 0.08, -0.48);
    pistolFlash.rotation.x = -Math.PI / 2;
    pistolFlash.visible = false;
    pistolView.position.set(0.34, -0.32, -0.48);
    pistolView.visible = false;

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
      [-43, -44], [-31, -49], [-23, -44], [-14, -49], [-4, -46],
      [7, -51], [17, -45], [26, -42], [36, -47], [46, -40],
    ];
    soldierSpawns.forEach(([x, z], index) => soldiers.push(createSoldier(x, z, index)));
    soldiers.forEach((soldier, index) => {
      if (index >= STARTING_ENEMIES) {
        soldier.alive = false;
        soldier.group.visible = false;
      }
    });
    const combatTargets: THREE.Object3D[] = [
      floor,
      ...worldOccluders,
      ...soldiers.filter((soldier) => soldier.alive).map((soldier) => soldier.group),
    ];
    const setSoldierCombatTarget = (soldier: SoldierState, active: boolean) => {
      const existingIndex = combatTargets.indexOf(soldier.group);
      if (active && existingIndex < 0) combatTargets.push(soldier.group);
      else if (!active && existingIndex >= 0) combatTargets.splice(existingIndex, 1);
    };
    setEnemyCount(STARTING_ENEMIES);
    setWave(1);
    waveRef.current = 1;

    let yaw = 0;
    let pitch = 0;
    let verticalVelocity = 0;
    let frame = 0;
    let lastRenderAt = 0;
    let previousTime = performance.now();
    let elapsed = 0;
    const lastShotAt: Record<WeaponId, number> = { rifle: Number.NEGATIVE_INFINITY, pistol: Number.NEGATIVE_INFINITY };
    let weaponRecoilUntil = 0;
    let muzzleFlashUntil = 0;
    let cameraRecoil = 0;
    let reloadStartedAt = 0;
    let reloadEndsAt = 0;
    let reloading = false;
    let lastDamageAt = 0;
    let lastHealthUiAt = 0;
    let lastHudUiAt = 0;
    let healthWasDamaged = false;
    const raycaster = new THREE.Raycaster();
    raycaster.far = 155;
    const tracers: Array<{ line: THREE.Line | THREE.LineSegments; expiresAt: number; disposeMaterial: boolean }> = [];
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

    const updateAmmo = (next: AmmoLoadout) => {
      ammoRef.current = next;
      setAmmo(next);
    };
    const addKillFeed = (headshot: boolean) => {
      const id = ++killFeedIdRef.current;
      setKillFeed((current) => [{ id, label: headshot ? "HEADSHOT · PRAJURIT DIHABISI" : "PRAJURIT DIHABISI", headshot }, ...current].slice(0, 3));
      const timeout = window.setTimeout(() => {
        setKillFeed((current) => current.filter((item) => item.id !== id));
        killFeedTimeoutsRef.current = killFeedTimeoutsRef.current.filter((active) => active !== timeout);
      }, 3600);
      killFeedTimeoutsRef.current.push(timeout);
    };
    const setPhase = (next: GamePhase) => {
      gamePhaseRef.current = next;
      setGamePhase(next);
    };
    const addScore = (points: number) => {
      scoreRef.current += points;
      setScore(scoreRef.current);
    };
    const playSound = (cue: SoundCue) => {
      if (mutedRef.current) return;
      try {
        const Context = window.AudioContext;
        if (!Context) return;
        const context = audioContextRef.current ?? new Context();
        audioContextRef.current = context;
        if (context.state === "suspended") void context.resume().catch(() => undefined);
        const presets: Record<SoundCue, [number, number, number, OscillatorType]> = {
          rifle: [118, 0.045, 0.045, "sawtooth"],
          pistol: [190, 0.07, 0.055, "square"],
          hit: [540, 0.075, 0.04, "triangle"],
          enemy: [92, 0.09, 0.035, "sawtooth"],
          wave: [330, 0.2, 0.06, "sine"],
          correct: [720, 0.16, 0.065, "sine"],
          wrong: [145, 0.17, 0.045, "triangle"],
          gameover: [105, 0.48, 0.065, "sawtooth"],
        };
        const [frequency, duration, volume, type] = presets[cue];
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, frequency * 0.48), context.currentTime + duration);
        gain.gain.setValueAtTime(0.0001, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.onended = () => {
          oscillator.disconnect();
          gain.disconnect();
        };
        oscillator.start();
        oscillator.stop(context.currentTime + duration);
      } catch {
        // Audio is an optional enhancement; unsupported or locked contexts do not interrupt play.
      }
    };
    soundRef.current = playSound;
    const pauseGame = () => {
      if (gamePhaseRef.current !== "combat") return;
      document.exitPointerLock?.();
      firingRef.current = false;
      sprintingRef.current = false;
      moveInput.current = { x: 0, y: 0 };
      lookDelta.current = { x: 0, y: 0 };
      keys.current = {};
      joystickPointer.current = null;
      lookPointer.current = null;
      setJoystick({ x: 0, y: 0 });
      setSprinting(false);
      aimingRef.current = false;
      setAiming(false);
      setMobileSprintHeld(false);
      setPhase("paused");
      if (audioContextRef.current?.state === "running") {
        void audioContextRef.current.suspend().catch(() => undefined);
      }
    };
    const resumeGame = () => {
      if (gamePhaseRef.current !== "paused") return;
      setPhase("combat");
      if (!mutedRef.current && audioContextRef.current?.state === "suspended") {
        void audioContextRef.current.resume().catch(() => undefined);
      }
    };
    pauseGameRef.current = pauseGame;
    resumeGameRef.current = resumeGame;
    const persistBestScore = (finalScore: number) => {
      let previousBest = 0;
      try {
        const saved = Number(window.localStorage.getItem(BEST_SCORE_KEY));
        if (Number.isFinite(saved) && saved > 0) previousBest = saved;
        const nextBest = Math.max(previousBest, finalScore);
        window.localStorage.setItem(BEST_SCORE_KEY, String(nextBest));
        previousBest = nextBest;
      } catch {
        previousBest = Math.max(previousBest, finalScore);
      }
      setBestScore(previousBest);
    };
    const finishGame = () => {
      if (gamePhaseRef.current === "gameover") return;
      document.exitPointerLock?.();
      firingRef.current = false;
      sprintingRef.current = false;
      aimingRef.current = false;
      moveInput.current = { x: 0, y: 0 };
      lookDelta.current = { x: 0, y: 0 };
      keys.current = {};
      joystickPointer.current = null;
      lookPointer.current = null;
      setSprinting(false);
      setAiming(false);
      setMobileSprintHeld(false);
      reloading = false;
      reloadingRef.current = false;
      setIsReloading(false);
      setPhase("gameover");
      persistBestScore(scoreRef.current);
      playSound("gameover");
    };
    const startReload = () => {
      if (gamePhaseRef.current !== "combat" || reloading || reloadingRef.current) return;
      const selected = activeWeaponRef.current;
      const config = WEAPON_CONFIG[selected];
      const currentAmmo = ammoRef.current[selected];
      if (currentAmmo.magazine >= config.magazineSize || currentAmmo.reserve <= 0) return;
      reloading = true;
      reloadingRef.current = true;
      reloadStartedAt = performance.now();
      reloadEndsAt = reloadStartedAt + config.reloadDuration;
      setIsReloading(true);
      firingRef.current = false;
    };
    const swapWeapon = () => {
      if (gamePhaseRef.current !== "combat") return;
      if (reloading) {
        reloading = false;
        reloadingRef.current = false;
        setIsReloading(false);
      }
      firingRef.current = false;
      const next: WeaponId = activeWeaponRef.current === "rifle" ? "pistol" : "rifle";
      activeWeaponRef.current = next;
      setActiveWeapon(next);
      rifleView.visible = next === "rifle";
      pistolView.visible = next === "pistol";
      aimingRef.current = false;
      setAiming(false);
    };
    const spawnWallSparks = (point: THREE.Vector3, normal: THREE.Vector3, now: number) => {
      const reference = Math.abs(normal.y) < 0.85 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
      const tangentA = new THREE.Vector3().crossVectors(normal, reference).normalize();
      const tangentB = new THREE.Vector3().crossVectors(normal, tangentA).normalize();
      const vertices: number[] = [];
      for (let index = 0; index < 5; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const direction = normal.clone().multiplyScalar(0.65)
          .addScaledVector(tangentA, Math.cos(angle))
          .addScaledVector(tangentB, Math.sin(angle))
          .normalize();
        const start = point.clone().addScaledVector(normal, 0.012);
        const end = start.clone().addScaledVector(direction, 0.1 + Math.random() * 0.16);
        vertices.push(start.x, start.y, start.z, end.x, end.y, end.z);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
      const spark = new THREE.LineSegments(geometry, sparkMat);
      spark.frustumCulled = false;
      scene.add(spark);
      tracers.push({ line: spark, expiresAt: now + 115, disposeMaterial: false });
    };
    const fire = () => {
      const now = performance.now();
      if (gamePhaseRef.current !== "combat" || reloading || now - lastShotAt[activeWeaponRef.current] < WEAPON_CONFIG[activeWeaponRef.current].fireInterval) return;
      const selected = activeWeaponRef.current;
      const config = WEAPON_CONFIG[selected];
      const currentAmmo = ammoRef.current[selected];
      if (currentAmmo.magazine <= 0) {
        startReload();
        return;
      }
      lastShotAt[selected] = now;
      updateAmmo({
        ...ammoRef.current,
        [selected]: { ...currentAmmo, magazine: currentAmmo.magazine - 1 },
      });
      playSound(selected);

      const moving = Math.hypot(
        moveInput.current.x + ((keys.current.KeyD || keys.current.ArrowRight ? 1 : 0) - (keys.current.KeyA || keys.current.ArrowLeft ? 1 : 0)),
        moveInput.current.y + ((keys.current.KeyW || keys.current.ArrowUp ? 1 : 0) - (keys.current.KeyS || keys.current.ArrowDown ? 1 : 0)),
      ) > 0.1;
      const sprintingNow = sprintingRef.current || keys.current.ShiftLeft || keys.current.ShiftRight;
      const spreadScale = aimingRef.current ? 0.52 : sprintingNow ? 2.25 : moving ? 1.38 : 1;
      const spread = config.baseSpread * spreadScale * Math.sqrt(Math.random());
      const spreadAngle = Math.random() * Math.PI * 2;
      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);
      raycaster.setFromCamera(new THREE.Vector2(
        Math.cos(spreadAngle) * spread * camera.aspect,
        Math.sin(spreadAngle) * spread,
      ), camera);
      const intersections = raycaster.intersectObjects(combatTargets, true);
      const firstHit = intersections[0];
      const hitSoldier = firstHit && soldiers.find((soldier) => (
        soldier.alive && soldier.parts.includes(firstHit.object as THREE.Mesh)
      ));
      const headshot = Boolean(hitSoldier && firstHit && hitSoldier.headParts.includes(firstHit.object as THREE.Mesh));
      const flash = selected === "rifle" ? rifleFlash : pistolFlash;
      const origin = flash.getWorldPosition(new THREE.Vector3());
      const endpoint = firstHit?.point ?? origin.clone().add(raycaster.ray.direction.clone().multiplyScalar(34));
      const tracerGeometry = new THREE.BufferGeometry().setFromPoints([origin, endpoint]);
      const tracerMaterial = new THREE.LineBasicMaterial({
        color: hitSoldier ? (headshot ? "#ffd087" : "#ff7587") : "#6cf6ff",
        transparent: true,
        opacity: 0.92,
      });
      const tracer = new THREE.Line(tracerGeometry, tracerMaterial);
      scene.add(tracer);
      tracers.push({ line: tracer, expiresAt: now + 105, disposeMaterial: true });
      weaponRecoilUntil = now + 130;
      muzzleFlashUntil = now + 72;
      flash.visible = true;
      cameraRecoil = Math.min(0.13, cameraRecoil + (selected === "rifle" ? 0.012 : 0.021) * (aimingRef.current ? 1.18 : 1));

      if (firstHit && worldOccluders.includes(firstHit.object)) {
        const normal = firstHit.face?.normal.clone().transformDirection(firstHit.object.matrixWorld) ?? new THREE.Vector3(0, 1, 0);
        spawnWallSparks(firstHit.point, normal, now);
      }
      if (hitSoldier) {
        const damage = Math.min(hitSoldier.health, headshot ? config.headDamage : config.bodyDamage);
        hitSoldier.health = Math.max(0, hitSoldier.health - damage);
        const eliminated = hitSoldier.health === 0;
        if (eliminated) {
          hitSoldier.alive = false;
          setSoldierCombatTarget(hitSoldier, false);
          hitSoldier.mode = "dead";
          hitSoldier.deathStartedAt = now;
          hitSoldier.muzzleFlash.visible = false;
          setEnemyCount((current) => Math.max(0, current - 1));
          addKillFeed(headshot);
        }
        addScore((headshot ? 120 : 30) + (eliminated ? 100 : 0));
        playSound("hit");
        hitFeedbackIdRef.current += 1;
        setHitFeedback({ id: hitFeedbackIdRef.current, damage, headshot, eliminated });
        if (hitFeedbackTimeoutRef.current !== null) window.clearTimeout(hitFeedbackTimeoutRef.current);
        hitFeedbackTimeoutRef.current = window.setTimeout(() => setHitFeedback(null), 720);
      }
    };
    const reload = () => startReload();
    fireRef.current = fire;
    swapWeaponRef.current = swapWeapon;
    reloadWeaponRef.current = reload;
    const onResize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight, false);
      renderer.setPixelRatio(getQualityPixelRatio(qualityRef.current));
    };
    const onKeyDown = (event: KeyboardEvent) => {
      keys.current[event.code] = true;
      if (event.code === "KeyP" && !event.repeat) {
        if (gamePhaseRef.current === "combat") pauseGame();
        else if (gamePhaseRef.current === "paused") resumeGame();
        return;
      }
      if (gamePhaseRef.current !== "combat") return;
      if (event.code === "Space") {
        event.preventDefault();
        jumpRequested.current = true;
      }
      if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        sprintingRef.current = true;
        setSprinting(true);
        aimingRef.current = false;
        setAiming(false);
      }
      if (event.code === "KeyQ" && !event.repeat) swapWeapon();
      if (event.code === "KeyR" && !event.repeat) startReload();
      if (event.code === "KeyF" && !event.repeat) fire();
    };
    const onKeyUp = (event: KeyboardEvent) => {
      keys.current[event.code] = false;
      if ((event.code === "ShiftLeft" || event.code === "ShiftRight") && !keys.current.ShiftLeft && !keys.current.ShiftRight) {
        sprintingRef.current = false;
        setSprinting(false);
      }
    };
    const onLockChange = () => {
      const isLocked = document.pointerLockElement === renderer.domElement;
      setLocked(isLocked);
      if (!isLocked) {
        firingRef.current = false;
        aimingRef.current = false;
        setAiming(false);
      }
    };
    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== renderer.domElement) return;
      yaw -= event.movementX * 0.0022;
      pitch = THREE.MathUtils.clamp(pitch - event.movementY * 0.0022, -1.25, 1.25);
    };
    const onCanvasClick = () => {
      if (gamePhaseRef.current === "combat" && !mobileRef.current && renderer.domElement.requestPointerLock) {
        renderer.domElement.requestPointerLock();
      }
    };
    const onCanvasMouseDown = (event: MouseEvent) => {
      if (gamePhaseRef.current !== "combat") return;
      if (event.button === 0) {
        firingRef.current = true;
        fire();
      }
      if (event.button === 2) {
        event.preventDefault();
        aimingRef.current = true;
        setAiming(true);
      }
    };
    const onMouseUp = (event: MouseEvent) => {
      if (event.button === 0) firingRef.current = false;
      if (event.button === 2) {
        aimingRef.current = false;
        setAiming(false);
      }
    };
    const onContextMenu = (event: MouseEvent) => event.preventDefault();
    const onWindowBlur = () => {
      keys.current = {};
      firingRef.current = false;
      sprintingRef.current = false;
      setSprinting(false);
      setMobileSprintHeld(false);
      aimingRef.current = false;
      setAiming(false);
      if (gamePhaseRef.current === "combat") pauseGame();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    document.addEventListener("pointerlockchange", onLockChange);
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("blur", onWindowBlur);
    renderer.domElement.addEventListener("click", onCanvasClick);
    renderer.domElement.addEventListener("mousedown", onCanvasMouseDown);
    renderer.domElement.addEventListener("contextmenu", onContextMenu);

    const shootSoldier = (soldier: SoldierState, now: number, target: THREE.Vector3) => {
      if (gamePhaseRef.current !== "combat") return;
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
      playSound("enemy");
      const dx = soldier.group.position.x - player.position.x;
      const dz = soldier.group.position.z - player.position.z;
      const forwardX = -Math.sin(yaw);
      const forwardZ = -Math.cos(yaw);
      const rightX = Math.cos(yaw);
      const rightZ = -Math.sin(yaw);
      const relativeRight = dx * rightX + dz * rightZ;
      const relativeForward = dx * forwardX + dz * forwardZ;
      damageDirectionIdRef.current += 1;
      setIncomingDirection({
        id: damageDirectionIdRef.current,
        angle: Math.atan2(relativeRight, relativeForward) * (180 / Math.PI),
      });
      if (damageDirectionTimeoutRef.current !== null) window.clearTimeout(damageDirectionTimeoutRef.current);
      damageDirectionTimeoutRef.current = window.setTimeout(() => setIncomingDirection(null), 1050);
      if (hitsPlayer) {
        const damage = 9;
        const absorbed = Math.min(playerArmorRef.current, damage);
        playerArmorRef.current = Math.max(0, playerArmorRef.current - absorbed);
        setPlayerArmor(playerArmorRef.current);
        playerHealthRef.current = Math.max(0, playerHealthRef.current - (damage - absorbed));
        setPlayerHealth(Math.ceil(playerHealthRef.current));
        lastDamageAt = now;
        healthWasDamaged = playerHealthRef.current > 0 && playerHealthRef.current < 100;
        setDamageFlashId((current) => current + 1);
        if (playerHealthRef.current <= 0) finishGame();
      }
    };

    let waveTransitionAt = 0;
    const beginNextWave = (now: number) => {
      waveRef.current += 1;
      setWave(waveRef.current);
      const activeCount = Math.min(MAX_ACTIVE_ENEMIES, STARTING_ENEMIES + waveRef.current - 1);
      soldiers.forEach((soldier, index) => {
        const active = index < activeCount;
        soldier.health = soldier.maxHealth;
        soldier.alive = active;
        setSoldierCombatTarget(soldier, active);
        soldier.mode = active ? "patrol" : "dead";
        soldier.group.visible = active;
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
        soldier.nextShotAt = now + Math.max(300, 950 - waveRef.current * 36) + Math.random() * 420;
        soldier.nextCoverAt = 0;
        soldier.coverUntil = 0;
        soldier.coverTarget = null;
        soldier.path = [];
        soldier.pathIndex = 0;
        soldier.nextPathAt = 0;
        soldier.pathTarget.set(Number.POSITIVE_INFINITY, 0, Number.POSITIVE_INFINITY);
        soldier.muzzleFlashUntil = 0;
        soldier.recoilUntil = 0;
        soldier.deathStartedAt = now;
      });
      setEnemyCount(activeCount);
      waveTransitionAt = 0;
      supplyQuestionRef.current = null;
      setSupplyQuestion(null);
      setSupplyMessage(null);
      supplyResolvedRef.current = false;
      setPhase("combat");
      playSound("wave");
    };
    const openSupplyDrop = () => {
      if (gamePhaseRef.current !== "combat") return;
      document.exitPointerLock?.();
      firingRef.current = false;
      sprintingRef.current = false;
      aimingRef.current = false;
      setSprinting(false);
      setAiming(false);
      setMobileSprintHeld(false);
      setPhase("supply");
      const question = createSupplyQuestion(waveRef.current);
      supplyQuestionRef.current = question;
      setSupplyQuestion(question);
      setSupplyMessage(null);
      supplyResolvedRef.current = false;
      playSound("wave");
    };
    answerSupplyRef.current = (selectedAnswer: number) => {
      const question = supplyQuestionRef.current;
      if (gamePhaseRef.current !== "supply" || supplyResolvedRef.current || !question) return;
      supplyResolvedRef.current = true;
      if (selectedAnswer === question.answer) {
        const reward = Math.floor(Math.random() * 3);
        if (reward === 0) {
          updateAmmo({
            rifle: { ...ammoRef.current.rifle, reserve: ammoRef.current.rifle.reserve + 30 },
            pistol: { ...ammoRef.current.pistol, reserve: ammoRef.current.pistol.reserve + 12 },
          });
          setSupplyMessage("Benar! Amunisi cadangan bertambah.");
        } else if (reward === 1) {
          playerHealthRef.current = 100;
          healthWasDamaged = false;
          setPlayerHealth(100);
          setSupplyMessage("Benar! HP dipulihkan penuh.");
        } else {
          playerArmorRef.current = Math.min(100, playerArmorRef.current + 40);
          setPlayerArmor(playerArmorRef.current);
          setSupplyMessage("Benar! Armor +40.");
        }
        playSound("correct");
      } else {
        setSupplyMessage("Belum tepat. Suplai ini tidak memberi bonus.");
        playSound("wrong");
      }
    };
    nextWaveRef.current = () => {
      if (gamePhaseRef.current !== "supply" || !supplyResolvedRef.current) return;
      beginNextWave(performance.now());
    };

    let aimBlend = 0;
    const weaponPose = {
      rifle: {
        hip: new THREE.Vector3(0.34, -0.3, -0.58),
        aim: new THREE.Vector3(0.025, -0.13, -0.43),
      },
      pistol: {
        hip: new THREE.Vector3(0.34, -0.32, -0.48),
        aim: new THREE.Vector3(0.06, -0.16, -0.38),
      },
    };
    const radarRange = 58;
    const restartGame = () => {
      if (document.pointerLockElement) document.exitPointerLock?.();
      const now = performance.now();
      waveRef.current = 1;
      setWave(1);
      waveTransitionAt = 0;
      scoreRef.current = 0;
      setScore(0);
      setEnemyCount(STARTING_ENEMIES);
      playerHealthRef.current = 100;
      setPlayerHealth(100);
      playerArmorRef.current = 0;
      setPlayerArmor(0);
      healthWasDamaged = false;
      lastDamageAt = 0;
      updateAmmo(createInitialAmmo());
      activeWeaponRef.current = "rifle";
      setActiveWeapon("rifle");
      rifleView.visible = true;
      pistolView.visible = false;
      aimingRef.current = false;
      setAiming(false);
      sprintingRef.current = false;
      setSprinting(false);
      setMobileSprintHeld(false);
      firingRef.current = false;
      reloading = false;
      reloadingRef.current = false;
      setIsReloading(false);
      keys.current = {};
      jumpRequested.current = false;
      moveInput.current = { x: 0, y: 0 };
      lookDelta.current = { x: 0, y: 0 };
      setJoystick({ x: 0, y: 0 });
      setCrosshairGap(4);
      setHitFeedback(null);
      setDamageFlashId(0);
      setIncomingDirection(null);
      setKillFeed([]);
      setRadarContacts([]);
      supplyResolvedRef.current = false;
      supplyQuestionRef.current = null;
      setSupplyQuestion(null);
      setSupplyMessage(null);
      if (hitFeedbackTimeoutRef.current !== null) window.clearTimeout(hitFeedbackTimeoutRef.current);
      if (damageDirectionTimeoutRef.current !== null) window.clearTimeout(damageDirectionTimeoutRef.current);
      killFeedTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      killFeedTimeoutsRef.current = [];
      tracers.forEach(({ line, disposeMaterial }) => {
        scene.remove(line);
        line.geometry.dispose();
        if (disposeMaterial) (line.material as THREE.Material).dispose();
      });
      tracers.length = 0;
      yaw = 0;
      pitch = 0;
      verticalVelocity = 0;
      player.position.set(0, 1.65, 51);
      player.rotation.set(0, 0, 0);
      camera.rotation.set(0, 0, 0);
      camera.fov = 72;
      camera.updateProjectionMatrix();
      cameraRecoil = 0;
      aimBlend = 0;
      elapsed = 0;
      lastShotAt.rifle = Number.NEGATIVE_INFINITY;
      lastShotAt.pistol = Number.NEGATIVE_INFINITY;
      muzzleFlashUntil = 0;
      rifleFlash.visible = false;
      pistolFlash.visible = false;
      soldiers.forEach((soldier, index) => {
        const active = index < STARTING_ENEMIES;
        soldier.health = soldier.maxHealth;
        soldier.alive = active;
        setSoldierCombatTarget(soldier, active);
        soldier.mode = active ? "patrol" : "dead";
        soldier.group.visible = active;
        soldier.group.position.set(soldier.spawnX, 0, soldier.spawnZ);
        soldier.group.rotation.set(0, 0, 0);
        soldier.group.lookAt(player.position.x, 0, player.position.z);
        soldier.leftArmPivot.rotation.set(0, 0, 0);
        soldier.rightArmPivot.rotation.set(0, 0, 0);
        soldier.leftLegPivot.rotation.set(0, 0, 0);
        soldier.rightLegPivot.rotation.set(0, 0, 0);
        soldier.rifle.position.set(0.3, 1.24, -0.22);
        soldier.muzzleFlash.visible = false;
        soldier.patrolIndex = index % soldier.patrolPoints.length;
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
        soldier.deathStartedAt = now;
      });
      setPhase("combat");
      playSound("wave");
    };
    restartGameRef.current = restartGame;
    const animate = (now: number) => {
      frame = window.requestAnimationFrame(animate);
      if (lastRenderAt && now - lastRenderAt < 1000 / 60) return;
      const dt = Math.min((now - previousTime) / 1000, 0.05);
      previousTime = now;
      lastRenderAt = now;
      if (gamePhaseRef.current !== "combat") {
        renderer.render(scene, camera);
        return;
      }
      elapsed += dt;
      const playerPosition = new THREE.Vector3(player.position.x, 0, player.position.z);
      const playerAimPoint = new THREE.Vector3(player.position.x, player.position.y - 0.35, player.position.z);
      soldiers.forEach((soldier) => {
        if (gamePhaseRef.current !== "combat") return;
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
      if (gamePhaseRef.current !== "combat") {
        renderer.render(scene, camera);
        return;
      }
      if (soldiers.every((soldier) => !soldier.alive)) {
        if (!waveTransitionAt) waveTransitionAt = now + 2300;
        if (now >= waveTransitionAt) openSupplyDrop();
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
      const sprintActive = sprintingRef.current || keysNow.ShiftLeft || keysNow.ShiftRight;
      if (length > 0) {
        const speed = 7.2 * (sprintActive ? 1.62 : 1) * dt / Math.max(1, length);
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
      const aimTarget = aimingRef.current && !sprintActive ? 1 : 0;
      aimBlend += (aimTarget - aimBlend) * (1 - Math.exp(-dt * 13));
      const targetFov = THREE.MathUtils.lerp(72, 46, aimBlend);
      if (Math.abs(camera.fov - targetFov) > 0.03) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }
      cameraRecoil *= Math.exp(-dt * 8);
      camera.rotation.x = THREE.MathUtils.clamp(pitch + cameraRecoil, -1.25, 1.25);

      const selectedWeapon = activeWeaponRef.current;
      const selectedView = selectedWeapon === "rifle" ? rifleView : pistolView;
      const pose = weaponPose[selectedWeapon];
      const walkBob = length > 0.1 ? 1 : 0;
      const sway = walkBob * (sprintActive ? 0.022 : 0.013) * (1 - aimBlend * 0.8);
      const bob = walkBob * (sprintActive ? 0.028 : 0.016) * (1 - aimBlend * 0.8);
      const reloadProgress = reloading
        ? THREE.MathUtils.clamp((now - reloadStartedAt) / WEAPON_CONFIG[selectedWeapon].reloadDuration, 0, 1)
        : 0;
      const reloadDip = reloading ? Math.sin(reloadProgress * Math.PI) * 0.13 : 0;
      const recoilKick = now < weaponRecoilUntil ? 0.08 * (1 - (now - (weaponRecoilUntil - 130)) / 130) : 0;
      selectedView.position.set(
        THREE.MathUtils.lerp(pose.hip.x, pose.aim.x, aimBlend) + Math.sin(elapsed * 9) * sway,
        THREE.MathUtils.lerp(pose.hip.y, pose.aim.y, aimBlend) + Math.abs(Math.cos(elapsed * 9)) * bob - reloadDip,
        THREE.MathUtils.lerp(pose.hip.z, pose.aim.z, aimBlend) + recoilKick,
      );
      selectedView.rotation.set(
        reloading ? reloadProgress * 0.35 : 0,
        reloading ? Math.sin(reloadProgress * Math.PI) * 0.18 : 0,
        Math.sin(elapsed * 7) * sway * 0.7,
      );
      rifleFlash.visible = selectedWeapon === "rifle" && now < muzzleFlashUntil;
      pistolFlash.visible = selectedWeapon === "pistol" && now < muzzleFlashUntil;

      if (reloading && now >= reloadEndsAt) {
        const config = WEAPON_CONFIG[selectedWeapon];
        const current = ammoRef.current[selectedWeapon];
        const loaded = Math.min(config.magazineSize - current.magazine, current.reserve);
        updateAmmo({
          ...ammoRef.current,
          [selectedWeapon]: { magazine: current.magazine + loaded, reserve: current.reserve - loaded },
        });
        reloading = false;
        reloadingRef.current = false;
        setIsReloading(false);
      }
      if (gamePhaseRef.current === "combat" && firingRef.current && selectedWeapon === "rifle" && !reloading) fire();

      if (healthWasDamaged && playerHealthRef.current < 100 && now - lastDamageAt >= 4300) {
        playerHealthRef.current = Math.min(100, playerHealthRef.current + 8 * dt);
        if (now - lastHealthUiAt >= 110) {
          setPlayerHealth(Math.ceil(playerHealthRef.current));
          lastHealthUiAt = now;
        }
      } else if (playerHealthRef.current >= 100) {
        playerHealthRef.current = 100;
        healthWasDamaged = false;
      }

      if (now - lastHudUiAt >= 125) {
        const gap = aimingRef.current ? 1.5 : 4 + (walkBob ? 2.5 : 0) + (sprintActive ? 3.5 : 0) + (reloading ? 1.5 : 0);
        setCrosshairGap(gap);
        const forwardX = -Math.sin(yaw);
        const forwardZ = -Math.cos(yaw);
        const rightX = Math.cos(yaw);
        const rightZ = -Math.sin(yaw);
        const contacts = soldiers.filter((soldier) => soldier.alive).map((soldier, index) => {
          const dx = soldier.group.position.x - player.position.x;
          const dz = soldier.group.position.z - player.position.z;
          const rightDistance = dx * rightX + dz * rightZ;
          const forwardDistance = dx * forwardX + dz * forwardZ;
          let offsetX = (rightDistance / radarRange) * 42;
          let offsetY = (-forwardDistance / radarRange) * 42;
          const offsetLength = Math.hypot(offsetX, offsetY);
          if (offsetLength > 42) {
            offsetX = (offsetX / offsetLength) * 42;
            offsetY = (offsetY / offsetLength) * 42;
          }
          return { id: index, x: 50 + offsetX, y: 50 + offsetY };
        });
        setRadarContacts(contacts);
        lastHudUiAt = now;
      }
      renderer.render(scene, camera);
    };
    frame = window.requestAnimationFrame(animate);

    teardown = () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("pointerlockchange", onLockChange);
      document.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("click", onCanvasClick);
      renderer.domElement.removeEventListener("mousedown", onCanvasMouseDown);
      renderer.domElement.removeEventListener("contextmenu", onContextMenu);
      fireRef.current = null;
      swapWeaponRef.current = null;
      reloadWeaponRef.current = null;
      pauseGameRef.current = null;
      resumeGameRef.current = null;
      restartGameRef.current = null;
      answerSupplyRef.current = null;
      nextWaveRef.current = null;
      soundRef.current = null;
      firingRef.current = false;
      reloadingRef.current = false;
      if (rendererRef.current === renderer) rendererRef.current = null;
      if (document.pointerLockElement === renderer.domElement) document.exitPointerLock?.();
      if (hitFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(hitFeedbackTimeoutRef.current);
        hitFeedbackTimeoutRef.current = null;
      }
      if (damageDirectionTimeoutRef.current !== null) {
        window.clearTimeout(damageDirectionTimeoutRef.current);
        damageDirectionTimeoutRef.current = null;
      }
      killFeedTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      killFeedTimeoutsRef.current = [];
      const audioContext = audioContextRef.current;
      audioContextRef.current = null;
      if (audioContext && audioContext.state !== "closed") {
        void audioContext.close().catch(() => undefined);
      }
      tracers.forEach(({ line, disposeMaterial }) => {
        scene.remove(line);
        line.geometry.dispose();
        if (disposeMaterial) (line.material as THREE.Material).dispose();
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
    if (gamePhaseRef.current !== "combat") return;
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
    if (gamePhaseRef.current !== "combat") return;
    lookPointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onTouchLookMove = (event: PointerEvent<HTMLDivElement>) => {
    if (gamePhaseRef.current !== "combat") return;
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
    if (gamePhaseRef.current !== "combat") return;
    joystickPointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateJoystick(event);
  };
  const toggleAim = () => {
    if (gamePhaseRef.current !== "combat") return;
    if (!aimingRef.current && sprintingRef.current) {
      sprintingRef.current = false;
      setSprinting(false);
      setMobileSprintHeld(false);
    }
    const next = !aimingRef.current;
    aimingRef.current = next;
    setAiming(next);
  };
  const startMobileSprint = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (gamePhaseRef.current !== "combat") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    sprintingRef.current = true;
    setSprinting(true);
    setMobileSprintHeld(true);
    aimingRef.current = false;
    setAiming(false);
  };
  const stopMobileSprint = () => {
    sprintingRef.current = false;
    setSprinting(false);
    setMobileSprintHeld(false);
  };
  const startMobileFire = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (gamePhaseRef.current !== "combat") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    firingRef.current = true;
    fireRef.current?.();
  };
  const stopMobileFire = () => { firingRef.current = false; };
  const toggleMute = () => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    const context = audioContextRef.current;
    if (next && context?.state === "running") {
      void context.suspend().catch(() => undefined);
    } else if (!next && gamePhaseRef.current === "combat" && context?.state === "suspended") {
      void context.resume().catch(() => undefined);
    }
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
         .strike-header-actions{display:flex;align-items:center;gap:7px}
         .strike-status{font:500 10px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.1em;color:#8ab6c3;border:1px solid rgba(144,203,218,.2);background:rgba(5,16,28,.55);padding:9px 12px;white-space:nowrap}
         .strike-status span{color:rgba(144,203,218,.4);padding:0 4px}
        .strike-status i{display:inline-block;width:6px;height:6px;border-radius:50%;background:#45dfb1;margin-right:8px;box-shadow:0 0 8px #45dfb1}
         .strike-header-button{pointer-events:auto;min-height:36px;padding:7px 10px;border:1px solid rgba(105,210,220,.45);background:rgba(5,20,31,.82);color:#dffbff;font:600 8px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.08em;cursor:pointer}
         .strike-header-button:disabled{opacity:.46;cursor:not-allowed}
        .strike-quality-control{position:absolute;right:clamp(16px,4vw,48px);top:68px;display:flex;align-items:center;gap:8px;padding:6px 8px;border:1px solid rgba(202,211,211,.2);background:rgba(19,24,30,.58);pointer-events:auto}
        .strike-quality-control label{font:500 8px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.1em;color:#aeb8b8}
        .strike-quality-control select{border:1px solid rgba(202,211,211,.28);border-radius:2px;background:#22282c;color:#e6e5dc;padding:4px 7px;font:500 10px var(--font-body,'Exo 2'),sans-serif;cursor:pointer}
         .strike-reticle{position:absolute;left:50%;top:50%;width:36px;height:36px;transform:translate(-50%,-50%);opacity:.78;transition:opacity .15s,filter .15s}
         .strike-reticle span{position:absolute;display:block;background:#d6fbff;border-radius:2px;box-shadow:0 0 4px rgba(95,230,238,.35)}
         .strike-reticle .reticle-top,.strike-reticle .reticle-bottom{left:17px;width:2px;height:7px}
         .strike-reticle .reticle-top{top:0;transform:translateY(calc(-1 * var(--crosshair-gap)))}
         .strike-reticle .reticle-bottom{bottom:0;transform:translateY(var(--crosshair-gap))}
         .strike-reticle .reticle-left,.strike-reticle .reticle-right{top:17px;width:7px;height:2px}
         .strike-reticle .reticle-left{left:0;transform:translateX(calc(-1 * var(--crosshair-gap)))}
         .strike-reticle .reticle-right{right:0;transform:translateX(var(--crosshair-gap))}
         .strike-reticle .reticle-center{left:16px;top:16px;width:4px;height:4px;border-radius:50%}
         .strike-reticle.is-aiming{opacity:1;filter:drop-shadow(0 0 5px #43dce8)}
         .strike-damage-vignette{position:absolute;z-index:1;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 40%,rgba(174,24,35,.5) 100%);animation:strike-damage-flash .58s ease-out both}
         @keyframes strike-damage-flash{0%{opacity:.9}100%{opacity:0}}
         .strike-direction{position:absolute;left:50%;top:50%;width:34px;height:38px;display:grid;place-items:center;color:#ff655d;filter:drop-shadow(0 0 8px rgba(255,72,64,.8));pointer-events:none;animation:strike-direction-pulse 1.05s ease-out both}
         .strike-direction svg{width:28px;height:32px;fill:rgba(255,74,69,.55);stroke:#ffd1ca;stroke-width:1.4}
         @keyframes strike-direction-pulse{0%{opacity:0;scale:.8}16%{opacity:1;scale:1.1}70%{opacity:.9;scale:1}100%{opacity:0;scale:.88}}
         .strike-radar{position:absolute;right:clamp(16px,4vw,48px);top:112px;width:112px;height:112px;border:1px solid rgba(79,224,224,.36);border-radius:50%;background:rgba(4,18,27,.7);box-shadow:inset 0 0 18px rgba(44,202,210,.08),0 8px 24px rgba(0,0,0,.18);overflow:hidden}
         .strike-radar svg{width:100%;height:100%}
         .strike-radar-ring{fill:none;stroke:rgba(99,211,216,.2);stroke-width:.7}
         .strike-radar-line{stroke:rgba(99,211,216,.16);stroke-width:.7}
         .strike-radar-sweep{fill:none;stroke:rgba(73,230,208,.16);stroke-width:14;stroke-dasharray:22 100;transform-origin:50px 50px;animation:str-radar-sweep 5s linear infinite}
         @keyframes str-radar-sweep{to{transform:rotate(360deg)}}
         .strike-radar-player{fill:#66f5e6;stroke:#d3fffa;stroke-width:1}
         .strike-radar-enemy{fill:#ff514c;stroke:#ffc3a5;stroke-width:.8;filter:drop-shadow(0 0 2px #ff4d48)}
         .strike-radar-label{position:absolute;left:50%;top:-1px;transform:translateX(-50%);font:600 7px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.08em;color:#7dbbc0;text-shadow:0 1px 4px #06131a}
          .strike-health-panel,.strike-ammo-panel{position:absolute;bottom:82px;min-height:60px;padding:9px 11px;border:1px solid rgba(144,203,218,.22);background:rgba(5,16,28,.76);box-shadow:0 8px 24px rgba(0,0,0,.16);pointer-events:none}
         .strike-health-panel{left:clamp(16px,4vw,48px);width:210px}
         .strike-ammo-panel{right:clamp(16px,4vw,48px);width:220px;text-align:right}
         .strike-panel-heading{display:flex;align-items:center;justify-content:space-between;gap:8px;font:600 8px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.12em;color:#8eb4c0}
         .strike-health-value{font:700 14px var(--font-display,'Orbitron'),sans-serif;color:#dffbf4}
         .strike-health-track,.strike-reload-track{height:5px;margin-top:7px;background:rgba(210,235,236,.13);overflow:hidden}
         .strike-health-fill{height:100%;background:linear-gradient(90deg,#28b997,#8df1bd);transition:width .18s}
         .strike-health-fill.is-low{background:linear-gradient(90deg,#e94b52,#ffb26f)}
          .strike-armor-heading{display:flex;justify-content:space-between;margin-top:5px;color:#91a9c7;font:600 7px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.09em}
          .strike-armor-track{height:4px;margin-top:4px;background:rgba(210,235,236,.13);overflow:hidden}
          .strike-armor-fill{height:100%;background:linear-gradient(90deg,#628be8,#b6d9ff);transition:width .18s}
         .strike-ammo-count{margin-top:4px;font:700 18px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.05em;color:#eefbfc}
         .strike-ammo-count small{font-size:11px;color:#7294a0}
         .strike-reload-track{height:2px;margin-top:5px}
         .strike-reload-fill{width:0;height:100%;background:#52e4d3}
         .strike-reload-track.is-reloading .strike-reload-fill{animation:str-reload-progress 1.45s linear both}
         @keyframes str-reload-progress{from{width:0}to{width:100%}}
         .strike-feed{position:absolute;left:clamp(16px,4vw,48px);top:82px;width:min(250px,42vw);display:grid;gap:5px;pointer-events:none}
         .strike-feed-item{padding:6px 9px;border-left:2px solid #ff776b;background:linear-gradient(90deg,rgba(13,25,33,.83),rgba(13,25,33,.12));color:#e8f1ee;font:600 8px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.08em;animation:str-feed-in .18s ease-out both}
         .strike-feed-item.is-headshot{border-color:#ffd087;color:#ffdda5}
         @keyframes str-feed-in{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
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
         .strike-phase-layer{position:absolute;z-index:6;inset:0;display:grid;place-items:center;padding:16px;background:rgba(3,10,18,.78);backdrop-filter:blur(7px);pointer-events:auto}
         .strike-phase-card{width:min(520px,calc(100vw - 28px));max-height:calc(100dvh - 32px);overflow:auto;padding:clamp(22px,5vw,38px);border:1px solid rgba(92,220,230,.38);background:linear-gradient(145deg,rgba(9,28,42,.98),rgba(6,14,27,.98));box-shadow:0 24px 90px rgba(0,0,0,.42);text-align:center}
         .strike-phase-kicker{color:#73d9df;font:600 9px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.2em;text-transform:uppercase}
         .strike-phase-title{margin:10px 0 8px;color:#effcff;font:700 clamp(22px,5vw,30px) var(--font-display,'Orbitron'),sans-serif;letter-spacing:.09em}
         .strike-phase-copy{margin:0 auto 20px;max-width:420px;color:#a8c5d0;font-size:14px;line-height:1.6}
         .strike-math-question{margin:18px 0 22px;color:#fff;font:700 clamp(32px,8vw,52px) var(--font-display,'Orbitron'),sans-serif;letter-spacing:.06em}
         .strike-answer-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
         .strike-answer-button,.strike-phase-button{min-height:58px;border:1px solid rgba(91,210,220,.45);background:rgba(15,45,60,.82);color:#effcff;font:700 17px var(--font-display,'Orbitron'),sans-serif;cursor:pointer;touch-action:manipulation}
         .strike-answer-button:hover,.strike-phase-button:hover{border-color:#82f3eb;background:rgba(21,82,91,.88)}
         .strike-answer-button:disabled{opacity:.56;cursor:default}
         .strike-phase-button{width:100%;margin-top:12px;padding:12px 16px;font-size:11px;letter-spacing:.1em}
         .strike-phase-button.is-secondary{border-color:rgba(170,194,206,.25);background:rgba(11,23,34,.82);color:#c6dce4}
         .strike-supply-result{min-height:26px;margin:18px 0 6px;color:#9ff2d6;font-size:14px;font-weight:700}
         .strike-score-summary{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:22px 0}
         .strike-score-cell{padding:14px 8px;border:1px solid rgba(144,203,218,.2);background:rgba(3,14,24,.7)}
         .strike-score-label{color:#8bb1bf;font:600 8px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.12em}
         .strike-score-value{margin-top:7px;color:#f1ffff;font:700 22px var(--font-display,'Orbitron'),sans-serif}
        .strike-mobile-control{position:absolute;pointer-events:auto;touch-action:none;user-select:none;-webkit-user-select:none}
        .strike-stick{width:118px;height:118px;border:1px solid rgba(157,224,231,.32);border-radius:50%;background:rgba(9,24,38,.32);left:25px;bottom:34px;display:grid;place-items:center}
        .strike-stick:before{content:"";position:absolute;inset:13px;border:1px solid rgba(157,224,231,.14);border-radius:50%}
        .strike-knob{position:absolute;width:43px;height:43px;border:1px solid rgba(105,231,237,.72);border-radius:50%;background:rgba(28,122,137,.48);box-shadow:0 0 16px rgba(39,207,217,.18)}
         .strike-look{right:0;top:20%;bottom:122px;width:48%;pointer-events:auto;touch-action:none}
         .strike-action{display:grid;place-items:center;border:1px solid rgba(105,210,220,.58);background:rgba(7,25,38,.88);color:#dffbff;font:700 8px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.04em;box-shadow:0 5px 14px rgba(0,0,0,.24)}
         .strike-action:active,.strike-action.is-active{border-color:#70f2df;background:rgba(15,83,83,.92);color:#f1fffb}
         .strike-action:disabled{opacity:.4;filter:saturate(.45)}
         .strike-action small{font:500 6px var(--font-body,'Exo 2'),sans-serif;letter-spacing:.08em;color:#82aeba}
         .strike-jump{right:87px;bottom:26px;width:56px;height:56px;border-radius:50%}
         .strike-fire{right:18px;bottom:20px;width:62px;height:62px;border-radius:50%;border-color:rgba(255,102,124,.76);background:rgba(76,17,36,.9);color:#ffe5e9;font-size:9px}
         .strike-aim{right:18px;bottom:94px;width:62px;height:44px}
         .strike-reload{right:88px;bottom:94px;width:58px;height:44px}
         .strike-switch{right:152px;bottom:94px;width:58px;height:44px}
         .strike-sprint{left:145px;bottom:29px;width:62px;height:54px}
         @media(max-width:600px){
           .strike-top{left:12px;right:12px;gap:7px}
           .strike-brand{gap:7px}
           .strike-back{padding:7px 8px;font-size:8px}
           .strike-mark{width:26px;height:26px}
           .strike-title{font-size:10px}
           .strike-subtitle{font-size:7px;letter-spacing:.1em}
           .strike-status{font-size:7px;padding:7px 6px;letter-spacing:.04em}
            .strike-header-actions{gap:4px}
            .strike-header-button{min-height:30px;padding:5px 6px;font-size:6px;letter-spacing:.04em}
           .strike-quality-control{top:62px;padding:5px 6px}
           .strike-quality-control label{font-size:7px}
           .strike-radar{right:13px;top:105px;width:92px;height:92px}
           .strike-feed{top:78px;left:12px;width:min(185px,49vw)}
           .strike-feed-item{padding:5px 7px;font-size:7px}
            .strike-health-panel,.strike-ammo-panel{bottom:162px;width:min(42vw,170px);min-height:60px;padding:7px 8px}
           .strike-health-panel{left:12px}
           .strike-ammo-panel{right:12px}
           .strike-panel-heading{font-size:7px;letter-spacing:.08em}
           .strike-health-value{font-size:12px}
           .strike-ammo-count{font-size:16px}
           .strike-ammo-count small{font-size:9px}
           .strike-bottom{bottom:12px}
           .strike-hint{max-width:48%;font-size:9px}
           .strike-stick{left:18px;bottom:22px;width:108px;height:108px}
           .strike-look{top:25%;bottom:122px}
           .strike-jump{right:87px;bottom:23px;width:56px;height:56px}
           .strike-fire{right:18px;bottom:20px;width:62px;height:62px}
           .strike-aim{right:18px;bottom:94px;width:62px;height:44px}
           .strike-reload{right:88px;bottom:94px;width:58px;height:44px}
           .strike-switch{right:152px;bottom:94px;width:58px;height:44px}
           .strike-sprint{left:145px;bottom:29px;width:62px;height:54px}
         }
         @media(max-width:380px){
           .strike-mark{display:none}
           .strike-brand{gap:5px}
           .strike-title{font-size:9px}
           .strike-status{font-size:6px;padding:6px 5px}
            .strike-header-actions{gap:3px}
            .strike-header-button{padding:5px 4px;font-size:5px}
           .strike-switch{right:145px;width:52px}
           .strike-sprint{left:132px;width:56px}
         }
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
            <div><div className="strike-title">NUMATIK STRIKE</div><div className="strike-subtitle">Zona latihan · wave {wave}</div></div>
          </div>
          <div className="strike-header-actions">
            <div className="strike-status"><i />WAVE {String(wave).padStart(2, "0")} <span>·</span> {String(enemyCount).padStart(2, "0")} MUSUH <span>·</span> {String(score).padStart(3, "0")}</div>
            <button
              className="strike-header-button"
              onClick={() => pauseGameRef.current?.()}
              disabled={gamePhase !== "combat"}
              aria-label="Jeda permainan"
            >JEDA</button>
            <button
              className="strike-header-button"
              onClick={toggleMute}
              aria-pressed={muted}
              aria-label={muted ? "Aktifkan suara" : "Matikan suara"}
            >{muted ? "SUARA MATI" : "SUARA AKTIF"}</button>
          </div>
        </header>
        {damageFlashId > 0 && <div key={damageFlashId} className="strike-damage-vignette" aria-hidden="true" />}
        {incomingDirection && (
          <div
            key={incomingDirection.id}
            className="strike-direction"
            style={{ transform: `translate(-50%,-50%) rotate(${incomingDirection.angle}deg) translateY(-min(31vh,250px))` }}
            aria-label="Arah tembakan musuh"
          >
            <svg viewBox="0 0 32 36" aria-hidden="true"><path d="M16 1 29 34 16 27 3 34Z" /></svg>
          </div>
        )}
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
        {killFeed.length > 0 && (
          <div className="strike-feed" role="log" aria-live="polite" aria-label="Kill feed">
            {killFeed.map((item) => (
              <div key={item.id} className={`strike-feed-item${item.headshot ? " is-headshot" : ""}`}>{item.label}</div>
            ))}
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
        <div className="strike-radar" aria-label="Radar musuh sekitar">
          <span className="strike-radar-label">RADAR</span>
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle className="strike-radar-sweep" cx="50" cy="50" r="40" />
            <circle className="strike-radar-ring" cx="50" cy="50" r="44" />
            <circle className="strike-radar-ring" cx="50" cy="50" r="27" />
            <circle className="strike-radar-ring" cx="50" cy="50" r="11" />
            <path className="strike-radar-line" d="M50 6v88M6 50h88" />
            {radarContacts.map((contact) => (
              <circle key={contact.id} className="strike-radar-enemy" cx={contact.x} cy={contact.y} r="2.6" />
            ))}
            <path className="strike-radar-player" d="M50 43 46 56 50 53 54 56Z" />
          </svg>
        </div>
        <section className="strike-health-panel" aria-label={`HP ${playerHealth} persen, armor ${playerArmor} persen`}>
          <div className="strike-panel-heading"><span>VITAL · HP</span><span className="strike-health-value">{playerHealth}%</span></div>
          <div className="strike-health-track">
            <div className={`strike-health-fill${playerHealth <= 30 ? " is-low" : ""}`} style={{ width: `${playerHealth}%` }} />
          </div>
          <div className="strike-armor-heading"><span>ARMOR</span><span>{playerArmor}%</span></div>
          <div className="strike-armor-track"><div className="strike-armor-fill" style={{ width: `${playerArmor}%` }} /></div>
        </section>
        <section className="strike-ammo-panel" aria-label={`${WEAPON_CONFIG[activeWeapon].label}, magazen ${ammo[activeWeapon].magazine}, cadangan ${ammo[activeWeapon].reserve}`}>
          <div className="strike-panel-heading">
            <span>{WEAPON_CONFIG[activeWeapon].label}</span>
            <span>{isReloading ? "ISI ULANG" : aiming ? "BIDIK" : sprinting ? "SPRINT" : "SIAP"}</span>
          </div>
          <div className="strike-ammo-count">{ammo[activeWeapon].magazine}<small> / {ammo[activeWeapon].reserve}</small></div>
          <div className={`strike-reload-track${isReloading ? " is-reloading" : ""}`}>
            <div className="strike-reload-fill" style={{ animationDuration: `${WEAPON_CONFIG[activeWeapon].reloadDuration}ms` }} />
          </div>
        </section>
        <div
          className={`strike-reticle${aiming ? " is-aiming" : ""}`}
          style={{ "--crosshair-gap": `${crosshairGap}px` } as CSSProperties}
          aria-hidden="true"
        >
          <span className="reticle-top" /><span className="reticle-right" />
          <span className="reticle-bottom" /><span className="reticle-left" />
          <span className="reticle-center" />
        </div>
        {!mobile && <footer className="strike-bottom">
          <div className="strike-hint">
            <b>W A S D</b> gerak &nbsp; <b>SHIFT</b> sprint &nbsp; <b>Q</b> ganti senjata &nbsp; <b>P</b> jeda<br />
            <b>KLIK KIRI</b> tembak otomatis &nbsp; <b>KLIK KANAN</b> bidik &nbsp; <b>R</b> isi ulang &nbsp; <b>SPACE</b> lompat
          </div>
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
            onPointerDown={(event) => {
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              jumpRequested.current = true;
            }}
            aria-label="Lompat"
          >LOMPAT</button>
          <button
            className="strike-mobile-control strike-fire"
            onPointerDown={startMobileFire}
            onPointerUp={stopMobileFire}
            onPointerCancel={stopMobileFire}
            onLostPointerCapture={stopMobileFire}
            aria-label="Tembak prajurit"
          >TEMBAK</button>
          <button
            className={`strike-mobile-control strike-action strike-aim${aiming ? " is-active" : ""}`}
            onClick={toggleAim}
            aria-label={aiming ? "Matikan bidik" : "Bidik"}
            aria-pressed={aiming}
          >BIDIK</button>
          <button
            className="strike-mobile-control strike-action strike-reload"
            onClick={() => reloadWeaponRef.current?.()}
            aria-label="Isi ulang magazen"
            disabled={isReloading || ammo[activeWeapon].magazine >= WEAPON_CONFIG[activeWeapon].magazineSize || ammo[activeWeapon].reserve <= 0}
          >ISI ULANG</button>
          <button
            className="strike-mobile-control strike-action strike-switch"
            onClick={() => swapWeaponRef.current?.()}
            aria-label={`Ganti senjata ke ${activeWeapon === "rifle" ? "pistol" : "senapan serbu"}`}
          >GANTI<small>Q</small></button>
          <button
            className={`strike-mobile-control strike-action strike-sprint${mobileSprintHeld ? " is-active" : ""}`}
            onPointerDown={startMobileSprint}
            onPointerUp={stopMobileSprint}
            onPointerCancel={stopMobileSprint}
            onLostPointerCapture={stopMobileSprint}
            aria-label="Sprint"
            aria-pressed={mobileSprintHeld}
          >LARI</button>
        </>}
        {gamePhase === "supply" && supplyQuestion && (
          <div className="strike-phase-layer">
            <section className="strike-phase-card" role="dialog" aria-modal="true" aria-labelledby="strike-supply-title">
              <div className="strike-phase-kicker">Wave {wave} selesai · supply drop</div>
              <h2 className="strike-phase-title" id="strike-supply-title">JAWAB UNTUK MEMBUKA SUPLAI</h2>
              <p className="strike-phase-copy">Pilih jawaban yang benar. Hadiah benar berupa amunisi, HP penuh, atau armor.</p>
              <div className="strike-math-question" aria-label={`Soal: ${supplyQuestion.prompt}`}>{supplyQuestion.prompt}</div>
              <div className="strike-answer-grid">
                {supplyQuestion.options.map((option) => (
                  <button
                    key={option}
                    className="strike-answer-button"
                    onClick={() => answerSupplyRef.current?.(option)}
                    disabled={supplyMessage !== null}
                    aria-label={`Jawaban ${option}`}
                  >{option}</button>
                ))}
              </div>
              <div className="strike-supply-result" role="status" aria-live="polite">{supplyMessage}</div>
              {supplyMessage !== null && (
                <button className="strike-phase-button" onClick={() => nextWaveRef.current?.()}>
                  LANJUT KE WAVE {wave + 1}
                </button>
              )}
            </section>
          </div>
        )}
        {gamePhase === "paused" && (
          <div className="strike-phase-layer">
            <section className="strike-phase-card" role="dialog" aria-modal="true" aria-labelledby="strike-pause-title">
              <div className="strike-phase-kicker">Permainan dijeda · wave {wave}</div>
              <h2 className="strike-phase-title" id="strike-pause-title">PAUSE</h2>
              <p className="strike-phase-copy">Skor saat ini: {score}. Lanjutkan permainan atau kembali ke menu.</p>
              <button className="strike-phase-button" onClick={() => resumeGameRef.current?.()}>LANJUT BERMAIN</button>
              <button className="strike-phase-button is-secondary" onClick={() => navigate("/ruang-untuk-guru/numatik-game")}>KEMBALI KE MENU</button>
            </section>
          </div>
        )}
        {gamePhase === "gameover" && (
          <div className="strike-phase-layer">
            <section className="strike-phase-card" role="dialog" aria-modal="true" aria-labelledby="strike-gameover-title">
              <div className="strike-phase-kicker">Operasi selesai · wave {wave}</div>
              <h2 className="strike-phase-title" id="strike-gameover-title">GAME OVER</h2>
              <div className="strike-score-summary">
                <div className="strike-score-cell"><div className="strike-score-label">SKOR</div><div className="strike-score-value">{score}</div></div>
                <div className="strike-score-cell"><div className="strike-score-label">SKOR TERTINGGI</div><div className="strike-score-value">{bestScore}</div></div>
              </div>
              <button className="strike-phase-button" onClick={() => restartGameRef.current?.()}>MAIN LAGI</button>
              <button className="strike-phase-button is-secondary" onClick={() => navigate("/ruang-untuk-guru/numatik-game")}>KEMBALI KE MENU</button>
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default GamePage;
