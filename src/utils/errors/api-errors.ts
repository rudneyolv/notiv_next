/** @format */

import { ApiError, apiErrorSchema } from "@/schemas/api/api-error-schema";
import { ZodError } from "zod";

interface ThrowApiErrorProps {
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

export const isApiError = (error: unknown): error is ApiError => {
  if (typeof error !== "object" || error === null) return false;

  const e = error as Record<string, unknown>;

  // Verifica as propriedades obrigatórias
  const hasRequiredFields =
    Array.isArray(e.messages) &&
    e.messages.every((m) => typeof m === "string") &&
    typeof e.error === "string";

  // Ela é válida se NÃO EXISTIR (undefined) ou se FOR UM NÚMERO.
  const hasValidStatusCode = e.statusCode === undefined || typeof e.statusCode === "number";

  return hasRequiredFields && hasValidStatusCode;
};

export function parseApiError(error: unknown): ApiError {
  // Se for Error → normalmente vem de hooks/client (ex: TanStack Query)
  // Se for string → geralmente vem de Server Components/Server Actions (erros serializados)
  // Se não for nenhum → formato inesperado, tratamos como inválido
  const errorToParse =
    error instanceof Error ? error.message : typeof error === "string" ? error : null;

  if (!errorToParse) {
    return createApiError({ message: "Erro desconhecido." });
  }

  try {
    const parsed = JSON.parse(errorToParse);
    return apiErrorSchema.parse(parsed);
  } catch (parseError) {
    if (parseError instanceof ZodError) {
      return createApiError({ message: "Formato de erro inválido." });
    } else {
      return createApiError({ message: "Erro inesperado ao tratar o erro." });
    }
  }
}

export function serializeApiError(error: ApiError) {
  return JSON.stringify(error);
}

export function handleApiError(data: ThrowApiErrorProps) {
  const { error, fallbackMessage } = data;
  let finalError: ApiError;

  if (isApiError(error)) {
    finalError = error;
  } else if (error instanceof Error) {
    finalError = createApiError({ message: error.message });
  } else {
    finalError = createApiError({ message: fallbackMessage });
  }

  throw serializeApiError(finalError);
}
