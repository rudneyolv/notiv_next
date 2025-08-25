/** @format */

import { cva } from "class-variance-authority";

const PostContentStyles = cva("flex flex-col gap-2 justify-center");

export const PostContent = ({ children }: { children: React.ReactNode }) => {
  return <div className={PostContentStyles()}>{children}</div>;
};
