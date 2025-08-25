/** @format */

import { Heading } from "@/components/heading/heading";
import { PostHeadingStyles } from "./post-heading-styles";

export const PostHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading as="h2" className={PostHeadingStyles()}>
      {children}
    </Heading>
  );
};
