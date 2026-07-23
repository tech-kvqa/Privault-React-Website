import { useState } from "react";
import { Mail, MapPin, Send, Loader2, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoButton from "@/components/BookDemoButton";
import Grainient from "@/components/Grainient";
import SpotlightCard from "@/components/SpotlightCard";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);
 
    try {
      const response = await fetch("https://formspree.io/f/xbdadjar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
 
      if (response.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to submit.");
      }
    } catch (err) {
      setError("Unable to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#f8fafc] text-text-primary selection:bg-brand-500/20 selection:text-brand-700">
        
        {/* Header Hero Band with Animated WebGL Grainient */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20 border-b border-slate-200">
          {/* Animated WebGL Gradient Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Grainient
              color1="#0a1120"
              color2="#1f3557"
              color3="#121e36"
              timeSpeed={0.12}
              warpSpeed={0.4}
              grainAmount={0.06}
              className="w-full h-full"
            />
            {/* Subtle dark overlay scrim to guarantee heading and subtext readability */}
            <div className="absolute inset-0 bg-slate-950/20" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Contact Us
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-4 max-w-xl mx-auto leading-relaxed font-medium">
              Have questions about our data privacy solutions? Reach out to our legal tech specialists.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 relative">
          {/* Brand grid texture overlay to connect this section visually with the rest of the site */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              
              {/* Form Card Grid: 7 cols */}
              <SpotlightCard className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 md:col-span-7 shadow-lg shadow-slate-100/30">
                <h2 className="text-xl font-black tracking-tight text-[#1f3557] mb-6">Send a Message</h2>
                
                {success && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-emerald-600 mb-6">
                    <strong>Success!</strong> Your message has been sent successfully. We will review it shortly.
                  </div>
                )}

                {error && (
                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-xs text-rose-600 mb-6">
                    <strong>Error:</strong> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-[#1f3557] focus:ring-1 focus:ring-[#1f3557] focus:bg-white transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. aarav@company.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-[#1f3557] focus:ring-1 focus:ring-[#1f3557] focus:bg-white transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">
                      How can we help?
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your data protection requirements..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-[#1f3557] focus:ring-1 focus:ring-[#1f3557] focus:bg-white transition-all resize-none font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="relative group overflow-hidden w-full flex items-center justify-center gap-2 rounded-full bg-[#1f3557] hover:bg-[#1a2d4b] py-3.5 px-6 text-sm font-bold text-white shadow-[0_10px_25px_rgba(31,53,87,0.18)] hover:shadow-[0_12px_28px_rgba(31,53,87,0.25)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {/* Glare hover shine sweep element */}
                    <span className="absolute inset-0 w-[40%] h-full bg-white/20 -skew-x-12 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-[280%] pointer-events-none" />
                    
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </SpotlightCard>

              {/* Info Card Grid: 5 cols */}
              <SpotlightCard className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 md:col-span-5 flex flex-col justify-between shadow-lg shadow-slate-100/30">
                <div className="space-y-6">
                  <h2 className="text-xl font-black tracking-tight text-[#1f3557]">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 group/item">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1f3557]/10 bg-[#1f3557]/5 text-[#1f3557] shadow-sm transition-all duration-300 group-hover/item:bg-[#1f3557] group-hover/item:text-white group-hover/item:scale-105">
                        <Mail className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                          Email Address
                        </span>
                        <span className="text-sm text-[#1f3557] font-bold transition-colors group-hover/item:text-[#1a2d4b]">info@privault.ai</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group/item">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1f3557]/10 bg-[#1f3557]/5 text-[#1f3557] shadow-sm transition-all duration-300 group-hover/item:bg-[#1f3557] group-hover/item:text-white group-hover/item:scale-105">
                        <MapPin className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                          Corporate Office
                        </span>
                        <p className="text-sm text-text-primary font-semibold leading-relaxed mt-0.5 transition-colors group-hover/item:text-text-primary">
                          202, DLF Galleria Mall,<br />
                          Mayur Vihar Phase-1,<br />
                          Delhi-110091, India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group/item">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1f3557]/10 bg-[#1f3557]/5 text-[#1f3557] shadow-sm transition-all duration-300 group-hover/item:bg-[#1f3557] group-hover/item:text-white group-hover/item:scale-105">
                        <Clock className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                          Business Hours
                        </span>
                        <span className="text-sm text-text-primary font-semibold transition-colors group-hover/item:text-text-primary">
                          Mon–Fri, 9 AM – 6 PM IST
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6 mt-8 space-y-5">
                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-[#1f3557] mb-1">Prefer to talk live?</h4>
                      <p className="text-[10px] text-text-secondary leading-normal font-medium">
                        Schedule an intro meeting with our team.
                      </p>
                    </div>
                    <a
                      href="https://calendar.app.google/81BuaveR2dU9RX3a6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group overflow-hidden inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1f3557] hover:bg-[#1a2d4b] py-2 px-4 text-xs font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shrink-0 cursor-pointer"
                    >
                      <span className="absolute inset-0 w-[40%] h-full bg-white/20 -skew-x-12 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-[280%] pointer-events-none" />
                      <Calendar className="w-3.5 h-3.5" /> Book a Demo
                    </a>
                  </div>

                  <span className="text-[10px] text-text-secondary leading-relaxed font-semibold block">
                    Privacy Guarantee: We only use your submitted information to respond to your enquiry. No unsolicited marketing. No spam.
                  </span>
                </div>
              </SpotlightCard>

            </div>
          </div>
        </section>
      </main>
      <BookDemoButton />
      <Footer />
    </>
  );
}
