/** @format */

"use server";

import { clientEnv } from "@/constants/env";
import { createSupabaseServer } from "@/lib/supabase/supabase-server";
import { ApiError } from "@/schemas/api/api-error-schema";
import { utils } from "@/utils";

export async function apiRequest<T>(data: {
  endpoint: string;
  fallbackMessage: string;
  requestConfig?: RequestInit;
  requireAuth?: boolean;
}): Promise<T | ApiError> {
  const { endpoint, fallbackMessage, requestConfig: initConfig, requireAuth = true } = data;

  try {
    const url = `${clientEnv.NEXT_PUBLIC_API_URL}${
      endpoint.startsWith("/") ? endpoint : `/${endpoint}`
    }`;

    let headers: HeadersInit = {
      ...initConfig?.headers,
    };

    if (requireAuth) {
      const supabase = await createSupabaseServer();

      const {
        data: { session },
        error: supabaseError,
      } = await supabase.auth.getSession();

      if (supabaseError) {
        return utils.errors.createApiError({
          message: supabaseError.message,
          statusCode: supabaseError.status,
          error: supabaseError.code,
        });
      }

      if (!session) {
        return utils.errors.createApiError({
          message: "Você precisa estar autenticado",
        });
      }

      headers = {
        ...headers,
        Authorization: `Bearer ${session.access_token}`,
      };
    }

    const config: RequestInit = {
      ...initConfig,
      headers,
    };

    const response = await fetch(url, config);

    const result = await response.json();

    if (!response.ok) {
      return utils.errors.handleApiError({
        error: result,
        fallbackMessage,
      });
    }

    return result as T;
  } catch (error: unknown) {
    console.log("🔴 - Erro desconhecido na requisição", error);

    return utils.errors.handleApiError({
      error,
      fallbackMessage,
    });
  }
}
