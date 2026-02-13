"use client";

import AppCarousel from "./components/AppCarousel";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-black text-white px-6 pt-24">

      {/* Organic violet/black background radiation */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-black via-violet-900/40 to-black animate-gradient-pulse"></div>

        {/* Floating cyber particles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-cyan-500/20 animate-ping-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* LUMINACID Title with neon particles */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-[clamp(4rem,12vw,10rem)] font-extrabold tracking-wide text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x relative">
          LUMINACID
          <span
            className="absolute inset-0 rounded-full filter blur-[30px] opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(0,255,255,0.6), transparent 60%)",
            }}
          />
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl md:text-2xl mt-4 text-center max-w-2xl">
          Where thought becomes light
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-6 mt-12 mb-16 z-10 flex-wrap justify-center">
        <a
          href="/apps"
          className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-cyan-400 transition transform hover:scale-105 shadow-lg shadow-cyan-500/70"
        >
          Explore Apps
        </a>

        <a
          href="/blog"
          className="bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition transform hover:scale-105 shadow-lg shadow-gray-600/50"
        >
          Blog
        </a>
      </div>

      {/* App Carousel */}
      <AppCarousel />

      {/* Bottom neon glow */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-cyan-600/10 via-purple-500/5 to-transparent z-0 pointer-events-none"></div>
    </main>
  );
}