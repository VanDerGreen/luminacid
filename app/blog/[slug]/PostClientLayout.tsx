"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PostClientLayout({ post }: { post: any }) {
  const [mounted, setMounted] = useState(false);
  const [percent, setPercent] = useState(0); 
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // HUD Visibility and Percentage Logic
  const opacityHud = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const rawPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Safely sync MotionValue to React State
  useMotionValueEvent(rawPercent, "change", (latest) => {
    setPercent(Math.round(latest));
  });

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-[#020202] text-white selection:bg-cyan-500/40 antialiased overflow-x-hidden">
      
      {/* 1. TOP PROGRESS FILAMENT */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent z-[100] origin-center"
        style={{ scaleX }}
      />

      {/* 2. FLOATING HUD */}
      <motion.div 
        style={{ opacity: opacityHud }}
        className="fixed bottom-8 right-8 z-50 hidden md:flex flex-col items-end gap-2 font-mono"
      >
        <div className="text-[10px] text-cyan-500/50 uppercase tracking-[0.3em]">Neural_Integrity</div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-white tabular-nums">
            {percent}%
          </span>
          <div className="w-12 h-[1px] bg-white/10 relative">
             <motion.div 
               className="absolute inset-0 bg-cyan-500" 
               style={{ scaleX: scrollYProgress, originX: 0 }}
             />
          </div>
        </div>
      </motion.div>

      {/* 3. ATMOSPHERIC LAYERS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,#3b82f610_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-50 bg-[length:100%_4px,3px_100%] opacity-20" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-32">
        
        <header className="mb-24">
          <Link 
            href="/blog" 
            className="group inline-flex items-center gap-3 text-cyan-400 font-black tracking-[0.4em] text-[10px] uppercase mb-16 hover:text-white transition-all"
          >
            <span className="w-8 h-[1px] bg-cyan-500/30 group-hover:w-12 group-hover:bg-cyan-400 transition-all" />
            Archive_Return
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-purple-500 font-mono text-[10px] tracking-[0.3em] uppercase">
                [ LOG_ENTRY_{post.date?.replace(/\./g, '_')} ]
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
            </div>

            <h1 className="text-6xl md:text-8xl font-[1000] tracking-tighter italic uppercase leading-[0.8] mb-10 text-white">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-4 gap-x-10 text-gray-500 font-bold tracking-[0.2em] text-[10px] uppercase border-y border-white/5 py-6">
              <div className="flex items-center gap-2">
                <span className="text-white/20">Status:</span>
                <span className="text-green-500 animate-pulse">● Decrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/20">Read_Time:</span>
                <span className="text-cyan-400">{post.readTime} MIN</span>
              </div>
            </div>
          </motion.div>
        </header>

        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="prose prose-invert prose-cyan max-w-none 
            prose-p:text-gray-400 prose-p:text-xl prose-p:leading-[1.8] prose-p:mb-10
            prose-headings:text-white prose-headings:italic prose-headings:uppercase prose-headings:font-black
            prose-strong:text-cyan-400 prose-strong:font-black
            prose-code:text-purple-300 prose-code:bg-purple-500/10 prose-code:px-2 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />

        <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col items-center gap-8">
          <div className="w-16 h-16 rounded-full border border-cyan-500/20 flex items-center justify-center relative group">
             <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
          </div>
          <p className="text-[10px] font-black tracking-[0.8em] text-white/10 uppercase text-center">
            End_of_Transmission
          </p>
        </footer>
      </div>
    </main>
  );
}
