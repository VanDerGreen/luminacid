"use client";

import { apps } from "../../data/apps";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function AppCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % apps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <div className="h-[40rem] w-full bg-black" />;

  const getVisibleApps = () => {
    const result = [];
    for (let i = -2; i <= 2; i++) {
      const idx = (currentIndex + i + apps.length) % apps.length;
      result.push({ ...apps[idx], offset: i });
    }
    return result;
  };

  const visibleApps = getVisibleApps();

  return (
    <div
      ref={containerRef}
      className="relative w-full flex justify-center items-center overflow-hidden h-[34rem] sm:h-[40rem] md:h-[44rem] perspective-1200"
    >
      {visibleApps.map((app) => {
        const { offset } = app;
        const absOffset = Math.abs(offset);

        // Responsive positioning logic
        // Increased multiplier slightly to prevent card overlap
        const xOffset = offset * 120; 
        const zOffset = absOffset === 0 ? 0 : -250 * absOffset;
        const rotation = offset * -20; 

        const scale = absOffset === 0 ? 1 : absOffset === 1 ? 0.75 : 0.5;
        const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.6 : 0.15;
        const zIndex = 50 - absOffset;

        return (
          <Link
            key={`${app.slug}-${offset}`}
            href={`/apps/${app.slug}`}
            className="absolute transition-all duration-[1100ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center"
            style={{
              transform: `translateX(calc(-50% + ${xOffset}%)) translateZ(${zOffset}px) rotateY(${rotation}deg) scale(${scale})`,
              left: '50%',
              opacity,
              zIndex,
              transformStyle: "preserve-3d",
            }}
          >
            {/* The Perfect Cube (Cubic Bezel Card) */}
            <div
              className={`relative w-[260px] sm:w-[300px] md:w-[340px] aspect-square rounded-[2.5rem] p-[2px] transition-all duration-700
                ${absOffset === 0 ? "shadow-[0_0_80px_-10px_rgba(6,182,212,0.5)]" : ""}`}
              style={{
                background: absOffset === 0 
                  ? "conic-gradient(from 0deg, transparent, #06b6d4, transparent, #8b5cf6, transparent)" 
                  : "rgba(255,255,255,0.1)",
              }}
            >
              {/* Image Container locked to 1:1 */}
              <div className="w-full h-full bg-[#080808] rounded-[2.4rem] overflow-hidden relative">
                <img
                  src={app.img}
                  alt={app.name}
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    absOffset === 0 ? 'scale-100 blur-0' : 'scale-110 blur-[2px] opacity-40 grayscale'
                  }`}
                />
                
                {/* Cyber Overlay for center card */}
                {absOffset === 0 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/5 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Typography - Fixed placement below the cube */}
            <div 
              className={`text-center mt-10 transition-all duration-700 ${
                absOffset === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 scale-95'
              }`}
            >
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase italic">
                {app.name}
              </h3>
              <p className="text-cyan-400 font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase mt-3 opacity-80">
                {app.tagline || "Experimental Module"}
              </p>
            </div>
          </Link>
        );
      })}
      
      {/* Dynamic Floor Reflection */}
      <div className="absolute bottom-0 w-full h-[15%] bg-gradient-to-t from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
    </div>
  );
}
