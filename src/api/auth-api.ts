/** @format */

import { env } from "@/constants/env";
import { LoginFormType } from "@/schemas/admin/login-schema";
import { RegisterFormType } from "@/schemas/admin/register-schema";
import { ApiError, ApiErrorSchema } from "@/schemas/api-schemas";
import { User, UserSchema } from "@/schemas/users-schema";

const login = async (data: LoginFormType) => {
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
    throw result as ApiError;
  }

  return result as User;
};

const register = async (data: RegisterFormType): Promise<User> => {
  const response = await fetch(`${env.API_URL}/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw result as ApiError;
  }

  return result as User;
};

export const authApi = {
  register,
  login,
};
