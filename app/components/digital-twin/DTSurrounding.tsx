// app/components/digital-twin/DTSurrounding.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  mediaSrc?: string;   // /public path
  videoSrc?: string;   // optional mp4/webm
};

const POINTS = [
  "Discover your development’s unique sense of place with virtual reproductions of surrounding landscapes",
  "Explore nearby landmarks and attractions, providing valuable context for potential residents",
  "Gain a genuine understanding of the property’s connectivity and accessibility",
];

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
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

export default function DTSurrounding({
  mediaSrc = "/surr.jpg",
  videoSrc,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.4, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section ref={sectionRef} className="relative">
      {/* soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_60%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          animate={controls}
          className="text-center mb-8 md:mb-12"
        >
          <motion.p variants={ITEM} className="typo-small-heading text-white/75">
            Embrace
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            <span className="text-lime-300">The Surrounding</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — media window */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
          

              <div className="relative aspect-[16/9]">
                {videoSrc ? (
                  <video
                    src={videoSrc}
                    poster={mediaSrc}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={mediaSrc}
                    alt="Surrounding context view"
                    fill
                    sizes="(min-width: 1024px) 820px, 100vw"
                    className="object-contain"
                    priority
                  />
                )}
                <div className="pointer-events-none absolute inset-0" />
              </div>
          </motion.div>

          {/* RIGHT — numbered cards */}
          <motion.ul
            variants={WRAP}
            initial="hidden"
            animate={controls}
            className="md:col-span-5 md:self-center space-y-6"
          >
            {POINTS.map((t, i) => (
              <motion.li key={i} variants={ITEM}>
                <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                  {/* number tile */}
                  <div className="grid h-16 w-16 place-items-center rounded-lg bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_16px_rgba(0,0,0,0.35)]">
                    <span className="text-[20px] font-medium text-white">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="h-12 w-px bg-white/15" />
                  <p className="typo-small text-white/80">{t}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
