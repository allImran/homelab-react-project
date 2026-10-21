import { LiquidLogo } from "@/components/brand/LiquidLogo";
import { Parallax } from "@/components/scroll/Parallax";
import { Reveal } from "@/components/scroll/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/config/routes";
import { GlassCta } from "./GlassCta";

export function ClosingCta() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-5 py-28 text-center">
      <Parallax speed={0.15}>
        <LiquidLogo className="w-28" speed={0.4} />
      </Parallax>
      <Reveal className="flex flex-col items-center gap-8">
        <SectionHeading
          title="Your news is unique"
          description="Build a reading list that is yours alone. Free, private, and kept on your dashboard."
          align="center"
        />
        <GlassCta href={ROUTES.signUp}>Start saving</GlassCta>
      </Reveal>
    </section>
  );
}
