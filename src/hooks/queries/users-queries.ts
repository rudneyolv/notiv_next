/** @format */

import { api } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetCurrentUser = () => {
  return useQuery({
    queryFn: api.users.current.get,
    queryKey: ["current-user"],
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.users.current.update,
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
