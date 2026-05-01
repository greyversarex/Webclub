import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

export function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setSupported(false);
      return;
    }
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      setSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
    camera.position.z = 700;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const PARTICLE_COUNT = 90;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 1200;
      const y = (Math.random() - 0.5) * 700;
      const z = (Math.random() - 0.5) * 400;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
      velocities[i * 3] = (Math.random() - 0.5) * 0.3;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 4,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const lineGeometry = new THREE.BufferGeometry();
    const maxLines = PARTICLE_COUNT * PARTICLE_COUNT;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const mouse = { x: 0, y: 0, active: false };
    const targetMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    let animationId = 0;
    const CONNECT_DIST = 160;
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
    const MOUSE_INFLUENCE = 250;
    const MOUSE_INFLUENCE_SQ = MOUSE_INFLUENCE * MOUSE_INFLUENCE;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      mouse.x += (targetMouse.x - mouse.x) * 0.06;
      mouse.y += (targetMouse.y - mouse.y) * 0.06;

      const mouseWorldX = mouse.x * 600;
      const mouseWorldY = mouse.y * 350;

      const positionsAttr = particleGeometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        positions[idx] += velocities[idx];
        positions[idx + 1] += velocities[idx + 1];
        positions[idx + 2] += velocities[idx + 2];

        const dx = positions[idx] - basePositions[idx];
        const dy = positions[idx + 1] - basePositions[idx + 1];
        const dz = positions[idx + 2] - basePositions[idx + 2];
        velocities[idx] -= dx * 0.0008;
        velocities[idx + 1] -= dy * 0.0008;
        velocities[idx + 2] -= dz * 0.0008;
        velocities[idx] *= 0.99;
        velocities[idx + 1] *= 0.99;
        velocities[idx + 2] *= 0.99;

        if (mouse.active) {
          const mdx = positions[idx] - mouseWorldX;
          const mdy = positions[idx + 1] - mouseWorldY;
          const distSq = mdx * mdx + mdy * mdy;
          if (distSq < MOUSE_INFLUENCE_SQ && distSq > 1) {
            const force = (1 - distSq / MOUSE_INFLUENCE_SQ) * 0.6;
            const dist = Math.sqrt(distSq);
            velocities[idx] += (mdx / dist) * force;
            velocities[idx + 1] += (mdy / dist) * force;
          }
        }
      }

      positionsAttr.needsUpdate = true;

      let lineIdx = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = positions[i * 3];
        const iy = positions[i * 3 + 1];
        const iz = positions[i * 3 + 2];

        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = ix - positions[j * 3];
          const dy = iy - positions[j * 3 + 1];
          const dz = iz - positions[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < CONNECT_DIST_SQ) {
            const alpha = 1 - distSq / CONNECT_DIST_SQ;
            linePositions[lineIdx * 6] = ix;
            linePositions[lineIdx * 6 + 1] = iy;
            linePositions[lineIdx * 6 + 2] = iz;
            linePositions[lineIdx * 6 + 3] = positions[j * 3];
            linePositions[lineIdx * 6 + 4] = positions[j * 3 + 1];
            linePositions[lineIdx * 6 + 5] = positions[j * 3 + 2];

            const r = 0.545 * alpha;
            const g = 0.361 * alpha;
            const b = 0.965 * alpha;
            lineColors[lineIdx * 6] = r;
            lineColors[lineIdx * 6 + 1] = g;
            lineColors[lineIdx * 6 + 2] = b;
            lineColors[lineIdx * 6 + 3] = r;
            lineColors[lineIdx * 6 + 4] = g;
            lineColors[lineIdx * 6 + 5] = b;
            lineIdx++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIdx * 2);
      (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lineGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      particles.rotation.y += 0.0006;
      lines.rotation.y += 0.0006;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!supported) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ zIndex: 0 }}
      data-testid="interactive-background"
    />
  );
}
