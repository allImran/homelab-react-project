"use client";

import { SpaceCanvas } from "@/components/three";

export function StarfieldBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <SpaceCanvas starCount={2500} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/40 to-obsidian" />
    </div>
  );
}
