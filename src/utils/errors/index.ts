/** @format */

import { createApiError, isApiError, handleApiError, formatSupabaseError } from "./api-errors";

export const errorsUtils = {
  isApiError,
  createApiError,
  handleApiError,
  formatSupabaseError,
};
