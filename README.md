# Privault — Premium AI-Powered Privacy Platform

website live - https://privault-theta.vercel.app/

A premium React + Vite Single Page Application (SPA) offering an interactive compliance, governance, and security module explorer with a 3D scroll-driven lock and key hero animation.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tool & dev server)
- **Tailwind CSS v4**
- **Three.js** (WebGL 3D rendering)
- **GSAP + ScrollTrigger** (scroll-scrubbed interactive mechanics)
- **Framer Motion** (spring physics and gestural interactions)
- **React Router v6** (client-side routing)
- **Lucide React** (icons library)

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified by Vite) in your browser.

## Project Structure

```
src/
├── components/
│   ├── LockAnimation.tsx          # 3D hero scroll animation (Three.js + GSAP ScrollTrigger)
│   ├── MagicBento.tsx             # Interactive 7-card bento grid with cursor spotlight & custom particle states
│   ├── DraggableFeatureStack.tsx  # Horizontal 3D semi-circle card deck with Framer Motion spring physics
│   ├── BookDemoButton.tsx         # CTA Booking interaction
│   ├── Navbar.tsx                 # Site header navigation
│   └── Footer.tsx                 # Site footer
├── pages/
│   ├── Home.tsx                   # Landing page
│   ├── About.tsx                  # About page
│   ├── Contact.tsx                # Contact form page
│   ├── Products.tsx               # Product overview page
│   ├── ProductDetail.tsx          # Dynamic product details page
│   └── TestStack.tsx              # Interactive deck preview/playground
├── constants/
│   └── index.ts                   # Static data declarations (Products, Sectors, reasons)
├── App.tsx                        # Client routing configuration
├── main.tsx                       # Main entry point
└── index.css                      # Global Tailwind directives & token system
```

## Key Modules & Visual Effects

### 1. Cinematic Scroll 3D Hero
A premium metallic padlock and key render via Three.js. As you scroll:
- The key inserts into the keyhole, rotates, and pops the shackle open.
- Plays perfectly in reverse when scrolling back.
- Uses GSAP ScrollTrigger pinning for seamless scroll-scrub animations.

### 2. Magic Bento Grid (Compliance Solutions)
- Redesigned with premium white card styling.
- **DPIA Hero Card:** Upgraded to a 2×2 layout with embedded live compliance metrics, statistics, and capability checklists.
- **Spotlight Effects:** A soft dark-blue multiply glow follows the cursor globally across the grid and shines within each card (`::before` overlay).
- **Particle System:** Floating contrast particles activate and hover when you mouse over any card.

### 3. Draggable Feature Stack
- Cards are arranged on a parabolic 3D arch.
- **Tuned Snap Physics:** Removes lagging CSS transitions, supports momentum and flicks, and snaps cards precisely with high-performance spring easing (Framer Motion).

## License

Private — All rights reserved.

