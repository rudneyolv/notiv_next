/** @format */

import { z } from "zod";

export const ChangePasswordSchema = z.object({
  currentPassword: z.string({ required_error: "A senha antiga é obrigatória." }),
  newPassword: z
    .string({ required_error: "A senha é obrigatória." })
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Insira um e-mail válido" }),
  password: z.string(),
});

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
