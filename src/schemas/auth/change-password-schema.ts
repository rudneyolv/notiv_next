/** @format */

import { z } from "zod";

export const ChangePasswordSchema = z.object({
  currentPassword: z.string({ message: "A senha antiga é obrigatória." }),
  newPassword: z
    .string({ message: "A senha é obrigatória." })
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
});

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
