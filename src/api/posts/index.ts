/** @format */

import { Post } from "@/types/posts-types";
import {
  createNewPost,
  deletePost,
  editPost,
  fetchAllBase,
  fetchAllMeBase,
  fetchBySlugBase,
} from "./posts-actions-api";
import { postsApiCacheOptions } from "./posts-cache";

export const postsApi = {
  cached: {
    fetchAll: async (): Promise<Post[]> => await fetchAllBase(postsApiCacheOptions.fetchAll()),

    fetchBySlug: async (slug: string): Promise<Post> => {
      const data = { slug, initConfig: postsApiCacheOptions.fetchBySlug(slug) };
      return await fetchBySlugBase(data);
    },
  },

  nonCached: {
    fetchAll: async (): Promise<Post[]> => await fetchAllBase(),
    fetchAllMe: async (): Promise<Post[]> => await fetchAllMeBase(),
    fetchBySlug: async (slug: string): Promise<Post> => await fetchBySlugBase({ slug }),
  },

  create: createNewPost,
  edit: editPost,
  delete: deletePost,
};
