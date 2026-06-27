import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
  ContactShadows,
  Billboard,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* Build the "WEBCOREX" wordmark as a runtime canvas texture so we never
   depend on an external font file or CDN (works fully offline). */
function makeLogoTexture(text: string): THREE.CanvasTexture {
  const w = 1024;
  const h = 256;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#eaf2ff";
  ctx.font = "700 120px 'Inter', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(150,180,255,0.9)";
  ctx.shadowBlur = 24;
  ctx.fillText(text, w / 2, h / 2 + 4);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function Particles({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null!);
  const COUNT = 55;
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 13;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1.5;
      speeds[i] = 0.05 + Math.random() * 0.09;
    }
    return { positions, speeds };
  }, []);

  useFrame((_, delta) => {
    if (reduced || !ref.current) return;
    const d = Math.min(delta, 0.05);
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * d;
      if (arr[i * 3 + 1] > 4.5) arr[i * 3 + 1] = -4.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#9fb4ff"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CubeScene({ reduced, active }: { reduced: boolean; active: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Mesh>(null!);
  const { gl } = useThree();

  const logoTex = useMemo(() => makeLogoTexture("WEBCOREX"), []);
  useEffect(() => () => logoTex.dispose(), [logoTex]);

  // Interaction state kept in refs (never trigger React re-renders per frame).
  const spin = useRef({ x: 0.34, y: 0.6 });
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
      tiltTarget.current = { x: ny * 0.16, y: nx * 0.22 };
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
      // inertia after release
      spin.current.x += vel.current.x;
      spin.current.y += vel.current.y;
      vel.current.x *= 0.94;
      vel.current.y *= 0.94;
      // slow ambient auto-rotation
      if (!reduced) spin.current.y += d * 0.18;
    }
    // keep vertical tumbling gentle
    spin.current.x = Math.max(-0.6, Math.min(0.6, spin.current.x));

    // ease the cursor tilt toward its target
    tilt.current.x += (tiltTarget.current.x - tilt.current.x) * 0.06;
    tilt.current.y += (tiltTarget.current.y - tilt.current.y) * 0.06;

    g.rotation.x = spin.current.x + tilt.current.x;
    g.rotation.y = spin.current.y + tilt.current.y;

    if (core.current) {
      const t = state.clock.elapsedTime;
      const s = reduced ? 1 : 1 + Math.sin(t * 1.4) * 0.06;
      core.current.scale.setScalar(s);
      const mat = core.current.material as THREE.MeshStandardMaterial;
      if (mat) mat.emissiveIntensity = reduced ? 1.15 : 1.1 + Math.sin(t * 1.4) * 0.28;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#0a1430", 6.5, 17]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} color="#dce6ff" />
      <pointLight position={[-5, -2, -3]} intensity={18} color="#3b6cff" />

      <Environment resolution={256}>
        <Lightformer intensity={2.2} position={[0, 3, 4]} scale={[7, 7, 1]} color="#dce6ff" />
        <Lightformer intensity={1.3} position={[-4, 1, 2]} scale={[3, 7, 1]} color="#6f8cff" />
        <Lightformer intensity={1.1} position={[4, -1, 2]} scale={[3, 7, 1]} color="#aab8ff" />
        <Lightformer intensity={0.8} position={[0, -3, 1]} scale={[6, 3, 1]} color="#1b2550" />
      </Environment>

      <group ref={group}>
        <RoundedBox args={[2.45, 2.45, 2.45]} radius={0.16} smoothness={6}>
          <MeshTransmissionMaterial
            transmission={1}
            thickness={1.4}
            roughness={0.08}
            ior={1.35}
            chromaticAberration={0.05}
            anisotropicBlur={0.2}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.08}
            clearcoat={1}
            clearcoatRoughness={0.1}
            attenuationDistance={3}
            attenuationColor="#bcd0ff"
            color="#eef3ff"
          />
        </RoundedBox>

        {/* glowing energy core */}
        <mesh ref={core}>
          <icosahedronGeometry args={[0.42, 4]} />
          <meshStandardMaterial
            color="#5b86ff"
            emissive="#4f7cff"
            emissiveIntensity={1.15}
            roughness={0.3}
            metalness={0}
            toneMapped={false}
          />
        </mesh>
        {/* soft additive halo around the core */}
        <mesh scale={1.3}>
          <icosahedronGeometry args={[0.42, 2]} />
          <meshBasicMaterial
            color="#6f8cff"
            transparent
            opacity={0.07}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Webcorex wordmark, always facing the camera, floating inside the glass */}
        <Billboard>
          <mesh position={[0, 0, 0.92]}>
            <planeGeometry args={[1.85, 0.46]} />
            <meshBasicMaterial map={logoTex} transparent depthWrite={false} toneMapped={false} />
          </mesh>
        </Billboard>
      </group>

      <ContactShadows
        position={[0, -1.75, 0]}
        opacity={0.45}
        scale={11}
        blur={2.8}
        far={4.5}
        color="#020616"
        frames={active ? Infinity : 1}
      />

      <Particles reduced={reduced} />

      <EffectComposer enableNormalPass={false}>
        <Bloom mipmapBlur luminanceThreshold={0.85} luminanceSmoothing={0.3} intensity={0.42} radius={0.5} />
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
      camera={{ position: [0, 0, 6], fov: 38 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <CubeScene reduced={reduced} active={active} />
      </Suspense>
    </Canvas>
  );
}
