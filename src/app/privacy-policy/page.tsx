import type { Metadata } from "next";
import { SiteNav, SiteFooter } from "@/components/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How KITTY CORP Studio collects, uses and protects information when you use its website or contact the team.",
  alternates: { canonical: "https://business.thekittycorp.com/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <>
      <SiteNav />
      <main className="legal-page">
        <span className="eyebrow">LEGAL · PRIVACY</span>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: 25 November 2026</p>
        <p className="legal-intro">This policy explains how KITTY CORP Studio handles information when you visit business.thekittycorp.com, contact our team, or discuss a website project with us. We aim to collect only what is reasonably needed and to handle it responsibly.</p>

        <section>
          <h2>1. Who operates this website</h2>
          <p>This website is operated under the KITTY CORP brand by the KITTY CORP Studio team. The legal contracting party for a particular project will be identified in that project's written proposal, invoice or agreement. For privacy questions, contact <a href="mailto:support@thekittycorp.com">support@thekittycorp.com</a>.</p>
        </section>
        <section>
          <h2>2. Information we may collect</h2>
          <ul>
            <li>Contact details you choose to share, such as your name, email address, phone number, business name and country.</li>
            <li>Project information, messages, requirements, files or other material you send to us.</li>
            <li>Basic technical and usage information, such as pages viewed, browser and device details, approximate location, referral source and diagnostic logs.</li>
            <li>Correspondence and records needed to manage a proposal, project, support request or business relationship.</li>
          </ul>
          <p>Please do not send passwords, payment-card details or other sensitive information through ordinary contact messages.</p>
        </section>
        <section>
          <h2>3. How we use information</h2>
          <p>We use information to respond to enquiries, prepare proposals, communicate about projects, provide agreed services and support, maintain website security, prevent abuse, improve the website, and meet applicable legal or accounting obligations.</p>
        </section>
        <section>
          <h2>4. Analytics, cookies and similar technologies</h2>
          <p>This website uses Google Analytics to understand aggregate website usage and improve its content and performance. Analytics may use cookies or similar technologies to distinguish visits and collect technical usage information. You can manage or delete cookies through your browser settings; blocking them may affect some website features. Google provides information about its data practices and available controls in its own privacy documentation.</p>
        </section>
        <section>
          <h2>5. When information is shared</h2>
          <p>We do not sell personal information. We may share the minimum information needed with service providers that help us operate the website or deliver a project, such as website hosting, analytics, communication, domain registration or technical infrastructure providers. We may also disclose information where required by law, to protect rights and security, or as part of a business transfer where permitted by law.</p>
          <p>For client projects, hosting, third-party APIs and paid plugins/apps are intended to be purchased directly under the client's own accounts wherever possible. Those providers process information under their own terms and privacy policies.</p>
        </section>
        <section>
          <h2>6. Client websites and enquiry data</h2>
          <p>When we build a website for a client, that client is generally responsible for deciding what personal information their website collects and for publishing the appropriate privacy notices to its visitors. Where we provide technical hosting, maintenance or processing, our role and responsibilities will be defined in the project agreement and relevant provider terms. Visitors should contact the business operating the client website about enquiries submitted to that business.</p>
        </section>
        <section>
          <h2>7. International processing and security</h2>
          <p>Some service providers may process information in countries other than your own. Where applicable, we use reasonable contractual or other safeguards. We apply reasonable technical and organisational measures designed to protect information, but no internet transmission or storage system can be guaranteed to be completely secure.</p>
        </section>
        <section>
          <h2>8. Retention</h2>
          <p>We keep information for as long as reasonably necessary for the purposes described above, including project delivery, support, record keeping, dispute resolution and legal compliance. Retention periods vary depending on the type of information and the context in which it was collected.</p>
        </section>
        <section>
          <h2>9. Your choices and rights</h2>
          <p>Depending on where you live and the laws that apply, you may have rights to request access to, correction or deletion of personal information, to object to or restrict certain processing, or to withdraw consent where processing is based on consent. To make a request, email us. We may need to verify your identity and may retain information where the law permits or requires it.</p>
        </section>
        <section>
          <h2>10. Children</h2>
          <p>This website and our services are intended for businesses and adults. We do not knowingly seek to collect personal information from children. If you believe a child has provided information to us, contact us so we can review the request.</p>
        </section>
        <section>
          <h2>11. Changes to this policy</h2>
          <p>We may update this policy when our practices or legal requirements change. The updated version will be posted on this page with a revised date.</p>
        </section>
        <div className="legal-contact"><h2>Privacy contact</h2><p>Questions or requests: <a href="mailto:support@thekittycorp.com">support@thekittycorp.com</a>.</p></div>
      </main>
      <SiteFooter />
    </>
  );
}
