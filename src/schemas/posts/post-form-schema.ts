/** @format */

import { z } from "zod";

export const PostFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: "O título deve ter no mínimo 5 caracteres." })
    .max(100, { message: "O título deve ter no máximo 100 caracteres." }),

  summary: z
    .string()
    .min(10, { message: "O resumo deve ter no mínimo 10 caracteres." })
    .max(300, { message: "O resumo deve ter no máximo 300 caracteres." }),

  content: z
    .string()
    .min(30, { message: "O conteúdo deve ter pelo menos 30 caracteres." })
    .max(20_000, { message: "O conteúdo é muito longo." }),

  image: z.union([z.instanceof(File), z.string()]).nullable(),

  published: z.boolean(),
});

export type PostFormData = z.infer<typeof PostFormSchema>;
