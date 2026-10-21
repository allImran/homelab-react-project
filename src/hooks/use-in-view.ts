"use client";

import { useEffect, useRef, useState } from "react";

interface InViewOptions {
  /** Start reacting before the element enters the viewport. */
  rootMargin?: string;
  /** Stop observing after the first time it becomes visible. */
  once?: boolean;
}

export function useInView<T extends Element>({ rootMargin = "0px", once = false }: InViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return [ref, inView] as const;
}
