/** @format */

import { env } from "@/constants/env";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_KEY
);
