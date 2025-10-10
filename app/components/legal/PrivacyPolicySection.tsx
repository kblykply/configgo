// app/components/legal/PrivacyPolicySection.tsx
import React from "react";

type Props = {
  companyName?: string;
  website?: string;
  contactEmail?: string;
  postalAddress?: string;
  effectiveDate?: string; // e.g., "10 Oct 2025"
};

const ACCENT = "#C6F24E";

export default function PrivacyPolicySection({
  companyName = "Configgo",
  website = "https://configgo.com",
  contactEmail = "privacy@configgo.com",
  postalAddress = "Çankaya, Ankara, Türkiye",
  effectiveDate = "10 Oct 2025",
}: Props) {
  return (
    <section className="relative scroll-mt-[22vh]">
      {/* subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_40%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      {/* widened container + header-safe top padding */}
      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 md:px-8 pt-[18vh] lg:pt-[22vh] pb-16 md:pb-24">
        {/* Header */}
        <header className="mb-10 md:mb-14 text-center">
          <p className="typo-small-heading text-white/70">Legal</p>
          <h1 className="typo-h2-md mt-2">
            <span className="text-[color:var(--accent)]" style={{ ["--accent" as any]: ACCENT }}>
              Privacy
            </span>{" "}
            Policy
          </h1>
          <p className="mt-3 text-white/70">
            Last updated: <span className="text-white/90">{effectiveDate}</span>
          </p>
        </header>

        {/* Intro */}
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 mb-10">
          <p className="text-white/85">
            This Privacy Policy explains how <strong>{companyName}</strong> (“we”, “us”, or “our”)
            collects, uses, discloses, and protects your information when you use{" "}
            <strong>{website}</strong> and our related products and services (collectively, the
            “Services”). By using the Services, you agree to the practices described here.
          </p>
        </div>

        {/* Content grid: main (wider) + mini TOC */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main (wider) */}
          <div className="md:col-span-9 space-y-6">
            <Article
              id="who-we-are"
              title="1) Who We Are"
              body={
                <>
                  <p>
                    The data controller is <strong>{companyName}</strong>. You can contact us at{" "}
                    <a href={`mailto:${contactEmail}`} className="underline decoration-white/30 hover:decoration-white">
                      {contactEmail}
                    </a>{" "}
                    or by mail at {postalAddress}.
                  </p>
                </>
              }
            />

            <Article
              id="data-we-collect"
              title="2) Data We Collect"
              body={
                <>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Account & Contact Data:</strong> name, email, phone, company, role.
                    </li>
                    <li>
                      <strong>Usage Data:</strong> pages viewed, features used, clicks, session logs,
                      referring URLs, and timestamps.
                    </li>
                    <li>
                      <strong>Device & Network Data:</strong> IP address, device type, OS, browser,
                      language, approximate location (derived from IP).
                    </li>
                    <li>
                      <strong>Content You Provide:</strong> messages, files, forms, preferences, and
                      other inputs you upload or submit.
                    </li>
                    <li>
                      <strong>Cookies & Similar Tech:</strong> used for authentication, preferences,
                      analytics, and performance. See the “Cookies” section.
                    </li>
                  </ul>
                </>
              }
            />

            <Article
              id="purposes-legal-basis"
              title="3) Purposes & Legal Basis"
              body={
                <>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Provide & Operate the Services</strong> — to create/maintain accounts,
                      deliver features, support, and security. <em>Legal basis:</em> performance of a
                      contract; legitimate interests.
                    </li>
                    <li>
                      <strong>Improve & Analyze</strong> — to monitor performance, fix bugs, and
                      develop new features. <em>Legal basis:</em> legitimate interests or consent (for
                      certain analytics/telemetry where required).
                    </li>
                    <li>
                      <strong>Communications</strong> — service updates, transactional emails, and
                      marketing (where permitted). <em>Legal basis:</em> legitimate interests or
                      consent; you can opt out of marketing anytime.
                    </li>
                    <li>
                      <strong>Compliance & Protection</strong> — to meet legal obligations, prevent
                      fraud/abuse, protect our rights and users. <em>Legal basis:</em> legal
                      obligations; legitimate interests.
                    </li>
                  </ul>
                </>
              }
            />

            <Article
              id="sharing"
              title="4) How We Share Information"
              body={
                <>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Vendors/Processors:</strong> hosting, analytics, communications, and
                      support providers under data-processing agreements.
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> in mergers, acquisitions, or asset sales,
                      data may be transferred as part of the transaction.
                    </li>
                    <li>
                      <strong>Legal & Safety:</strong> to comply with law, enforce terms, or protect
                      rights, property, or safety.
                    </li>
                    <li>
                      <strong>With Your Direction:</strong> when you connect third-party integrations
                      or share links/exports.
                    </li>
                  </ul>
                </>
              }
            />

            <Article
              id="transfers"
              title="5) International Data Transfers"
              body={
                <>
                  <p>
                    We may transfer, store, and process information in countries outside your own.
                    Where required, we use appropriate safeguards such as Standard Contractual
                    Clauses (SCCs) or equivalent mechanisms, and we assess partners’ security and
                    privacy practices.
                  </p>
                </>
              }
            />

            <Article
              id="retention"
              title="6) Data Retention"
              body={
                <>
                  <p>
                    We keep personal data only for as long as necessary to fulfill the purposes
                    described above, to comply with legal obligations, resolve disputes, and enforce
                    agreements. Retention periods vary based on the type of data and use case.
                  </p>
                </>
              }
            />

            <Article
              id="security"
              title="7) Security"
              body={
                <>
                  <p>
                    We use administrative, technical, and organizational measures designed to protect
                    personal data (e.g., encryption-in-transit, access controls, logging). No system
                    is 100% secure; please use strong passwords and keep them confidential.
                  </p>
                </>
              }
            />

            <Article
              id="rights"
              title="8) Your Rights"
              body={
                <>
                  <p className="mb-2">Depending on your location, you may have rights to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Access, correct, or delete your personal data.</li>
                    <li>Object to or restrict certain processing.</li>
                    <li>Data portability.</li>
                    <li>Withdraw consent where processing is based on consent.</li>
                    <li>Lodge a complaint with a supervisory authority (e.g., under GDPR in the EU/UK).</li>
                  </ul>
                  <p className="mt-3">
                    To exercise these rights, contact us at{" "}
                    <a href={`mailto:${contactEmail}`} className="underline decoration-white/30 hover:decoration-white">
                      {contactEmail}
                    </a>.
                  </p>
                </>
              }
            />

            <Article
              id="cookies"
              title="9) Cookies & Tracking"
              body={
                <>
                  <p>
                    We use cookies and similar technologies for authentication, preferences,
                    analytics, and performance. You can control cookies in your browser settings.
                    Where required, we request consent via a banner. For detailed categories and
                    vendors, see our Cookie Policy.
                  </p>
                </>
              }
            />

            <Article
              id="children"
              title="10) Children’s Privacy"
              body={
                <>
                  <p>
                    Our Services are not directed to children under the age required by applicable
                    law. We do not knowingly collect personal data from such children. If you believe
                    a child has provided us data, contact us and we will take appropriate action.
                  </p>
                </>
              }
            />

            <Article
              id="changes"
              title="11) Changes to This Policy"
              body={
                <>
                  <p>
                    We may update this Policy from time to time. We will post the new version with an
                    updated “Last updated” date and, where required, provide additional notice.
                  </p>
                </>
              }
            />

            <Article
              id="contact"
              title="12) Contact Us"
              body={
                <>
                  <p>
                    Questions about this Policy or our data practices? Email us at{" "}
                    <a href={`mailto:${contactEmail}`} className="underline decoration-white/30 hover:decoration-white">
                      {contactEmail}
                    </a>{" "}
                    or write to: {postalAddress}.
                  </p>
                </>
              }
            />
          </div>

          {/* Mini TOC (sticks below header) */}
          <aside className="md:col-span-3">
            <nav className="sticky top-[22vh] rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
              <p className="text-white/80 font-semibold">On this page</p>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                {[
                  ["Who We Are", "#who-we-are"],
                  ["Data We Collect", "#data-we-collect"],
                  ["Purposes & Legal Basis", "#purposes-legal-basis"],
                  ["Sharing", "#sharing"],
                  ["International Transfers", "#transfers"],
                  ["Retention", "#retention"],
                  ["Security", "#security"],
                  ["Your Rights", "#rights"],
                  ["Cookies", "#cookies"],
                  ["Children’s Privacy", "#children"],
                  ["Changes", "#changes"],
                  ["Contact Us", "#contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="block rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white transition"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
       
            </nav>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Article({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <article id={id} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7">
      <h3 className="text-white text-lg font-semibold">
        <span
          className="mr-2 inline-block h-5 w-1.5 align-middle rounded-full"
          style={{ backgroundColor: ACCENT }}
        />
        {title}
      </h3>
      <div className="prose prose-invert mt-3 max-w-none prose-p:leading-relaxed prose-li:leading-relaxed">
        {body}
      </div>
    </article>
  );
}
