// app/components/configgo/ConfiggoOverview.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Megaphone,
  Share2,
  KanbanSquare,
  Building2,
  MessagesSquare,
  BarChart3,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
} from "lucide-react";

type Stage = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  points: string[];
};

const STAGES: Stage[] = [
  {
    title: "Lead Sources",
    icon: Megaphone,
    points: ["Web forms & QR", "Portals & Ads", "WhatsApp/Meta"],
  },
  {
    title: "Routing",
    icon: Share2,
    points: ["Rules & round-robin", "SLAs & dedupe", "Auto-enrich"],
  },
  {
    title: "Pipelines",
    icon: KanbanSquare,
    points: ["Custom stages", "Tasks & playbooks", "Approvals"],
  },
  {
    title: "Inventory",
    icon: Building2,
    points: ["Projects → Units", "Pricing & holds", "Discounts"],
  },
  {
    title: "Comms Hub",
    icon: MessagesSquare,
    points: ["WhatsApp/SMS/Email", "Voice & notes", "Templates"],
  },
  {
    title: "Reporting",
    icon: BarChart3,
    points: ["KPI dashboards", "Attribution & ROI", "Exports & API"],
  },
];

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.08 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

export default function ConfiggoOverview() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section id =  "overview" ref={ref} className="relative">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          animate={controls}
          className="mb-10 text-center"
        >
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Platform overview
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            From <span className="text-[#C6F24E]">lead</span> to <span className="text-[#C6F24E]">signed deal</span>, in one system
          </motion.h2>
        </motion.div>

        {/* Diagram wrapper (scrollable on mobile) */}
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          {/* edge fades for overflow */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[var(--background)] to-transparent rounded-l-2xl" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--background)] to-transparent rounded-r-2xl" />

          <motion.ol
            variants={WRAP}
            initial="hidden"
            animate={controls}
            className="flex snap-x snap-mandatory items-stretch overflow-x-auto gap-4 md:gap-6 md:grid md:grid-cols-12 md:overflow-visible md:snap-none"
          >
            {STAGES.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.li
                  key={s.title}
                  variants={ITEM}
                  className={[
                    "snap-center shrink-0 basis-[280px] md:basis-auto",
                    "md:col-span-2",
                  ].join(" ")}
                >
                  <div className="h-full rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#C6F24E]/15 ring-1 ring-[#C6F24E]/20">
                        <Icon className="h-5 w-5 text-[#C6F24E]" />
                      </div>
                      <h3 className="font-[500] text-white">{s.title}</h3>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-[2px] h-4 w-4 text-[#C6F24E]" />
                          <span className="typo-small text-white/80">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* connectors */}
                  {idx < STAGES.length - 1 && (
                    <>
                      {/* horizontal (md+) */}
                      <div className="relative mt-2 hidden h-8 items-center justify-center md:flex">
                        <ArrowRight className="h-5 w-5 text-white/40" />
                      </div>
                      {/* vertical/inline (mobile) */}
                      <div className="flex h-10 items-center justify-center md:hidden">
                        <ArrowDown className="h-5 w-5 text-white/40" />
                      </div>
                    </>
                  )}
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        {/* Caption */}
        <p className="typo-small mt-6 text-center text-white/65">
          Every layer stays in sync — inventory & availability drive offers, comms and dashboards in real time.
        </p>
      </div>
    </section>
  );
}
