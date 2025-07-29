/** @format */

import { adminAuthApi } from "@/api/admin/auth/auth-api";
import { useMutation } from "@tanstack/react-query";

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: adminAuthApi.login,
  });
};

export const useAdminAuth = {
  login: useAdminLogin,
};
