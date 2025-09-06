// app/components/about/AboutFinalCTA.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, CalendarDays, Phone, Check, ShieldCheck } from "lucide-react";

const HEADER_OFFSET = "20vh";
const EASE = [0.22, 0.61, 0.36, 1] as const;

const WRAP = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE, staggerChildren: 0.06 },
  },
};

const ITEM = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.45, ease: EASE } },
};

export default function AboutFinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative"
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* Distinct background: diagonal lime band + halo + subtle grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute -inset-x-16 top-10 h-48 rotate-[2deg] bg-[linear-gradient(90deg,rgba(198,242,78,0.12),rgba(255,255,255,0.02),rgba(198,242,78,0.12))] blur-xl" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(198,242,78,0.06),rgba(0,0,0,0)_60%)]" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 pb-16 pt-12 md:pb-24 md:pt-16">
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 md:p-10 shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
        >
          {/* top strip */}
          <motion.div
            variants={ITEM}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85"
          >
            <Rocket className="h-3.5 w-3.5 text-[#C6F24E]" />
            Ready to modernize sales & inventory?
          </motion.div>

          {/* headline + actions */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <motion.div variants={ITEM} className="md:col-span-7">
              <h2 className="typo-h2-md">
                Launch <span className="text-[#C6F24E]">Configgo</span> — CRM + Digital Twin for construction
              </h2>
              <p className="typo-small mt-3 max-w-[720px] text-white/75">
                Start fast with a guided rollout. Bring your leads, inventory and documents together—then automate the follow-through.
              </p>

              {/* chips */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { icon: <Check className="h-3.5 w-3.5" />, label: "14-day free trial" },
                  { icon: <Check className="h-3.5 w-3.5" />, label: "No credit card to start" },
                  { icon: <ShieldCheck className="h-3.5 w-3.5" />, label: "GDPR-ready; SOC2 in progress" },
                ].map((c) => (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] text-white/85"
                  >
                    <span className="inline-grid h-6 w-6 place-items-center rounded-md bg-[#C6F24E]/15 text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
                      {c.icon}
                    </span>
                    {c.label}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#C6F24E] px-5 py-2.5 text-sm text-black transition hover:opacity-95"
                >
                  Start free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?topic=Sales"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm text-white/85 transition hover:bg-white/15"
                >
                  Book a demo <CalendarDays className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* right: quick-contact / reassurance */}
            <motion.div variants={ITEM} className="md:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <div className="mb-2 text-sm text-white/85">Talk to a human</div>
                <div className="flex flex-wrap items-center gap-3 text-[13px] text-white/80">
                  <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-2 py-1 ring-1 ring-white/15">
                    <Phone className="h-3.5 w-3.5 text-[#C6F24E]" /> +90 312 000 00 00
                  </span>
                  <span className="text-white/60">Mon–Fri 9:00–18:00 (TRT)</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <div className="text-white text-lg font-[600]">2–4 wks</div>
                    <div className="text-[11px] text-white/60">Typical rollout</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <div className="text-white text-lg font-[600]">24h</div>
                    <div className="text-[11px] text-white/60">First response SLA</div>
                  </div>
                </div>

                <p className="mt-4 text-[12px] text-white/65">
                  We’ll help migrate leads, pipelines and unit inventory. Change your mind? Cancel anytime during the trial.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
