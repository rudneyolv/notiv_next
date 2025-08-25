/** @format */

import { env } from "@/constants/env";
import { LoginFormType } from "@/schemas/admin/login-schema";
import { RegisterFormType } from "@/schemas/admin/register-schema";
import { ApiError, ApiErrorSchema } from "@/schemas/api-schemas";
import { User, UserSchema } from "@/schemas/users-schema";
import { createFallbackApiError } from "@/utils/create-api-error";
import { isApiError } from "@/utils/is-api-error";

const login = async (data: LoginFormType) => {
  try {
    const response = await fetch(`${env.API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result as User;
  } catch (error) {
    if (isApiError(error)) {
      throw error as ApiError;
    } else {
      throw createFallbackApiError("Erro desconhecido ao efetuar login");
    }
  }
};

const register = async (data: RegisterFormType): Promise<User> => {
  try {
    const response = await fetch(`${env.API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result as User;
  } catch (error: unknown) {
    if (isApiError(error)) {
      throw error as ApiError;
    } else {
      throw createFallbackApiError("Erro desconhecido ao registrar");
    }
  }
};

export const authApi = {
  register,
  login,
};
