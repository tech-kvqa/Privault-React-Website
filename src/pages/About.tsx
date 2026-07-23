import { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoButton from "@/components/BookDemoButton";
import { sectors } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const AboutIcon = ({ name, className = "w-5 h-5 text-brand-600" }: { name: string; className?: string }) => {
  const IconComp = (Icons as any)[name];
  if (IconComp) return <IconComp className={className} />;
  return <Icons.Shield className={className} />;
};

const SECTOR_THEMES = [
  { 
    solidColor: "#7c3aed", 
    semiTransColor: "rgba(124, 58, 237, 0.75)", 
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" 
  }, // SaaS & Cloud Platforms - Indigo/Violet
  { 
    solidColor: "#0891b2", 
    semiTransColor: "rgba(8, 145, 178, 0.75)", 
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" 
  }, // IT & Consultancy Firms - Cyan/Teal
  { 
    solidColor: "#059669", 
    semiTransColor: "rgba(5, 150, 105, 0.75)", 
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80" 
  }, // FinTech & Insurance - Green
  { 
    solidColor: "#e11d48", 
    semiTransColor: "rgba(225, 29, 72, 0.75)", 
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80" 
  }, // Healthcare & Pharma - Rose/Red
  { 
    solidColor: "#2563eb", 
    semiTransColor: "rgba(37, 99, 235, 0.75)", 
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" 
  }, // Education & Research - Royal Blue
  { 
    solidColor: "#d97706", 
    semiTransColor: "rgba(217, 119, 6, 0.75)", 
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80" 
  }, // Legal & Audit Firms - Amber/Orange (Scale of justice)
  { 
    solidColor: "#4f46e5", 
    semiTransColor: "rgba(79, 70, 229, 0.75)", 
    image: "https://www.un.org/sites/un2.un.org/files/2021/09/un-flags-common-agenda.jpg" 
  }  // Government & NGOs - Violet/Purple (UN Flags)
];

export default function About() {
  const whoWeAreRef = useRef<HTMLHeadingElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const el = whoWeAreRef.current;
    if (!el) return;

    const animation = gsap.fromTo(
      el.querySelectorAll(".reveal-word"),
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  const whoWeAreWords = "Who We Are".split(" ");

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#D4F6EE] text-text-primary selection:bg-brand-500/20 selection:text-brand-700">
        
        {/* Page Header */}
        <section className="relative overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-16 border-b border-neutral-border">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-brand-500/5 blur-[100px] pointer-events-none" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-text-primary leading-tight">About Us</h1>
            <p className="text-sm sm:text-base text-text-secondary mt-4 max-w-xl mx-auto leading-relaxed font-medium">
              At Privault, we believe privacy is not just compliance — it's a right and necessity.
            </p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-20 border-b border-neutral-border bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Heading/Kicker (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-600/20 bg-brand-600/5 px-3 py-1 text-[11px] font-bold text-brand-600 uppercase tracking-wider">
                  Our Foundation
                </span>
                <h2 
                  ref={whoWeAreRef}
                  className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-text-primary leading-none uppercase"
                >
                  {whoWeAreWords.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden mr-3">
                      <span className="inline-block reveal-word">
                        {word}
                      </span>
                    </span>
                  ))}
                </h2>
              </div>

              {/* Right Column: Paragraph blocks (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
                  As data becomes the new currency of the digital age, individuals and businesses alike deserve secure, ethical, and transparent systems to manage it. That's where we come in. Founded with the mission to simplify data protection, Privault is a next-generation platform built to help organizations navigate complex regulatory landscapes like India's Digital Personal Data Protection Act (DPDPA) and other global standards including GDPR, PDPL, and more — empowering compliance without slowing innovation.
                </p>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
                  Our flagship platform offers Automated Data Mapping & Classification, Data Breach Reporting & Response, HRMS, Compliance Dashboards, Auto-phishing campaigns, PII violation detection, Vendor Risk Management, DPIA Tools, Cross-border Transfer Safeguards, Privacy Policy Generators, and much more — all built with legal intelligence and privacy engineering at the core.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        {/* Dark navy background to contrast with light sections around it */}
        <section className="relative z-20 py-20 border-b border-[#2F476A]/40 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #12213a 100%)" }}
        >
          {/* Subtle grid texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          {/* Soft purple blur accent */}
          <div className="absolute bottom-[-50px] right-[-50px] w-[350px] h-[350px] bg-[#7c3aed]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Vision Card: Solid Signature Navy */}
              <div className="rounded-2xl border border-[#1f3557]/20 bg-[#1f3557] p-6 flex gap-4 transition-all duration-300 group shadow-md shadow-black/15 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-sm transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/20">
                  <Icons.Eye className="w-5 h-5 text-white stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Vision</h3>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-semibold">
                    To become India's leading data privacy enabler, fostering a digital ecosystem where innovation and compliance co-exist seamlessly.
                  </p>
                </div>
              </div>

              {/* Mission Card: Solid Near-Black / Dark Slate */}
              <div className="rounded-2xl border border-[#111c2e]/20 bg-[#111c2e] p-6 flex gap-4 transition-all duration-300 group shadow-md shadow-black/15 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-sm transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/20">
                  <Icons.Target className="w-5 h-5 text-white stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Mission</h3>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-semibold">
                    To provide intuitive, regulation-ready solutions that make data protection simple, scalable, and strategic for every organization.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Founder's Note */}
        <section className="py-16 border-b border-neutral-border bg-[#A4E4D3]/30 relative overflow-hidden">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary mb-6">A Note from the Founder</h2>
            <blockquote className="text-base sm:text-lg italic text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
              "Privault was created with one core belief: privacy should empower, not hinder. Most businesses want to do the right thing but get lost in legal complexity. We bridge the gap between regulation and execution—offering solutions that are clear, practical, and built to scale."
            </blockquote>
          </div>
        </section>

        {/* Who We Work With */}
        <section className="relative z-20 py-20 border-b border-[#1a2e52]/60 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f1f3d 50%, #142240 100%)" }}
        >
          {/* Subtle grid texture overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          {/* Radial glow accents */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#365c96]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-[#7c3aed]/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="mx-auto max-w-[92rem] w-full px-4 sm:px-8 md:px-12 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-none">
                Who We Work With
              </h2>
              <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm font-medium">
                Empowering trust and scalability across data-intensive sectors.
              </p>
            </div>

            {prefersReducedMotion ? (
              /* Static Grid Fallback for Prefers-Reduced-Motion */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5 max-w-7xl mx-auto px-4">
                {sectors.map((sec, idx) => {
                  const theme = SECTOR_THEMES[idx % SECTOR_THEMES.length];
                  return (
                    <div
                      key={idx}
                      className="relative w-full h-[280px] rounded-3xl overflow-hidden border border-white/10 shadow-lg group transition-all duration-300 hover:scale-[1.02]"
                      style={{ willChange: "transform" }}
                    >
                      {/* 1. Full-card photo backdrop (spans top to bottom, direct child) */}
                      <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500 scale-100 group-hover:scale-105 filter grayscale-[35%] brightness-[85%] contrast-[105%] group-hover:grayscale-0 group-hover:brightness-[100%]"
                        style={{ backgroundImage: `url(${theme.image})`, willChange: "transform" }}
                      />
                      {/* 2. Full-card solid-to-transparent gradient overlay (prevents any subpixel seams) */}
                      <div 
                        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                        style={{ 
                          background: `linear-gradient(to bottom, ${theme.solidColor} 0%, ${theme.solidColor} 38%, ${theme.semiTransColor} 52%, transparent 72%)` 
                        }}
                      />
                      {/* 3. Card Content: placed on top (z-20) */}
                      <div className="absolute top-0 inset-x-0 p-5 flex flex-col items-start gap-3.5 z-20">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:bg-white/30">
                          <AboutIcon name={sec.icon} className="w-4.5 h-4.5 text-white" />
                        </div>
                        <h3 
                          className="text-[13px] font-extrabold text-white !text-white tracking-wide uppercase leading-tight"
                          style={{ color: "#ffffff" }}
                        >
                          {sec.name}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Infinite Scrolling Marquee */
              <div className="w-full overflow-hidden relative py-4 scrollbar-none [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
                <div className="animate-marquee-slow hover:[animation-play-state:paused] flex gap-5">
                  {/* Duplicate the array to make the loop infinite and seamless */}
                  {[...sectors, ...sectors].map((sec, idx) => {
                    const theme = SECTOR_THEMES[idx % SECTOR_THEMES.length];
                    return (
                      <div
                        key={idx}
                        className="relative w-[260px] h-[280px] shrink-0 rounded-3xl overflow-hidden border border-white/10 shadow-lg group transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                        style={{ willChange: "transform" }}
                      >
                        {/* 1. Full-card photo backdrop (spans top to bottom, direct child) */}
                        <div
                          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500 scale-100 group-hover:scale-105 filter grayscale-[35%] brightness-[85%] contrast-[105%] group-hover:grayscale-0 group-hover:brightness-[100%]"
                          style={{ backgroundImage: `url(${theme.image})`, willChange: "transform" }}
                        />
                        {/* 2. Full-card solid-to-transparent gradient overlay (prevents any subpixel seams) */}
                        <div 
                          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                          style={{ 
                            background: `linear-gradient(to bottom, ${theme.solidColor} 0%, ${theme.solidColor} 38%, ${theme.semiTransColor} 52%, transparent 72%)` 
                          }}
                        />
                        {/* 3. Card Content: placed on top (z-20) */}
                        <div className="absolute top-0 inset-x-0 p-5 flex flex-col items-start gap-3.5 z-20">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:bg-white/30">
                            <AboutIcon name={sec.icon} className="w-4.5 h-4.5 text-white" />
                          </div>
                          <h3 
                            className="text-[13px] font-extrabold text-white !text-white tracking-wide uppercase leading-tight"
                            style={{ color: "#ffffff" }}
                          >
                            {sec.name}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <BookDemoButton />
      <Footer />
    </>
  );
}
