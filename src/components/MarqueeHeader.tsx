/**
 * @file MarqueeHeader.tsx
 * @description Heading component for the solutions section.
 *   Uses the custom SplitText stagger letter animation component for high-fidelity entrances.
 */

import SplitText from "./SplitText";

export default function MarqueeHeader() {
  return (
    <div className="w-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent py-4 md:py-6 border-y border-white/5 relative select-none overflow-hidden">
      {/* Decorative background grid flare */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="flex justify-center items-center w-full">
        <SplitText
          text="COMPLIANCE SOLUTIONS"
          className="font-black tracking-tighter uppercase text-white font-sans text-center drop-shadow-[0_2px_15px_rgba(255,255,255,0.25)] text-4xl sm:text-7xl md:text-8xl"
          delay={40}
          duration={1.2}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 35 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-60px"
          textAlign="center"
          tag="h2"
        />
      </div>

      {/* Subtitle helper */}
      <div className="text-center mt-2.5 px-4">
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#c084fc] uppercase">
          Interact with our live digital control plane below
        </p>
      </div>
    </div>
  );
}
