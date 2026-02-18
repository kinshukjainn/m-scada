import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Replace with your actual Lambda Function URL
    const LAMBDA_FUNCTION_URL = process.env.LAMBDA_URL;

    if (!LAMBDA_FUNCTION_URL) {
      return NextResponse.json(
        { error: "Lambda URL configuration missing" },
        { status: 500 },
      );
    }

    // Call the Lambda Function URL
    const lambdaResponse = await fetch(LAMBDA_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parameters: body }),
    });

    if (!lambdaResponse.ok) {
      throw new Error(`Lambda returned status: ${lambdaResponse.status}`);
    }

    const data = await lambdaResponse.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("API Route Error:", error);
    // Safely narrow down the 'unknown' type to an Error object
    const errorMessage =
      error instanceof Error ? error.message : "Failed to process request";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
