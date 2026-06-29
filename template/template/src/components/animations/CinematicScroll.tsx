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
  color?: string; // Tailwind text color class, e.g., 'text-white'
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
  scrollBreakpoints: number[]; // e.g., [0, 0.2, 0.25, 0.45, 0.5, 0.7, 0.75, 1]
  heightClass?: string; // e.g., 'h-[1500vh]'
}

export function CinematicScroll({
  sequences,
  sections,
  scrollBreakpoints,
  heightClass = "h-[1500vh]"
}: CinematicScrollProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { images, loaded, firstFrameLoaded, progress } = useImagePreloader(sequences);
  const { scrollYProgress } = useCanvasScroll(containerRef, images, canvasRef);

  // Map scrollBreakpoints to section indices
  // For N sections, you need 2*N breakpoints to define the fade in/out zones.
  const sectionIndices = [];
  for (let i = 0; i < sections.length; i++) {
    sectionIndices.push(i, i);
  }

  // Fallback to avoid errors if lengths don't match
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
            style={{ opacity: firstFrameLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in' }} 
          />
          
          {/* Optional: Dark gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              {loaded && sections.length > 0 && (
                <SectionContent key={sectionIndex} item={sections[sectionIndex] || sections[0]} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionContent({ item }: { item: SectionConfig }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute flex flex-col items-center px-4"
    >
      {item.subtitle && (
        <span className={`${item.color || 'text-white'} text-sm md:text-base tracking-[0.3em] uppercase mb-4`}>
          {item.subtitle}
        </span>
      )}
      <h2 className={`${item.color || 'text-white'} text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest mb-8 text-center uppercase drop-shadow-2xl px-4`}>
        {item.title.split(' ').map((word, i) => (
          <span key={i} className="inline-block mx-2">
            {word}
          </span>
        ))}
      </h2>
      {item.cta && item.href && (
        <Link 
          href={item.href} 
          className="bg-white text-black px-10 py-5 uppercase tracking-widest text-sm font-bold pointer-events-auto hover:bg-gray-200 transition-colors duration-500 shadow-xl"
        >
          {item.cta}
        </Link>
      )}
    </motion.div>
  );
}
