/** @format */

import { ApiError } from "@/types/api-types";

export const createFallbackApiError = (message: string = "Erro desconhecido"): ApiError => ({
  messages: [message],
  error: "Unknown",
  statusCode: 0,
});
