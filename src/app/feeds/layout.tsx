import { StarfieldBackdrop } from "@/components/backdrops/StarfieldBackdrop";

export default function FeedsLayout({ children }: LayoutProps<"/feeds">) {
  return (
    <>
      <StarfieldBackdrop />
      {children}
    </>
  );
}
