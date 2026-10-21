"use client";

import { Stars } from "@react-three/drei";

/** The star field used by every scene. `speed` > 0 twinkles (needs a running frameloop). */
export function StarLayer({ count = 4000, speed = 0.6 }: { count?: number; speed?: number }) {
  return <Stars radius={90} depth={60} count={count} factor={4} saturation={0} fade speed={speed} />;
}
