export default function StatusBar() {
  return (
    <div className="fixed top-4 left-0 w-full flex justify-center z-[999] px-4">
      <div className="liquid-glass group w-full max-w-4xl h-14 flex items-center justify-between px-8 transition-all duration-500 hover:h-16 hover:max-w-5xl">
        
        {/* LEFT: SYSTEM LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#0ff]" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-100/70 uppercase">
            Luminacid_Core
          </span>
        </div>

        {/* CENTER: NEURAL SYNC STATS */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-medium text-white/40">
           <div className="flex flex-col items-center">
             <span className="text-white/80">98%</span>
             <span className="text-[8px] uppercase tracking-tighter">Sync</span>
           </div>
           <div className="w-[1px] h-4 bg-white/10" />
           <div className="flex flex-col items-center">
             <span className="text-white/80">1.2ms</span>
             <span className="text-[8px] uppercase tracking-tighter">Lat</span>
           </div>
        </div>

        {/* RIGHT: TIME/STATUS */}
        <div className="text-[12px] font-mono text-cyan-400/90">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

      </div>
    </div>
  );
}
