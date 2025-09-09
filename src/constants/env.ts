/** @format */

import { z } from "zod/v4";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().default("http://localhost:3001"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().default(""),
  NEXT_PUBLIC_SUPABASE_KEY: z.string().default(""),
  NEXT_PUBLIC_SUPABASE_PROJECT_ID: z.string().default(""),
});

export const env = envSchema.parse(process.env);
