// app/components/ContactAndFooter.tsx
"use client";

import Link from "next/link";

type LinkItem = { label: string; href: string };
type LinkGroup = { title: string; links: LinkItem[] };

const GROUPS: LinkGroup[] = [
  {
    title: "Projects",
    links: [
      { label: "Vega Center", href: "/projects#vega-center" },
      { label: "Shelton Visalia", href: "/projects#shelton-visalia" },
      { label: "Paryal Bağlıca", href: "/projects#paryal-baglica" },
      { label: "Vis Vadi", href: "/projects#vis-vadi" },
      { label: "Suare", href: "/projects#suare" },
    ],
  },
  {
    title: "Interactive Sales Tools",
    links: [
      { label: "Unit Filtering & Availability", href: "/digital_twins#filter" },
      { label: "Apartment Detail & Gallery", href: "/digital_twins#unit-detail" },
      { label: "Sun-Path & Weather", href: "/digital_twins#sunpath" },
      { label: "Nearby Places & Distances", href: "/digital_twins#nearby" },
      { label: "View & Orientation Explorer", href: "/digital_twins#views" },
    ],
  },
  {
    title: "Digital Twins",
    links: [
      { label: "Overview & Demo", href: "/digital_twins" },
      { label: "Embeddable Viewer", href: "/digital_twins#embed" },
      { label: "Mobile/Tablet Optimizations", href: "/digital_twins#mobile" },
      { label: "BIM/IFC & GLB Pipeline", href: "/digital_twins#bim" },
      { label: "Performance & Streaming", href: "/digital_twins#performance" },
    ],
  },
  {
    title: "Digital Experience Center",
    links: [
      { label: "Kiosk Mode (Attract Loop)", href: "/digital_twins#kiosk" },
      { label: "Tablet Sales Flow", href: "/digital_twins#tablet" },
      { label: "Agent Handoff & Notes", href: "/crm#handoff" },
      { label: "Offline Cache & Sync", href: "/digital_twins#offline" },
      { label: "Multi-Screen Setup", href: "/digital_twins#multiscreen" },
    ],
  },
];

export default function ContactAndFooter() {
  return (
    <section className="relative overflow-hidden">
      {/* ===== Upper: Contact Area (equal heights) ===== */}
      <div className="mx-auto max-w-[1450px] px-6 md:px-10 pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Left contact card */}
          <div className="lg:col-span-5 flex">
            <div
              className="h-full w-full rounded-2xl p-8
                         bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.12)_100%)]
                         ring-1 ring-white/10 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_24px_60px_rgba(0,0,0,0.45)]
                         flex flex-col justify-start min-h-[420px]"
            >
              <h3 className="text-white font-semibold text-[18px]">Deniz Oktay Tuncay</h3>
              <p className="text-white/70">CEO</p>

              <div className="mt-8 space-y-4 text-[13.5px]">
                <div>
                  <div className="text-white/50">Phone</div>
                  <Link href="tel:+000000000000" className="text-white/70 hover:text-white">
                    +00 000 000 00 00
                  </Link>
                </div>
                <div>
                  <div className="text-white/50">E-mail</div>
                  <Link href="mailto:hello@configgo.com" className="text-white/70 hover:text-white">
                    hello@configgo.com
                  </Link>
                </div>
                <div>
                  <div className="text-white/50">Location</div>
                  <div className="text-white/70">Ankara, Türkiye</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form with green glow */}
          <div className="lg:col-span-7 flex">
            <div
              className="relative h-full w-full rounded-2xl ring-1 ring-white/10 overflow-hidden
                         flex flex-col justify-center min-h-[420px] p-8 md:p-10"
            >
              {/* green glow stretches with the card */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(800px 520px at 60% 22%, rgba(198,242,78,0.32), rgba(198,242,78,0.14) 40%, rgba(0,0,0,0) 70%)",
                }}
              />

              <div className="relative">
                <h2 className="text-white font-semibold text-[26px] md:text-[32px] text-center mb-2">
                  Get in Touch with Us
                </h2>
                <p className="text-white/60 text-center text-[13.5px] mb-6">
                  We’re here to bring your vision to life—let’s start the conversation!
                </p>

                <form onSubmit={(e) => e.preventDefault()} className="mx-auto w-full max-w-xl space-y-3">
                  <Input placeholder="Name" />
                  <Input type="email" placeholder="E-mail address" />
                  <Input placeholder="Phone" />
                  <Textarea placeholder="Your Message" rows={5} />
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center w-full h-[44px] rounded-md
                               bg-[#C6F24E] text-black font-medium hover:brightness-95
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6F24E]/60"
                  >
                    Send <span className="ml-2">→</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* divider between contact & footer */}
      <div className="mt-10 border-t border-white/10" />

      {/* ===== Footer ===== */}
      <footer className="relative text-white/80">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 600px at 60% -10%, rgba(198,242,78,0.08), transparent 50%), radial-gradient(1000px 480px at 5% 40%, rgba(255,255,255,0.05), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-[1450px] px-6 md:px-10 py-10 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <Link href="/" aria-label="Home" className="inline-flex items-center">
              <img
                src="/configgo-yeni-logo-beyaz.png"
                alt="Logo"
                className="block h-9 md:h-10 w-auto"
              />
            </Link>
              </div>
              <h5 className="text-white/80 text-[12px] tracking-wide mb-2">About</h5>
              <p className="text-white/65 text-[14px] leading-6 max-w-[48ch]">
                Configgo builds interactive Digital Twins and CRM-connected sales tools for real-estate and AEC teams.
                Showcase units, simulate sun-path and views, explore amenities and locations, and sync availability with your CRM.
              </p>
              <div className="mt-4 flex gap-4 text-[13px]">
                <Link href="/about-us" className="text-white/70 hover:text-white underline-offset-4 hover:underline">
                  About Us
                </Link>
                <Link href="/blog" className="text-white/70 hover:text-white underline-offset-4 hover:underline">
                  Blog
                </Link>
                <Link href="/crm" className="text-white/70 hover:text-white underline-offset-4 hover:underline">
                  CRM
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {GROUPS.map((g) => (
                  <div key={g.title}>
                    <div className="text-white/80 text-[13px] tracking-wide mb-3">{g.title}</div>
                    <ul className="space-y-2.5">
                      {g.links.map((l, i) => (
                        <li key={l.label + i}>
                          <Link href={l.href} className="text-white/60 hover:text-white text-[13px] leading-6 transition-colors">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-14 border-t border-white/10 pt-6 pb-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-4 justify-between">
            <p className="text-white/50 text-[12px]">Copyright © {new Date().getFullYear()} Configgo. All rights reserved.</p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px]">
              <li><Link href="/privacy" className="text-white/60 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/60 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-white/60 hover:text-white">Cookies Policy</Link></li>
              <li><Link href="/dpa" className="text-white/60 hover:text-white">DPA</Link></li>
            </ul>
            {/* green icons */}
            <div className="flex items-center gap-2 text-[#C6F24E]">
              <Social href="#" label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.6 7.2a3 3 0 0 1 2.1 2.1c.3 1.1.3 3.3.3 3.3s0 2.2-.3 3.3a3 3 0 0 1-2.1 2.1C18.5 18.6 12 18.6 12 18.6s-6.5 0-7.6-.6a3 3 0 0 1-2.1-2.1C2 14.8 2 12.6 2 12.6s0-2.2.3-3.3A3 3 0 0 1 4.4 7.2C5.5 6.6 12 6.6 12 6.6s6.5 0 7.6.6Zm-9.6 2.5v5l4.9-2.5-4.9-2.5Z"/>
                </svg>
              </Social>
              <Social href="#" label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M13 10h3V7h-3c-1.7 0-3 1.3-3 3v2H8v3h2v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z"/>
                </svg>
              </Social>
              <Social href="#" label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6.94 8.5H4V20h3V8.5ZM5.5 7.1a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM20 20h-3v-6.2c0-3-3.6-2.8-3.6 0V20H10V8.5h3v1.8c1.4-2.6 7-2.8 7 2.5V20Z"/>
                </svg>
              </Social>
              <Social href="#" label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/>
                </svg>
              </Social>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

/* --- tiny inputs --- */
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full h-[44px] rounded-md bg-white text-black/90 placeholder:text-black/40
                 px-3 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[#C6F24E]/60"
    />
  );
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full rounded-md bg-white text-black/90 placeholder:text-black/40
                 px-3 py-2 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[#C6F24E]/60"
    />
  );
}
function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="grid place-items-center h-8 w-8 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition"
    >
      {children}
    </Link>
  );
}
