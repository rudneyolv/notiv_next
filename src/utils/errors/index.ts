/** @format */

import {
  createFallbackApiError,
  isApiError,
  parseApiError,
  serializeApiError,
  throwApiError,
} from "./api-errors";

export const errorsUtils = {
  isApiError,
  serializeApiError,
  parseApiError,
  createFallbackApiError,
  throwApiError,
};
