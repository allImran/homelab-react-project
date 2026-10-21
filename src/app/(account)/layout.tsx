import { GradientBackdrop } from "@/components/backdrops/GradientBackdrop";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GradientBackdrop />
      {children}
    </>
  );
}
