import type { ComponentProps } from "react";
import { buttonStyles, type ButtonStyleProps } from "./button-styles";

type ButtonProps = ComponentProps<"button"> & ButtonStyleProps;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}
