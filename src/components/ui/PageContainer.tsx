import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cn("relative z-10 mx-auto w-full max-w-6xl px-5 pt-36 pb-24 sm:px-8", className)}>{children}</main>;
}
