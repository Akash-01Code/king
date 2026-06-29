import { CinematicScroll } from '@/components/animations/CinematicScroll';

export default function Home() {
  // Example Configuration
  const sequences = [
    // Provide a placeholder path or an actual public path.
    // e.g., { folderPath: '/F1', frameCount: 121, prefix: 'ezgif-frame-' }
    // You MUST place your extracted frames inside the /public directory.
  ];

  const sections = [
    {
      title: "Your First Section Title",
      subtitle: "Optional Subtitle",
      cta: "Explore Now",
      href: "#explore",
      color: "text-white"
    },
    {
      title: "Your Second Section Title",
      color: "text-white"
    }
  ];

  // Map progress (0 to 1) to section index.
  // E.g., [start_fade_in_0, hold_0, fade_out_0_start, start_fade_in_1, hold_1, fade_out_1]
  const scrollBreakpoints = [0, 0.4, 0.45, 0.55, 0.9, 1];

  return (
    <main className="bg-black text-white relative min-h-screen">
      {/* 
        Uncomment when sequences are provided:
        <CinematicScroll 
          sequences={sequences} 
          sections={sections} 
          scrollBreakpoints={scrollBreakpoints}
          heightClass="h-[1000vh]"
        /> 
      */}
      
      {/* Placeholder content since sequences are empty */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-widest uppercase">Master Template</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Add your image sequences to the <code className="text-white">public</code> folder and configure the <code className="text-white">CinematicScroll</code> component in <code className="text-white">src/app/page.tsx</code> to see the scroll animation.
        </p>
      </div>
      
      {/* Add your other sections here */}
      <section id="explore" className="h-screen flex items-center justify-center bg-zinc-950">
        <h2 className="text-2xl md:text-4xl uppercase tracking-widest">Normal Scrolling Section</h2>
      </section>
    </main>
  );
}
