"use client";

import {
  defaultObjectSizing,
  getShaderColorFromString,
  LiquidMetalShapes,
  liquidMetalFragmentShader,
  ShaderFitOptions,
} from "@paper-design/shaders";
import { ShaderMount } from "@paper-design/shaders-react";

/**
 * Pre-processed by `npm run logo:process`. Feeding it to ShaderMount directly skips
 * the expensive in-browser processing that <LiquidMetal image="…"> runs on every mount.
 */
const PROCESSED_LOGO = "/logo-metal.png";

const UNIFORMS = {
  u_image: PROCESSED_LOGO,
  u_isImage: true,
  u_shape: LiquidMetalShapes.none,
  u_colorBack: getShaderColorFromString("#00000000"),
  u_colorTint: getShaderColorFromString("#efe8dc"),
  u_repetition: 2,
  u_softness: 0.15,
  u_shiftRed: 0.3,
  u_shiftBlue: 0.3,
  u_distortion: 0.08,
  u_contour: 0.4,
  u_angle: 70,
  u_fit: ShaderFitOptions.contain,
  u_scale: defaultObjectSizing.scale,
  u_rotation: defaultObjectSizing.rotation,
  u_offsetX: defaultObjectSizing.offsetX,
  u_offsetY: defaultObjectSizing.offsetY,
  u_originX: defaultObjectSizing.originX,
  u_originY: defaultObjectSizing.originY,
  u_worldWidth: defaultObjectSizing.worldWidth,
  u_worldHeight: defaultObjectSizing.worldHeight,
};

export default function LiquidMetalMark({ speed }: { speed: number }) {
  return (
    <ShaderMount
      className="size-full"
      fragmentShader={liquidMetalFragmentShader}
      uniforms={UNIFORMS}
      mipmaps={["u_image"]}
      speed={speed}
      maxPixelCount={512 * 512}
    />
  );
}
