/** @format */

import { Post } from "@/types/posts-types";
import {
  createNewPost,
  deletePost,
  updatePost,
  fetchAllBase,
  fetchAllMeBase,
  fetchBySlugBase,
} from "./posts-actions-api";
import { postsApiCacheOptions } from "./posts-cache";
import { ApiError } from "@/schemas/api/api-error-schema";

export const postsApi = {
  cached: {
    fetchAll: async (): Promise<Post[] | ApiError> => fetchAllBase(postsApiCacheOptions.fetchAll()),

    fetchBySlug: async (slug: string): Promise<Post | ApiError> => {
      const data = { slug, initConfig: postsApiCacheOptions.fetchBySlug(slug) };
      return await fetchBySlugBase(data);
    },
  },

  nonCached: {
    fetchAll: async (): Promise<Post[] | ApiError> => await fetchAllBase(),
    fetchAllMe: async (): Promise<Post[] | ApiError> => fetchAllMeBase(),
    fetchBySlug: async (slug: string): Promise<Post | ApiError> => await fetchBySlugBase({ slug }),
  },

  create: createNewPost,
  update: updatePost,
  delete: deletePost,
};
