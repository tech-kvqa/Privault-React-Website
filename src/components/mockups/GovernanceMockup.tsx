/**
 * @file GovernanceMockup.tsx
 * @description Interactive corporate policy register checklist showcasing DPO digital signatures and audit schedules.
 */

"use client";

import { useState } from "react";
import { Scale, CheckCircle2, FileSignature, CheckSquare, PenTool, Check } from "lucide-react";

interface Policy {
  id: string;
  title: string;
  version: string;
  status: 'Drafting' | 'In Review' | 'Approved';
  dpoSigned: boolean;
}

/**
 * GovernanceMockup component. Renders corporate policies sign-off tools
 * and active audit verification checklists.
 */
export default function GovernanceMockup() {
  const [policies, setPolicies] = useState<Policy[]>([
    { id: "POL-001", title: "Global PII Retention Policy", version: "v2.1", status: "In Review", dpoSigned: false },
    { id: "POL-002", title: "Incident Response Playbook", version: "v1.4", status: "Approved", dpoSigned: true },
    { id: "POL-003", title: "Employee Privacy Handbook", version: "v3.0", status: "Drafting", dpoSigned: false }
  ]);

  const [auditTasks, setAuditTasks] = useState([
    { id: 1, task: "Review third-party DPA for Stripe integration", done: true },
    { id: 2, task: "Perform annual DPIA on HRMS database upgrade", done: false },
    { id: 3, task: "Conduct simulated phishing campaign for sales desk", done: false }
  ]);

  const handleSign = (id: string) => {
    setPolicies(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: 'Approved', dpoSigned: true };
      }
      return p;
    }));
  };

  const toggleAuditTask = (id: number) => {
    setAuditTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, done: !t.done };
      }
      return t;
    }));
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-border bg-neutral-card p-4 sm:p-6 shadow-lg shadow-slate-100">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-brand-600" />
          <span className="text-sm font-semibold text-text-primary">Compliance Audit & Policy Register</span>
        </div>
        <span className="text-[10px] font-bold text-brand-600 bg-brand-500/10 rounded px-1.5 py-0.5 uppercase">
          Interactive Mockup
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Policy Register & Digital Sign-off */}
        <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/50 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
              <FileSignature className="w-3.5 h-3.5" /> Corporate Policy Register
            </span>
            <span className="text-[9px] text-text-secondary font-mono">DPO Sign-Off Hub</span>
          </div>

          <div className="space-y-3">
            {policies.map((p) => (
              <div
                key={p.id}
                className="rounded-lg bg-neutral-bg p-2.5 border border-neutral-border flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-text-secondary">{p.id}</span>
                    <span className="text-xs font-semibold text-text-primary">{p.title}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-text-secondary bg-neutral-bg px-1 py-0.5 rounded">
                      {p.version}
                    </span>
                    <span className={`text-[9px] font-bold uppercase ${
                      p.status === 'Approved' ? 'text-emerald-400' :
                      p.status === 'In Review' ? 'text-amber-400' : 'text-text-secondary'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>

                <div>
                  {p.dpoSigned ? (
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> SIGNED
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSign(p.id)}
                      className="rounded bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1 text-[9px] font-bold text-white transition-colors flex items-center gap-1"
                    >
                      <PenTool className="w-3 h-3" /> Sign DPO
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Internal Audit Checklist */}
        <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/50 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
              <CheckSquare className="w-3.5 h-3.5" /> Compliance Checklist
            </span>
            <span className="text-[9px] text-text-secondary font-mono">Continuous Auditing</span>
          </div>

          <div className="space-y-2">
            {auditTasks.map((t) => (
              <button
                key={t.id}
                onClick={() => toggleAuditTask(t.id)}
                className="w-full text-left rounded-lg bg-neutral-bg p-2.5 border border-neutral-border flex items-center gap-3 transition-colors hover:border-neutral-border"
              >
                <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                  t.done ? "bg-emerald-500 border-emerald-400 text-slate-950" : "border-neutral-border bg-neutral-bg text-transparent"
                }`}>
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className={`text-[11px] leading-normal ${t.done ? "text-text-secondary line-through" : "text-text-secondary"}`}>
                  {t.task}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
