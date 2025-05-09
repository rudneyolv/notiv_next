import { Heading } from "@/components/Heading/Heading";
import { PostHeadingStyles } from "./PostHeading-Styles";
import { PostHeadingProps } from "@/interfaces/posts/post-interface";

export const PostHeading = ({ children }: PostHeadingProps) => {
  return (
    <Heading as="h2" className={PostHeadingStyles()}>
      {children}
    </Heading>
  );
};
