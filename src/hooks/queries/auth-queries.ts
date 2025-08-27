/** @format */

import { api } from "@/api";
import { LoginFormType } from "@/schemas/admin/login-schema";
import { RegisterFormType } from "@/schemas/admin/register-schema";
import { ApiError } from "@/schemas/api-error-schema";
import { User } from "@/types/users-types";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation<User, ApiError, LoginFormType>({
    mutationFn: api.auth.login,
  });
};

const useRegister = () => {
  return useMutation<User, ApiError, RegisterFormType>({
    mutationFn: api.auth.register,
  });
};

export const useAuth = {
  login: useLogin,
  register: useRegister,
};
