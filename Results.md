# Engineering Insights Derived by the AI Diagnostics Engine

## 1. Physics-Consistent Power Reconstruction

The model reconstructs apparent power using the fundamental AC power relationship  
S = √(P² + Q²)  
to verify that telemetry values obey real electrical power laws.

---

## 2. Real-Time Phase Angle and Power Factor Estimation

The system derives the electrical phase angle using  
θ = cos⁻¹(P / S)  
allowing detection of reactive loading and energy inefficiency.

---

## 3. Three-Phase Waveform Reconstruction

Using sampled telemetry and sinusoidal modeling  

V(t) = Vrms √2 sin(ωt)

the model rebuilds full time-domain AC waveforms for system behavior analysis.

---

## 4. Instantaneous Power Behavior Analysis

The engine computes dynamic power flow using

P(t) = VaIa + VbIb + VcIc

which reveals ripple patterns that indicate imbalance or abnormal operating conditions.

---

## 5. Electrical Health Index from Multi-Signal Correlation

The model correlates voltage balance, current balance, sequence components, and power factor to create a unified system health profile for operational diagnostics.

---

# Electrical Engineering Formulas Used

## Apparent Power

S = √(P² + Q²)

## Power Factor

PF = P / S

## Phase Angle

θ = cos⁻¹(PF)

## Load Impedance (per phase)

Z = V / I

## AC Voltage Waveform

V(t) = Vrms √2 sin(ωt)

## AC Current Waveform

I(t) = Irms √2 sin(ωt − θ)

## Instantaneous Three-Phase Power

P(t) = VaIa + VbIb + VcIc

## Angular Frequency

ω = 2πf

## Voltage / Current Deviation

Deviation = ((Xi − Xavg) / Xavg) × 100
