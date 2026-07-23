/**
 * @file DraggableFeatureStack.tsx
 * @description A horizontal 3D fanned circular card stack modeled after Appinventiv's carousel.
 *   Arranges product feature cards along a 3D semi-circle arch across the full page.
 *   Uses tall, vertical cards with unique premium SaaS background themes and built-in UI mockups.
 *   Features a bottom-centered rotation origin to fan card tops wide while keeping bottoms closer.
 *   Supports real-time touch swipes, mouse dragging anywhere on the container, focus rings,
 *   keyboard controls, and prefers-reduced-motion fallbacks.
 */

"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, PanInfo, animate } from "framer-motion";
import * as Icons from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface DraggableFeatureStackProps {
  features: Feature[];
  productTitle?: string;
}

// Premium SaaS theme configurations for solid card backgrounds and matching layout styles
const CARD_THEMES = [
  {
    bgClass: "bg-[#ffffff] text-slate-900 border border-slate-200",
    iconBg: "bg-slate-950 text-white",
    titleColor: "text-slate-950",
    descColor: "text-slate-650",
    glow: "rgba(255, 255, 255, 0.22)",
    indexColor: "text-slate-400",
    mockupBg: "bg-slate-950/5",
    mockupElement: "bg-slate-950/10",
  },
  {
    bgClass: "bg-gradient-to-br from-[#e11d48] to-[#be123c] text-white border border-[#be123c]/20",
    iconBg: "bg-white/20 backdrop-blur-sm text-white",
    titleColor: "text-white",
    descColor: "text-rose-100",
    glow: "rgba(225, 29, 72, 0.35)",
    indexColor: "text-rose-200/60",
    mockupBg: "bg-white/10",
    mockupElement: "bg-white/15",
  },
  {
    bgClass: "bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white border border-[#5b21b6]/20",
    iconBg: "bg-white/20 backdrop-blur-sm text-white",
    titleColor: "text-white",
    descColor: "text-purple-100",
    glow: "rgba(124, 58, 237, 0.35)",
    indexColor: "text-purple-200/60",
    mockupBg: "bg-white/10",
    mockupElement: "bg-white/15",
  },
  {
    bgClass: "bg-gradient-to-br from-[#06b6d4] to-[#0891b2] text-white border border-[#0891b2]/20",
    iconBg: "bg-white/20 backdrop-blur-sm text-white",
    titleColor: "text-white",
    descColor: "text-cyan-50",
    glow: "rgba(6, 182, 212, 0.35)",
    indexColor: "text-cyan-100/60",
    mockupBg: "bg-white/10",
    mockupElement: "bg-white/15",
  },
  {
    bgClass: "bg-[#0b1329] text-white border border-white/10",
    iconBg: "bg-gradient-to-tr from-[#5e59d7] to-[#7d79e5] text-white",
    titleColor: "text-white",
    descColor: "text-slate-350",
    glow: "rgba(94, 89, 215, 0.3)",
    indexColor: "text-slate-500",
    mockupBg: "bg-black/20",
    mockupElement: "bg-white/5",
  },
  {
    bgClass: "bg-gradient-to-br from-[#d9f99d] to-[#bef264] text-slate-900 border border-[#bef264]/20",
    iconBg: "bg-slate-950 text-white",
    titleColor: "text-slate-950",
    descColor: "text-slate-700",
    glow: "rgba(190, 242, 100, 0.3)",
    indexColor: "text-slate-500",
    mockupBg: "bg-slate-950/5",
    mockupElement: "bg-slate-950/10",
  },
];

const FeatureIcon = ({ name, className = "w-5 h-5 text-white" }: { name: string; className?: string }) => {
  const IconComp = (Icons as any)[name];
  if (IconComp) return <IconComp className={className} />;
  return <Icons.Shield className={className} />;
};

// ─── Draggable Card Sub-component ─────────────────────────────────────────────

function DraggableCard({
  i,
  activeIndex,
  spacing,
  prefersReducedMotion,
  features,
  globalIndexOffset,
  feat,
  isMobile,
}: {
  i: number;
  activeIndex: number;
  spacing: number;
  prefersReducedMotion: boolean;
  features: Feature[];
  globalIndexOffset: any;
  feat: Feature;
  isMobile: boolean;
}) {
  const len = features.length;

  // Compute position relative to globalOffset
  const pos = useTransform(globalIndexOffset, (val: number) => {
    let diff = i - val;
    // Circular wrap-around logic
    while (diff < -len / 2) diff += len;
    while (diff > len / 2) diff -= len;
    return diff;
  });

  // Calculate coordinates along a 3D semi-circle (parabolic arch)
  const arcHeight = isMobile ? 12 : 36; // Y displacement at the fanned sides
  const rotateStep = isMobile ? 6 : 9;  // Rotation tilt angle

  const x = useTransform(pos, (p) => p * spacing);
  const y = useTransform(pos, (p) => p * p * arcHeight);
  const scale = useTransform(pos, (p) => 1 - Math.abs(p) * 0.08);
  const rotate = useTransform(pos, (p) => p * rotateStep);

  // Seamless opacity envelope: fades card completely out before it jumps boundaries
  const opacity = useTransform(pos, (p) => {
    const absP = Math.abs(p);
    if (absP <= 1.0) {
      return 1.0 - absP * 0.45; // 1.0 at center, 0.55 at 1.0
    }
    if (absP < 1.6) {
      return 0.55 * (1 - (absP - 1.0) / 0.6);
    }
    return 0; // Completely invisible at wrap-around boundaries
  });

  const zIndex = useTransform(pos, (p) => Math.round(100 - Math.abs(p) * 10));

  const isTop = activeIndex === i;
  const theme = CARD_THEMES[i % CARD_THEMES.length];

  return (
    <motion.div
      style={{
        x,
        y: prefersReducedMotion ? (isTop ? 0 : 20) : y,
        scale: prefersReducedMotion ? (isTop ? 1 : 0.9) : scale,
        rotate: prefersReducedMotion ? 0 : rotate,
        opacity: prefersReducedMotion ? (isTop ? 1 : 0.5) : opacity,
        zIndex,
        boxShadow: isTop ? `0 0 35px ${theme.glow}, 0 25px 50px rgba(0,0,0,0.55)` : "0 8px 16px rgba(0,0,0,0.3)",
      }}
      className={`absolute w-[250px] md:w-[310px] h-[340px] md:h-[420px] rounded-3xl p-6 shadow-2xl flex flex-col justify-between origin-bottom transition-shadow duration-300 pointer-events-none select-none ${theme.bgClass}`}
    >
      {/* Top Section: Icon and Index */}
      <div className="flex items-start justify-between relative z-10 w-full">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg ${theme.iconBg}`}>
          <FeatureIcon name={feat.icon} className="w-5.5 h-5.5" />
        </div>
        {/* Slide Index Indicator */}
        <span className={`text-[10px] font-bold tracking-wider ${theme.indexColor}`}>
          {i + 1} / {len}
        </span>
      </div>

      {/* Middle Section: Title & Description */}
      <div className="relative z-10 mt-4 flex-1">
        <h4 className={`text-base md:text-xl font-black tracking-tight leading-snug ${theme.titleColor}`}>
          {feat.title}
        </h4>
        <p className={`text-xs md:text-sm mt-1.5 leading-relaxed font-semibold ${theme.descColor}`}>
          {feat.description}
        </p>
      </div>

      {/* Bottom Section: Stylized Abstract SaaS Mockup */}
      <div className={`w-full h-[110px] md:h-[160px] rounded-2xl relative overflow-hidden border border-white/5 flex flex-col justify-between p-3 mt-4 shrink-0 ${theme.mockupBg}`}>
        {/* Browser Mockup Header */}
        <div className="flex gap-1 shrink-0">
          <span className={`w-1.5 h-1.5 rounded-full ${theme.mockupElement}`} />
          <span className={`w-1.5 h-1.5 rounded-full ${theme.mockupElement}`} />
          <span className={`w-1.5 h-1.5 rounded-full ${theme.mockupElement}`} />
        </div>
        
        {/* Abstract UI Elements */}
        <div className="flex-1 flex flex-col justify-center gap-1.5 mt-2">
          <div className={`h-2.5 rounded-md w-[80%] ${theme.mockupElement}`} />
          <div className="flex gap-1.5">
            <div className={`h-12 rounded-md flex-1 ${theme.mockupElement}`} />
            <div className={`h-12 rounded-md w-[35%] ${theme.mockupElement}`} />
          </div>
          <div className={`h-3 rounded-md w-[50%] ${theme.mockupElement}`} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Draggable Feature Stack Component ───────────────────────────────────

export default function DraggableFeatureStack({ features, productTitle = "Product" }: DraggableFeatureStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Motion value tracking global scroll offset driven by Pan gestures
  const dragX = useMotionValue(0);
  const globalIndexOffset = useMotionValue(0);

  // Spacing between card centers: 330px on desktop (larger gap), 130px on mobile
  const spacing = isMobile ? 130 : 330;

  // Track panning to update offset in real-time
  useEffect(() => {
    const unsubscribe = dragX.on("change", (latestX) => {
      globalIndexOffset.set(activeIndex - latestX / spacing);
    });
    globalIndexOffset.set(activeIndex);
    return () => unsubscribe();
  }, [activeIndex, dragX, spacing, globalIndexOffset]);

  // Handle media queries and breakpoints
  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkResponsive();
    window.addEventListener("resize", checkResponsive);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", motionHandler);

    return () => {
      window.removeEventListener("resize", checkResponsive);
      mediaQuery.removeEventListener("change", motionHandler);
    };
  }, []);

  if (!features || features.length === 0) return null;

  const cycleStack = (direction: "left" | "right") => {
    let nextIndex = activeIndex;
    if (direction === "left") {
      nextIndex = (activeIndex + 1) % features.length;
    } else {
      nextIndex = (activeIndex - 1 + features.length) % features.length;
    }
    setActiveIndex(nextIndex);
    dragX.set(0);
    globalIndexOffset.set(nextIndex);
  };

  // Pan gesture handlers bound to the container (allows dragging anywhere inside)
  const handlePan = (_event: any, info: PanInfo) => {
    if (prefersReducedMotion) return;
    dragX.set(info.offset.x);
  };

  const handlePanEnd = async (_event: any, info: PanInfo) => {
    if (prefersReducedMotion) return;
    
    // Reduced velocity factor (0.10s) to limit excessive momentum
    const velocityFactor = 0.10;
    const projectedDistance = info.offset.x + info.velocity.x * velocityFactor;
    
    // Determine target card shift (constrained to 1 card per swipe for structured feel)
    let cardsToShift = Math.round(projectedDistance / spacing);
    if (cardsToShift > 1) cardsToShift = 1;
    if (cardsToShift < -1) cardsToShift = -1;

    if (cardsToShift !== 0) {
      const targetOffset = cardsToShift * spacing;
      
      // Tightened spring for a snappy, precise transition
      animate(dragX, targetOffset, {
        type: "spring",
        stiffness: 220,
        damping: 26,
        mass: 0.8,
        onComplete: () => {
          let nextIndex = (activeIndex - cardsToShift) % features.length;
          if (nextIndex < 0) nextIndex += features.length;
          setActiveIndex(nextIndex);
          dragX.set(0);
          globalIndexOffset.set(nextIndex);
        }
      });
    } else {
      // Spring back to center cleanly
      animate(dragX, 0, {
        type: "spring",
        stiffness: 240,
        damping: 24,
        mass: 0.8
      });
    }
  };

  const cycleNext = () => {
    if (prefersReducedMotion) {
      setActiveIndex((prev) => (prev + 1) % features.length);
      return;
    }
    animate(dragX, -spacing, {
      type: "spring",
      stiffness: 220,
      damping: 26,
      mass: 0.8,
      onComplete: () => {
        cycleStack("left");
      }
    });
  };

  const cyclePrev = () => {
    if (prefersReducedMotion) {
      setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
      return;
    }
    animate(dragX, spacing, {
      type: "spring",
      stiffness: 220,
      damping: 26,
      mass: 0.8,
      onComplete: () => {
        cycleStack("right");
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      cycleNext();
    } else if (e.key === "ArrowLeft") {
      cyclePrev();
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none py-12 overflow-x-hidden md:overflow-visible">
      {/* Accessibility screen-reader semantic list fallback */}
      <div className="sr-only">
        <h3>Key Features of {productTitle}</h3>
        <ul>
          {features.map((feat, index) => (
            <li key={index}>
              <h4>{feat.title}</h4>
              <p>{feat.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Pan Gesture Container fanning out across the viewport */}
      <motion.div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        className="relative w-full max-w-[1200px] h-[480px] flex justify-center items-center outline-none focus-visible:ring-2 focus-visible:ring-[#9895eb] focus-visible:ring-offset-8 focus-visible:ring-offset-[#D4F6EE] rounded-3xl overflow-visible cursor-grab active:cursor-grabbing pointer-events-auto"
        aria-label="Interactive 3D fanned card stack. Drag anywhere or use arrow keys to navigate."
      >
        {features.map((feat, i) => (
          <DraggableCard
            key={i}
            i={i}
            activeIndex={activeIndex}
            spacing={spacing}
            prefersReducedMotion={prefersReducedMotion}
            features={features}
            globalIndexOffset={globalIndexOffset}
            feat={feat}
            isMobile={isMobile}
          />
        ))}
      </motion.div>

      {/* Navigation cues and drag instruction panel */}
      <div className="flex items-center gap-6 mt-6 relative z-40">
        <button
          onClick={cyclePrev}
          className="w-8 h-8 rounded-full border border-white/10 bg-slate-950/40 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Previous feature"
        >
          <Icons.ChevronLeft className="w-4 h-4" />
        </button>

        {/* Drag Hint */}
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 select-none">
          <Icons.MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
          Drag Anywhere to Explore
        </span>

        <button
          onClick={cycleNext}
          className="w-8 h-8 rounded-full border border-white/10 bg-slate-950/40 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Next feature"
        >
          <Icons.ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
