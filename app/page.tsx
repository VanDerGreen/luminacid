"use client";

import AppCarousel from "./components/AppCarousel";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden px-6 pt-24 bg-[#050505]">
      
      {/* ALCHEMICAL AMBIENCE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Core Cyan Pulse */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[90%] h-[70%] bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.12)_0%,_transparent_70%)] blur-[100px] animate-pulse" />
        
        {/* MAGENTA INFUSION - High-energy warmth */}
        <div className="absolute bottom-[15%] right-[-5%] w-[50%] h-[50%] bg-magenta-600/10 blur-[130px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        
        {/* Floating "Ether" Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] rounded-full bg-cyan-400/40 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-7xl w-full">
        
        {/* Status Badge */}
        <div className="mb-10 group">
          <div className="liquid-glass px-6 py-2 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-cyan-100/50 group-hover:text-cyan-400 transition-colors">
              Neural Handshake Active
            </span>
          </div>
        </div>

        {/* --- THE TITANIC TITLE --- */}
        <div className="relative mb-8 w-full flex justify-center overflow-visible">
          <div className="relative">
            <h1 className="title-alchemy text-[clamp(3.5rem,15vw,11rem)] leading-[0.8] italic pr-2">
              LUMINACID
            </h1>
            
            {/* Deep Alchemist Reflection */}
            <h1 className="absolute top-[95%] left-0 w-full text-[clamp(3.5rem,15vw,11rem)] leading-[0.8] italic opacity-[0.07] blur-2xl scale-y-[-0.7] origin-top select-none pointer-events-none translate-x-[-0.02em]">
              LUMINACID
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-white/30 text-sm sm:text-base md:text-lg font-light tracking-[0.6em] uppercase mt-4 mb-12 pl-[0.6em]">
          Where thought becomes <span className="text-white/80 font-medium">Light</span>
        </p>

        {/* Main Interface Artifact (Carousel) - NOW ABOVE BUTTONS */}
        <div className="w-full relative group mb-16">
          <div className="absolute -inset-10 bg-cyan-500/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          <AppCarousel />
        </div>

        {/* Action Sigils - NOW AT THE BOTTOM */}
        <div className="flex flex-wrap justify-center gap-8 mb-32 z-20">
          <a
            href="/apps"
            className="liquid-glass px-12 py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:text-white hover:scale-105 transition-all shadow-[0_0_40px_rgba(0,255,255,0.1)]"
          >
            Summon Apps
          </a>

          <a
            href="/blog"
            className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all hover:bg-white/5 rounded-full"
          >
            The Grimoire
          </a>
        </div>

      </div>

      {/* Persistent Bottom Magenta-Cyan Glow */}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-purple-900/15 via-cyan-900/5 to-transparent z-0 pointer-events-none"></div>
    </main>
  );
}
