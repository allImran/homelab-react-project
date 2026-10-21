"use client";

import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Like Locomotive's `data-scroll-speed`: positive moves faster than the page, negative lags behind. */
  speed?: number;
  className?: string;
}

/**
 * Offsets its content relative to how far it is from the viewport center.
 * The outer element is measured and the inner one moved, so the transform never feeds back into the measurement.
 * Writes straight to the DOM on each Lenis frame; no React re-renders.
 */
export function Parallax({ children, speed = 0.2, className }: ParallaxProps) {
  const frame = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    if (!frame.current || !layer.current) return;
    const rect = frame.current.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
    layer.current.style.transform = `translate3d(0, ${(distanceFromCenter * speed).toFixed(1)}px, 0)`;
  }, [speed]);

  useLenis(update, [update]);
  useEffect(update, [update]);

  return (
    <div ref={frame} className={className}>
      <div ref={layer} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
