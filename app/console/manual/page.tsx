"use client";

import { useState } from "react";
import {
  Activity,
  Zap,
  Target,
  Clock,
  Cpu,
  AlertCircle,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Info,
  ChevronRight,
  Shield,
  BarChart3,
  Wifi,
  TrendingUp,
  Copy,
  Check,
  LucideIcon,
} from "lucide-react";

// ─── Shadcn/ui component imports ───────────────────────────────────────────
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

// ─── Section Header ─────────────────────────────────────────────────────────
const SectionHeader = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) => (
  <div className="flex items-center gap-2 mb-3">
    <Icon className="w-3.5 h-3.5 text-orange-500" />
    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
      {title}
    </span>
    <Separator className="flex-1" />
  </div>
);

// ─── Field Input ─────────────────────────────────────────────────────────────
const FieldInput = ({
  label,
  name,
  value,
  onChange,
  disabled,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  placeholder: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <Label
      htmlFor={name}
      className="text-[10px] font-normal uppercase tracking-wider text-muted-foreground"
    >
      {label}
    </Label>
    <Input
      id={name}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="font-mono text-sm h-9"
    />
  </div>
);

// ─── Severity Badge ──────────────────────────────────────────────────────────
const SeverityBadge = ({ severity }: { severity: string }) => {
  const s = severity?.toLowerCase() as keyof typeof colorMap;
  const colorMap = {
    critical: "bg-red-100 text-red-700 border-red-300",
    high: "bg-orange-100 text-orange-700 border-orange-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    low: "bg-green-100 text-green-700 border-green-300",
    normal: "bg-emerald-100 text-emerald-700 border-emerald-300",
  };
  const iconMap = {
    critical: <AlertCircle className="w-3 h-3" />,
    high: <AlertTriangle className="w-3 h-3" />,
    medium: <Info className="w-3 h-3" />,
    low: <CheckCircle2 className="w-3 h-3" />,
    normal: <CheckCircle2 className="w-3 h-3" />,
  };

  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-normal uppercase tracking-wider ${colorMap[s] ?? "bg-muted text-muted-foreground"}`}
    >
      {iconMap[s] ?? <Info className="w-3 h-3" />}
      {severity}
    </Badge>
  );
};

// ─── Confidence Bar ──────────────────────────────────────────────────────────
const ConfidenceBar = ({ value }: { value: number }) => {
  const pct = Math.min(
    100,
    Math.max(0, Math.round(value * (value <= 1 ? 100 : 1))),
  );
  const color =
    pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-yellow-400" : "bg-red-400";

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold font-mono text-foreground w-10 text-right">
        {pct}%
      </span>
    </div>
  );
};

// ─── Smart Response Renderer ─────────────────────────────────────────────────
const SmartResponseRenderer = ({
  data,
  raw,
}: {
  data: Record<string, unknown>;
  raw: string;
}) => {
  const [copied, setCopied] = useState(false);

  const fault = data.fault_type || data.status;
  const severity = data.severity;
  const confidence = data.confidence;
  const analysis = data.analysis || data.message;
  const recs = Array.isArray(data.recommendations) ? data.recommendations : [];

  const knownKeys = new Set([
    "fault_type",
    "status",
    "severity",
    "confidence",
    "analysis",
    "message",
    "recommendations",
    "error",
  ]);
  const extras = Object.entries(data).filter(([k]) => !knownKeys.has(k));

  const handleCopy = () => {
    navigator.clipboard?.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tabs defaultValue="structured" className="w-full">
      <TabsList className="mb-4 h-8">
        <TabsTrigger
          value="structured"
          className="text-[11px] uppercase tracking-wider font-normal"
        >
          Report
        </TabsTrigger>
        <TabsTrigger
          value="raw"
          className="text-[11px] uppercase tracking-wider font-normal"
        >
          Raw JSON
        </TabsTrigger>
      </TabsList>

      {/* Raw JSON */}
      <TabsContent value="raw">
        <div className="relative">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="absolute top-2 right-2 h-6 px-2 text-[10px] z-10 gap-1"
                >
                  {copied ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy raw JSON</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ScrollArea className="h-[420px] w-full rounded-md border bg-muted/40 p-4">
            <pre className="text-[11px] font-mono text-foreground whitespace-pre-wrap break-all leading-relaxed">
              {raw}
            </pre>
          </ScrollArea>
        </div>
      </TabsContent>

      {/* Structured Report */}
      <TabsContent value="structured" className="space-y-3">
        {!!(fault || severity) && (
          <Card className="border">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between gap-4">
                {!!fault && (
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                      Fault / Status
                    </p>
                    <p className="text-base font-bold text-foreground">
                      {String(fault)}
                    </p>
                  </div>
                )}
                {!!severity && <SeverityBadge severity={String(severity)} />}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confidence */}
        {confidence !== undefined && (
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Model Confidence
                </p>
                <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <ConfidenceBar value={Number(confidence)} />
            </CardContent>
          </Card>
        )}

        {/* Analysis */}
        {!!analysis && (
          <Alert className="bg-blue-50 border-blue-200">
            <BarChart3 className="w-4 h-4 text-blue-500" />
            <AlertTitle className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">
              Analysis
            </AlertTitle>
            <AlertDescription className="text-sm text-foreground leading-relaxed">
              {String(analysis)}
            </AlertDescription>
          </Alert>
        )}

        {/* Recommendations */}
        {recs.length > 0 && (
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5 text-orange-500" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <ul className="space-y-2">
                {recs.map((r: unknown, i: number) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <ChevronRight className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground leading-snug">
                      {String(r)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Extra fields */}
        {extras.length > 0 && (
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-2 gap-2">
                {extras.map(([key, val]) => (
                  <div
                    key={key}
                    className="bg-muted/50 rounded-lg p-2.5 border border-border"
                  >
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-0.5">
                      {key.replace(/_/g, " ")}
                    </p>
                    <p className="text-sm font-mono font-normal text-foreground truncate">
                      {typeof val === "object"
                        ? JSON.stringify(val)
                        : String(val)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fallback */}
        {!fault &&
          !severity &&
          !analysis &&
          recs.length === 0 &&
          extras.length === 0 && (
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground font-mono">{raw}</p>
              </CardContent>
            </Card>
          )}
      </TabsContent>
    </Tabs>
  );
};

// ─── Loading Skeleton ────────────────────────────────────────────────────────
const LoadingSkeleton = () => (
  <div className="space-y-4 pt-2">
    <div className="flex items-center gap-3 mb-6">
      <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
      <span className="text-sm text-muted-foreground font-normal">
        Processing telemetry data…
      </span>
    </div>
    {[80, 60, 72, 50, 65].map((w, i) => (
      <div key={i} className="space-y-1.5">
        <div
          className="h-2.5 bg-muted rounded-full animate-pulse"
          style={{ width: `${w}%`, animationDelay: `${i * 100}ms` }}
        />
      </div>
    ))}
    <div className="mt-6 grid grid-cols-2 gap-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-14 bg-muted rounded-xl animate-pulse"
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  </div>
);

// ─── Empty State ─────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="h-full flex flex-col items-center justify-center text-center py-12">
    <div className="w-14 h-14 rounded-2xl bg-muted border flex items-center justify-center mx-auto mb-4 shadow-sm">
      <Cpu className="w-6 h-6 text-muted-foreground" />
    </div>
    <p className="text-sm font-bold text-foreground mb-1">Ready for Analysis</p>
    <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
      Enter system parameters and click{" "}
      <span className="font-normal text-orange-500">Run Diagnostics</span> to
      begin.
    </p>
  </div>
);

// ─── Main Application ────────────────────────────────────────────────────────
export default function PowerAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [parsedResult, setParsedResult] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    Va: "",
    Vb: "",
    Vc: "",
    Ia: "",
    Ib: "",
    Ic: "",
    neutralCurrent: "",
    activePower: "",
    reactivePower: "",
    powerFactor: "",
    frequency: "50",
    rocof: "",
    I1: "",
    I2: "",
    I0: "",
    di_dt: "",
    dv_dt: "",
    duration: "",
    thd: "",
    impedance: "",
  });

  const API_GATEWAY_URL =
    "https://363pawtjm9.execute-api.ap-south-1.amazonaws.com/predict";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setParsedResult(null);
    setError(null);
    setSuccess(false);

    const payload = Object.entries(formData).reduce(
      (acc: Record<string, string | number>, [key, value]) => {
        if (value.trim() !== "") {
          const num = Number(value);
          acc[key] = isNaN(num) ? value.trim() : num;
        }
        return acc;
      },
      {},
    );

    try {
      const response = await fetch(API_GATEWAY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok)
        throw new Error(`API Error: ${response.status} ${response.statusText}`);

      const data = await response.json();
      const rawStr = JSON.stringify(data, null, 2);

      if (data.error) {
        setError(data.error);
        setResult(rawStr);
      } else {
        setSuccess(true);
        setResult(rawStr);
        setParsedResult(data);
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "An unknown network error occurred";
      setError(msg);
      setResult(
        JSON.stringify(
          { error: msg, timestamp: new Date().toISOString() },
          null,
          2,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const statusLabel = loading
    ? "Running…"
    : success
      ? "Complete"
      : error
        ? "Failed"
        : "Idle";
  const statusBadgeClass = loading
    ? "text-amber-600 bg-amber-50 border-amber-200"
    : success
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : error
        ? "text-red-700 bg-red-50 border-red-200"
        : "text-muted-foreground bg-muted border-border";

  return (
    <TooltipProvider>
      <div
        className="min-h-screen bg-background"
        style={{ fontFamily: "'DM Sans', 'Geist', 'Inter', sans-serif" }}
      >
        {/* Top Nav */}
        <div className="bg-background border-b px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center shadow">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">
                PowerDiag
              </span>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-muted-foreground">
                Telemetry Analyzer
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground font-normal">
              AWS Bedrock · Llama 2
            </span>
            <div
              className={`w-1.5 h-1.5 rounded-full ml-1 ${
                success
                  ? "bg-emerald-400"
                  : error
                    ? "bg-red-400"
                    : "bg-muted-foreground/40"
              }`}
            />
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Warning Banner */}
          <Alert className="mb-6 bg-amber-50 border-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <AlertDescription className="text-sm text-amber-800">
              Results are generated by a fine-tuned Llama 2 model trained on
              power system diagnostics.{" "}
              <strong className="font-normal">
                Always cross-verify with domain experts
              </strong>{" "}
              before making critical decisions.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* FORM PANEL */}
            <Card className="xl:col-span-2">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold">
                    <Activity className="w-4 h-4 text-orange-500" />
                    System Parameters
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-normal uppercase tracking-wider text-muted-foreground"
                  >
                    IEC 61850
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    {/* Voltages */}
                    <div>
                      <SectionHeader title="Voltage — RMS" icon={Zap} />
                      <div className="grid grid-cols-3 gap-3">
                        <FieldInput
                          label="Va (V)"
                          name="Va"
                          value={formData.Va}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="230"
                        />
                        <FieldInput
                          label="Vb (V)"
                          name="Vb"
                          value={formData.Vb}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="230"
                        />
                        <FieldInput
                          label="Vc (V)"
                          name="Vc"
                          value={formData.Vc}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="230"
                        />
                      </div>
                    </div>

                    {/* Currents */}
                    <div>
                      <SectionHeader title="Current — RMS" icon={Activity} />
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <FieldInput
                          label="Ia (A)"
                          name="Ia"
                          value={formData.Ia}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="10"
                        />
                        <FieldInput
                          label="Ib (A)"
                          name="Ib"
                          value={formData.Ib}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="10"
                        />
                        <FieldInput
                          label="Ic (A)"
                          name="Ic"
                          value={formData.Ic}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="10"
                        />
                      </div>
                      <FieldInput
                        label="Neutral Current — In (A)"
                        name="neutralCurrent"
                        value={formData.neutralCurrent}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="0.5"
                      />
                    </div>

                    {/* Power & Frequency */}
                    <div>
                      <SectionHeader title="Power & Frequency" icon={Target} />
                      <div className="grid grid-cols-2 gap-3">
                        <FieldInput
                          label="Active P (kW)"
                          name="activePower"
                          value={formData.activePower}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="kW"
                        />
                        <FieldInput
                          label="Reactive Q (kVAR)"
                          name="reactivePower"
                          value={formData.reactivePower}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="kVAR"
                        />
                        <FieldInput
                          label="Power Factor"
                          name="powerFactor"
                          value={formData.powerFactor}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="0.95"
                        />
                        <FieldInput
                          label="Frequency (Hz)"
                          name="frequency"
                          value={formData.frequency}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="50"
                        />
                      </div>
                    </div>

                    {/* Sequence Components */}
                    <div>
                      <SectionHeader title="Sequence Components" icon={Cpu} />
                      <div className="grid grid-cols-3 gap-3">
                        <FieldInput
                          label="Positive I1"
                          name="I1"
                          value={formData.I1}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder=""
                        />
                        <FieldInput
                          label="Negative I2"
                          name="I2"
                          value={formData.I2}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder=""
                        />
                        <FieldInput
                          label="Zero I0"
                          name="I0"
                          value={formData.I0}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder=""
                        />
                      </div>
                    </div>

                    {/* Transients */}
                    <div className="md:col-span-2">
                      <SectionHeader
                        title="Transients & Optional Parameters"
                        icon={Clock}
                      />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <FieldInput
                          label="di/dt"
                          name="di_dt"
                          value={formData.di_dt}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder=""
                        />
                        <FieldInput
                          label="dv/dt"
                          name="dv_dt"
                          value={formData.dv_dt}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder=""
                        />
                        <FieldInput
                          label="THD (%)"
                          name="thd"
                          value={formData.thd}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="< 5%"
                        />
                        <FieldInput
                          label="Impedance Z"
                          name="impedance"
                          value={formData.impedance}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[11px] text-muted-foreground">
                      Fields left blank will be omitted from payload.
                    </p>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Analyzing…
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Run Diagnostics
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* RESULTS PANEL */}
            <div className="xl:col-span-1">
              <Card className="flex flex-col" style={{ minHeight: 520 }}>
                <CardHeader className="pb-3 border-b bg-muted/30 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2.5 text-sm font-bold">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          loading
                            ? "bg-amber-400 animate-pulse"
                            : success
                              ? "bg-emerald-500"
                              : error
                                ? "bg-red-500"
                                : "bg-muted-foreground/40"
                        }`}
                      />
                      Diagnostic Report
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold uppercase tracking-widest ${statusBadgeClass}`}
                    >
                      {statusLabel}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-auto p-5">
                  {loading ? (
                    <LoadingSkeleton />
                  ) : error ? (
                    <div className="space-y-4">
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Analysis Failed</AlertTitle>
                        <AlertDescription className="font-mono text-xs break-words">
                          {error}
                        </AlertDescription>
                      </Alert>
                      {result && (
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                            Raw Error Response
                          </p>
                          <ScrollArea className="h-64 w-full rounded-md border bg-muted/40 p-3">
                            <pre className="text-[11px] font-mono text-foreground whitespace-pre-wrap break-all">
                              {result}
                            </pre>
                          </ScrollArea>
                        </div>
                      )}
                    </div>
                  ) : success && parsedResult && result ? (
                    <SmartResponseRenderer data={parsedResult} raw={result} />
                  ) : result ? (
                    <ScrollArea className="h-[480px] w-full rounded-md border bg-muted/40 p-4">
                      <pre className="text-[11px] font-mono text-foreground whitespace-pre-wrap break-all">
                        {result}
                      </pre>
                    </ScrollArea>
                  ) : (
                    <EmptyState />
                  )}
                </CardContent>

                {success && (
                  <CardFooter className="border-t bg-muted/20 py-3 flex items-center justify-between flex-shrink-0">
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {new Date().toISOString()}
                    </span>
                    <span className="text-[10px] font-normal text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
