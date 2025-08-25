/** @format */

import { ApiError } from "@/types/api-types";

export const isApiError = (error: unknown): error is ApiError => {
  if (typeof error !== "object" || error === null) return false;

  const e = error as Record<string, unknown>;

  return (
    Array.isArray(e.messages) &&
    e.messages.every((m) => typeof m === "string") &&
    typeof e.error === "string" &&
    typeof e.statusCode === "number"
  );
};
