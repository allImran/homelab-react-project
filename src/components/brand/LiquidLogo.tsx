"use client";

import dynamic from "next/dynamic";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

const LiquidMetalMark = dynamic(() => import("./LiquidMetalMark"), { ssr: false });

interface LiquidLogoProps {
  className?: string;
  speed?: number;
}

/**
 * The brand mark through Paper's liquid-metal shader.
 * The shader loads the first time the logo nears the viewport and pauses while it is off-screen.
 */
export function LiquidLogo({ className, speed = 0.6 }: LiquidLogoProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "200px" });
  const [mountRef, hasEnteredView] = useInView<HTMLDivElement>({ rootMargin: "200px", once: true });

  return (
    <div ref={mountRef} role="img" aria-label="Orbit logo" className={cn("aspect-square", className)}>
      <div ref={ref} className="size-full">
        {hasEnteredView && <LiquidMetalMark speed={inView ? speed : 0} />}
      </div>
    </div>
  );
}
