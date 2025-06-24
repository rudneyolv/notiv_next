/** @format */
"use client";

import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type MarkdownEditorProps = MDEditorProps;

// Importar diretamente pode causar erros de hidratação
export function MarkdownEditor({ ...props }: MarkdownEditorProps) {
  return (
    <MDEditor
      className="whitespace-pre-wrap font-sofia"
      preview="edit"
      hideToolbar={false}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
        remarkPlugins: [[remarkGfm]],
      }}
      extraCommands={[]}
      {...props}
    />
  );
}
