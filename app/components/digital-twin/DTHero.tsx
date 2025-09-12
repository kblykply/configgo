// app/components/digital-twin/DTHero.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};
const VISUAL = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

function preload(src: string, timeout = 1500) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    const done = () => resolve();
    img.onload = done;
    img.onerror = done; // resolve even if 404 -> we still finish the transition
    img.src = src;
    // safety net: never block forever
    window.setTimeout(done, timeout);
  });
}

export default function DTHero() {
  const [active, setActive] = useState<Filter>("All Units");

  // crossfade layers
  const [baseSrc, setBaseSrc] = useState(MEDIA["All Units"]); // visible layer
  const [topSrc, setTopSrc] = useState<string | null>(null);   // fades in over base
  const [topVisible, setTopVisible] = useState(false);         // controls opacity
  const [isSwitching, setIsSwitching] = useState(false);

  // retrigger-on-enter
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.45, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => { inView ? controls.start("show") : controls.set("hidden"); }, [inView, controls]);

  // warm cache
  useEffect(() => {
    Object.values(MEDIA).forEach((src) => { const i = new window.Image(); i.src = src; });
  }, []);

  async function handleTab(label: Filter) {
    if (label === active || isSwitching) return;

    setActive(label);                 // highlight button immediately
    setIsSwitching(true);

    const next = MEDIA[label];

    // preload next (with timeout fallback)
    await preload(next);

    // mount top layer and fade it in
    setTopSrc(next);
    // wait one microtask so the transition class applies
    requestAnimationFrame(() => setTopVisible(true));

    // after fade completes, swap base to next and clear top
    window.setTimeout(() => {
      setBaseSrc(next);
      setTopVisible(false);
      // small delay to let opacity go back to 0 before unmount
      window.setTimeout(() => { setTopSrc(null); setIsSwitching(false); }, 40);
    }, 220); // match duration-200 below
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-0"
      style={{ minHeight: "calc(100svh - 20vh)", paddingTop: "20vh", backgroundColor: "#000000",}}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_70%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_62%)]" />

      <div className="relative z-[1] mx-auto grid max-w-[1450px] grid-cols-1 items-center gap-12 px-6 pb-20 pt-6 md:grid-cols-12 md:gap-12 md:pb-28">
        {/* LEFT */}
        <motion.div variants={ITEM} initial="hidden" animate={controls} className="md:col-span-5 relative z-10">
          <div className="relative pl-6">
            <span className="absolute left-0 top-1 h-[88%] w-[3px] rounded-full bg-gradient-to-b from-[#C6F24E] to-white/30" />
         <motion.h1 variants={ITEM} className="typo-hero-light mt-2 text-white md:text-[72px]">
                    Digital Twin
                  </motion.h1>
            <p className="typo-small-heading mb-2 text-white/70">Instanly view available units with a single click</p>
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

      {/* RIGHT — full image, no crop/zoom, no shadow/border */}
<motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
  <div className="relative"> 
    <div
      className="relative w-full" 
      style={{ height: "min(70vh, 720px)" }} // adjust if you want taller/shorter
    >
      {/* Base image (always visible) */}
      <Image
        src={baseSrc}
        alt={`${active} — Digital twin`}
        fill
        priority={active === "All Units"}
        sizes="(min-width: 1024px) 740px, 100vw"
        className="object-contain"  // <- show full image, no crop
      />

      {/* Top image (simple cross-fade) */}
      {topSrc && (
        <Image
          src={topSrc}
          alt="Transition"
          fill
          sizes="(min-width: 1024px) 740px, 100vw"
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
