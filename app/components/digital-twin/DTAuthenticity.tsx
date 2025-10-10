// app/components/digital-twin/DTAuthenticity.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.06 } },
};
const VIEWPORT = { once: false, amount: 0.28, margin: "-12% 0% -20% 0%" } as const;

export default function DTAuthenticity({
  mediaSrc = "/auth.jpg",
  videoSrc,
}: Props) {
  return (
    <section className="relative">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 bg-[#030303]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-20 md:py-28">
        {/* Heading */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-10 text-center md:mb-14"
        >
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
            whileInView="show"
            viewport={VIEWPORT}
            className="min-w-0 md:col-span-5 md:self-center space-y-6"
          >
            {FEATURES.map((t, i) => (
              <motion.li key={i} variants={ITEM}>
                <div className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-white">
                    <div className="h-4 w-4 rounded-[3px] bg-neutral-900" />
                  </div>
                  <div className="h-10 w-px bg-white/15" />
                  <p className="typo-small text-white/80">{t}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right — media window */}
          <motion.div
            variants={VISUAL}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="min-w-0 md:col-span-7"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* Keep a friendly aspect on mobile; grow taller on desktop */}
              <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[650px]">
                {videoSrc ? (
                  <video
                    src={videoSrc}
                    poster={mediaSrc}
                    className="absolute inset-0 h-full w-full object-contain"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={mediaSrc}
                    alt="Authenticity showcase"
                    fill
                    sizes="(min-width:1024px) 1200px, (min-width:640px) 90vw, 100vw"
                    className="object-contain"
                    priority
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
