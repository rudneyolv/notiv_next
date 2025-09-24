/** @format */
"use server";

import { apiRequest } from "@/lib/api/api-request";
import { ApiError } from "@/schemas/api/api-error-schema";
import { UploadResponse } from "@/types/upload.types";

export async function uploadFile(data: FormData): Promise<UploadResponse | ApiError> {
  return apiRequest({
    endpoint: `/upload`,
    fallbackMessage: "Erro desconhecido ao fazer upload",
    requestConfig: {
      body: data,
      method: "POST",
    },
  });
}
