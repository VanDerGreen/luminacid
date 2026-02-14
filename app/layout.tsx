"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode, useState, useEffect } from 'react';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const [showConsent, setShowConsent] = useState(false);
  const [showSync, setShowSync] = useState(false);

  useEffect(() => {
    const consentDismissed = localStorage.getItem('luminacid_consent_closed');
    const syncDismissed = localStorage.getItem('luminacid_sync_closed');
    
    if (!consentDismissed) setShowConsent(true);
    if (!syncDismissed) setShowSync(true);
  }, []);

  const handleDismissConsent = () => {
    localStorage.setItem('luminacid_consent_closed', 'true');
    setShowConsent(false);
  };

  const handleDismissSync = () => {
    localStorage.setItem('luminacid_sync_closed', 'true');
    setShowSync(false);
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <title>LUMINACID // NEURAL ARCHITECTURE</title>
        <link rel="icon" href="/favicon-32x32.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#00ffff" /> 
      </head>
      <body className="bg-black text-slate-200 antialiased font-sans selection:bg-cyan-500/30 selection:text-cyan-400 min-h-screen flex flex-col relative">
        
        {/* --- GLOBAL ILLUMINATION ENGINE --- */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* The "Floor Lamp": This creates the primary light bounce for all glass */}
            <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[120%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(0,255,255,0.08)_0%,_transparent_70%)] blur-[100px]" />
        </div>

        {/* --- LIQUID GLASS COMMAND CENTER (TOP NAV) --- */}
        <nav className="fixed top-6 left-0 w-full flex justify-center z-[999] px-6">
          <div className="liquid-glass w-full max-w-5xl h-14 flex items-center justify-between px-6 md:px-10 border-white/5">
            
            <a href="/" className="flex items-center gap-3 py-2 hover:opacity-100 transition-opacity group">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:shadow-[0_0_12px_#0ff] transition-all" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/70 group-hover:text-white transition-colors">
                Luminacid
              </span>
            </a>

            <div className="flex items-center gap-1 md:gap-4 bg-white/5 rounded-full p-1 border border-white/5">
              <a href="/apps" className="nav-tab relative px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide text-white/50 transition-all duration-300 ease-out hover:text-white hover:bg-white/10 group">
                Apps
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-1 group-hover:shadow-[0_0_8px_#0ff]"></span>
              </a>
              <a href="/blog" className="nav-tab relative px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide text-white/50 transition-all duration-300 ease-out hover:text-white hover:bg-white/10 group">
                Archives
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-1 group-hover:shadow-[0_0_8px_#0ff]"></span>
              </a>
              <div className="w-[1px] h-3 bg-white/10 mx-1 hidden md:block" />
              <a href="/archive" className="nav-tab relative px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide text-white/50 transition-all duration-300 ease-out hover:text-white hover:bg-white/10 group hidden md:block">
                Vault
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-1 group-hover:shadow-[0_0_8px_#0ff]"></span>
              </a>
            </div>

            <div className="flex items-center gap-5">
              
              <button className="group relative w-12 h-12 flex items-center justify-center outline-none">
  {/* The Core Dot */}
  <div className="w-1.5 h-1.5 bg-white rounded-full group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_#0ff] transition-all z-10" />
  
  {/* The Orbital Rings (Animated SVG) */}
  <svg className="absolute inset-0 w-full h-full rotate-0 group-hover:rotate-180 transition-transform duration-1000">
    <circle 
      cx="24" cy="24" r="10" 
      stroke="currentColor" 
      strokeWidth="1" 
      fill="none" 
      className="text-white/10 stroke-dasharray-[15,25] group-hover:text-cyan-500/50 transition-colors"
    />
    <circle 
      cx="24" cy="24" r="14" 
      stroke="currentColor" 
      strokeWidth="1" 
      fill="none" 
      className="text-white/5 stroke-dasharray-[40,10] group-hover:text-white/20 transition-colors"
    />
  </svg>
</button>

            </div>
            
          </div>
        </nav>

        {/* --- MAIN TERMINAL SPACE --- */}
        <main className="pt-28 pb-40 flex-grow relative z-10">
          {children}
        </main>

        {/* --- DUAL MODULE LAYER (ALIGNED BOTTOM) --- */}
        <div className="fixed bottom-8 left-0 w-full pointer-events-none z-[1100] px-6 flex justify-between items-end max-w-7xl mx-auto">
          
          {/* PERMISSIONS (LEFT) */}
          {showConsent ? (
            <div className="w-[320px] animate-in fade-in slide-in-from-bottom-4 duration-700 pointer-events-auto">
              <div className="liquid-glass p-6 h-[200px] flex flex-col justify-between border-cyan-500/10 shadow-[0_-20px_50px_-10px_rgba(0,255,255,0.05)]">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-cyan-400">Data Handshake</span>
                    <div className="h-[1px] flex-grow bg-cyan-400/20" />
                  </div>
                  <p className="text-[10px] leading-relaxed text-white/40 font-mono">
                    [SYSTEM]: COOKIES REQUIRED FOR OPTIMIZED NEURAL CALIBRATION.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleDismissConsent} className="flex-grow py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-all">Decline</button>
                  <button onClick={handleDismissConsent} className="flex-grow py-2 rounded-full bg-cyan-400 text-black text-[9px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_#0ff] transition-all">Authorize</button>
                </div>
              </div>
            </div>
          ) : <div />}

          {/* SYNC (RIGHT) */}
          {showSync ? (
            <div className="w-[320px] animate-in fade-in slide-in-from-bottom-4 duration-700 pointer-events-auto">
              <div className="liquid-glass p-6 group h-[200px] flex flex-col justify-between relative overflow-hidden border-white/5 shadow-[0_-20px_50px_-10px_rgba(0,255,255,0.05)]">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/90">Neural Sync</span>
                  </div>
                  <p className="text-[10px] text-white/40 leading-relaxed font-mono">
                    [GATEWAY]: JOIN THE NETWORK FOR DIRECT PROTOCOLS.
                  </p>
                </div>
                <div>
                  <input type="email" placeholder="USER@NETWORK.COM" className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[10px] font-mono text-cyan-400 placeholder:text-white/10 outline-none mb-4 focus:border-cyan-400/30 transition-all" />
                  <div className="flex items-center justify-between gap-4">
                    <button onClick={handleDismissSync} className="text-[9px] uppercase tracking-widest text-white/30 hover:text-white transition-colors">Dismiss</button>
                    <button className="px-4 py-2 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-widest hover:bg-cyan-400 hover:shadow-[0_0_20px_#0ff] transition-all">Initialize</button>
                  </div>
                </div>
              </div>
            </div>
          ) : <div />}
        </div>

        {/* --- THE ILLUMINATED FOOTER TILE --- */}
        <footer className="w-full flex justify-center pb-12 px-6 relative z-10">
          <div className="liquid-glass w-full max-w-5xl p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group border-white/10 bg-white/[0.02] shadow-[0_-30px_100px_-20px_rgba(0,255,255,0.15)] transition-all duration-700 hover:shadow-[0_-30px_120px_-10px_rgba(0,255,255,0.25)]">
            
            {/* Organic Glow Pulse inside the footer */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left relative z-10">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-cyan-400">System_Active</span>
              </div>
              <p className="text-[10px] text-white/20 tracking-tight font-medium">
                © 2026 LUMINACID_CORE. <br/> 
                <span className="text-white/40">ARCHITECTURE FOR THE NEURAL AGE.</span>
              </p>
            </div>
            
            <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold relative z-10">
              <a href="#" className="hover:text-cyan-400 transition-all hover:tracking-[0.4em]">instagram</a>
              <a href="#" className="hover:text-cyan-400 transition-all hover:tracking-[0.4em]">tiktok</a>
              <a href="#" className="hover:text-cyan-400 transition-all hover:tracking-[0.4em]">youtube</a>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border border-white/5 relative z-10 group/vault">
              <a href="/privacy" className="text-[9px] uppercase text-white/20 hover:text-white transition-colors">Privacy</a>
              <div className="w-[1px] h-3 bg-white/10" />
              <a href="/terms" className="text-[9px] uppercase text-white/20 hover:text-white transition-colors">Terms</a>
              <div className="w-[1px] h-3 bg-white/10" />
              <span className="text-[9px] text-cyan-400 font-mono tracking-tighter animate-blink-slow group-hover/vault:opacity-100 transition-opacity">
                  V.4.8.2-Ω
              </span>

            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
