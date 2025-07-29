/** @format */

import { env } from "@/constants/env";
import { LoginFormType } from "@/schemas/admin/login-schema";

const login = async (data: LoginFormType) => {
  const response = await fetch(`${env.API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro desconhecido ao efetuar login");
  }
};

export const adminAuthApi = {
  login,
};
