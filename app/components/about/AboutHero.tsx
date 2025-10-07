// app/components/about/AboutHero.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Building2,
  Box,            // ✅ use Box instead of Cube
  Layers,
  MessageSquare,
  ShieldCheck,
  Globe2,
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

export default function AboutHero() {
  return (
    <section
      id="about-hero"
      className="relative"
      style={{
        paddingTop: HEADER_OFFSET,
        scrollMarginTop: HEADER_OFFSET,
        // Make the section exactly viewport height minus the header offset
        minHeight: `calc(100svh - ${HEADER_OFFSET})`,
      }}
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(80%_140%_at_50%_0%,rgba(198,242,78,0.08),rgba(0,0,0,0)_60%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div
        className="relative z-[1] mx-auto max-w-[1450px] px-6 pb-16 md:pb-24 flex items-center"
        style={{ minHeight: "inherit" }} // ensure inner wraps to the section's 100vh height
      >
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-12% 0px -12% 0px" }}
          className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12"
        >
          {/* Copy */}
          <motion.div variants={ITEM} className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
              <Rocket className="h-3.5 w-3.5 text-[#C6F24E]" />
              About Configgo
            </div>

            <h1 className="typo-hero-light mt-4 text-white md:text-[84px]">
              We’re building the
              <span className="typo-hero-semi text-[#C6F24E]"> construction-tech platform</span>
              teams actually love.
            </h1>

            <p className="typo-small mt-4 max-w-[760px] text-white/75">
              Not just a CRM. Configgo unifies <b className="text-white">Real-Estate CRM</b>, a
              <b className="text-white"> Digital Twin</b> layer, and the operational tools modern
              developers, contractors, and sales teams need—inventory & availability, omnichannel
              communication, light BIM/doc controls, and handover workflows.
            </p>

            {/* capability chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              <CapChip icon={<Building2 className="h-3.5 w-3.5" />} text="Real-Estate CRM" />
              <CapChip icon={<Box className="h-3.5 w-3.5" />} text="Digital Twin" /> {/* ✅ replaced */}
              <CapChip icon={<Layers className="h-3.5 w-3.5" />} text="BIM & Docs (light)" />
              <CapChip icon={<MessageSquare className="h-3.5 w-3.5" />} text="Omnichannel Inbox" />
              <CapChip icon={<Building2 className="h-3.5 w-3.5" />} text="Inventory & Availability" />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about#team"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-[#C6F24E] px-5 py-3 text-sm font-medium text-black hover:opacity-95"
              >
                Meet the team
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/85 hover:bg-white/15"
              >
                Explore the platform
              </Link>
            </div>
          </motion.div>

          {/* Stats panel */}
          <motion.div variants={ITEM} className="md:col-span-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard icon={<Box className="h-4 w-4 text-[#C6F24E]" />} kpi="40+" label="Digital twins deployed" />
              <StatCard icon={<Building2 className="h-4 w-4 text-[#C6F24E]" />} kpi="18k+" label="Units managed" />
              <StatCard icon={<Globe2 className="h-4 w-4 text-[#C6F24E]" />} kpi="EU · US · TR · MENA" label="Regions we serve" />
              <StatCard icon={<ShieldCheck className="h-4 w-4 text-[#C6F24E]" />} kpi="Security-first" label="AES-256 • TLS 1.2+" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* helpers */

function CapChip({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
      <span className="text-[#C6F24E]">{icon}</span>
      {text}
    </span>
  );
}

function StatCard({ icon, kpi, label }: { icon: ReactNode; kpi: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-2 inline-flex items-center gap-2 rounded-md bg-white/10 px-2 py-1 text-xs text-white/80 ring-1 ring-white/15">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-2xl font-[600] text-white">{kpi}</div>
    </div>
  );
}
