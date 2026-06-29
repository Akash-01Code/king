'use client';

import { useState } from 'react';
import { CinematicScroll } from '@/components/animations/CinematicScroll';
import Image from 'next/image';

export default function Home() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Define our 5 frame sequences from the public folders
  const sequences = [
    { folderPath: '/sequences/f1', frameCount: 80, prefix: 'ezgif-frame-', extension: '.jpg' },
    { folderPath: '/sequences/f1.2', frameCount: 64, prefix: 'ezgif-frame-', extension: '.jpg' },
    { folderPath: '/sequences/f2', frameCount: 64, prefix: 'ezgif-frame-', extension: '.jpg' },
    { folderPath: '/sequences/f3', frameCount: 40, prefix: 'ezgif-frame-', extension: '.jpg' },
    { folderPath: '/sequences/f4', frameCount: 40, prefix: 'ezgif-frame-', extension: '.jpg' }
  ];

  // Luxury real estate overlay texts
  const sections = [
    {
      title: "A New Standard of Living",
      subtitle: "Vertice Residences",
      cta: "Explore Design",
      href: "#overview",
      color: "text-white"
    },
    {
      title: "Designed to Frame the Horizon",
      subtitle: "Unrivaled Views",
      color: "text-white"
    },
    {
      title: "Every Detail Meticulously Crafted",
      subtitle: "Bespoke Materials",
      color: "text-white"
    },
    {
      title: "Where Nature Meets Modernity",
      subtitle: "Harmonious Sanctuary",
      cta: "View Collection",
      href: "#gallery",
      color: "text-white"
    }
  ];

  const scrollBreakpoints = [
    0.05, 0.25,  // Section 0 visible
    0.30, 0.50,  // Section 1 visible
    0.55, 0.72,  // Section 2 visible
    0.77, 0.95   // Section 3 visible
  ];

  // The 6 original premium card components matching the user's screenshot layout
  const cardData = [
    {
      index: "01",
      category: "PROPERTY DIRECTORY",
      title: "Curated Estates",
      description: "Explore our collection of handpicked architectural marvels across the world's most desirable locations.",
      pillText: "ELITE",
      sketchImage: "/images/sketches/sketch-1.png",
      coords: "43.76° N, 11.25° E",
      icon: (
        <svg className="w-3.5 h-3.5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      index: "02",
      category: "LOCATION METRIC",
      title: "Panoramic Vistas",
      description: "Every residence is situated to optimize natural lighting, cross-ventilation, and commanding panoramic vistas.",
      pillText: "VISTA",
      sketchImage: "/images/sketches/sketch-2.png",
      coords: "34.05° N, 118.24° W",
      icon: (
        <svg className="w-3.5 h-3.5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V8a2 2 0 012-2h.068M10.485 20.607A9 9 0 1120.9 10.582M17 16a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      index: "03",
      category: "GEOMETRIC LINES",
      title: "Sartorial Structure",
      description: "A blending of modern minimalism and structural expressionism designed by award-winning architects.",
      pillText: "DESIGN",
      sketchImage: "/images/sketches/sketch-3.png",
      coords: "48.85° N, 2.35° E",
      icon: (
        <svg className="w-3.5 h-3.5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M4 5a1 1 0 01.757-.975l8-2a1 1 0 011.243.975v17.5a1 1 0 01-1.243.975l-8-2A1 1 0 014 18.5V5z" />
        </svg>
      )
    },
    {
      index: "04",
      category: "ATELIER FINISH",
      title: "Bespoke Elements",
      description: "From hand-selected Italian marble to custom oak millwork, every material is chosen for longevity and beauty.",
      pillText: "CRAFT",
      sketchImage: "/images/sketches/sketch-4.png",
      coords: "40.71° N, 74.00° W",
      icon: (
        <svg className="w-3.5 h-3.5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      index: "05",
      category: "SMART INTEGRATION",
      title: "Invisible Systems",
      description: "Seamless automation of lighting, climate, security, and entertainment systems integrated into the structure.",
      pillText: "INTELLIGENT",
      sketchImage: "/images/sketches/sketch-5.png",
      coords: "37.77° N, 122.41° W",
      icon: (
        <svg className="w-3.5 h-3.5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      index: "06",
      category: "CONCIERGE SANCTUARY",
      title: "Private Retreat",
      description: "Infinite pools, wellness pavilions, custom wine cellars, and concierge services tailored to your lifestyle.",
      pillText: "LIVING",
      sketchImage: "/images/sketches/sketch-7.png",
      coords: "1.35° N, 103.81° E",
      icon: (
        <svg className="w-3.5 h-3.5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <main className="bg-black relative min-h-screen">
      {/* Cinematic scrubbing sequence */}
      <CinematicScroll 
        sequences={sequences} 
        sections={sections} 
        scrollBreakpoints={scrollBreakpoints}
        heightClass="h-[1000vh]"
      />
      
      {/* 
        The Atelier Section: Awwwards-style editorial split screen.
        Contains a large background sketch watermark (sketch-1.png) on the bottom-right,
        blending into the warm #f5f4ed background.
      */}
      <section id="atelier" className="bg-[#f5f4ed] text-black pt-32 pb-24 relative overflow-hidden">
        {/* Top 1px Divider */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/10 mx-8 md:mx-16" />

        {/* Large Scale Background Sketch Watermark (Multiply Blend + Radial Gradient Fade) */}
        <div 
          className="absolute right-[-10%] bottom-[-15%] w-[55%] aspect-square pointer-events-none select-none opacity-[0.09] mix-blend-multiply"
          style={{
            WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 95%)',
            maskImage: 'radial-gradient(circle, black 40%, transparent 95%)'
          }}
        >
          <Image 
            src="/images/sketches/sketch-1.png"
            alt="Background Sketch Watermark"
            fill
            sizes="50vw"
            className="object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
          
          {/* Left Column: Headline and Paragraph */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-black/40">
              [ 02 / THE ATELIER ]
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight leading-[1.1] text-black">
              Form, material, and <span className="italic font-normal text-black/60">silence</span> unified.
            </h2>
            <div className="w-24 h-[1px] bg-black/15" />
            <p className="text-sm md:text-base text-black/60 font-light leading-relaxed max-w-xl">
              We believe in architecture that respects the topography of its context. Every structure is engineered to engage with the natural elements—directing soft daylight, embracing natural cross-ventilation, and shaping spaces of deep tranquility. Vertice stands not to compete with the landscape, but to frame it.
            </p>
            <div className="pt-4 flex gap-8 items-center text-[10px] font-mono text-black/40">
              <div>
                <p className="text-black/70">ARCHITECT</p>
                <p>K. VANDERBILT</p>
              </div>
              <div className="w-[1px] h-8 bg-black/10" />
              <div>
                <p className="text-black/70">ESTABLISHED</p>
                <p>MMXXVI</p>
              </div>
              <div className="w-[1px] h-8 bg-black/10" />
              <div>
                <p className="text-black/70">LOCATION</p>
                <p>FLORENCE, IT</p>
              </div>
            </div>
          </div>

          {/* Right Column: Generated Luxury Architectural Image */}
          <div className="lg:col-span-5 flex items-center">
            <div className="relative w-full aspect-[3/4] group">
              <Image 
                src="/images/02_image.png" 
                alt="Minimalist Luxury Architectural Residence"
                fill
                sizes="(max-w-768px) 100vw, 40vw"
                className="object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 
        Overview / Cards Section.
        Utilizes warm #f5f4ed backdrop, dynamic internal divider lines (no outer borders),
        and large-scale background watermarks.
      */}
      <section id="overview" className="bg-[#f5f4ed] py-24 pb-36 text-black relative overflow-hidden">
        {/* Horizontal Line Divider */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/10 mx-8 md:mx-16" />

        {/* Large Scale Background Sketch Watermarks (Multiply Blend + Radial Gradient Fade) */}
        <div 
          className="absolute left-[-10%] top-[10%] w-[50%] aspect-square pointer-events-none select-none opacity-[0.08] mix-blend-multiply"
          style={{
            WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 95%)',
            maskImage: 'radial-gradient(circle, black 40%, transparent 95%)'
          }}
        >
          <Image 
            src="/images/sketches/sketch-3.png"
            alt="Left Background Sketch"
            fill
            sizes="50vw"
            className="object-contain"
          />
        </div>
        <div 
          className="absolute right-[-10%] bottom-[-10%] w-[50%] aspect-square pointer-events-none select-none opacity-[0.08] mix-blend-multiply"
          style={{
            WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 95%)',
            maskImage: 'radial-gradient(circle, black 40%, transparent 95%)'
          }}
        >
          <Image 
            src="/images/sketches/sketch-6.png"
            alt="Right Background Sketch"
            fill
            sizes="50vw"
            className="object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-24 space-y-6">
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-black/40">
              [ 03 / SYSTEM COMPONENTS ]
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-black leading-[1.2]">
              Building blocks for the way you <span className="italic font-normal text-black/70">actually live</span>.
            </h2>
          </div>

          {/* 
            Grid Layout with Internal Borders only.
            gap-0 allows cells to touch flush and form seamless divider lines.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {cardData.map((card, index) => {
              // Construct internal-only borders dynamically to avoid outer grid boundaries
              let borderClasses = "border-[#dcdad3] ";
              
              // Mobile (1 column): bottom border on all except the last item
              borderClasses += index === 5 ? "border-b-0" : "border-b";
              
              // Tablet (2 columns): right border on even indices, bottom border on first 4 items
              borderClasses += index % 2 === 0 ? " md:border-r" : " md:border-r-0";
              borderClasses += index < 4 ? " md:border-b" : " md:border-b-0";

              // Desktop (3 columns): right border on first two columns, bottom border on first row
              borderClasses += (index % 3 !== 2) ? " lg:border-r" : " lg:border-r-0";
              borderClasses += index < 3 ? " lg:border-b" : " lg:border-b-0";

              return (
                <div 
                  key={index} 
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`bg-transparent p-10 flex flex-col justify-between min-h-[350px] relative overflow-hidden rounded-none transition-all duration-700 ${borderClasses}`}
                >
                  {/* Faint building sketch watermark in the card background */}
                  <div 
                    className={`absolute right-[-10%] bottom-[-10%] w-[65%] aspect-square pointer-events-none select-none mix-blend-multiply transition-all duration-1000 ${
                      activeCard === index ? 'opacity-[0.14] scale-105 rotate-2' : 'opacity-[0.05] scale-100 rotate-0'
                    }`}
                    style={{
                      WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 95%)',
                      maskImage: 'radial-gradient(circle, black 35%, transparent 95%)'
                    }}
                  >
                    <Image 
                      src={card.sketchImage}
                      alt="Card Background Sketch Watermark"
                      fill
                      sizes="20vw"
                      className="object-contain"
                    />
                  </div>

                  {/* Top card metadata */}
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {card.icon}
                        <span className="text-[9px] tracking-[0.2em] font-semibold text-black/40 uppercase font-mono">
                          {card.category}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-black/30">[{card.index}]</span>
                    </div>

                    <div className="w-full h-[1px] bg-black/5" />

                    <h3 className="text-2xl font-serif font-light text-black tracking-wide leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs md:text-sm text-black/50 font-light leading-relaxed max-w-[260px]">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom details: Unified blended tag pill & coordinates */}
                  <div className="relative z-10 pt-8 mt-auto flex items-center justify-between border-t border-black/5">
                    <span className="text-[9px] tracking-[0.25em] font-semibold border border-black/15 text-black/60 bg-transparent px-3.5 py-1.5 rounded-full uppercase font-mono">
                      {card.pillText}
                    </span>
                    <span className="text-[8px] font-mono text-black/30 tracking-widest">{card.coords}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 
        Footer Inquiries section.
        Contains the giant blended background watermark (last-section.png) on the left side,
        blending beautifully with mix-blend-multiply and a radial fade.
      */}
      <section id="inquire" className="bg-[#f0eee5] py-28 text-black border-t border-black/10 relative overflow-hidden">
        
        {/* 
          [UPDATED] Giant Background Sketch Watermark on the Left Side.
          Sized to cover a massive portion of the left side background, blending organically.
        */}
        <div 
          className="absolute left-[-15%] -top-[20%] w-[75%] h-[140%] pointer-events-none select-none opacity-[0.08] mix-blend-multiply z-0"
          style={{
            WebkitMaskImage: 'radial-gradient(circle at 40% 50%, black 45%, transparent 95%)',
            maskImage: 'radial-gradient(circle at 40% 50%, black 45%, transparent 95%)'
          }}
        >
          <Image 
            src="/images/last-section.png"
            alt="Giant Left Background Sketch Watermark"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
          
          {/* Left Column: Responsive layout spacer to allow the background watermark to be visible */}
          <div className="lg:col-span-5 h-[250px] lg:h-auto pointer-events-none" />

          {/* Right Column: Inquiries content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8 lg:pl-10">
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-black/45">
              [ 04 / CONCIERGE DIRECT ]
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight leading-[1.1] text-black">
              Begin Your Private Journey
            </h2>
            <div className="w-20 h-[1px] bg-black/15" />
            <p className="text-xs md:text-sm text-black/50 font-light leading-relaxed max-w-lg">
              Register your interest to receive private viewings, structural blueprint documentation, and early access to our limited luxury residences.
            </p>
            <div className="pt-4">
              <a 
                href="mailto:concierge@vertice.com" 
                className="inline-block bg-black text-[#f5f4ed] text-[9px] tracking-[0.3em] uppercase px-12 py-5 rounded-full hover:bg-black/90 transition-all duration-300 font-medium tracking-widest pointer-events-auto border border-black hover:border-black/90"
              >
                Contact Concierge
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
