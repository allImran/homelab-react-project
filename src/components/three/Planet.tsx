"use client";

import { Html, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils, type Group, type Mesh } from "three";

export interface PlanetSpec {
  id: string;
  label: string;
  color: string;
  orbitRadius: number;
  size: number;
  speed: number;
  phase: number;
}

interface PlanetProps extends PlanetSpec {
  onSelect: (id: string) => void;
}

export function Planet({ id, label, color, orbitRadius, size, speed, phase, onSelect }: PlanetProps) {
  const orbit = useRef<Group>(null);
  const body = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime * speed + phase;
    orbit.current?.position.set(Math.cos(t) * orbitRadius, Math.sin(t * 0.5) * 0.4, Math.sin(t) * orbitRadius);
    if (body.current) {
      body.current.rotation.y += delta * 0.4;
      body.current.scale.setScalar(MathUtils.lerp(body.current.scale.x, hovered ? 1.35 : 1, 0.15));
    }
  });

  return (
    <group ref={orbit}>
      <mesh
        ref={body}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(id);
        }}
      >
        <sphereGeometry args={[size, 48, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.6 : 0.18} roughness={0.55} />
      </mesh>
      {hovered && (
        <Html center distanceFactor={9} position={[0, size + 0.45, 0]} className="pointer-events-none">
          <span className="label-caps glass whitespace-nowrap rounded-full px-3 py-1.5 text-ivory">{label}</span>
        </Html>
      )}
    </group>
  );
}
