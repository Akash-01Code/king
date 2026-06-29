'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
  progress: number;
  isLoaded: boolean;
  title?: string;
  subtitle?: string;
}

export function Preloader({ 
  progress, 
  isLoaded, 
  title = "Vertice Residences", 
  subtitle = "An architectural journey is loading" 
}: PreloaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Smoothen the counting process
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < progress) {
          return Math.min(prev + 1, Math.round(progress));
        }
        return prev;
      });
    }, 15);

    return () => clearInterval(timer);
  }, [progress]);

  // Split title into words/characters for stagger animation
  const titleWords = title.split(' ');

  return (
    <motion.div
      initial={{ 
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" 
      }}
      animate={{ 
        clipPath: isLoaded 
          ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" 
          : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      }}
      transition={{ 
        duration: 1.6, 
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2
      }}
      onAnimationComplete={() => {
        if (isLoaded) {
          document.body.style.overflow = 'auto';
        }
      }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0b0b0b] text-[#f5f4ed] overflow-hidden p-8 md:p-16"
      style={{ pointerEvents: isLoaded ? 'none' : 'all' }}
    >
      {/* Top Section: Branding Subtitle */}
      <div className="flex justify-between items-start">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[9px] tracking-[0.35em] uppercase text-[#f5f4ed]/40 font-mono"
        >
          [ PERSPECTIVE SCROLL ENGINE ]
        </motion.span>
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-[9px] tracking-[0.35em] uppercase text-[#f5f4ed]/40 font-mono hidden md:block"
        >
          {subtitle}
        </motion.span>
      </div>

      {/* Middle Section: Staggered Slide-up Logo */}
      <div className="my-auto select-none">
        <h1 className="text-5xl md:text-8xl font-serif font-light tracking-[0.15em] uppercase flex flex-wrap justify-center md:justify-start gap-x-6 md:gap-x-10 leading-none">
          {titleWords.map((word, wIdx) => (
            <span key={wIdx} className="reveal-text-container">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: wIdx * 0.2 + 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="inline-block pb-2"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      {/* Bottom Section: Counters & Ultra-thin Progress Line */}
      <div className="space-y-8 relative">
        <div className="flex justify-between items-end">
          {/* Subtle coordinates or info details */}
          <div className="text-[9px] tracking-[0.25em] text-[#f5f4ed]/30 font-mono space-y-1">
            <p>LAT. 43.7696° N / LON. 11.2558° E</p>
            <p>© VERTICE ARCHITECTURAL GROUP</p>
          </div>

          {/* Large Clean Counter */}
          <div className="relative font-serif font-light text-7xl md:text-9xl leading-none tracking-tight tabular-nums select-none flex items-start">
            <span className="text-xl md:text-2xl font-mono text-[#f5f4ed]/30 mr-2 mt-1">[ % ]</span>
            <span>{String(displayProgress).padStart(3, '0')}</span>
          </div>
        </div>

        {/* Ultra-thin full-width loading line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#f5f4ed]/10 overflow-hidden">
          <motion.div 
            className="h-full bg-[#f5f4ed]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
