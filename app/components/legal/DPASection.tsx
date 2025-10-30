// app/components/legal/DPASection.tsx
import React from "react";

type ProcessingRow = {
  purpose: string;
  nature: string;
  categoriesOfData: string;
  dataSubjects: string;
  duration: string;
};

type SubProcessorRow = {
  name: string;
  purpose: string;
  location: string;
  dataCategories: string;
  safeguards: string;
};

type Props = {
  companyName?: string;
  website?: string;
  contactEmail?: string;
  postalAddress?: string;
  effectiveDate?: string; // e.g., "10 Oct 2025"
  processing?: ProcessingRow[];
  subprocessors?: SubProcessorRow[];
};

const ACCENT = "#C6F24E";

const DEFAULT_PROCESSING: ProcessingRow[] = [
  {
    purpose: "Provide, maintain, and secure the Services",
    nature: "Hosting, storage, transmission, display, backup, and support",
    categoriesOfData:
      "Account data (name, email), usage logs, device/network metadata, customer-provided content",
    dataSubjects: "Customer personnel, end users authorized by Customer",
    duration:
      "For the term of the Main Agreement, plus retention required for legal/defense obligations",
  },
  {
    purpose: "Improve and analyze Service performance",
    nature: "Aggregated analytics, troubleshooting, quality and feature development",
    categoriesOfData: "Pseudonymous identifiers, usage events, performance metrics",
    dataSubjects: "Customer personnel, end users authorized by Customer",
    duration: "Ongoing during the term; aggregated data may be retained in de-identified form",
  },
];

const DEFAULT_SUBPROCESSORS: SubProcessorRow[] = [
  {
    name: "Cloud Infrastructure Provider",
    purpose: "Compute, storage, networking, and backup",
    location: "EU and Türkiye (as configured); global redundancy where applicable",
    dataCategories: "All categories necessary to host and operate the Services",
    safeguards: "SCCs/adequacy (if applicable), ISO 27001/27017/27018, encryption at rest/in transit",
  },
  {
    name: "Email Delivery Provider",
    purpose: "Transactional and operational emails",
    location: "Global",
    dataCategories: "Contact data (email), delivery events/metadata",
    safeguards: "SCCs/adequacy (if applicable), TLS in transit, DPA with security commitments",
  },
  {
    name: "Analytics Provider",
    purpose: "Usage analytics to improve reliability and features",
    location: "EU/US (regional controls where applicable)",
    dataCategories: "Pseudonymous identifiers, page/app events, device/browser metadata",
    safeguards: "IP truncation/pseudonymization, SCCs/adequacy (if applicable), DPA",
  },
];

export default function DPASection({
  companyName = "Configgo",
  website = "https://configgo.com",
  contactEmail = "legal@configgo.com",
  postalAddress = "Çankaya, Ankara, Türkiye",
  effectiveDate = "10 Oct 2025",
  processing = DEFAULT_PROCESSING,
  subprocessors = DEFAULT_SUBPROCESSORS,
}: Props) {
  return (
    <section className="relative scroll-mt-[22vh]">
      {/* subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_40%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      {/* widened container + header-safe top padding (mobile/tablet/desktop) */}
      <div
        className="
          relative z-[1] mx-auto max-w-[1450px] px-6 md:px-8
          pt-[16vh] sm:pt-[18vh] md:pt-[20vh] lg:pt-[22vh]
          pb-16 md:pb-24
        "
      >
        {/* Header */}
        <header className="mb-10 md:mb-14 text-center">
          <p className="typo-small-heading text-white/70">Legal</p>
          <h1 className="typo-h2-md mt-2">
            <span className="text-[color:var(--accent)]" style={{ ["--accent" as any]: ACCENT }}>
              Data Processing
            </span>{" "}
            Addendum (DPA)
          </h1>
          <p className="mt-3 text-white/70">
            Last updated: <span className="text-white/90">{effectiveDate}</span>
          </p>
          <p className="mt-2 text-white/60 text-sm">
            This DPA forms part of the agreement between <strong>{companyName}</strong> (“<em>Processor</em>”) and the customer (“<em>Controller</em>”)
            for the use of <strong>{website}</strong> and related services (“<em>Services</em>”).
          </p>
        </header>

        {/* Intro note */}
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 mb-10">
          <p className="text-white/85">
            Capitalized terms not defined here have the meanings in the Main Agreement. To the extent of conflict, this DPA
            prevails over the Main Agreement with respect to processing of personal data, unless the Main Agreement explicitly
            states otherwise.
          </p>
        </div>

        {/* Content grid: main (wider) + mini TOC */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main (wider) */}
          <div className="md:col-span-9 space-y-6">
            <Article
              id="definitions"
              title="1) Definitions"
              body={
                <>
                  <p>
                    “<strong>Applicable Data Protection Laws</strong>” means laws and regulations relating to privacy, data protection,
                    and data security applicable to the processing under this DPA (including, where applicable, GDPR/UK GDPR).
                    “<strong>Personal Data</strong>” means any information relating to an identified or identifiable natural person processed
                    by {companyName} on behalf of Controller. Other terms (e.g., “processing”, “controller”, “processor”) have the meanings
                    given in Applicable Data Protection Laws.
                  </p>
                </>
              }
            />

            <Article
              id="scope-instructions"
              title="2) Scope & Controller Instructions"
              body={
                <>
                  <p>
                    Processor will process Personal Data solely to provide and improve the Services in accordance with Controller’s documented
                    instructions, this DPA, and the Main Agreement. Processor will promptly inform Controller if, in its opinion, an instruction
                    infringes Applicable Data Protection Laws.
                  </p>
                </>
              }
            />

            <Article
              id="details"
              title="3) Details of Processing (Annex I)"
              body={
                <>
                  <p className="mb-3 text-white/80">
                    The nature, purpose, duration, categories of data subjects, and categories of Personal Data are set out below.
                  </p>
                  <ProcessingTable rows={processing} />
                </>
              }
            />

            <Article
              id="security"
              title="4) Security Measures (Annex II)"
              body={
                <>
                  <p>
                    Processor will implement and maintain appropriate technical and organizational measures designed to protect Personal Data
                    against accidental or unlawful destruction, loss, alteration, unauthorized disclosure or access, as described in Annex II,
                    taking into account the state of the art, costs of implementation, and the nature, scope, context, and purposes of processing.
                  </p>
                  <ul className="list-disc pl-5 mt-3 space-y-2">
                    <li>Encryption in transit (TLS) and at rest; key management controls.</li>
                    <li>Access controls (least privilege, MFA/SSO), role-based permissions, periodic access reviews.</li>
                    <li>Secure development lifecycle, code review, dependency scanning, vulnerability management.</li>
                    <li>Logging, monitoring, and alerting; security incident response playbooks.</li>
                    <li>Backups, disaster recovery, and business continuity testing.</li>
                    <li>Personnel confidentiality and security training; background checks as permitted by law.</li>
                  </ul>
                </>
              }
            />

            <Article
              id="confidentiality"
              title="5) Personnel & Confidentiality"
              body={
                <>
                  <p>
                    Processor ensures that personnel authorized to process Personal Data are bound by confidentiality obligations and receive
                    appropriate privacy and security training.
                  </p>
                </>
              }
            />

            <Article
              id="subprocessors"
              title="6) Sub-processors (Annex III)"
              body={
                <>
                  <p>
                    Controller authorizes Processor to engage sub-processors to support the Services. Processor will impose data protection
                    obligations no less protective than those in this DPA and remains responsible for their performance. Current sub-processors
                    are listed in Annex III.
                  </p>
                  <SubProcessorTable rows={subprocessors} className="mt-3" />
                </>
              }
            />

            <Article
              id="transfers"
              title="7) International Transfers"
              body={
                <>
                  <p>
                    Where processing involves transfers of Personal Data to a country without an adequate level of protection, the parties
                    will rely on appropriate safeguards such as Standard Contractual Clauses (including any applicable UK or other addenda),
                    or other mechanisms permitted by Applicable Data Protection Laws.
                  </p>
                </>
              }
            />

            <Article
              id="assistance"
              title="8) Assistance to Controller"
              body={
                <>
                  <p>
                    Taking into account the nature of processing, Processor will assist Controller with reasonable technical and organizational
                    measures in fulfilling Controller’s obligations to respond to requests to exercise data subject rights, conduct DPIAs, and
                    consult supervisory authorities where required.
                  </p>
                </>
              }
            />

            <Article
              id="breach"
              title="9) Personal Data Breach"
              body={
                <>
                  <p>
                    Processor will notify Controller without undue delay after becoming aware of a Personal Data Breach affecting Controller’s
                    Personal Data, and will provide information reasonably required to support Controller’s obligations under Applicable Data
                    Protection Laws.
                  </p>
                </>
              }
            />

            <Article
              id="audits"
              title="10) Audits & Certifications"
              body={
                <>
                  <p>
                    Upon reasonable prior notice and subject to confidentiality and safety controls, Processor will make available information
                    necessary to demonstrate compliance with this DPA and allow for audits (including inspections) conducted by Controller or
                    an independent auditor mandated by Controller, to the extent required by Applicable Data Protection Laws.
                  </p>
                </>
              }
            />

            <Article
              id="return-deletion"
              title="11) Return & Deletion of Data"
              body={
                <>
                  <p>
                    Upon termination or expiry of the Services, Processor will, at Controller’s choice, delete or return Personal Data and will
                    delete existing copies unless retention is required by law or for establishment, exercise, or defense of legal claims.
                  </p>
                </>
              }
            />

            <Article
              id="records"
              title="12) Records & Cooperation"
              body={
                <>
                  <p>
                    Processor will maintain records of processing as required by Applicable Data Protection Laws and will cooperate with competent
                    supervisory authorities upon lawful request.
                  </p>
                </>
              }
            />

            <Article
              id="liability"
              title="13) Liability"
              body={
                <>
                  <p>
                    The parties’ liability under this DPA is subject to the limitations and exclusions set out in the Main Agreement, unless
                    otherwise mandated by Applicable Data Protection Laws.
                  </p>
                </>
              }
            />

            <Article
              id="precedence-law"
              title="14) Precedence, Governing Law & Venue"
              body={
                <>
                  <p>
                    In the event of a conflict between this DPA and the Main Agreement, this DPA controls with respect to processing of Personal Data.
                    Unless the Main Agreement specifies otherwise, this DPA is governed by the laws of the Republic of Türkiye, and the courts of
                    Ankara shall have exclusive jurisdiction, subject to mandatory Applicable Data Protection Laws.
                  </p>
                </>
              }
            />

            <Article
              id="contact"
              title="15) Contact"
              body={
                <>
                  <p>
                    Questions about this DPA? Contact{" "}
                    <a href={`mailto:${contactEmail}`} className="underline decoration-white/30 hover:decoration-white">
                      {contactEmail}
                    </a>{" "}
                    or write to: {postalAddress}.
                  </p>
                  <div className="mt-4 rounded-lg border border-white/10 p-3 text-xs text-white/60">
                    <p className="mb-1 font-semibold text-white/75">Note</p>
                    <p>
                      This template is provided for general information only and isn’t legal advice. Adapt to the Main Agreement,
                      your processing activities, and jurisdictional requirements.
                    </p>
                  </div>
                </>
              }
            />
          </div>

          {/* Mini TOC (sticks below header on md+) */}
          <aside className="md:col-span-3">
            <nav className="md:sticky md:top-[22vh] rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
              <p className="text-white/80 font-semibold">On this page</p>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                {[
                  ["Definitions", "#definitions"],
                  ["Scope & Instructions", "#scope-instructions"],
                  ["Processing Details (Annex I)", "#details"],
                  ["Security Measures (Annex II)", "#security"],
                  ["Personnel & Confidentiality", "#confidentiality"],
                  ["Sub-processors (Annex III)", "#subprocessors"],
                  ["International Transfers", "#transfers"],
                  ["Assistance to Controller", "#assistance"],
                  ["Breach", "#breach"],
                  ["Audits", "#audits"],
                  ["Return & Deletion", "#return-deletion"],
                  ["Records", "#records"],
                  ["Liability", "#liability"],
                  ["Precedence & Law", "#precedence-law"],
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

        {/* Annex II — TOMs */}
        <div className="mt-12 space-y-6">
          <h2 className="text-white text-xl font-semibold">
            <span
              className="mr-2 inline-block h-5 w-1.5 align-middle rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            Annex II — Technical & Organizational Measures
          </h2>
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:pt-7 md:px-7">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Organization & Policies:</strong> Security governance, policies, training, vendor management.
              </li>
              <li>
                <strong>Access Control:</strong> MFA/SSO, least privilege, role separation, periodic reviews, immediate revocation.
              </li>
              <li>
                <strong>Encryption:</strong> TLS for data in transit; encryption at rest; secrets management.
              </li>
              <li>
                <strong>Hardening & Development:</strong> Secure coding, code review, dependency scanning, IaC baselines.
              </li>
              <li>
                <strong>Monitoring & Logging:</strong> Centralized logs, retention, anomaly detection, alerting.
              </li>
              <li>
                <strong>Vulnerability Management:</strong> Regular scanning, patch SLAs, penetration tests.
              </li>
              <li>
                <strong>Resilience:</strong> Backups, replication, DR testing, RPO/RTO objectives.
              </li>
              <li>
                <strong>Physical Security:</strong> Data centers with access control, surveillance, and environmental controls.
              </li>
              <li>
                <strong>Incident Response:</strong> Documented runbooks, roles, communication plans, post-incident review.
              </li>
              <li>
                <strong>Privacy by Design:</strong> Data minimization, purpose limitation, retention, pseudonymization where suitable.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Subcomponents ----------------- */

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
    <article
      id={id}
      className="
        scroll-mt-[16vh] sm:scroll-mt-[18vh] md:scroll-mt-[20vh] lg:scroll-mt-[22vh]
        rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7
      "
    >
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

function ProcessingTable({ rows }: { rows: ProcessingRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl ring-1 ring-white/10">
      <table className="min-w-full text-left text-sm text-white/85">
        <thead className="bg-white/5 text-white/80">
          <tr>
            {["Purpose", "Nature", "Categories of Personal Data", "Data Subjects", "Duration"].map(
              (h) => (
                <th key={h} className="px-4 py-3 font-semibold">
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-white">{r.purpose}</td>
              <td className="px-4 py-3">{r.nature}</td>
              <td className="px-4 py-3">{r.categoriesOfData}</td>
              <td className="px-4 py-3">{r.dataSubjects}</td>
              <td className="px-4 py-3">{r.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SubProcessorTable({
  rows,
  className = "",
}: {
  rows: SubProcessorRow[];
  className?: string;
}) {
  return (
    <div className={`overflow-x-auto rounded-xl ring-1 ring-white/10 ${className}`}>
      <table className="min-w-full text-left text-sm text-white/85">
        <thead className="bg-white/5 text-white/80">
          <tr>
            {["Sub-processor", "Purpose", "Location", "Data Categories", "Safeguards"].map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-white">{r.name}</td>
              <td className="px-4 py-3">{r.purpose}</td>
              <td className="px-4 py-3">{r.location}</td>
              <td className="px-4 py-3">{r.dataCategories}</td>
              <td className="px-4 py-3">{r.safeguards}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
