'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface PageContent {
  pageNumber: number;
  content: React.ReactNode;
}

export default function Brochure() {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [targetSpread, setTargetSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isPastHalfway, setIsPastHalfway] = useState(false);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev

  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Spreads definition: [Left Page Index, Right Page Index]
  // Pages are:
  // 0: Empty/Inside Cover Left
  // 1: Cover Right
  // 2: Manifesto Left
  // 3: Topography Right
  // 4: CAD Left
  // 5: Specs Right
  // 6: Download Left
  // 7: Empty/Back Cover Right
  const spreads = [
    { leftIdx: 0, rightIdx: 1 }, // Spread 0 (Cover closed)
    { leftIdx: 2, rightIdx: 3 }, // Spread 1 (Manifesto & Topography)
    { leftIdx: 4, rightIdx: 5 }, // Spread 2 (CAD Grid & Specs)
    { leftIdx: 6, rightIdx: 7 }  // Spread 3 (Download & Back cover)
  ];

  // Helper page renderer
  const renderPage = (pageIdx: number) => {
    switch (pageIdx) {
      case 0: // Closed book left placeholder (hidden/linen backdrop)
        return (
          <div className="w-full h-full bg-[#dfdbd0] flex items-center justify-center p-8 select-none border-r border-black/5">
            <div className="text-center opacity-20">
              <span className="text-[10px] font-mono tracking-widest text-black uppercase">VERTICE PRINT EDITIONS</span>
            </div>
          </div>
        );
      case 1: // Spread 0 Right: Front Cover
        return (
          <div className="w-full h-full bg-[#f2efe6] flex flex-col justify-between p-12 text-center items-center shadow-inner relative">
            <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-black/40 pt-4">
              [ EDITION MMXXVI ]
            </span>
            <div className="space-y-6 my-auto flex flex-col items-center">
              <div className="w-12 h-[1px] bg-black/25" />
              <h1 className="text-4xl md:text-5xl font-serif font-light tracking-[0.15em] text-black">
                VERTICE
              </h1>
              <p className="text-[9px] font-mono tracking-[0.25em] text-black/40 max-w-[240px] leading-relaxed uppercase">
                MONOLITH ARCHITECTURE & SPACE INTEGRATION FOLIO
              </p>
              <div className="w-12 h-[1px] bg-black/25" />
            </div>
            <div className="flex flex-col items-center gap-2 pb-4">
              <span className="text-[8px] font-mono tracking-widest text-black/30">
                CLICK NEXT ARROW TO OPEN
              </span>
              <span className="text-[8px] font-mono text-black/30">43.7692° N, 11.2558° E</span>
            </div>
          </div>
        );
      case 2: // Spread 1 Left: Manifesto
        return (
          <div className="w-full h-full bg-[#f2efe6] flex flex-col justify-between p-10 md:p-12 shadow-inner border-r border-black/5">
            <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-black/30">[ 01 / PHILOSOPHY ]</span>
            <div className="my-auto space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-black tracking-wide leading-tight">
                A structure should not compete with its landscape. It should <span className="italic font-normal text-black/60">frame</span> it.
              </h2>
              <div className="w-12 h-[1px] bg-black/15" />
              <p className="text-xs text-black/50 font-light leading-relaxed">
                Vertice represents a quiet conversation between stone, sky, and shadow. By anchoring the foundation into the living granite topography, we create a residence that feels carved from the mountain itself. Triple-height glazing dissolves boundaries, allowing natural lighting metrics to paint the interiors with the passing seasons.
              </p>
            </div>
            <span className="text-[8px] font-mono text-black/30">PAGE 1</span>
          </div>
        );
      case 3: // Spread 1 Right: Topography
        return (
          <div className="w-full h-full bg-[#f2efe6] flex flex-col justify-between p-10 md:p-12 shadow-inner relative overflow-hidden">
            <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-black/30">[ 02 / CONTEXT ]</span>
            
            {/* Sketch watermark */}
            <div className="absolute inset-0 m-12 pointer-events-none select-none mix-blend-multiply opacity-[0.14] z-0">
              <Image 
                src="/images/sketches/sketch-3.png"
                alt="Site Topography Sketch"
                fill
                className="object-contain"
              />
            </div>
            
            <div className="relative z-10 mt-auto space-y-3">
              <div className="w-8 h-[1px] bg-black/15" />
              <p className="text-[9px] font-mono text-black/40 uppercase">FIG 01.A — BEDROCK FOUNDATION ANCHOR</p>
              <p className="text-[9px] text-black/45 font-light leading-relaxed max-w-xs">
                Draft showing the concrete core foundation anchoring directly into the prehistoric granite floor bed.
              </p>
            </div>
            <span className="text-[8px] font-mono text-black/30 self-end">PAGE 2</span>
          </div>
        );
      case 4: // Spread 2 Left: CAD Grid
        return (
          <div className="w-full h-full bg-[#f2efe6] flex flex-col justify-between p-10 md:p-12 shadow-inner border-r border-black/5 relative overflow-hidden">
            <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-black/30">[ 03 / BLUEPRINTS ]</span>
            
            {/* SVG CAD Drawing animation */}
            <div className="absolute inset-0 flex items-center justify-center p-12 z-0 opacity-40">
              <svg className="w-full h-full max-w-[220px] max-h-[220px] stroke-black/30 fill-none" viewBox="0 0 100 100">
                <motion.rect 
                  x="5" y="5" width="90" height="90" strokeWidth="0.5" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: (currentSpread === 2 || targetSpread === 2) ? 1 : 0 }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
                <motion.line 
                  x1="5" y1="35" x2="95" y2="35" strokeWidth="0.3" strokeDasharray="1 1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: (currentSpread === 2 || targetSpread === 2) ? 1 : 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
                <motion.line 
                  x1="5" y1="65" x2="95" y2="65" strokeWidth="0.3" strokeDasharray="1 1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: (currentSpread === 2 || targetSpread === 2) ? 1 : 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
                <motion.line 
                  x1="35" y1="5" x2="35" y2="95" strokeWidth="0.3" strokeDasharray="1 1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: (currentSpread === 2 || targetSpread === 2) ? 1 : 0 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
                <motion.line 
                  x1="65" y1="5" x2="65" y2="95" strokeWidth="0.3" strokeDasharray="1 1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: (currentSpread === 2 || targetSpread === 2) ? 1 : 0 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
                <motion.circle 
                  cx="35" cy="35" r="10" strokeWidth="0.5" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: (currentSpread === 2 || targetSpread === 2) ? 1 : 0 }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
                <motion.circle 
                  cx="65" cy="65" r="12" strokeWidth="0.5" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: (currentSpread === 2 || targetSpread === 2) ? 1 : 0 }}
                  transition={{ duration: 1.5, delay: 0.9 }}
                />
              </svg>
            </div>

            <div className="absolute inset-0 pointer-events-none select-none mix-blend-multiply opacity-[0.1] z-1">
              <Image 
                src="/images/sketches/sketch-9.png"
                alt="CAD core sketch overlay"
                fill
                className="object-contain p-12"
              />
            </div>

            <div className="relative z-10 mt-auto space-y-2">
              <div className="w-8 h-[1px] bg-black/15" />
              <p className="text-[9px] font-mono text-black/40 uppercase">DIAGRAM 02.B — AXIAL GRID MATRIX</p>
              <p className="text-[9px] text-black/45 font-light leading-relaxed max-w-[280px]">
                Active CAD vector lines trace the intersection coordinates of load pillars and shear dampening zones.
              </p>
            </div>
            <span className="text-[8px] font-mono text-black/30">PAGE 3</span>
          </div>
        );
      case 5: // Spread 2 Right: Specs
        return (
          <div className="w-full h-full bg-[#f2efe6] flex flex-col justify-between p-10 md:p-12 shadow-inner">
            <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-black/30">[ 04 / METRICS ]</span>
            <div className="my-auto space-y-4">
              <div className="flex justify-between border-b border-black/10 pb-2 text-[11px]">
                <span className="font-mono text-black/40">HEATED INDOOR LIVING</span>
                <span className="font-serif">14,200 SQ FT</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2 text-[11px]">
                <span className="font-mono text-black/40">OUTDOOR TERRAZZA</span>
                <span className="font-serif">6,800 SQ FT</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2 text-[11px]">
                <span className="font-mono text-black/40">CEILING HEIGHTS</span>
                <span className="font-serif">14.6 FT CLEAR</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2 text-[11px]">
                <span className="font-mono text-black/40">SEISMIC COEFFICIENT</span>
                <span className="font-serif">ZONE IV CRITERIA</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2 text-[11px]">
                <span className="font-mono text-black/40">SUSTAINABILITY INDEX</span>
                <span className="font-serif">LEED PLATINUM</span>
              </div>
            </div>
            <span className="text-[8px] font-mono text-black/30 self-end">PAGE 4</span>
          </div>
        );
      case 6: // Spread 3 Left: Download
        return (
          <div className="w-full h-full bg-[#f2efe6] flex flex-col justify-between p-10 md:p-12 shadow-inner border-r border-black/5">
            <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-black/30">[ 05 / ARCHIVE ]</span>
            <div className="my-auto space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-black tracking-wide leading-tight">
                Acquire the digital blueprint folio.
              </h2>
              <p className="text-xs text-black/50 font-light leading-relaxed">
                Includes high-resolution elevations, load metrics, wiring conduits, structural load details, and the full somatic sketch library.
              </p>
              
              <div className="pt-2">
                <button 
                  onClick={() => {
                    if (downloading || downloadSuccess) return;
                    setDownloading(true);
                    setDownloadProgress(0);
                  }}
                  disabled={downloading || downloadSuccess}
                  className={`w-full py-4 text-[9px] tracking-[0.25em] font-mono uppercase transition-all duration-300 relative overflow-hidden rounded-none border ${
                    downloadSuccess 
                      ? 'bg-emerald-50/50 text-emerald-800 border-emerald-300' 
                      : 'bg-black text-[#f5f4ed] border-black hover:bg-black/90'
                  }`}
                >
                  {/* Progress loading bar */}
                  {downloading && (
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-white/20 transition-all duration-100 ease-out z-0" 
                      style={{ width: `${downloadProgress}%` }}
                    />
                  )}
                  <span className="relative z-10">
                    {downloading 
                      ? `PREPARING DOCUMENT... ${downloadProgress}%` 
                      : downloadSuccess 
                        ? 'DOWNLOAD COMPLETE' 
                        : 'DOWNLOAD BLUEPRINTS'
                    }
                  </span>
                </button>
              </div>
            </div>
            <span className="text-[8px] font-mono text-black/30">PAGE 5</span>
          </div>
        );
      case 7: // Spread 3 Right: Back Cover
        return (
          <div className="w-full h-full bg-[#f2efe6] flex flex-col justify-between p-12 text-center items-center shadow-inner relative">
            <div className="my-auto space-y-4 opacity-35 flex flex-col items-center">
              <div className="w-8 h-[1px] bg-black/40" />
              <span className="text-xl font-serif tracking-[0.3em] uppercase font-light text-black">
                VERTICE
              </span>
              <span className="text-[7px] font-mono tracking-widest text-black">ALL RIGHTS RESERVED MMXXVI</span>
              <div className="w-8 h-[1px] bg-black/40" />
            </div>
            <span className="text-[8px] font-mono text-black/30 self-end">END FOLIO</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Download Trigger timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (downloading) {
      interval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setDownloading(false);
            setDownloadSuccess(true);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [downloading]);

  // Flip execution function
  const triggerFlip = (nextSpread: number, dir: number) => {
    if (isFlipping) return;
    setDirection(dir);
    setTargetSpread(nextSpread);
    setIsFlipping(true);
    setIsPastHalfway(false);

    // Halfway check (400ms) - switch content at peak 90deg vertical state
    setTimeout(() => {
      setIsPastHalfway(true);
    }, 400);

    // Completion check (800ms) - settle flat and clear state
    setTimeout(() => {
      setCurrentSpread(nextSpread);
      setIsFlipping(false);
      setIsPastHalfway(false);
    }, 800);
  };

  const handleNext = () => {
    if (currentSpread < spreads.length - 1) {
      triggerFlip(currentSpread + 1, 1);
    }
  };

  const handlePrev = () => {
    if (currentSpread > 0) {
      triggerFlip(currentSpread - 1, -1);
    }
  };

  const currentLeftPage = spreads[currentSpread].leftIdx;
  const currentRightPage = spreads[currentSpread].rightIdx;

  const targetLeftPage = spreads[targetSpread].leftIdx;
  const targetRightPage = spreads[targetSpread].rightIdx;

  return (
    <main className="bg-[#f5f4ed] text-black min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Dynamic Background sketch watermark */}
      <div 
        className="absolute right-[-10%] top-[-5%] w-[45%] aspect-square pointer-events-none select-none opacity-[0.05] mix-blend-multiply"
        style={{
          WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 95%)',
          maskImage: 'radial-gradient(circle, black 35%, transparent 95%)'
        }}
      >
        <Image 
          src="/images/sketches/sketch-6.png"
          alt="Brochure Page Watermark"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10 flex flex-col min-h-[calc(100vh-14rem)] justify-between">
        
        {/* Editorial Heading */}
        <div className="max-w-xl mb-8">
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-black/40 block mb-3">
            [ 02 / PRINT FOLIO ]
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-black leading-[1.2]">
            Digital brochure & <span className="italic font-normal text-black/60">specifications</span>.
          </h1>
        </div>

        {/* BOOK CONTAINER WITH 3D PERSPECTIVE */}
        <div className="flex-grow flex items-center justify-center py-6">
          <div 
            className="relative w-full max-w-5xl aspect-[2/1] bg-transparent flex items-stretch select-none min-h-[500px]"
            style={{ perspective: '1600px' }} // Critical for 3D page flip depth
          >
            {/* The Book Board Shadow Underneath */}
            <div className="absolute inset-0 bg-black/10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.15)] rounded-none z-0 pointer-events-none border border-black/5" />

            {/* Left Page Crease Crevice Shadow */}
            <div className="absolute top-0 bottom-0 left-1/2 -ml-[40px] w-[40px] bg-gradient-to-r from-transparent to-black/[0.04] z-30 pointer-events-none" />
            
            {/* Right Page Crease Crevice Shadow */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[40px] bg-gradient-to-l from-transparent to-black/[0.04] z-30 pointer-events-none" />

            {/* Central Book Spine metal/card binder line */}
            <div className="absolute top-0 bottom-0 left-1/2 -ml-[1px] w-[2px] bg-black/15 z-35 pointer-events-none" />

            {/* STATIC LEFT BACKGROUND PAGE */}
            <div className="w-1/2 bg-[#ece9de] h-full overflow-hidden border-r border-black/5 relative z-10">
              {/* Spine edge fold shading */}
              <div className="absolute top-0 bottom-0 right-0 w-[15px] bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
              
              {isFlipping 
                ? renderPage(targetLeftPage) 
                : renderPage(currentLeftPage)
              }
            </div>

            {/* STATIC RIGHT BACKGROUND PAGE */}
            <div className="w-1/2 bg-[#ece9de] h-full overflow-hidden relative z-10">
              {/* Spine edge fold shading */}
              <div className="absolute top-0 bottom-0 left-0 w-[15px] bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
              
              {isFlipping 
                ? renderPage(targetRightPage) 
                : renderPage(currentRightPage)
              }
            </div>

            {/* DYNAMIC TURNING PAGE (ACTIVE ONLY DURING FLIP ANIMATION) */}
            {isFlipping && (
              <motion.div
                initial={{ rotateY: direction > 0 ? 0 : -180 }}
                animate={{ rotateY: direction > 0 ? -180 : 0 }}
                transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: '50%',
                  left: direction > 0 ? '50%' : '0%', // Starts on right when going next, left when going prev
                  transformOrigin: direction > 0 ? 'left center' : 'right center', // Folds around spine
                  transformStyle: 'preserve-3d',
                  zIndex: 40,
                  backfaceVisibility: 'hidden',
                  pointerEvents: 'none'
                }}
                className="bg-[#ece9de] shadow-[0_15px_30px_rgba(0,0,0,0.1)] relative"
              >
                {/* Crease fold shading specifically on the moving sheet */}
                <div 
                  className={`absolute top-0 bottom-0 w-[20px] bg-gradient-to-r from-black/10 to-transparent pointer-events-none ${
                    direction > 0 ? 'left-0' : 'right-0 rotate-180'
                  }`} 
                />

                {/* Light Page Curl shadow that animates with rotation */}
                <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />

                {/* Flip content container. We scaleX(-1) if past 90 degrees so text is un-mirrored */}
                <div 
                  className="w-full h-full"
                  style={{
                    transform: isPastHalfway ? 'scaleX(-1)' : 'none',
                  }}
                >
                  {direction > 0 ? (
                    // Next Spread: Starts on right with currentRight, turns to show targetLeft on the back
                    isPastHalfway ? renderPage(targetLeftPage) : renderPage(currentRightPage)
                  ) : (
                    // Prev Spread: Starts on left with currentLeft, turns to show targetRight on the back
                    isPastHalfway ? renderPage(targetRightPage) : renderPage(currentLeftPage)
                  )}
                </div>
              </motion.div>
            )}

            {/* Left Hand Navigation Control */}
            {currentSpread > 0 && !isFlipping && (
              <button 
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 bg-[#f5f4ed]/90 border border-black/10 w-12 h-12 rounded-full flex items-center justify-center hover:bg-black hover:text-[#f5f4ed] hover:scale-105 transition-all duration-300 pointer-events-auto shadow-md"
                aria-label="Previous Page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Right Hand Navigation Control */}
            {currentSpread < spreads.length - 1 && !isFlipping && (
              <button 
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 bg-[#f5f4ed]/90 border border-black/10 w-12 h-12 rounded-full flex items-center justify-center hover:bg-black hover:text-[#f5f4ed] hover:scale-105 transition-all duration-300 pointer-events-auto shadow-md"
                aria-label="Next Page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Footer controls */}
        <div className="mt-6 pt-6 border-t border-black/10 flex justify-between items-center z-10">
          <Link 
            href="/"
            className="group flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-black font-semibold"
          >
            <svg 
              className="w-4 h-4 transform group-hover:-translate-x-1.5 transition-transform duration-500 text-black/40 group-hover:text-black" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to Residence Overview</span>
          </Link>
          <div className="flex gap-4 items-center">
            <span className="text-[10px] font-mono text-black/45 tracking-widest">
              SPREAD {currentSpread + 1} OF {spreads.length}
            </span>
          </div>
          <span className="text-[9px] font-mono text-black/30">VERTICE RESIDENCES ©2026</span>
        </div>

      </div>
    </main>
  );
}
