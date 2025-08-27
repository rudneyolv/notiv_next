/** @format */

import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Insira um e-mail válido" }),
  password: z.string(),
});

export type LoginDto = z.infer<typeof LoginSchema>;
