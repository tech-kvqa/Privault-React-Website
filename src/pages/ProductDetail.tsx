import { Link, useParams } from "react-router-dom";
import * as Icons from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoButton from "@/components/BookDemoButton";
import { products } from "@/constants";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import DraggableFeatureStack from "@/components/DraggableFeatureStack";
import TextType from "@/components/TextType";

interface ProductImage {
  label: string;
  description: string;
  path: string;
}

const PRODUCT_GALLERIES: Record<string, ProductImage[]> = {
  "compliance-metrics": [
    { label: "Compliance Metrics Dashboard", description: "Get real-time visibility into active consent metrics, privacy policy updates, and cross-border flow status.", path: "/product_images/Consent Management/Compliance Metrics.jpg" },
    { label: "Consents Log Table", description: "Access an immutable audit trail of customer consents, categorized by data type and timestamp.", path: "/product_images/Consent Management/Consents Table.jpg" },
    { label: "Policy Generator Dashboard", description: "Draft, customize, and edit personal data protection policies aligned with global frameworks.", path: "/product_images/Policy Generator/Policy Generator Dashboard.jpg" },
    { label: "Privacy Policy Analyzer", description: "Scan your existing privacy policies to detect compliance gaps and missing statutory provisions.", path: "/product_images/Policy Generator/Policy Analyzer.jpg" },
    { label: "Policy Assessment Questionnaire", description: "Answer structured questions to auto-generate personalized data protection policies.", path: "/product_images/Policy Generator/Privacy Policy Questionnaire.jpg" },
    { label: "Data Minimization Dashboard", description: "Establish and enforce structural limits on personal data collections to ensure lean operations.", path: "/product_images/Data Minimization/Dashboard.jpg" },
    { label: "Minimal Data Fields Configuration", description: "Identify and discard unnecessary fields from user onboarding databases.", path: "/product_images/Data Minimization/Minimal Fields.jpg" }
  ],
  "breach-management": [
    { label: "Breach Incident Dashboard", description: "Monitor active security incidents, SLA containment clocks, and historic breach severity logs.", path: "/product_images/Security Controls and Audit/Breach Reporting  DPDPA/Breach Dashboard.jpg" },
    { label: "Breach Incident Logs", description: "Audit detailed reports of data breaches, documenting impacted systems, data categories, and individual counts.", path: "/product_images/breach/Breach management dashboard'.png" },
    { label: "Breach Escalation Details", description: "Conduct Root Cause Analysis (RCA) and trace handler assignment milestones for open breaches.", path: "/product_images/breach/Breach incident details.png" },
    { label: "Escalated Incidents Board", description: "Assign containment handlers and track SLA clocks for critical, high-severity data breaches.", path: "/product_images/breach/Breach incident managemnt escalated.png" },
    { label: "Government Regulatory Reporting Form", description: "Auto-generate pre-filled breach report templates to notify regulatory bodies within the statutory timeline.", path: "/product_images/Security Controls and Audit/Breach Reporting  DPDPA/Breach Report to Government.jpg" }
  ],
  "dpia": [
    { label: "DPIA Assessment Dashboard", description: "Review overall DPIA compliance scores, ongoing risk registers, and approval status queues.", path: "/product_images/DPIA risk_assesment/DPIA Dashboard.png" },
    { label: "Risk Identification & Rating Panel", description: "Identify threat scenarios, evaluate PII vulnerabilities, and score risk levels based on likelihood and impact.", path: "/product_images/DPIA risk_assesment/Risk Identification.png" },
    { label: "Mitigation Action Plan & Task Manager", description: "Assign compliance mitigation tasks to data protection officers and track resolution actions.", path: "/product_images/DPIA risk_assesment/Action Plan and task management.png" }
  ],
  "governance": [
    { label: "Data Inventory Mapping Register", description: "Maintain a complete data inventory mapping data types, storage destinations, and business owners.", path: "/product_images/inventory onboarding/Data Inventory Register.png" },
    { label: "Data Flow Asset Inventory", description: "Verify physical storage locations, encryption statuses, and processing purposes for company assets.", path: "/product_images/inventory onboarding/Data Inventory Registry Detailed view.png" },
    { label: "Edit Registry Entry", description: "Easily update PII categories, retention periods, and transfer rules for any registry item.", path: "/product_images/inventory onboarding/Edit Data Inventory.png" },
    { label: "Grievance Management Dashboard", description: "Track citizen complaints, grievance response clocks, and DPO resolution performance.", path: "/product_images/DPO_grievance_management/Grievance Management Dashboard.png" },
    { label: "Grievance Tickets Listing", description: "Manage citizen query tickets, assign resolution steps, and enforce communication timelines.", path: "/product_images/DPO_grievance_management/Grievance Tickets.png" },
    { label: "DPO Officers List", description: "Designate and display official DPO credentials to remain compliant with corporate governance norms.", path: "/product_images/DPO_grievance_management/Dpo list.png" },
    { label: "DPO Resolution Evidence report", description: "Collect and log resolution proof for completed grievance tickets to ensure audit-readiness.", path: "/product_images/DPO_grievance_management/DPO Evidence report.png" }
  ],
  "dsr-management": [
    { label: "Data Subject DSR Dashboard", description: "Centralize intake logs for user rights requests (access, correction, erasure) and track containment SLAs.", path: "/product_images/User Rights DSRM/Data Subject Dashbaord.png" },
    { label: "DSR Request Intake Form Builder", description: "Deploy public DSR forms with custom identity verification fields and 2FA options.", path: "/product_images/User Rights DSRM/DSR Forms.png" }
  ],
  "vendor-management": [
    { label: "Vendor Risk Assessment Dashboard", description: "Veter third-party subcontractor profiles, evaluate vendor risk scores, and check active DPA contracts.", path: "/product_images/Vendor managemnt/Vendor Dashboard.png" },
    { label: "Vendor Inventory List", description: "Access a centralized index of third-party processors, tracking compliance status and data categories.", path: "/product_images/Vendor managemnt/Vendor List.png" },
    { label: "Upcoming Vendor Assessment Scheduler", description: "Schedule automated vendor risk assessments and configure contract renewal alarms.", path: "/product_images/Vendor managemnt/Upcoming Vendor Assessments.png" },
    { label: "Vendor Evaluations & DPA Auditor", description: "Audit vendor responses, verify security credentials, and check compliance proof documents.", path: "/product_images/Vendor managemnt/Vendor Evaluations.png" }
  ],
  "phishing-app": [
    { label: "Training & Phishing Dashboard", description: "Monitor user training campaign completions, active quizzes, and department-level phishing click rates.", path: "/product_images/Training/Trainig Dashbaord.png" },
    { label: "Employee Learning Materials Portal", description: "Distribute interactive study materials, case studies, and corporate privacy guidelines.", path: "/product_images/Training/Study Material Page.png" },
    { label: "Employee Training Status", description: "Check course progression logs, outstanding lessons, and training records for each department.", path: "/product_images/Training/Employee Training Page.png" },
    { label: "Interactive Phishing Quiz", description: "Reinforce awareness with real-world scenario questions and immediate feedback explanations.", path: "/product_images/Training/Employee Quiz Page.png" },
    { label: "Compliance Scorecard & Results", description: "Log quiz completions, issue certificates of achievement, and trace historic performance logs.", path: "/product_images/Training/Training Result.png" },
    { label: "Training Records Ledger", description: "Maintain detailed history logs of training approvals, edits, and course creations.", path: "/product_images/Training/Training Records.png" }
  ]
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const gallery = PRODUCT_GALLERIES[product?.slug || ""] || [];

  // Track scroll inside container to set active screenshot
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (gallery.length === 0) return;
    const index = Math.min(
      Math.floor(latest * gallery.length),
      gallery.length - 1
    );
    setActiveIndex(index);
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.02]);

  const handlePillClick = (index: number) => {
    if (!containerRef.current || prefersReducedMotion) {
      setActiveIndex(index);
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const sectionHeight = rect.height;
    // Calculate scroll target with small padding offset to trigger threshold
    const scrollTarget =
      scrollTop +
      (index / gallery.length) * (sectionHeight - window.innerHeight) +
      10;
    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth"
    });
  };

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

  useEffect(() => {
    setActiveIndex(0);
  }, [slug]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
  }, []);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-[#D4F6EE] text-text-primary flex flex-col items-center justify-center py-32 px-4 selection:bg-brand-500/20 selection:text-brand-700">
          <Icons.ShieldAlert className="w-16 h-16 text-rose-500 mb-6" />
          <h1 className="text-3xl font-black mb-4">Product Not Found</h1>
          <p className="text-text-secondary mb-8 max-w-md text-center text-sm font-medium">
            The module you are trying to access does not exist or has been moved.
          </p>
          <Link
            to="/products"
            className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-colors"
          >
            Browse All Modules
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#D4F6EE] text-text-primary selection:bg-brand-500/20 selection:text-brand-700">
        {/* Merged Product Intro Section */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-neutral-border">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-brand-500/5 blur-[100px] pointer-events-none" />
          </div>
          
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              
              {/* Left Column: Heading/Kicker (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-600/20 bg-brand-600/5 px-3 py-1 text-[11px] font-bold text-brand-600 uppercase tracking-wider">
                  Overview & Capabilities
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-text-primary leading-none uppercase">
                  <TextType
                    key={product.slug}
                    text={product.title}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    loop={false}
                    startOnVisible={true}
                    hideCursorWhileTyping={false}
                  />
                </h1>
              </div>

              {/* Right Column: Subtitle + Overview (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-6 lg:pl-10">
                <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-semibold">
                  {product.description}
                </p>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
                  {product.overview}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Product Interface Gallery (Apple/Stripe-Inspired Two-Column Sticky Showcase) */}
        {gallery.length > 0 && (
          <section ref={containerRef} className="relative w-full bg-[#051124]" style={{ height: "200vh" }}>
            {/* Sticky presentation viewport wrapper */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
              
              {/* Brand grid texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              {/* Radial gradient glow accents for depth */}
              <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[#294B80]/15 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-[#87DEC7]/5 rounded-full blur-[90px] pointer-events-none" />

              {/* Main Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-16 items-center z-10">
                
                {/* Left Column: Navigation, details and vertical progress indicator */}
                <div className="lg:col-span-5 flex flex-col justify-between py-4 text-left">
                  
                  <div>
                    {/* Subtle Title Tag */}
                    <span className="text-[10px] font-bold text-[#87DEC7] uppercase tracking-[0.25em] mb-4 block">
                      Product Tour
                    </span>

                    {/* Progress Indicator and text */}
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500 tracking-widest uppercase mb-6 select-none">
                      <span className="text-[#87DEC7]">0{activeIndex + 1}</span>
                      {/* Horizontal progress bar */}
                      <div className="h-1 w-24 bg-white/10 relative rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-[#87DEC7]"
                          style={{ width: `${((activeIndex + 1) / gallery.length) * 100}%` }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      </div>
                      <span>0{gallery.length}</span>
                    </div>

                    {/* Feature title & description */}
                    <div className="min-h-[160px] flex flex-col justify-start">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeIndex}
                          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="space-y-3"
                        >
                          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                            {gallery[activeIndex]?.label || gallery[0].label}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
                            {gallery[activeIndex]?.description || gallery[0].description}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Feature Pills Navigation */}
                  {gallery.length > 1 && (
                    <div className="flex flex-col gap-2.5 mt-8 max-w-sm select-none">
                      {gallery.map((img, imgIdx) => {
                        const isImageActive = imgIdx === activeIndex;
                        return (
                          <button
                            key={img.label}
                            onClick={() => handlePillClick(imgIdx)}
                            className={`relative w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer flex items-center justify-between ${
                              isImageActive
                                ? "border-[#87DEC7]/20 text-[#87DEC7] font-black"
                                : "border-white/5 bg-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            {isImageActive && (
                              <motion.div
                                layoutId="activePillBg"
                                className="absolute inset-0 bg-[#87DEC7]/10 rounded-xl z-[-1]"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                              />
                            )}
                            <div className="flex items-center gap-2.5">
                              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isImageActive ? "bg-[#87DEC7]" : "bg-white/20"}`} />
                              <span className="truncate max-w-[200px]">{img.label}</span>
                            </div>
                            
                            {isImageActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-1.5 h-1.5 rounded-full bg-[#87DEC7]"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Column: Sticky Browser Mockup */}
                <div className="lg:col-span-7 flex justify-center w-full relative">
                  <motion.div
                    style={{
                      scale: prefersReducedMotion ? 1 : scale,
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
                        {`app.privault.ai/dashboard/${product.slug}`}
                      </div>

                      {/* Right spacer */}
                      <div className="w-8 shrink-0" />
                    </div>

                    {/* Screenshot display block with smooth crossfade and upward slide */}
                    <div className="w-full flex-1 relative bg-slate-950 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeIndex}
                          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
                          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -30, scale: 1.02 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 w-full h-full"
                        >
                          <img
                            src={gallery[activeIndex]?.path || gallery[0].path}
                            alt={gallery[activeIndex]?.label || gallery[0].label}
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
        )}

        {/* Key Features Section - 3D Draggable Card Stack */}
        <section className="w-full bg-[#051124] py-20 overflow-hidden relative border-b border-neutral-border text-white">
          {/* Subtle background grid flare */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,89,215,0.04)_0%,transparent_70%)] pointer-events-none" />

          <div className="mx-auto max-w-[92rem] w-full px-4 sm:px-8 md:px-12 relative z-10 overflow-visible">
            <div className="text-center mb-12">
              <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white">
                Key Features & Spec List
              </h2>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                Drag the cards or use your arrow keys to explore details of {product.title}.
              </p>
            </div>

            <div className="max-w-[1200px] mx-auto overflow-visible">
              <DraggableFeatureStack features={product.features} productTitle={product.title} />
            </div>
          </div>
        </section>

        {/* CTA Contact Footer */}
        <section className="py-16 bg-gradient-to-b from-white to-[#D4F6EE] border-b border-neutral-border">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary">
              Ready to implement {product.title}?
            </h2>
            <p className="text-xs text-text-secondary max-w-lg mx-auto leading-normal font-medium">
              Schedule a demonstration call with our engineering team to assess how we can integrate this module within your existing infrastructure.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="https://calendar.app.google/81BuaveR2dU9RX3a6"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand-600 hover:bg-brand-700 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-brand-600/15 transition-all hover:scale-105"
              >
                Schedule Demo Meet
              </a>
              <Link
                to="/contact"
                className="rounded-full border border-neutral-border bg-neutral-card hover:bg-neutral-bg/40 px-6 py-2.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
      <BookDemoButton />
      <Footer />
    </>
  );
}
