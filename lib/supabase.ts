import { createClient } from "@supabase/supabase-js";

// 1. Grab the exact variables from your .env file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

// 2. Add a safety check to throw a clear error if they are missing
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables! Check your .env file.",
  );
}

// 3. Create and export the client
export const supabase = createClient(supabaseUrl, supabaseKey);
