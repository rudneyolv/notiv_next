/** @format */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";

//------------------ GET ------------------
const useFetchAllme = () => {
  return useQuery({
    queryFn: api.posts.nonCached.fetchAllMe,
    queryKey: ["my-posts"],
    staleTime: 1000 * 60 * 60 * 24, // 1 dia
    gcTime: 1000 * 60 * 60 * 24, // 1 dia
  });
};

const useFetchPostBySlug = (slug: string) => {
  return useQuery({
    queryFn: () => api.posts.nonCached.fetchBySlug(slug),
    queryKey: ["post", slug],
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });
};

//------------------ POST ------------------
const useCreateNewPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.posts.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
  });
};

//------------------ PATCH ------------------
const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.posts.edit,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", data.slug] });
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.posts.delete,
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
  edit: useEditPost,
};
