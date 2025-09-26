/** @format */

import { cva } from "class-variance-authority";
export const MarkdownStyles = cva([
  "prose prose-invert text-zinc-200 w-full max-w-none overflow-hidden",
  "prose-a:transition prose-a:no-underline prose-a:text-blue-400",
  "prose-a:hover:text-blue-300 prose-a:hover:underline",
  "prose-img:mx-auto lg:prose-lg",
]);
