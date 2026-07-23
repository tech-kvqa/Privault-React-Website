/**
 * @file BreachDashboardMockup.tsx
 * @description Interactive breach severity classification calculator. Calculates mandatory reporting SLA thresholds.
 */

"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, AlertTriangle, ShieldCheck, Flame, Clock } from "lucide-react";

/**
 * Breach Severity Classifier component.
 * Evaluates vectors, exposures, and scope size to output containment and notification response plans.
 */
export default function BreachDashboardMockup() {
  const [incidentType, setIncidentType] = useState("phishing");
  const [piiType, setPiiType] = useState("general");
  const [recordsCount, setRecordsCount] = useState(500);

  const [severity, setSeverity] = useState({
    level: "LOW",
    color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    sla: "Internal Log Only",
    instructions: "Record in the internal incident log. No DPA notification required."
  });

  useEffect(() => {
    // Dynamic severity assessment rules
    let score = 0;
    
    // 1. Vector Weight
    if (incidentType === "malware") score += 3;
    else if (incidentType === "insider") score += 2;
    else score += 1;

    // 2. Exposure Category Weight
    if (piiType === "pci" || piiType === "phi") score += 3;
    else if (piiType === "credentials") score += 2;
    else score += 1;

    // 3. Affected Record volume weight
    if (recordsCount > 10000) score += 3;
    else if (recordsCount > 1000) score += 2;
    else score += 1;

    if (score >= 8) {
      setSeverity({
        level: "CRITICAL",
        color: "text-rose-400 border-rose-500/20 bg-rose-500/5",
        sla: "6 Hours (CERT-In) / 72 Hours (EU GDPR)",
        instructions: "Immediate reporting mandatory. Notify legal council and DPA. Contain server blocks."
      });
    } else if (score >= 5) {
      setSeverity({
        level: "MEDIUM",
        color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
        sla: "72 Hours (DPA)",
        instructions: "Investigate containment scope. Draft notification alert copy. Log root cause."
      });
    } else {
      setSeverity({
        level: "LOW",
        color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
        sla: "No DPA notification required",
        instructions: "Record in internal register within 30 days. Standard review."
      });
    }
  }, [incidentType, piiType, recordsCount]);

  return (
    <div className="w-full rounded-2xl border border-neutral-border bg-neutral-card p-4 sm:p-6 shadow-lg shadow-slate-100">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          <span className="text-sm font-semibold text-text-primary">Automated Breach Severity Classifier</span>
        </div>
        <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 rounded px-1.5 py-0.5 uppercase">
          Interactive Mockup
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Wizard Form Inputs */}
        <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/50 p-4 space-y-4 lg:col-span-3">
          <div>
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1">
              Incident Vector
            </label>
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="w-full rounded-lg border border-neutral-border bg-neutral-bg p-2 text-xs text-text-primary focus:outline-none focus:border-blue-500"
            >
              <option value="phishing">Phishing Campaign Leaked Details</option>
              <option value="insider">Insider Unauthorized Export</option>
              <option value="malware">Malware / Ransomware Breach</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1">
              Data Category Exposed
            </label>
            <select
              value={piiType}
              onChange={(e) => setPiiType(e.target.value)}
              className="w-full rounded-lg border border-neutral-border bg-neutral-bg p-2 text-xs text-text-primary focus:outline-none focus:border-blue-500"
            >
              <option value="general">Contact Info (Names, Addresses)</option>
              <option value="credentials">Credentials (Passwords, Salted Hashes)</option>
              <option value="pci">Financial PII (Credit Cards, bank IDs)</option>
              <option value="phi">Medical PHI (Patient logs, diagnoses)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-1">
              <span>Affected Records</span>
              <span className="text-brand-600 font-mono text-xs">{recordsCount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10"
              max="50000"
              step="10"
              value={recordsCount}
              onChange={(e) => setRecordsCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* Severity Metrics outputs */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Severity Score Card */}
          <div className={`rounded-xl border p-4 flex-1 flex flex-col justify-center items-center text-center ${severity.color}`}>
            <span className="text-[10px] uppercase tracking-widest font-bold text-text-secondary mb-1">
              Calculated Severity
            </span>
            <div className="flex items-center gap-1.5 text-2xl font-black tracking-wider mb-2">
              {severity.level === "CRITICAL" ? <Flame className="w-6 h-6 animate-bounce" /> :
               severity.level === "MEDIUM" ? <AlertTriangle className="w-6 h-6" /> :
               <ShieldCheck className="w-6 h-6" />}
              {severity.level}
            </div>
            <p className="text-[11px] leading-relaxed max-w-[200px] text-text-secondary">
              {severity.instructions}
            </p>
          </div>

          {/* SLA Tracker Card */}
          <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/25 p-4">
            <div className="flex items-center gap-2 text-text-secondary text-xs mb-1.5">
              <Clock className="w-4 h-4 text-accent-500" />
              <span className="font-semibold text-text-primary">Regulatory SLA Timer</span>
            </div>
            <div className="text-xs font-mono font-bold text-text-primary">
              {severity.sla}
            </div>
            <span className="text-[10px] text-text-secondary mt-1 block font-medium">
              SLA thresholds vary based on GDPR Art. 33 and CERT-In directions.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
