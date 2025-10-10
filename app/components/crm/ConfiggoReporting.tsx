// app/components/configgo/ConfiggoReporting.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

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

export default function ConfiggoReporting({
  imageSrc = "/crm/dashborad.jpg",
  imageAlt = "Reporting & dashboards visual",
}: {
  imageSrc?: string;
  imageAlt?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section ref={ref} className="relative" id="reporting">
      {/* angled ribbon + soft glow */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(198,242,78,0.06),rgba(198,242,78,0)_35%),radial-gradient(70%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_65%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-10 text-center">
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Reporting & dashboards
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            See what’s working — <span className="text-[#C6F24E]">at a glance</span>
          </motion.h2>
        </motion.div>

        {/* ONE IMAGE ONLY */}
        <motion.div variants={VISUAL} initial="hidden" animate={controls}>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            {/* window chrome */}
            <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              <div className="ml-3 text-xs text-white/60">Configgo · Reporting</div>
            </div>

            {/* image area — show the full image */}
            <div className="relative w-full bg-white/5">
              <Image
                src={imageSrc}         // update this path to your asset
                alt={imageAlt}
                width={1600}
                height={900}
                className="w-full h-auto object-contain"
                priority={false}
              />
              {/* inner ring */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>

          {/* note */}
          <p className="typo-small mt-4 text-white/60">
            Custom dashboards for teams, projects, and sources — exports included.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
