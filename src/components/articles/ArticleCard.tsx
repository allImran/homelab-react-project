import type { ReactNode } from "react";
import { formatDate } from "@/lib/format";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  action?: ReactNode;
}

export function ArticleCard({ article, action }: ArticleCardProps) {
  const { url, title, summary, imageUrl, publishedAt, sourceName } = article;

  return (
    <article className="surface group relative flex flex-col overflow-hidden rounded-3xl transition-colors hover:border-line-strong">
      {imageUrl && (
        <div className="aspect-[16/9] overflow-hidden">
          {/* Arbitrary publisher hosts: a plain <img> avoids proxying untrusted URLs through the image optimizer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="size-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="label-caps flex items-center gap-2 text-ivory/50">
          <span className="text-amber/90">{sourceName}</span>
          {publishedAt && (
            <>
              <span aria-hidden>·</span>
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            </>
          )}
        </p>
        <h3 className="font-serif text-2xl leading-snug text-ivory">
          {/* Stretched link: the whole card is clickable, the action button sits above it. */}
          <a href={url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
            {title}
          </a>
        </h3>
        {summary && <p className="line-clamp-3 text-sm leading-relaxed text-ivory/60">{summary}</p>}
        {action && <div className="relative z-10 mt-auto flex justify-end pt-2">{action}</div>}
      </div>
    </article>
  );
}
