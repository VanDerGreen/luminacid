import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm"; 
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/apps");
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export default async function AppPage({ params }: Props) {
  const { slug } = await params;
  const postsDir = path.join(process.cwd(), "content/apps");
  const filePath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) notFound();

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  
  const processedContent = await remark().use(gfm).use(html).process(content);
  const contentHtml = processedContent.toString();

  const imgFilename = `${slug}.png`;
  const imgPath = `/images/apps/${imgFilename}`;
  const publicImagePath = path.join(process.cwd(), "public/images/apps", imgFilename);
  const hasImage = fs.existsSync(publicImagePath);

  return (
    <main className="relative min-h-screen bg-black text-zinc-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-400">
      
      {/* --- ATMOSPHERIC CORE (Symmetrical Blur) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full" />
        {hasImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 blur-[100px] scale-150"
            style={{ backgroundImage: `url(${imgPath})` }}
          />
        )}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-32">
        
        {/* SYMMETRICAL RETURN */}
        <Link 
          href="/apps" 
          className="inline-flex items-center gap-6 group mb-20 transition-all duration-500"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all">
            <span className="text-[14px] text-white/40 group-hover:text-cyan-400">←</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 group-hover:text-cyan-400 transition-all">
            System Return
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* --- LEFT: DATA STREAM --- */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-16">
            <header className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
              <div className="flex items-center gap-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[9px] font-black tracking-[0.4em] text-cyan-500/80 uppercase">Accessing Module</span>
                <div className="h-px flex-grow bg-white/5" />
              </div>

              <h1 className="text-8xl md:text-[11rem] font-black tracking-[calc(-0.06em)] uppercase italic leading-[0.75] text-white">
                {data.title || slug}
              </h1>

              {/* PERFECT SYMMETRY SUBTITLE PANEL */}
              <div className="liquid-glass relative overflow-hidden rounded-[2.5rem] border-l-4 border-l-cyan-500">
                <div className="flex items-center justify-center p-10 md:p-12">
                   <p className="text-xl md:text-2xl font-light text-zinc-300 leading-relaxed italic text-center max-w-2xl">
                    "{data.tagline || "Initializing neural protocol sequence..."}"
                  </p>
                </div>
              </div>
            </header>

            <article 
              className="prose prose-invert max-w-none 
                prose-p:text-zinc-400 prose-p:text-lg prose-p:leading-[1.9]
                prose-h2:text-4xl prose-h2:font-black prose-h2:italic prose-h2:uppercase prose-h2:tracking-tighter
                prose-h3:text-cyan-400 prose-h3:text-[10px] prose-h3:tracking-[0.4em] prose-h3:uppercase
                prose-strong:text-white prose-strong:font-bold
                animate-in fade-in slide-in-from-bottom duration-1000 delay-200
              "
              dangerouslySetInnerHTML={{ __html: contentHtml }} 
            />
          </div>

          {/* --- RIGHT: HARDWARE MODULE --- */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="sticky top-32 space-y-10 animate-in fade-in zoom-in duration-1000">
              
              {/* THE CUBIC TERMINAL (STRICT 1:1) */}
              <div className="liquid-glass p-5 rounded-[3.5rem] group">
                <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden bg-zinc-950 border border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  
                  {hasImage ? (
                    <img 
                      src={imgPath} 
                      alt={data.title} 
                      className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/5 font-black text-7xl italic">VOID</div>
                  )}

                  <div className="absolute top-8 right-8 z-20 flex flex-col gap-3 items-end">
                    <div className="px-4 py-1.5 liquid-glass rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-2xl">
                      REF // {data.version || "1.0.0"}
                    </div>
                    <div className="px-4 py-1.5 bg-cyan-400 text-black rounded-full text-[9px] font-black uppercase tracking-widest shadow-[0_0_20px_#0ff]">
                      Neural_Link
                    </div>
                  </div>
                </div>
              </div>

              {/* CENTERED SPEC GRID */}
              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: 'Deployment', value: data.deployment || 'Edge_Node' },
                  { label: 'Architecture', value: data.architecture || 'Modular' }
                ].map((spec) => (
                  <div key={spec.label} className="liquid-glass p-8 rounded-[2rem] flex flex-col items-center text-center group hover:bg-white/5 transition-all duration-500">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-2 group-hover:text-cyan-400 transition-colors">
                      {spec.label}
                    </span>
                    <span className="text-sm font-bold text-white tracking-tight">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* LIQUID DOWNLOAD TERMINAL (SYMMETRICAL) */}
              <button className="relative w-full h-20 group rounded-full overflow-hidden p-[2px] transition-all duration-500 active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-liquid" />
                
                {/* BLACK CORE THAT DISAPPEARS ON HOVER */}
                <div className="absolute inset-[2px] bg-black rounded-full transition-opacity duration-500 group-hover:opacity-0" />
                
                <div className="relative z-10 flex items-center justify-between px-10 w-full h-full">
                  <div className="flex flex-col items-start">
                    <span className="text-white text-[11px] font-black uppercase tracking-[0.4em] group-hover:text-black transition-colors duration-500">
                      Execute Download
                    </span>
                    <span className="text-white/20 text-[8px] font-mono uppercase tracking-widest group-hover:text-black/40 transition-colors duration-500">
                      ID: {slug?.slice(0, 8)}_SYS
                    </span>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-black/20 group-hover:bg-black/5 transition-all">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current text-white group-hover:text-black transition-colors duration-500" strokeWidth="3">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </button>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
