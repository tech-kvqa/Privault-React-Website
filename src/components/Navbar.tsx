/**
 * @file Navbar.tsx
 * @description Standard header navigation bar component with responsive drawer menus and product dropdown lists.
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { products } from "@/constants";
import NavbarLogo from "./NavbarLogo";

/**
 * Platform Header Navigation Bar.
 * - Displays page navigation links (Home, About, Contact).
 * - Incorporates a dynamic dropdown menu displaying product modules.
 * - Fully responsive with a mobile accordion drawer.
 * - Stays fixed/sticky on top of viewports.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { pathname } = useLocation();

  // Close menus on path changes
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  /**
   * Helper to return CSS styles for active and inactive header link buttons.
   * Leverages display font tokens and palette coloring.
   */
  const linkClass = (active: boolean) => {
    return active
      ? "text-[#87DEC7] bg-[#3A3E58] shadow-sm shadow-[#3A3E58]/35 font-display text-base font-bold"
      : "text-slate-300 hover:text-white hover:bg-[#3A3E58]/25 font-display text-base font-bold";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#3A3E58]/40 bg-[#26283F]">
      <div className="mx-auto flex h-[5.5rem] max-w-[92rem] w-full items-center justify-between px-4 sm:px-8 md:px-12">
        {/* Logo (Left-aligned) */}
        <Link to="/" className="group shrink-0 hover:opacity-95 transition-opacity">
          <NavbarLogo variant="dark" />
        </Link>

        {/* Right Group: Links & CTA sitting together next to each other */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className={`rounded-full px-4 py-2 transition-colors ${linkClass(pathname === "/")}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`rounded-full px-4 py-2 transition-colors ${linkClass(pathname === "/about")}`}
            >
              About
            </Link>

            {/* Products Dropdown Activator */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen(true)}
                className={`flex items-center gap-1 rounded-full px-4 py-2 transition-colors ${linkClass(
                  pathname.startsWith("/product/") || pathname === "/products"
                )}`}
              >
                Products
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 z-50 mt-1 w-[380px] -translate-x-1/2 rounded-2xl border border-[#3A3E58]/60 bg-[#26283F] shadow-xl shadow-black/40 p-3 grid grid-cols-2 gap-1.5"
                  >
                    {products.map((prod) => {
                      const isActive = pathname === `/product/${prod.slug}`;
                      return (
                        <Link
                          key={prod.slug}
                          to={`/product/${prod.slug}`}
                          className={`flex items-center rounded-xl p-2.5 transition-all border group ${
                            isActive
                              ? "bg-[#3A3E58]/60 border-[#87DEC7]/40 shadow-sm shadow-[#87DEC7]/5"
                              : "border-transparent hover:bg-[#3A3E58]/35 hover:border-[#3A3E58]/30"
                          }`}
                        >
                          <div className={`text-sm font-display font-bold transition-colors ${
                            isActive ? "text-[#87DEC7]" : "text-white group-hover:text-[#87DEC7]"
                          }`}>
                            {prod.title}
                          </div>
                        </Link>
                      );
                    })}
                    <div className="col-span-2 border-t border-[#3A3E58]/30 mt-1 pt-2 flex justify-end">
                      <Link
                        to="/products"
                        className="flex items-center gap-1 text-[11px] font-bold text-[#87DEC7] hover:bg-[#3A3E58]/40 px-3 py-1 rounded-lg transition-colors"
                      >
                        View All Products <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/contact"
              className={`rounded-full px-4 py-2 transition-colors ${linkClass(pathname === "/contact")}`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Book Demo Button */}
          <a
            href="https://calendar.app.google/81BuaveR2dU9RX3a6"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#87DEC7] hover:bg-[#5FD3B4] text-[#1F3557] px-6 py-3 text-sm font-bold shadow-md shadow-[#87DEC7]/10 transition-all duration-200"
          >
            Book a Demo
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 transition-colors text-slate-300 hover:bg-[#3A3E58]/40 md:hidden"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[#3A3E58]/40 bg-[#26283F] px-4 py-4 md:hidden shadow-lg shadow-black/35"
          >
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className={`text-sm py-2 px-3 rounded-lg transition-colors ${linkClass(pathname === "/")}`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`text-sm py-2 px-3 rounded-lg transition-colors ${linkClass(pathname === "/about")}`}
              >
                About
              </Link>

              {/* Mobile Products Accordion List */}
              <div className="border-t border-b border-[#3A3E58]/30 my-1 py-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 text-slate-400 block mb-2">
                  Our Products
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 px-1">
                  {products.map((prod) => {
                    const isActive = pathname === `/product/${prod.slug}`;
                    return (
                      <Link
                        key={prod.slug}
                        to={`/product/${prod.slug}`}
                        className={`flex items-center gap-2 rounded-lg p-2 transition-colors text-xs font-semibold ${
                          isActive
                            ? "text-[#87DEC7] bg-[#3A3E58]/50 border border-[#87DEC7]/15"
                            : "text-slate-300 hover:text-white hover:bg-[#3A3E58]/30 border border-transparent"
                        }`}
                      >
                        {prod.title}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Link
                to="/contact"
                className={`text-sm py-2 px-3 rounded-lg transition-colors ${linkClass(pathname === "/contact")}`}
              >
                Contact
              </Link>

              <div className="border-t border-[#3A3E58]/30 mt-2 pt-4 flex flex-col gap-2">
                <a
                  href="https://calendar.app.google/81BuaveR2dU9RX3a6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center rounded-xl bg-[#87DEC7] hover:bg-[#5FD3B4] text-[#1F3557] py-2.5 text-xs font-bold transition-colors"
                >
                  Book a Demo
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
