/** @format */
"use server";

import { apiRequest } from "@/lib/api/api-request";

export async function uploadFile(data: FormData): Promise<string> {
  const result: { url: string } = await apiRequest({
    endpoint: `/upload`,
    fallbackMessage: "Erro desconhecido ao fazer upload",
    requestConfig: {
      body: data,
      method: "POST",
    },
  });

  return result.url as string;
}
