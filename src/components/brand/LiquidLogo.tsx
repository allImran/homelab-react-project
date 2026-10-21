"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";

const LiquidMetal = dynamic(() => import("@paper-design/shaders-react").then((m) => m.LiquidMetal), { ssr: false });

interface LiquidLogoProps {
  className?: string;
  speed?: number;
}

/** The brand mark rendered through Paper's liquid-metal shader. */
export function LiquidLogo({ className, speed = 0.6 }: LiquidLogoProps) {
  return (
    <div role="img" aria-label="Orbit logo" className={cn("aspect-square", className)}>
      <LiquidMetal
        image="/logo.svg"
        className="size-full"
        colorBack="#00000000"
        colorTint="#efe8dc"
        shape="none"
        repetition={2}
        softness={0.15}
        shiftRed={0.3}
        shiftBlue={0.3}
        distortion={0.08}
        contour={0.4}
        angle={70}
        speed={speed}
        fit="contain"
      />
    </div>
  );
}
