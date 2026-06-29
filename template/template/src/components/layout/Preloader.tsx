'use client';

import { motion } from 'framer-motion';

interface PreloaderProps {
  progress: number;
  isLoaded: boolean;
  title?: string;
  subtitle?: string;
}

export function Preloader({ 
  progress, 
  isLoaded, 
  title = "Loading Experience", 
  subtitle = "Please wait while we prepare the visual journey" 
}: PreloaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoaded ? 0 : 1 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (isLoaded) {
          document.body.style.overflow = 'auto';
        }
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden text-white"
      style={{ pointerEvents: isLoaded ? 'none' : 'all' }}
    >
      <div className="relative w-full max-w-md px-10">
        <div className="relative z-10 space-y-12">
          {/* Logo/Text */}
          <div className="text-center space-y-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-bold tracking-widest uppercase"
            >
              {title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-400 tracking-wide uppercase"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Loading Bar Container */}
          <div className="space-y-4">
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            
            <div className="flex justify-between items-center text-[10px] tracking-widest text-white/60 uppercase">
              <span>Loading Sequence</span>
              <span className="font-medium text-white">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
