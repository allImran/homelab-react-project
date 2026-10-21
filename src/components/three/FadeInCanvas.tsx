"use client";

import { Canvas } from "@react-three/fiber";
import { useState, type ComponentProps } from "react";
import { cn } from "@/lib/cn";

type FadeInCanvasProps = ComponentProps<typeof Canvas>;

/** R3F canvas with shared defaults that fades in once the GPU context is ready, instead of popping in. */
export function FadeInCanvas({ className, onCreated, ...props }: FadeInCanvasProps) {
  const [ready, setReady] = useState(false);
  return (
    <Canvas
      className={cn("transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0", className)}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={(state) => {
        setReady(true);
        onCreated?.(state);
      }}
      {...props}
    />
  );
}
