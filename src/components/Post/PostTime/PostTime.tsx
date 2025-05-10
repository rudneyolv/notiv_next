import { PostTimeProps } from "@/interfaces/posts/post-interface";
import { PostTimeStyles } from "./PostTime-Styles";

export const PostTime = ({ children }: PostTimeProps) => {
  return (
    <time className={PostTimeStyles()} dateTime="2025-05-20">
      {children}
    </time>
  );
};
