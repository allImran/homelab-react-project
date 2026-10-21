"use client";

import { CameraRig } from "./CameraRig";
import { OrbitRing } from "./OrbitRing";
import { Planet, type PlanetSpec } from "./Planet";
import SpaceCanvas from "./SpaceCanvas";

const SYSTEM_OFFSET_Y = -3.4;

interface OrbitSceneProps {
  planets: PlanetSpec[];
  onSelect: (id: string) => void;
  className?: string;
}

/** Interactive solar system: each planet is a news source. */
export default function OrbitScene({ planets, onSelect, className }: OrbitSceneProps) {
  return (
    <SpaceCanvas className={className}>
      <ambientLight intensity={0.25} />
      {/* Sits below the hero copy so the title stays readable */}
      <group position={[0, SYSTEM_OFFSET_Y, 0]}>
        <pointLight intensity={60} color="#e8a25c" />
        <mesh>
          <sphereGeometry args={[0.7, 64, 64]} />
          <meshBasicMaterial color="#f3c48a" />
        </mesh>
        {planets.map((planet) => (
          <group key={planet.id}>
            <OrbitRing radius={planet.orbitRadius} />
            <Planet {...planet} onSelect={onSelect} />
          </group>
        ))}
      </group>
      <CameraRig />
    </SpaceCanvas>
  );
}
