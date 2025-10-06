// app/components/digital-twin/DTDigitalCity.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  mediaSrc?: string; // /public path
  rightTitle?: string;
};

const POINTS = [
  "Explore digital replicas of entire neighborhoods and cities, unlocking a world of possibilities",
  "Conduct 3D searches and discoveries across vast urban landscapes, empowering informed decision-making",
  "Uncover layered data insights, unveiling the hidden stories behind each property and its surroundings",
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

export default function DTDigitalCity({
  mediaSrc = "/mega/ui.jpg",
  rightTitle = "Everything from a single building to an entire city",
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_0%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — dark card */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            animate={controls}
            className="md:col-span-6"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.55)] p-8 md:p-12">
              <motion.div variants={ITEM} className="mb-10">
                <p className="typo-h2-md text-white/85">Venture Into A</p>
                <h3 className="mt-2 font-[400] text-white md:text-[56px] leading-[1.02]">
                  Digital City
                </h3>
              </motion.div>

              <motion.ul variants={WRAP} className="space-y-8">
                {POINTS.map((t, i) => (
                  <motion.li key={i} variants={ITEM}>
                    <div className="grid grid-cols-[auto_1px_1fr] items-start gap-5">
                      <div className="flex items-center justify-center rounded-full bg-[#C6F24E] text-black h-10 w-10 md:h-12 md:w-12 font-medium">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="h-full w-px bg-white/20" />
                      <p className="typo-small text-white/80">
                        {t}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* RIGHT — lime media panel */}
          <motion.div
            variants={VISUAL}
            initial="hidden"
            animate={controls}
            className="md:col-span-6"
          >
            <div className="rounded-2xl bg-[#C6F24E] p-8 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              <h4 className="text-center text-black/80 font-[400] md:text-[28px]">
                {rightTitle}
              </h4>

              <div className="mt-6 rounded-xl border border-black/10 bg-black/80 p-3 shadow-lg">
                {/* window chrome */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                  <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                </div>

                <div className="relative aspect-[16/9] overflow-hidden rounded-[12px]">
                  <Image
                    src={mediaSrc}
                    alt="Digital city showcase"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 600px, 100vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
