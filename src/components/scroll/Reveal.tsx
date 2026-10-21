"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  /**
   * For above-the-fold content: visible in the server HTML and animated with CSS,
   * so it never waits for JavaScript (keeps LCP fast).
   */
  eager?: boolean;
  className?: string;
}

/** Fades and lifts content in the first time it scrolls into view (Locomotive's `is-inview`). */
export function Reveal({ children, delay = 0, eager = false, className }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "0px 0px -8% 0px", once: true });
  return (
    <div
      ref={ref}
      data-reveal
      data-inview={eager || inView || undefined}
      style={{ "--reveal-delay": `${delay}ms`, animationDelay: eager ? `${delay}ms` : undefined } as CSSProperties}
      className={cn(eager && "animate-rise", className)}
    >
      {children}
    </div>
  );
}
