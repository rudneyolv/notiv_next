/** @format */

import { api } from "@/api";
import { LoginDto } from "@/schemas/auth/login-schema";
import { RegisterDto } from "@/schemas/auth/register-schema";
import { ApiError } from "@/schemas/api/api-error-schema";
import { User } from "@/types/users-types";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation<User, ApiError, LoginDto>({
    mutationFn: api.auth.login,
  });
};

const useRegister = () => {
  return useMutation<User, ApiError, RegisterDto>({
    mutationFn: api.auth.register,
  });
};

export const useAuth = {
  login: useLogin,
  register: useRegister,
};
