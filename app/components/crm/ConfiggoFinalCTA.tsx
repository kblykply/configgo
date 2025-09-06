// app/components/configgo/ConfiggoFinalCTA.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Check, ShieldCheck, PhoneCall } from "lucide-react";

/* exact header offset (your fixed header = 20vh) */
const HEADER_OFFSET = "20vh";

/* animations (visible by default; replay on scroll) */
const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE, staggerChildren: 0.06 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function ConfiggoFinalCTA() {
  return (
    <section
      id="get-started"
      className="relative"
      style={{ paddingTop: HEADER_OFFSET, scrollMarginTop: HEADER_OFFSET }}
    >
      {/* Ambient glow + diagonal accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(80%_140%_at_50%_0%,rgba(198,242,78,0.10),rgba(0,0,0,0)_60%)]" />
        <div className="absolute -inset-x-10 top-1/3 h-48 rotate-[-3deg] bg-[linear-gradient(90deg,rgba(198,242,78,0.12),rgba(255,255,255,0.02),rgba(198,242,78,0.12))] blur-xl" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 pb-20 md:pb-28">
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-12% 0px -12% 0px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12"
        >
          {/* Left: copy + CTAs */}
          <motion.div variants={ITEM} className="md:col-span-6 lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
              <Rocket className="h-3.5 w-3.5 text-[#C6F24E]" />
              Launch Configgo in weeks
            </div>

            <h2 className="typo-hero-light mt-4 text-white md:text-[64px]">
              Ready to <span className="typo-hero-semi text-[#C6F24E]">sell smarter</span>?
            </h2>

            <p className="typo-small mt-4 max-w-[560px] text-white/75">
              Unify leads, inventory, and omni-channel conversations in one CRM built for real estate.
              Start your free trial or talk to our team—no credit card required.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-white/85">
              {[
                "Real-time inventory & availability",
                "WhatsApp, Email, SMS in one inbox",
                "Automation, reports, and dashboards",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#C6F24E]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-[#C6F24E] px-5 py-3 text-sm font-medium text-black hover:opacity-95"
              >
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/85 hover:bg-white/15"
              >
                Book a demo <PhoneCall className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-4 flex items-center gap-3 text-[12px] text-white/65">
              <ShieldCheck className="h-4 w-4 text-[#C6F24E]" />
              <span>GDPR-ready • AES-256 at rest • No credit card needed</span>
            </div>
          </motion.div>

          {/* Right: product “window” teaser */}
          <motion.div variants={ITEM} className="md:col-span-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window top bar */}
              <div className="flex h-9 items-center justify-between border-b border-white/10 bg-white/5 px-4">
                <div className="flex items-center gap-2 text-xs text-white/75">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                  <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                  <span className="ml-2">Configgo — Overview</span>
                </div>
                <span className="text-[11px] text-white/55">Live preview</span>
              </div>

              {/* ghost UI grid (no external images required) */}
              <div className="grid gap-4 p-5 md:grid-cols-2">
                {/* pipeline chip row */}
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-2 text-xs text-white/70">Hot pipeline</div>
                  <div className="flex flex-wrap gap-2">
                    {["New", "Qualified", "Booking", "Won"].map((s, i) => (
                      <span
                        key={s}
                        className={[
                          "rounded-full px-3 py-1 text-[11px] ring-1",
                          i === 0
                            ? "bg-white/10 ring-white/15 text-white/85"
                            : i === 1
                            ? "bg-[#C6F24E]/15 ring-[#C6F24E]/30 text-[#C6F24E]"
                            : "bg-white/5 ring-white/15 text-white/70",
                        ].join(" ")}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {/* progress bars */}
                  <div className="mt-4 space-y-2">
                    {[68, 42, 24].map((v, i) => (
                      <div key={i} className="h-2 w-full rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-[#C6F24E]"
                          style={{ width: `${v}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* unified inbox preview */}
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-2 text-xs text-white/70">Unified inbox</div>
                  <ul className="space-y-2 text-sm">
                    {[
                      ["WhatsApp", "New inquiry • 2+1 • Vega Center"],
                      ["Email", "Follow-up • Documents & offer"],
                      ["SMS", "Tour confirmed • Tomorrow 14:00"],
                    ].map(([ch, text]) => (
                      <li
                        key={text}
                        className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/40 px-3 py-2"
                      >
                        <span className="text-white/85">{text}</span>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                          {ch}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* availability tiles */}
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 md:col-span-2">
                  <div className="mb-2 text-xs text-white/70">Inventory & availability</div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      ["Vega • 1+1", "7 available"],
                      ["Orion • 2+1", "3 available"],
                      ["Mega1453 • 3+1", "2 available"],
                      ["Suare • 1+1", "5 available"],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-lg border border-white/10 bg-black/40 p-3">
                        <div className="text-sm text-white/85">{k}</div>
                        <div className="text-[12px] text-white/60">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>

            <p className="typo-small mt-3 text-white/60">
              Need help choosing a plan? <Link href="/contact" className="underline underline-offset-4 text-white/80 hover:text-white">Talk to sales</Link>.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
