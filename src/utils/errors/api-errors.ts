/** @format */

import { ApiError, apiErrorSchema } from "@/schemas/api/api-error-schema";
import { AuthError } from "@supabase/supabase-js";

interface HandleApiErrorProps {
  error: unknown;
  fallbackMessage: string;
}

export const createApiError = (data: {
  message: string;
  error?: string;
  statusCode?: number;
}): ApiError => {
  const { message, error = "Erro desconhecido", statusCode } = data;

  return {
    messages: [message],
    error: error,
    statusCode: statusCode,
  };
};

export function formatSupabaseError(error: AuthError): ApiError {
  return createApiError({
    message: error.message ?? "Erro desconhecido no Supabase",
    statusCode: error.status ?? 500,
    error: error.code ?? "supabase_error",
  });
}

export const isApiError = (error: unknown): error is ApiError => {
  return apiErrorSchema.safeParse(error).success;
};

export function handleApiError(data: HandleApiErrorProps) {
  const { error, fallbackMessage } = data;
  let finalError: ApiError;

  if (isApiError(error)) {
    finalError = error;
  } else if (error instanceof Error) {
    finalError = createApiError({ message: error.message });
  } else {
    finalError = createApiError({ message: fallbackMessage });
  }

  return finalError;
}
