/** @format */

import { TextStyles } from "./text-styles";
import { twMerge } from "tailwind-merge";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const Text = ({ children, className, ...props }: TextProps) => {
  return (
    <p className={twMerge(TextStyles(), className)} {...props}>
      {children}
    </p>
  );
};
