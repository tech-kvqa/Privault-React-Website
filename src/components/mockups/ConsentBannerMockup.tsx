/**
 * @file ConsentBannerMockup.tsx
 * @description Interactive mock interface showing configuration of user tracking cookies and logging to a ledger.
 */

"use client";

import { useState } from "react";
import { Check, ShieldCheck, Clock, Settings, FileSpreadsheet } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  categories: string[];
  ip: string;
  status: string;
}

/**
 * Renders an interactive Cookie Consent sandbox.
 * Users toggle categories and "Save Preferences" to write simulated ledger items.
 */
export default function ConsentBannerMockup() {
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: false,
  });
  
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "CON-93041",
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toLocaleTimeString(),
      categories: ["essential", "analytics"],
      ip: "103.44.12.xxx",
      status: "ACTIVE"
    },
    {
      id: "CON-93040",
      timestamp: new Date(Date.now() - 1000 * 60 * 12).toLocaleTimeString(),
      categories: ["essential"],
      ip: "42.109.89.xxx",
      status: "ACTIVE"
    }
  ]);

  const [saved, setSaved] = useState(false);

  const handleToggle = (key: 'analytics' | 'marketing') => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    
    // Aggregate active categories
    const activeCats = ["essential"];
    if (preferences.analytics) activeCats.push("analytics");
    if (preferences.marketing) activeCats.push("marketing");
    
    const newLog: LogEntry = {
      id: `CON-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toLocaleTimeString(),
      categories: activeCats,
      ip: "192.168.1.xxx",
      status: "ACTIVE"
    };

    setLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-border bg-neutral-card p-4 sm:p-6 shadow-lg shadow-slate-100">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-semibold text-text-primary">Consent Management Playground</span>
        </div>
        <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 rounded px-1.5 py-0.5 uppercase">
          Interactive Mockup
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: The Banner Sandbox */}
        <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/50 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5" /> Cookie Banner Sandbox
              </span>
              {saved && (
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                  Preferences Logged!
                </span>
              )}
            </div>
            <p className="text-xs text-text-secondary mb-4 leading-relaxed">
              Configure your tracking preference choices below and save to write to the Consent Ledger.
            </p>

            <div className="space-y-3">
              {/* Category 1: Essential */}
              <div className="flex items-center justify-between rounded-lg bg-neutral-bg p-2.5 border border-neutral-border/40">
                <div>
                  <div className="text-xs font-semibold text-text-primary">Essential Cookies</div>
                  <p className="text-[10px] text-text-secondary">Required for website functionality. Cannot be disabled.</p>
                </div>
                <div className="flex h-5 w-9 items-center justify-center rounded-full bg-brand-500/20 text-brand-600 border border-brand-500/30">
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Category 2: Analytics */}
              <div className="flex items-center justify-between rounded-lg bg-neutral-bg p-2.5 border border-neutral-border/40">
                <div>
                  <div className="text-xs font-semibold text-text-primary">Analytics & Stats</div>
                  <p className="text-[10px] text-text-secondary">Helps us measure site traffic and improve performance.</p>
                </div>
                <button
                  onClick={() => handleToggle('analytics')}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    preferences.analytics ? "bg-brand-600" : "bg-slate-700"
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    preferences.analytics ? "translate-x-4" : "translate-x-0"
                  }`} />
                </button>
              </div>

              {/* Category 3: Marketing */}
              <div className="flex items-center justify-between rounded-lg bg-neutral-bg p-2.5 border border-neutral-border/40">
                <div>
                  <div className="text-xs font-semibold text-text-primary">Marketing & Targeting</div>
                  <p className="text-[10px] text-text-secondary">Allows personalization of ads and remarketing campaigns.</p>
                </div>
                <button
                  onClick={() => handleToggle('marketing')}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    preferences.marketing ? "bg-brand-600" : "bg-slate-700"
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    preferences.marketing ? "translate-x-4" : "translate-x-0"
                  }`} />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-4 rounded-lg bg-brand-600 hover:bg-brand-700 py-2 text-xs font-semibold text-white transition-colors"
          >
            Save My Preferences
          </button>
        </div>

        {/* Right Col: Ledger Logs */}
        <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/50 p-4">
          <div className="flex items-center justify-between mb-3 border-b border-neutral-border pb-2">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Immutable Consent Ledger
            </span>
            <span className="text-[9px] font-mono text-text-secondary">BLOCKS #3281-98</span>
          </div>

          <div className="space-y-2 h-[220px] overflow-y-auto pr-1">
            {logs.map((log) => (
              <div
                key={log.id}
                className="rounded-lg bg-neutral-bg p-2.5 border border-neutral-border flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-brand-600 font-bold">{log.id}</span>
                    <span className="text-[9px] text-text-secondary flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {log.timestamp}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {log.categories.map(cat => (
                      <span
                        key={cat}
                        className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${
                          cat === 'essential' ? 'bg-slate-800 text-text-secondary' :
                          cat === 'analytics' ? 'bg-emerald-500/10 text-emerald-400' :
                          'bg-brand-500/10 text-brand-600'
                        }`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <span className="text-[9.5px] font-mono text-text-secondary">{log.ip}</span>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
