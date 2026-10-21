"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { OrbitScene } from "@/components/three";
import { sourcesToPlanets } from "@/components/three/planets";
import { FEED_SOURCES, feedPath } from "@/config/feeds";

export function HeroOrbit() {
  const router = useRouter();
  const planets = useMemo(() => sourcesToPlanets(FEED_SOURCES), []);
  return <OrbitScene className="size-full" planets={planets} onSelect={(id) => router.push(feedPath(id))} />;
}
