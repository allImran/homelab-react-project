"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// The library measures the DOM and reads the user agent, so it must render client-side only.
const LiquidGlass = dynamic(() => import("liquid-glass-react"), { ssr: false });

interface LiquidGlassFrameProps {
  children: ReactNode;
  /** Sizes and positions the frame; the glass is centered inside it. */
  className?: string;
  cornerRadius?: number;
  padding?: string;
}

/**
 * liquid-glass-react renders several stacked layers centered with
 * `top/left: 50%` + `translate(-50%)`, so it needs a positioned frame around it.
 */
export function LiquidGlassFrame({ children, className, cornerRadius = 999, padding = "8px 10px" }: LiquidGlassFrameProps) {
  return (
    <div className={cn("relative", className)}>
      <LiquidGlass
        className="pointer-events-auto"
        style={{ position: "absolute", top: "50%", left: "50%" }}
        cornerRadius={cornerRadius}
        padding={padding}
        displacementScale={48}
        blurAmount={0.08}
        saturation={140}
        aberrationIntensity={1.5}
        elasticity={0.18}
      >
        {children}
      </LiquidGlass>
    </div>
  );
}
