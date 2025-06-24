/** @format */

import { revalidateCustomTag } from "@/actions/cache.actions";
import { createNewPost } from "@/api/requets/admin/admin-requests";
import { useMutation } from "@tanstack/react-query";

export const useCreateNewPost = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewPost,
    onSuccess: () => {
      revalidateCustomTag("new-post");
    },
  });

  return { mutate, isPending, isError, error };
};
