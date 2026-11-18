import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Workflow,
  MessageCircle,
  Check,
  Layers,
  MoveUpRight,
} from "lucide-react";
import { Brand, SiteNav, SiteFooter } from "@/components/brand";
import { TemplateCard, TemplateThumbnail } from "@/components/template-library";
import { templates, industries, OFFICIAL } from "@/lib/catalogue";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "KITTY CORP Demo Studio",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "10000",
    priceCurrency: "INR",
  },
  author: {
    "@type": "Organization",
    name: "KITTY CORP",
    url: OFFICIAL,
  },
  description:
    "Professional website demonstration studio with 18 industry presets and personalized business website concepts.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main>
        <section className="landing-hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="status-dot" /> YOUR NEXT CHAPTER, ONLINE
            </span>
            <h1>
              Your business
              <br />
              deserves <em>more.</em>
            </h1>
            <p className="hero-full-title">
              More than just an online presence.
            </p>
            <p>
              We build professional websites, intelligent automation systems and
              digital experiences that help businesses attract customers,
              simplify operations and grow.
            </p>
            <div className="button-row">
              <Link className="button dark" href="#industries">
                Find your industry <ArrowRight size={18} />
              </Link>
              <a className="text-link" href={OFFICIAL}>
                Let’s build something <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="tiny-cross">✳</span> Thoughtful design. Real
              business possibilities.
            </div>
          </div>
          <div className="hero-composition">
            <div className="composition-label">
              <span>THE POSSIBILITIES, IN PREVIEW</span>
              <span>KC / 001</span>
            </div>
            <div className="hero-browser browser-one">
              <div className="browser-bar">
                <i />
                <i />
                <i />
                <span>your-next-business.com</span>
                <ArrowUpRight size={12} />
              </div>
              <TemplateThumbnail
                template={templates.find((t) => t.id === "real-estate-1")!}
              />
            </div>
            <div className="hero-browser browser-two">
              <div className="browser-bar">
                <i />
                <i />
                <i />
                <span>made for your business</span>
              </div>
              <TemplateThumbnail
                template={templates.find((t) => t.id === "restaurant-2")!}
              />
            </div>
            <div className="composition-sticker">
              <MoveUpRight size={30} />
              <span>
                A better
                <br />
                first impression.
              </span>
            </div>
            <span className="composition-caption">
              Distinct businesses. Distinct digital experiences.
            </span>
          </div>
        </section>
        <div className="service-strip">
          <span>WEBSITES WITH PURPOSE</span>
          <span>✳</span>
          <span>INTELLIGENT AUTOMATION</span>
          <span>✳</span>
          <span>BUILT AROUND YOUR BUSINESS</span>
          <span>✳</span>
          <span>IDEAS INTO EXPERIENCES</span>
        </div>
        <section id="industries" className="section-wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">01 / EXPLORE THE POSSIBILITIES</span>
              <h2>
                Your industry.
                <br />
                <em>A new perspective.</em>
              </h2>
            </div>
            <p>
              Every business has a different story.
              <br />
              Find a starting point that feels like yours.
            </p>
          </div>
          <div className="industry-grid">
            {industries.map((i, n) => (
              <Link href={`/${i.id}`} key={i.id} className="industry-link">
                <span className="industry-index">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <h3>{i.name}</h3>
                <ArrowUpRight size={19} />
              </Link>
            ))}
          </div>
        </section>
        <section className="section-wrap showcase">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 / A FEW WAYS FORWARD</span>
              <h2>
                Built to make
                <br />
                <em>an impression.</em>
              </h2>
            </div>
            <Link className="text-link" href="/library">
              Explore all {templates.length} designs <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="template-grid">
            {["medico-1", "restaurant-2", "real-estate-1"].map((id) => (
              <TemplateCard
                key={id}
                template={templates.find((t) => t.id === id)!}
              />
            ))}
          </div>
          <p className="caption">
            Illustrative website concepts. Imagery and content are examples, not
            client endorsements.
          </p>
        </section>
        <section id="services" className="services-section">
          <div className="section-wrap">
            <span className="eyebrow">03 / MORE THAN A WEBSITE</span>
            <div className="section-heading">
              <h2>
                Good design opens doors.
                <br />
                <em>Great systems keep them open.</em>
              </h2>
              <a href={OFFICIAL} className="button lime">
                Explore what’s possible <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="service-grid">
              {[
                [
                  Code2,
                  "Websites & software",
                  "From a considered first impression to custom full-stack tools built around the way you work.",
                ],
                [
                  Workflow,
                  "Intelligent automation",
                  "AI agents and practical workflows that connect your processes and reduce repetitive work.",
                ],
                [
                  MessageCircle,
                  "Customer connections",
                  "WhatsApp enquiry flows, digital presence setup, and simple lead-management systems.",
                ],
              ].map(([Icon, title, text]) => {
                const I = Icon as typeof Code2;
                return (
                  <article key={String(title)}>
                    <I size={28} />
                    <h3>{String(title)}</h3>
                    <p>{String(text)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section-wrap process">
          <div>
            <span className="eyebrow">04 / FROM IDEA TO ONLINE</span>
            <h2>
              A clear path.
              <br />
              <em>At every step.</em>
            </h2>
            <p>
              We start with your business, shape the experience together, and
              build the tools to support what comes next.
            </p>
          </div>
          <div className="process-steps">
            {[
              [
                "01",
                "Understand",
                "Your business, your customers, your ambitions.",
              ],
              [
                "02",
                "Make it tangible",
                "Explore a personalised concept and refine the details.",
              ],
              [
                "03",
                "Build & launch",
                "Turn the agreed direction into a working experience.",
              ],
              [
                "04",
                "Keep it working",
                "Support and maintenance within your project scope.",
              ],
            ].map(([n, t, p]) => (
              <div key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </div>
                <ArrowUpRight size={20} />
              </div>
            ))}
          </div>
        </section>
        <section id="pricing" className="section-wrap pricing-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">05 / AN INVESTMENT IN WHAT’S NEXT</span>
              <h2>
                Ambitious work.
                <br />
                <em>Considered pricing.</em>
              </h2>
            </div>
            <p>
              A clear scope. A tailored proposal.
              <br />
              Indicative pricing, shaped by your requirements.
            </p>
          </div>
          <div className="pricing-grid">
            {[
              [
                "A strong beginning",
                "From ₹10,000",
                "A professional foundation for your business online.",
              ],
              [
                "Room to grow",
                "₹15,000–₹25,000",
                "A more detailed experience, tailored to your customers.",
              ],
              [
                "Beyond the everyday",
                "₹25,000–₹35,000+",
                "Advanced functionality and custom business workflows.",
              ],
            ].map(([h, p, t], i) => (
              <article className={i === 1 ? "featured" : ""} key={h}>
                <span className="eyebrow">{h}</span>
                <h3>{p}</h3>
                <p>{t}</p>
                <a className="text-link" href={OFFICIAL}>
                  Discuss your project <ArrowUpRight size={18} />
                </a>
              </article>
            ))}
          </div>
          <div className="maintenance">
            <span className="maintenance-icon">
              <Layers size={30} />
            </span>
            <div>
              <h3>Launch is just the beginning.</h3>
              <p>
                Six months of complimentary website maintenance, subject to the
                agreed project scope.
              </p>
            </div>
            <span>
              <Check size={16} /> Technical support
              <br />
              <Check size={16} /> Performance monitoring
            </span>
          </div>
          <p className="caption">
            Final pricing and included services depend on scope. Paid
            third-party subscriptions are separate.
          </p>
        </section>
        <section className="closing-cta">
          <span className="eyebrow">LET’S MAKE YOUR NEXT MOVE COUNT</span>
          <h2>
            Something great
            <br />
            starts with <em>a conversation.</em>
          </h2>
          <a className="button dark" href={OFFICIAL}>
            Talk to KITTY CORP <ArrowUpRight size={18} />
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
