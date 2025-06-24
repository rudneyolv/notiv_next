/** @format */

import dynamic from "next/dynamic";
import { Text } from "../Text/Text";

export const ClientMarkdownEditor = dynamic(
  () => import("./MarkdownEditor").then((mod) => mod.MarkdownEditor),
  {
    ssr: false,
    loading: () => <Text>Carregando editor...</Text>,
  }
);
