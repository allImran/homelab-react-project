import { Reveal } from "@/components/scroll/Reveal";
import type { Article } from "@/types/article";
import { ArticleCard } from "./ArticleCard";
import { SaveArticleButton } from "./SaveArticleButton";

const COLUMNS = 3;
const STAGGER_MS = 90;

export function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <li key={article.url}>
          {/* Stagger across the three columns so each row ripples in */}
          <Reveal eager={index < COLUMNS} delay={(index % COLUMNS) * STAGGER_MS} className="flex h-full">
            <ArticleCard article={article} action={<SaveArticleButton article={article} />} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
