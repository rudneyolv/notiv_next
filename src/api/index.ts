/** @format */

import { authApi } from "./auth";
import { postsApi } from "./posts";
import { usersApi } from "./users";

export const api = {
  auth: authApi,
  users: usersApi,
  posts: postsApi,
};
