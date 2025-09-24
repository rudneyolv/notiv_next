/** @format */

import { z } from "zod/v4";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().default("http://localhost:3001"),
  NEXT_PUBLIC_FRONTEND_URL: z.string().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().default(""),
  NEXT_PUBLIC_SUPABASE_KEY: z.string().default(""),
  NEXT_PUBLIC_SUPABASE_PROJECT_ID: z.string().default(""),
  NEXT_PUBLIC_ALLOW_NEW_USERS: z.string().default("0"),
});

export const env = envSchema.parse(process.env);
