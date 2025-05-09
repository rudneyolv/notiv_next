/** @format */

import { HeadingStyles } from "./Heading-Styles";
import { twMerge } from "tailwind-merge";

interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({
  as: Tag = "h1",
  children,
  className,
  ...props
}: HeadingProps) => {
  return (
    <Tag className={twMerge(HeadingStyles(), className)} {...props}>
      {children}
    </Tag>
  );
};
