/** @format */

import { revalidateCustomTag } from "@/actions/cache.actions";
import { PostDataProps } from "@/interfaces/posts/post-interface";
import { AdminPostsRepository } from "@/repository/admin-posts-repository";
import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";

const adminPostsInstance = new AdminPostsRepository();

export const useFetchPostBySlug = (slug: string): UseQueryResult<PostDataProps, Error> => {
  return useQuery({
    queryFn: () => adminPostsInstance.fetchBySlug(slug),
    queryKey: ["post", slug],
    gcTime: 5000,
    staleTime: 5000,
  });
};

export const useCreateNewPost = (): UseMutationResult<
  unknown, // resposta da mutation
  Error, // erro
  FormPostData // input
> => {
  return useMutation({
    mutationFn: adminPostsInstance.createNewPost,
    onSuccess: () => {
      revalidateCustomTag("new-post");
    },
  });
};

export const useEditPost = () => {
  return useMutation({
    mutationFn: adminPostsInstance.editPost,
    onSuccess: (variables) => {
      revalidateCustomTag(`post-${variables.id}`);
      revalidateCustomTag("edit-post");
    },
  });
};
