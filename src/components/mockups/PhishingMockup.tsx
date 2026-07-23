/**
 * @file PhishingMockup.tsx
 * @description Interactive phishing campaign simulator panel, showing dispatch progress, clicking stats, and employee training quiz demos.
 */

"use client";

import { useState } from "react";
import { Anchor, ShieldAlert, Play } from "lucide-react";

/**
 * PhishingMockup component. Simulates email campaigns, tracks compromised metrics,
 * and hosts interactive training scenarios.
 */
export default function PhishingMockup() {
  const [campaignStarted, setCampaignStarted] = useState(false);
  const [campaignProgress, setCampaignProgress] = useState(0);
  const [stats, setStats] = useState({
    sent: 0,
    opened: 0,
    clicked: 0,
    credentials: 0,
  });

  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const startCampaign = () => {
    setCampaignStarted(true);
    setCampaignProgress(10);
    
    // Simulate campaign progression interval
    const interval = setInterval(() => {
      setCampaignProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStats({
            sent: 120,
            opened: 94,
            clicked: 8, // 8 employees clicked the link
            credentials: 2, // 2 employees leaked details
          });
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  const handleQuizSubmit = (ans: string) => {
    setQuizAnswer(ans);
    setQuizSubmitted(true);
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-border bg-neutral-card p-4 sm:p-6 shadow-lg shadow-slate-100">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Anchor className="w-5 h-5 text-brand-600" />
          <span className="text-sm font-semibold text-text-primary">Phishing Campaign Simulator</span>
        </div>
        <span className="text-[10px] font-bold text-brand-600 bg-brand-500/10 rounded px-1.5 py-0.5 uppercase">
          Interactive Mockup
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Campaign Control & Reports */}
        <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/50 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                Simulation Control Panel
              </span>
              {campaignProgress === 100 && (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Simulation Finished
                </span>
              )}
            </div>

            <p className="text-xs text-text-secondary mb-4 leading-relaxed">
              Launch a department-wide simulated phishing campaign to measure security awareness stats.
            </p>

            {/* Campaign Actions */}
            {!campaignStarted ? (
              <button
                onClick={startCampaign}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 py-2.5 text-xs font-semibold text-white transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Start Campaign Simulation
              </button>
            ) : campaignProgress < 100 ? (
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-text-secondary">
                  <span>DISPATCHING EMAILS...</span>
                  <span>{campaignProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-50 transition-all duration-150"
                    style={{ width: `${campaignProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              /* Campaign Results Stats Grid */
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-neutral-bg p-2 border border-neutral-border text-center">
                  <span className="text-[8px] font-bold text-text-secondary uppercase block">Sent</span>
                  <span className="text-sm font-mono font-bold text-text-primary">{stats.sent}</span>
                </div>
                <div className="rounded-lg bg-neutral-bg p-2 border border-neutral-border text-center">
                  <span className="text-[8px] font-bold text-text-secondary uppercase block">Opened</span>
                  <span className="text-sm font-mono font-bold text-text-primary">{stats.opened}</span>
                </div>
                <div className="rounded-lg bg-neutral-bg p-2 border border-neutral-border text-center border-rose-500/10">
                  <span className="text-[8px] font-bold text-rose-400 uppercase block">Clicked Link</span>
                  <span className="text-sm font-mono font-bold text-rose-400">{stats.clicked}</span>
                </div>
                <div className="rounded-lg bg-neutral-bg p-2 border border-neutral-border text-center border-rose-500/20">
                  <span className="text-[8px] font-bold text-rose-500 uppercase block">Passwords Exposed</span>
                  <span className="text-sm font-mono font-bold text-rose-500">{stats.credentials}</span>
                </div>
              </div>
            )}
          </div>

          {campaignProgress === 100 && (
            <div className="border-t border-neutral-border/80 mt-4 pt-3 flex items-center gap-2 text-[10px] text-text-secondary">
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Recommended Action: Enroll the {stats.clicked} clicked users in Phishing awareness module.</span>
            </div>
          )}
        </div>

        {/* Right Col: Interactive Employee Quiz Sandbox */}
        <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/50 p-4">
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-3">
            Employee Quiz Module Demo
          </span>

          <div className="rounded-lg bg-neutral-bg p-3 border border-neutral-border mb-3">
            <span className="text-[9px] font-mono text-text-secondary uppercase block mb-1">
              INCOMING EMAIL FOR AUDIT
            </span>
            <div className="text-2xs text-text-secondary border-b border-neutral-border pb-1 mb-2">
              <strong>From:</strong> security@am-azon.com <br />
              <strong>Subject:</strong> Immediate Action Required: Account Compromised!
            </div>
            <p className="text-[10px] text-text-secondary leading-normal">
              Dear user, we detected an unauthorized login to your account from Russia. Please click here to immediately verify your password: <u>http://am-azon.com/verify-account</u>
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-[10.5px] font-semibold text-text-secondary">
              What is the primary indicator that this email is a phish?
            </div>
            
            <div className="grid grid-cols-1 gap-2 text-2xs">
              <button
                onClick={() => handleQuizSubmit("A")}
                disabled={quizSubmitted}
                className={`w-full text-left p-2 rounded-lg border ${
                  quizSubmitted && quizAnswer === "A"
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                    : "bg-neutral-bg/50 border-neutral-border text-text-secondary hover:bg-neutral-bg"
                }`}
              >
                A. Sender address and link domains contain a typo: "am-azon.com" instead of "amazon.com".
              </button>
              <button
                onClick={() => handleQuizSubmit("B")}
                disabled={quizSubmitted}
                className={`w-full text-left p-2 rounded-lg border ${
                  quizSubmitted && quizAnswer === "B"
                    ? "bg-rose-500/10 border-rose-500 text-rose-400"
                    : "bg-neutral-bg/50 border-neutral-border text-text-secondary hover:bg-neutral-bg"
                }`}
              >
                B. The email addresses me as "Dear user" instead of my official employee username name.
              </button>
            </div>

            {quizSubmitted && (
              <div className={`mt-2 p-2 rounded text-2xs border ${
                quizAnswer === "A"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-rose-500/10 border-rose-500/20 text-rose-400"
              }`}>
                {quizAnswer === "A"
                  ? "Correct! The lookalike domain am-azon.com is a spoofed address designed to trick readers."
                  : "Incorrect. While generic greeting is suspicious, lookalike domain is the primary hard indicator."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
