/**
 * @file ComplianceDashboardMockup.tsx
 * @description Interactive data map simulator illustrating cross-border transfer compliance against international frameworks.
 */

"use client";

import { useState } from "react";
import { Globe, ShieldCheck, ShieldAlert, BadgeInfo } from "lucide-react";

interface CountryConfig {
  name: string;
  code: string;
  framework: string;
  sccRequired: boolean;
  status: 'compliant' | 'warning' | 'restricted';
  reason: string;
}

const DESTINATIONS: Record<string, CountryConfig> = {
  germany: {
    name: "Germany (EU)",
    code: "DE",
    framework: "GDPR Compliant",
    sccRequired: true,
    status: "compliant",
    reason: "Standard Contractual Clauses (SCCs) signed. Binding Corporate Rules (BCRs) active. EU-adequate region."
  },
  usa: {
    name: "United States",
    code: "US",
    framework: "EU-US DPF Verified",
    sccRequired: true,
    status: "compliant",
    reason: "SCCs uploaded. Under EU-US Data Privacy Framework adequacy. Low risk assessment."
  },
  china: {
    name: "China",
    code: "CN",
    framework: "PIPL Restricted",
    sccRequired: true,
    status: "warning",
    reason: "CAC cross-border security assessment required. Local storage local copies are mandatory. High regulatory restriction."
  },
  russia: {
    name: "Russia",
    code: "RU",
    framework: "Data Localization Mandatory",
    sccRequired: false,
    status: "restricted",
    reason: "Local storage only. Federal Law No. 242-FZ strictly forbids exporting primary database copies. Non-compliant destination."
  }
};

/**
 * Compliance Map Transfer Simulator.
 * Allows interactive evaluation of adequacy mechanisms, risk levels, and SCC details for cross-border mapping.
 */
export default function ComplianceDashboardMockup() {
  const [source] = useState("India");
  const [destKey, setDestKey] = useState<keyof typeof DESTINATIONS>("germany");

  const activeDest = DESTINATIONS[destKey];

  return (
    <div className="w-full rounded-2xl border border-neutral-border bg-neutral-card p-4 sm:p-6 shadow-lg shadow-slate-100">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-500" />
          <span className="text-sm font-semibold text-text-primary">Cross-Border Data Map Simulator</span>
        </div>
        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 rounded px-1.5 py-0.5 uppercase">
          Interactive Mockup
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Control Box */}
        <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/50 p-4 flex flex-col gap-4 md:col-span-1">
          <div>
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1">
              Source Jurisdiction
            </label>
            <select
              value={source}
              disabled
              className="w-full rounded-lg border border-neutral-border bg-neutral-bg p-2 text-xs text-text-primary focus:outline-none opacity-60 cursor-not-allowed"
            >
              <option value="India">India (DPDP Act)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1">
              Destination Jurisdiction
            </label>
            <select
              value={destKey}
              onChange={(e) => setDestKey(e.target.value as keyof typeof DESTINATIONS)}
              className="w-full rounded-lg border border-neutral-border bg-neutral-bg p-2 text-xs text-text-primary focus:outline-none focus:border-blue-500"
            >
              <option value="germany">Germany (EU GDPR)</option>
              <option value="usa">United States</option>
              <option value="china">China (PIPL)</option>
              <option value="russia">Russia (RF 242-FZ)</option>
            </select>
          </div>

          <div className="border-t border-neutral-border/80 pt-3 flex items-start gap-1.5">
            <BadgeInfo className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
            <span className="text-[10px] text-text-secondary leading-normal block">
              Toggle destinations to check compliance requirements, SCC adequacy levels, and transfer blocks.
            </span>
          </div>
        </div>

        {/* Visual Flow Mapping */}
        <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/25 p-4 flex flex-col justify-between md:col-span-2">
          {/* Transfer Visualizer */}
          <div className="flex items-center justify-center py-6 gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-bg border border-neutral-border text-brand-600 font-bold text-xs shadow-md">
                IN
              </div>
              <span className="text-[10px] font-bold text-text-secondary mt-2">India</span>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <span className="text-[8px] font-mono text-slate-600 mb-1">DATA TRANSMISSION</span>
              <div className="w-full h-[2px] bg-slate-800 relative overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-brand-600 via-accent-400 to-brand-700 absolute inset-0 animate-[shimmer_2s_infinite] ${
                  activeDest.status === 'restricted' ? 'bg-rose-500 from-rose-600 via-rose-400 to-rose-700' : ''
                }`} />
              </div>
              <span className="text-[9px] text-text-secondary flex items-center gap-1 mt-1">
                {activeDest.sccRequired ? "SCC required" : "No SCC pathway"}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-bg border font-bold text-xs shadow-md ${
                activeDest.status === 'compliant' ? 'border-emerald-500 text-emerald-400 shadow-emerald-500/5' :
                activeDest.status === 'warning' ? 'border-amber-500 text-amber-400 shadow-amber-500/5' :
                'border-rose-500 text-rose-400 shadow-rose-500/5'
              }`}>
                {activeDest.code}
              </div>
              <span className="text-[10px] font-bold text-text-secondary mt-2">{activeDest.name}</span>
            </div>
          </div>

          {/* Compliance Report Card */}
          <div className={`rounded-xl border p-4 ${
            activeDest.status === 'compliant' ? 'bg-emerald-500/5 border-emerald-500/20 text-text-secondary' :
            activeDest.status === 'warning' ? 'bg-amber-500/5 border-amber-500/20 text-text-secondary' :
            'bg-rose-500/5 border-rose-500/20 text-text-secondary'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {activeDest.status === 'compliant' ? <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" /> :
               activeDest.status === 'warning' ? <BadgeInfo className="w-5 h-5 text-amber-400 shrink-0" /> :
               <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />}
              <span className={`text-xs font-bold uppercase tracking-wider ${
                activeDest.status === 'compliant' ? 'text-emerald-400' :
                activeDest.status === 'warning' ? 'text-amber-400' :
                'text-rose-400'
              }`}>
                {activeDest.framework}
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              {activeDest.reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
