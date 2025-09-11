/** @format */

import { changePassword, login, logout, register, validateSession } from "./auth-api";

export const authApi = {
  register: register,
  login: login,
  validateSession: validateSession,
  logout: logout,
  changePassword: changePassword,
};
