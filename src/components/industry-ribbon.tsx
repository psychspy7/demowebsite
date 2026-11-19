import Link from "next/link";
import {
  Building2,
  Stethoscope,
  GraduationCap,
  Utensils,
  Bed,
  Factory,
  ShoppingCart,
  TrendingUp,
  Landmark,
  Sprout,
  ArrowRight,
} from "lucide-react";

const FEATURED_INDUSTRIES = [
  { id: "real-estate", name: "Real Estate", icon: Building2 },
  { id: "medico", name: "Healthcare", icon: Stethoscope },
  { id: "institute", name: "Education", icon: GraduationCap },
  { id: "restaurant", name: "Restaurant", icon: Utensils },
  { id: "hotel", name: "Hotel", icon: Bed },
  { id: "manufacturing", name: "Manufacturing", icon: Factory },
  { id: "ecommerce", name: "E-Commerce", icon: ShoppingCart },
  { id: "local-business", name: "Business", icon: TrendingUp },
  { id: "professional", name: "Finance", icon: Landmark },
  { id: "agriculture", name: "Agriculture", icon: Sprout },
];

export function IndustryRibbon() {
  return (
    <section id="industries" className="w-full border-y border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-stretch">
        
        {/* Left Fixed Label */}
        <div className="flex items-center gap-2 px-6 py-5 border-r border-zinc-800 shrink-0 font-semibold text-[11px] tracking-wider text-white uppercase select-none">
          <span>EXPLORE<br />INDUSTRIES</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
        </div>

        {/* Scrollable Industry Badges */}
        <div className="flex-1 flex items-center overflow-x-auto scrollbar-none divide-x divide-zinc-800/60">
          {FEATURED_INDUSTRIES.map(({ id, name, icon: Icon }) => (
            <Link
              key={id}
              href={`/${id === "agriculture" ? "institute" : id}`}
              className="flex flex-col items-center justify-center gap-2 px-6 py-4 min-w-[105px] group hover:bg-white/[0.03] transition-colors"
            >
              <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white group-hover:scale-110 transition-all" />
              <span className="text-[11px] font-medium text-zinc-400 group-hover:text-white transition-colors whitespace-nowrap">
                {name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Fixed "View All" */}
        <Link
          href="/library"
          className="flex items-center gap-1.5 px-6 py-5 border-l border-zinc-800 shrink-0 text-xs font-semibold text-white hover:text-zinc-300 transition-colors whitespace-nowrap"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>

      </div>
    </section>
  );
}
