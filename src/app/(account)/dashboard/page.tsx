import type { Metadata } from "next";
import { SavedArticlesView } from "@/components/dashboard/SavedArticlesView";
import { PageContainer } from "@/components/ui/PageContainer";

export const metadata: Metadata = { title: "Saved stories" };

// Access is guarded by proxy.ts (redirect) and the API (401); data loads client-side via SWR.
export default function DashboardPage() {
  return (
    <PageContainer>
      <SavedArticlesView />
    </PageContainer>
  );
}
