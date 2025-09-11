/** @format */

import { cva } from "class-variance-authority";

export const FormContainerStyles = cva(
  "bg-zinc-950 min-h-screen flex flex-col items-center justify-center p-8"
);

export const FormStyles = cva(
  "p-4 min-w-72 sm:min-w-80 rounded-xl w-full max-w-2xl flex flex-col items-center gap-4"
);
