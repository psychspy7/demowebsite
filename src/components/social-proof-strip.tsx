export function SocialProofStrip() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="relative rounded-3xl bg-zinc-900/40 border border-white/10 overflow-hidden p-8 md:p-14 backdrop-blur-md">
        
        {/* Right Curved Architectural Motif Visual */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 bg-cover bg-center opacity-30 mix-blend-screen pointer-events-none"
          style={{ backgroundImage: "url('/images/office.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">BUILT WITH PRECISION</span>
            <div className="w-12 h-[1px] bg-zinc-800" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Trusted by <span className="font-serif italic font-normal text-white">Forward-Thinking Businesses</span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            From startups to established brands, we build digital experiences that last.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-zinc-800/80">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white font-sans">18+</div>
              <div className="text-xs text-zinc-400 mt-1">Industry Verticals</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white font-sans">54</div>
              <div className="text-xs text-zinc-400 mt-1">Curated Flagships</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white font-sans">99.9%</div>
              <div className="text-xs text-zinc-400 mt-1">Uptime Core</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white font-sans">&lt; 15m</div>
              <div className="text-xs text-zinc-400 mt-1">Response SLA</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
