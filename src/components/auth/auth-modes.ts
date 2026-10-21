import { ROUTES } from "@/config/routes";

export type AuthMode = "sign-in" | "sign-up";

interface FieldConfig {
  name: "name" | "email" | "password";
  label: string;
  type: string;
  autoComplete: string;
  minLength?: number;
}

const NAME: FieldConfig = { name: "name", label: "Name", type: "text", autoComplete: "name" };
const EMAIL: FieldConfig = { name: "email", label: "Email", type: "email", autoComplete: "email" };
const password = (autoComplete: string): FieldConfig => ({
  name: "password",
  label: "Password",
  type: "password",
  autoComplete,
  minLength: 8,
});

/** Copy and fields for each auth screen, so one form component serves both. */
export const AUTH_MODES = {
  "sign-in": {
    eyebrow: "Welcome back",
    title: "Sign in",
    submitLabel: "Sign in",
    fields: [EMAIL, password("current-password")],
    switchPrompt: "New to Orbit?",
    switchLabel: "Create an account",
    switchHref: ROUTES.signUp,
  },
  "sign-up": {
    eyebrow: "Join Orbit",
    title: "Create account",
    submitLabel: "Create account",
    fields: [NAME, EMAIL, password("new-password")],
    switchPrompt: "Already have an account?",
    switchLabel: "Sign in",
    switchHref: ROUTES.signIn,
  },
} satisfies Record<AuthMode, unknown>;
