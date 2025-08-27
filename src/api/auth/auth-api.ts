/** @format */

import { env } from "@/constants/env";
import { LoginFormType } from "@/schemas/admin/login-schema";
import { RegisterFormType } from "@/schemas/admin/register-schema";
import { ApiError } from "@/schemas/api-error-schema";
import { User } from "@/types/users-types";
import { utils } from "@/utils";

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
    if (utils.errors.isApiError(error)) {
      throw error as ApiError;
    } else {
      throw utils.errors.createFallbackApiError("Erro desconhecido ao efetuar login");
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
    if (utils.errors.isApiError(error)) {
      throw error as ApiError;
    } else {
      throw utils.errors.createFallbackApiError("Erro desconhecido ao registrar");
    }
  }
};

export const authApi = {
  register,
  login,
};
