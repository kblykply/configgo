// app/components/digital-twin/DTHero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FILTERS = ["All Units", "Available", "1+1", "2+1"] as const;
type Filter = (typeof FILTERS)[number];

// UPDATE THESE PATHS TO REAL FILES
const MEDIA: Record<Filter, string> = {
  "All Units": "/units/allunit.png",
  "Available": "/units/blue.png",
  "1+1": "/units/green.png",
  "2+1": "/units/purple.png",
};

const EASE = [0.22, 0.61, 0.36, 1] as const;
const ITEM = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};
const VISUAL = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};
// reveal early on phones, and don't re-hide once shown
const VIEWPORT = { once: false, amount: 0.3, margin: "-12% 0% -20% 0%" } as const;

function preload(src: string, timeout = 1500) {
  return new Promise<void>((resolve) => {
    // guard against SSR
    if (typeof window === "undefined") return resolve();
    const img = new window.Image();
    const done = () => resolve();
    img.onload = done;
    img.onerror = done;
    img.src = src;
    window.setTimeout(done, timeout);
  });
}

export default function DTHero() {
  const [active, setActive] = useState<Filter>("All Units");

  // crossfade layers
  const [baseSrc, setBaseSrc] = useState(MEDIA["All Units"]);
  const [topSrc, setTopSrc]   = useState<string | null>(null);
  const [topVisible, setTopVisible] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  // warm the cache
  useEffect(() => {
    if (typeof window === "undefined") return;
    Object.values(MEDIA).forEach((src) => {
      const i = new window.Image();
      i.src = src;
    });
  }, []);

  async function handleTab(label: Filter) {
    if (label === active || isSwitching) return;
    setActive(label);
    setIsSwitching(true);

    const next = MEDIA[label];
    await preload(next);

    setTopSrc(next);
    requestAnimationFrame(() => setTopVisible(true));
    window.setTimeout(() => {
      setBaseSrc(next);
      setTopVisible(false);
      window.setTimeout(() => { setTopSrc(null); setIsSwitching(false); }, 40);
    }, 220);
  }

  return (
    <section
      className="relative z-0"
      style={{
        minHeight: "calc(100svh - 20vh)",
        paddingTop: "20vh",
        scrollMarginTop: "20vh",
        backgroundColor: "#000000",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_70%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_62%)]" />

      <div className="relative z-[1] mx-auto grid max-w-[1450px] grid-cols-1 items-center gap-12 px-6 pb-20 pt-6 md:grid-cols-12 md:gap-12 md:pb-28">
        {/* LEFT */}
        <motion.div
          variants={ITEM}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="min-w-0 md:col-span-5 relative z-10"
        >
          <div className="relative pl-6">
            <span className="absolute left-0 top-1 h-[88%] w-[3px] rounded-full bg-gradient-to-b from-[#C6F24E] to-white/30" />
            <motion.h1 variants={ITEM} className="typo-hero-light mt-2 text-white md:text-[72px]">
              Digital Twin
            </motion.h1>
            <p className="typo-small-heading mb-2 text-white/70">Instantly view available units with a single click</p>
          </div>

          <h2 className="typo-h2-md mt-4 mb-4 text-white/95">Effortless Apartment Filtering and Availability</h2>

          <p className="typo-small max-w-[560px] text-white/70">
            Simplify the search process by offering filtering options based on apartment types. With one click,
            clients can instantly view available units.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {FILTERS.map((label) => {
              const isActive = active === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleTab(label)}
                  aria-pressed={isActive}
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

        {/* RIGHT — full image, no crop/zoom */}
        <motion.div
          variants={VISUAL}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="min-w-0 md:col-span-7"
        >
          <div className="relative">
            <div className="relative w-full" style={{ height: "min(70vh, 720px)" }}>
              {/* Base image */}
              <Image
                src={baseSrc}
                alt={`${active} — Digital twin`}
                fill
                priority={active === "All Units"}
                sizes="(min-width:1024px) 740px, (min-width:640px) 90vw, 100vw"
                className="object-contain"
              />
              {/* Cross-fade layer */}
              {topSrc && (
                <Image
                  src={topSrc}
                  alt="Transition"
                  fill
                  sizes="(min-width:1024px) 740px, (min-width:640px) 90vw, 100vw"
                  className={`object-contain transition-opacity duration-200 ease-linear ${
                    topVisible ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
