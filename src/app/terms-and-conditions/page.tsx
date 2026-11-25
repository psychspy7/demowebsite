import type { Metadata } from "next";
import { SiteNav, SiteFooter } from "@/components/brand";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing website enquiries, proposals and website development services from KITTY CORP Studio.",
  alternates: { canonical: "https://business.thekittycorp.com/terms-and-conditions" },
};

export default function TermsAndConditions() {
  return (
    <>
      <SiteNav />
      <main className="legal-page">
        <span className="eyebrow">LEGAL · SERVICE TERMS</span>
        <h1>Terms & Conditions</h1>
        <p className="legal-updated">Last updated: 25 November 2026</p>
        <p className="legal-intro">These terms explain the general basis on which KITTY CORP Studio discusses and delivers website design and development projects. A signed agreement or accepted written proposal may add to or replace these general terms for a particular project.</p>

        <section>
          <h2>1. About the Studio</h2>
          <p>This website is operated under the KITTY CORP brand. The legal contracting party for each paid engagement will be named in the relevant proposal, invoice or agreement. Nothing on this website represents that the brand is a government body, a regulated professional service or a separately incorporated entity.</p>
        </section>
        <section>
          <h2>2. Services and project scope</h2>
          <p>Services may include website strategy, design, development, e-commerce implementation, integrations, deployment and agreed maintenance. The deliverables, timeline, milestones, revisions, dependencies and exclusions for a project will be described in its written proposal. Work outside the agreed scope may require a separate quote and timeline.</p>
        </section>
        <section>
          <h2>3. Pricing, quotes and payment</h2>
          <p>Website prices displayed on this website are starting prices in US dollars: Basic Website from $200, Business Website from $800, and E-commerce Website from $1,500. They are not fixed quotes or a guarantee that every project can be completed at that price. Final fees depend on requirements, content, integrations, complexity and the written scope.</p>
          <p>Any applicable taxes, currency conversion, bank charges, payment processing fees and third-party costs will be disclosed or handled as set out in the project quote. Work begins after the agreed deposit or payment milestone is received. The proposal or invoice controls if it states different payment terms.</p>
        </section>
        <section>
          <h2>4. Included domain bonus</h2>
          <p>Eligible projects include one year of standard domain registration. Domain selection is subject to availability and registrar approval. Premium, reserved or unusually priced domain names, special TLD fees and other optional services may cost extra if not expressly included in the written quote. From the second year onward, the client is responsible for domain renewal charges and for keeping the domain registration active.</p>
          <p>The domain should be registered under an account controlled by the client wherever the registrar permits. The client is responsible for providing accurate registration details and maintaining access to that account.</p>
        </section>
        <section>
          <h2>5. Included maintenance and optional continuation</h2>
          <p>Each eligible website project includes one month of maintenance at no additional Studio service fee after the website launch. The exact start date and covered tasks will be confirmed in the project handover or written scope.</p>
          <p>After the included month, the client may choose continued maintenance at <strong>$100 per month</strong>, or <strong>$1,000 for 12 months</strong> (equivalent to two months free compared with twelve monthly payments). A paid plan starts only after the client selects and confirms it in writing. Maintenance covers only the agreed routine updates, bug fixes and support tasks stated in the proposal; new features, redesigns, new integrations, content production, third-party outages and work caused by changes outside our control are not included unless agreed separately.</p>
        </section>
        <section>
          <h2>6. Client-owned accounts, assets and third-party services</h2>
          <p>Web hosting, third-party APIs and paid plugins or applications are purchased directly under the client's own accounts wherever possible. The client retains account ownership, billing control and administrative access, and is responsible for third-party subscriptions, usage charges and renewals. We will not represent third-party services as free or included unless the written proposal explicitly says so.</p>
          <p>The client retains ownership of materials it supplies, subject to any rights held by their original owners. Once all project fees are paid, the client may use the final custom deliverables created specifically for the project as described in the proposal. Pre-existing Studio tools, reusable components, methods, know-how, open-source software and third-party assets remain subject to their respective ownership and licences.</p>
        </section>
        <section>
          <h2>7. Client responsibilities</h2>
          <p>The client must provide accurate content, approvals, access and instructions in a timely manner, and must have the rights and permissions needed to use all supplied text, images, trademarks, data and other materials. The client is responsible for the accuracy and legality of its products, services, claims, privacy notices, cookie notices, terms, payment practices and business operations.</p>
        </section>
        <section>
          <h2>8. Delivery, review and launch</h2>
          <p>Timelines are estimates based on the agreed scope and depend on receiving required content, feedback, approvals and third-party access. Delays in those dependencies may move delivery dates. The client should review the website before launch and report material issues against the agreed scope.</p>
        </section>
        <section>
          <h2>9. Third-party platforms and availability</h2>
          <p>Websites may rely on hosting companies, domain registrars, payment providers, APIs, plugins, browsers and other third parties. Their availability, security, pricing and terms are outside the Studio's control. We do not guarantee uninterrupted operation or the continued availability of a third-party product.</p>
        </section>
        <section>
          <h2>10. Acceptable use and project suspension</h2>
          <p>Clients must not use deliverables or Studio services for unlawful activity, infringement, fraud, malware, harassment or other harmful purposes. We may suspend work or access where reasonably necessary to address non-payment, security risks or unlawful use, subject to the project agreement and applicable law.</p>
        </section>
        <section>
          <h2>11. Warranties and limitation</h2>
          <p>We will perform agreed services with reasonable care and skill. Except for commitments expressly stated in a written agreement, we do not guarantee specific search rankings, sales, conversion rates, traffic levels, revenue, uninterrupted availability or compatibility with every third-party system. To the extent permitted by law, neither party is liable for indirect or consequential losses. Nothing in these terms excludes liability that cannot lawfully be excluded or limits statutory rights.</p>
        </section>
        <section>
          <h2>12. Cancellation and refunds</h2>
          <p>Cancellation and refund requests are handled under our <a href="/refund-cancellation">Refund & Cancellation Policy</a> and any project-specific agreement. If the two conflict, mandatory law applies and the project-specific agreement governs to the extent legally permitted.</p>
        </section>
        <section>
          <h2>13. Changes to these terms</h2>
          <p>We may revise these terms from time to time. The version published on this page applies to new enquiries from its stated update date. Existing projects remain subject to the terms accepted for those projects unless both parties agree otherwise.</p>
        </section>
        <section>
          <h2>14. Governing law</h2>
          <p>Unless a project-specific agreement states otherwise, these terms are intended to be governed by the laws of India. Courts with competent jurisdiction in India will have jurisdiction, subject to mandatory consumer protection laws and any rights that cannot lawfully be waived.</p>
        </section>
        <div className="legal-contact"><h2>Questions about a project?</h2><p>Contact <a href="mailto:support@thekittycorp.com">support@thekittycorp.com</a> or <a href="https://wa.me/919241619573" target="_blank" rel="noreferrer">message the Studio on WhatsApp</a>.</p></div>
      </main>
      <SiteFooter />
    </>
  );
}
