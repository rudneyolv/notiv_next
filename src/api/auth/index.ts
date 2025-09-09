/** @format */

import { authLogin, authLogout, authRegister, validateSession } from "./auth-api";

export const authApi = {
  register: authRegister,
  login: authLogin,
  validateSession: validateSession,
  logout: authLogout,
};
