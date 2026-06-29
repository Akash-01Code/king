'use client';

import { RefObject, useEffect, useRef } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

export function useCanvasScroll(
  containerRef: RefObject<HTMLElement | null>,
  images: HTMLImageElement[],
  canvasRef: RefObject<HTMLCanvasElement | null>
) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(
    smoothProgress,
    [0, 1],
    [0, Math.max(0, images.length - 1)]
  );

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    
    // Set display size
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    // Set actual size in memory
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      return { width, height };
    };

    let { width, height } = updateSize();

    const render = () => {
      const currentIndex = Math.round(frameIndex.get());
      const img = images[currentIndex];

      if (img && img.complete) {
        // Calculate framing to "cover" the canvas while keeping aspect ratio
        const hRatio = width / img.width;
        const vRatio = height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShift_x = (width - img.width * ratio) / 2;
        const centerShift_y = (height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(
          img,
          0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
      }
    };

    // Use Framer Motion's onChange to trigger render
    const unsubscribe = frameIndex.on('change', render);
    
    // Initial render
    render();

    // Handle resize
    const handleResize = () => {
      const size = updateSize();
      width = size.width;
      height = size.height;
      render();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [images, frameIndex, canvasRef]);

  return { scrollYProgress, smoothProgress };
}
