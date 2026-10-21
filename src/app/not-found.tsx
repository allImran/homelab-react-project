import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer } from "@/components/ui/PageContainer";
import { ROUTES } from "@/config/routes";

export default function NotFound() {
  return (
    <PageContainer className="max-w-xl">
      <EmptyState
        title="Lost in space"
        description="This page drifted out of orbit."
        action={<ButtonLink href={ROUTES.home}>Back home</ButtonLink>}
      />
    </PageContainer>
  );
}
