"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { OrbitScene } from "@/components/three";
import { sourcesToPlanets } from "@/components/three/planets";
import { FEED_SOURCES, feedPath } from "@/config/feeds";
import { useInView } from "@/hooks/use-in-view";

export function HeroOrbit() {
  const router = useRouter();
  const planets = useMemo(() => sourcesToPlanets(FEED_SOURCES), []);
  // Stop the render loop once the hero scrolls away so it doesn't compete with scrolling.
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="size-full">
      <OrbitScene
        className="size-full"
        planets={planets}
        paused={!inView}
        onSelect={(id) => router.push(feedPath(id))}
      />
    </div>
  );
}
