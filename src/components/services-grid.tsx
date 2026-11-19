import { Monitor, Zap, Cpu, ArrowRight } from "lucide-react";

export function ServicesGrid() {
  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-800/80">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">OUR SERVICES</span>
            <div className="w-12 h-[1px] bg-zinc-800" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Solutions for a <span className="font-serif italic font-normal text-white">Smarter</span> Tomorrow.
          </h2>
          <p className="text-zinc-400 text-base md:text-lg">
            From stunning websites to intelligent automation, we help businesses work smarter and grow faster.
          </p>
        </div>
        <div>
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 border border-white/20 text-white px-5 py-2.5 rounded-full hover:bg-white/10 hover:border-white/30 transition-all text-xs md:text-sm font-medium"
          >
            Explore Services <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
        
        {/* Pillar 1: Premium Websites */}
        <article className="p-8 rounded-3xl bg-zinc-900/40 border border-white/10 hover:border-white/25 hover:bg-zinc-900/60 transition-all group flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-sans">Premium Websites</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Stunning, responsive and conversion-focused websites engineered for lightning performance and search visibility.
            </p>
          </div>
          <div className="pt-8">
            <a href="#designs" className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:underline">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </article>

        {/* Pillar 2: Business Automation */}
        <article className="p-8 rounded-3xl bg-zinc-900/40 border border-white/10 hover:border-white/25 hover:bg-zinc-900/60 transition-all group flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-sans">Business Automation</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Automate workflows, synchronize CRM data, connect WhatsApp enquiry funnels, and save valuable operational time.
            </p>
          </div>
          <div className="pt-8">
            <a href="#calculator" className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:underline">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </article>

        {/* Pillar 3: AI Solutions */}
        <article className="p-8 rounded-3xl bg-zinc-900/40 border border-white/10 hover:border-white/25 hover:bg-zinc-900/60 transition-all group flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-sans">AI Solutions</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Integrate the power of custom AI agents, automated customer intake bots, and bespoke language pipelines into your core business.
            </p>
          </div>
          <div className="pt-8">
            <a href="#pricing" className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:underline">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </article>

      </div>
    </section>
  );
}
