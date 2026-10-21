/**
 * Pre-processes public/logo.svg for Paper's liquid-metal shader.
 *
 * The <LiquidMetal> component does this in the browser on every mount: it rasterizes
 * the SVG at 4096px and runs a CPU-heavy edge pass (~700ms main-thread block, 1.5MB blob).
 * Doing it once here and shipping a small PNG removes that cost from every page load.
 *
 * Usage: npm run logo:process   (requires Google Chrome installed locally)
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const ROOT = path.resolve(import.meta.dirname, "..");
const SHADERS_DIST = path.join(ROOT, "node_modules/@paper-design/shaders/dist");
const INPUT = path.join(ROOT, "public/logo.svg");
const OUTPUT = path.join(ROOT, "public/logo-metal.png");
const OUTPUT_SIZE = 512;
const ORIGIN = "http://logo.local";

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage();

  // Serve the shader package and the logo from disk under a fake origin.
  await page.route(`${ORIGIN}/**`, async (route) => {
    const { pathname } = new URL(route.request().url());
    if (pathname === "/") return route.fulfill({ contentType: "text/html", body: "<!doctype html>" });
    if (pathname === "/logo.svg") return route.fulfill({ contentType: "image/svg+xml", body: await readFile(INPUT) });
    return route.fulfill({ contentType: "text/javascript", body: await readFile(path.join(SHADERS_DIST, pathname)) });
  });
  await page.goto(`${ORIGIN}/`);

  const dataUrl = await page.evaluate(async (size) => {
    const { toProcessedLiquidMetal } = await import("/index.js");
    const { imageData } = await toProcessedLiquidMetal("/logo.svg");

    const full = Object.assign(document.createElement("canvas"), { width: imageData.width, height: imageData.height });
    full.getContext("2d").putImageData(imageData, 0, 0);

    const scale = size / Math.max(imageData.width, imageData.height);
    const small = Object.assign(document.createElement("canvas"), {
      width: Math.round(imageData.width * scale),
      height: Math.round(imageData.height * scale),
    });
    const ctx = small.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(full, 0, 0, small.width, small.height);
    return small.toDataURL("image/png");
  }, OUTPUT_SIZE);

  const png = Buffer.from(dataUrl.split(",")[1], "base64");
  await writeFile(OUTPUT, png);
  console.log(`✓ wrote ${path.relative(ROOT, OUTPUT)} (${Math.round(png.length / 1024)} KB)`);
} finally {
  await browser.close();
}
