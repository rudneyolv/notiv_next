/** @format */

import { cva } from "class-variance-authority";

export const PostFormContainerStyles = cva(
  "bg-zinc-950 min-h-screen flex flex-col items-center justify-center p-8"
);

export const PostFormStyles = cva(
  "p-4 rounded-xl w-full max-w-2xl flex flex-col items-center gap-4"
);
