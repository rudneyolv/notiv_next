import { PostContentStyles } from "./PostContent-Styles";
import { PostContentProps } from "@/interfaces/posts/post-interface";

export const PostContent = ({ children }: PostContentProps) => {
  return <div className={PostContentStyles()}>{children}</div>;
};
