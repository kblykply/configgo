// app/components/about/AboutTimeline.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  Flag,
  Rocket,
  Beaker,
  MapPin,
  Car,
  FileBox,
  Landmark,
  Film,
  Layers,
  Sparkles,
} from "lucide-react";

/** Smaller top offset on phones, larger on desktop */
const HEADER_OFFSET = "clamp(64px, 14vh, 20vh)";
const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

const WRAP = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.06 },
  },
};

const ITEM_LEFT = {
  hidden: { opacity: 0, x: -24, scale: 0.98 },
  show:   { opacity: 1, x: 0,  scale: 1, transition: { duration: 0.55, ease: EASE } },
};
const ITEM_RIGHT = {
  hidden: { opacity: 0, x: 24, scale: 0.98 },
  show:   { opacity: 1, x: 0,  scale: 1, transition: { duration: 0.55, ease: EASE } },
};

type Step = {
  id: string;
  year: string;
  title: string;
  body: string;
  icon: ReactNode;
  image?: string;
  badge?: string;
};

const STEPS: Step[] = [
  { id: "founding", year: "Founding", title: "Founding & First CRM Integration", body: "Configgo founded; first unit added via CRM.", icon: <Flag className="h-4 w-4 text-[#C6F24E]" />, badge: "Origin", image: "/timeline/1.jpg" },
  { id: "first-demo", year: "Demo", title: "First Demo Application", body: "The first demo app was created under the name “PRR”.", icon: <Rocket className="h-4 w-4 text-[#C6F24E]" />, image: "/timeline/2.jpg" },
  { id: "rnd-cist", year: "R&D", title: "R&D (CIST)", body: "CIST built; auto unit cloning and Balcony added.", icon: <Beaker className="h-4 w-4 text-[#C6F24E]" />, image: "/timeline/3.jpg" },
  { id: "baglica", year: "Bağlıca", title: "Bağlıca Project Improvements", body: "Surroundings optimized; FPS, TPS, Car modes added.", icon: <Car className="h-4 w-4 text-[#C6F24E]" />, image: "/timeline/4.jpg" },
  { id: "mega-suncity", year: "Projects", title: "Mega 1453 & Sun City", body: "Mega 1453 & Sun City; map Land Markers added.", icon: <Landmark className="h-4 w-4 text-[#C6F24E]" />, image: "/timeline/5.jpg" },
  { id: "vivasi", year: "Vivasi", title: "Vivasi Project", body: "Vivasi: new doc format; Blender imports supported.", icon: <FileBox className="h-4 w-4 text-[#C6F24E]" />, image: "/timeline/6.jpg" },
  { id: "partal-baglica", year: "Partal Bağlıca", title: "Partal Bağlıca Project", body: "Overlay shows public land locations in project.", icon: <MapPin className="h-4 w-4 text-[#C6F24E]" />, image: "/timeline/7.jpg" },
  { id: "shelton", year: "Shelton", title: "Shelton Project", body: "Shelton: cinematic intro, opening, promo videos.", icon: <Film className="h-4 w-4 text-[#C6F24E]" />, image: "/timeline/8.jpg" },
  { id: "onyx", year: "Onyx", title: "Onyx Project", body: "Onyx: multiple balconies per unit now supported.", icon: <Layers className="h-4 w-4 text-[#C6F24E]" />, image: "/timeline/9.jpg" },
  { id: "current-next", year: "Today", title: "Current Work & What’s Next", body: "UI improved; Onyx demoed. Next: Auto Presentation.", icon: <Sparkles className="h-4 w-4 text-[#C6F24E]" />, image: "/timeline/10.jpg", badge: "Now" },
];

export default function AboutTimeline() {
  return (
    <section id="story" className="relative" style={{ scrollMarginTop: HEADER_OFFSET }}>
      {/* background spine + subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        {/* spine visible on md+ only */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(198,242,78,0.0),rgba(198,242,78,0.25),rgba(198,242,78,0.0))] md:block" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(198,242,78,0.06),rgba(0,0,0,0)_60%)]" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1200px] px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        {/* Header — start visible, animate on scroll */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-8 sm:mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
            <Sparkles className="h-3.5 w-3.5 text-[#C6F24E]" />
            Our Story
          </div>
          <h2 className="typo-h2-md mt-3">
            From the first integration to a <span className="text-[#C6F24E]">unified platform</span>
          </h2>
          <p className="typo-small mt-2 text-white/70">
            A quick look at the milestones that shaped Configgo.
          </p>
        </motion.div>

        {/* Timeline */}
        <ol className="relative ml-0 grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2">
          {STEPS.map((s, idx) => {
            const isLeft = idx % 2 === 0;
            const VARIANTS = isLeft ? ITEM_LEFT : ITEM_RIGHT;

            return (
              <motion.li
                key={s.id}
                variants={VARIANTS}
                initial={false}                   // do NOT start hidden (mobile-safe)
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className={[
                  "relative min-w-0",             // allow text to wrap on small screens
                  "md:col-span-1",
                  isLeft ? "md:pr-10" : "md:pl-10 md:col-start-2",
                ].join(" ")}
              >
                {/* connector (md+) */}
                <span
                  aria-hidden
                  className={[
                    "absolute top-6 hidden h-px w-10 bg-white/15 md:block",
                    isLeft ? "right-0" : "left-0",
                  ].join(" ")}
                />
                {/* spine dot (md+) */}
                <span
                  className={[
                    "pointer-events-none absolute top-[18px] hidden -translate-x-1/2 items-center gap-2 md:flex",
                    isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2",
                  ].join(" ")}
                >
                  <span className="h-2 w-2 rounded-full bg-[#C6F24E]" />
                </span>

                {/* card */}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                  {/* header row */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-2">
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <span className="inline-grid h-7 w-7 place-items-center rounded-md bg-white/10 ring-1 ring-white/15">
                        {s.icon}
                      </span>
                      <span className="font-medium">{s.year}</span>
                    </div>
                    {s.badge ? (
                      <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-white/80">
                        {s.badge}
                      </span>
                    ) : null}
                  </div>

                  {/* media + copy */}
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    {/* media (16:9) */}
                    <div className="relative md:col-span-5">
                      <div className="relative aspect-[16/9]">
                        {s.image ? (
                          <>
                            <Image
                              src={s.image}
                              alt={s.title}
                              fill
                              sizes="(min-width: 768px) 480px, 100vw"
                              className="object-cover"
                              priority={idx < 2}  // small boost for first items
                            />
                            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                          </>
                        ) : (
                          <div className="flex h-full min-h-[180px] items-center justify-center bg-white/[0.02] text-xs text-white/50">
                            (no image)
                          </div>
                        )}
                      </div>
                    </div>

                    {/* copy */}
                    <div className="min-w-0 p-4 md:col-span-7 md:p-5">
                      <h3 className="text-lg font-[500] text-white">{s.title}</h3>
                      <p className="mt-2 text-sm text-white/75">{s.body}</p>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* Closing caption */}
        <div className="mt-10 text-center text-[12px] text-white/60">
          More on our roadmap in product updates — new releases every few weeks.
        </div>
      </div>
    </section>
  );
}
