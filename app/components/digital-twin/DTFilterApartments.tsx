// app/components/digital-twin/DTFilterApartments.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  /** Background media under /public or remote */
  mediaSrc?: string;
  /** Optional mp4/webm clip (overrides mediaSrc as poster) */
  videoSrc?: string;
  /** Headline & body copy */
  title?: string;
  blurb?: string;
  /** Info-box title & text shown inside the media */
  overlayTitle?: string;
  overlayText?: string;
};

const POINTS = [
  "Combine unit type, view, block, floor, and budget to match each client’s needs instantly.",
  "Use quick presets and AND/OR logic to refine results without losing context.",
  "Live availability and true pricing keep sales conversations accurate and fast.",
];

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
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
};
const VISUAL = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.06 } },
};
const OVERLAY_INFO = {
  hidden: { opacity: 0, x: 16, filter: "blur(6px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE } },
};

export default function DTFilterApartments({
  mediaSrc = "/prr/2.jpg",
  videoSrc,
  title = "Filter Apartments",
  blurb = "Find the right homes fast with powerful, real-time filters — unit type, budget, floor, block, view, and availability — all in one place.",
  overlayTitle = "Smart Apartment Filters",
  overlayText = "Stack filters, switch logic, and keep live pricing in view. Save and share a unique link so clients can revisit the exact shortlist.",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.4, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section ref={ref} className="relative">
      {/* soft radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_40%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="text-center mb-8 md:mb-12">
          <motion.p variants={ITEM} className="typo-small-heading text-white/75">Digital Twin</motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            <span className="text-[#C6F24E]">Filter</span> Apartments
          </motion.h2>
          <motion.p variants={ITEM} className="mx-auto mt-3 max-w-2xl text-white/70 typo-small">
            {blurb}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — outlined number points */}
          <motion.ul
            variants={WRAP}
            initial="hidden"
            animate={controls}
            className="order-2 md:order-1 md:col-span-5 md:self-center space-y-8"
          >
            {POINTS.map((t, i) => (
          <motion.li key={i} variants={ITEM}>
  <div className="flex items-center gap-5">
    <div className="grid h-14 w-14 min-w-[56px] place-items-center rounded-2xl border border-[#C6F24E]/50 bg-[#C6F24E]/10 text-[#C6F24E] shadow-[0_8px_22px_rgba(198,242,78,0.18)]">
      <span className="text-[18px] font-semibold">{String(i + 1).padStart(2, "0")}</span>
    </div>

    {/* ensure the text block matches tile height and centers its content */}
    <div className="min-h-[56px] flex items-center">
      <p className="typo-small text-white/80 max-w-[560px] leading-6 m-0">
        {t}
      </p>
    </div>
  </div>
</motion.li>

            ))}

            {/* tiny feature badges */}
            <motion.div variants={ITEM} className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md bg-[#C6F24E] px-2.5 py-1 text-[11px] font-medium text-black/90">Live Availability</span>
              <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] text-white/85 ring-1 ring-white/15">AND / OR Logic</span>
              <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] text-white/85 ring-1 ring-white/15">Shareable URL</span>
              <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] text-white/85 ring-1 ring-white/15">Favorites</span>
            </motion.div>
          </motion.ul>

          {/* RIGHT — media window with a single info box overlay */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="order-1 md:order-2 md:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* window bar */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>

              {/* media area */}
              <div className="relative aspect-[16/9]">
                {videoSrc ? (
                  <video
                    src={videoSrc}
                    poster={mediaSrc}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={mediaSrc}
                    alt="Filter apartments main view"
                    fill
                    sizes="(min-width: 1024px) 820px, 100vw"
                    className="object-cover"
                    priority
                  />
                )}

                {/* Single info box (right side) */}
                <motion.div
                  variants={OVERLAY_INFO}
                  initial="hidden"
                  animate={controls}
                  className="pointer-events-auto absolute right-3 top-3 w-[min(44%,380px)] rounded-xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-sm md:block hidden"
                >
                  <p className="text-[12px] uppercase tracking-wide text-white/60">Feature</p>
                  <h4 className="mt-1 text-[15px] font-semibold text-white">{overlayTitle}</h4>
                  <p className="mt-2 text-[13px] leading-5 text-white/80">{overlayText}</p>

                  <div className="mt-3 h-px w-full bg-white/10" />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-md bg-[#C6F24E] px-2 py-1 text-[11px] font-medium text-black/90">Live Pricing</span>
                    <span className="rounded-md bg-white/10 px-2 py-1 text-[11px] text-white/80 ring-1 ring-white/15">Presets</span>
                    <span className="rounded-md bg-white/10 px-2 py-1 text-[11px] text-white/80 ring-1 ring-white/15">Share Link</span>
                  </div>
                </motion.div>

                {/* ring for the whole media area */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
