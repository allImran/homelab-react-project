"use client";

import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

interface SpaceCanvasProps {
  children?: ReactNode;
  className?: string;
  starCount?: number;
}

/** Base R3F canvas: deep-space background shared by every 3D scene. */
export default function SpaceCanvas({ children, className, starCount = 4000 }: SpaceCanvasProps) {
  return (
    <Canvas className={className} dpr={[1, 1.75]} camera={{ position: [0, 2.2, 11], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <Stars radius={90} depth={60} count={starCount} factor={4} saturation={0} fade speed={0.6} />
      {children}
    </Canvas>
  );
}
