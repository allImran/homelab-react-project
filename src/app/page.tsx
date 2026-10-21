import { ClosingCta } from "@/components/landing/ClosingCta";
import { Hero } from "@/components/landing/Hero";
import { SourcesSection } from "@/components/landing/SourcesSection";
import { Steps } from "@/components/landing/Steps";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Steps />
      <SourcesSection />
      <ClosingCta />
    </main>
  );
}
