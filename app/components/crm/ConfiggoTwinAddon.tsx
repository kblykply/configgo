// app/components/configgo/ConfiggoTwinAddon.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Box,
  Layers,
  Eye,
  Calendar,
  MousePointer2,
  RefreshCw,
  Tag,
  DollarSign,
  Camera,
  Share2,
  MapPin,
  Check,
} from "lucide-react";
import type { ReactNode, CSSProperties } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.06 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function ConfiggoTwinAddon() {
  const viewportOpts = { once: false, amount: 0.3, margin: "-15% 0% -25% 0%" } as const;

  return (
    <section id="twin-addon" className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />
      <div className="relative z-[1] mx-auto max-w-[1450px] px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        {/* header */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={viewportOpts}
          className="mb-8 sm:mb-10 text-center"
        >
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Digital Twin Add-on
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Turn the twin into a <span className="text-[#C6F24E]">selling surface</span>
          </motion.h2>
          <motion.p
            variants={ITEM}
            className="typo-small mt-3 max-w-[860px] mx-auto text-white/70 px-1"
          >
            Embed your interactive 3D experiences inside Configgo. Sync inventory & pricing,
            capture leads from in-scene actions, and schedule guided tours — all wired to your pipelines.
          </motion.p>
        </motion.div>

        {/* grid */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={viewportOpts}
          className="grid grid-cols-1 gap-6 sm:gap-10 md:grid-cols-12 md:gap-12"
        >
          {/* left: bullets */}
          <motion.div variants={ITEM} className="md:col-span-5 space-y-3 sm:space-y-4">
            <Feature
              icon={<Layers className="h-4 w-4 text-[#C6F24E]" />}
              title="Live overlays for units & pricing"
              desc="Availability, price bands, and unit specs are rendered in-scene and stay in sync with your CRM."
            />
            <Feature
              icon={<MousePointer2 className="h-4 w-4 text-[#C6F24E]" />}
              title="Tap-to-inquire from the 3D view"
              desc="Clicks on buildings, floors, or units create tracked leads with full context (camera, hotspot, scene)."
            />
            <Feature
              icon={<Calendar className="h-4 w-4 text-[#C6F24E]" />}
              title="Guided tours & booking"
              desc="One-click ‘Book a tour’ from the twin schedules a slot and drops the lead into the right pipeline."
            />
            <Feature
              icon={<RefreshCw className="h-4 w-4 text-[#C6F24E]" />}
              title="Two-way sync"
              desc="When a unit is reserved or price changes in CRM, the twin updates instantly — and vice-versa."
            />

            {/* tiny badges */}
            <div className="mt-3 -mx-2 flex gap-2 overflow-x-auto px-2 pb-1 whitespace-nowrap md:mx-0 md:overflow-visible md:whitespace-normal">
              {[
                { I: Box, label: "Units" },
                { I: Tag, label: "Pricing" },
                { I: Camera, label: "Views" },
                { I: Share2, label: "UTM Tracking" },
              ].map(({ I, label }) => (
                <span
                  key={label}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/85"
                >
                  <I className="h-3.5 w-3.5 text-[#C6F24E]" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* right: framed visual */}
          <motion.div variants={ITEM} className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window bar */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="ml-2 text-xs text-white/60">Digital Twin — embedded</span>
              </div>

              {/* preview */}
              <div className="relative aspect-[16/9]">
                <Image
                  src="/frame1-min.jpeg"
                  alt="Digital twin embedded preview"
                  fill
                  sizes="(min-width: 1024px) 720px, (min-width: 640px) 90vw, 100vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

                {/* CTA */}
                <button
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3.5 py-2 text-xs sm:text-sm text-white backdrop-blur hover:bg-black/55"
                  type="button"
                  aria-label="Book a guided tour"
                >
                  Book a guided tour
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* sync strip */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={viewportOpts}
          className="mt-8 sm:mt-10"
        >
          <motion.div variants={ITEM} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:items-center">
              {/* left */}
              <div className="flex items-center justify-center gap-2 text-sm text-white/80">
                <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
                  <Box className="h-4.5 w-4.5 text-[#C6F24E]" />
                </span>
                Configgo CRM
              </div>

              {/* animated arrows & chips — wrap-friendly */}
              <div className="mx-auto w-full min-w-0">
                <div className="grid w-full min-w-0 grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-2">
                  {/* left chips */}
                  <div className="min-w-0 flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    <SyncChip>Units</SyncChip>
                    <SyncChip>Pricing</SyncChip>
                    <SyncChip>Availability</SyncChip>
                  </div>

                  {/* arrow */}
                  <motion.div
                    variants={ITEM}
                    className="mx-auto my-1 text-white/60"
                    aria-hidden
                  >
                    ⇄
                  </motion.div>

                  {/* right chips */}
                  <div className="min-w-0 flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    <SyncChip>Scenes</SyncChip>
                    <SyncChip>Hotspots</SyncChip>
                    <SyncChip>Events</SyncChip>
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="flex items-center justify-center gap-2 text-sm text-white/80">
                <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
                  <Layers className="h-4.5 w-4.5 text-[#C6F24E]" />
                </span>
                Digital Twin
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */
function Feature({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-1 flex items-center gap-2 text-white">
        <span className="inline-grid h-7 w-7 place-items-center rounded-md bg-white/10 ring-1 ring-white/15">
          {icon}
        </span>
        <span className="font-[500]">{title}</span>
      </div>
      <p className="typo-small text-white/70">{desc}</p>
    </div>
  );
}

function HUDChip({ children, style }: { children: ReactNode; style: CSSProperties }) {
  return (
    <div
      style={style}
      className="flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs text-white backdrop-blur"
    >
      {children}
    </div>
  );
}

function SyncChip({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[10px] sm:text-[11px] text-white/85">
      {children}
    </span>
  );
}
