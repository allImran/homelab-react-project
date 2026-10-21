import { LiquidLogo } from "@/components/brand/LiquidLogo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/config/routes";
import { GlassCta } from "./GlassCta";

export function ClosingCta() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-5 py-28 text-center">
      <LiquidLogo className="w-28" speed={0.4} />
      <SectionHeading
        title="Your news is unique"
        description="Build a reading list that is yours alone. Free, private, and kept on your dashboard."
        align="center"
      />
      <GlassCta href={ROUTES.signUp}>Start saving</GlassCta>
    </section>
  );
}
