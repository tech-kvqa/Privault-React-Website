import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoButton from "@/components/BookDemoButton";
import AnimatedList, { AnimatedListProduct } from "@/components/AnimatedList";
import { motion, AnimatePresence } from "framer-motion";

const catalogProducts: AnimatedListProduct[] = [
  {
    slug: 'compliance-metrics',
    title: 'Compliance Metrics',
    description: 'Visualize KPIs, audit stats, consent records, and security performance.',
    icon: 'BarChart3',
    screenshot: '/product_images/Consent Management/Compliance Metrics.jpg'
  },
  {
    slug: 'breach-management',
    title: 'Breach Management',
    description: 'Track, contain, and report incidents with real-time dashboards.',
    icon: 'ShieldAlert',
    screenshot: '/product_images/Security Controls and Audit/Breach Reporting  DPDPA/Breach Dashboard.jpg'
  },
  {
    slug: 'dpia',
    title: 'DPIA (Risk Assessment)',
    description: 'Identify and mitigate risks through structured privacy assessments.',
    icon: 'FileWarning',
    screenshot: '/product_images/DPIA risk_assesment/DPIA Dashboard.png'
  },
  {
    slug: 'governance',
    title: 'Governance',
    description: 'Set rules and policies for better data handling and audit readiness.',
    icon: 'Scale',
    screenshot: '/product_images/inventory onboarding/Data Inventory Register.png'
  },
  {
    slug: 'dsr-management',
    title: 'DSR Management',
    description: 'Handle data subject access and erasure requests seamlessly.',
    icon: 'UserCheck',
    screenshot: '/product_images/User Rights DSRM/Data Subject Dashbaord.png'
  },
  {
    slug: 'vendor-management',
    title: 'Vendor Management',
    description: 'Evaluate, onboard, and monitor vendors for compliance alignment.',
    icon: 'Briefcase',
    screenshot: '/product_images/Vendor managemnt/Vendor Dashboard.png'
  },
  {
    slug: 'phishing-app',
    title: 'Phishing App',
    description: 'Run email simulations to train and track employee awareness.',
    icon: 'MailWarning',
    screenshot: '/product_images/Training/Trainig Dashbaord.png'
  }
];

export default function ProductsCatalog() {
  const [selectedProduct, setSelectedProduct] = useState<AnimatedListProduct>(catalogProducts[0]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 3.5, y: y * -3.5 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleItemSelect = (item: AnimatedListProduct) => {
    setSelectedProduct(item);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#D4F6EE] text-text-primary selection:bg-brand-500/20 selection:text-brand-700">
        
        {/* Page Header */}
        <section className="relative overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-16 border-b border-neutral-border">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-brand-500/5 blur-[100px] pointer-events-none" />
          </div>
          <div className="relative z-10 mx-auto max-w-[92rem] w-full px-4 sm:px-8 md:px-12 text-center">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-text-primary leading-tight">
              Compliance Modules
            </h1>
            <p className="text-sm sm:text-base text-text-secondary mt-4 max-w-xl mx-auto leading-relaxed font-medium">
              Explore our comprehensive, legal-grade compliance suites built to safeguard PII, verify processors, and train employee nodes.
            </p>
          </div>
        </section>

        {/* Premium Interactive Feature Explorer Section */}
        <section className="py-20 bg-[#051124] relative overflow-hidden border-b border-neutral-border">
          {/* Subtle grid accent overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Ambient colorful gradients */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#294B80]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] bg-[#87DEC7]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="mx-auto max-w-[92rem] w-full px-4 sm:px-8 md:px-12 z-10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left column (35-40%): Features AnimatedList */}
              <div className="lg:col-span-5 flex flex-col justify-center text-left">
                <div className="mb-6 select-none">
                  <span className="text-[10px] font-bold text-[#87DEC7] uppercase tracking-[0.25em] mb-1.5 block">
                    Interactive Catalog
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Explore Privault Modules
                  </h2>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2.5 max-w-sm">
                    Hover or use your keyboard keys (Tab/Arrows) to preview dashboards, click to inspect.
                  </p>
                </div>

                <AnimatedList 
                  items={catalogProducts}
                  onItemSelect={handleItemSelect}
                  showGradients={true}
                  enableArrowNavigation={true}
                  displayScrollbar={true}
                />
              </div>

              {/* Right column (60-65%): Large Pinned Browser Mockup */}
              <div className="lg:col-span-7 flex justify-center w-full relative">
                <motion.div
                  style={{
                    rotateX: tilt.y,
                    rotateY: tilt.x,
                    transformStyle: "preserve-3d",
                    perspective: 1000
                  }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="w-full aspect-[16/10.2] rounded-2xl border border-white/10 bg-[#071329]/60 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col transition-shadow duration-300 select-none cursor-pointer"
                >
                  {/* Glass reflection glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-60 pointer-events-none z-20" />
                  
                  {/* Browser Header Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-slate-950/30 select-none shrink-0">
                    {/* Window dots */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>

                    {/* URL Address Bar */}
                    <div className="mx-auto max-w-sm sm:max-w-md w-full px-3 py-0.5 rounded-lg border border-white/5 bg-[#051124]/40 text-[9px] text-slate-400 font-semibold tracking-wider text-center truncate pointer-events-none">
                      {`app.privault.ai/dashboard/${selectedProduct.slug}`}
                    </div>

                    {/* Right spacer */}
                    <div className="w-8 shrink-0" />
                  </div>

                  {/* Screenshot display block with smooth crossfade and upward zoom */}
                  <div className="w-full flex-1 relative bg-slate-950 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedProduct.slug}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 25, scale: 0.98 }}
                        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1.0 }}
                        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -25, scale: 1.02 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <img
                          src={selectedProduct.screenshot}
                          alt={selectedProduct.title}
                          className="w-full h-full object-contain object-top select-none"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <BookDemoButton />
      <Footer />
    </>
  );
}
