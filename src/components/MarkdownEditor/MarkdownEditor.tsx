/** @format */
"use client";

import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface MarkdownEditorProps extends MDEditorProps {
  disabled?: boolean;
}

// Importar diretamente pode causar erros de hidratação
export function MarkdownEditor({ disabled, ...props }: MarkdownEditorProps) {
  return (
    <MDEditor
      className="whitespace-pre-wrap font-sofia"
      preview={disabled ? "preview" : "edit"}
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
