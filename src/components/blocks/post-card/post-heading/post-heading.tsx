/** @format */

import { Heading } from "@/components/heading/heading";
import { PostHeadingStyles } from "./post-heading-styles";
import { cn } from "@/lib/utils";

export const PostHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Heading as="h2" className={cn(PostHeadingStyles(), className)}>
      {children}
    </Heading>
  );
};
