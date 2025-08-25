/** @format */

import { cva } from "class-variance-authority";

export const PostImageContainerStyles = cva("w-full h-full overflow-hidden rounded-t-xl");

export const PostImageStyles = cva(
  "w-full h-full object-cover object-center transition duration-500"
);
