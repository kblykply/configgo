// app/components/configgo/ConfiggoSocialProof.tsx
"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Brand = { name: string; logo: string };

type Props = {
  brands?: Brand[];
  metrics?: Array<{ label: string; value: number; suffix?: string }>;
};

const DEFAULT_BRANDS: Brand[] = [
  { name: "NATA Holding", logo: "/brands/nata.svg" },
  { name: "Trinvest",     logo: "/brands/trinvest.svg" },
  { name: "Kosavalı",     logo: "/brands/kosavali.svg" },
  { name: "DND",          logo: "/brands/dnd.svg" },
  { name: "ONYX",         logo: "/brands/onyx.svg" },
  { name: "VisVadi",      logo: "/brands/visvadi.svg" },
];

const DEFAULT_METRICS = [
  { label: "Leads processed", value: 250_000, suffix: "+" },
  { label: "Units managed",   value: 35_000,  suffix: "+" },
  { label: "Avg. response time", value: 3, suffix: "m" },
];

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function ConfiggoSocialProof({
  brands = DEFAULT_BRANDS,
  metrics = DEFAULT_METRICS,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, margin: "-15% 0px -25% 0px" });

  return (
    <section ref={ref} className="relative">
      {/* soft bloom */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-10 md:py-14">
        {/* headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } : {}}
          className="mb-6 text-center"
        >
          <p className="typo-small-heading text-white/60">
            Trusted by forward-thinking developers and sales teams
          </p>
        </motion.div>

        {/* brands strip */}
        <div className="relative">
          {/* edge fades for overflow */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[var(--background)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--background)] to-transparent" />

          <ul className="flex snap-x snap-mandatory overflow-x-auto gap-8 py-3 px-1 md:justify-center md:overflow-x-visible md:snap-none">
            {brands.map((b) => (
              <li
                key={b.name}
                className="snap-start shrink-0 grayscale hover:grayscale-0 transition"
                title={b.name}
              >
                <div className="relative h-9 w-[140px] opacity-80 hover:opacity-100">
                  {/* subtle placeholder behind in case logo missing */}
                  <div className="absolute inset-0 rounded-md bg-white/5" />
                  <Image
                    src={b.logo}
                    alt={b.name}
                    fill
                    className="object-contain"
                    sizes="140px"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* metrics */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {metrics.map((m) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={
                inView ? { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } : {}
              }
              className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
            >
              <div className="text-2xl md:text-3xl font-[600] text-[#C6F24E]">
                <CountUp to={m.value} play={inView} />{m.suffix ?? ""}
              </div>
              <div className="mt-1 text-sm text-white/70">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- Tiny counter ----- */
function CountUp({ to, play, duration = 1200 }: { to: number; play: boolean; duration?: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [play, to, duration]);

  return <span>{n.toLocaleString()}</span>;
}
