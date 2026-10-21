import { SourceNav } from "@/components/articles/SourceNav";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEED_SOURCES } from "@/config/feeds";

export function SourcesSection() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow={`${FEED_SOURCES.length} sources`}
        title="The constellation"
        description="Every source is a public RSS feed, refreshed every few minutes."
        align="center"
      />
      <div className="flex justify-center">
        <SourceNav sources={FEED_SOURCES} />
      </div>
    </section>
  );
}
