"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { signIn, signUp } from "@/lib/auth/client";
import { toSafeRedirectPath } from "@/lib/url";
import { AUTH_MODES, type AuthMode } from "./auth-modes";

interface FormState {
  error: string | null;
  values: Record<string, string>;
}

const INITIAL_STATE: FormState = { error: null, values: {} };

function submitCredentials(mode: AuthMode, values: Record<string, string>) {
  const { name = "", email = "", password = "" } = values;
  return mode === "sign-up" ? signUp.email({ name, email, password }) : signIn.email({ email, password });
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const config = AUTH_MODES[mode];
  const router = useRouter();
  const next = toSafeRedirectPath(useSearchParams().get("next"));

  const [state, formAction, isPending] = useActionState<FormState, FormData>(async (_previous, formData) => {
    const values = Object.fromEntries(formData) as Record<string, string>;
    const { error } = await submitCredentials(mode, values);
    if (error) {
      // Keep what the user typed (minus the password) so they can fix it.
      return { error: error.message ?? "Something went wrong. Please try again.", values: { ...values, password: "" } };
    }
    router.push(next);
    router.refresh();
    return INITIAL_STATE;
  }, INITIAL_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {config.fields.map((field) => (
        <Field key={field.name} {...field} required defaultValue={state.values[field.name]} />
      ))}

      {state.error && (
        <p role="alert" className="rounded-2xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral">
          {state.error}
        </p>
      )}

      <Button type="submit" variant="solid" size="lg" disabled={isPending} className="mt-2">
        {isPending ? "One moment…" : config.submitLabel}
      </Button>

      <p className="text-center text-sm text-ivory/55">
        {config.switchPrompt}{" "}
        <Link href={config.switchHref} className="text-amber underline-offset-4 hover:underline">
          {config.switchLabel}
        </Link>
      </p>
    </form>
  );
}
