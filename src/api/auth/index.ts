/** @format */

import { authLogin, authRegister, validateSession } from "./auth-api";

export const authApi = {
  register: authRegister,
  login: authLogin,
  validateSession: validateSession,
};
