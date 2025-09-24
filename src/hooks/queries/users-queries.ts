/** @format */

import { api } from "@/api";
import { ApiError } from "@/schemas/api/api-error-schema";
import { UpdateProfileDto } from "@/schemas/users/update-profile-schema";
import { User } from "@/types/users-types";
import { utils } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetCurrentUser = () => {
  return useQuery<User, ApiError>({
    queryFn: async () => {
      const result = await api.users.current.get();
      if (utils.errors.isApiError(result)) throw result;
      return result;
    },
    queryKey: ["current-user"],
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<User, ApiError, UpdateProfileDto>({
    mutationFn: async (updateProfileDto) => {
      const result = await api.users.current.update(updateProfileDto);
      if (utils.errors.isApiError(result)) throw result;
      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
};

export const useUsers = {
  current: {
    get: useGetCurrentUser,
    update: useUpdateProfile,
  },
};
