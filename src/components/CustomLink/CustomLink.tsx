/** @format */

import Link from "next/link";
import { CustomLinkStyles, CustomLinkStylesProps } from "./CustomLink-Styles";

interface CustomLinkProps extends CustomLinkStylesProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function CustomLink({ href, children, className }: CustomLinkProps) {
  return (
    <Link href={href} className={CustomLinkStyles({ className })}>
      {children}
    </Link>
  );
}
