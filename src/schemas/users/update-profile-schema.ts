/** @format */

import { z } from "zod";

export const UpdateProfileSchema = z.object({
  name: z
    .string({ message: "O nome deve ser um texto válido." })
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
});

export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
