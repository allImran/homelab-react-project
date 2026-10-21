import { cn } from "@/lib/cn";

export const BRAND_NAME = "Orbit";

export function Wordmark({ className }: { className?: string }) {
  return <span className={cn("title-spaced text-ivory", className)}>{BRAND_NAME}</span>;
}
