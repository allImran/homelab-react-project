"use client";

import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LENIS_OPTIONS = { lerp: 0.085, smoothWheel: true, anchors: true } as const;

/** Lenis keeps its own target position, so it must be reset when the route changes. */
function ResetOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);
  return null;
}

/**
 * Inertia scrolling (the engine behind Locomotive Scroll v5).
 * Disabled for users who prefer reduced motion, which falls back to native scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return children;

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <ResetOnNavigate />
      {children}
    </ReactLenis>
  );
}
