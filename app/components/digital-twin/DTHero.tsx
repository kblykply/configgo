// app/components/digital-twin/DTHero.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const FILTERS = ["All Units", "Available", "1+1", "2+1"] as const;
type Filter = (typeof FILTERS)[number];

/* --- Animation variants --- */
const EASE = [0.22, 0.61, 0.36, 1] as const;

const ITEM = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

const VISUAL = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function DTHero() {
  const [active, setActive] = useState<Filter>("All Units");

  // retrigger-on-enter: watch the whole section
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.45, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section
      ref={sectionRef}
      className="relative z-0"
      style={{
        // 20vh reserved for fixed header, 80vh for the hero content
        minHeight: "calc(100svh - 20vh)",
        paddingTop: "20vh",
      }}
    >
      {/* soft backdrop swirl */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_70%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_62%)]" />

      {/* content grid */}
      <div className="relative z-[1] mx-auto grid max-w-[1450px] grid-cols-1 items-center gap-12 px-6 pb-20 pt-6 md:grid-cols-12 md:gap-12 md:pb-28">
        {/* left copy (new style) */}
        <motion.div
          variants={ITEM}
          initial="hidden"
          animate={controls}
          className="md:col-span-5"
        >
          {/* accent bar + stacked titles */}
          <div className="relative pl-6">
            <span className="absolute left-0 top-1 h-[88%] w-[3px] rounded-full bg-gradient-to-b from-[#C6F24E] to-white/30" />
            <h1 className="typo-hero-light mb-2 text-transparent bg-gradient-to-r from-white to-[#C6F24E] bg-clip-text md:text-[84px]">
              Digital Twins
            </h1>
            <p className="typo-small-heading mb-2 text-white/70">
              Instantly view available units with a single click
            </p>
          </div>

          <h2 className="typo-h2-md mt-4 mb-4 text-white/95">
            Effortless Apartment Filtering and Availability
          </h2>

          <p className="typo-small max-w-[560px] text-white/70">
            Simplify the search process by offering filtering options based on
            apartment types. With just one click, clients can instantly view
            available units, streamlining decision-making and enhancing the user
            experience.
          </p>

          {/* glowing segmented filter */}
          <div className="mt-8 flex flex-wrap gap-3">
            {FILTERS.map((label) => {
              const isActive = active === label;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(label)}
                  className={[
                    "rounded-full px-5 py-3 text-sm transition shadow-sm border backdrop-blur-sm",
                    isActive
                      ? "bg-[#C6F24E] text-black border-transparent shadow-[0_0_0_6px_rgba(198,242,78,0.15)]"
                      : "bg-white/5 text-white/85 border-white/10 hover:bg-white/10",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* right visual (tilted window style) */}
        <motion.div
          variants={VISUAL}
          initial="hidden"
          animate={controls}
          className="md:col-span-7"
        >
          <div className="-rotate-1 transition-transform duration-500 hover:rotate-0">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              {/* window top bar */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>

              {/* hero image/video */}
              <div className="relative aspect-[16/9]">
                <Image
                  src="/digital-twin/hero.jpg"
                  alt="Digital twin showcase"
                  fill
                  priority
                  sizes="(min-width: 1024px) 740px, 100vw"
                  className="object-cover"
                />
                {/* subtle reflection */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_40%)] mix-blend-soft-light" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
