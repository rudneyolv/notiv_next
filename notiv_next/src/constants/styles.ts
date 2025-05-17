/** @format */

export const baseColors = {
  primary: "text-main-primary",
};

export const baseHoverColors = {
  primary: "hover:text-main-primary",
};

export const baseSizes = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
};

export const baseWeights = {
  normal: "font-normal",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

export const baseTextCases = {
  normal: "normal-case",
  uppercase: "uppercase",
  lowercase: "lowercase",
};

export type BaseColors = keyof typeof baseColors;
export type BaseHoverColors = keyof typeof baseHoverColors;
export type BaseSizes = keyof typeof baseSizes;
export type BaseWeights = keyof typeof baseWeights;
export type BaseTextCases = keyof typeof baseTextCases;
