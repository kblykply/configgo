// app/components/configgo/ConfiggoCommsHub.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { MessageCircle, Bot, CheckCircle2, Clock, CalendarClock } from "lucide-react";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.08 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const VISUAL = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.05 } },
};

export default function ConfiggoCommsHub() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section ref={ref} className="relative" id="comms">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-10 text-center">
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Omnichannel communication hub
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            One inbox for <span className="text-[#C6F24E]">WhatsApp, SMS, Email & Voice</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — value & features */}
          <motion.aside variants={WRAP} initial="hidden" animate={controls} className="md:col-span-5">
            <motion.p variants={ITEM} className="typo-small text-white/70">
              Work from a single inbox. Templates, sequences and SLAs keep follow-ups on time.
              Every conversation writes back to the deal timeline automatically.
            </motion.p>

            <motion.ul variants={WRAP} className="mt-6 space-y-3">
              {[
                { Icon: MessageCircle, txt: "Unified threads across WhatsApp, SMS, Email & Voice" },
                { Icon: Bot,           txt: "Templates & sequences with merge fields" },
                { Icon: Clock,         txt: "Response-time SLAs and idle escalations" },
                { Icon: CheckCircle2,  txt: "Auto-log to pipeline and contact timeline" },
              ].map(({ Icon, txt }) => (
                <motion.li key={txt} variants={ITEM} className="flex items-center gap-3.5">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                    <Icon className="block h-4 w-4 text-[#C6F24E]" aria-hidden="true" />
                  </span>
                  <span className="typo-small leading-6 text-white/80">{txt}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* mini SLA / visit preview */}
            <motion.div
              variants={ITEM}
              className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Clock className="h-4 w-4 text-[#C6F24E]" /> First Reply SLA:
                <span className="ml-1 rounded-full bg-[#C6F24E]/15 px-2 py-0.5 text-[11px] text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
                  15m
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
                <CalendarClock className="h-4 w-4 text-[#C6F24E]" /> Visit scheduled: Thu 15:30 — Sales Center A
              </div>
            </motion.div>
          </motion.aside>

          {/* RIGHT — unified inbox visual (single image in window chrome) */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <div className="ml-3 text-xs text-white/60">Configgo · Inbox</div>
              </div>

              {/* image area — show the full image */}
              <div className="relative w-full bg-white/5">
                <Image
                  src="/images/comms-visual.png" // <- replace with your image path
                  alt="Omnichannel inbox visual"
                  width={1280}
                  height={720}
                  className="w-full h-auto object-contain"
                  priority={false}
                />
                {/* inner ring */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>

            {/* note */}
            <p className="typo-small mt-4 text-white/60">
              Templates pull project & unit fields automatically. Replies thread across channels and sync to the deal.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
