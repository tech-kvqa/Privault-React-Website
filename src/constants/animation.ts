/**
 * @file animation.ts
 * @description Named constants for the 3D lock scroll-driven animation timeline and text visibility thresholds.
 * 
 * Centralizes all magic numbers related to the GSAP timeline and scroll-progress calculations,
 * allowing developers to fine-tune the pacing without hacking Three.js logic.
 */

/**
 * Scroll progress breakpoints mapping to the GSAP animation timeline phases.
 * Timelines must sum to exactly 1.0 for scroll scrubbing alignment.
 */
export const ANIMATION_PHASES = {
  /** Phase 1: Key slides from depth closer to the lock body (scroll 0.0 -> 0.48) */
  PHASE_1_END: 0.48,
  /** Phase 2: Key inserts fully into the lock core cylinder (scroll 0.48 -> 0.74) */
  PHASE_2_END: 0.74,
  /** Phase 3: Key rotates 90 degrees clockwise (scroll 0.74 -> 0.90) */
  PHASE_3_END: 0.90,
  /** Phase 4: Shackle hinge pops open & emissive unlock glow triggers (scroll 0.90 -> 1.0) */
  PHASE_4_END: 1.0,
};

/**
 * Normalization thresholds for rendering text block opacities (p1, p2, p3)
 * based on overall scroll progress.
 */
export const TEXT_VISIBILITY = {
  // Slide 1 text bounds
  P1_FADE_OUT_THRESHOLD: 0.30,

  // Slide 2 text bounds
  P2_FADE_IN_START: 0.32,
  P2_FADE_IN_DURATION: 0.12, // fades in between 0.32 and 0.44
  P2_FADE_OUT_START: 0.60,
  P2_FADE_OUT_DURATION: 0.10, // fades out between 0.60 and 0.70

  // Slide 3 text bounds
  P3_FADE_IN_START: 0.72,
  P3_FADE_IN_DURATION: 0.09, // fades in between 0.72 and 0.81
  P3_FADE_OUT_START: 0.82,
  P3_FADE_OUT_DURATION: 0.06, // fades out between 0.82 and 0.88

  // Overall viewport exit transition
  VIEWPORT_FADE_START: 0.84,
  VIEWPORT_FADE_DURATION: 0.06, // fades out completely by 0.90
  VIEWPORT_HIDE_THRESHOLD: 0.90,
};

/**
 * Responsive layout positions and scaling factors for the 3D lock model.
 */
export const LAYOUT_CONFIG = {
  /** Aspect ratio boundary underneath which the layout shifts to mobile (portrait-skewed) */
  MOBILE_ASPECT_RATIO_LIMIT: 0.85,
  /** Scale factor of the lock group on mobile displays */
  MOBILE_SCALE: 0.65,
  /** Mobile center translation offset on X axis */
  MOBILE_POS_X: 0,
  /** Mobile center translation offset on Y axis — positive pushes lock up into upper portion of canvas */
  MOBILE_POS_Y: 1.1,

  /** Scale factor of the lock group on desktop displays */
  DESKTOP_SCALE: 0.98,
  /** Desktop translation offset X axis (pushes lock to the left, text on the right) */
  DESKTOP_POS_X: -1.9,
  /** Desktop translation offset Y axis */
  DESKTOP_POS_Y: -0.08,
};
