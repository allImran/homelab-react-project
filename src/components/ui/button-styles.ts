import { cn } from "@/lib/cn";

const base =
  "label-caps inline-flex shrink-0 items-center whitespace-nowrap justify-center gap-2 rounded-full transition-colors duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber disabled:pointer-events-none disabled:opacity-50";

const variants = {
  outline: "border border-ivory/30 text-ivory/85 hover:border-ivory/70 hover:text-ivory",
  solid: "bg-ivory text-obsidian hover:bg-amber",
  ghost: "text-ivory/70 hover:text-ivory",
} as const;

const sizes = {
  sm: "h-8 px-3",
  md: "h-10 px-5",
  lg: "h-12 px-7",
} as const;

export interface ButtonStyleProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
}

/** Shared by <button> and <Link> so both look identical without duplicating classes. */
export function buttonStyles({ variant = "outline", size = "md", className }: ButtonStyleProps = {}) {
  return cn(base, variants[variant], sizes[size], className);
}
