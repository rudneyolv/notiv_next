/** @format */

import { env } from "@/constants/env";
import { ApiError } from "@/types/api-types";
import { createFallbackApiError } from "@/utils/create-api-error";
import { isApiError } from "@/utils/is-api-error";

async function uploadFile(data: FormData) {
  try {
    const response = await fetch(`${env.API_URL}/upload`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) throw result;

    return result.url as string;
  } catch (error: unknown) {
    if (isApiError(error)) {
      throw error as ApiError;
    } else {
      throw createFallbackApiError("Erro desconhecido ao fazer upload");
    }
  }
}

export const uploadsApi = {
  uploadFile,
};
