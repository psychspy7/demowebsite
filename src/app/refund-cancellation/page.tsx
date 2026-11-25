import type { Metadata } from "next";
import { SiteNav, SiteFooter } from "@/components/brand";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "How cancellations and refunds are handled for KITTY CORP Studio website projects and maintenance plans.",
  alternates: { canonical: "https://business.thekittycorp.com/refund-cancellation" },
};

export default function RefundCancellation() {
  return (
    <>
      <SiteNav />
      <main className="legal-page">
        <span className="eyebrow">LEGAL · BILLING</span>
        <h1>Refund & Cancellation Policy</h1>
        <p className="legal-updated">Last updated: 25 November 2026</p>
        <p className="legal-intro">We want project commitments and payment expectations to be clear before work begins. This policy applies to website development and Studio maintenance services unless a written project agreement provides a different arrangement or applicable law requires otherwise.</p>

        <section>
          <h2>1. Before work begins</h2>
          <p>If you cancel before project work has started, we will refund amounts paid for the project, less any non-refundable payment processing charges or third-party costs already incurred with your authorisation. If no such costs have been incurred, the project payment will be refunded in full.</p>
        </section>
        <section>
          <h2>2. After work has started</h2>
          <p>If you cancel after work begins, we will calculate the value of work completed up to the cancellation date, including completed milestones and approved deliverables, plus any authorised non-refundable third-party costs. Any remaining unearned balance will be refunded. Work already completed and delivered or accepted is not refundable, except where required by law or agreed in writing.</p>
        </section>
        <section>
          <h2>3. Domain, hosting, APIs and paid tools</h2>
          <p>Domain registration, hosting, third-party APIs, paid plugins/apps and other external services are normally purchased directly under your own accounts. Their charges, renewal rules and refund decisions are controlled by the relevant provider, not by KITTY CORP Studio. If we purchase a third-party item on your behalf with your approval, any amount the provider will not refund may be deducted from the project refund, with the cost explained to you.</p>
        </section>
        <section>
          <h2>4. Maintenance plans</h2>
          <p>Each website project includes one month of maintenance after launch. Any paid maintenance plan begins only after you choose and confirm it in writing. Monthly maintenance can be cancelled before the next billing period; cancellation takes effect at the end of the period already paid for. For an annual plan, you may request cancellation before the next annual renewal. Fees for a current month or annual period are not refundable once that period has started, except where required by law or expressly agreed in writing.</p>
          <p>The annual option is $1,000 for 12 months, compared with $1,200 at the monthly rate. The two-month equivalent saving is reflected in the annual price; it is not a cash rebate.</p>
        </section>
        <section>
          <h2>5. When a refund may not be available</h2>
          <p>Refunds are generally not available for completed and accepted work, services already performed, third-party charges that the provider will not refund, or delays and rework caused by missing client content, approvals or access. This does not affect rights that cannot be excluded under applicable law.</p>
        </section>
        <section>
          <h2>6. How to request a cancellation or refund</h2>
          <p>Email <a href="mailto:support@thekittycorp.com">support@thekittycorp.com</a> with your name, project or invoice reference, the service concerned and the reason for the request. We may ask for reasonable information to verify the request. We will review it against this policy and the written project agreement and reply with the calculation, if a refund is due.</p>
        </section>
        <section>
          <h2>7. Refund processing time</h2>
          <p>Approved refunds will normally be initiated to the original payment method within 5–10 business days. Your bank, card issuer or payment provider may take additional time to show the funds. Any non-refundable processing charges will be explained before the refund is completed.</p>
        </section>
        <section>
          <h2>8. Changes to this policy</h2>
          <p>We may update this policy when our services or legal requirements change. The version published here applies to new project enquiries from its stated update date. Existing signed project agreements remain subject to their agreed terms, except where mandatory law says otherwise.</p>
        </section>
        <div className="legal-contact"><h2>Need help?</h2><p>Contact <a href="mailto:support@thekittycorp.com">support@thekittycorp.com</a>. We will review cancellation and refund requests individually and explain the applicable calculation.</p></div>
      </main>
      <SiteFooter />
    </>
  );
}
