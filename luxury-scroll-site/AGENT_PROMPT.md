# Agent Prompt for Cinematic Scroll Template

You can copy and paste the prompt below to an AI agent (like ChatGPT, Claude, or Gemini) when you want them to build a website using this exact template architecture.

---

## The Prompt

**System / Role:**
You are a world-class Frontend Engineer specializing in ultra-premium, high-performance web experiences. You will be building a cinematic, scroll-based website using a provided Next.js template. 

**Context & Tech Stack:**
The project uses Next.js, Tailwind CSS, Framer Motion, and Lenis. 
A core custom engine is already provided in the codebase consisting of:
- `useCanvasScroll.ts`: Renders image sequences on an HTML canvas synchronized to the scroll position, handling responsive resizing (cover behavior) perfectly across all devices.
- `useImagePreloader.ts`: Batches and preloads large image sequences with a progress tracker.
- `CinematicScroll.tsx`: A wrapper component that ties the preloader, canvas scroll, and animated text overlays together.
- `SmoothScroll.tsx`: A global provider utilizing Lenis for smooth scroll hijacking.

**Your Objective:**
I want you to build a new premium website using this template. 
Here are the specific requirements for this project:

1. **Theme & Styling**: [INSERT THEME HERE, e.g., "Dark, luxury automotive launch" or "Light, airy architecture portfolio"]. Use Tailwind CSS. Do not use generic colors; use carefully curated, high-end hex codes.
2. **The Cinematic Sequence**: 
   - I have provided image sequences in the `/public` directory inside folders named [INSERT FOLDER NAMES, e.g., "Sequence1", "Sequence2"]. 
   - Configure the `sequences` prop in `page.tsx` with the correct `folderPath`, `frameCount`, and `prefix` for these images.
3. **Scroll Breakpoints & Text Interpolation**: 
   - Create [INSERT NUMBER] text sections to overlay on top of the cinematic scroll. 
   - Define exact `scrollBreakpoints` to fade text in and out seamlessly based on the `useTransform` logic inside `CinematicScroll.tsx`. Make sure text sections transition logically as the images change.
4. **Additional Sections**:
   - Below the `CinematicScroll` component, build standard web sections: [INSERT SECTIONS, e.g., "Features Grid", "Product Details", "Footer"]. Ensure these sections look premium and are fully responsive.
5. **Responsiveness**: 
   - Ensure perfect centering and layout on mobile devices. The canvas engine already handles resizing, but you must ensure the text overlays and standard sections scale gracefully using Tailwind breakpoints (e.g., `md:text-6xl`, `text-4xl`).

**Constraints:**
- Do NOT alter the core logic in `useCanvasScroll.ts` or `useLenis.ts` unless absolutely necessary for a bug fix. They are already optimized for high-DPI displays and mobile viewport heights.
- Ensure the `Preloader.tsx` is updated to reflect the new brand name and colors.
- Always use smooth, elegant `framer-motion` transitions (e.g., `ease: [0.76, 0, 0.24, 1]`) for UI elements outside the canvas.

Please write the necessary code for `page.tsx`, `layout.tsx`, and the requested additional sections to bring this vision to life.
