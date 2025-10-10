// app/components/legal/CookiesPolicySection.tsx
import React from "react";

type CookieRow = {
  name: string;
  provider: string;
  type: "Strictly Necessary" | "Performance / Analytics" | "Functionality" | "Advertising / Targeting";
  purpose: string;
  duration: string; // e.g., "Session", "24 hours", "13 months", "2 years"
  party: "First-party" | "Third-party";
};

type Props = {
  companyName?: string;
  website?: string;
  contactEmail?: string;
  postalAddress?: string;
  effectiveDate?: string; // e.g., "10 Oct 2025"
  cookies?: CookieRow[];
};

const ACCENT = "#C6F24E";

const DEFAULT_COOKIES: CookieRow[] = [
  {
    name: "configgo_session",
    provider: "configgo.com",
    type: "Strictly Necessary",
    purpose: "Maintains your authenticated session and security state.",
    duration: "Session",
    party: "First-party",
  },
  {
    name: "cookie_preferences",
    provider: "configgo.com",
    type: "Strictly Necessary",
    purpose: "Stores your consent choices for cookie categories.",
    duration: "6 months",
    party: "First-party",
  },
  {
    name: "_ga",
    provider: "google.com",
    type: "Performance / Analytics",
    purpose: "Helps measure site usage to improve performance and features.",
    duration: "2 years",
    party: "Third-party",
  },
  {
    name: "_gid",
    provider: "google.com",
    type: "Performance / Analytics",
    purpose: "Differentiates users for analytics on a per-day basis.",
    duration: "24 hours",
    party: "Third-party",
  },
  {
    name: "_ga_<container-id>",
    provider: "google.com",
    type: "Performance / Analytics",
    purpose: "Persists a session state for GA4 measurement.",
    duration: "2 years",
    party: "Third-party",
  },
];

export default function CookiesPolicySection({
  companyName = "Configgo",
  website = "https://configgo.com",
  contactEmail = "privacy@configgo.com",
  postalAddress = "Çankaya, Ankara, Türkiye",
  effectiveDate = "10 Oct 2025",
  cookies = DEFAULT_COOKIES,
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
              Cookies
            </span>{" "}
            Policy
          </h1>
          <p className="mt-3 text-white/70">
            Last updated: <span className="text-white/90">{effectiveDate}</span>
          </p>
          <p className="mt-2 text-white/60 text-sm">
            This Cookies Policy explains how <strong>{companyName}</strong> uses cookies and similar technologies on{" "}
            <strong>{website}</strong>.
          </p>
        </header>

        {/* Intro */}
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 mb-10">
          <p className="text-white/85">
            Cookies are small text files placed on your device. They help run the site, remember your preferences,
            analyze performance, and support features. Some cookies are essential; others may require your consent
            depending on your jurisdiction.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="/privacy-policy"
              className="inline-flex items-center gap-2 h-[38px] px-4 rounded-lg text-[14px] text-white/90 ring-1 ring-white/15 hover:bg-white/10"
            >
              Read Privacy Policy
            </a>
          </div>
        </div>

        {/* Content grid: main (wider) + mini TOC */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main (wider) */}
          <div className="md:col-span-9 space-y-6">
            <Article
              id="what-are-cookies"
              title="1) What Are Cookies?"
              body={
                <>
                  <p>
                    Cookies are small data files stored on your browser or device. They may be set by {companyName} (first-party)
                    or by third parties (e.g., analytics providers). We also use related technologies such as pixels and
                    local storage; we refer to all of these as “cookies” in this Policy.
                  </p>
                </>
              }
            />

            <Article
              id="types"
              title="2) Types of Cookies We Use"
              body={
                <>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Strictly Necessary:</strong> Required for core functionality like authentication, security,
                      and load balancing. These cannot be switched off in our systems.
                    </li>
                    <li>
                      <strong>Performance / Analytics:</strong> Help us understand usage to improve performance and
                      features (aggregated statistics, page performance).
                    </li>
                    <li>
                      <strong>Functionality:</strong> Remember choices (e.g., language, preferences) to personalize your experience.
                    </li>
                    <li>
                      <strong>Advertising / Targeting:</strong> Used by us or partners to deliver relevant content or measure campaigns
                      (only if applicable to your configuration).
                    </li>
                  </ul>
                </>
              }
            />

            <Article
              id="cookies-we-use"
              title="3) Cookies We Use"
              body={
                <>
                  <p className="mb-3 text-white/80">
                    The table below lists common cookies used on {website}. Specific names and durations can vary by browser,
                    device, and provider updates.
                  </p>
                  <CookiesTable rows={cookies} />
                  <p className="mt-3 text-xs text-white/60">
                    Note: Third-party providers control their own cookie names, durations, and purposes, which may change.
                    Review their policies for details.
                  </p>
                </>
              }
            />

            <Article
              id="legal-basis"
              title="4) Legal Basis & Consent"
              body={
                <>
                  <p>
                    Where required by law, we rely on your <strong>consent</strong> to place non-essential cookies
                    (e.g., analytics, advertising). Strictly necessary cookies are used based on our{" "}
                    <strong>legitimate interests</strong> to provide secure, reliable services.
                  </p>
                </>
              }
            />

            <Article
              id="managing-cookies"
              title="5) Managing Cookies"
              body={
                <>
                  <p>
                    You can block or delete cookies in your browser settings. Most browsers also allow you to control
                    cookies on a site-by-site basis. If you block essential cookies, some features may not function
                    properly.
                  </p>
                </>
              }
            />

            <Article
              id="do-not-track"
              title="6) Do Not Track & Global Privacy Control"
              body={
                <>
                  <p>
                    Your browser may offer “Do Not Track” (DNT) or Global Privacy Control (GPC) signals. We honor
                    applicable signals where required by law and by the capabilities of our consent tools.
                  </p>
                </>
              }
            />

            <Article
              id="retention"
              title="7) Retention"
              body={
                <>
                  <p>
                    Cookie retention depends on type and purpose. Session cookies expire when you close your browser.
                    Persistent cookies remain until their set expiration or until you delete them.
                  </p>
                </>
              }
            />

            <Article
              id="third-parties"
              title="8) Third-Party Cookies"
              body={
                <>
                  <p>
                    Some cookies are set by third parties. We do not control these cookies and recommend reviewing the
                    respective third-party privacy and cookie policies for more information and opt-out options.
                  </p>
                </>
              }
            />

            <Article
              id="changes"
              title="9) Changes to This Policy"
              body={
                <>
                  <p>
                    We may update this Cookies Policy from time to time. We will post the new version with an updated
                    “Last updated” date and, where required, provide additional notice.
                  </p>
                </>
              }
            />

            <Article
              id="contact"
              title="10) Contact Us"
              body={
                <>
                  <p>
                    Questions about this Cookies Policy? Contact{" "}
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
                  ["What Are Cookies?", "#what-are-cookies"],
                  ["Types We Use", "#types"],
                  ["Cookies We Use", "#cookies-we-use"],
                  ["Legal Basis & Consent", "#legal-basis"],
                  ["Managing Cookies", "#managing-cookies"],
                  ["DNT & GPC", "#do-not-track"],
                  ["Retention", "#retention"],
                  ["Third-Party Cookies", "#third-parties"],
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

function CookiesTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl ring-1 ring-white/10">
      <table className="min-w-full text-left text-sm text-white/85">
        <thead className="bg-white/5 text-white/80">
          <tr>
            {["Name", "Provider", "Type", "Purpose", "Duration", "Party"].map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((r, idx) => (
            <tr key={`${r.name}-${idx}`} className="hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-white">{r.name}</td>
              <td className="px-4 py-3">{r.provider}</td>
              <td className="px-4 py-3">{r.type}</td>
              <td className="px-4 py-3">{r.purpose}</td>
              <td className="px-4 py-3">{r.duration}</td>
              <td className="px-4 py-3">{r.party}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
