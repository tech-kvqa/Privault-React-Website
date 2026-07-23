import { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoButton from "@/components/BookDemoButton";
import LockAnimation from "@/components/LockAnimation";
import MagicBento from "@/components/MagicBento";
import MarqueeHeader from "@/components/MarqueeHeader";
import { sectors, reasons } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const ProductIcon = ({ name, className = "w-6 h-6 text-brand-600" }: { name: string; className?: string }) => {
  const IconComp = (Icons as any)[name];
  if (IconComp) return <IconComp className={className} />;
  return <Icons.Shield className={className} />;
};

// Bold, solid, saturated colors and representative images for the 7 industries
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

// Confident solid background colors for the 6 reason cards, matching the visual confidence of the pills above
const REASON_CARD_COLORS = [
  { bg: "bg-[#1f3557] hover:bg-[#162947]", border: "border-[#1f3557]/20" },
  { bg: "bg-[#1f3557] hover:bg-[#162947]", border: "border-[#1f3557]/20" },
  { bg: "bg-[#1f3557] hover:bg-[#162947]", border: "border-[#1f3557]/20" },
  { bg: "bg-[#1f3557] hover:bg-[#162947]", border: "border-[#1f3557]/20" },
  { bg: "bg-[#1f3557] hover:bg-[#162947]", border: "border-[#1f3557]/20" },
  { bg: "bg-[#1f3557] hover:bg-[#162947]", border: "border-[#1f3557]/20" },
];

export default function Home() {
  const whyChooseRef = useRef<HTMLHeadingElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const el = whyChooseRef.current;
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

  const whyChooseWords = "Why Choose Privault?".split(" ");

  return (
    <>
      <Navbar />
      {/*
        IMPORTANT: <main> uses bg-[#0a1628] (deep dark navy) — NOT bg-neutral-bg (#5EA9DE).
        This ensures that when the GSAP-pinned lock animation scrolls, the transparent
        LockAnimation container doesn't bleed a blank flat-blue background through the viewport.
        The dark base color is visually absorbed by the dark Solutions section that follows.
      */}
      <main className="flex-1 bg-[#294B80] text-text-primary selection:bg-brand-500/20 selection:text-brand-700">
        
        {/* Hero Section — transparent container, no background bleed */}
        <LockAnimation />

        {/* Inner Content Wrapper — transparent, sections carry their own backgrounds */}
        <div className="relative bg-transparent">

          {/* Smooth gradient transition from hero into the dark Solutions section */}
          <div className="h-24 relative overflow-hidden"
            style={{ background: "linear-gradient(to bottom, #5EA9DE 0%, #3d7bb5 30%, #2a5a8e 55%, #1f3557 100%)" }}
          />

          {/* ── SECTION 1: Compliance Solutions ── */}
          <section id="solutions" className="relative z-20 pt-6 pb-0 border-b border-neutral-border bg-gradient-to-b from-[#1f3557] to-[#0d1b3e] text-white overflow-hidden">
            {/* MarqueeHeader acts as the section title — no duplicate heading needed */}
            <div className="mx-auto max-w-[92rem] w-full px-4 sm:px-8 md:px-12 mb-6">
              <MarqueeHeader />
            </div>

            {/* Bento product grid */}
            <MagicBento
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={320}
              particleCount={10}
              glowColor="30, 60, 200"
            />
          </section>

          {/* ── SECTION 2: Industries We Serve ── */}
          {/* Dark navy with subtle grid texture — distinct from the sections around it */}
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
                            <ProductIcon name={sec.icon} className="w-4.5 h-4.5 text-white" />
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
                              <ProductIcon name={sec.icon} className="w-4.5 h-4.5 text-white" />
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

          {/* ── SECTION 3: Why Choose Privault ── */}
          {/* Genuinely bright off-white gradient background — creating strong visual contrast between dark sections */}
          <section className="relative z-20 py-20 border-b border-slate-300/60 overflow-hidden"
            style={{ background: "linear-gradient(150deg, #f8fafc 0%, #f1f5f9 60%, #e2e8f0 100%)" }}
          >
            {/* Soft cyan/mint glow spots */}
            <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] bg-[#87DEC7]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-60px] left-[-60px] w-[400px] h-[400px] bg-[#87DEC7]/10 rounded-full blur-[120px] pointer-events-none" />
            {/* Subtle slate grid */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
                backgroundSize: "52px 52px",
              }}
            />

            <div className="mx-auto max-w-[92rem] w-full px-4 sm:px-8 md:px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* Left Column: Heading (lg:col-span-5) */}
                <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
                  <h2 
                    ref={whyChooseRef}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-[#1f3557] leading-tight uppercase"
                  >
                    {whyChooseWords.map((word, i) => (
                      <span key={i} className="inline-block overflow-hidden mr-3 last:mr-0">
                        <span className="reveal-word inline-block">
                          {word}
                        </span>
                      </span>
                    ))}
                  </h2>
                  <p className="text-slate-600 text-base lg:text-lg font-medium leading-relaxed max-w-md">
                    We bridge the gap between rigorous compliance and high-velocity engineering.
                  </p>
                  <div className="pt-4">
                    <BookDemoButton />
                  </div>
                </div>

                {/* Right Column: Cards (lg:col-span-7) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {reasons.map((reason, idx) => {
                    const color = REASON_CARD_COLORS[idx % REASON_CARD_COLORS.length];
                    return (
                      <div
                        key={idx}
                        className={`group relative flex items-start gap-4 p-6 rounded-[2rem] border ${color.border} ${color.bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1f3557]/10`}
                      >
                        {/* Icon badge — left */}
                        <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-inner group-hover:scale-110 transition-transform duration-300">
                          <ProductIcon name={reason.icon} className="w-6 h-6 text-[#87DEC7]" />
                        </div>
                        {/* Text — right, vertically centered */}
                        <p className="text-white text-sm font-semibold leading-snug self-center">
                          {reason.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
