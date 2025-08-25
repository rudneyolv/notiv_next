/** @format */

import Link from "next/link";
import { PostRootStyles, PostRootStylesProps } from "./post-root-styles";

interface PostRootProps extends PostRootStylesProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export const PostRoot = ({ children, href, variant, className }: PostRootProps) => {
  if (href) {
    return (
      <Link href={href} className={PostRootStyles({ className, variant })}>
        {children}
      </Link>
    );
  }

  return <div className={PostRootStyles({ className, variant })}>{children}</div>;
};
