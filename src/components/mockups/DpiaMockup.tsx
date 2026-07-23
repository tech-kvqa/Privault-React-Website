/**
 * @file DpiaMockup.tsx
 * @description Interactive DPIA Risk Assessment matrix and score evaluator.
 */

"use client";

import { useState } from "react";
import { BookOpen, Info } from "lucide-react";

/**
 * DPIA Likelihood × Impact Risk assessment matrix calculator component.
 */
export default function DpiaMockup() {
  const [likelihood, setLikelihood] = useState<1 | 2 | 3>(2);
  const [impact, setImpact] = useState<1 | 2 | 3>(2);

  const getScore = () => likelihood * impact;

  const getRiskInfo = () => {
    const score = getScore();
    if (score >= 6) {
      return {
        label: "HIGH RISK",
        color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
        mitigation: "DPO audit review mandatory. Encrypt data-at-rest. Implement field-level masking and MFA. Conduct monthly access reviews."
      };
    } else if (score >= 3) {
      return {
        label: "MEDIUM RISK",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
        mitigation: "Document standard data minimization policies. Ensure SSL/TLS in transit. Restrict access to roles via LDAP/SSO."
      };
    } else {
      return {
        label: "LOW RISK",
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
        mitigation: "Maintain standard security controls. Keep database versions up to date. Document in general DPIA registry."
      };
    }
  };

  const risk = getRiskInfo();

  return (
    <div className="w-full rounded-2xl border border-neutral-border bg-neutral-card p-4 sm:p-6 shadow-lg shadow-slate-100">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent-500" />
          <span className="text-sm font-semibold text-text-primary">Interactive DPIA Risk Calculator</span>
        </div>
        <span className="text-[10px] font-bold text-accent-500 bg-accent-500/10 rounded px-1.5 py-0.5 uppercase">
          Interactive Mockup
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: 3x3 Risk Matrix grid */}
        <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/50 p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
              Likelihood vs Impact Matrix
            </span>
            <span className="text-[9px] text-text-secondary font-medium">Click cells to evaluate risk</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {/* Corner labels */}
            <div className="text-[8px] font-bold text-text-secondary flex items-center justify-center font-mono">
              L \ I
            </div>
            {/* Impact headers */}
            <div className="font-semibold text-text-secondary py-1">Low (1)</div>
            <div className="font-semibold text-text-secondary py-1">Med (2)</div>
            <div className="font-semibold text-text-secondary py-1">High (3)</div>

            {/* Row 3 (High Likelihood) */}
            <div className="font-semibold text-text-secondary flex items-center justify-center">High (3)</div>
            <button
              onClick={() => { setLikelihood(3); setImpact(1); }}
              className={`p-3 rounded-lg border font-mono font-bold transition-all ${
                likelihood === 3 && impact === 1
                  ? "bg-amber-500 text-slate-950 border-amber-400 scale-105"
                  : "bg-neutral-bg/50 border-neutral-border text-amber-500 hover:bg-neutral-bg"
              }`}
            >
              3
            </button>
            <button
              onClick={() => { setLikelihood(3); setImpact(2); }}
              className={`p-3 rounded-lg border font-mono font-bold transition-all ${
                likelihood === 3 && impact === 2
                  ? "bg-rose-500 text-slate-950 border-rose-400 scale-105"
                  : "bg-neutral-bg/50 border-neutral-border text-rose-500 hover:bg-neutral-bg"
              }`}
            >
              6
            </button>
            <button
              onClick={() => { setLikelihood(3); setImpact(3); }}
              className={`p-3 rounded-lg border font-mono font-bold transition-all ${
                likelihood === 3 && impact === 3
                  ? "bg-rose-600 text-slate-950 border-rose-400 scale-105"
                  : "bg-neutral-bg/50 border-neutral-border text-rose-600 hover:bg-neutral-bg"
              }`}
            >
              9
            </button>

            {/* Row 2 (Medium Likelihood) */}
            <div className="font-semibold text-text-secondary flex items-center justify-center">Med (2)</div>
            <button
              onClick={() => { setLikelihood(2); setImpact(1); }}
              className={`p-3 rounded-lg border font-mono font-bold transition-all ${
                likelihood === 2 && impact === 1
                  ? "bg-emerald-500 text-slate-950 border-emerald-400 scale-105"
                  : "bg-neutral-bg/50 border-neutral-border text-emerald-500 hover:bg-neutral-bg"
              }`}
            >
              2
            </button>
            <button
              onClick={() => { setLikelihood(2); setImpact(2); }}
              className={`p-3 rounded-lg border font-mono font-bold transition-all ${
                likelihood === 2 && impact === 2
                  ? "bg-amber-500 text-slate-950 border-amber-400 scale-105"
                  : "bg-neutral-bg/50 border-neutral-border text-amber-500 hover:bg-neutral-bg"
              }`}
            >
              4
            </button>
            <button
              onClick={() => { setLikelihood(2); setImpact(3); }}
              className={`p-3 rounded-lg border font-mono font-bold transition-all ${
                likelihood === 2 && impact === 3
                  ? "bg-rose-500 text-slate-950 border-rose-400 scale-105"
                  : "bg-neutral-bg/50 border-neutral-border text-rose-500 hover:bg-neutral-bg"
              }`}
            >
              6
            </button>

            {/* Row 1 (Low Likelihood) */}
            <div className="font-semibold text-text-secondary flex items-center justify-center">Low (1)</div>
            <button
              onClick={() => { setLikelihood(1); setImpact(1); }}
              className={`p-3 rounded-lg border font-mono font-bold transition-all ${
                likelihood === 1 && impact === 1
                  ? "bg-emerald-500 text-slate-950 border-emerald-400 scale-105"
                  : "bg-neutral-bg/50 border-neutral-border text-emerald-500 hover:bg-neutral-bg"
              }`}
            >
              1
            </button>
            <button
              onClick={() => { setLikelihood(1); setImpact(2); }}
              className={`p-3 rounded-lg border font-mono font-bold transition-all ${
                likelihood === 1 && impact === 2
                  ? "bg-emerald-500 text-slate-950 border-emerald-400 scale-105"
                  : "bg-neutral-bg/50 border-neutral-border text-emerald-500 hover:bg-neutral-bg"
              }`}
            >
              2
            </button>
            <button
              onClick={() => { setLikelihood(1); setImpact(3); }}
              className={`p-3 rounded-lg border font-mono font-bold transition-all ${
                likelihood === 1 && impact === 3
                  ? "bg-amber-500 text-slate-950 border-amber-400 scale-105"
                  : "bg-neutral-bg/50 border-neutral-border text-amber-500 hover:bg-neutral-bg"
              }`}
            >
              3
            </button>
          </div>
        </div>

        {/* Right: Score Evaluation & Action Plan */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/25 p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                Risk Score Card
              </span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${risk.color}`}>
                {risk.label}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-text-primary">{getScore()}</span>
              <span className="text-xs text-text-secondary">out of 9</span>
            </div>
            <p className="text-[10px] text-text-secondary mt-1 font-mono">
              Formula: Likelihood ({likelihood}) × Impact ({impact})
            </p>
          </div>

          <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/50 p-4 flex-1">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary font-semibold mb-2">
              <Info className="w-4 h-4 text-accent-500" />
              <span>Mitigation Strategy Recommendation</span>
            </div>
            <p className="text-[11px] leading-relaxed text-text-secondary font-semibold">
              {risk.mitigation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
