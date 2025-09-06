// app/components/digital-twin/DTCrmOverview.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  mediaSrc?: string;   // /public path
  videoSrc?: string;   // optional mp4/webm
  unrealLogoSrc?: string;  // e.g. "/digital-twin/unreal.svg"
  icloneLogoSrc?: string;  // e.g. "/digital-twin/iclone.svg"
};

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

export default function DTCrmOverview({
  mediaSrc = "/digital-twin/overview.jpg",
  videoSrc,
  unrealLogoSrc = "/digital-twin/unreal.svg",
  icloneLogoSrc = "/digital-twin/iclone.svg",
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
   style={{
    paddingTop: "calc(var(--header-h, 72px) + 24px)",
     // if you ever anchor-link to this section, this prevents being hidden under the header
      scrollMarginTop: "calc(var(--header-h, 72px) + 24px)",
     }}
  >
      {/* subtle vignette / swirl */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_70%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Big heading */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          animate={controls}
          className="mb-10 text-center md:mb-14"
        >
          <motion.h2 variants={ITEM} className="typo-h2-md text-white/70">
            CRM Based
          </motion.h2>
          <motion.h1 variants={ITEM} className="typo-hero-light mt-2 text-white md:text-[72px]">
            Digital Twin
          </motion.h1>
          <motion.p variants={ITEM} className="typo-small mt-3 text-white/60">
            Transforming the Real Estate Sales Journey
          </motion.p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12">
          {/* Left copy + logos */}
          <motion.div variants={WRAP} initial="hidden" animate={controls} className="md:col-span-5">
            <motion.p variants={ITEM} className="typo-small-heading text-white/85">
              CRM-Based Digital Twin
            </motion.p>
            <motion.h3 variants={ITEM} className="typo-h2-md mt-2 text-white">
              <span className="font-[600]">Redefining Real Estate Visualization</span>
            </motion.h3>
            <motion.p variants={ITEM} className="typo-small mt-5 max-w-[560px] text-white/70">
              Interactive digital twins are virtual replicas of physical assets, processes, or systems that enable
              real-time interaction, simulation, and analysis. These tools are transforming industries such as
              construction, real estate, manufacturing, and urban planning by offering advanced capabilities for
              monitoring, collaboration, and optimization.
            </motion.p>

            {/* Logos */}
            <motion.div variants={WRAP} className="mt-8 flex items-center gap-10">
              <motion.div variants={ITEM} className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-white/6 ring-1 ring-white/10">
                  <Image src={unrealLogoSrc} alt="Unreal Engine" width={32} height={32} />
                </div>
                <span className="typo-small text-white/75">UNREAL<br />ENGINE</span>
              </motion.div>

              <motion.div variants={ITEM} className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-white/6 ring-1 ring-white/10">
                  <Image src={icloneLogoSrc} alt="iClone" width={32} height={32} />
                </div>
                <span className="typo-small text-white/75">iClone</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window chrome */}
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
                    alt="CRM-based digital twin showcase"
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
        </div>
      </div>
    </section>
  );
}
