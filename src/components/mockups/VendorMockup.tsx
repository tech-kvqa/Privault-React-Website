/**
 * @file VendorMockup.tsx
 * @description Interactive third-party vendor subprocessors register and DPA/assessments compliance table tracker.
 */

"use client";

import { useState } from "react";
import { Briefcase, ShieldCheck, ShieldAlert } from "lucide-react";

interface Vendor {
  name: string;
  category: string;
  risk: 'low' | 'medium' | 'high';
  dpaSigned: boolean;
  securityAssessed: boolean;
}

/**
 * VendorMockup component displays subprocessors, evaluates if DPAs and security checks are missing,
 * and outputs risk alerts if a high-risk vendor is non-compliant.
 */
export default function VendorMockup() {
  const [vendors, setVendors] = useState<Vendor[]>([
    { name: "Amazon Web Services", category: "Cloud Hosting", risk: "low", dpaSigned: true, securityAssessed: true },
    { name: "Stripe Payment Services", category: "Payment Gateway", risk: "medium", dpaSigned: true, securityAssessed: true },
    { name: "SendGrid Emails", category: "Email Dispatch", risk: "high", dpaSigned: false, securityAssessed: false }
  ]);

  const handleToggle = (idx: number, key: 'dpaSigned' | 'securityAssessed') => {
    setVendors(prev => prev.map((v, i) => {
      if (i === idx) {
        return { ...v, [key]: !v[key] };
      }
      return v;
    }));
  };

  const handleRiskChange = (idx: number, val: 'low' | 'medium' | 'high') => {
    setVendors(prev => prev.map((v, i) => {
      if (i === idx) {
        return { ...v, risk: val };
      }
      return v;
    }));
  };

  // Find if there is a warning (high risk subprocessor + missing contract DPA or assessment check)
  const hasWarnings = vendors.some(v => v.risk === 'high' && (!v.dpaSigned || !v.securityAssessed));

  return (
    <div className="w-full rounded-2xl border border-neutral-border bg-neutral-card p-4 sm:p-6 shadow-lg shadow-slate-100">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-orange-500" />
          <span className="text-sm font-semibold text-text-primary">Third-Party Vendor Register</span>
        </div>
        <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 rounded px-1.5 py-0.5 uppercase">
          Interactive Mockup
        </span>
      </div>

      <div className="space-y-4">
        {/* Warning Alert Banner */}
        {hasWarnings ? (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-xs text-rose-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 animate-pulse" />
            <span><strong>Risk Warning:</strong> Vendor SendGrid is set to High Risk but has missing DPA contract signature or security assessment checks!</span>
          </div>
        ) : (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span><strong>All Clear:</strong> All active subprocessors are compliant with adequate Standard Contractual Clauses and DPAs signed.</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-border text-text-secondary text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2.5 px-2">Vendor</th>
                <th className="py-2.5 px-2">Category</th>
                <th className="py-2.5 px-2 text-center">Risk Level</th>
                <th className="py-2.5 px-2 text-center">DPA Signed</th>
                <th className="py-2.5 px-2 text-center">Security Check</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, idx) => (
                <tr key={vendor.name} className="border-b border-neutral-border/50 hover:bg-neutral-bg/10">
                  <td className="py-3 px-2 font-semibold text-text-primary">{vendor.name}</td>
                  <td className="py-3 px-2 text-text-secondary">{vendor.category}</td>
                  <td className="py-3 px-2 text-center">
                    <select
                      value={vendor.risk}
                      onChange={(e) => handleRiskChange(idx, e.target.value as 'low' | 'medium' | 'high')}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-neutral-bg border focus:outline-none ${
                        vendor.risk === 'low' ? 'text-emerald-400 border-emerald-500/20' :
                        vendor.risk === 'medium' ? 'text-amber-400 border-amber-500/20' :
                        'text-rose-400 border-rose-500/20'
                      }`}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Med</option>
                      <option value="high">High</option>
                    </select>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <button
                      onClick={() => handleToggle(idx, 'dpaSigned')}
                      className={`mx-auto flex h-6 w-12 items-center rounded-full p-0.5 transition-colors focus:outline-none ${
                        vendor.dpaSigned ? "bg-emerald-600 justify-end" : "bg-slate-800 justify-start"
                      }`}
                    >
                      <span className="h-5 w-5 rounded-full bg-slate-200 shadow" />
                    </button>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <button
                      onClick={() => handleToggle(idx, 'securityAssessed')}
                      className={`mx-auto flex h-6 w-12 items-center rounded-full p-0.5 transition-colors focus:outline-none ${
                        vendor.securityAssessed ? "bg-emerald-600 justify-end" : "bg-slate-800 justify-start"
                      }`}
                    >
                      <span className="h-5 w-5 rounded-full bg-slate-200 shadow" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
