"use client";

import { useMemo, useState } from "react";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { ArticleGridSkeleton } from "@/components/articles/ArticleGridSkeleton";
import { SourceNav } from "@/components/articles/SourceNav";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEED_SOURCES } from "@/config/feeds";
import { ROUTES } from "@/config/routes";
import { useSavedArticles } from "@/hooks/use-saved-articles";
import { useSession } from "@/lib/auth/client";
import { pluralize } from "@/lib/format";

const ALL = "all";
const ALL_CHIP = { id: ALL, name: "All", color: "#efe8dc" };

export function SavedArticlesView() {
  const { data: session } = useSession();
  const { articles, isLoading, error } = useSavedArticles();
  const [activeSource, setActiveSource] = useState(ALL);

  // Only offer filters for sources the user has actually saved from.
  const chips = useMemo(() => {
    const savedSourceIds = new Set(articles.map((a) => a.sourceId));
    return [ALL_CHIP, ...FEED_SOURCES.filter((s) => savedSourceIds.has(s.id))];
  }, [articles]);

  const visible = activeSource === ALL ? articles : articles.filter((a) => a.sourceId === activeSource);
  const firstName = session?.user.name.split(" ")[0];

  return (
    <div className="flex flex-col gap-10">
      <SectionHeading
        as="h1"
        eyebrow={firstName ? `Hello, ${firstName}` : "Your dashboard"}
        title="Saved stories"
        description={isLoading ? "Gathering your orbit…" : `${pluralize(articles.length, "article")} in your orbit.`}
      />

      {chips.length > 2 && <SourceNav sources={chips} activeId={activeSource} onSelect={setActiveSource} />}

      {error ? (
        <EmptyState title="Lost signal" description="We couldn't load your saved articles. Please refresh the page." />
      ) : isLoading ? (
        <ArticleGridSkeleton />
      ) : visible.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          description="Browse the feeds and tap Save on any story to keep it here."
          action={<ButtonLink href={ROUTES.feeds}>Explore feeds</ButtonLink>}
        />
      ) : (
        <ArticleGrid articles={visible} />
      )}
    </div>
  );
}
