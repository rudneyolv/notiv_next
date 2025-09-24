/** @format */
"use server";

import { apiRequest } from "@/lib/api/api-request";
import { createSupabaseServer } from "@/lib/supabase/supabase-server";
import { UpdatePasswordDto, UpdatePasswordSchema } from "@/schemas/auth/update-password-schema";
import { UpdateEmailDto, UpdateEmailSchema } from "@/schemas/auth/update-email-schema";

import { LoginDto } from "@/schemas/auth/login-schema";
import { RegisterDto } from "@/schemas/auth/register-schema";
import { User } from "@/types/users-types";
import { utils } from "@/utils";
import { ApiError } from "@/schemas/api/api-error-schema";
import { SessionStatus } from "@/types/auth-types";

//TODO: Melhorar validação de sessão
export const validateSession = async (): Promise<SessionStatus | ApiError> => {
  try {
    const supabase = await createSupabaseServer();
    const { data } = await supabase.auth.getUser();
    return { logged: data.user ? true : false };
  } catch (error: unknown) {
    console.log("Erro desconhecido ao validar sessão", error);
    return utils.errors.handleApiError({ error, fallbackMessage: "Erro ao validar sessão" });
  }
};

export const login = async (data: LoginDto): Promise<void | ApiError> => {
  try {
    const supabase = await createSupabaseServer();

    const { error: supabaseError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (supabaseError) {
      return utils.errors.formatSupabaseError(supabaseError);
    }
  } catch (error) {
    console.log("Erro desconhecido ao efetuar login", error);
    return utils.errors.handleApiError({
      error,
      fallbackMessage: "Erro desconhecido ao efetuar login",
    });
  }
};

export const register = async (data: RegisterDto): Promise<User | ApiError> => {
  return apiRequest({
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
};

export const logout = async (): Promise<void | ApiError> => {
  try {
    const supabase = await createSupabaseServer();
    const { error: supabaseError } = await supabase.auth.signOut({ scope: "global" });

    if (supabaseError) {
      return utils.errors.formatSupabaseError(supabaseError);
    }
  } catch (error: unknown) {
    console.log("Erro desconhecido ao sair da conta", error);

    return utils.errors.handleApiError({
      error,
      fallbackMessage: "Erro desconhecido ao sair da conta",
    });
  }
};

export const updatePassword = async (data: UpdatePasswordDto): Promise<void | ApiError> => {
  try {
    const parseDtoResult = UpdatePasswordSchema.safeParse(data);

    if (!parseDtoResult.success) {
      return utils.errors.createApiError({
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
      return utils.errors.formatSupabaseError(getUserError);
    }

    if (!user?.email) {
      return utils.errors.createApiError({ message: "Sessão inválida. Faça login novamente." });
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

      return utils.errors.createApiError({
        message: message,
        error: signInPasswordError.code,
        statusCode: signInPasswordError.status,
      });
    }

    const { error: updatePasswordError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updatePasswordError) {
      return utils.errors.formatSupabaseError(updatePasswordError);
    }

    await logout();
  } catch (error: unknown) {
    console.log("Erro desconhecido ao alterar senha", error);
    return utils.errors.handleApiError({
      error,
      fallbackMessage: "Erro desconhecido ao alterar senha",
    });
  }
};

export const updateEmail = async (data: UpdateEmailDto): Promise<void | ApiError> => {
  try {
    const parseDtoResult = UpdateEmailSchema.safeParse(data);

    if (!parseDtoResult.success) {
      return utils.errors.createApiError({
        message: parseDtoResult.error.errors[0].message ?? "Erro desconhecido ao validar campos",
        error: parseDtoResult.error.message,
      });
    }

    const supabase = await createSupabaseServer();

    const { error: supabaseError } = await supabase.auth.updateUser({ email: data.newEmail });

    if (supabaseError) {
      const message =
        supabaseError.code === "email_address_invalid"
          ? "O e-mail deve ser válido."
          : supabaseError.message;

      return utils.errors.createApiError({
        message: message,
        error: supabaseError.code,
        statusCode: supabaseError.status,
      });
    }
  } catch (error: unknown) {
    console.log("Erro desconhecido ao alterar email", error);

    return utils.errors.handleApiError({
      error,
      fallbackMessage: "Erro desconhecido ao alterar email",
    });
  }
};
