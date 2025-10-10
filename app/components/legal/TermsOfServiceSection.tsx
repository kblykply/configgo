// app/components/legal/TermsOfServiceSection.tsx
import React from "react";

type Props = {
  companyName?: string;
  website?: string;
  contactEmail?: string;
  postalAddress?: string;
  effectiveDate?: string; // e.g., "10 Oct 2025"
};

const ACCENT = "#C6F24E";

export default function TermsOfServiceSection({
  companyName = "Configgo",
  website = "https://configgo.com",
  contactEmail = "legal@configgo.com",
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
              Terms
            </span>{" "}
            of Service
          </h1>
          <p className="mt-3 text-white/70">
            Last updated: <span className="text-white/90">{effectiveDate}</span>
          </p>
          <p className="mt-2 text-white/60 text-sm">
            These Terms govern your access to and use of <strong>{website}</strong> and related services provided by{" "}
            <strong>{companyName}</strong>.
          </p>
        </header>

        {/* Intro note */}
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 mb-10">
          <p className="text-white/85">
            By accessing or using the Services, you agree to these Terms. If you are using the Services on behalf of an
            organization, you represent that you have authority to bind that organization to these Terms.
          </p>
        </div>

        {/* Content grid: main (wider) + mini TOC */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main (wider) */}
          <div className="md:col-span-9 space-y-6">
            <Article
              id="acceptance"
              title="1) Acceptance of Terms"
              body={
                <>
                  <p>
                    These Terms constitute a binding agreement between you and <strong>{companyName}</strong>. If you do
                    not agree, do not use the Services.
                  </p>
                </>
              }
            />

            <Article
              id="eligibility"
              title="2) Eligibility"
              body={
                <>
                  <p>
                    You must be at least the age of majority in your jurisdiction and have the legal capacity to enter a
                    contract. You may use the Services only in compliance with applicable laws.
                  </p>
                </>
              }
            />

            <Article
              id="accounts"
              title="3) Accounts & Security"
              body={
                <>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Provide accurate information and keep your account credentials secure.</li>
                    <li>You are responsible for all activity under your account.</li>
                    <li>Notify us promptly at <a href={`mailto:${contactEmail}`} className="underline decoration-white/30 hover:decoration-white">{contactEmail}</a> of unauthorized use or security incidents.</li>
                  </ul>
                </>
              }
            />

            <Article
              id="subscriptions"
              title="4) Subscriptions, Billing & Trials"
              body={
                <>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Paid plans are billed in advance on a recurring basis unless otherwise stated.</li>
                    <li>Fees are non-refundable except where required by law or expressly provided.</li>
                    <li>We may change prices with reasonable notice for subsequent billing cycles.</li>
                    <li>Trials or beta access may be limited, subject to change, or terminated at any time.</li>
                  </ul>
                </>
              }
            />

            <Article
              id="use"
              title="5) Use of the Services"
              body={
                <>
                  <p>
                    Subject to these Terms, <strong>{companyName}</strong> grants you a limited, non-exclusive,
                    non-transferable license to access and use the Services for your internal business purposes.
                  </p>
                </>
              }
            />

            <Article
              id="acceptable-use"
              title="6) Acceptable Use & Prohibited Conduct"
              body={
                <>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>No unlawful, infringing, harmful, or deceptive activity.</li>
                    <li>No reverse engineering, scraping, or bypassing technical protections.</li>
                    <li>No excessive or abusive usage that degrades service for others.</li>
                    <li>No uploading of malicious code, or attempts to gain unauthorized access.</li>
                  </ul>
                </>
              }
            />

            <Article
              id="content-ip"
              title="7) Content, Ownership & IP"
              body={
                <>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Your Content:</strong> You retain ownership of content you submit. You grant{" "}
                      <strong>{companyName}</strong> a worldwide, non-exclusive license to host, process, display, and
                      transmit your content solely to provide the Services.
                    </li>
                    <li>
                      <strong>Our IP:</strong> The Services, software, and materials are owned by{" "}
                      <strong>{companyName}</strong> or its licensors and are protected by IP laws.
                    </li>
                    <li>
                      <strong>Feedback:</strong> If you provide feedback, you grant{" "}
                      <strong>{companyName}</strong> a perpetual, irrevocable license to use it without restriction.
                    </li>
                  </ul>
                </>
              }
            />

            <Article
              id="third-parties"
              title="8) Third-Party Services & Integrations"
              body={
                <>
                  <p>
                    The Services may interoperate with third-party products. We are not responsible for third-party terms,
                    content, or availability. Your use of third-party services is at your own risk and may be subject to
                    separate terms.
                  </p>
                </>
              }
            />

            <Article
              id="beta"
              title="9) Beta Features"
              body={
                <>
                  <p>
                    We may offer beta or pre-release features identified as such. They are provided “as is,” may contain
                    bugs, and may change or be discontinued at any time.
                  </p>
                </>
              }
            />

            <Article
              id="privacy"
              title="10) Privacy"
              body={
                <>
                  <p>
                    Your use of the Services is also governed by our{" "}
                    <a href="/privacy-policy" className="underline decoration-white/30 hover:decoration-white">
                      Privacy Policy
                    </a>
                    . Please review it to understand how we handle personal data.
                  </p>
                </>
              }
            />

            <Article
              id="disclaimer"
              title="11) Disclaimers"
              body={
                <>
                  <p>
                    THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
                    IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                    NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE ERROR-FREE OR UNINTERRUPTED.
                  </p>
                </>
              }
            />

            <Article
              id="liability"
              title="12) Limitation of Liability"
              body={
                <>
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, <strong>{companyName}</strong> AND ITS AFFILIATES WILL NOT BE
                    LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOST
                    PROFITS, REVENUES, DATA, OR GOODWILL. OUR AGGREGATE LIABILITY RELATING TO THE SERVICES WILL NOT
                    EXCEED THE AMOUNTS PAID BY YOU TO US FOR THE SERVICES IN THE 12 MONTHS BEFORE THE CLAIM AROSE.
                  </p>
                </>
              }
            />

            <Article
              id="indemnity"
              title="13) Indemnification"
              body={
                <>
                  <p>
                    You will defend, indemnify, and hold harmless <strong>{companyName}</strong> from and against claims,
                    damages, liabilities, costs, and expenses (including reasonable legal fees) arising out of or related
                    to your content, your use of the Services, or your violation of these Terms.
                  </p>
                </>
              }
            />

            <Article
              id="termination"
              title="14) Suspension & Termination"
              body={
                <>
                  <p>
                    We may suspend or terminate access for breach of these Terms, legal risk, non-payment, or to protect
                    the Services or users. You may stop using the Services at any time. Certain provisions survive
                    termination (e.g., IP, disclaimers, limitations of liability, indemnity).
                  </p>
                </>
              }
            />

            <Article
              id="law"
              title="15) Governing Law & Venue"
              body={
                <>
                  <p>
                    These Terms are governed by the laws of the Republic of Türkiye, without regard to conflict of laws
                    principles. The courts and enforcement offices of Ankara shall have exclusive jurisdiction and venue,
                    unless another venue is required by mandatory law.
                  </p>
                </>
              }
            />

            <Article
              id="changes"
              title="16) Changes to the Terms"
              body={
                <>
                  <p>
                    We may update these Terms from time to time. We will post the updated version with a revised “Last
                    updated” date and, where required, provide additional notice. Changes become effective when posted,
                    unless otherwise stated.
                  </p>
                </>
              }
            />

            <Article
              id="contact"
              title="17) Contact"
              body={
                <>
                  <p>
                    Questions about these Terms? Email{" "}
                    <a href={`mailto:${contactEmail}`} className="underline decoration-white/30 hover:decoration-white">
                      {contactEmail}
                    </a>{" "}
                    or write to: {postalAddress}.
                  </p>
                  <div className="mt-4 rounded-lg border border-white/10 p-3 text-xs text-white/60">
                    <p className="mb-1 font-semibold text-white/75">Notice</p>
                    <p>This template is provided for general information only and is not legal advice.</p>
                  </div>
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
                  ["Acceptance of Terms", "#acceptance"],
                  ["Eligibility", "#eligibility"],
                  ["Accounts & Security", "#accounts"],
                  ["Subscriptions & Billing", "#subscriptions"],
                  ["Use of the Services", "#use"],
                  ["Acceptable Use", "#acceptable-use"],
                  ["Content & IP", "#content-ip"],
                  ["Third-Party Services", "#third-parties"],
                  ["Beta Features", "#beta"],
                  ["Privacy", "#privacy"],
                  ["Disclaimers", "#disclaimer"],
                  ["Limitation of Liability", "#liability"],
                  ["Indemnification", "#indemnity"],
                  ["Termination", "#termination"],
                  ["Governing Law", "#law"],
                  ["Changes", "#changes"],
                  ["Contact", "#contact"],
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
