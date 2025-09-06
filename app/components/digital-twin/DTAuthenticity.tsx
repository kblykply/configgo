// app/components/digital-twin/DTAuthenticity.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  /** image or video poster under /public */
  mediaSrc?: string;
  /** optional mp4/webm to autoplay loop mute */
  videoSrc?: string;
};

const FEATURES = [
  "Meticulous recreation of architectural elements, from grand to intricate interior details.",
  "Experiential staging that brings living spaces to life with tailored design schemes.",
  "Faithful representations of amenities, capturing their essence within the digital domain.",
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
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
};
const VISUAL = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.06 } },
};

export default function DTAuthenticity({
  mediaSrc = "/digital-twin/auth.jpg", // put your image here
  videoSrc, // e.g. "/digital-twin/auth.mp4"
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.4, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      className="relative"
    >
      {/* subtle swirl / vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_20%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-20 md:py-28">
        {/* Heading */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="text-center mb-10 md:mb-14">
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Architectural
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-3">
            <span className="text-lime-300">Authenticity Redefined</span>
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12">
          {/* Left — feature cards */}
        <motion.ul
  variants={WRAP}
  initial="hidden"
  animate={controls}
 className="md:col-span-5 md:self-center space-y-6"
>
            {FEATURES.map((t, i) => (
              <motion.li key={i} variants={ITEM}>
                <div className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-white">
                    {/* square icon placeholder */}
                    <div className="h-4 w-4 rounded-[3px] bg-neutral-900" />
                  </div>
                  <div className="h-10 w-px bg-white/15" />
                  <p className="typo-small text-white/80">{t}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right — media window */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window bar */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>

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
                  <>
                    <Image
                      src={mediaSrc}
                      alt="Authenticity showcase"
                      fill
                      sizes="(min-width: 1024px) 740px, 100vw"
                      className="object-cover"
                      priority
                    />
                  </>
                )}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
