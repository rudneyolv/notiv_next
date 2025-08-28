/** @format */

import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

export const ClientMarkdownEditor = dynamic(
  () => import("./markdown-editor").then((mod) => mod.MarkdownEditor),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[400px]" />,
  }
);
