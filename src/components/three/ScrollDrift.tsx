"use client";

import { useThree } from "@react-three/fiber";
import { useLenis } from "lenis/react";
import { useRef, type ReactNode } from "react";
import type { Group } from "three";

/** Rotates its children with scroll progress and redraws only then (pairs with frameloop="demand"). */
export function ScrollDrift({ children, strength = 0.6 }: { children: ReactNode; strength?: number }) {
  const group = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  useLenis(
    ({ scroll }) => {
      if (!group.current) return;
      group.current.rotation.x = (scroll / window.innerHeight) * strength * 0.25;
      group.current.rotation.y = (scroll / window.innerHeight) * strength * 0.1;
      invalidate();
    },
    [invalidate, strength],
  );

  return <group ref={group}>{children}</group>;
}
