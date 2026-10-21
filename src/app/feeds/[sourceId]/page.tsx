import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { ArticleGridSkeleton } from "@/components/articles/ArticleGridSkeleton";
import { SourceNav } from "@/components/articles/SourceNav";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEED_SOURCES, getFeedSource } from "@/config/feeds";
import { getFeedArticles } from "@/server/services/feeds.service";

export function generateStaticParams() {
  return FEED_SOURCES.map(({ id }) => ({ sourceId: id }));
}

export async function generateMetadata({ params }: PageProps<"/feeds/[sourceId]">): Promise<Metadata> {
  const source = getFeedSource((await params).sourceId);
  return { title: source?.name ?? "Feed" };
}

async function FeedArticles({ sourceId }: { sourceId: string }) {
  const articles = await getFeedArticles(sourceId);
  if (articles.length === 0) {
    return <EmptyState title="Quiet skies" description="This feed couldn't be reached right now. Try another source or check back soon." />;
  }
  return <ArticleGrid articles={articles} />;
}

export default async function FeedPage({ params }: PageProps<"/feeds/[sourceId]">) {
  const source = getFeedSource((await params).sourceId);
  if (!source) notFound();

  return (
    <PageContainer className="flex flex-col gap-10">
      <SectionHeading as="h1" eyebrow={source.category} title={source.name} description="Latest headlines, refreshed every few minutes." />
      <SourceNav sources={FEED_SOURCES} activeId={source.id} />
      <Suspense fallback={<ArticleGridSkeleton />}>
        <FeedArticles sourceId={source.id} />
      </Suspense>
    </PageContainer>
  );
}
