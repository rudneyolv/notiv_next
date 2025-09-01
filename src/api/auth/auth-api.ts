/** @format */

import { env } from "@/constants/env";
import { LoginDto } from "@/schemas/auth/login-schema";
import { RegisterDto } from "@/schemas/auth/register-schema";
import { User } from "@/types/users-types";
import { utils } from "@/utils";

export const validateSession = async (): Promise<{ logged: boolean }> => {
  try {
    const response = await fetch(`${env.API_URL}/auth/validate-session`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    console.log(result);

    if (!response.ok) {
      throw result;
    }

    return result as { logged: boolean };
  } catch (error: unknown) {
    throw utils.errors.throwApiError({ error, fallbackMessage: "Erro ao checar login" });
  }
};

export const authLogin = async (data: LoginDto): Promise<User> => {
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
    throw utils.errors.throwApiError({
      error,
      fallbackMessage: "Erro desconhecido ao efetuar login",
    });
  }
};

export const authRegister = async (data: RegisterDto): Promise<User> => {
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
    throw utils.errors.throwApiError({
      error,
      fallbackMessage: "Erro desconhecido ao registrar",
    });
  }
};
