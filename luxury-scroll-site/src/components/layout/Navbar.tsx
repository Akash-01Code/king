'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Determine scroll threshold for header animation
      setIsScrolled(scrollY > 30);

      // Transition navbar text theme when entering the light sections on Home
      if (isHomePage) {
        const canvasHeight = window.innerHeight * 9.5;
        setIsLightSection(scrollY > canvasHeight);
      } else {
        setIsLightSection(true);
      }
    };

    if (!isHomePage) {
      setIsLightSection(true);
    } else {
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navItems = [
    { name: 'Overview', href: '/#overview', index: '01' },
    { name: 'Atelier', href: '/#atelier', index: '02' },
    { name: 'Amenities', href: '/amenities', index: '03' },
    { name: 'Brochure', href: '/brochure', index: '04' },
    { name: 'Inquire', href: '/#inquire', index: '05' }
  ];

  // Colors based on page scroll and menu open states
  const textClass = isOpen 
    ? 'text-black' 
    : isLightSection 
      ? 'text-black' 
      : 'text-white';

  const buttonBorderClass = isOpen
    ? 'text-black border-black/20 hover:bg-black hover:text-[#f5f4ed]'
    : isLightSection
      ? 'border-black/25 text-black hover:bg-black hover:text-[#f5f4ed]'
      : 'border-white/20 text-white hover:bg-white hover:text-black';

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 bg-transparent ${
          isScrolled && !isOpen ? 'py-4' : 'py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="relative z-55" onClick={() => setIsOpen(false)}>
            <span className={`text-xl font-serif tracking-[0.25em] uppercase font-light transition-colors duration-500 ${textClass}`}>
              Vertice
            </span>
          </Link>

          {/* Unified Menu / Close Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-[9px] tracking-[0.3em] uppercase border rounded-full transition-all duration-500 font-medium z-55 relative flex items-center justify-center ${
              isOpen ? 'w-10 h-10 p-0 text-[14px]' : 'px-7 py-3'
            } ${buttonBorderClass}`}
          >
            {isOpen ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              'Menu'
            )}
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Overlay Menu using circle clip-path */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              clipPath: "circle(0% at calc(100% - 6.5rem) 3.6rem)" 
            }}
            animate={{ 
              clipPath: "circle(150% at calc(100% - 6.5rem) 3.6rem)" 
            }}
            exit={{ 
              clipPath: "circle(0% at calc(100% - 6.5rem) 3.6rem)" 
            }}
            transition={{ 
              duration: 0.85, 
              ease: [0.76, 0, 0.24, 1] 
            }}
            className="fixed inset-0 z-40 bg-[#f5f4ed] text-black flex items-center p-12 md:p-24 select-none"
          >
            {/* Background design accents - large low opacity watermark */}
            <div className="absolute right-0 bottom-0 w-[55%] aspect-square pointer-events-none">
              <Image 
                src="/images/sketches/sketch-3.png"
                alt="Menu Background Watermark"
                fill
                className="object-contain mix-blend-multiply opacity-[0.06]"
              />
            </div>

            <nav className="flex flex-col gap-6 max-w-4xl relative z-10">
              {navItems.map((item, index) => (
                <div key={item.name} className="reveal-text-container">
                  <motion.div
                    initial={{ y: "120%" }}
                    animate={{ y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.08 + 0.15, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-6 font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-tight text-black hover:text-black/60 transition-colors duration-300 leading-none"
                    >
                      <span className="text-[12px] font-mono opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                        {item.index}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
