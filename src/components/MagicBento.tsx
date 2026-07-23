/**
 * @file MagicBento.tsx
 * @description Interactive bento-grid card layout for Privault compliance product modules.
 *   Wraps the open-source MagicBento pattern from React Bits, customised to:
 *   - Pull real product data (title, description, icon, slug) from @/constants
 *   - Route to /product/:slug on card click via React Router
 *   - Use Privault's lavender/navy palette for glow / spotlight
 *   - Lay out 7 cards in a responsive asymmetric bento grid
 */

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import * as Icons from "lucide-react";
import { products } from "@/constants";

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_GLOW_COLOR = "30, 60, 200"; // dark blue/navy in RGB
const DEFAULT_SPOTLIGHT_RADIUS = 320;
const DEFAULT_PARTICLE_COUNT = 10;
const MOBILE_BREAKPOINT = 1024;

// Per-product accent colours — blue palette, readable on white cards
const PRODUCT_COLORS = [
  "#1e40af", "#1d4ed8", "#1e3a8a", "#1e40af",
  "#1d4ed8", "#1e3a8a", "#1d4ed8",
];

// DPIA hero card supplementary data
const DPIA_STATS = [
  { label: "Risk Score", value: "72", unit: "/100", color: "#ef4444", barPct: 72 },
  { label: "Assessments Completed", value: "24", unit: " this month", color: "#1d4ed8", barPct: 80 },
  { label: "Open Findings", value: "6", unit: " pending", color: "#d97706", barPct: 35 },
];

const DPIA_CHECKLIST = [
  { label: "Automated DPIA Templates", done: true },
  { label: "Risk Scoring Engine", done: true },
  { label: "Mitigation Suggestions", done: true },
  { label: "Multi-Stage Approvals", done: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ProductIcon = ({
  name,
  color,
  className = "w-5 h-5",
}: {
  name: string;
  color: string;
  className?: string;
}) => {
  const IconComp = (Icons as unknown as Record<string, React.ElementType>)[name];
  if (IconComp) return <IconComp className={className} style={{ color }} />;
  return <Icons.Shield className={className} style={{ color }} />;
};

const createRipple = (
  el: HTMLElement,
  clientX: number,
  clientY: number,
  glowColor: string
) => {
  const rect = el.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const maxD = Math.max(
    Math.hypot(x, y),
    Math.hypot(x - rect.width, y),
    Math.hypot(x, y - rect.height),
    Math.hypot(x - rect.width, y - rect.height)
  );
  const ripple = document.createElement("div");
  ripple.style.cssText = `
    position:absolute;
    width:${maxD * 2}px;height:${maxD * 2}px;
    border-radius:50%;
    background:radial-gradient(circle,rgba(${glowColor},0.35) 0%,rgba(${glowColor},0.15) 35%,transparent 70%);
    left:${x - maxD}px;top:${y - maxD}px;
    pointer-events:none;z-index:1000;
  `;
  el.appendChild(ripple);
  gsap.fromTo(
    ripple,
    { scale: 0, opacity: 1 },
    { scale: 1, opacity: 0, duration: 0.75, ease: "power2.out", onComplete: () => ripple.remove() }
  );
};

// ─── ParticleCard ─────────────────────────────────────────────────────────────

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  disableAnimations?: boolean;
  onClick?: () => void;
}> = ({
  children,
  className = "",
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = false,
  clickEffect = true,
  enableMagnetism = true,
  disableAnimations = false,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const magnetRef = useRef<gsap.core.Tween | null>(null);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetRef.current?.kill();
    particlesRef.current.forEach((p) =>
      gsap.to(p, {
        scale: 0, opacity: 0, duration: 0.25, ease: "back.in(1.7)",
        onComplete: () => p.parentNode?.removeChild(p),
      })
    );
    particlesRef.current = [];
  }, []);

  const spawnParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    for (let i = 0; i < particleCount; i++) {
      const t = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const el = document.createElement("div");
        el.style.cssText = `
          position:absolute;width:4px;height:4px;border-radius:50%;
          background:rgba(${glowColor},1);
          box-shadow:0 0 6px rgba(${glowColor},0.6);
          pointer-events:none;z-index:100;
          left:${Math.random() * width}px;top:${Math.random() * height}px;
        `;
        cardRef.current!.appendChild(el);
        particlesRef.current.push(el);
        gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
        gsap.to(el, { x: (Math.random() - 0.5) * 90, y: (Math.random() - 0.5) * 90, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: "none", repeat: -1, yoyo: true });
        gsap.to(el, { opacity: 0.25, duration: 1.5, ease: "power2.inOut", repeat: -1, yoyo: true });
      }, i * 90);
      timeoutsRef.current.push(t);
    }
  }, [particleCount, glowColor]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const el = cardRef.current;

    const onEnter = () => { isHoveredRef.current = true; spawnParticles(); if (enableTilt) gsap.to(el, { rotateX: 4, rotateY: 4, duration: 0.3, ease: "power2.out", transformPerspective: 1000 }); };
    const onLeave = () => {
      isHoveredRef.current = false; clearParticles();
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    };
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const cx = rect.width / 2; const cy = rect.height / 2;
      if (enableTilt) gsap.to(el, { rotateX: ((y - cy) / cy) * -8, rotateY: ((x - cx) / cx) * 8, duration: 0.1, ease: "power2.out", transformPerspective: 1000 });
      if (enableMagnetism) { magnetRef.current = gsap.to(el, { x: (x - cx) * 0.04, y: (y - cy) * 0.04, duration: 0.3, ease: "power2.out" }); }
    };
    const onClick = (e: MouseEvent) => { if (clickEffect) createRipple(el, e.clientX, e.clientY, glowColor); };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("click", onClick);
    return () => {
      isHoveredRef.current = false;
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("click", onClick);
      clearParticles();
    };
  }, [spawnParticles, clearParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden cursor-pointer`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// ─── Global Spotlight ─────────────────────────────────────────────────────────

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current) return;

    const spot = document.createElement("div");
    spot.style.cssText = `
      position:fixed;width:700px;height:700px;border-radius:50%;
      pointer-events:none;
      background:radial-gradient(circle,rgba(${glowColor},0.35) 0%,rgba(${glowColor},0.20) 18%,rgba(${glowColor},0.10) 30%,transparent 65%);
      z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:multiply;
    `;
    document.body.appendChild(spot);
    spotRef.current = spot;

    const prox = spotlightRadius * 0.5;
    const fade = spotlightRadius * 0.75;

    const onMove = (e: MouseEvent) => {
      if (!spotRef.current || !gridRef.current) return;
      const section = gridRef.current.closest(".privault-bento-section");
      const rect = section?.getBoundingClientRect();
      const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      const cards = gridRef.current.querySelectorAll<HTMLElement>(".privault-card");
      if (!inside) {
        gsap.to(spot, { opacity: 0, duration: 0.3 });
        cards.forEach(c => c.style.setProperty("--glow-intensity", "0"));
        return;
      }
      let minD = Infinity;
      cards.forEach(c => {
        const cr = c.getBoundingClientRect();
        const cx = cr.left + cr.width / 2; const cy = cr.top + cr.height / 2;
        const d = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(cr.width, cr.height) / 2);
        minD = Math.min(minD, d);
        const intensity = d <= prox ? 1 : d <= fade ? (fade - d) / (fade - prox) : 0;
        const rel = ((e.clientX - cr.left) / cr.width * 100);
        const rely = ((e.clientY - cr.top) / cr.height * 100);
        c.style.setProperty("--glow-x", `${rel}%`);
        c.style.setProperty("--glow-y", `${rely}%`);
        c.style.setProperty("--glow-intensity", intensity.toString());
        c.style.setProperty("--glow-radius", `${spotlightRadius}px`);
      });
      gsap.to(spot, { left: e.clientX, top: e.clientY, duration: 0.1 });
      const targetOp = minD <= prox ? 0.75 : minD <= fade ? ((fade - minD) / (fade - prox)) * 0.75 : 0;
      gsap.to(spot, { opacity: targetOp, duration: targetOp > 0 ? 0.2 : 0.4 });
    };
    const onLeave = () => {
      gridRef.current?.querySelectorAll<HTMLElement>(".privault-card").forEach(c => c.style.setProperty("--glow-intensity", "0"));
      if (spotRef.current) gsap.to(spotRef.current, { opacity: 0, duration: 0.3 });
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      spotRef.current?.parentNode?.removeChild(spotRef.current);
    };
  }, [gridRef, disableAnimations, spotlightRadius, glowColor]);

  return null;
};

// ─── MagicBento (main export) ─────────────────────────────────────────────────

export interface MagicBentoProps {
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
  disableAnimations?: boolean;
}

const MagicBento: React.FC<MagicBentoProps> = ({
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = false,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  disableAnimations = false,
}) => {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const noAnim = disableAnimations || isMobile;

  // Bento layout: 7 cards in a 4-column grid with some spanning
  // Layout (desktop 4-col):
  //  [0: 1×1] [1: 1×1] [2: 2×2 tall] [3: 1×1]
  //  [4: 2×1]           [same 2]      [5: 1×1]
  //  [6: 2×1]           [same 2]      (fills row3 right)
  // We approximate with explicit grid-area classes

  // We need to reorder so the 2×2 card (index 2) goes in col 3 on desktop
  // Easiest: use CSS order or explicit grid placement.
  // We use a wrapper with named grid areas via inline style.

  return (
    <>
      <style>{`
        .privault-bento-section {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 200px;
        }
        .privault-card--glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 1.2)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.6)) 35%,
            transparent 65%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 2;
        }
        .privault-card--glow::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.12)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.05)) 40%,
            transparent 70%
          );
          border-radius: inherit;
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: multiply;
        }
        .privault-card--glow:hover {
          box-shadow: 0 8px 32px rgba(30,64,175,0.14), 0 0 0 1.5px rgba(${glowColor},0.32);
        }

        /* Desktop 4-column bento grid */
        @media (min-width: 1024px) {
          .privault-bento-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(3, auto);
          }
          .pb-card-0 { grid-column: 1; grid-row: 1; }
          .pb-card-1 { grid-column: 2; grid-row: 1; }
          .pb-card-2 { grid-column: 3 / span 2; grid-row: 1 / span 2; min-height: 320px; }
          .pb-card-3 { grid-column: 1; grid-row: 2; }
          .pb-card-4 { grid-column: 2; grid-row: 2; }
          .pb-card-5 { grid-column: 1 / span 2; grid-row: 3; }
          .pb-card-6 { grid-column: 3 / span 2; grid-row: 3; }
        }
      `}</style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={noAnim}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div className="privault-bento-section w-full px-4 sm:px-8 md:px-12 pb-12 pt-4">
        <div
          ref={gridRef}
          className="privault-bento-grid grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[92rem] mx-auto"
        >
          {products.map((product, i) => {
            const color = PRODUCT_COLORS[i % PRODUCT_COLORS.length];
            const colorRgb = color.replace("#", "").match(/.{2}/g)!.map(h => parseInt(h, 16)).join(", ");

            // DPIA card (index 2) gets extra rich content to fill its 2×2 hero area
            const isDpia = i === 2;

            const cardContent = isDpia ? (
              <>
                {/* Icon badge */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 shrink-0"
                  style={{ backgroundColor: `rgba(${colorRgb},0.10)`, border: `1.5px solid rgba(${colorRgb},0.22)` }}
                >
                  <ProductIcon name={product.icon} color={color} className="w-5 h-5" />
                </div>

                {/* Title & description */}
                <h3
                  className="font-bold text-black text-lg leading-snug mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {product.title}
                </h3>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#1e3a8a" }}>
                  {product.description}
                </p>

                {/* Stat rows */}
                <div className="flex flex-col gap-3 mb-4">
                  {DPIA_STATS.map((stat) => (
                    <div key={stat.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>
                          {stat.label}
                        </span>
                        <span className="text-[13px] font-bold" style={{ color: stat.color }}>
                          {stat.value}<span className="text-[11px] font-normal" style={{ color: "#94a3b8" }}>{stat.unit}</span>
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${stat.barPct}%`, backgroundColor: stat.color, opacity: 0.75 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini checklist */}
                <div className="rounded-xl p-3 mb-4" style={{ backgroundColor: "rgba(30,64,175,0.05)", border: "1px solid rgba(30,64,175,0.10)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#94a3b8" }}>Key Capabilities</p>
                  <div className="flex flex-col gap-1.5">
                    {DPIA_CHECKLIST.map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: item.done ? "rgba(30,64,175,0.12)" : "rgba(148,163,184,0.15)" }}
                        >
                          {item.done
                            ? <Icons.Check className="w-2.5 h-2.5" style={{ color: "#1d4ed8" }} />
                            : <Icons.Clock className="w-2.5 h-2.5" style={{ color: "#94a3b8" }} />
                          }
                        </div>
                        <span className="text-[12px]" style={{ color: item.done ? "#1e3a8a" : "#94a3b8" }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explore link */}
                <div className="mt-auto flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider" style={{ color }}>
                  <span>Explore</span>
                  <Icons.ArrowRight className="w-3 h-3" />
                </div>
              </>
            ) : (
              <>
                {/* Icon badge */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
                  style={{ backgroundColor: `rgba(${colorRgb},0.10)`, border: `1.5px solid rgba(${colorRgb},0.18)` }}
                >
                  <ProductIcon name={product.icon} color={color} className="w-5 h-5" />
                </div>

                {/* Text */}
                <div className="flex-1 flex flex-col justify-end">
                  <h3
                    className="font-bold text-black text-base leading-snug mb-1.5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {product.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: "#1e3a8a" }}>
                    {product.description}
                  </p>
                  {/* Learn more hint */}
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider" style={{ color }}>
                    <span>Explore</span>
                    <Icons.ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </>
            );

            return enableStars ? (
              <ParticleCard
                key={product.slug}
                className={`privault-card pb-card-${i} flex flex-col p-5 rounded-2xl border min-h-[180px] lg:min-h-[200px] transition-transform duration-300 hover:-translate-y-0.5 ${enableBorderGlow ? "privault-card--glow" : ""}`}
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: `rgba(${colorRgb},0.18)`,
                  color: "#0f172a",
                  boxShadow: "0 1px 4px rgba(30,64,175,0.06), 0 4px 16px rgba(30,64,175,0.04)",
                }}
                particleCount={particleCount}
                glowColor={colorRgb}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
                disableAnimations={noAnim}
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                <div className="relative z-10 flex-1 flex flex-col h-full">
                  {cardContent}
                </div>
              </ParticleCard>
            ) : (
              <div
                key={product.slug}
                className={`privault-card pb-card-${i} flex flex-col p-5 rounded-2xl border min-h-[180px] lg:min-h-[200px] cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 ${enableBorderGlow ? "privault-card--glow" : ""}`}
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: `rgba(${colorRgb},0.18)`,
                  color: "#0f172a",
                  boxShadow: "0 1px 4px rgba(30,64,175,0.06), 0 4px 16px rgba(30,64,175,0.04)",
                }}
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                <div className="relative z-10 flex-1 flex flex-col h-full">
                  {cardContent}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MagicBento;
