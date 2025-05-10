import { PostRootProps } from "@/interfaces/posts/post-interface";
import { PostRootStyles } from "./PostRoot-Styles";
import Link from "next/link";

export const PostRoot = ({ children, href, variant }: PostRootProps) => {
  if (href) {
    return (
      <Link href={href} className={PostRootStyles({ variant })}>
        {children}
      </Link>
    );
  }

  return <div className={PostRootStyles({ variant })}>{children}</div>;
};
