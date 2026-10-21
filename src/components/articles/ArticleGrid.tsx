import type { Article } from "@/types/article";
import { ArticleCard } from "./ArticleCard";
import { SaveArticleButton } from "./SaveArticleButton";

export function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <li key={article.url} className="flex animate-rise">
          <ArticleCard article={article} action={<SaveArticleButton article={article} />} />
        </li>
      ))}
    </ul>
  );
}
