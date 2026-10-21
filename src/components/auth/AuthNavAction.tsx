"use client";

import { useRouter } from "next/navigation";
import { buttonStyles } from "@/components/ui/button-styles";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ROUTES } from "@/config/routes";
import { signOut, useSession } from "@/lib/auth/client";

export function AuthNavAction() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) return <span className={buttonStyles({ size: "sm", className: "w-20 animate-pulse" })} aria-hidden />;

  if (!session) {
    return (
      <ButtonLink href={ROUTES.signIn} size="sm">
        Sign in
      </ButtonLink>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push(ROUTES.home);
    router.refresh();
  };

  return (
    <button type="button" onClick={handleSignOut} className={buttonStyles({ size: "sm" })} title={session.user.email}>
      Sign out
    </button>
  );
}
