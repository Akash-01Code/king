'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface AmenityItem {
  id: string;
  index: string;
  category: string;
  title: string;
  description: string;
  sketchPath: string;
  bgOpacity: string;
  specs: string[];
}

const amenitiesData: AmenityItem[] = [
  {
    id: 'spa',
    index: '01',
    category: 'WELLNESS & RESTORATION',
    title: 'The Thermal Sanctuary',
    description: 'A subterranean retreat featuring salt-inhalation rooms, dry sauna chambers carved from alpine cedar, and deep-plunge pools engineered for cellular restoration.',
    sketchPath: '/images/sketches/sketch-4.png',
    bgOpacity: 'opacity-[0.14]',
    specs: ['Cedarwood Dry Sauna', 'Himalayan Salt Room', 'Cold Plunge (8°C)', 'Private Massage Pavilions']
  },
  {
    id: 'pool',
    index: '02',
    category: 'HYDRO DYNAMICS',
    title: 'Horizon Infinity Pool',
    description: 'A 50-meter suspended thermal pool designed to blend with the natural horizon line, giving the sensation of swimming directly into the skies.',
    sketchPath: '/images/sketches/sketch-2.png',
    bgOpacity: 'opacity-[0.12]',
    specs: ['50m Heated Lap Pool', 'Ozone Water Filtration', 'Floating Sun Loungers', 'Cabana Butler Service']
  },
  {
    id: 'cellar',
    index: '03',
    category: 'SOMMELIER ARCHIVE',
    title: 'The Vaulted Cave',
    description: 'A subterranean stone cellar maintaining perfect climate metrics for aging. Accommodates curated collections with tasting tables carved from single volcanic stones.',
    sketchPath: '/images/sketches/sketch-5.png',
    bgOpacity: 'opacity-[0.13]',
    specs: ['Climate-controlled (12°C)', 'Custom Oak Racks', 'Private Sommelier Dinners', '10,000 Bottle Capacity']
  },
  {
    id: 'heliport',
    index: '04',
    category: 'AERO TRANSPORT',
    title: 'Sky Helipad & Lounge',
    description: 'A privately registered rooftop heliport designed for seamless arrivals and departures, connected directly to a double-height panoramic sky lounge.',
    sketchPath: '/images/sketches/sketch-8.png',
    bgOpacity: 'opacity-[0.11]',
    specs: ['FAA Approved Helipad', 'Pre-flight Soundproof Lounge', 'Direct Private Elevator', 'Custom Customs Checkpoint']
  }
];

export default function Amenities() {
  return (
    <main className="bg-[#f5f4ed] text-black min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Decorative background grid line watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] grid grid-cols-4 md:grid-cols-8 gap-0">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="border-r border-black h-full" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        {/* Editorial Heading */}
        <div className="max-w-4xl mb-24 space-y-6">
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-black/40 block">
            [ 01 / THE CONCIERGE PLATFORM ]
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-black leading-[1.1]">
            Elevated living, <span className="italic font-normal text-black/60">choreographed</span> down to the smallest detail.
          </h1>
          <div className="w-24 h-[1px] bg-black/15 my-8" />
          <p className="text-sm md:text-base text-black/55 font-light leading-relaxed max-w-xl">
            Vertice is equipped with private amenities curated for wellness, aviation, and culinary arts. Every service is operated under strict privacy protocols to ensure an uninterrupted lifestyle sanctuary.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {amenitiesData.map((item, index) => (
            <AmenityCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Back to Home CTA */}
        <div className="mt-24 pt-12 border-t border-black/10 flex justify-between items-center">
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
          <span className="text-[9px] font-mono text-black/30">VERTICE RESIDENCES ©2026</span>
        </div>
      </div>
    </main>
  );
}

function AmenityCard({ item, index }: { item: AmenityItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Normalize coordinates from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#f2efe6] p-8 md:p-12 relative overflow-hidden min-h-[480px] flex flex-col justify-between group cursor-none"
    >
      {/* CLASSIC ANIMATION 1: SVG Path Drawing around the card border when in view */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <motion.rect
          width="100%"
          height="100%"
          fill="none"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: index * 0.15 }}
        />
      </svg>

      {/* CLASSIC ANIMATION 2: Parallax image shift & scale in card background */}
      <div 
        className={`absolute right-[-5%] bottom-[-5%] w-[70%] aspect-square pointer-events-none select-none mix-blend-multiply transition-all duration-700 ease-out ${item.bgOpacity}`}
        style={{
          transform: `translate(${mousePos.x * 24}px, ${mousePos.y * 24}px) scale(1.1)`,
          WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 95%)',
          maskImage: 'radial-gradient(circle, black 35%, transparent 95%)'
        }}
      >
        <Image 
          src={item.sketchPath}
          alt={item.title}
          fill
          sizes="30vw"
          className="object-contain"
        />
      </div>

      {/* Card Header */}
      <div className="relative z-10 space-y-4">
        <div className="flex justify-between items-center text-[9px] font-mono text-black/40">
          <span className="tracking-[0.2em] font-semibold">{item.category}</span>
          <span>[{item.index}]</span>
        </div>
        <div className="w-full h-[1px] bg-black/5" />
      </div>

      {/* Card Content with scroll reveal */}
      <div className="relative z-10 my-auto py-8 space-y-6">
        <h3 className="text-3xl font-serif font-light text-black tracking-wide leading-tight max-w-[280px]">
          {item.title}
        </h3>
        <p className="text-xs md:text-sm text-black/50 font-light leading-relaxed max-w-[320px]">
          {item.description}
        </p>
      </div>

      {/* Card Footer: Detailed specifications that expand/reveal on hover */}
      <div className="relative z-10 pt-6 border-t border-black/5">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[9px] font-mono text-black/30">
          {item.specs.map((spec, sIdx) => (
            <span key={sIdx} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-black/20" />
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
