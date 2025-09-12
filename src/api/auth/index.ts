/** @format */

import { updatePassword, login, logout, register, validateSession, updateEmail } from "./auth-api";

export const authApi = {
  register: register,
  login: login,
  validateSession: validateSession,
  logout: logout,
  updatePassword: updatePassword,
  updateEmail: updateEmail,
};
