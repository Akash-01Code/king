'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValueEvent } from 'framer-motion';
import { useImagePreloader } from '../../hooks/useImagePreloader';
import { useCanvasScroll } from '../../hooks/useCanvasScroll';
import { Preloader } from '../layout/Preloader';
import Link from 'next/link';

interface SectionConfig {
  title: string;
  subtitle?: string;
  cta?: string;
  href?: string;
  color?: string; // e.g. text-white
}

interface SequenceConfig {
  folderPath: string;
  frameCount: number;
  prefix?: string;
  extension?: string;
}

interface CinematicScrollProps {
  sequences: SequenceConfig[];
  sections: SectionConfig[];
  scrollBreakpoints: number[];
  heightClass?: string;
}

export function CinematicScroll({
  sequences,
  sections,
  scrollBreakpoints,
  heightClass = "h-[1000vh]"
}: CinematicScrollProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { images, loaded, firstFrameLoaded, progress } = useImagePreloader(sequences);
  const { scrollYProgress } = useCanvasScroll(containerRef, images, canvasRef);

  // Map scrollBreakpoints to section indices
  const sectionIndices = [];
  for (let i = 0; i < sections.length; i++) {
    sectionIndices.push(i, i);
  }

  const safeBreakpoints = scrollBreakpoints.length >= sectionIndices.length 
    ? scrollBreakpoints 
    : [0, 1];
  const safeIndices = safeBreakpoints.length === sectionIndices.length 
    ? sectionIndices 
    : [0, 0];

  const currentSection = useTransform(scrollYProgress, safeBreakpoints, safeIndices);
  const [sectionIndex, setSectionIndex] = useState(0);

  useMotionValueEvent(currentSection, "change", (latest) => {
    setSectionIndex(Math.round(latest));
  });

  return (
    <>
      <Preloader progress={progress} isLoaded={loaded} />
      
      <section ref={containerRef} className={`relative ${heightClass} bg-black`}>
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0" 
            style={{ opacity: firstFrameLoaded ? 1 : 0, transition: 'opacity 0.6s ease-in' }} 
          />
          
          {/* Delicate Vignette for cinematic look & legibility */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none" />
          
          {/* Asymmetrical boundaries container */}
          <div className="absolute inset-0 p-8 md:p-24 z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              {loaded && sections.length > 0 && (
                <SectionContent 
                  key={sectionIndex} 
                  index={sectionIndex}
                  item={sections[sectionIndex] || sections[0]} 
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionContent({ item, index }: { item: SectionConfig; index: number }) {
  // Asymmetric placement mapping based on section index to feel like a high-end magazine layout
  const layoutClasses = [
    "bottom-12 md:bottom-24 left-8 md:left-24 items-start text-left max-w-xl", // Index 0: Bottom-Left
    "top-24 md:top-32 right-8 md:right-24 items-end text-right max-w-xl",      // Index 1: Top-Right
    "top-1/3 left-8 md:left-32 items-start text-left max-w-xl",                 // Index 2: Center-Left
    "bottom-12 md:bottom-24 right-8 md:right-24 items-end text-right max-w-xl"  // Index 3: Bottom-Right
  ];

  const currentLayout = layoutClasses[index % layoutClasses.length];
  const words = item.title.split(' ');

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className={`absolute flex flex-col ${currentLayout}`}
    >
      {/* Decorative vertical or horizontal line to anchor typography */}
      <motion.div 
        variants={{
          initial: { scaleX: 0, originX: index % 2 === 0 ? 0 : 1 },
          animate: { scaleX: 1 },
          exit: { scaleX: 0, transition: { duration: 0.4 } }
        }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="w-32 h-[1px] bg-white/20 mb-6"
      />

      {/* Editorial Monospace Subtitle */}
      {item.subtitle && (
        <motion.span 
          variants={{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 0.5, y: 0 },
            exit: { opacity: 0, y: -10 }
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[9px] font-mono tracking-[0.35em] uppercase text-white mb-4"
        >
          [ {String(index + 1).padStart(2, '0')} / {item.subtitle} ]
        </motion.span>
      )}

      {/* Word-by-word staggered slide-up headings */}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide text-white mb-8 flex flex-wrap gap-x-3 gap-y-1 leading-[1.15]">
        {words.map((word, wIdx) => (
          <span key={wIdx} className="reveal-text-container pb-1">
            <motion.span
              variants={{
                initial: { y: "100%" },
                animate: { y: 0 },
                exit: { y: "-100%", transition: { duration: 0.4 } }
              }}
              transition={{ 
                duration: 0.9, 
                delay: wIdx * 0.05, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      {/* Clean Inquire / CTA Link */}
      {item.cta && item.href && (
        <motion.div
          variants={{
            initial: { opacity: 0, y: 15 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -15, transition: { duration: 0.4 } }
          }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link 
            href={item.href} 
            className="group flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase text-white font-medium pointer-events-auto transition-opacity hover:opacity-80"
          >
            <span>{item.cta}</span>
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-500 text-white/50 group-hover:text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
