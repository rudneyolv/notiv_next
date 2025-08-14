/** @format */
import { revalidateCustomTag } from "@/actions/cache.actions";
import { PostDataProps } from "@/interfaces/posts/post-interface";
import { FormPostData } from "@/schemas/admin/posts/new-post-schema";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { adminPostsApi } from "@/api/admin/posts-api";

const useCreateNewPost = (): UseMutationResult<
  unknown, // resposta da mutation
  Error, // erro
  FormPostData // input
> => {
  return useMutation({
    mutationFn: adminPostsApi.create,
    onSuccess: () => {
      revalidateCustomTag("new-post");
    },
  });
};

const useEditPost = () => {
  return useMutation({
    mutationFn: adminPostsApi.edit,
    onSuccess: (_data, variables) => {
      revalidateCustomTag(`post-${variables.id}`);
      revalidateCustomTag("edit-post");
    },
  });
};

const useDeletePost = () => {
  return useMutation({
    mutationFn: adminPostsApi.delete,
    onSuccess: (_data, variables) => {
      revalidateCustomTag("delete-post");
      revalidateCustomTag(`post-${variables}`);
    },
  });
};

const useFetchPostBySlug = (slug: string): UseQueryResult<PostDataProps, Error> => {
  return useQuery({
    queryFn: () => adminPostsApi.fetchBySlug(slug),
    queryKey: ["post", slug],
    gcTime: 5000,
    staleTime: 5000,
  });
};

export const usePosts = {
  create: useCreateNewPost,
  delete: useDeletePost,
  edit: useEditPost,
  fetchBySlug: useFetchPostBySlug,
};
