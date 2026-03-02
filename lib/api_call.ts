// =========================
// Types
// =========================

export interface TelemetryPayload {
  "Phase A Voltage (Volts)": number;
  "Phase B Voltage (Volts)": number;
  "Phase C Voltage (Volts)": number;
  "Phase A Current (Amps)": number;
  "Phase B Current (Amps)": number;
  "Phase C Current (Amps)": number;
  "Positive Sequence Current (Amps)": number;
  "Negative Sequence Current (Amps)": number;
  "Zero Sequence Current (Amps)": number;
  "Total Active Power (kW)": number;
  "Total Reactive Power (kVAR)": number;
}

export interface DiagnosticResponse {
  status: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "NORMAL";
  confidence: number;
  fault_localization: string;
  diagnostic_reasoning: string[];
  analysis: string;
  recommended_actions: { action: string; urgency: string }[];
}

// =========================
// Environment Helper
// =========================

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? "";

// =========================
// API Call
// =========================

export async function runDiagnosticAnalysis(
  payload: TelemetryPayload,
): Promise<DiagnosticResponse> {
  const response = await fetch(API_GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("AWS Error Response:", errorText);
    throw new Error(
      errorText || `Request failed with status ${response.status}`,
    );
  }

  // Strongly type the JSON response
  const data: DiagnosticResponse = await response.json();

  return data;
}
