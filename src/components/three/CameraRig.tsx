"use client";

import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const target = new Vector3();

/** Eases the camera toward the pointer for a subtle parallax effect. */
export function CameraRig({ strength = 1.2, base = [0, 2.2, 11] as const }) {
  useFrame(({ camera, pointer }, delta) => {
    target.set(base[0] + pointer.x * strength, base[1] + pointer.y * strength * 0.6, base[2]);
    camera.position.lerp(target, 1 - Math.exp(-delta * 2));
    camera.lookAt(0, 0, 0);
  });
  return null;
}
