/** @format */

// import { env } from "@/constants/env";
// import { RegisterFormType } from "@/schemas/admin/register-schema";

// const create = async (data: RegisterFormType) => {
//   const response = await fetch(`${env.API_URL}/users`, {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || "Erro desconhecido ao registrar");
//   }
// };

export const usersApi = {};
