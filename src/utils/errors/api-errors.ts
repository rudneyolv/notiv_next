/** @format */

import { ApiError, apiErrorSchema } from "@/schemas/api/api-error-schema";
import { ZodError } from "zod";

interface ThrowApiErrorProps {
  error: unknown;
  fallbackMessage: string;
}

export const createFallbackApiError = (message: string = "Erro desconhecido"): ApiError => ({
  messages: [message],
  error: "Unknown",
  statusCode: 500,
});

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

export function parseApiError(error: unknown): ApiError {
  // Se for Error → normalmente vem de hooks/client (ex: TanStack Query)
  // Se for string → geralmente vem de Server Components/Server Actions (erros serializados)
  // Se não for nenhum → formato inesperado, tratamos como inválido
  const errorToParse =
    error instanceof Error ? error.message : typeof error === "string" ? error : null;

  if (!errorToParse) {
    return createFallbackApiError("Erro desconhecido.");
  }

  try {
    const parsed = JSON.parse(errorToParse);
    return apiErrorSchema.parse(parsed);
  } catch (parseError) {
    if (parseError instanceof ZodError) {
      return createFallbackApiError("Formato de erro inválido.");
    } else {
      return createFallbackApiError("Erro inesperado ao tratar o erro.");
    }
  }
}

export function serializeApiError(error: ApiError) {
  return JSON.stringify(error);
}

export function throwApiError(data: ThrowApiErrorProps) {
  const { error, fallbackMessage } = data;

  if (isApiError(error)) {
    throw serializeApiError(error);
  } else {
    const fallbackError = createFallbackApiError(fallbackMessage);
    throw serializeApiError(fallbackError);
  }
}
