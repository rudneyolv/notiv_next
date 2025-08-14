/** @format */

import { api } from "@/api";
import { RegisterFormType } from "@/schemas/admin/register-schema";
import { ApiError } from "@/schemas/api-schemas";
import { User } from "@/schemas/users-schema";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation({
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
