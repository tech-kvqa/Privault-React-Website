import { useEffect, useState } from "react";
import { 
  Shield, 
  Database, 
  UserCheck, 
  Scale, 
  Share2, 
  Key, 
  Globe, 
  Clock, 
  Lock, 
  Mail, 
  FileText,
  ChevronRight,
  ShieldCheck,
  UserX,
  CreditCard,
  Laptop
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoButton from "@/components/BookDemoButton";
import Grainient from "@/components/Grainient";
import SpotlightCard from "@/components/SpotlightCard";

interface Section {
  id: string;
  title: string;
  icon: any;
  content: React.ReactNode;
}

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    document.title = "Privacy Policy | Privault";
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".policy-section");
      let currentActive = "overview";
      
      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop - 200;
        const height = (section as HTMLElement).offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          currentActive = section.id;
        }
      });
      
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 120;
      window.scrollTo({
        top,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  const sections: Section[] = [
    {
      id: "overview",
      title: "Business Overview",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            This Privacy Policy sets out how Privault Assessment Pvt Ltd (“Company,” “we,” “us,” or “our”) processes personal data collected through its website located at <span className="font-bold text-[#1f3557]">www.privault.ai</span> and in connection with the provision of its services. We are committed to ensuring that the personal information of individuals who interact with our services is handled lawfully, fairly, and transparently.
          </p>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            This document explains the categories of personal data we collect, the purposes for which we process such data, and the rights individuals may exercise in relation to their personal information.
          </p>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            By using our services or accessing our website, individuals acknowledge that they have read and understood this Privacy Policy and agree to the collection, use, and disclosure of their personal data as described herein.
          </p>
        </div>
      )
    },
    {
      id: "data-collection",
      title: "Data Collection",
      icon: Database,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            We collect personal data and other information from individuals in a lawful, fair, and transparent manner when they access or use our services, interact with our website, or communicate with us. The personal data we collect is limited to what is relevant and necessary for the purposes described in this Privacy Policy.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1f3557]/5 text-[#1f3557]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#1f3557]">Personal Identifiable Information (PII)</h4>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                Names, email addresses, phone numbers, postal addresses, and other direct contact details.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1f3557]/5 text-[#1f3557]">
                  <Laptop className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#1f3557]">Technical & Usage Information</h4>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                IP addresses, browser types, operating systems, device identifiers, and details about how users interact with our website and services.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1f3557]/5 text-[#1f3557]">
                  <Globe className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#1f3557]">Cookies & Tracking</h4>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                Information collected through cookies, web beacons, and similar technologies used to enhance user experience and analyze website traffic.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1f3557]/5 text-[#1f3557]">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#1f3557]">Financial Information</h4>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                Payment card details, billing addresses, or transaction history when individuals make purchases or financial transactions through our services.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "sources",
      title: "Direct Sources",
      icon: UserCheck,
      content: (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="text-xs font-bold text-[#1f3557] mb-2 uppercase tracking-wide">Directly collected</h4>
            <p className="text-sm text-text-secondary leading-relaxed font-medium">
              We collect personal data directly from individuals when they access our website, use our services, communicate with us, or otherwise voluntarily provide information. This may occur through account registrations, form submissions, surveys, transactions, customer support interactions, or other direct engagement with our services. All data collected directly is obtained with the individual’s knowledge and, where required, with their appropriate consent.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "legal-basis",
      title: "Legal Basis for Processing",
      icon: Scale,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            We process personal data only when we have a valid legal basis to do so, as required by applicable data protection laws. Depending on the context and type of personal data involved, we may rely on one or more of the following lawful bases:
          </p>
          <div className="space-y-3">
            {[
              { title: "Consent", desc: "We process personal data where individuals have provided their clear, informed, and unambiguous consent for a specific purpose. Consent can be withdrawn at any time, subject to applicable legal or contractual restrictions." },
              { title: "Performance of a Contract", desc: "Processing is necessary for the performance of a contract to which the individual is a party, or to take steps at the individual’s request before entering into a contract." },
              { title: "Compliance with Legal Obligations", desc: "We process personal data where it is necessary to comply with our legal obligations, such as maintaining records for tax, accounting, regulatory, or law enforcement purposes." },
              { title: "Legitimate Interests", desc: "We may process personal data where it is necessary for our legitimate business interests, provided that such interests are not overridden by the interests, rights, or freedoms of the individuals concerned. These interests typically include business operations, service improvement, fraud prevention, and network security." },
              { title: "Vital Interests", desc: "We may process personal data where it is necessary to protect an individual’s vital interests, such as in emergency medical situations or other circumstances where the health and safety of an individual is at risk." },
              { title: "Public Interest", desc: "We may process personal data where it is necessary to perform a task carried out in the public interest or in the exercise of official authority vested in us." }
            ].map((basis, idx) => (
              <div key={idx} className="flex gap-3 items-start border-l-2 border-[#1f3557] pl-3 py-1">
                <div>
                  <h4 className="text-xs font-bold text-[#1f3557]">{basis.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-medium mt-0.5">{basis.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "third-party",
      title: "Third-Party Sharing",
      icon: Share2,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            We do not share personal data with any third parties except where required by law or with service providers that assist us in operating our services and website, provided these service providers are bound by confidentiality agreements.
          </p>
          <div className="rounded-xl border border-rose-100 bg-rose-50/20 p-4 flex gap-3 items-start">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 mt-0.5">
              <UserX className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-rose-950">No Data Selling or Renting</h4>
              <p className="text-xs text-rose-900/80 leading-relaxed font-medium mt-0.5">
                We do not sell or rent personal data to third parties. Any data shared for legal or service-related purposes is done so under strict terms that ensure the protection of personal information.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "user-rights",
      title: "User Rights",
      icon: Key,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            We provide individuals with certain rights regarding their personal data, in line with applicable data protection laws. The rights available to users include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Right to Access", desc: "Request access to the personal data we hold. Allows knowing what data is being processed, processing purposes, and recipients. We provide data in a structured, machine-readable format." },
              { title: "Right to Correction", desc: "Request correction of inaccurate or incomplete personal data. We take immediate steps to update or rectify the information." },
              { title: "Right to Deletion", desc: "Request data deletion when it is no longer necessary, consent is withdrawn, or data is processed unlawfully. We assess requests on a case-by-case basis." },
              { title: "Right to Portability", desc: "Receive a copy of personal data in structured, commonly used, machine-readable formats and transfer it to another controller without hindrance." }
            ].map((right, idx) => (
              <div key={idx} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <h4 className="text-xs font-bold text-[#1f3557] mb-1">{right.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-medium">{right.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "international-transfers",
      title: "International Transfers",
      icon: Globe,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            We do not transfer personal data outside the country or jurisdiction in which it was originally collected. All personal data is processed and stored within the applicable jurisdiction, and we take appropriate measures to ensure its security and confidentiality.
          </p>
        </div>
      )
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: Clock,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            We retain personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by applicable law. The retention period may vary depending on the type of data and the reason for its collection.
          </p>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            Once personal data is no longer necessary for the stated purposes, we take appropriate steps to delete, anonymize, or securely store it in accordance with applicable legal requirements.
          </p>
        </div>
      )
    },
    {
      id: "security",
      title: "Security Measures",
      icon: Lock,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            We implement appropriate technical and organizational measures to protect personal data from unauthorized access, disclosure, alteration, misuse, or destruction. Depending on the nature of the data, our security practices include:
          </p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-text-secondary font-medium">
            {[
              { title: "Data Encryption", desc: "Personal data is encrypted both in transit and at rest to prevent unauthorized access." },
              { title: "Access Controls", desc: "Access is restricted to authorized personnel who require it to perform job functions under confidentiality." },
              { title: "Regular Security Assessments", desc: "Periodic reviews, security audits, and vulnerability assessments to evaluate security measures." },
              { title: "Data Minimization", desc: "Collect and process only necessary personal data and retain for no longer than required." },
              { title: "Employee Training", desc: "Regular training on privacy policies and data security best practices for all data-handling staff." }
            ].map((measure, idx) => (
              <li key={idx} className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                <span className="font-bold text-[#1f3557] block mb-0.5">{measure.title}</span>
                {measure.desc}
              </li>
            ))}
          </ul>
          
          <p className="text-xs text-text-secondary italic leading-relaxed font-semibold mt-2">
            Despite these measures, no method of data transmission or storage is entirely secure. We encourage individuals to exercise caution when sharing personal data and to notify us immediately if they become aware of any security concerns.
          </p>
        </div>
      )
    },
    {
      id: "contact",
      title: "Contact & Grievances",
      icon: Mail,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            If you have any questions, concerns, or complaints regarding this Privacy Policy or the way we handle your personal data, you may contact us using the details below. We have designated a contact point for privacy-related inquiries and requests, who can assist you with exercising your data protection rights or addressing any grievances.
          </p>
          
          <div className="rounded-xl border border-[#1f3557]/15 bg-[#1f3557]/5 p-5 space-y-3">
            <h4 className="text-xs font-bold text-[#1f3557] uppercase tracking-wide">Privacy Contact Details</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider block mb-0.5">Name</span>
                <span className="text-[#1f3557] font-bold">Anurag Kumar</span>
              </div>
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider block mb-0.5">Email</span>
                <a href="mailto:info@privault.ai" className="text-[#1f3557] font-bold hover:underline">info@privault.ai</a>
              </div>
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider block mb-0.5">Postal Address</span>
                <span className="text-text-primary leading-normal font-semibold">
                  202, DLF Galleria Mall,<br />
                  Mayur Vihar Phase-1,<br />
                  Delhi-110091, India
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium mt-2">
            If you wish to raise a grievance regarding the processing of your personal data, you may also contact our designated grievance officer at the above details. We will make every effort to address and resolve your concerns promptly and in accordance with applicable legal requirements.
          </p>
        </div>
      )
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#f8fafc] text-text-primary selection:bg-brand-500/20 selection:text-brand-700">
        
        {/* Header Hero Band */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20 border-b border-slate-200">
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
            <div className="absolute inset-0 bg-slate-950/20" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-[10px] font-bold text-[#87DEC7] uppercase tracking-wider mb-4 backdrop-blur-sm">
              <FileText className="w-3.5 h-3.5" /> Legal Document
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-4 max-w-xl mx-auto leading-relaxed font-medium">
              Learn how we collect, process, protect, and respect your personal data in compliance with regulatory standards.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Sticky Sidebar Navigation */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-100/30">
                  <h3 className="text-xs font-bold text-[#1f3557] uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Table of Contents
                  </h3>
                  <nav className="flex flex-col gap-1">
                    {sections.map((sect) => {
                      const Icon = sect.icon;
                      const isActive = activeSection === sect.id;
                      return (
                        <button
                          key={sect.id}
                          onClick={() => scrollToSection(sect.id)}
                          className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-xs font-bold transition-all ${
                            isActive
                              ? "bg-[#1f3557] text-white shadow-md shadow-[#1f3557]/15"
                              : "text-text-secondary hover:bg-slate-50 hover:text-[#1f3557]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? "text-[#87DEC7]" : "text-text-secondary/60"}`} />
                            <span>{sect.title}</span>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "rotate-90 text-[#87DEC7]" : "text-slate-400"}`} />
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-100/30 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#87DEC7]/15 text-[#1f3557] shadow-inner">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1f3557] mb-1">Compliance Guaranteed</h4>
                    <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                      Designed to comply with DPDPA, GDPR, and other global data privacy regulations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Policy Sections */}
              <div className="lg:col-span-8 space-y-8">
                {sections.map((sect) => {
                  const Icon = sect.icon;
                  return (
                    <SpotlightCard
                      key={sect.id}
                      id={sect.id}
                      className="policy-section rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg shadow-slate-100/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f3557]/5 text-[#1f3557] shadow-sm">
                          <Icon className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div>
                          <h2 className="text-xl font-black tracking-tight text-[#1f3557]">
                            {sect.title}
                          </h2>
                          <span className="text-[9px] font-bold text-[#87DEC7] uppercase tracking-widest block mt-0.5">
                            Privault Legal Framework
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        {sect.content}
                      </div>
                    </SpotlightCard>
                  );
                })}
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
