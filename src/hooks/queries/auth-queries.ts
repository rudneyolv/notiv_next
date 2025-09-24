/** @format */

import { api } from "@/api";
import { LoginDto } from "@/schemas/auth/login-schema";
import { RegisterDto } from "@/schemas/auth/register-schema";
import { ApiError } from "@/schemas/api/api-error-schema";
import { User } from "@/types/users-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdatePasswordDto } from "@/schemas/auth/update-password-schema";
import { UpdateEmailDto } from "@/schemas/auth/update-email-schema";
import { utils } from "@/utils";
import { SessionStatus } from "@/types/auth-types";

const useValidateSession = () => {
  return useQuery<SessionStatus, ApiError>({
    queryFn: async () => {
      const result = await api.auth.validateSession();
      if (utils.errors.isApiError(result)) throw result;
      return result;
    },
    queryKey: ["logged"],
    gcTime: 86400000, // 1 dia
    staleTime: 86400000, // 1 dia
    retry: 0,
  });
};

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, LoginDto>({
    mutationFn: async (LoginDto) => {
      const result = await api.auth.login(LoginDto);
      if (utils.errors.isApiError(result)) throw result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logged"] });
    },
  });
};

const useRegister = () => {
  return useMutation<User, ApiError, RegisterDto>({
    mutationFn: async (RegisterDto) => {
      const result = await api.auth.register(RegisterDto);
      if (utils.errors.isApiError(result)) throw result;
      return result;
    },
  });
};

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, null>({
    mutationFn: async () => {
      const result = await api.auth.logout();
      if (utils.errors.isApiError(result)) throw result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logged"] });
    },
  });
};

const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, UpdatePasswordDto>({
    mutationFn: async (updatePasswordDto) => {
      const result = await api.auth.updatePassword(updatePasswordDto);
      if (utils.errors.isApiError(result)) throw result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logged"] });
    },
  });
};

const useUpdateEmail = () => {
  return useMutation<void, ApiError, UpdateEmailDto>({
    mutationFn: async (UpdateEmailDto) => {
      const result = await api.auth.updateEmail(UpdateEmailDto);
      if (utils.errors.isApiError(result)) throw result;
    },
  });
};

export const useAuth = {
  login: useLogin,
  register: useRegister,
  logout: useLogout,
  updatePassword: useUpdatePassword,
  updateEmail: useUpdateEmail,
  validateSession: useValidateSession,
};
