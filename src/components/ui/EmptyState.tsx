import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="surface flex flex-col items-center gap-4 rounded-3xl px-6 py-16 text-center">
      <p className="title-spaced text-xl text-ivory">{title}</p>
      <p className="max-w-sm text-sm leading-relaxed text-ivory/60">{description}</p>
      {action}
    </div>
  );
}
