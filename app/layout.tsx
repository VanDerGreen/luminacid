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
      <body className="bg-black text-slate-200 antialiased font-sans selection:bg-cyan-500/30 selection:text-cyan-400 min-h-screen flex flex-col">
        
        {/* --- LIQUID GLASS COMMAND CENTER (TOP NAV) --- */}
        <nav className="fixed top-6 left-0 w-full flex justify-center z-[999] px-6">
          <div className="liquid-glass w-full max-w-5xl h-14 flex items-center justify-between px-6 md:px-10">
            
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
                Protocols
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-1 group-hover:shadow-[0_0_8px_#0ff]"></span>
              </a>
              <div className="w-[1px] h-3 bg-white/10 mx-1 hidden md:block" />
              <a href="/archive" className="nav-tab relative px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide text-white/50 transition-all duration-300 ease-out hover:text-white hover:bg-white/10 group hidden md:block">
                Vault
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-1 group-hover:shadow-[0_0_8px_#0ff]"></span>
              </a>
            </div>

            <div className="flex items-center gap-5">
              <button className="hidden sm:block text-[9px] uppercase tracking-widest text-white/30 hover:text-cyan-400 transition-colors cursor-pointer outline-none">
                Support
              </button>
              <button className="px-5 py-1.5 rounded-full border border-white/20 text-white text-[9px] font-bold uppercase tracking-[0.1em] hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 active:scale-95 outline-none">
                Connect
              </button>
            </div>
            
          </div>
        </nav>

        {/* --- MAIN TERMINAL SPACE --- */}
        <main className="pt-28 pb-40 flex-grow">
          {children}
        </main>

        {/* --- DUAL MODULE LAYER (ALIGNED BOTTOM) --- */}
        <div className="fixed bottom-8 left-0 w-full pointer-events-none z-[1100] px-6 flex justify-between items-end max-w-7xl mx-auto">
          
          {/* PERMISSIONS (LEFT) */}
          {showConsent ? (
            <div className="w-[320px] animate-in fade-in slide-in-from-bottom-4 duration-700 pointer-events-auto">
              <div className="liquid-glass p-6 h-[200px] flex flex-col justify-between border-cyan-500/10">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-cyan-400">Data Handshake</span>
                    <div className="h-[1px] flex-grow bg-cyan-400/20" />
                  </div>
                  <p className="text-[10px] leading-relaxed text-white/40 font-mono">
                    [SYSTEM]: COOKIES REQUIRED FOR OPTIMIZED NEURAL CALIBRATION AND TRAFFIC ANALYSIS.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleDismissConsent} className="flex-grow py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-all">Decline</button>
                  <button onClick={handleDismissConsent} className="flex-grow py-2 rounded-full bg-cyan-400 text-black text-[9px] font-bold uppercase tracking-widest hover:shadow-[0_0_15px_#0ff] transition-all">Authorize</button>
                </div>
              </div>
            </div>
          ) : <div />}

          {/* SYNC (RIGHT) */}
          {showSync ? (
            <div className="w-[320px] animate-in fade-in slide-in-from-bottom-4 duration-700 pointer-events-auto">
              <div className="liquid-glass p-6 group h-[200px] flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/90">Neural Sync</span>
                  </div>
                  <p className="text-[10px] text-white/40 leading-relaxed font-mono">
                    [GATEWAY]: JOIN THE LUMINACID NETWORK FOR DIRECT PROTOCOL UPDATES.
                  </p>
                </div>
                <div>
                  <input type="email" placeholder="USER@NETWORK.COM" className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[10px] font-mono text-cyan-400 placeholder:text-white/10 outline-none mb-4 focus:border-cyan-400/30 transition-all" />
                  <div className="flex items-center justify-between gap-4">
                    <button onClick={handleDismissSync} className="text-[9px] uppercase tracking-widest text-white/30 hover:text-white transition-colors">Dismiss</button>
                    <button className="px-4 py-2 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-widest hover:bg-cyan-400 hover:shadow-[0_0_15px_#0ff] transition-all">Initialize</button>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-y-full group-hover:animate-scan pointer-events-none" />
              </div>
            </div>
          ) : <div />}
        </div>

        {/* --- FOOTER ANCHOR --- */}
        <footer className="w-full flex justify-center pb-8 px-6">
          <div className="liquid-glass w-full max-w-5xl p-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-cyan-400/80">System Active</span>
              <p className="text-[10px] text-white/20 tracking-tight">© 2026 LUMINACID_CORE. <br/> DESIGNED FOR NEURAL OPTIMIZATION.</p>
            </div>
            
            <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">
              <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 px-6 py-2 rounded-full border border-white/5">
              <a href="/privacy" className="text-[9px] uppercase text-white/20 hover:text-white transition-colors">Privacy</a>
              <div className="w-[1px] h-2 bg-white/10" />
              <a href="/terms" className="text-[9px] uppercase text-white/20 hover:text-white transition-colors">Terms</a>
              <div className="w-[1px] h-2 bg-white/10" />
              <span className="text-[9px] text-cyan-400/40 animate-pulse font-mono tracking-tighter">V.4.8.2-OMEGA</span>
            </div>
          </div>
        </footer>

        <svg className="hidden">
          <filter id="liquid-refraction">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
          </filter>
        </svg>

      </body>
    </html>
  );
}
