'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const [times, setTimes] = useState({
    zurich: '00:00:00',
    newYork: '00:00:00',
    tokyo: '00:00:00',
    sydney: '00:00:00'
  });

  useEffect(() => {
    const updateClocks = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      
      const now = new Date();
      setTimes({
        zurich: now.toLocaleTimeString('en-US', { ...options, timeZone: 'Europe/Zurich' }),
        newYork: now.toLocaleTimeString('en-US', { ...options, timeZone: 'America/New_York' }),
        tokyo: now.toLocaleTimeString('en-US', { ...options, timeZone: 'Asia/Tokyo' }),
        sydney: now.toLocaleTimeString('en-US', { ...options, timeZone: 'Australia/Sydney' })
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#f5f4ed] text-black pt-24 pb-72 relative overflow-hidden border-t border-black/10 select-none z-10 w-full flex-shrink-0">
      
      {/* Background Mountain/Pines Landscape Sketch */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 mix-blend-multiply opacity-15">
        <Image 
          src="/images/Footer_image.png"
          alt="Landscape Sketch Background"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          priority
        />
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Side: Brand, Description, Timezones */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Logo & Description */}
          <div className="space-y-6 max-w-xl">
            <div className="flex items-center gap-4">
              <span className="text-xl font-serif tracking-[0.2em] uppercase font-light">
                VERTICE
              </span>
              <div className="w-[1px] h-6 bg-black/15" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-black/40 pt-1">
                MONOLITH
              </span>
            </div>
            <p className="text-xs text-black/50 font-light leading-relaxed max-w-lg">
              Bespoke residential monoliths designed to frame natural topographies and direct natural lighting. An independent architectural, structural, and somatic research project in Florence, Italy.
            </p>
          </div>

          {/* Timezone Clocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 max-w-lg">
            <div>
              <p className="text-xs font-mono font-medium tracking-wider tabular-nums">{times.zurich}</p>
              <p className="text-[9px] font-mono text-black/45 tracking-widest uppercase">ZÜRICH</p>
              <p className="text-[8px] font-mono text-black/30 tracking-widest uppercase">EUROPE</p>
            </div>
            <div>
              <p className="text-xs font-mono font-medium tracking-wider tabular-nums">{times.newYork}</p>
              <p className="text-[9px] font-mono text-black/45 tracking-widest uppercase">NEW YORK</p>
              <p className="text-[8px] font-mono text-black/30 tracking-widest uppercase">N. AMERICA</p>
            </div>
            <div>
              <p className="text-xs font-mono font-medium tracking-wider tabular-nums">{times.tokyo}</p>
              <p className="text-[9px] font-mono text-black/45 tracking-widest uppercase">TOKYO</p>
              <p className="text-[8px] font-mono text-black/30 tracking-widest uppercase">ASIA</p>
            </div>
            <div>
              <p className="text-xs font-mono font-medium tracking-wider tabular-nums">{times.sydney}</p>
              <p className="text-[9px] font-mono text-black/45 tracking-widest uppercase">SYDNEY</p>
              <p className="text-[8px] font-mono text-black/30 tracking-widest uppercase">OCEANIA</p>
            </div>
          </div>

        </div>

        {/* Right Side: Columns of links */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:pl-10">
          
          {/* Column 1: Navigation */}
          <div className="space-y-6">
            <span className="text-[9px] font-mono tracking-[0.25em] text-black/40 uppercase block">
              PRODUCT
            </span>
            <ul className="space-y-4">
              <li>
                <Link href="/#overview" className="text-xs text-black/60 hover:text-black transition-colors duration-300 font-light">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/#atelier" className="text-xs text-black/60 hover:text-black transition-colors duration-300 font-light">
                  Atelier
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="text-xs text-black/60 hover:text-black transition-colors duration-300 font-light">
                  Amenities
                </Link>
              </li>
              <li>
                <Link href="/brochure" className="text-xs text-black/60 hover:text-black transition-colors duration-300 font-light">
                  Brochure
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal / Info */}
          <div className="space-y-6">
            <span className="text-[9px] font-mono tracking-[0.25em] text-black/40 uppercase block">
              LEGAL
            </span>
            <ul className="space-y-4">
              <li>
                <a href="mailto:concierge@vertice.com" className="text-xs text-black/60 hover:text-black transition-colors duration-300 font-light">
                  Concierge Direct
                </a>
              </li>
              <li>
                <Link href="#" className="text-xs text-black/60 hover:text-black transition-colors duration-300 font-light">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-xs text-black/60 hover:text-black transition-colors duration-300 font-light">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-xs text-black/60 hover:text-black transition-colors duration-300 font-light">
                  Blueprint License
                </Link>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Horizontal Divider Line */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 my-16 relative z-10">
        <div className="w-full h-[1px] bg-black/10" />
      </div>

      {/* Footer Metadata & Sub-disclaimer */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10 space-y-6">
        
        {/* Monospace Metadata Row */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-[9px] font-mono text-black/55 tracking-wider uppercase items-center">
          <span>© 2026 VERTICE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-black/15 hidden sm:inline" />
          <span>VERTICE.COM</span>
          <span className="w-1.5 h-1.5 rounded-full bg-black/15 hidden sm:inline" />
          <a href="mailto:concierge@vertice.com" className="hover:text-black transition-colors duration-300">
            CONCIERGE@VERTICE.COM
          </a>
          <span className="w-1.5 h-1.5 rounded-full bg-black/15 hidden sm:inline" />
          <span>BUILT IN FLORENCE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-black/15 hidden sm:inline" />
          <span className="flex items-center">
            {/* Green Pulsing Dot */}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>

        {/* Small disclaimer copy */}
        <p className="text-[9px] text-black/35 font-light leading-relaxed max-w-2xl">
          Vertice is a registered trademark of Vertice Residences, Inc. Architectural details, layouts, and specifications shown are conceptual renderings based on initial design drafts and are subject to final municipal approvals and terrain adjustments.
        </p>

      </div>

      {/* Small branding emblem in the bottom left corner */}
      <div className="absolute bottom-6 left-8 md:left-16 pointer-events-none opacity-20 z-10">
        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

    </footer>
  );
}
