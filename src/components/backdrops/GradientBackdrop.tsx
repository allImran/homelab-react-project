"use client";

import dynamic from "next/dynamic";

const ShaderGradientCanvas = dynamic(() => import("@shadergradient/react").then((m) => m.ShaderGradientCanvas), {
  ssr: false,
});
const ShaderGradient = dynamic(() => import("@shadergradient/react").then((m) => m.ShaderGradient), { ssr: false });

/** Slow, warm, grainy shader gradient used behind account pages. */
export function GradientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <ShaderGradientCanvas pointerEvents="none" pixelDensity={1} fov={45} lazyLoad={false}>
        <ShaderGradient
          control="props"
          type="waterPlane"
          animate="on"
          uSpeed={0.12}
          uStrength={2.2}
          uDensity={1.3}
          uFrequency={5.5}
          uAmplitude={1}
          positionX={0}
          positionY={0.6}
          rotationX={50}
          rotationZ={-60}
          color1="#e8a25c"
          color2="#5a2f3f"
          color3="#040405"
          lightType="3d"
          brightness={0.9}
          reflection={0.1}
          cAzimuthAngle={180}
          cPolarAngle={80}
          cDistance={2.8}
          grain="on"
        />
      </ShaderGradientCanvas>
      {/* Darkens the gradient so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/70 to-obsidian" />
    </div>
  );
}
