/** @format */

// schemas/api-error-schema.ts
import { z } from "zod";

export const apiErrorSchema = z.object({
  statusCode: z.number(),
  error: z.string(),
  messages: z.array(z.string()).default([]),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
