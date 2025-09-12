/** @format */

import { z } from "zod";

export const UpdateEmailSchema = z.object({
  newEmail: z
    .string({ required_error: "O e-mail é obrigatório." })
    .email({ message: "O e-mail deve ser válido." }),
});

export type UpdateEmailDto = z.infer<typeof UpdateEmailSchema>;
