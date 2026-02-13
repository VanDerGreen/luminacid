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
    <main className="relative min-h-screen bg-[#000] text-zinc-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* 2050 VISUAL OVERLAY */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      
      {/* ATMOSPHERIC CORE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
        {hasImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 blur-2xl scale-110"
            style={{ backgroundImage: `url(${imgPath})` }}
          />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <Link 
          href="/apps" 
          className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 hover:text-cyan-400 transition-all duration-300 mb-16 group"
        >
          <span className="h-px w-8 bg-zinc-800 group-hover:w-12 group-hover:bg-cyan-400 transition-all" />
          System Return
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LEFT COLUMN: THE DATA STREAM */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-12">
            <header className="space-y-4 animate-in fade-in slide-in-from-left duration-700">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 animate-ping" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-500/80 uppercase">Status: Live</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-[1000] tracking-tighter uppercase italic leading-[0.8] text-white">
                {data.title || slug}
              </h1>
              <p className="text-xl md:text-2xl font-light tracking-wide text-zinc-400 max-w-xl border-l-2 border-cyan-500 pl-6 py-2">
                {data.tagline || "Module description pending..."}
              </p>
            </header>

            <div className="h-px w-full bg-gradient-to-r from-zinc-800 via-zinc-500 to-transparent opacity-30" />

            <div 
              className="prose prose-invert prose-zinc max-w-none 
                animate-in fade-in slide-in-from-bottom duration-1000 delay-200
                prose-h2:text-4xl prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tighter prose-h2:italic prose-h2:text-white
                prose-h3:text-cyan-400 prose-h3:uppercase prose-h3:tracking-[0.2em] prose-h3:text-sm prose-h3:font-bold
                prose-p:text-zinc-400 prose-p:text-lg prose-p:leading-relaxed
                prose-table:border-collapse prose-table:border prose-table:border-zinc-800 prose-table:rounded-xl
                prose-th:bg-zinc-900 prose-th:p-4 prose-th:text-cyan-400 prose-th:uppercase prose-th:text-xs
                prose-td:p-4 prose-td:border prose-td:border-zinc-800 prose-td:bg-black/40
              "
              dangerouslySetInnerHTML={{ __html: contentHtml }} 
            />
          </div>

          {/* RIGHT COLUMN: THE HARDWARE MODULE */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="sticky top-24 space-y-8 animate-in fade-in zoom-in duration-700">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="absolute -inset-2 bg-cyan-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {hasImage ? (
                  <img src={imgPath} alt={data.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-800 font-black text-8xl">VOID</div>
                )}

                <div className="absolute top-6 right-6 z-20 flex flex-col gap-2 items-end">
                  <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase text-white">
                    Ver. {data.version || "1.0.0"}
                  </div>
                  <div className="px-3 py-1 bg-cyan-500 text-black rounded-full text-[10px] font-black tracking-widest uppercase">
                    Core Encrypted
                  </div>
                </div>
              </div>

              {/* SPEC SHEET FOOTER - PULLING DATA FROM MD */}
              <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                  <p className="text-zinc-600 mb-2">Deployment</p>
                  <p className="text-white text-sm tracking-normal">{data.deployment || "System Edge"}</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                  <p className="text-zinc-600 mb-2">Architecture</p>
                  <p className="text-white text-sm tracking-normal">{data.architecture || "Modular"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
