/** @format */

import { PostTimeStyles } from "./post-time-styles";

interface PostTimeProps {
  children: React.ReactNode;
  title: string;
  datetime: string;
}

export const PostTime = ({ children, title, datetime }: PostTimeProps) => {
  return (
    <time className={PostTimeStyles()} dateTime={datetime} title={title}>
      {children}
    </time>
  );
};
