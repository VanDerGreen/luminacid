"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number; // New field
};

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-[#020202] text-white px-6 py-24 overflow-x-hidden antialiased">
      
      {/* BACKGROUND ATMOSPHERE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-1/4 left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <header className="mb-24 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="h-px w-12 bg-cyan-500/50" />
            <span className="text-cyan-400 font-[900] tracking-[0.5em] text-[10px] uppercase">Neural Logs</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-7xl md:text-9xl font-[1000] tracking-tighter uppercase italic leading-none text-white selection:bg-cyan-500/30"
          >
            Archives
          </motion.h1>
        </header>

        <div className="relative space-y-4">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/80 via-purple-500/40 to-transparent ml-2 md:ml-0" />

          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative block pl-10 md:pl-16 py-10 transition-all duration-500"
                >
                  <div className="absolute inset-y-2 left-4 right-[-20px] bg-gradient-to-r from-white/[0.03] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 border-l-2 border-cyan-500/0 group-hover:border-cyan-500/100 will-change-opacity" />

                  <div className="absolute left-[-4px] md:left-[-6px] top-1/2 -translate-y-1/2 w-2.5 md:w-3 h-2.5 md:h-3 bg-[#020202] border-2 border-cyan-400 rounded-full z-20 group-hover:bg-cyan-400 group-hover:scale-125 group-hover:shadow-[0_0_20px_#22d3ee] transition-all duration-500" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3 mb-3">
                        <p className="text-[10px] font-black tracking-[0.3em] uppercase text-purple-400/80 group-hover:text-purple-300">
                          {post.date}
                        </p>
                        <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-cyan-500/50" />
                        <span className="text-[9px] font-mono text-cyan-400/60 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                          {post.readingTime} MIN_READ
                        </span>
                      </div>
                      
                      <h2 className="text-3xl md:text-5xl font-[950] tracking-tight uppercase italic text-white group-hover:text-cyan-50 transition-colors leading-[0.9]">
                        {post.title}
                      </h2>
                      
                      <p className="mt-4 text-gray-500 group-hover:text-gray-400 leading-relaxed transition-colors line-clamp-2 text-sm md:text-base">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="hidden md:flex flex-col items-end opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                       <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Read_Log</span>
                       <div className="text-2xl text-cyan-400">→</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-[5] bg-[length:100%_4px,3px_100%] opacity-50" />
    </main>
  );
}
