/** @format */

import { z } from "zod/v4";

export const ApiErrorSchema = z.object({
  messages: z.array(z.string()),
  error: z.string(),
  statusCode: z.number(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;
