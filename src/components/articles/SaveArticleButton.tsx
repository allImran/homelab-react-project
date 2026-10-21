"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ROUTES, withNext } from "@/config/routes";
import { useSavedArticles } from "@/hooks/use-saved-articles";
import type { Article } from "@/types/article";

export function SaveArticleButton({ article }: { article: Article }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn, isSaved, save, remove } = useSavedArticles();
  const [isBusy, setIsBusy] = useState(false);
  const saved = isSaved(article.url);

  const handleClick = async () => {
    if (!isSignedIn) return router.push(withNext(ROUTES.signIn, pathname));
    setIsBusy(true);
    try {
      await (saved ? remove(article.url) : save(article));
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Button
      size="sm"
      variant={saved ? "solid" : "outline"}
      onClick={handleClick}
      disabled={isBusy}
      aria-pressed={saved}
    >
      {saved ? "Saved" : "Save"}
    </Button>
  );
}
