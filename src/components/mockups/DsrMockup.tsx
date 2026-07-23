/**
 * @file DsrMockup.tsx
 * @description Interactive Data Subject Access Request (DSAR) handling list and detail viewer.
 */

import { useState } from "react";
import { UserCheck, CheckCircle2, AlertOctagon, Clock, UserCheck2, RefreshCw, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

interface DsrRequest {
  id: string;
  subject: string;
  type: 'Erasure' | 'Access' | 'Correction';
  slaDays: number;
  status: 'pending' | 'verifying' | 'resolved';
  email: string;
  address: string;
  phone: string;
  dob: string;
  locations: string;
}

/**
 * DsrMockup component displays incoming requests, processes auto-approvals, 
 * and shows privacy metadata profiles in a modal popup.
 */
export default function DsrMockup() {
  const [requests, setRequests] = useState<DsrRequest[]>([
    { 
      id: "DSR-1049", 
      subject: "Aarav Sharma", 
      type: "Erasure", 
      slaDays: 6, 
      status: "pending",
      email: "aarav.s*****@gmail.com",
      address: "H-42, Mayur Vihar, Delhi",
      phone: "+91 98765*****",
      dob: "12-07-2003",
      locations: "Database, Log Files, Analytics"
    },
    { 
      id: "DSR-1048", 
      subject: "Priya Patel", 
      type: "Access", 
      slaDays: 14, 
      status: "pending",
      email: "priya.p****@outlook.com",
      address: "A-12, Sector 62, Noida",
      phone: "+91 99112*****",
      dob: "24-11-1998",
      locations: "Database, Email Server"
    },
    { 
      id: "DSR-1047", 
      subject: "Vikram Singh", 
      type: "Correction", 
      slaDays: 22, 
      status: "resolved",
      email: "vikram.s****@yahoo.com",
      address: "C-9, Vasant Kunj, Delhi",
      phone: "+91 98104*****",
      dob: "05-09-1985",
      locations: "Log Files, Marketing Database"
    }
  ]);

  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<DsrRequest | null>(null);

  const handleResolve = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent modal opening triggers
    setProcessingId(id);
    
    // Simulate identification and data compilation delay
    setTimeout(() => {
      setRequests(prev => prev.map(req => {
        if (req.id === id) {
          const updated = { ...req, status: 'resolved' as const };
          // Automatically show detail popup on resolution to show compiled logs
          setSelectedRequest(updated);
          return updated;
        }
        return req;
      }));
      setProcessingId(null);
    }, 1200);
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-border bg-neutral-card p-4 sm:p-6 shadow-lg shadow-slate-100 relative">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3 mb-4">
        <div className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-teal-600" />
          <span className="text-sm font-bold text-text-primary">DSR Access & Erasure Portal</span>
        </div>
        <span className="text-[10px] font-bold text-teal-600 bg-teal-500/10 rounded px-1.5 py-0.5 uppercase">
          Interactive Mockup
        </span>
      </div>

      <div className="rounded-xl border border-neutral-border bg-neutral-sec-bg/50 p-3 sm:p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
            Incoming Data Subject Requests
          </span>
          <span className="text-[9px] text-text-secondary font-mono">SLA Period: 30 Days</span>
        </div>

        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedRequest(req)}
              className="rounded-lg bg-neutral-card p-3 border border-neutral-border flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer hover:border-brand-600/35 hover:shadow-sm transition-all"
            >
              {/* Left Column: Request Details */}
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 rounded-full p-1.5 ${
                  req.type === 'Erasure' ? 'bg-rose-500/10 text-rose-500' :
                  req.type === 'Access' ? 'bg-brand-600/10 text-brand-600' :
                  'bg-amber-500/10 text-amber-500'
                }`}>
                  <UserCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-text-secondary font-bold">{req.id}</span>
                    <span className="text-xs font-bold text-text-primary">{req.subject}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-bold text-text-secondary uppercase bg-neutral-bg px-1.5 py-0.5 rounded">
                      {req.type}
                    </span>
                    <span className="text-[9px] text-text-secondary flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-accent-500" /> {req.slaDays} days remaining
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Progress Control */}
              <div className="flex items-center justify-between md:justify-end gap-4 border-t border-neutral-border md:border-none pt-2.5 md:pt-0">
                {/* Progress Indicators */}
                <div>
                  {req.status === 'resolved' ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> RESOLVED
                    </span>
                  ) : req.status === 'verifying' || processingId === req.id ? (
                    <span className="text-[10px] font-bold text-brand-600 bg-blue-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> VERIFYING ID
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <AlertOctagon className="w-3.5 h-3.5" /> PENDING
                    </span>
                  )}
                </div>

                {/* Auto Action trigger button */}
                {req.status === 'pending' && (
                  <button
                    onClick={(e) => handleResolve(req.id, e)}
                    disabled={processingId !== null}
                    className="rounded-lg bg-brand-600 hover:bg-brand-700 px-3 py-1.5 text-2xs font-bold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Auto-Process
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Fidelity Data Subject Modal details */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="absolute inset-0 bg-neutral-bg/60 backdrop-blur-sm z-30 flex items-center justify-center p-4">
            <div className="bg-neutral-card border-2 border-neutral-border rounded-xl shadow-xl p-5 max-w-[340px] w-full relative">
              <button 
                onClick={() => setSelectedRequest(null)}
                className="absolute top-3 right-3 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="border-b border-neutral-border pb-2.5 mb-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-600" />
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">{selectedRequest.subject} Data</h4>
              </div>
              
              <div className="space-y-2 text-xs text-text-primary leading-relaxed font-semibold">
                <div>
                  <span className="text-text-secondary font-medium mr-1.5">Email:</span>
                  {selectedRequest.email}
                </div>
                <div>
                  <span className="text-text-secondary font-medium mr-1.5">Address:</span>
                  {selectedRequest.address}
                </div>
                <div>
                  <span className="text-text-secondary font-medium mr-1.5">Phone Number:</span>
                  {selectedRequest.phone}
                </div>
                <div>
                  <span className="text-text-secondary font-medium mr-1.5">Date of Birth:</span>
                  {selectedRequest.dob}
                </div>
                <div>
                  <span className="text-text-secondary font-medium mr-1.5">Data Locations:</span>
                  <span className="text-brand-600 font-bold">{selectedRequest.locations}</span>
                </div>
              </div>
              
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="rounded bg-brand-600 hover:bg-brand-700 px-3.5 py-1.5 text-2xs font-bold text-white transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
