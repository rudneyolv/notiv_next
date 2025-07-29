/** @format */

import { adminAuthApi } from "@/api/admin/auth-api";
import { useMutation } from "@tanstack/react-query";

const useAdminLogin = () => {
  return useMutation({
    mutationFn: adminAuthApi.login,
  });
};

export const useAdminAuth = {
  login: useAdminLogin,
};
