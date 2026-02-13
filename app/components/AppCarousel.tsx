"use client";

import { apps } from "../../data/apps";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastManualInteraction, setLastManualInteraction] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % apps.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + apps.length) % apps.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastManualInteraction > 15000) {
        handleNext();
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [lastManualInteraction, handleNext]);

  if (!mounted) return <div className="h-[40rem] w-full bg-black" />;

  const visibleApps = [];
  for (let i = -2; i <= 2; i++) {
    const idx = (currentIndex + i + apps.length) % apps.length;
    visibleApps.push({ ...apps[idx], offset: i });
  }

  const handleDragEnd = (e: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setLastManualInteraction(Date.now());
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      setLastManualInteraction(Date.now());
      handlePrev();
    }
  };

  return (
    <div className="relative w-full flex justify-center items-center overflow-hidden h-[36rem] sm:h-[42rem] md:h-[52rem] perspective-[2000px] antialiased touch-pan-y">
      
      <AnimatePresence initial={false}>
        {visibleApps.map((app) => {
          const isActive = app.offset === 0;

          return (
            <motion.div
              key={`${app.slug}-${app.offset}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              animate={{
                x: app.offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 280 : 380),
                z: isActive ? 150 : -500 * Math.abs(app.offset),
                rotateY: app.offset * -22,
                scale: isActive ? 1.05 : 0.65,
                opacity: isActive ? 1 : 0.25,
              }}
              whileHover={isActive ? { scale: 1.1, rotateY: 0 } : {}}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 22,
                mass: 1,
              }}
              className="absolute will-change-transform flex flex-col items-center cursor-grab active:cursor-grabbing"
              style={{
                zIndex: 50 - Math.abs(app.offset),
                transformStyle: "preserve-3d",
              }}
            >
              {/* THE LIQUID GLOW: 2050 Mesh Gradient Style */}
              {isActive && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {/* Cyan Core */}
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute w-[350px] h-[350px] bg-cyan-500/40 blur-[60px] rounded-full" 
                  />
                  {/* Violet Bloom */}
                  <motion.div 
                    animate={{ x: [-20, 20, -20], y: [10, -10, 10] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute w-[400px] h-[400px] bg-purple-600/30 blur-[80px] rounded-full" 
                  />
                  {/* Electric White Flare */}
                  <div className="absolute w-[200px] h-[200px] bg-white/10 blur-[40px] rounded-full" />
                </div>
              )}

              <Link href={`/apps/${app.slug}`} draggable={false} className="block relative">
                <div className="relative w-[280px] sm:w-[340px] md:w-[420px] aspect-square">
                  
                  {/* THE FRAME: Chrome-Neon finish */}
                  <div
                    className="relative w-full h-full rounded-[3.5rem] p-[3px] overflow-hidden"
                    style={{
                      background: isActive 
                        ? "linear-gradient(135deg, #06b6d4 0%, #ffffff 50%, #8b5cf6 100%)" 
                        : "rgba(255,255,255,0.1)",
                      boxShadow: isActive ? "inset 0 0 20px rgba(255,255,255,0.4)" : "none"
                    }}
                  >
                    <div className="w-full h-full bg-[#050505] rounded-[3.35rem] overflow-hidden relative border border-white/10">
                      <img
                        src={app.img}
                        alt={app.name}
                        draggable={false}
                        className={`w-full h-full object-cover transition-all duration-[1s] ${
                          isActive ? 'scale-100 opacity-100' : 'scale-125 opacity-20 grayscale'
                        }`}
                      />
                      {/* Depth Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-white/10" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* TYPOGRAPHY: The Highlight */}
              <div 
                className={`text-center mt-12 transition-all duration-1000 ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <h3 className="text-6xl md:text-8xl font-[950] tracking-[-0.06em] text-white uppercase italic leading-[0.75] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {app.name}
                </h3>
                <div className="flex items-center justify-center gap-5 mt-8">
                  <span className="h-[2px] w-10 bg-gradient-to-r from-transparent to-cyan-400" />
                  <p className="text-cyan-300 font-black tracking-[0.7em] text-[10px] md:text-[12px] uppercase">
                    {app.tagline || "System Primed"}
                  </p>
                  <span className="h-[2px] w-10 bg-gradient-to-l from-transparent to-cyan-400" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
