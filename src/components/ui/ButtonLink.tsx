import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonStyles, type ButtonStyleProps } from "./button-styles";

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonStyleProps;

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}
