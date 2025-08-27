/** @format */
"use server";

import { env } from "@/constants/env";
import { ApiError } from "@/schemas/api/api-error-schema";
import { utils } from "@/utils";
import { cookies } from "next/headers";

export async function uploadFile(data: FormData): Promise<string> {
  const cookiesStore = await cookies();

  try {
    const response = await fetch(`${env.API_URL}/upload`, {
      method: "POST",
      body: data,
      headers: {
        Cookie: cookiesStore.toString(),
      },
    });

    const result = await response.json();

    if (!response.ok) throw result;

    return result.url as string;
  } catch (error: unknown) {
    if (utils.errors.isApiError(error)) {
      throw error as ApiError;
    } else {
      throw utils.errors.createFallbackApiError("Erro desconhecido ao fazer upload");
    }
  }
}
