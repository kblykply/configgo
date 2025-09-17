// app/components/ImmersiveSection.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, Variants, AnimatePresence } from "framer-motion";

type TabKey = "filter" | "weather" | "details" | "locations";

const wrap: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1], when: "beforeChildren", staggerChildren: 0.08 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 0.61, 0.36, 1] } },
};

const DECOR_SRC = "/3d.png"; // put your PNG here (e.g. /decor-3d.png)

export default function ImmersiveSection() {
  const [tab, setTab] = useState<TabKey>("details");

  // re-trigger animations on every re-entry
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35, margin: "-10% 0px -10% 0px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  /** ---- green gas (buttons) mouse-follow ---- */
  const fogWrapRef = useRef<HTMLDivElement>(null);
  const btnEls = useRef<HTMLButtonElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const s = useRef({ tx: 0, ty: 0, x: 0, y: 0, to: 0, o: 0, running: false });

  const registerBtn = (i: number) => (el: HTMLButtonElement | null) => {
    if (el) btnEls.current[i] = el;
  };

  const paintFog = () => {
    const w = fogWrapRef.current;
    if (!w) return;
    const wr = w.getBoundingClientRect();
    for (const el of btnEls.current) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const lx = s.current.x - (r.left - wr.left);
      const ly = s.current.y - (r.top - wr.top);
      el.style.setProperty("--mx", `${lx}px`);
      el.style.setProperty("--my", `${ly}px`);
      el.style.setProperty("--fog-o", `${s.current.o}`);
    }
  };

  const tick = () => {
    const kp = 0.16, ko = 0.14;
    s.current.x += (s.current.tx - s.current.x) * kp;
    s.current.y += (s.current.ty - s.current.y) * kp;
    s.current.o += (s.current.to - s.current.o) * ko;
    paintFog();
    if (s.current.o < 0.01 && s.current.to === 0) {
      s.current.o = 0; s.current.running = false; rafRef.current = null; return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };
  const startLoop = () => {
    if (!s.current.running) {
      s.current.running = true;
      rafRef.current = requestAnimationFrame(tick);
    }
  };
  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const w = fogWrapRef.current; if (!w) return;
    const r = w.getBoundingClientRect();
    s.current.tx = e.clientX - r.left; s.current.ty = e.clientY - r.top; s.current.to = 1; startLoop();
  };
  const onLeave = () => { s.current.to = 0; startLoop(); };

  // preview image per tab (drop your files in /public/digitaltwin/)
  const src =
    tab === "filter"    ? "/lagoon/filtre.jpg" :
    tab === "weather"   ? "/mega/sunpath.jpg" :
    tab === "details"   ? "/Shelton/tps.jpg" :
    tab === "locations" ? "/suncity/nearby.jpg" :
    "/digitaltwin/default.jpg";

  return (
    <section ref={rootRef} className="relative overflow-hidden py-16 md:py-24">
      {/* ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 700px at 70% 15%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(1000px 640px at 12% 40%, rgba(255,255,255,0.045), transparent 70%)",
        }}
      />

      {/* top-left ornament PNG */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-6 -left-4 md:-top-0 md:-left-0 z-[99]"
      >
        <motion.div
          initial={{ rotate: -8, y: -6, opacity: 0 }}
          animate={{ rotate: -8, y: -6, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Image
            src={DECOR_SRC}
            alt=""
            width={140}
            height={140}
            className="block w-[110px] h-[110px] md:w-[190px] md:h-[190px] object-contain"
            priority
          />
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1450px] px-6 md:px-10">
        <div className="h-px w-full bg-white/10 mb-10" />

        <motion.div variants={wrap} initial="hidden" animate={controls} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT */}
          <div className="lg:col-span-6 xl:col-span-5">
            <motion.h2 variants={item} className="mb-5">
              <span className="block font-[var(--font-heading)] font-[300] text-[46px] leading-[1] text-white">
                Immersive
              </span>
              <span className="block font-[var(--font-heading)] font-[600] text-[46px] leading-[1] text-[#C6F24E]">
                Digital Twin
              </span>
            </motion.h2>

            <motion.p
              variants={item}
              className="max-w-[640px] text-white/75 text-[16px] md:text-[17px] leading-[26px] text-justify"
            >
              Explore your project in depth with our Digital Twin. Filter and select the ideal unit, simulate sunlight and
              weather, inspect every architectural & technical detail, and understand the project’s context with nearby
              locations — all in one seamless, interactive experience.
            </motion.p>

            {/* Buttons with green gas */}
            <motion.div
              variants={item}
              ref={fogWrapRef}
              onMouseMove={onMove}
              onMouseEnter={onMove}
              onMouseLeave={onLeave}
              className="mt-9 grid grid-cols-2 md:grid-cols-4 gap-5 [isolation:isolate]"
              role="tablist"
              aria-label="Digital Twin features"
            >
              <FogButton
                refCb={registerBtn(0)}
                active={tab === "filter"}
                label="Filter and Select Best Unit"
                onClick={() => setTab("filter")}
              />
              <FogButton
                refCb={registerBtn(1)}
                active={tab === "weather"}
                label={<>See Different<br/>Weather &amp; Sunlight</>}
                onClick={() => setTab("weather")}
              />
              <FogButton
                refCb={registerBtn(2)}
                active={tab === "details"}
                label="See Every Detail of the Project"
                onClick={() => setTab("details")}
              />
              <FogButton
                refCb={registerBtn(3)}
                active={tab === "locations"}
                label="See the Near Locations"
                onClick={() => setTab("locations")}
              />
            </motion.div>
          </div>

          {/* RIGHT media (animated crossfade on tab change) */}
          <motion.div variants={item} className="lg:col-span-6 xl:col-span-7">
            <div className="relative rounded-[18px] overflow-hidden">
              {/* white frame + soft drop */}
              <div className="pointer-events-none absolute inset-0 rounded-[18px] ring-2 ring-white/95 shadow-[0_30px_60px_rgba(0,0,0,0.45)]" />
              <div className="relative w-full aspect-[16/9] bg-black/15">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.992, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                    className="absolute inset-0 will-change-transform will-change-opacity"
                  >
                    <Image
                      src={src}
                      alt="Feature preview"
                      fill
                      className="object-cover"
                      sizes="(min-width:1450px) 820px, (min-width:1024px) 55vw, 100vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-12 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}

/* ======================= Buttons with Green Gas ======================= */
function FogButton({
  label,
  active,
  onClick,
  refCb,
}: {
  label: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  refCb: (el: HTMLButtonElement | null) => void;
}) {
// replace the `base` string inside FogButton with this:
const base =
  "relative z-0 h-auto min-h-[64px] md:min-h-[56px] rounded-[12px] px-4 py-3 " +
  "text-[13px] md:text-[14px] leading-[1.25] whitespace-normal break-words " +
  "transition overflow-hidden select-none pointer-events-auto cursor-pointer " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6F24E]/70";


  return (
    <button
      type="button"
      ref={refCb}
      onClick={onClick}
      role="tab"
      aria-selected={!!active}
      className={
        base +
        (active
          ? " bg-white text-black shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          : " ring-1 ring-white/10 text-white/85 hover:text-white " +
            "bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.08)_100%)] " +
            "shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_24px_48px_rgba(0,0,0,0.40)]")
      }
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* green gas layer — BEHIND content, cannot intercept clicks */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(140px 140px at var(--mx) var(--my),
              rgba(182,225,61,0.50) 0%,
              rgba(182,225,61,0.18) 42%,
              rgba(182,225,61,0.00) 70%
            ),
            radial-gradient(300px 300px at var(--mx) var(--my),
              rgba(182,225,61,0.10) 0%,
              rgba(182,225,61,0.00) 78%
            )
          `,
          opacity: "var(--fog-o, 0)",
          filter: "saturate(115%)",
          transition: "opacity 200ms ease",
        }}
      />
      <span className="relative z-10 block text-left">{label}</span>
    </button>
  );
}
/* ======================= End Buttons with Green Gas ======================= */
