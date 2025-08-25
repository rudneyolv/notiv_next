/** @format */

import { authApi } from "./auth/auth-api";
import { postsApi } from "./posts/posts-api";
import { uploadsApi } from "./uploads/uploads-api";
import { usersApi } from "./users/users-api";

export const api = {
  auth: authApi,
  users: usersApi,
  posts: postsApi,
  uploads: uploadsApi,
};
