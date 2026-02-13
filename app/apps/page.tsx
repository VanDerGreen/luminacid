"use client";

import Link from "next/link";
import { apps } from "../../data/apps";
import { motion } from "framer-motion";

export default function Apps() {
  return (
    <main className="min-h-screen bg-[#020202] text-white px-6 py-24 relative overflow-hidden antialiased">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-20 text-center sm:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-[950] tracking-tighter italic uppercase leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
          >
            Protocols
          </motion.h1>
          <p className="mt-6 text-cyan-400/60 font-bold tracking-[0.4em] uppercase text-xs md:text-sm">
            Experimental Alchemical Modules
          </p>
        </header>

        {/* The Artifact Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <motion.div
              key={app.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/apps/${app.slug}`}
                className="group relative block aspect-square w-full rounded-[3rem] overflow-hidden bg-white/[0.03] border border-white/10 transition-all duration-700 hover:border-white/30"
              >
                {/* 1. Ambient Background Image (Blurred) */}
                <div 
                  className="absolute inset-0 z-0 opacity-20 scale-150 blur-3xl transition-transform duration-700 group-hover:scale-100 group-hover:opacity-40"
                  style={{ backgroundImage: `url(${app.img})`, backgroundSize: 'cover' }}
                />

                {/* 2. Main Visual Content */}
                <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-8 text-center">
                  
                  {/* Cubic Icon Representation */}
                  <div className="relative w-32 h-32 mb-8 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
                    <img 
                      src={app.img} 
                      alt={app.name}
                      className="relative w-full h-full object-cover rounded-2xl border border-white/20 shadow-2xl"
                    />
                  </div>

                  {/* Text Stack */}
                  <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white group-hover:text-cyan-300 transition-colors">
                    {app.name}
                  </h2>
                  
                  {app.tagline && (
                    <span className="mt-2 text-[10px] font-black tracking-[0.3em] uppercase text-cyan-500/80">
                      {app.tagline}
                    </span>
                  )}

                  <p className="mt-4 text-sm text-gray-400 line-clamp-2 leading-relaxed font-medium px-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {app.desc}
                  </p>
                </div>

                {/* 3. The "Featured" Signature */}
                {app.featured && (
                  <div className="absolute top-6 right-6 z-20">
                    <div className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 backdrop-blur-md">
                      <p className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">Prime</p>
                    </div>
                  </div>
                )}

                {/* Interactive Rim Light Overlay */}
                <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none border-[1.5px] border-white/20 rounded-[3rem]" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modern Floor Reflection */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-50" />
    </main>
  );
}
