// app/components/digital-twin/DTTimesOfDay.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sunrise, Sun, Cloud, Moon } from "lucide-react";

type Props = {
  mediaSrc?: string;  // /public path (fallback image)
  videoSrc?: string;  // optional mp4/webm
};

type Mode = "dawn" | "day" | "cloudy" | "night";

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

const MODES: Array<{ key: Mode; label: string; Icon: any }> = [
  { key: "dawn",   label: "Sunrise", Icon: Sunrise },
  { key: "day",    label: "Day",     Icon: Sun },
  { key: "cloudy", label: "Cloudy",  Icon: Cloud },
  { key: "night",  label: "Night",   Icon: Moon },
];

// subtle color overlays to simulate times of day
const overlayFor = (mode: Mode): React.CSSProperties => {
  switch (mode) {
    case "dawn":
      return {
        background:
          "linear-gradient(180deg, rgba(255,182,72,.22) 0%, rgba(255,118,117,.18) 40%, rgba(0,0,0,.10) 100%)",
        mixBlendMode: "soft-light",
      };
    case "day":
      return { background: "linear-gradient(180deg, rgba(255,255,255,.04), rgba(0,0,0,.00))" };
    case "cloudy":
      return { background: "rgba(0,0,0,.18)", filter: "saturate(.85) brightness(.95)" as any };
    case "night":
      return { background: "rgba(0,0,0,.45)" };
  }
};

export default function DTTimesOfDay({
  mediaSrc = "/digital-twin/time.jpg",
  videoSrc,
}: Props) {
  const [mode, setMode] = useState<Mode>("day");
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.4, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  const overlayStyle = useMemo(() => overlayFor(mode), [mode]);

  return (
    <section ref={sectionRef} className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — title + controls */}
          <motion.div variants={WRAP} initial="hidden" animate={controls} className="md:col-span-5 md:pl-6">
            <motion.h3 variants={ITEM} className="typo-h2-md text-white/95">
              Change Time of Day
            </motion.h3>
            <motion.p variants={ITEM} className="typo-small mt-3 max-w-[520px] text-white/65">
              You can change the time of the day and check the sun&apos;s movement around your project
            </motion.p>

            <motion.div variants={WRAP} className="mt-8 flex flex-wrap gap-5">
              {MODES.map(({ key, label, Icon }) => {
                const active = mode === key;
                return (
                  <motion.button
                    key={key}
                    variants={ITEM}
                    type="button"
                    onClick={() => setMode(key)}
                    aria-pressed={active}
                    title={label}
                    className={[
                      "group grid h-20 w-20 place-items-center rounded-2xl border transition",
                      "shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-sm",
                      active
                        ? "border-white/20 bg-white/[0.10] ring-2 ring-[#C6F24E]/70"
                        : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]",
                    ].join(" ")}
                  >
                    <Icon
                      className={active ? "h-7 w-7 text-[#C6F24E]" : "h-7 w-7 text-white/70 group-hover:text-white/85"}
                      strokeWidth={2.2}
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT — media window */}
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
                    alt="Time of day showcase"
                    fill
                    sizes="(min-width: 1024px) 820px, 100vw"
                    className="object-cover"
                    priority
                  />
                )}

                {/* overlay tint responding to selected mode */}
                <motion.div
                  key={mode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="pointer-events-none absolute inset-0"
                  style={overlayStyle}
                />

                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
