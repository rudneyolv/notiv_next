/** @format */
"use server";

import { apiRequest } from "@/lib/api/api-request";
import { createSupabaseServer } from "@/lib/supabase/supabase-server";
import { ChangePasswordDto, ChangePasswordSchema } from "@/schemas/auth/change-password-schema";
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

export const login = async (data: LoginDto): Promise<void> => {
  try {
    const supabase = await createSupabaseServer();

    const { error: supabaseError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (supabaseError) {
      throw utils.errors.formatSupabaseError(supabaseError);
    }
  } catch (error) {
    throw utils.errors.handleApiError({
      error,
      fallbackMessage: "Erro desconhecido ao efetuar login",
    });
  }
};

export const register = async (data: RegisterDto): Promise<User> => {
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

export const logout = async (): Promise<void> => {
  try {
    const supabase = await createSupabaseServer();
    const { error: supabaseError } = await supabase.auth.signOut({ scope: "global" });

    if (supabaseError) {
      throw utils.errors.formatSupabaseError(supabaseError);
    }
  } catch (error: unknown) {
    throw utils.errors.handleApiError({
      error,
      fallbackMessage:
        error instanceof Error ? error.message : "Erro desconhecido ao sair da conta",
    });
  }
};

export const changePassword = async (data: ChangePasswordDto) => {
  try {
    const parseDtoResult = ChangePasswordSchema.safeParse(data);

    if (!parseDtoResult.success) {
      throw utils.errors.createApiError({
        message: parseDtoResult.error.errors[0].message ?? "Erro desconhecido ao validar campos",
        error: parseDtoResult.error.message,
      });
    }

    const { newPassword, currentPassword } = parseDtoResult.data;
    const supabase = await createSupabaseServer();

    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser();

    if (getUserError) {
      throw utils.errors.formatSupabaseError(getUserError);
    }

    if (!user?.email) {
      throw new Error("Sessão inválida. Faça login novamente.");
    }

    const { error: signInPasswordError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInPasswordError) {
      const message =
        signInPasswordError.code === "invalid_credentials"
          ? "Senha atual inválida"
          : signInPasswordError.message;

      throw utils.errors.createApiError({
        message: message,
        error: signInPasswordError.code,
        statusCode: signInPasswordError.status,
      });
    }

    const { error: updatePasswordError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updatePasswordError) {
      throw utils.errors.formatSupabaseError(updatePasswordError);
    }

    await logout();
  } catch (error: unknown) {
    throw utils.errors.handleApiError({
      error,
      fallbackMessage:
        error instanceof Error ? error.message : "Erro desconhecido ao alterar senha",
    });
  }
};
