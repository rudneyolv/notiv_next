/** @format */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";

//------------------ GET ------------------
const useFetchAllme = () => {
  return useQuery({
    queryFn: api.posts.nonCached.fetchAllMe,
    queryKey: ["my-posts"],
    gcTime: 100000,
    staleTime: 100000,
  });
};

const useFetchPostBySlug = (slug: string) => {
  return useQuery({
    queryFn: () => api.posts.nonCached.fetchBySlug(slug),
    queryKey: ["post", slug],
    gcTime: 5000,
    staleTime: 5000,
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
    onSuccess: (data) => {
      revalidateCustomTag("delete-post");
      revalidateCustomTag(`post-${data.slug}`);

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
