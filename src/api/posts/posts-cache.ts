/** @format */

import { NextCacheConfig } from "@/types/cache-types";

export const postsApiCacheTags = {
  posts: (): "posts" => "posts",
  deletePost: (): "delete-post" => "delete-post",
  updatePost: (): "update-post" => "update-post",
  createPost: (): "create-post" => "create-post",
  slug: (slug: string): `post-${string}` => `post-${slug}`,
};

export const postsApiCacheOptions = {
  fetchAll: (): NextCacheConfig => ({
    cache: "force-cache",
    next: {
      revalidate: 1000,
      tags: [
        postsApiCacheTags.posts(),
        postsApiCacheTags.deletePost(),
        postsApiCacheTags.updatePost(),
        postsApiCacheTags.createPost(),
      ],
    },
  }),

  fetchBySlug: (slug: string): NextCacheConfig => ({
    cache: "force-cache",
    next: {
      revalidate: 1000,
      tags: [postsApiCacheTags.slug(slug)],
    },
  }),
};
