import { Wordmark } from "@/components/brand/Wordmark";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-10 text-xs text-ivory/45 sm:flex-row sm:px-8">
        <Wordmark className="text-sm text-ivory/70" />
        <p>Headlines from public RSS feeds. Articles belong to their publishers.</p>
      </div>
    </footer>
  );
}
