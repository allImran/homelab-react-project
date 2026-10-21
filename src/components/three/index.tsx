"use client";

import dynamic from "next/dynamic";

// WebGL scenes are client-only; load them lazily so they never block the static shell.
export const OrbitScene = dynamic(() => import("./OrbitScene"), { ssr: false });
export const Starfield = dynamic(() => import("./Starfield"), { ssr: false });
export type { PlanetSpec } from "./Planet";
