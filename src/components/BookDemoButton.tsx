/**
 * @file BookDemoButton.tsx
 * @description Floating Book Demo action button that slides into view when the user scrolls past the hero section.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useLocation } from "react-router-dom";

/**
 * Floating Call-To-Action button.
 * - Instantly visible on sub-pages (e.g. Products, About, Contact).
 * - On the Homepage, it is hidden during the 3D lock scroll section and fades in once the user scrolls past 58% of the viewport height.
 */
export default function BookDemoButton() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [isVisible, setIsVisible] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setIsVisible(true);
      return;
    }

    const updateVisibility = () => {
      // 0.58 corresponds to scrolling past the first slide/half of the lock animation
      setIsVisible(window.scrollY > window.innerHeight * 0.58);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, [isHome]);

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 14,
        scale: isVisible ? 1 : 0.96,
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-40 pointer-events-none"
    >
      <motion.a
        href="https://calendar.app.google/81BuaveR2dU9RX3a6"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-brand-600/25 transition-all duration-300 hover:bg-brand-700 pointer-events-auto group"
      >
        {/* Decorative pulsing hover borders */}
        <span className="absolute inset-0 rounded-full border border-brand-500/40 opacity-0 group-hover:scale-108 group-hover:opacity-100 transition-all duration-300" />
        <span className="absolute -inset-1 rounded-full bg-brand-600/20 blur-md opacity-70 animate-pulse" />
        
        <Calendar className="w-4 h-4 text-white" />
        <span>Book a Demo</span>
      </motion.a>
    </motion.div>
  );
}
