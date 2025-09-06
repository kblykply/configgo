// app/components/about/AboutMission.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target,
  Building2,
  TrendingUp,
  Clock,
  Globe2,
  Cpu,
} from "lucide-react";
import type { ReactNode } from "react";

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
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function AboutMission() {
  return (
    <section
      id="mission"
      className="relative"
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* Split background: lime band on the left for variety */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_20%_0%,rgba(198,242,78,0.10),rgba(0,0,0,0)_60%)]" />
        <div className="absolute left-0 top-0 h-full w-[38%] bg-[linear-gradient(180deg,rgba(198,242,78,0.08),rgba(198,242,78,0.02))]" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-12% 0px -12% 0px" }}
          className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12"
        >
          {/* Mission – blockquote style */}
          <motion.div variants={ITEM} className="md:col-span-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#C6F24E]/15 px-3 py-1 text-[11px] text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
              <Target className="h-3.5 w-3.5" />
              Our mission
            </div>

            <div className="relative">
              {/* accent bar */}
              <div className="absolute -left-4 top-0 h-full w-[3px] rounded-full bg-[#C6F24E]" />
              <h2 className="typo-h2-md pl-4 text-white [text-wrap:balance]">
                Digitize the built world—<span className="text-[#C6F24E]">without the busywork</span>.
              </h2>
            </div>

            <p className="typo-small mt-4 max-w-[700px] pl-4 text-white/75">
              We connect <b className="text-white">Real-Estate CRM</b>, <b className="text-white">Digital Twin</b>, and
              everyday operations so developers, contractors, and sales teams work from one source of truth—faster
              decisions from planning to handover.
            </p>

            {/* different chip look */}
            <div className="mt-6 flex flex-wrap gap-2 pl-4">
              {["One source of truth", "Unit inventory & availability", "Omnichannel tied to deals", "Visual context in-flow"].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] text-white/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-7 pl-4">
              <Link
                href="/about#story"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
              >
                Read our story →
              </Link>
            </div>
          </motion.div>

          {/* Why now – numbered vertical timeline (no cards) */}
          <motion.div variants={ITEM} className="md:col-span-6">
            <ol className="relative ml-3 space-y-6 before:absolute before:left-[-1px] before:top-1 before:h-[calc(100%-8px)] before:w-px before:bg-white/15">
              {WHY_NOW.map((row, idx) => (
                <li key={row.title} className="relative pl-8">
                  {/* number badge */}
                  <span className="absolute -left-[22px] top-0 inline-grid h-8 w-8 place-items-center rounded-full bg-[#C6F24E] text-[11px] font-semibold text-black shadow-lg ring-1 ring-black/10">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-2 text-white">
                    <span className="inline-grid h-8 w-8 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
                      {row.icon}
                    </span>
                    <span className="text-sm font-medium">{row.title}</span>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{row.body}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- data ---------- */
const WHY_NOW: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Fragmented tools slow real projects",
    body:
      "CRM, spreadsheets, messaging and visuals don’t talk to each other. We link sales, inventory and context in one platform.",
    icon: <Building2 className="h-4 w-4 text-[#C6F24E]" />,
  },
  {
    title: "Demand + cost pressure",
    body:
      "Teams must convert efficiently, forecast precisely and protect margins with live pricing & availability.",
    icon: <TrendingUp className="h-4 w-4 text-[#C6F24E]" />,
  },
  {
    title: "Shorter cycles, higher expectations",
    body:
      "Buyers expect instant answers and self-serve visuals. Digital Twin + omnichannel provides real-time clarity.",
    icon: <Clock className="h-4 w-4 text-[#C6F24E]" />,
  },
  {
    title: "Distributed, multi-office teams",
    body:
      "Regional portfolios need shared data, granular permissions and auditability across offices and partners.",
    icon: <Globe2 className="h-4 w-4 text-[#C6F24E]" />,
  },
  {
    title: "AI-ready foundation",
    body:
      "Clean, linked data (leads ↔ units ↔ conversations) unlocks routing, automation and predictive reporting.",
    icon: <Cpu className="h-4 w-4 text-[#C6F24E]" />,
  },
];
