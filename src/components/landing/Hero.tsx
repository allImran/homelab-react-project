import { LiquidLogo } from "@/components/brand/LiquidLogo";
import { Wordmark } from "@/components/brand/Wordmark";
import { Parallax } from "@/components/scroll/Parallax";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ROUTES } from "@/config/routes";
import { GlassCta } from "./GlassCta";
import { HeroOrbit } from "./HeroOrbit";

export function Hero() {
  return (
    <section className="relative isolate grid min-h-dvh place-items-center overflow-hidden px-6 pt-24 pb-16 text-center">
      <div className="absolute inset-0 -z-10">
        <HeroOrbit />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-obsidian to-transparent" />

      {/* The copy lags behind the scroll, sinking into the solar system as you leave the hero */}
      <Parallax speed={-0.35} className="pointer-events-none">
        <div className="flex -translate-y-16 flex-col items-center gap-5">
          <LiquidLogo className="w-32 animate-rise sm:w-40" />
          <h1 className="animate-rise text-[clamp(3rem,13vw,10rem)] leading-none [animation-delay:120ms]">
            <Wordmark />
          </h1>
          <p className="max-w-xl animate-rise text-[1.05rem] leading-relaxed font-medium tracking-wide text-ivory/80 [animation-delay:240ms] lg:text-2xl">
            Every headline, in orbit. Read free news from around the world and keep the stories that matter.
          </p>
          <div className="pointer-events-auto mt-4 flex animate-rise flex-col items-center gap-4 [animation-delay:360ms] sm:flex-row">
            <GlassCta href={ROUTES.feeds}>Explore feeds</GlassCta>
            <ButtonLink href={ROUTES.signUp} variant="ghost">
              Create an account
            </ButtonLink>
          </div>
          <p className="label-caps mt-6 text-ivory/40">Each planet is a source · tap one to open it</p>
        </div>
      </Parallax>
    </section>
  );
}
