"use client";

import { FadeInCanvas } from "./FadeInCanvas";
import { ScrollDrift } from "./ScrollDrift";
import { StarLayer } from "./StarLayer";

/** Static star backdrop that only re-renders while the page scrolls. */
export default function Starfield({ className }: { className?: string }) {
  return (
    <FadeInCanvas className={className} frameloop="demand" camera={{ position: [0, 0, 1], fov: 60 }}>
      <ScrollDrift>
        <StarLayer count={2500} speed={0} />
      </ScrollDrift>
    </FadeInCanvas>
  );
}
