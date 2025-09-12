/** @format */

import { getCurrentUser, updateProfile } from "./users-api";

export const usersApi = {
  current: {
    get: getCurrentUser,
    update: updateProfile,
  },
};
