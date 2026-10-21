import Link from "next/link";
import { LiquidGlassFrame } from "@/components/ui/LiquidGlassFrame";

/** Primary call-to-action rendered on liquid glass. */
export function GlassCta({ href, children }: { href: string; children: string }) {
  return (
    <LiquidGlassFrame className="h-16 w-60" padding="0">
      <Link href={href} className="label-caps block whitespace-nowrap px-9 py-4 text-[0.7rem] text-ivory">
        {children}
      </Link>
    </LiquidGlassFrame>
  );
}
