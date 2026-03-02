/**
 * Electrical Diagnostic Data Type
 * Represents comprehensive electrical system measurements and analysis
 */

export interface DiagnosticData {
  // Voltage parameters
  voltage: {
    current: number; // Current voltage (V)
    min: number; // Minimum voltage in cycle (V)
    max: number; // Maximum voltage in cycle (V)
    rms: number; // RMS voltage (V)
  };

  // Current parameters
  current: {
    total: number; // Total current (A)
    peak: number; // Peak current (A)
    rms: number; // RMS current (A)
    phaseA?: number; // Phase A current (A)
    phaseB?: number; // Phase B current (A)
    phaseC?: number; // Phase C current (A)
  };

  // Power measurements
  power: {
    real: number; // Real power (W)
    reactive: number; // Reactive power (VAR)
    apparent: number; // Apparent power (VA)
  };

  // Power quality metrics
  powerFactor: number; // Power factor (0-1, where 1 is ideal)
  frequency: number; // Line frequency (Hz)
  phaseAngle: number; // Phase angle between V and I (radians)

  // Efficiency and distortion
  efficiency: number; // System efficiency ratio (0-1)
  thd: number; // Total Harmonic Distortion (0-1)

  // Timestamp
  timestamp: string; // ISO timestamp of measurement
}

/**
 * AI Analysis Response Type
 * Contains recommendations and insights from Bedrock AI
 */
export interface AIAnalysis {
  status: "normal" | "warning" | "critical";
  summary: string;
  recommendations: string[];
  alerts: string[];
  predictedIssues: string[];
  optimizationTips: string[];
}

/**
 * Combined Diagnostic Response
 * Includes both measurements and AI analysis
 */
export interface DiagnosticResponse extends DiagnosticData {
  aiAnalysis?: AIAnalysis;
}
