import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
  ContactShadows,
  Billboard,
  Edges,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* Render a short tech-node label to a runtime canvas texture so we never
   depend on an external font file or CDN (works fully offline). */
function makeLabelTexture(text: string): { tex: THREE.CanvasTexture; aspect: number } {
  const h = 128;
  const pad = 26;
  const font = "600 64px 'Inter', system-ui, sans-serif";
  const measure = document.createElement("canvas").getContext("2d")!;
  measure.font = font;
  const tw = Math.ceil(measure.measureText(text).width);
  const w = tw + pad * 2;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(150,180,255,0.6)";
  ctx.shadowBlur = 12;
  ctx.fillStyle = "#e6eeff";
  ctx.fillText(text, w / 2, h / 2 + 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return { tex, aspect: w / h };
}

/* Sparse ambient motes drifting in the background — kept very subtle so the
   core remains the focus (no stars / galaxies / explosions). */
function Motes({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null!);
  const COUNT = 16;
  const positions = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 12;
      p[i * 3 + 1] = (Math.random() - 0.5) * 8;
      p[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
    }
    return p;
  }, []);

  useFrame((_, delta) => {
    if (reduced || !ref.current) return;
    const d = Math.min(delta, 0.05);
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += 0.04 * d;
      if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#9fb4ff" transparent opacity={0.3} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* Glowing data particles that travel smoothly along one ring's circular path. */
function RingParticles({
  radius,
  count,
  offset,
  speed,
  reduced,
}: {
  radius: number;
  count: number;
  offset: number;
  speed: number;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Points>(null!);
  const { array, phase } = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const ph: number[] = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + offset;
      ph.push(a);
      arr[i * 3] = Math.cos(a) * radius;
      arr[i * 3 + 1] = Math.sin(a) * radius;
      arr[i * 3 + 2] = 0;
    }
    return { array: arr, phase: ph };
  }, [count, offset, radius]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = reduced ? 0 : state.clock.elapsedTime;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const a = phase[i] + t * speed;
      arr[i * 3] = Math.cos(a) * radius;
      arr[i * 3 + 1] = Math.sin(a) * radius;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={array} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#cdddff"
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

type RingDef = {
  radius: number;
  tube: number;
  arc: number;
  euler: [number, number, number];
  spin: number;
  particles: number;
  pSpeed: number;
  pOffset: number;
};

const RINGS: RingDef[] = [
  { radius: 1.2, tube: 0.013, arc: Math.PI * 2, euler: [1.4, 0.2, 0.8], spin: 0.07, particles: 4, pSpeed: 0.32, pOffset: 1.5 },
  { radius: 1.45, tube: 0.012, arc: Math.PI * 2, euler: [0.4, 0.2, 0], spin: 0.06, particles: 5, pSpeed: 0.26, pOffset: 0 },
  { radius: 1.75, tube: 0.015, arc: Math.PI * 1.45, euler: [-0.6, 0.5, 0.3], spin: -0.05, particles: 6, pSpeed: -0.22, pOffset: 1 },
  { radius: 2.05, tube: 0.012, arc: Math.PI * 2, euler: [1.1, -0.3, 0.2], spin: 0.045, particles: 7, pSpeed: 0.2, pOffset: 2 },
  { radius: 2.35, tube: 0.016, arc: Math.PI * 1.2, euler: [0.2, 0.9, -0.4], spin: -0.035, particles: 6, pSpeed: -0.18, pOffset: 0.5 },
];

function GlassRing({ def, reduced }: { def: RingDef; reduced: boolean }) {
  const spinner = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (reduced || !spinner.current) return;
    spinner.current.rotation.z += Math.min(delta, 0.05) * def.spin;
  });
  return (
    <group rotation={def.euler}>
      <group ref={spinner}>
        <mesh>
          <torusGeometry args={[def.radius, def.tube, 16, 140, def.arc]} />
          <meshPhysicalMaterial
            transmission={0.9}
            thickness={0.35}
            roughness={0.06}
            ior={1.5}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.92}
            color="#d2deff"
            attenuationColor="#9fb4ff"
            attenuationDistance={2}
          />
        </mesh>
      </group>
      <RingParticles radius={def.radius} count={def.particles} offset={def.pOffset} speed={def.pSpeed} reduced={reduced} />
    </group>
  );
}

const NODES = ["AI", "CRM", "ERP", "WEB", "Mobile", "Automation"];
const NODE_POS: [number, number, number][] = [
  [2.35, 0.95, -0.5],
  [-2.4, 0.2, 0.7],
  [1.9, -1.15, 0.8],
  [-1.95, -0.95, -0.8],
  [0.5, 1.55, 1.0],
  [-0.45, -1.55, -1.1],
];

/* Tiny semi-transparent satellites — a glowing node plus its label. They orbit
   slowly as a group and never compete with the core. */
function Satellites({ reduced }: { reduced: boolean }) {
  const grp = useRef<THREE.Group>(null!);
  const items = useMemo(
    () => NODES.map((label, i) => ({ ...makeLabelTexture(label), pos: NODE_POS[i] })),
    [],
  );
  useEffect(() => () => items.forEach((it) => it.tex.dispose()), [items]);

  useFrame((_, delta) => {
    if (reduced || !grp.current) return;
    grp.current.rotation.y += Math.min(delta, 0.05) * 0.05;
  });

  return (
    <group ref={grp}>
      {items.map((it, i) => (
        <group key={i} position={it.pos}>
          <mesh>
            <sphereGeometry args={[0.028, 16, 16]} />
            <meshBasicMaterial color="#cfe0ff" toneMapped={false} />
          </mesh>
          <Billboard position={[0, 0.14, 0]}>
            <mesh>
              <planeGeometry args={[0.16 * it.aspect, 0.16]} />
              <meshBasicMaterial map={it.tex} transparent opacity={0.5} depthWrite={false} toneMapped={false} />
            </mesh>
          </Billboard>
        </group>
      ))}
    </group>
  );
}

function CoreScene({ reduced, active }: { reduced: boolean; active: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const crystal = useRef<THREE.Mesh>(null!);
  const glow = useRef<THREE.Mesh>(null!);
  const { gl } = useThree();

  // Interaction state kept in refs (never trigger React re-renders per frame).
  const spin = useRef({ x: 0.22, y: 0.5 });
  const vel = useRef({ x: 0, y: 0 });
  const tilt = useRef({ x: 0, y: 0 });
  const tiltTarget = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dom = gl.domElement;

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
      vel.current = { x: 0, y: 0 };
      try {
        dom.setPointerCapture?.(e.pointerId);
      } catch {
        /* ignore */
      }
    };
    const onMove = (e: PointerEvent) => {
      const rect = dom.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      tiltTarget.current = { x: ny * 0.14, y: nx * 0.2 };
      if (dragging.current) {
        const dx = e.clientX - last.current.x;
        const dy = e.clientY - last.current.y;
        last.current = { x: e.clientX, y: e.clientY };
        const fy = dx * 0.006;
        const fx = dy * 0.006;
        spin.current.y += fy;
        spin.current.x += fx;
        vel.current = { x: fx, y: fy };
      }
    };
    const onUp = (e: PointerEvent) => {
      dragging.current = false;
      try {
        dom.releasePointerCapture?.(e.pointerId);
      } catch {
        /* ignore */
      }
    };
    const onCancel = () => {
      dragging.current = false;
    };

    dom.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
    window.addEventListener("lostpointercapture", onCancel);
    window.addEventListener("blur", onCancel);
    return () => {
      dom.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("lostpointercapture", onCancel);
      window.removeEventListener("blur", onCancel);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.05);

    if (!dragging.current) {
      spin.current.x += vel.current.x;
      spin.current.y += vel.current.y;
      vel.current.x *= 0.94;
      vel.current.y *= 0.94;
      if (!reduced) spin.current.y += d * 0.08; // extremely slow auto-rotation
    }
    spin.current.x = Math.max(-0.55, Math.min(0.55, spin.current.x));

    tilt.current.x += (tiltTarget.current.x - tilt.current.x) * 0.06;
    tilt.current.y += (tiltTarget.current.y - tilt.current.y) * 0.06;

    g.rotation.x = spin.current.x + tilt.current.x;
    g.rotation.y = spin.current.y + tilt.current.y;

    const t = state.clock.elapsedTime;
    if (glow.current) {
      const mat = glow.current.material as THREE.MeshStandardMaterial;
      if (mat) mat.emissiveIntensity = reduced ? 0.95 : 0.9 + Math.sin(t * 1.2) * 0.18;
      const s = reduced ? 1 : 1 + Math.sin(t * 1.2) * 0.04;
      glow.current.scale.setScalar(s);
    }
    if (crystal.current && !reduced) {
      crystal.current.rotation.y = t * 0.05;
      crystal.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#070d22", 7, 18]} />
      <ambientLight intensity={0.4} color="#b9c6ff" />
      {/* blue key light */}
      <directionalLight position={[4, 5, 4]} intensity={1.7} color="#6f9bff" />
      {/* purple secondary */}
      <pointLight position={[-4, -1, 2]} intensity={9} color="#9a6cff" />
      {/* soft rim light from behind */}
      <directionalLight position={[-2, 3, -5]} intensity={1.1} color="#cdd9ff" />

      <Environment resolution={256}>
        <Lightformer intensity={1.8} position={[0, 3, 4]} scale={[7, 7, 1]} color="#cdd9ff" />
        <Lightformer intensity={1.2} position={[-4, 1, 2]} scale={[3, 7, 1]} color="#6f8cff" />
        <Lightformer intensity={1.0} position={[4, -1, 2]} scale={[3, 7, 1]} color="#a98cff" />
        <Lightformer intensity={0.7} position={[0, -3, 1]} scale={[6, 3, 1]} color="#141d3c" />
      </Environment>

      <group ref={group}>
        {/* crystal core — multi-layer faceted heart */}
        <mesh ref={crystal}>
          <octahedronGeometry args={[0.95, 0]} />
          <MeshTransmissionMaterial
            transmission={1}
            thickness={1.1}
            roughness={0.03}
            ior={1.75}
            chromaticAberration={0.06}
            anisotropicBlur={0.1}
            distortion={0.08}
            distortionScale={0.2}
            temporalDistortion={0.05}
            clearcoat={1}
            clearcoatRoughness={0.08}
            attenuationDistance={2.4}
            attenuationColor="#b9c6ff"
            color="#eaf0ff"
            samples={6}
            resolution={256}
          />
          <Edges threshold={15}>
            <lineBasicMaterial color="#a8c4ff" transparent opacity={0.35} toneMapped={false} />
          </Edges>
        </mesh>

        {/* faint mid facet for internal scattering */}
        <mesh rotation={[0.6, 0.4, 0]}>
          <octahedronGeometry args={[0.68, 0]} />
          <meshBasicMaterial
            color="#9a8cff"
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* inner energy glow */}
        <mesh ref={glow}>
          <octahedronGeometry args={[0.46, 0]} />
          <meshStandardMaterial
            color="#7c93ff"
            emissive="#5b6cff"
            emissiveIntensity={0.95}
            roughness={0.25}
            metalness={0}
            toneMapped={false}
          />
        </mesh>

        {RINGS.map((def, i) => (
          <GlassRing key={i} def={def} reduced={reduced} />
        ))}

        <Satellites reduced={reduced} />
      </group>

      {/* near-invisible premium glass platform */}
      <group position={[0, -1.55, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.7, 72]} />
          <meshStandardMaterial color="#0c1733" metalness={0.7} roughness={0.35} transparent opacity={0.32} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.7, 0.01, 12, 100]} />
          <meshBasicMaterial color="#6f8cff" transparent opacity={0.25} toneMapped={false} />
        </mesh>
      </group>

      <ContactShadows
        position={[0, -1.54, 0]}
        opacity={0.4}
        scale={10}
        blur={2.8}
        far={4.5}
        color="#01040f"
        frames={active ? Infinity : 1}
      />

      <Motes reduced={reduced} />

      <EffectComposer enableNormalPass={false}>
        <Bloom mipmapBlur luminanceThreshold={0.9} luminanceSmoothing={0.3} intensity={0.3} radius={0.45} />
      </EffectComposer>
    </>
  );
}

export default function HeroCube({
  reduced,
  active,
}: {
  reduced: boolean;
  active: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      frameloop={active ? "always" : "never"}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.45, 7.4], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <CoreScene reduced={reduced} active={active} />
      </Suspense>
    </Canvas>
  );
}
