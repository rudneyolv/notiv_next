/** @format */

import { api } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetCurrentUser = () => {
  return useQuery({
    queryFn: api.users.current.get,
    queryKey: ["current-user"],
    gcTime: 100000,
    staleTime: 100000,
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
