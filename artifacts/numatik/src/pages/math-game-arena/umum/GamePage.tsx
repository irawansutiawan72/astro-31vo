import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

type MoveInput = { x: number; y: number };

const GamePage = () => {
  const navigate = useNavigate();
  const mountRef = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [joystick, setJoystick] = useState<MoveInput>({ x: 0, y: 0 });
  const keys = useRef<Record<string, boolean>>({});
  const jumpRequested = useRef(false);
  const moveInput = useRef<MoveInput>({ x: 0, y: 0 });
  const lookDelta = useRef<MoveInput>({ x: 0, y: 0 });
  const lookPointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const joystickPointer = useRef<number | null>(null);

  useEffect(() => {
    const updateMobile = () => setMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 760);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch {
      host.innerHTML = '<div class="strike-render-error">Perangkat ini belum mendukung arena 3D.</div>';
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.domElement.className = "strike-canvas";
    renderer.domElement.setAttribute("aria-label", "Arena Numatik Strike");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#07101d");
    scene.fog = new THREE.Fog("#07101d", 22, 58);
    const camera = new THREE.PerspectiveCamera(74, host.clientWidth / host.clientHeight, 0.1, 90);
    const player = new THREE.Group();
    player.position.set(0, 1.65, 12);
    scene.add(player);
    player.add(camera);

    scene.add(new THREE.HemisphereLight(0xb8eaff, 0x182033, 1.5));
    const keyLight = new THREE.DirectionalLight(0xc7ecff, 1.25);
    keyLight.position.set(-8, 14, 5);
    scene.add(keyLight);
    const cyanLight = new THREE.PointLight(0x16d9e8, 12, 27, 2);
    cyanLight.position.set(-13, 4, -3);
    scene.add(cyanLight);
    const amberLight = new THREE.PointLight(0xff9d4d, 10, 25, 2);
    amberLight.position.set(13, 4, 1);
    scene.add(amberLight);

    const materials: THREE.MeshStandardMaterial[] = [];
    const material = (color: string, roughness = 0.72, metalness = 0.15) => {
      const mat = new THREE.MeshStandardMaterial({ color, roughness, metalness, flatShading: true });
      materials.push(mat);
      return mat;
    };
    const floorMat = material("#182335");
    const wallMat = material("#263549");
    const darkMat = material("#101b2a");
    const trimMat = material("#3c586d", 0.55, 0.42);
    const cyanMat = new THREE.MeshStandardMaterial({ color: "#35d7e7", emissive: "#087d91", emissiveIntensity: 1.2, roughness: 0.45 });
    const goldMat = new THREE.MeshStandardMaterial({ color: "#f6b45e", emissive: "#985216", emissiveIntensity: 0.85, roughness: 0.48 });
    materials.push(cyanMat, goldMat);

    const addBox = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      return mesh;
    };

    // A compact, enclosed octagonal combat-training hall built from simple geometry.
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.08;
    scene.add(floor);
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), darkMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 9.2;
    scene.add(ceiling);
    const wallHeight = 9.2;
    const wallRadius = 20;
    for (let i = 0; i < 8; i += 1) {
      const angle = (i * Math.PI) / 4;
      const wall = new THREE.Mesh(new THREE.BoxGeometry(15.4, wallHeight, 1.2), wallMat);
      wall.position.set(Math.sin(angle) * wallRadius, wallHeight / 2, Math.cos(angle) * wallRadius);
      wall.rotation.y = angle;
      scene.add(wall);
      const band = new THREE.Mesh(new THREE.BoxGeometry(13.4, 0.16, 1.28), i % 2 ? goldMat : cyanMat);
      band.position.set(Math.sin(angle) * (wallRadius - 0.22), 6.2, Math.cos(angle) * (wallRadius - 0.22));
      band.rotation.y = angle;
      scene.add(band);
      addBox(1.2, 2.4, 1.2, trimMat, Math.sin(angle) * 18.9, 1.2, Math.cos(angle) * 18.9);
    }

    // Floor markings and a handful of chunky cover forms keep the scale legible.
    for (let i = -3; i <= 3; i += 1) {
      addBox(0.06, 0.018, 35, i === 0 ? cyanMat : trimMat, i * 4, 0.015, 0);
      addBox(35, 0.018, 0.06, trimMat, 0, 0.016, i * 4);
    }
    const cover = [
      [-7, 1.1, -3, 3.8, 2.2, 2.2], [7, 1.1, -5, 3.8, 2.2, 2.2],
      [-5.8, 0.8, 6, 2.4, 1.6, 2.4], [5.7, 0.8, 7, 2.4, 1.6, 2.4],
      [0, 0.65, -9, 4.5, 1.3, 1.8],
    ];
    cover.forEach(([x, y, z, w, h, d], i) => {
      addBox(w, h, d, i % 2 ? darkMat : trimMat, x, y, z);
      addBox(w * 0.72, 0.09, d + 0.03, i % 2 ? goldMat : cyanMat, x, y + h / 2 + 0.05, z);
    });
    for (let i = 0; i < 4; i += 1) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 1.05, 5.5, 5), darkMat);
      const a = Math.PI / 4 + i * Math.PI / 2;
      pillar.position.set(Math.cos(a) * 13.3, 2.75, Math.sin(a) * 13.3);
      scene.add(pillar);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.2, 5), i % 2 ? goldMat : cyanMat);
      cap.position.set(pillar.position.x, 5.5, pillar.position.z);
      scene.add(cap);
    }

    let yaw = 0;
    let pitch = 0;
    let verticalVelocity = 0;
    let frame = 0;
    let lastRenderAt = 0;
    let previousTime = performance.now();
    const bounds = 17.2;
    const onResize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };
    const onKeyDown = (event: KeyboardEvent) => {
      keys.current[event.code] = true;
      if (event.code === "Space") {
        event.preventDefault();
        jumpRequested.current = true;
      }
    };
    const onKeyUp = (event: KeyboardEvent) => { keys.current[event.code] = false; };
    const onLockChange = () => setLocked(document.pointerLockElement === renderer.domElement);
    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== renderer.domElement) return;
      yaw -= event.movementX * 0.0022;
      pitch = THREE.MathUtils.clamp(pitch - event.movementY * 0.0022, -1.25, 1.25);
    };
    const onCanvasClick = () => {
      if (!mobile && renderer.domElement.requestPointerLock) renderer.domElement.requestPointerLock();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    document.addEventListener("pointerlockchange", onLockChange);
    document.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("click", onCanvasClick);

    const animate = (now: number) => {
      frame = window.requestAnimationFrame(animate);
      if (lastRenderAt && now - lastRenderAt < 1000 / 60) return;
      const dt = Math.min((now - previousTime) / 1000, 0.05);
      previousTime = now;
      lastRenderAt = now;
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
        const collidesWithCover = (x: number, z: number) => cover.some(([cx, , cz, width, , depth]) => (
          Math.abs(x - cx) < width / 2 + 0.45 && Math.abs(z - cz) < depth / 2 + 0.45
        ));
        let nextX = player.position.x + dx;
        let nextZ = player.position.z + dz;
        const distanceFromCenter = Math.hypot(nextX, nextZ);
        if (distanceFromCenter > bounds) {
          nextX = (nextX / distanceFromCenter) * bounds;
          nextZ = (nextZ / distanceFromCenter) * bounds;
        }
        if (!collidesWithCover(nextX, player.position.z)) player.position.x = nextX;
        if (!collidesWithCover(player.position.x, nextZ)) player.position.z = nextZ;
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

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("pointerlockchange", onLockChange);
      document.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("click", onCanvasClick);
      if (document.pointerLockElement === renderer.domElement) document.exitPointerLock?.();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
      });
      materials.forEach((mat) => mat.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [mobile]);

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
        .strike-render-error{height:100%;display:grid;place-items:center;padding:2rem;color:#b7d8e5;text-align:center}
        .strike-hud{position:absolute;z-index:2;inset:0;pointer-events:none}
        .strike-top{position:absolute;left:clamp(16px,4vw,48px);right:clamp(16px,4vw,48px);top:clamp(16px,3vh,30px);display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
        .strike-brand{display:flex;align-items:center;gap:12px}
        .strike-mark{width:34px;height:34px;display:grid;place-items:center;border:1px solid rgba(69,224,237,.55);transform:rotate(45deg);background:rgba(14,41,57,.72);box-shadow:inset 0 0 18px rgba(53,215,231,.1)}
        .strike-mark:after{content:"";width:10px;height:10px;background:#43dce8;box-shadow:0 0 12px #43dce8}
        .strike-title{font:700 13px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.16em;color:#e9fbff}
        .strike-subtitle{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#76a1b2;margin-top:4px}
        .strike-status{font:500 10px var(--font-display,'Orbitron'),sans-serif;letter-spacing:.12em;color:#8ab6c3;border:1px solid rgba(144,203,218,.2);background:rgba(5,16,28,.55);padding:9px 12px}
        .strike-status i{display:inline-block;width:6px;height:6px;border-radius:50%;background:#45dfb1;margin-right:8px;box-shadow:0 0 8px #45dfb1}
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
         @media(max-width:600px){.strike-status{font-size:8px;padding:8px}.strike-bottom{bottom:16px}.strike-hint{max-width:48%;font-size:9px}.strike-stick{left:18px;bottom:24px;width:108px;height:108px}.strike-look{top:28%;bottom:112px}.strike-jump{right:22px;bottom:24px}}
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
            <div><div className="strike-title">NUMATIK STRIKE</div><div className="strike-subtitle">Arena latihan · tahap 01</div></div>
          </div>
          <div className="strike-status"><i />ARENA SIAP</div>
        </header>
        <div className="strike-reticle" aria-hidden="true" />
        {!mobile && <footer className="strike-bottom">
          <div className="strike-hint"><b>W A S D</b> bergerak &nbsp; <b>MOUSE</b> melihat &nbsp; <b>SPACE</b> lompat</div>
          <button className="strike-lock" onClick={() => {
            const canvas = mountRef.current?.querySelector("canvas");
            canvas?.requestPointerLock?.();
          }}>{locked ? "MOUSE TERKUNCI · ESC UNTUK LEPAS" : "KLIK UNTUK MULAI MELIHAT"}</button>
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
          <div className="strike-bottom"><div className="strike-hint"><b>GESER KANAN</b><br />untuk melihat</div></div>
        </>}
      </div>
    </main>
  );
};

export default GamePage;
