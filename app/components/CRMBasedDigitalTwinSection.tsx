"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Database, Layers, ShieldCheck, Filter as FilterIcon, BarChart3, ArrowRight, Building2 } from "lucide-react";

/** ----- Feature Tabs ----- */
const FEATURES = [
  "Filter Apartments",
  "Apartment Interior Tour",
  "See the Apartment’s View",
  "First-Person (FPS) Site Tour",
  "Nearby Places & Distances",
  "Sun & Weather Simulation",
] as const;
type Feature = (typeof FEATURES)[number];

/** UPDATE THESE PATHS TO YOUR REAL FILES */
const MEDIA: Record<Feature, string> = {
  "Filter Apartments": "/prr/2.jpg",
  "Apartment Interior Tour": "/prr/3.jpg",
  "See the Apartment’s View": "/Vega/view.png",
  "First-Person (FPS) Site Tour": "/lagoon/fps.jpg",
  "Nearby Places & Distances": "/Vega/nearby.jpg",
  "Sun & Weather Simulation": "/Vega/sunpath.jpg",
};

const DESCRIPTIONS: Record<Feature, string> = {
  "Filter Apartments": "Instantly narrow by plan, floor, view, price, and availability—no page reloads.",
  "Apartment Interior Tour": "Walk through interiors with true-to-life materials, lighting, and dimensions.",
  "See the Apartment’s View": "Preview real vistas from each unit—angle, height, and orientation considered.",
  "First-Person (FPS) Site Tour": "Explore the site at ground level in a familiar first-person experience.",
  "Nearby Places & Distances": "See schools, hospitals, markets—with real travel times and distances.",
  "Sun & Weather Simulation": "Simulate daylight and weather to understand comfort across seasons.",
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
/** reveal early on phones; don't re-hide once shown */
const VIEWPORT = { once: false, amount: 0.3, margin: "-12% 0% -20% 0%" } as const;

function preload(src: string, timeout = 1500) {
  return new Promise<void>((resolve) => {
    if (typeof window === "undefined") return resolve();
    const img = new window.Image();
    const done = () => resolve();
    img.onload = done;
    img.onerror = done;
    img.src = src;
    window.setTimeout(done, timeout);
  });
}

export default function CRMBasedDTHero() {
  const [active, setActive] = useState<Feature>("Filter Apartments");

  // crossfade layers (like your DTHero)
  const [baseSrc, setBaseSrc] = useState(MEDIA["Filter Apartments"]);
  const [topSrc, setTopSrc] = useState<string | null>(null);
  const [topVisible, setTopVisible] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  // warm cache
  useEffect(() => {
    if (typeof window === "undefined") return;
    Object.values(MEDIA).forEach((src) => {
      const i = new window.Image();
      i.src = src;
    });
  }, []);

  async function handleTab(label: Feature) {
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
      window.setTimeout(() => {
        setTopSrc(null);
        setIsSwitching(false);
      }, 40);
    }, 220);
  }

  return (
    <section
      id="crm-dt"
      className="relative z-0"
      style={{
        minHeight: "calc(100svh - 20vh)",
        paddingTop: "20vh",
        scrollMarginTop: "20vh",
        backgroundColor: "#000000",
      }}
    >
      {/* radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_70%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_62%)]" />

      <div className="relative z-[1] mx-auto grid max-w-[1450px] grid-cols-1 items-center gap-10 px-4 sm:px-6 pb-20 pt-6 md:grid-cols-12 md:gap-12 md:pb-28">
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
            <motion.h1 variants={ITEM} className="mt-2 text-white text-4xl sm:text-6xl md:text-[72px] leading-[0.95]">
              CRM-Based Digital Twin
            </motion.h1>
            <p className="mt-3 text-white/70 text-sm sm:text-base">
              Live inventory, pricing, and documents—directly from your CRM.
            </p>
          </div>

          <h2 className="mt-5 mb-4 text-white/95 text-xl sm:text-2xl">Sync once. Stay current everywhere.</h2>

          {/* Bullet features (static list) */}
          <ul className="mt-3 space-y-2 text-white/80 text-sm sm:text-base">
            <li className="flex items-center gap-2">
              <Database className="h-4 w-4 text-[#C6F24E]" />
              Real-time sync from CRM (no double entry)
            </li>
            <li className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#C6F24E]" />
              Unified 2D/3D, docs, and availability
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#C6F24E]" />
              Role-based access, SSO/SCIM, audit trails
            </li>
            <li className="flex items-center gap-2">
              <FilterIcon className="h-4 w-4 text-[#C6F24E]" />
              Instant filtering by plan, floor, view, price
            </li>
            <li className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#C6F24E]" />
              Funnel & engagement analytics end-to-end
            </li>
          </ul>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/digital_twins#demo"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-black"
              style={{ background: "#C6F24E" }}
            >
              See Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/digital_twins"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/85 hover:bg-white/10"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/0 px-5 py-3 text-sm text-white/85 hover:bg-white/10"
            >
              Talk to Us
            </Link>
          </div>
        </motion.div>

        {/* RIGHT — feature visual with tabs pinned near image */}
        <motion.div
          variants={VISUAL}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="min-w-0 md:col-span-7"
        >
          <div className="relative">
            {/* Desktop/Tablet tabs ABOVE image */}
            <div className="mb-3 hidden md:flex md:flex-wrap md:gap-2">
              {FEATURES.map((label) => {
                const isActive = active === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleTab(label)}
                    aria-pressed={isActive}
                    className={[
                      "rounded-full px-4 py-2 text-xs transition border shadow-sm backdrop-blur-sm",
                      isActive
                        ? "bg-[#C6F24E] text-black border-transparent shadow-[0_0_0_5px_rgba(198,242,78,0.12)]"
                        : "bg-white/5 text-white/85 border-white/10 hover:bg-white/10",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Visual container */}
            <div
              className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
              style={{ height: "min(63vh, 600px)" }}
            >
              {/* Image base */}
              <Image
                src={baseSrc}
                alt={`${active} — CRM-Based Digital Twin`}
                fill
                priority
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

              {/* Info box overlay */}
              <div className="pointer-events-none absolute left-3 right-3 top-3 md:bottom-4 md:left-4 md:right-auto">
                <div className="inline-flex max-w-[92%] items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md">
                  <Building2 className="h-4 w-4 text-[#C6F24E]" />
                  <span className="text-xs text-white/85">{DESCRIPTIONS[active]}</span>
                </div>
              </div>

              {/* Mobile tabs OVER the image (pinned near it) */}
              <div
                className="
                  absolute bottom-2 left-2 right-2 md:hidden
                  rounded-xl border border-white/10 bg-black/30 backdrop-blur-md p-1
                "
              >
                <div
                  className="
                    flex gap-2 overflow-x-auto
                    [-ms-overflow-style:none] [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden
                  "
                >
                  {FEATURES.map((label) => {
                    const isActive = active === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => handleTab(label)}
                        aria-pressed={isActive}
                        className={[
                          "whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] transition border shadow-sm",
                          isActive
                            ? "bg-[#C6F24E] text-black border-transparent shadow-[0_0_0_4px_rgba(198,242,78,0.12)]"
                            : "bg-white/5 text-white/85 border-white/10 hover:bg-white/10",
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
