/** @format */

import { adminUsersApi } from "@/api/admin/users-api";
import { useMutation } from "@tanstack/react-query";

const useCreateUser = () => {
  return useMutation({
    mutationFn: adminUsersApi.create,
  });
};

export const useAdminUsers = {
  create: useCreateUser,
};
