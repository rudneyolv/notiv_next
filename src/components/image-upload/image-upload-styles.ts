/** @format */

import { cva } from "class-variance-authority";

export const ImageUploadStyles = cva(
  `
    data-[status=error]:bg-destructive/30
    data-[status=hover]:bg-accent/40
    data-[status=ready]:bg-accent/60

    transition-colors duration-500

    rounded-xl
    border-2 border-dashed border-accent

    data-[status=error]:border-destructive
    data-[status=hover]:border-accent
    data-[status=ready]:border-green-700

    w-full h-64
    p-4


    flex flex-col items-center justify-center gap-1
  `
);

export const PreviewContainer = cva(
  `
    group
    relative
    flex flex-col items-center justify-center gap-2
    max-w-xs h-full

    transition-translate duration-500 will-change-transform
    hover:-translate-y-1
    data-[status=disabled]:translate-y-0
  `
);

export const PreviewImage = cva(
  `
    w-full h-full
    max-h-48
    brightness-75 rounded-xl
    transition-shadow duration-500
    group-hover:shadow-md
  `
);

export const CloseButton = cva(
  `
    absolute top-1 right-1
    bg-accent/30
    rounded-sm
    transition-colors duration-500
    hover:text-destructive
  `
);

export const PreviewText = cva(
  `
    w-full
    md:text-sm
    text-xs
    transition-colors duration-500
  `
);
