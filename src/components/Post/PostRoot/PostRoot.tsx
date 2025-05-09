import { PostRootProps } from "@/interfaces/posts/post-interface";
import { PostRootStyles } from "./PostRoot-Styles";
import Link from "next/link";

export const PostRoot = ({ children, href }: PostRootProps) => {
  if (href) {
    return (
      <Link href={href} className={PostRootStyles()}>
        {children}
      </Link>
    );
  }

  return <div className={PostRootStyles()}>{children}</div>;
};
