const PLACEHOLDERS = Array.from({ length: 6 }, (_, i) => i);

export function ArticleGridSkeleton() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading articles">
      {PLACEHOLDERS.map((i) => (
        <li key={i} className="surface h-80 animate-pulse rounded-3xl" />
      ))}
    </ul>
  );
}
