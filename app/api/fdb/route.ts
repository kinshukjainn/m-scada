import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Make sure to opt-out of static caching so this route always fetches fresh data
export const dynamic = "force-dynamic";

export async function GET() {
  // Grab the environment variables securely on the server
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "Server Configuration Error: Missing Supabase keys." },
      { status: 500 },
    );
  }

  // Initialize the Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Fetch data from Supabase
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });

    // Handle Supabase-specific errors
    if (error) {
      console.error("Supabase Query Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send successful data back to the browser
    return NextResponse.json(data);
  } catch (err: unknown) {
    // Handle unexpected server errors
    const message =
      err instanceof Error ? err.message : "Unknown server error occurred.";
    console.error("API Route Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
