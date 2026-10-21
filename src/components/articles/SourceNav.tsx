import Link from "next/link";
import { feedPath } from "@/config/feeds";
import { cn } from "@/lib/cn";
import type { FeedSource } from "@/types/article";

interface SourceNavProps {
  sources: readonly Pick<FeedSource, "id" | "name" | "color">[];
  activeId?: string;
  /** Renders buttons instead of links, for client-side filtering. */
  onSelect?: (id: string) => void;
}

const chipClass = (isActive: boolean) =>
  cn(
    "label-caps inline-flex h-9 items-center gap-2 rounded-full border px-4 transition-colors",
    isActive ? "border-ivory/70 bg-ivory/10 text-ivory" : "border-line-strong text-ivory/60 hover:text-ivory",
  );

function Dot({ color }: { color: string }) {
  return <span className="size-2 rounded-full" style={{ backgroundColor: color }} aria-hidden />;
}

export function SourceNav({ sources, activeId, onSelect }: SourceNavProps) {
  return (
    <nav aria-label="News sources" className="flex flex-wrap gap-2">
      {sources.map(({ id, name, color }) => {
        const isActive = id === activeId;
        const content = (
          <>
            <Dot color={color} />
            {name}
          </>
        );
        return onSelect ? (
          <button key={id} type="button" className={chipClass(isActive)} aria-pressed={isActive} onClick={() => onSelect(id)}>
            {content}
          </button>
        ) : (
          <Link key={id} href={feedPath(id)} className={chipClass(isActive)} aria-current={isActive ? "page" : undefined}>
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
