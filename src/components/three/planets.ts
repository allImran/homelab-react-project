import type { FeedSource } from "@/types/article";
import type { PlanetSpec } from "./Planet";

/** Lays out one planet per source on evenly spaced, alternating-speed orbits. */
export function sourcesToPlanets(sources: readonly FeedSource[]): PlanetSpec[] {
  return sources.map((source, index) => ({
    id: source.id,
    label: source.name,
    color: source.color,
    orbitRadius: 2.2 + index * 0.85,
    size: 0.16 + ((index * 7) % 5) * 0.035,
    speed: 0.32 / Math.sqrt(index + 1),
    phase: (index / sources.length) * Math.PI * 2,
  }));
}
