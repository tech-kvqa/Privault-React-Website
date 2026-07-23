/**
 * @file LockAnimation.tsx
 * @description Renders the 3D scroll-triggered padlock scene container and the floating landing page text slides.
 */

import { useRef } from "react";
import { Link } from "react-router-dom";
import { useLockScene } from "@/hooks/useLockScene";
import { TEXT_VISIBILITY } from "@/constants/animation";

/**
 * 3D Scroll Padlock Animation Component.
 * - Dynamically attaches to scroll bounds using the custom `useLockScene` hook.
 * - Computes localized opacity boundaries for the three typography slides based on scroll position.
 * - Renders the canvas view overlaying structural glassmorphic text boxes.
 */
export default function LockAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  // Bind WebGL canvas and timeline to our custom scroll hook
  const scrollProgress = useLockScene({
    canvasRef,
    viewportRef,
    containerRef,
    canvasWrapRef,
  });

  // Calculate slide 1 opacity: Fades out as user scrolls towards the threshold
  const p1 = Math.max(1 - scrollProgress / TEXT_VISIBILITY.P1_FADE_OUT_THRESHOLD, 0);

  // Calculate slide 2 opacity: Fades in, reaches peak, then fades out before slide 3
  const p2 = Math.min(Math.max((scrollProgress - TEXT_VISIBILITY.P2_FADE_IN_START) / TEXT_VISIBILITY.P2_FADE_IN_DURATION, 0), 1) *
    Math.min(Math.max(1 - (scrollProgress - TEXT_VISIBILITY.P2_FADE_OUT_START) / TEXT_VISIBILITY.P2_FADE_OUT_DURATION, 0), 1);

  // Calculate slide 3 opacity: Fades in, reaches peak, then fades out at the viewport exit boundary
  const p3 = Math.min(Math.max((scrollProgress - TEXT_VISIBILITY.P3_FADE_IN_START) / TEXT_VISIBILITY.P3_FADE_IN_DURATION, 0), 1) *
    Math.min(Math.max(1 - (scrollProgress - TEXT_VISIBILITY.P3_FADE_OUT_START) / TEXT_VISIBILITY.P3_FADE_OUT_DURATION, 0), 1);

  // Fades out the entire viewport element when transitioning to the next page contents
  const viewportOpacity = scrollProgress >= TEXT_VISIBILITY.VIEWPORT_HIDE_THRESHOLD ? 0 : 1 - Math.max(0, (scrollProgress - TEXT_VISIBILITY.VIEWPORT_FADE_START) / TEXT_VISIBILITY.VIEWPORT_FADE_DURATION);
  const viewportPointerEvents = scrollProgress >= TEXT_VISIBILITY.VIEWPORT_HIDE_THRESHOLD ? "none" : "auto";

  return (
    <div ref={containerRef} className="relative z-10 w-full h-[140vh] sm:h-[155vh] lg:h-[180vh] bg-transparent">
      <div
        ref={viewportRef}
        style={{ opacity: viewportOpacity, pointerEvents: viewportPointerEvents, willChange: 'opacity' }}
        className="w-full h-screen relative z-30 overflow-hidden pointer-events-none"
      >
        <div ref={canvasWrapRef} className="absolute inset-0 w-full h-full pointer-events-auto">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 72% 64% at 34% 54%, rgba(212,246,238,0) 16%, rgba(212,246,238,0.1) 48%, rgba(31,53,87,0.08) 78%, rgba(94,169,222,0.22) 100%)"
            }}
          />
          <div
            aria-hidden
            className="absolute left-[-8%] top-[15%] h-[24rem] w-[24rem] rounded-full bg-white/18 blur-[120px] opacity-70 pointer-events-none sm:h-[30rem] sm:w-[30rem] lg:h-[36rem] lg:w-[36rem]"
            style={{ transform: `translateY(${scrollProgress * -10}px)` }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 top-[46%] z-20 flex items-center justify-center px-5 pb-6 pointer-events-none sm:top-[42%] sm:px-8 sm:pb-8 lg:inset-0 lg:items-center lg:justify-end lg:px-12 lg:pb-0 lg:pr-24">
          <div className="relative h-auto w-full max-w-[31rem] pointer-events-auto select-none lg:max-w-[25rem] xl:max-w-[27rem]">
            <div
              aria-hidden
              className="absolute -inset-x-3 -inset-y-3 rounded-[1.75rem] border border-white/22 bg-[#d4f6ee]/76 shadow-[0_18px_48px_rgba(31,53,87,0.10)] backdrop-blur-xl"
            />
            <div className="relative px-4 pt-5 pb-10 sm:px-6 sm:pt-7 sm:pb-14 lg:px-8 lg:pt-9 lg:pb-16">

              <div className="relative min-h-[18rem] sm:min-h-[22rem] lg:min-h-[27rem]">
                {/* Text Slide 1 */}
                <div
                  className="absolute inset-0 flex flex-col justify-end pb-2 transition-all duration-300 lg:justify-center lg:pb-0"
                  style={{ opacity: p1, transform: `translateY(${Math.min(scrollProgress, TEXT_VISIBILITY.P1_FADE_OUT_THRESHOLD) * -32}px)` }}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-text-secondary/72">
                    AI-powered security for regulated teams
                  </span>
                  <h1 className="mt-5 font-editorial text-4xl font-extrabold leading-[0.94] tracking-[-0.05em] text-text-primary sm:text-5xl lg:text-[4.5rem]">
                    Security
                    <span
                      className="block text-transparent bg-clip-text"
                      style={{ backgroundImage: "linear-gradient(135deg, #1F3557 0%, #365C96 54%, #5FD3B4 100%)" }}
                    >
                      that thinks
                    </span>
                    <span className="block">ahead</span>
                  </h1>
                  <p className="mt-5 max-w-[30rem] text-sm font-medium leading-6 text-text-secondary sm:mt-6 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                    Privault brings privacy operations, breach response, vendor risk, DPIA, and data rights into one
                    calm control plane for enterprise teams that need speed and proof
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                    <Link
                      to="/products"
                      className="inline-flex items-center justify-center rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_40px_rgba(31,53,87,0.22)] transition-all hover:bg-brand-700 hover:-translate-y-0.5"
                    >
                      Explore Platform
                    </Link>
                  </div>
                </div>

                {/* Text Slide 2 */}
                <div
                  className="absolute inset-0 flex flex-col justify-end pb-2 transition-all duration-300 lg:justify-center lg:pb-0"
                  style={{ opacity: p2, transform: `translateY(${Math.max(scrollProgress - TEXT_VISIBILITY.P2_FADE_IN_START, 0) * -34}px)` }}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-text-secondary/72">
                    Authorization in motion
                  </span>
                  <h2 className="mt-5 font-editorial text-3xl font-extrabold leading-[0.96] tracking-[-0.05em] text-text-primary sm:text-4xl lg:text-[4.2rem]">
                    Authorize
                    <span
                      className="block text-transparent bg-clip-text"
                      style={{ backgroundImage: "linear-gradient(135deg, #1F3557 6%, #365C96 58%, #87DEC7 100%)" }}
                    >
                      every action
                    </span>
                  </h2>
                  <p className="mt-5 max-w-[28rem] text-sm font-medium leading-6 text-text-secondary sm:text-base sm:leading-7">
                    The key turns only when policy, access, and evidence line up. Privault treats compliance as an
                    active system, not a static checklist buried in documentation
                  </p>
                </div>

                {/* Text Slide 3 */}
                <div
                  className="absolute inset-0 flex flex-col justify-end pb-2 transition-all duration-300 lg:justify-center lg:pb-0"
                  style={{ opacity: p3, transform: `translateY(${Math.max(scrollProgress - TEXT_VISIBILITY.P3_FADE_IN_START, 0) * -32}px)` }}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-text-secondary/72">
                    Operational control
                  </span>
                  <h2 className="mt-5 font-editorial text-3xl font-extrabold leading-[0.96] tracking-[-0.05em] text-text-primary sm:text-4xl lg:text-[4.2rem]">
                    Unlock a calmer
                    <span
                      className="block text-transparent bg-clip-text"
                      style={{ backgroundImage: "linear-gradient(135deg, #37C8A1 0%, #365C96 54%, #1F3557 100%)" }}
                    >
                      control plane
                    </span>
                  </h2>
                  <p className="mt-5 max-w-[28rem] text-sm font-medium leading-6 text-text-secondary sm:text-base sm:leading-7">
                    Move from fragmented obligations to coordinated workflows across breach response, vendor diligence,
                    risk assessments, consent, and data subject requests
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
