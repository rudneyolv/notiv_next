/** @format */
import { cva, VariantProps } from "class-variance-authority";

export const CustomLinkStyles = cva("font-primary transition-all duration-500 ease-in-out");

export type CustomLinkStylesProps = VariantProps<typeof CustomLinkStyles>;
