/** @format */
"use server";

import { env } from "@/constants/env";
import { apiRequest } from "@/lib/api/api-request";
import { createSupabaseServer } from "@/lib/supabase/supabase-server";
import { LoginDto } from "@/schemas/auth/login-schema";
import { RegisterDto } from "@/schemas/auth/register-schema";
import { User } from "@/types/users-types";
import { utils } from "@/utils";

export const validateSession = async (): Promise<{ logged: boolean }> => {
  try {
    const supabase = await createSupabaseServer();
    const { data } = await supabase.auth.getUser();

    return { logged: data.user ? true : false };
  } catch (error: unknown) {
    throw utils.errors.handleApiError({ error, fallbackMessage: "Erro ao checar login" });
  }
};

export const authLogin = async (data: LoginDto): Promise<void> => {
  try {
    const supabase = await createSupabaseServer();

    const { error: supabaseError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (supabaseError) {
      throw utils.errors.createApiError({
        message: supabaseError.message,
        statusCode: supabaseError.status,
        error: supabaseError.code,
      });
    }

    return;
  } catch (error) {
    throw utils.errors.handleApiError({
      error,
      fallbackMessage: "Erro desconhecido ao efetuar login",
    });
  }
};

export const authRegister = async (data: RegisterDto): Promise<User> => {
  const result: User = await apiRequest({
    requireAuth: false,
    endpoint: "/users",
    requestConfig: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    },
    fallbackMessage: "Erro desconhecido ao registrar",
  });

  return result;
};

export const authLogout = async (): Promise<void> => {
  try {
    const supabase = await createSupabaseServer();
    const { error: supabaseError } = await supabase.auth.signOut({ scope: "global" });

    if (supabaseError) {
      throw utils.errors.createApiError({
        message: supabaseError.message,
        statusCode: supabaseError.status,
        error: supabaseError.code,
      });
    }

    return;
  } catch (error: unknown) {
    throw utils.errors.handleApiError({
      error,
      fallbackMessage:
        error instanceof Error ? error.message : "Erro desconhecido ao sair da conta",
    });
  }
};
