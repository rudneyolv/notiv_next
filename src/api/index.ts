/** @format */

import { authApi } from "./auth";
import { postsApi } from "./posts";
import { usersApi } from "./users/users-api";

export const api = {
  auth: authApi,
  users: usersApi,
  posts: postsApi,
};
