/** @format */

import { NextCacheConfig } from "@/types/cache-types";

export const postsApiCacheOptions = {
  fetchAll: (): NextCacheConfig => ({
    cache: "force-cache",
    next: {
      revalidate: 100,
      tags: ["posts", "delete-post", "edit-post", "create-post"],
    },
  }),

  fetchBySlug: (slug: string): NextCacheConfig => ({
    cache: "force-cache",
    next: {
      revalidate: 100,
      tags: [`post-${slug}`],
    },
  }),
};
