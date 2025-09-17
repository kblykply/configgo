// app/components/digital-twin/DTInteractiveDiscovery.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  mediaSrc?: string;   // /public path
  videoSrc?: string;   // optional mp4/webm
  /** Optional small preview image for the upper overlay */
  overlayImgSrc?: string;
  /** Optional info box title + text */
  overlayTitle?: string;
  overlayText?: string;
};

const POINTS = [
  "Get on a seamless virtual journey, navigating every corner of the digital twin with ease",
  "Conduct comprehensive property searches and inventory configurations tailored to customer preferences",
  "Engage audiences with an immersive, personalized experience that captivates and inspires",
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
const OVERLAY_WRAP = {
  hidden: { opacity: 0, x: -16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE, staggerChildren: 0.07 },
  },
};
const OVERLAY_ITEM = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE } },
};

export default function DTInteractiveDiscovery({
  mediaSrc = "/discovery2-min.png",
  videoSrc,
  overlayImgSrc = "/discovery1-min.png",
  overlayTitle = "Smart Filters & Guided Search",
  overlayText = "Filter by block, unit type, price band, view, and floor. Pin favorites, compare units, and generate a shareable link instantly.",
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_40%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="text-center mb-8 md:mb-12">
          <motion.p variants={ITEM} className="typo-small-heading text-white/75">Interactive</motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            <span className="text-[#C6F24E]">Discovery</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — media window */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
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
                    alt="Interactive discovery view"
                    fill
                    sizes="(min-width: 1024px) 820px, 100vw"
                    className="object-cover"
                    priority
                  />
                )}

                {/* LEFT overlay column (shows on md+) */}
                <motion.div
                  variants={OVERLAY_WRAP}
                  initial="hidden"
                  animate={controls}
                  className="pointer-events-auto absolute inset-y-3 left-3 hidden w-[min(44%,380px)] flex-col gap-3 md:flex"
                >
{/* Upper box — image should fill (no gaps) */}
<motion.div
  variants={OVERLAY_ITEM}
  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm"
>
  {/* optional contrast gradient (kept) */}
  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0)_32%)] pointer-events-none" />
  <Image
    src={overlayImgSrc}
    alt="Preview"
    fill
    sizes="(min-width: 1024px) 340px, 50vw"
    className="object-contain"     // was: object-contain p-3
    priority
  />
  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
</motion.div>
            

                  {/* Bottom box — info card */}
                  <motion.div
                    variants={OVERLAY_ITEM}
                    className="rounded-xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm p-4"
                  >
                    <p className="text-[12px] uppercase tracking-wide text-white/60">Feature</p>
                    <h4 className="mt-1 text-[15px] font-semibold text-white">{overlayTitle}</h4>
                    <p className="mt-2 text-[13px] leading-5 text-white/80">
                      {overlayText}
                    </p>
                    {/* subtle hairline */}
                    <div className="mt-3 h-px w-full bg-white/10" />
                    {/* tiny badges */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-md bg-[#C6F24E] px-2 py-1 text-[11px] font-medium text-black/90">Live Inventory</span>
                      <span className="rounded-md bg-white/10 px-2 py-1 text-[11px] text-white/80 ring-1 ring-white/15">Share Link</span>
                      <span className="rounded-md bg-white/10 px-2 py-1 text-[11px] text-white/80 ring-1 ring-white/15">Compare</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* ring for the whole media area */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — lime number tiles + texts */}
          <motion.ul
            variants={WRAP}
            initial="hidden"
            animate={controls}
            className="md:col-span-5 md:self-center space-y-8"
          >
            {POINTS.map((t, i) => (
              <motion.li key={i} variants={ITEM}>
                <div className="flex items-center gap-5">
                  <div className="grid h-16 w-16 min-w-[64px] shrink-0 place-items-center rounded-2xl bg-[#C6F24E] text-black shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                    <span className="text-[20px] font-semibold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="typo-small text-white/80 max-w-[520px]">{t}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
