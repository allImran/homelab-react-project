"use client";

/** Faint guide line for a planet's orbit. */
export function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation-x={-Math.PI / 2}>
      <ringGeometry args={[radius - 0.008, radius + 0.008, 128]} />
      <meshBasicMaterial color="#efe8dc" transparent opacity={0.12} />
    </mesh>
  );
}
