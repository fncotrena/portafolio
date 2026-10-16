"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function WireShape({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.16;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={ref} scale={1.45}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

const ORBS: [number, number, number][] = [
  [2.7, 1, -1],
  [3.3, -0.7, -0.6],
  [2.1, -1.9, 0.4],
  [3.9, 1.7, -2.2],
  [-2.4, 2, -1.8],
];

function Orbs({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={group}>
      {ORBS.map((position, i) => (
        <Float
          key={i}
          speed={1 + i * 0.2}
          floatIntensity={1.6}
          rotationIntensity={0.4}
        >
          <mesh position={position}>
            <icosahedronGeometry args={[0.22 + (i % 3) * 0.07, 0]} />
            <meshStandardMaterial
              color={color}
              roughness={0.25}
              metalness={0.15}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const { x, y } = state.pointer;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      x * 0.35,
      0.06
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -y * 0.22,
      0.06
    );
  });

  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";
  const foreground = dark ? "#f5f2ec" : "#16150f";

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 6]} intensity={1.6} />
        <pointLight position={[-5, -3, -4]} intensity={12} color={foreground} />

        <Suspense fallback={null}>
          <ParallaxRig>
            <WireShape color={foreground} />
            <Orbs color={foreground} />
          </ParallaxRig>
        </Suspense>
      </Canvas>
    </div>
  );
}
