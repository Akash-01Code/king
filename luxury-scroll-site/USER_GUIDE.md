# Cinematic Scroll Template: User Guide

Welcome to the Master Template! This boilerplate provides a robust, high-performance engine for creating "Apple-style" or "premium cinematic" scroll websites where video/image sequences scrub perfectly in sync with the user's scroll position.

## How It Works
Instead of using standard HTML `<video>`, which is notoriously laggy when tied to scroll events, this template draws individual image frames onto an HTML5 `<canvas>`.
It uses **Lenis** for buttery smooth scrolling, **Framer Motion** for tracking scroll progress and animating UI, and a custom **Image Preloader** to ensure no frame is drawn before it is loaded.

---

## Step-by-Step Guide

### 1. Preparing Your Assets
You cannot use an `.mp4` file directly for scroll-scrubbing. You must convert your video into an image sequence.
1. Use a tool like Adobe Premiere, After Effects, or an online converter (like ezgif or frame extractors).
2. Export your video as a sequence of `.jpg` or `.webp` files. (Tip: `.webp` at 70% quality is usually the best balance of size and quality).
3. Name them sequentially (e.g., `frame-001.jpg`, `frame-002.jpg`, etc.).

### 2. Placing Your Assets
1. Create a folder inside the `public` directory of this template (e.g., `public/sequence-1`).
2. Paste all your extracted frames inside this folder.

### 3. Configuring the Sequence
Open `src/app/page.tsx` and configure the `sequences` array.

```typescript
const sequences = [
  { 
    folderPath: '/sequence-1', // Path relative to the public folder
    frameCount: 150,           // Total number of frames
    prefix: 'frame-',          // The text before the number
    extension: '.jpg'          // The file extension
  }
];
```
*Note: You can string multiple sequences together by adding more objects to this array.*

### 4. Setting Up Text Overlays
Configure the `sections` array in `page.tsx`. These are the text blocks that will fade in and out over your video.

```typescript
const sections = [
  {
    title: "Welcome to the Future",
    subtitle: "Innovation",
    cta: "Discover",
    href: "#next-section"
  },
  // Add more sections here
];
```

### 5. Tuning the Scroll Breakpoints
This is the most crucial part. The `scrollBreakpoints` array determines *when* your text sections appear and disappear relative to your total scroll progress (which goes from `0` at the top to `1` at the bottom of the canvas section).

```typescript
// Example for 2 sections:
// Array length MUST be 2 * (number of sections)
const scrollBreakpoints = [
  0.0, 0.4,   // Section 0 is visible from scroll progress 0.0 to 0.4
  0.45, 0.9   // Section 1 is visible from scroll progress 0.45 to 0.9
];
```
*Tip: Leave small gaps (like between 0.4 and 0.45) so the previous text completely fades out before the next one fades in.*

### 6. Adjusting Scroll Length
If your scroll feels too fast (video plays too quickly), increase the `heightClass` in `CinematicScroll`.
- `h-[1000vh]` means the section is 10 times the height of the screen.
- Increase to `h-[2000vh]` for a slower, longer scroll experience.

---

## Customizing the Look
- **Preloader**: Edit `src/components/layout/Preloader.tsx` to change the loading screen text, colors, and branding.
- **Text Styles**: The `SectionContent` inside `CinematicScroll.tsx` uses Tailwind CSS. You can adjust the fonts, text sizes, and positions there.

Enjoy building your cinematic experience!
