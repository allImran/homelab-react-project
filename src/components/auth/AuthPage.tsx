import { Suspense } from "react";
import { LiquidLogo } from "@/components/brand/LiquidLogo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AuthForm } from "./AuthForm";
import { AUTH_MODES, type AuthMode } from "./auth-modes";

export function AuthPage({ mode }: { mode: AuthMode }) {
  const { eyebrow, title } = AUTH_MODES[mode];
  return (
    <main className="relative z-10 flex min-h-dvh items-center justify-center px-5 pt-28 pb-16">
      <div className="glass flex w-full max-w-md flex-col gap-8 rounded-[2rem] p-8 sm:p-10">
        <div className="flex flex-col items-center gap-5">
          <LiquidLogo className="w-24" />
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} align="center" />
        </div>
        {/* useSearchParams() inside the form needs a boundary under Cache Components */}
        <Suspense fallback={<div className="h-72 animate-pulse rounded-2xl bg-ivory/5" />}>
          <AuthForm mode={mode} />
        </Suspense>
      </div>
    </main>
  );
}
