/** @format */

import { api } from "@/api";
import { LoginDto } from "@/schemas/auth/login-schema";
import { RegisterDto } from "@/schemas/auth/register-schema";
import { ApiError } from "@/schemas/api/api-error-schema";
import { User } from "@/types/users-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangePasswordDto } from "@/schemas/auth/change-password-schema";

const useValidateSession = () => {
  return useQuery({
    queryFn: api.auth.validateSession,
    queryKey: ["logged"],
    gcTime: 86400000, // 1 dia
    staleTime: 86400000, // 1 dia
    retry: 0,
  });
};

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, LoginDto>({
    mutationFn: api.auth.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logged"] });
    },
  });
};

const useRegister = () => {
  return useMutation<User, ApiError, RegisterDto>({
    mutationFn: api.auth.register,
  });
};

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, null>({
    mutationFn: api.auth.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logged"] });
    },
  });
};

const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, ChangePasswordDto>({
    mutationFn: api.auth.changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logged"] });
    },
  });
};

export const useAuth = {
  validateSession: useValidateSession,
  login: useLogin,
  register: useRegister,
  logout: useLogout,
  changePassword: useChangePassword,
};
