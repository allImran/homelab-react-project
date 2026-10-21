"use client";

import { CameraRig } from "./CameraRig";
import { FadeInCanvas } from "./FadeInCanvas";
import { OrbitRing } from "./OrbitRing";
import { Planet, type PlanetSpec } from "./Planet";
import { StarLayer } from "./StarLayer";

const SYSTEM_OFFSET_Y = -3.4;

interface OrbitSceneProps {
  planets: PlanetSpec[];
  onSelect: (id: string) => void;
  /** Pauses rendering entirely (e.g. when scrolled out of view). */
  paused?: boolean;
  className?: string;
}

/** Interactive solar system: each planet is a news source. */
export default function OrbitScene({ planets, onSelect, paused = false, className }: OrbitSceneProps) {
  return (
    <FadeInCanvas
      className={className}
      frameloop={paused ? "never" : "always"}
      camera={{ position: [0, 2.2, 11], fov: 45 }}
    >
      <StarLayer />
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
    </FadeInCanvas>
  );
}
