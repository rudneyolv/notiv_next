import { PostTimeProps } from "@/interfaces/posts/post-interface";
import { PostTimeStyles } from "./PostTime-Styles";

export const PostTime = ({ children, title, datetime }: PostTimeProps) => {
  return (
    <time className={PostTimeStyles()} dateTime={datetime} title={title}>
      {children}
    </time>
  );
};
