/** @format */

import { useAuth } from "./auth-queries";
import { usePosts } from "./posts-queries";
import { useUploads } from "./uploads-queries";
import { useUsers } from "./users-queries";

export const useApiQueries = {
  auth: useAuth,
  users: useUsers,
  posts: usePosts,
  upload: useUploads,
};
