/** @format */

import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório." })
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  email: z
    .string({ required_error: "O e-mail é obrigatório." })
    .email({ message: "O e-mail deve ser válido." }),
  password: z
    .string({ required_error: "A senha é obrigatória." })
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
