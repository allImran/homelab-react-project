import { useId, type ComponentProps } from "react";

type FieldProps = ComponentProps<"input"> & { label: string };

export function Field({ label, ...inputProps }: FieldProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label-caps text-ivory/60">
        {label}
      </label>
      <input
        id={id}
        className="h-12 rounded-2xl border border-line-strong bg-obsidian/40 px-4 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-amber/70"
        {...inputProps}
      />
    </div>
  );
}
