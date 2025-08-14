/** @format */

import { authApi } from "./auth-api";
import { postsApi } from "./posts-api";
import { usersApi } from "./users-api";

export const api = {
  auth: authApi,
  users: usersApi,
  posts: postsApi,
};
