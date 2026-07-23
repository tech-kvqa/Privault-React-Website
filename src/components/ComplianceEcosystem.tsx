/**
 * @file ComplianceEcosystem.tsx
 * @description Highly optimized fiber visualizer with original lavender colors,
 *   full native pixel ratio for maximum sharpness (no blur), and optimized strand counts.
 *
 * Fixes:
 *   - Fixes SVG filter zero-width bounding box bug on top-center card (Governance)
 *     by shifting its x coordinate from 500 to 501 (desktop) and 250 to 251 (mobile).
 *   - Restores full native device pixel ratio (up to 3x) for crisp, high-fidelity lines.
 *   - Decreases strand count to 180 on desktop and 45 on mobile to ensure 60fps at full DPR.
 *   - Removes the theme picker dropdown entirely and locks to the signature lavender theme.
 */

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { products } from "@/constants";

const MotionLink = motion(Link);

const ProductIcon = ({
  name,
  color = "#9895eb",
  className = "w-5 h-5",
}: {
  name: string;
  color?: string;
  className?: string;
}) => {
  const IconComp = (Icons as any)[name];
  if (IconComp) return <IconComp className={className} style={{ color }} />;
  return <Icons.Shield className={className} style={{ color }} />;
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface FiberLine {
  angle: number; length: number; speed: number;
  phase: number; thickness: number; baseAngleDeg: number;
}

interface NodeCoord {
  id: number; slug: string; title: string;
  icon: string; description: string; x: number; y: number;
}

// ─── Locked Lavender Theme configuration ──────────────────────────────────────

const LAVENDER_THEME = {
  palette: ["#5e59d7", "#7d79e5", "#9895eb", "#aeacf0", "#c4c2f4", "#dbdaf8"],
  fog: ["#5e59d7", "#494498", "#9895eb"],
  halo: ["#ffffff", "#dbdaf8", "#3b329f"],
  accent: "#9895eb",
  tipColor: "#ffffff",
};

const PRODUCT_SLUGS = [
  "compliance-metrics", "phishing-app", "breach-management",
  "vendor-management", "dpia", "dsr-management", "governance",
];

// Helper to convert hex to { r, g, b } or parse rgb strings
function parseToRgb(colorStr: string) {
  if (colorStr.startsWith("rgb")) {
    const match = colorStr.match(/\d+/g);
    if (match && match.length >= 3) {
      return {
        r: parseInt(match[0], 10),
        g: parseInt(match[1], 10),
        b: parseInt(match[2], 10),
      };
    }
  }
  const clean = colorStr.startsWith("#") ? colorStr.slice(1) : colorStr;
  const r = parseInt(clean.slice(0, 2), 16) || 0;
  const g = parseInt(clean.slice(2, 4), 16) || 0;
  const b = parseInt(clean.slice(4, 6), 16) || 0;
  return { r, g, b };
}

// Blends a color with the background color to darken it near the base
function darkenColor(colorStr: string, factor: number): string {
  const rgb = parseToRgb(colorStr);
  // Blend with dark theme background #051124 (r=5, g=17, b=36)
  const r = Math.round(5 + (rgb.r - 5) * factor);
  const g = Math.round(17 + (rgb.g - 17) * factor);
  const b = Math.round(36 + (rgb.b - 36) * factor);
  return `rgb(${r},${g},${b})`;
}

// Off-screen canvas sprite generators
function preRenderGlowSprite(color: string, radius: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const size = radius * 2;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const { r, g, b } = parseToRgb(color);
    const grad = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
    grad.addColorStop(0, `rgb(${r},${g},${b})`);
    grad.addColorStop(0.3, `rgb(${r},${g},${b})`);
    grad.addColorStop(0.6, `rgba(${r},${g},${b},0.31)`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  return canvas;
}

function preRenderBaseGlowSprite(color1: string, color2: string, radius: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const size = radius * 2;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const rgb1 = parseToRgb(color1);
    const rgb2 = parseToRgb(color2);
    const grad = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
    grad.addColorStop(0, `rgba(${rgb1.r},${rgb1.g},${rgb1.b},0.88)`);
    grad.addColorStop(0.4, `rgba(${rgb2.r},${rgb2.g},${rgb2.b},0.33)`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  return canvas;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ComplianceEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number>(0);
  const frameRef     = useRef(0);

  // ── Mutable refs (updated every frame, never trigger re-renders) ──
  const timeRef        = useRef(0);
  const rawMouseRef    = useRef({ x: -2000, y: -2000 });
  const smoothMouseRef = useRef({ x: -2000, y: -2000 });
  const fiberRef       = useRef<FiberLine[]>([]);
  const isMobileRef    = useRef(false);
  const dimsRef        = useRef({ vbW: 1000, vbH: 600, cX: 500, cY: 600 });
  const nodesRef       = useRef<NodeCoord[]>([]);
  const hoveredRef     = useRef<number | null>(null);

  // Visibility gating: only run RAF when section is on-screen
  const isVisibleRef   = useRef(false);
  // Mouse-driven redraw flag: when cursor moves, request a single redraw
  const needsRedrawRef = useRef(true);

  // Glow Sprite Caches
  const tipGlowSpriteRef = useRef<HTMLCanvasElement | null>(null);
  const baseGlowSpriteRef = useRef<HTMLCanvasElement | null>(null);
  const initializedSpritesRef = useRef(false);

  // ── React state ──
  const [isMobile, setIsMobile]       = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const [mobileIdx, setMobileIdx]     = useState(3);
  const [nodes, setNodes]             = useState<NodeCoord[]>([]);
  const [cardsEntered, setCardsEntered] = useState(false);
  const entranceTriggeredRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => { isMobileRef.current = isMobile; }, [isMobile]);
  useEffect(() => { hoveredRef.current = hoveredNodeId; }, [hoveredNodeId]);

  // ── Responsive ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Rebuild dimensions and geometry on breakpoint change ──
  useEffect(() => {
    const vbW = isMobile ? 500 : 1000;
    const vbH = isMobile ? 260 : 600;
    const cX  = vbW / 2;
    const cY  = isMobile ? 245 : 600;
    dimsRef.current = { vbW, vbH, cX, cY };

    // 180 fiber lines on desktop (reduced from 280 for pure native DPR speed), 45 on mobile
    const count    = isMobile ? 45 : 180;
    const minAngle = isMobile ? -160 : -168;
    const maxAngle = isMobile ? -20  : -12;
    const spread   = maxAngle - minAngle;
    fiberRef.current = Array.from({ length: count }, (_, i) => {
      const baseAngleDeg = minAngle + (i * spread) / (count - 1);
      return {
        angle:        (baseAngleDeg * Math.PI) / 180,
        length:       (isMobile ? 100 : 130) + Math.random() * (isMobile ? 120 : 240),
        speed:        0.12 + Math.random() * 0.30,
        phase:        Math.random() * Math.PI * 2,
        thickness:    Math.random() * 0.65 + 0.5,
        baseAngleDeg,
      };
    });

    // Particles removed — unnecessary ambient motion

    // Desktop and mobile node coordinates
    // Shifted x to 501 / 251 for Governance to prevent SVG bounding-box zero-width filter bugs
    const desktopCoords = [
      { x: 230, y: 440 }, { x: 210, y: 320 }, { x: 330, y: 200 },
      { x: 501, y: 120 }, { x: 670, y: 200 }, { x: 790, y: 320 }, { x: 770, y: 440 },
    ];
    const mobileCoords = [
      { x: 130, y: 190 }, { x: 120, y: 130 }, { x: 180, y: 70 },
      { x: 251, y: 40  }, { x: 320, y: 70  }, { x: 380, y: 130}, { x: 370, y: 190 },
    ];
    const computed: NodeCoord[] = products.map((prod, i) => {
      const coord = isMobile ? mobileCoords[i] : desktopCoords[i];
      return { id: i, slug: prod.slug, title: prod.title, icon: prod.icon, description: prod.description, ...coord };
    });
    nodesRef.current = computed;
    setNodes(computed);
    initializedSpritesRef.current = false; // Trigger sprite re-rendering for correct radii
  }, [isMobile]);

  // ── Color helpers ──
  const getStrandColor = useCallback((baseAngleDeg: number, mobile: boolean) => {
    const minA = mobile ? -160 : -168;
    const maxA = mobile ? -20  : -12;
    const t    = (baseAngleDeg - minA) / (maxA - minA);
    const idx  = Math.min(Math.floor(t * LAVENDER_THEME.palette.length), LAVENDER_THEME.palette.length - 1);
    return LAVENDER_THEME.palette[idx];
  }, []);

  const getNodeColor = useCallback((slug: string) => {
    const idx = PRODUCT_SLUGS.indexOf(slug);
    return LAVENDER_THEME.palette[idx % LAVENDER_THEME.palette.length] ?? LAVENDER_THEME.accent;
  }, []);

  // ── Sync canvas dimensions and apply full pixel ratio ──
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    // Full uncapped native DPR (up to 3x) for maximum visual crispness
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const w = container.clientWidth;
    const h = container.clientHeight;
    const targetW = Math.floor(w * dpr);
    const targetH = Math.floor(h * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width  = targetW;
      canvas.height = targetH;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
    }
  }, []);

  // ── Draw function (called on-demand, not in a continuous loop) ──
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    frameRef.current++;

    // Mouse interpolation (Lerp)
    const raw = rawMouseRef.current;
    const sm  = smoothMouseRef.current;
    const prevSmX = sm.x;
    const prevSmY = sm.y;
    sm.x += (raw.x - sm.x) * 0.09;
    sm.y += (raw.y - sm.y) * 0.09;

    // Check if mouse is still interpolating (needs more frames)
    const mouseDelta = Math.abs(sm.x - prevSmX) + Math.abs(sm.y - prevSmY);
    const mouseSettled = mouseDelta < 0.05;

    const { vbW, vbH, cX, cY } = dimsRef.current;
    const mobile = isMobileRef.current;
    const W = canvas.width;
    const H = canvas.height;
    const sx = W / vbW;
    const sy = H / vbH;

    // Cache pre-rendered glow sprites once
    if (!initializedSpritesRef.current) {
      initializedSpritesRef.current = true;
      tipGlowSpriteRef.current = preRenderGlowSprite(LAVENDER_THEME.tipColor, 20);
      baseGlowSpriteRef.current = preRenderBaseGlowSprite(
        LAVENDER_THEME.halo[0],
        LAVENDER_THEME.halo[1],
        mobile ? 130 : 280
      );
    }

    ctx.clearRect(0, 0, W, H);

    // 1. Draw pre-rendered base core halo
    if (baseGlowSpriteRef.current) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const rad = mobile ? 130 : 280;
      ctx.drawImage(
        baseGlowSpriteRef.current,
        (cX - rad) * sx, (cY - rad) * sy,
        (rad * 2) * sx, (rad * 2) * sy
      );
      ctx.restore();
    }

    // 2. Drawing fiber strands — STATIC positions (no sway), with cursor repulsion only
    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    const threshold = mobile ? 55 : 130;
    const pushForce = mobile ? 14 : 32;

    fiberRef.current.forEach(line => {
      // Fixed resting angle — no time-based sway
      const angle = line.angle;

      let tx = cX + line.length * Math.cos(angle);
      let ty = cY + line.length * Math.sin(angle);

      // Cursor repulsion (interactive, not ambient)
      const ddx = tx - sm.x;
      const ddy = ty - sm.y;
      const dist = Math.sqrt(ddx * ddx + ddy * ddy);
      if (dist < threshold && dist > 0) {
        const force = (threshold - dist) / threshold;
        const push  = force * pushForce;
        tx += (ddx / dist) * push;
        ty += (ddy / dist) * push;
      }

      const cpY = cY - (cY - ty) * 0.45;
      // Static alpha based on phase (varied per strand but not oscillating)
      const alpha = 0.75 + Math.sin(line.phase) * 0.22;
      const strandColor = getStrandColor(line.baseAngleDeg, mobile);

      // Color gradation (deep navy base to bright lavender tip)
      const baseGradationColor = darkenColor(strandColor, 0.22);
      const tipGradationColor  = strandColor;

      const grad = ctx.createLinearGradient(cX * sx, cY * sy, tx * sx, ty * sy);
      grad.addColorStop(0, baseGradationColor);
      grad.addColorStop(1, tipGradationColor);

      // Wide soft glow layer
      ctx.save();
      ctx.globalAlpha = alpha * 0.32;
      ctx.strokeStyle = grad;
      ctx.lineWidth   = (line.thickness * 2.8) * sx;
      ctx.lineCap     = "round";
      ctx.beginPath();
      ctx.moveTo(cX * sx, cY * sy);
      ctx.quadraticCurveTo(cX * sx, cpY * sy, tx * sx, ty * sy);
      ctx.stroke();
      ctx.restore();

      // Sharp bright core layer
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = grad;
      ctx.lineWidth   = (line.thickness + 0.35) * sx;
      ctx.lineCap     = "round";
      ctx.beginPath();
      ctx.moveTo(cX * sx, cY * sy);
      ctx.quadraticCurveTo(cX * sx, cpY * sy, tx * sx, ty * sy);
      ctx.stroke();
      ctx.restore();

      // Glowing tip sprite stamp (static alpha)
      const tipA = 0.72 + Math.sin(line.phase * 2.1) * 0.25;
      if (tipGlowSpriteRef.current) {
        ctx.save();
        ctx.globalAlpha = tipA;
        const rad = line.thickness * 4.8;
        ctx.drawImage(
          tipGlowSpriteRef.current,
          (tx - rad) * sx, (ty - rad) * sy,
          (rad * 2) * sx, (rad * 2) * sy
        );
        ctx.restore();
      }
    });

    ctx.restore();

    // 3. Parallax coordinate update (zero React involvement)
    if (frameRef.current % 2 === 0 && sm.x > -1000) {
      const nx = (sm.x - vbW / 2) * 0.008;
      const ny = (sm.y - vbH) * 0.008;
      if (containerRef.current) {
        containerRef.current.style.setProperty("--tilt-x", `${nx}px`);
        containerRef.current.style.setProperty("--tilt-y", `${ny}px`);
      }
    }

    // Continue RAF only while mouse is still interpolating (settling after move)
    if (!mouseSettled) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      rafRef.current = 0;
    }
  }, [getStrandColor]);

  // ── Request a redraw (starts RAF if not already running) ──
  const requestRedraw = useCallback(() => {
    if (rafRef.current === 0) {
      rafRef.current = requestAnimationFrame(draw);
    }
  }, [draw]);

  // ── Bind initial draw, resize, and IntersectionObserver ──
  useEffect(() => {
    syncCanvasSize();
    // Initial draw (one-time render of the static strands)
    requestAnimationFrame(draw);

    const onResize = () => {
      syncCanvasSize();
      requestRedraw();
    };
    window.addEventListener("resize", onResize);

    // IntersectionObserver: track visibility for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // Redraw once when section becomes visible (e.g. after scrolling back)
          requestRedraw();
        }
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [draw, syncCanvasSize, requestRedraw]);

  // ── One-shot scroll entrance for compliance cards ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !entranceTriggeredRef.current) {
          entranceTriggeredRef.current = true;
          setCardsEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Mouse handlers ──
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const { vbW, vbH } = dimsRef.current;
    rawMouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width)  * vbW,
      y: ((e.clientY - rect.top)  / rect.height) * vbH,
    };
    requestRedraw();
  }, [requestRedraw]);

  const handleMouseLeave = useCallback(() => {
    rawMouseRef.current    = { x: -2000, y: -2000 };
    smoothMouseRef.current = { x: -2000, y: -2000 };
    requestRedraw();
  }, [requestRedraw]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[580px] lg:h-[600px] overflow-hidden select-none bg-transparent"
    >
      {/* ── Static Fog Auroras (atmospheric depth, no continuous motion) ─────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-90">
        <div
          className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full blur-[120px]"
          style={{ backgroundColor: `${LAVENDER_THEME.fog[0]}26` }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[75%] h-[75%] rounded-full blur-[130px]"
          style={{ backgroundColor: `${LAVENDER_THEME.fog[1]}1f` }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-[60%] h-[60%] rounded-full blur-[120px]"
          style={{ backgroundColor: `${LAVENDER_THEME.fog[2]}1a` }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Canvas — fiber strands drawn here ───────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* ── SVG — only 7 spoke paths ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-15">
        <svg
          viewBox={`0 0 ${dimsRef.current.vbW} ${dimsRef.current.vbH}`}
          className="w-full h-full"
        >
          <defs>
            {/* Hardware-accelerated SVG glow filter with userSpaceOnUse to prevent clipping on vertical/horizontal paths */}
            <filter id="laserGlow" filterUnits="userSpaceOnUse" x="-100" y="-100" width="1200" height="800">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {nodes.map(node => {
            const isHovered = hoveredNodeId === node.id;
            const color = getNodeColor(node.slug);
            const { vbW, vbH, cX, cY } = dimsRef.current;
            const cpY = cY - (cY - node.y) * 0.45;
            const d = `M ${cX} ${cY} Q ${cX} ${cpY} ${node.x} ${node.y}`;
            return (
              <g key={node.id}>
                <path
                  d={d} stroke={color} fill="none"
                  strokeWidth={isHovered ? 3.5 : 1.5}
                  opacity={isHovered ? 1 : 0.55}
                  className="transition-all duration-300"
                />
                {isHovered && (
                  <motion.path
                    d={d} stroke="#ffffff" fill="none" strokeWidth="4.5"
                    strokeDasharray="20 70"
                    animate={{ strokeDashoffset: [-90, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    style={{ filter: "url(#laserGlow)" }}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Desktop Node Badges ─────────────────────────────────────────────── */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {nodes.map((node, i) => {
            const isHovered = hoveredNodeId === node.id;
            const color = getNodeColor(node.slug);
            const { vbW, vbH } = dimsRef.current;
            const leftPercent = (node.x / vbW) * 100;
            const topPercent  = (node.y / vbH) * 100;

            return (
              <motion.div
                key={node.id}
                className="absolute z-10 pointer-events-none"
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                }}
                initial={{ opacity: 0, x: "-50%", y: "calc(-50% + 24px)" }}
                animate={
                  cardsEntered
                    ? { opacity: 1, x: "-50%", y: "-50%" }
                    : { opacity: 0, x: "-50%", y: "calc(-50% + 24px)" }
                }
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <MotionLink
                  to={`/product/${node.slug}`}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`relative z-10 cursor-pointer p-3.5 rounded-2xl bg-white/95 border backdrop-blur-md w-[145px] flex flex-col items-center justify-center text-center select-none pointer-events-auto transition-all duration-300 ${
                    isHovered ? "bg-white" : "border-slate-200/80"
                  }`}
                  style={{
                    transform: "translate3d(var(--tilt-x, 0px), var(--tilt-y, 0px), 0) scale(" + (isHovered ? 1.15 : 1) + ")",
                    borderColor: isHovered ? color : "rgba(15,23,42,0.08)",
                    boxShadow:   isHovered ? `0 0 22px ${color}55` : "none",
                  }}
                >
                  <div
                    className="flex flex-col items-center gap-2"
                    style={{
                      animation: `float-bob-${i % 3} ${3.5 + i * 0.4}s ease-in-out infinite alternate`,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 bg-slate-100"
                      style={{
                        borderColor: isHovered ? `${color}40` : "rgba(15,23,42,0.08)",
                        boxShadow:   isHovered ? `0 0 12px ${color}66` : "none",
                      }}
                    >
                      <ProductIcon name={node.icon} color={color} className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[10.5px] uppercase tracking-wider text-slate-900 leading-tight">
                      {node.title}
                    </h3>
                  </div>
                </MotionLink>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Mobile Carousel ─────────────────────────────────────────────────── */}
      {isMobile && (
        <motion.div
          className="w-full bg-[#051124]/90 p-4 border-t border-white/5 z-25 flex flex-col items-center"
          initial={{ opacity: 0, y: 24 }}
          animate={cardsEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between w-full max-w-[320px] gap-2 mb-4">
            <button
              onClick={() => setMobileIdx(p => (p === 0 ? nodes.length - 1 : p - 1))}
              className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
            >
              <Icons.ChevronLeft className="w-4 h-4" />
            </button>
            {nodes[mobileIdx] && (
              <Link
                to={`/product/${nodes[mobileIdx].slug}`}
                className="flex-1 rounded-2xl border bg-slate-900/50 p-4 flex flex-col items-center justify-center text-center min-h-[105px] cursor-pointer"
                style={{ borderColor: `${getNodeColor(nodes[mobileIdx].slug)}40` }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${getNodeColor(nodes[mobileIdx].slug)}18` }}>
                  <ProductIcon name={nodes[mobileIdx].icon} color={getNodeColor(nodes[mobileIdx].slug)} className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-[10px] uppercase tracking-wider text-white leading-tight">
                  {nodes[mobileIdx].title}
                </h3>
              </Link>
            )}
            <button
              onClick={() => setMobileIdx(p => (p === nodes.length - 1 ? 0 : p + 1))}
              className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
            >
              <Icons.ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-1.5 justify-center">
            {nodes.map(n => (
              <button
                key={n.id}
                onClick={() => setMobileIdx(n.id)}
                className={`h-1.5 rounded-full transition-all ${mobileIdx === n.id ? "w-4" : "w-1.5 bg-slate-700"}`}
                style={{ backgroundColor: mobileIdx === n.id ? getNodeColor(n.slug) : undefined }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
