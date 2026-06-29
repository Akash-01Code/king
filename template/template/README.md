# Master Cinematic Scroll Next.js Template

An ultra-premium, high-performance boilerplate for scroll-driven cinematic web experiences. This template features smooth scrolling powered by **Lenis**, hardware-accelerated canvas-scrubbing powered by **Framer Motion**, and a robust batch-based asset preloader.

## Key Features
- **Canvas-Scrub Engine**: Synchronizes complex image/video frame sequences to the scroll position without the latency and decoding hiccups of standard HTML `<video>` tags.
- **Auto-Cover Resize Layout**: Perfectly mimics CSS `background-size: cover` behavior for canvas rendering, fully responsive across high-DPI (Retina) desktops and mobile aspect ratios.
- **Batch Image Preloader**: Batches sequence preloading efficiently to prevent network bottlenecks, complete with initial frame display logic and a global load progress provider.
- **Smooth Hijack Scroll**: Integrated Lenis scroll manager that ensures absolute fluid transitions and reset fallbacks across page changes.
- **AI Agent-Ready**: Includes a dedicated prompt to bootstrap any modern AI coding agent to implement custom sections immediately.

---

## Included Manuals
To make customization and execution as frictionless as possible, check out:
- 📖 [USER_GUIDE.md](file:///Users/R/Downloads/frames/template/USER_GUIDE.md) — Step-by-step documentation on how to export video frames, arrange folders, set breakpoints, and style overlays.
- 🤖 [AGENT_PROMPT.md](file:///Users/R/Downloads/frames/template/AGENT_PROMPT.md) — The perfect prompt to copy/paste to an AI agent (like Claude or Gemini) to build a beautiful custom layout on top of this engine.

---

## Getting Started

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the instructions and start customizing!

### 3. Build for Production
To check for TypeScript compiler warnings or production readiness:
```bash
npm run build
```

---

## Folder Structure
```
template/
├── AGENT_PROMPT.md           # Copy/paste prompt for coding agents
├── USER_GUIDE.md             # How to configure sequence folders & breakpoints
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Global page entry and SmoothScroll wrapper
│   │   ├── page.tsx          # Configuration mount for CinematicScroll
│   │   └── globals.css       # Standard Tailwind/Global CSS styling
│   ├── components/
│   │   ├── animations/
│   │   │   └── CinematicScroll.tsx  # The core canvas overlay and text section director
│   │   └── layout/
│   │       ├── Preloader.tsx        # Beautiful progress preloading display
│   │       └── SmoothScroll.tsx     # Global provider hook for Lenis
│   └── hooks/
│       ├── useCanvasScroll.ts       # Low-level canvas frame rendering engine
│       ├── useImagePreloader.ts     # Batch image preloading with decoding optimization
│       └── useLenis.ts              # Butter-smooth scroll driver
```

Made for building stunning, premium web experiences. Happy coding!
