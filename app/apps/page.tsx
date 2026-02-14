"use client";

import Link from "next/link";
import { apps } from "../../data/apps";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function AppCube({ app, index }: { app: any; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // High-end Tilt & Parallax
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group"
    >
      <Link href={`/apps/${app.slug}`} className="block relative w-full h-full">
        
        {/* HYPER-GLOW FLOOR (Prevents Clipping) */}
        <div className="absolute inset-x-0 -bottom-10 h-20 bg-cyan-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* MAIN ARTIFACT CONTAINER */}
        <div className="relative aspect-square w-full rounded-[2rem] bg-[#0a0a0a] border border-white/10 group-hover:border-cyan-400/40 transition-all duration-500 overflow-hidden shadow-2xl">
          
          {/* REFRACTIVE BACKGROUND LAYER */}
          <div className="absolute inset-0 z-0">
            <img 
              src={app.img} 
              className="w-full h-full object-cover opacity-20 scale-125 group-hover:scale-100 group-hover:opacity-40 transition-all duration-1000 blur-xl saturate-150"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </div>

          {/* THE CUBIC CORE */}
          <div className="relative z-20 h-full w-full flex flex-col items-center justify-center p-10" style={{ transform: "translateZ(60px)" }}>
            
            {/* The Actual Cubic Icon */}
            <div className="relative w-40 h-40 mb-10">
              {/* Outer Neon Rim */}
              <div className="absolute -inset-4 bg-cyan-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* The Cubic Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110">
                <img 
                  src={app.img} 
                  alt={app.name}
                  className="w-full h-full object-cover saturate-[1.2] group-hover:saturate-[1.6] transition-all"
                />
              </div>
            </div>

            {/* TEXT ARCHITECTURE */}
            <div className="text-center">
              <h2 className="text-3xl font-[1000] tracking-tighter uppercase italic text-white group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_12px_rgba(0,255,255,0.3)]">
                {app.name}
              </h2>
              <p className="mt-2 text-[10px] font-black tracking-[0.5em] uppercase text-cyan-500/60 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]">
                {app.tagline}
              </p>
            </div>
          </div>

          {/* INTERNAL GLOSS OVERLAY */}
          <div className="absolute inset-0 z-30 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function Apps() {
  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-32 relative overflow-hidden antialiased">
      
      {/* GLOBAL AMBIENCE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-cyan-950/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-purple-950/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADER (Restored & Aggressive) */}
        <header className="mb-32 relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="h-1 bg-cyan-500 shadow-[0_0_15px_#0ff] mb-10"
          />
          
          <div className="flex flex-col md:flex-row items-baseline gap-6">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10rem] md:text-[14rem] font-[1000] tracking-tighter italic uppercase leading-[0.7] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              Apps
            </motion.h1>
            <div className="space-y-1">
              <p className="text-cyan-400 font-black tracking-[0.8em] uppercase text-sm md:text-base drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                Alchemical_Modules
              </p>
              <p className="text-white/20 font-mono text-[10px] uppercase tracking-widest pl-1">
                Extraction Protocol_V.4.8.2-Ω
              </p>
            </div>
          </div>
        </header>

        {/* THE CLEAN CUBIC GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <AppCube key={app.slug} app={app} index={index} />
          ))}
        </div>
      </div>

      {/* FOOTER GLOW */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan-950/10 to-transparent pointer-events-none z-50" />
    </main>
  );
}
