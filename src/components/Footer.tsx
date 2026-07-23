/**
 * @file Footer.tsx
 * @description Standard footer for the Privault platform, displaying platform routes, corporate contact information, and policy links.
 */

import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import NavbarLogo from "./NavbarLogo";

/**
 * Standard enterprise footer component.
 * Uses a deep space navy theme background for contrast against lighter section panels.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2F476A]/40 bg-[#1F2F47] text-slate-400 py-12">
      <div className="mx-auto max-w-[92rem] w-full px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="group w-fit hover:opacity-95 transition-opacity">
              <NavbarLogo variant="dark" />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-xs font-medium">
              Simplifying privacy compliance and engineering for modern enterprises. Built with legal-grade intelligence and enterprise security at the core.
            </p>
          </div>

          {/* Links Column 1: Platform Modules */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/product/compliance-metrics" className="hover:text-[#87DEC7] text-slate-400 transition-colors font-medium">
                  Compliance Metrics
                </Link>
              </li>
              <li>
                <Link to="/product/breach-management" className="hover:text-[#87DEC7] text-slate-400 transition-colors font-medium">
                  Breach Incident Management
                </Link>
              </li>
              <li>
                <Link to="/product/dpia" className="hover:text-[#87DEC7] text-slate-400 transition-colors font-medium">
                  Risk Assessment (DPIA)
                </Link>
              </li>
              <li>
                <Link to="/product/dsr-management" className="hover:text-[#87DEC7] text-slate-400 transition-colors font-medium">
                  DSR Access & Erasure
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Company Info */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-[#87DEC7] text-slate-400 transition-colors font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#87DEC7] text-slate-400 transition-colors font-medium">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#87DEC7] text-slate-400 transition-colors font-medium">
                  All Solutions
                </Link>
              </li>
              <li>
                <a href="https://calendar.app.google/81BuaveR2dU9RX3a6" target="_blank" rel="noopener noreferrer" className="hover:text-[#87DEC7] text-slate-400 transition-colors font-medium">
                  Book a Demo Meeting
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Contact Details */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Contact Info</h3>
            <div className="flex items-start gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-[#87DEC7] shrink-0 mt-0.5" />
              <span className="text-slate-400 font-medium">info@privault.ai</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-[#87DEC7] shrink-0 mt-0.5" />
              <span className="leading-normal text-slate-400 font-medium">
                202, DLF Galleria Mall,<br />
                Mayur Vihar Phase-1,<br />
                Delhi-110091, India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom panel */}
        <div className="border-t border-[#2F476A]/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div>
            © {currentYear} Privault. All rights reserved.
          </div>
          <div className="flex items-center gap-6 sm:pr-36">
            <Link to="/privacy-policy" className="hover:text-white hover:underline transition-colors cursor-pointer">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
