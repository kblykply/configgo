// app/components/WeatherCreationSection.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation, useInView, Variants } from "framer-motion";

type Mode = "snow" | "fog" | "cloud" | "precip";

const wrap: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1], staggerChildren: 0.06, when: "beforeChildren" },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] } },
};

// swap with your real images/videos
const PREVIEWS: Record<Mode, string> = {
  snow: "/weather/kar.png",
  fog: "/weather/rain.png",
  cloud: "/weather/cloud.png",
  precip: "/weather/fırtına.png",
};

export default function WeatherCreationSection() {
  const [mode, setMode] = useState<Mode>("snow");

  // re-trigger entrance when scrolled back into view
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35, margin: "-10% 0px -10% 0px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section ref={rootRef} className="relative overflow-hidden py-14 md:py-20">
      {/* ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 700px at 68% 20%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(900px 560px at 18% 46%, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1450px] px-6 md:px-10">
        <motion.div
          variants={wrap}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch"
        >
          {/* LEFT CARD */}
          <motion.div variants={item} className="lg:col-span-5 xl:col-span-4 flex">
            <div
              className="rounded-3xl p-7 md:p-8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.12)_100%)] 
                         shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/10
                         flex flex-col w-full h-full min-h-[320px]"
            >
              <div>
                <h3 className="text-white/80 text-[22px] leading-none mb-2">One-click</h3>
                <h2 className="text-white font-semibold text-[34px] md:text-[38px] leading-[1.05] mb-4">
                  Weather <span className="text-[#C6F24E]">Creation</span>
                </h2>
                <p className="text-white/70 text-[15px] leading-6 max-w-[38ch]">
                  Discover the allure of different weather scenes
                </p>
              </div>

              <div
                role="radiogroup"
                aria-label="Weather modes"
                className="mt-7 grid grid-cols-2 gap-3"
              >
                <ModeButton label="Snow" icon={<IconSnow />} active={mode === "snow"} onClick={() => setMode("snow")} />
                <ModeButton label="Fog" icon={<IconFog />} active={mode === "fog"} onClick={() => setMode("fog")} />
                <ModeButton label="Cloud" icon={<IconCloud />} active={mode === "cloud"} onClick={() => setMode("cloud")} />
                <ModeButton
                  label="Precipitation"
                  icon={<IconPrecip />}
                  active={mode === "precip"}
                  onClick={() => setMode("precip")}
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT PREVIEW */}
          <motion.div variants={item} className="lg:col-span-7 xl:col-span-8 flex">
            <div className="relative rounded-[22px] overflow-hidden w-full h-full min-h-[320px]">
              {/* frame */}
              <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-2 ring-white/95 shadow-[0_30px_70px_rgba(0,0,0,0.5)]" />
              {/* fill the available height; image covers */}
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.992, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                    className="absolute inset-0 will-change-[opacity,transform,filter]"
                  >
                    <Image
                      src={PREVIEWS[mode]}
                      alt={`${mode} preview`}
                      fill
                      className="object-cover"
                      sizes="(min-width:1450px) 920px, (min-width:1024px) 58vw, 100vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============== UI Pieces ============== */
function ModeButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={
        "group relative flex items-center gap-2 rounded-xl px-4 h-[44px] text-[14px] " +
        "transition-colors select-none focus-visible:outline-none " +
        "focus-visible:ring-2 focus-visible:ring-[#C6F24E]/70 " +
        (active
          ? "text-[#C6F24E] bg-black/20 ring-1 ring-[#C6F24E] "
          : "text-white/80 ring-1 ring-white/10 hover:text-white hover:bg-white/5")
      }
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* radio dot */}
      <span
        className={
          "grid place-items-center w-4 h-4 rounded-full ring-1 mr-1 " +
          (active ? "ring-[#C6F24E]/80" : "ring-white/30")
        }
      >
        <span
          className={
            "block w-2 h-2 rounded-full " + (active ? "bg-[#C6F24E]" : "bg-transparent group-hover:bg-white/40")
          }
        />
      </span>
      {/* icon + label */}
      <span className="opacity-90">{icon}</span>
      <span className="leading-none">{label}</span>
    </button>
  );
}

/* Simple inline icons (swap with your set if desired) */
function IconSnow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3v18M3 12h18M5 7l14 10M19 7L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconFog() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 9h12M2 13h20M6 17h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconCloud() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 18h9a4 4 0 0 0 0-8 6 6 0 0 0-11.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconPrecip() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 18h9a4 4 0 0 0 0-8 6 6 0 0 0-11.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 20l1-2M12 21l1-2M16 20l1-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
