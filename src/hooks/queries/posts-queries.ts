/** @format */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { utils } from "@/utils";
import { CreatePostDto, Post, UpdatePostDto } from "@/types/posts-types";
import { ApiError } from "@/schemas/api/api-error-schema";

//------------------ GET ------------------
const useFetchAllme = () => {
  return useQuery<Post[], ApiError>({
    queryFn: async () => {
      const result = await api.posts.nonCached.fetchAllMe();
      if (utils.errors.isApiError(result)) throw result;
      return result;
    },
    queryKey: ["my-posts"],
    staleTime: 1000 * 60 * 60 * 24, // 1 dia
    gcTime: 1000 * 60 * 60 * 24, // 1 dia
    retry: 1,
  });
};

const useFetchPostBySlug = (slug: string) => {
  return useQuery<Post, ApiError>({
    queryFn: async () => {
      const result = await api.posts.nonCached.fetchBySlug(slug);
      if (utils.errors.isApiError(result)) throw result;
      return result;
    },
    queryKey: ["post", slug],
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });
};

//------------------ POST ------------------
const useCreateNewPost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, ApiError, CreatePostDto>({
    mutationFn: async (createPostDto) => {
      const result = await api.posts.create(createPostDto);
      if (utils.errors.isApiError(result)) throw result;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
  });
};

//------------------ PATCH ------------------
const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, ApiError, UpdatePostDto>({
    mutationFn: async (UpdatePostDto) => {
      const result = await api.posts.update(UpdatePostDto);
      if (utils.errors.isApiError(result)) throw result;
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", data.slug] });
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, ApiError, string>({
    mutationFn: async (postId) => {
      const result = await api.posts.delete(postId);
      if (utils.errors.isApiError(result)) throw result;
      return result;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", data.slug] });
    },
  });
};

export const usePosts = {
  fetchAllMe: useFetchAllme,
  fetchBySlug: useFetchPostBySlug,

  create: useCreateNewPost,

  delete: useDeletePost,
  update: useUpdatePost,
};
