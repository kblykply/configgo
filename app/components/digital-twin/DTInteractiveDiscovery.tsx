// app/components/digital-twin/DTInteractiveDiscovery.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  mediaSrc?: string;   // /public path
  videoSrc?: string;   // optional mp4/webm
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

export default function DTInteractiveDiscovery({
  mediaSrc = "/digital-twin/discovery.jpg",
  videoSrc,
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
                  <Image
                    src={mediaSrc}
                    alt="Interactive discovery view"
                    fill
                    sizes="(min-width: 1024px) 820px, 100vw"
                    className="object-cover"
                    priority
                  />
                )}
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
 <div className="grid h-16 w-16 min-w-[64px] shrink-0 place-items-center rounded-2xl bg-[#C6F24E] text-black shadow-[0_10px_24px_rgba(0,0,0,0.35)]">                    <span className="text-[20px] font-semibold">{String(i + 1).padStart(2, "0")}</span>
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
