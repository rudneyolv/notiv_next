import { cva } from "class-variance-authority";

export const PostImageContainerStyles = cva(
  "w-full h-full overflow-hidden rounded-xl"
);

export const PostImageStyles = cva(
  "w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
);
