import { cva } from "class-variance-authority";

export const PostRootStyles = cva(
  "grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl shadow-none hover:shadow-xl transition duration-500 group hover:-translate-y-1"
);
