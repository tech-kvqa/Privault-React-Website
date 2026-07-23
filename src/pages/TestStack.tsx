/**
 * @file TestStack.tsx
 * @description Preview page for DraggableFeatureStack showcasing the full-width fanned 3D deck
 *   directly on the page, with zero box constraints.
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DraggableFeatureStack from "@/components/DraggableFeatureStack";

const demoFeatures = [
  {
    title: "Multi-Step Reporting",
    description: "Submit breaches using a structured wizard (Incident, Systems, Impact, Evidence) with draft saving.",
    icon: "FileText",
  },
  {
    title: "Severity Classification",
    description: "Automatically classify breaches by data type, individual count, and overall severity level.",
    icon: "Cpu",
  },
  {
    title: "Instant Alerts",
    description: "Notify legal, compliance, and incident response teams immediately upon breach report.",
    icon: "BellRing",
  },
  {
    title: "Role-Based Collaboration",
    description: "Admins, Handlers, Compliance officers, and Auditors have tailored privileges and access.",
    icon: "Users",
  },
  {
    title: "Secure Archiving",
    description: "Retain breaches for 5 years and then archive securely with integrity validation.",
    icon: "Archive",
  },
];

export default function TestStack() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#D4F6EE] text-text-primary selection:bg-brand-500/20 selection:text-brand-700">
        
        {/* Header Section */}
        <section className="pt-24 pb-12 text-center px-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-500/5 px-3 py-1 text-2xs font-bold text-brand-600 uppercase tracking-wider mb-4">
            Interactive Deck Preview
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
            3D Semi-Circular Feature Stack
          </h1>
          <p className="text-sm text-text-secondary max-w-xl mx-auto mt-4 font-semibold leading-relaxed">
            Drag the active center card horizontally to rotate the deck. All features are arranged along a parabolic 3D semi-circle that fans out across the page.
          </p>
        </section>

        {/* Full-width Stack Section (Mimicking the Product Detail section layout) */}
        <section className="w-full bg-[#051124] py-20 overflow-hidden relative border-y border-white/5">
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

          {/* Interactive Stack */}
          <div className="mx-auto max-w-[1200px] w-full px-4 md:px-12 relative z-10 overflow-visible">
            <DraggableFeatureStack features={demoFeatures} productTitle="Breach Management" />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
