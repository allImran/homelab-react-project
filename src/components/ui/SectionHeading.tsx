import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <header className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow && <p className="label-caps text-amber/90">{eyebrow}</p>}
      <Tag className="title-spaced text-3xl leading-tight text-ivory sm:text-4xl">{title}</Tag>
      {description && <p className="max-w-xl text-[0.95rem] leading-relaxed text-ivory/65">{description}</p>}
    </header>
  );
}
