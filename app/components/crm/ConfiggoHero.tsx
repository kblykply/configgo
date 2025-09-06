// app/components/configgo/ConfiggoHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const ITEM = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};
const VISUAL = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.05 } },
};

export default function ConfiggoHero() {
  // Retrigger animation whenever the hero re-enters the viewport
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      className="relative"
      style={{
        paddingTop: "calc(var(--header-h, 72px) + 96px)",
        scrollMarginTop: "calc(var(--header-h, 72px) + 96px)",
        minHeight: "calc(100svh - var(--header-h, 72px))",
      }}
    >
      {/* subtle background swirl */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_60%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-12">
          {/* LEFT — copy */}
          <motion.div
            variants={ITEM}
            initial="hidden"
            animate={controls}
            className="md:col-span-6"
          >
            <p className="typo-small-heading text-white/70">Configgo Real Estate CRM</p>

            <h1 className="typo-hero-light mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#C6F24E] md:text-[84px]">
              One CRM for Leads, Inventory & Sales
            </h1>

            <p className="typo-small mt-4 max-w-[640px] text-white/70">
              Configgo unifies lead capture, sales pipelines, unit availability, and omnichannel
              communication — with real-time dashboards tailored for developers and agencies.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-[#C6F24E] px-5 py-3 text-sm text-black transition hover:brightness-95"
              >
                Get a demo
              </Link>
              <a
                href="#video"
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/90 backdrop-blur-sm transition hover:bg-white/15"
              >
                See it in action
              </a>
            </div>

            {/* feature chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Lead Routing", "Pipelines", "Inventory & Availability", "Omnichannel Inbox", "Reporting"].map(
                (label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* RIGHT — visual */}
          <motion.div
            variants={VISUAL}
            initial="hidden"
            animate={controls}
            className="md:col-span-6"
          >
            <div className="-rotate-1 transition-transform duration-500 hover:rotate-0">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                {/* window bar */}
                <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                  <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                </div>

                <div className="relative aspect-[16/9]">
                  <Image
                    src="/configgo/hero.jpg" // put a CRM screenshot here
                    alt="Configgo CRM — dashboard"
                    fill
                    priority
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="object-cover"
                  />
                  {/* soft reflection + ring */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_42%)] mix-blend-soft-light" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* small anchor for the “See it in action” link */}
        <div id="video" className="h-10" />
      </div>
    </section>
  );
}
