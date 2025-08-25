/** @format */

import dynamic from "next/dynamic";
import { Text } from "../text/text";

export const ClientMarkdownEditor = dynamic(
  () => import("./markdown-editor").then((mod) => mod.MarkdownEditor),
  {
    ssr: false,
    loading: () => <Text>Carregando editor...</Text>,
  }
);
