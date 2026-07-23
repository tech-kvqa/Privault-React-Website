/**
 * @file NavbarLogo.tsx
 * @description Renders the Privault brand logo image.
 */

import logoImg from "./privault_logo.png";

interface NavbarLogoProps {
  /** Visual variation theme. Light and dark variants render in crisp white for optimal contrast on Deep Space Blue background. */
  variant?: "light" | "dark";
}

/**
 * Brand Logo component for header navigation and footer panels.
 * Inverts colors to white (#fff) dynamically so it pops clearly against deep navy branding panels.
 */
export default function NavbarLogo({ variant: _variant = "light" }: NavbarLogoProps) {
  return (
    <div className="flex items-center select-none py-1">
      <img
        src={logoImg}
        alt="PRIVAULT Logo"
        className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
      />
    </div>
  );
}
