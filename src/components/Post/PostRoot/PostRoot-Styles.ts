/** @format */

import { cva, VariantProps } from "class-variance-authority";

export const PostRootStyles = cva(
  "grid grid-cols-1 gap-4 p-4 rounded-xl shadow-none hover:shadow-xl transition duration-500 group hover:-translate-y-1",
  {
    variants: {
      variant: {
        col: "sm:grid-cols-1",
        row: "sm:grid-cols-2",
      },
    },

    defaultVariants: {
      variant: "col",
    },
  }
);

export type PostRootStylesProps = VariantProps<typeof PostRootStyles>;
