/** @format */

import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Insira um e-mail válido" }),
  password: z.string(),
});

export type RegisterFormType = z.infer<typeof RegisterSchema>;
