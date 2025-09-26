/** @format */

import { cva } from "class-variance-authority";

export const LinkStyles = cva(
  "flex flex-row items-center gap-2 font-semibold select-none transition-colors hover:text-purple-400 focus:text-purple-400",
  {
    variants: {
      active: {
        true: "!text-purple-500",
        false: "!text-zinc-200",
      },
    },

    defaultVariants: {
      active: false,
    },
  }
);
