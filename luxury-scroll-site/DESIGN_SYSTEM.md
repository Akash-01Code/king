# Design System & Style Guide: Vertice

This document serves as the design guidelines and typography context for the **Vertice** luxury portfolio website. Use these parameters to build new, consistent, premium components.

---

## 1. Color Palette (Zero Gold)

To maintain a sophisticated, expensive architectural feel, we use a monochromatic scale supported by a warm sand-alabaster backdrop and soft muted accents.

| Role | Color | Hex / Class | Description |
| :--- | :--- | :--- | :--- |
| **Primary Background (Light)** | Warm Sand | `#f5f4ed` | Core background for the home page cards and editorial grid. |
| **Primary Background (Dark)** | Matte Obsidian | `#0b0b0b` | Core background for the preloader and scrubbing canvas sections. |
| **Card Background** | Ceramic White | `#fcfcfa` | High-contrast clean card panels that pop against `#f5f4ed`. |
| **Line Dividers** | Muted Slate Line | `rgba(0,0,0,0.1)` | Used for 1px layout boundaries and structural splits. |
| **Primary Typography (Light)** | Charcoal Black | `#1a1a1a` | High-readability header and copy text color. |
| **Muted Copy (Light)** | Faded Slate | `rgba(0,0,0,0.5)` | Subtitles, details, and descriptive copy. |
| **Primary Typography (Dark)** | Pure Alabaster | `#ffffff` | High-contrast copy on dark canvas sequences. |

### Muted Pill Tag Accents (Non-Gold Tones)
- **Elite Green**: `text-emerald-800 bg-emerald-50 border border-emerald-200/50`
- **Vista Blue**: `text-blue-800 bg-blue-50 border border-blue-200/50`
- **Design Indigo**: `text-indigo-800 bg-indigo-50 border border-indigo-200/50`
- **Craft Slate**: `text-slate-800 bg-slate-100 border border-slate-200/60`
- **Smart Teal**: `text-teal-800 bg-teal-50 border border-teal-200/50`
- **Living Zinc**: `text-zinc-800 bg-zinc-100 border border-zinc-200/60`

---

## 2. Typography System

We use a high-contrast typographical hierarchy combining delicate serif headings with clean, modern copy and technical monospace labels.

### Headers (Serif)
- **Font**: `Playfair Display` (Google Font)
- **Tailwind Class**: `font-serif`
- **Styling Rules**: Keep font weight `light` or `normal` (avoid bold headings where possible for a more editorial feel). Use tracking-tight or slight tracking-wide.
- **Example Class**: `font-serif font-light text-4xl md:text-6xl tracking-tight leading-[1.1] text-black`

### Body Copy (Sans)
- **Font**: `Inter` (Google Font)
- **Tailwind Class**: `font-sans`
- **Styling Rules**: Keep font weight `light` or `normal` for clean elegance, with line heights set to relaxed.
- **Example Class**: `font-sans font-light text-xs md:text-sm text-black/50 leading-relaxed`

### Metadata / Indices (Monospace)
- **Font**: System Monospace
- **Tailwind Class**: `font-mono`
- **Styling Rules**: Small text, uppercase, and wide letter-spacing. Often formatted inside brackets.
- **Example Class**: `text-[9px] font-mono tracking-[0.3em] uppercase text-black/40`
- **Format**: `[ 01 / OVERVIEW ]`

---

## 3. Structural Layout Grid

- **Layout Container Width**: Always align main sections inside a constrained, spacious viewport margin:
  `max-w-7xl mx-auto px-8 md:px-16`
- **Delicate 1px Grid Lines**: Separate sections or grid columns using thin borders or vertical lines to mimic blueprint blueprints:
  - Horizontal Divider: `<div className="absolute top-0 left-0 right-0 h-[1px] bg-black/10 mx-8 md:mx-16" />`
  - Vertical Divider: `<div className="w-[1px] h-8 bg-black/10" />`
- **Asymmetry**: Offset columns and align headings off-center (e.g., placing text in bottom-left or top-right corners) to create print-magazine aesthetics.

---

## 4. Animation Easing Guidelines (Framer Motion)

For a luxurious, fluid feel, avoid linear transitions. Use the following cubic-bezier transition parameters:

### The "Lenis/Organic" Transition (Slide-up Curtain & Pages)
- **Easing Bezier**: `[0.76, 0, 0.24, 1]`
- **Usage**: Layout wipes, full page clipping masks, screen exits.
- **Config**: `transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}`

### The "Deceleration" Reveal Transition (Text reveals)
- **Easing Bezier**: `[0.16, 1, 0.3, 1]`
- **Usage**: Letter and word reveals sliding up from hidden boundaries.
- **Config**: `transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}`

### The Masking Container (Reveal Wrap)
To wrap text and animate it sliding up, wrap it in a parent container with:
```html
<span className="reveal-text-container">
  <motion.span 
    initial={{ y: "100%" }}
    animate={{ y: 0 }} 
  >
    Your Text
  </motion.span>
</span>
```
`reveal-text-container` hides overflow (`overflow: hidden; display: block; position: relative;`) so text appears out of thin air.

---

## 5. Stateful Grid Interactions

When building grids (e.g., feature lists, suites, gallery items):
- Bind an `onMouseEnter` / `onMouseLeave` state to the active element.
- Set the active card to scale up slightly and draw a subtle shadow.
- Set inactive siblings to dim to `opacity-30` or `blur-[0.5px]` to draw focused visual attention:
```typescript
const [active, setActive] = useState<number | null>(null);

// Card element:
className={`transition-all duration-700 ${
  active !== null && active !== index 
    ? 'opacity-30 scale-[0.98] blur-[0.5px]' 
    : 'opacity-100 scale-100 shadow-xl'
}`}
```
