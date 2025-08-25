/** @format */
import { revalidateCustomTag } from "@/actions/cache.actions";
import { CreatePostDto, Post, UpdatePostDto } from "@/types/posts-types";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { api } from "@/api";
import { ApiError } from "@/types/api-types";
import { FormPostData } from "@/schemas/admin/posts/new-post-schema";

const useFetchAllme = (): UseQueryResult<Post[], ApiError> => {
  return useQuery({
    queryFn: api.posts.nonCached.fetchAllMe,
    queryKey: ["my-posts"],
    gcTime: 100000,
    staleTime: 100000,
  });
};

const useCreateNewPost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, ApiError, CreatePostDto, void>({
    mutationFn: api.posts.create,
    onSuccess: () => {
      revalidateCustomTag("create-post");
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
  });
};

const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, ApiError, UpdatePostDto, FormPostData>({
    mutationFn: api.posts.edit,
    onSuccess: (data) => {
      revalidateCustomTag(`post-${data.slug}`);
      revalidateCustomTag("edit-post");

      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", data.slug] });
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.posts.delete,
    // Neste caso, postId é o variables do tanstack query
    onSuccess: (data) => {
      revalidateCustomTag("delete-post");
      revalidateCustomTag(`post-${data.slug}`);

      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", data.slug] });
    },
  });
};

const useFetchPostBySlug = (slug: string): UseQueryResult<Post, Error> => {
  return useQuery({
    queryFn: () => api.posts.nonCached.fetchBySlug(slug),
    queryKey: ["post", slug],
    gcTime: 5000,
    staleTime: 5000,
  });
};

export const usePosts = {
  fetchAllMe: useFetchAllme,
  create: useCreateNewPost,
  delete: useDeletePost,
  edit: useEditPost,
  fetchBySlug: useFetchPostBySlug,
};
