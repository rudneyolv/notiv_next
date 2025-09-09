/** @format */

import {
  createApiError,
  isApiError,
  parseApiError,
  serializeApiError,
  handleApiError,
} from "./api-errors";

export const errorsUtils = {
  isApiError,
  serializeApiError,
  parseApiError,
  createApiError,
  handleApiError,
};
