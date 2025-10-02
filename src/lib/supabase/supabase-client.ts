/** @format */

import { clientEnv } from "@/constants/env";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  clientEnv.NEXT_PUBLIC_SUPABASE_URL,
  clientEnv.NEXT_PUBLIC_SUPABASE_KEY
);
