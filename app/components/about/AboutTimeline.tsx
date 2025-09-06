// app/components/about/AboutTimeline.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import {
  Flag,
  Rocket,
  Building2,
  MessageSquare,
  Plug,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const HEADER_OFFSET = "20vh";
const EASE = [0.22, 0.61, 0.36, 1] as const;

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
  show:   { opacity: 1, x: 0,   scale: 1,     transition: { duration: 0.55, ease: EASE } },
};
const ITEM_RIGHT = {
  hidden: { opacity: 0, x: 24, scale: 0.98 },
  show:   { opacity: 1, x: 0,  scale: 1,     transition: { duration: 0.55, ease: EASE } },
};

type Step = {
  id: string;
  year: string;
  title: string;
  body: string;
  icon: ReactNode;
  image?: string; // optional media (local path under /public)
  badge?: string;
};

const STEPS: Step[] = [
  {
    id: "founded",
    year: "2021",
    title: "Founded Configgo",
    body:
      "Started with a simple idea: unify the messy mix of spreadsheets, CRMs and chat apps used in real estate sales.",
    icon: <Flag className="h-4 w-4 text-[#C6F24E]" />,
    image: "/covers/criter.jpg",
    badge: "Origin",
  },
  {
    id: "first-twin",
    year: "2022",
    title: "First Digital Twin deployments",
    body:
      "Launched interactive 3D experiences embedded on sales sites and kiosks—directly linked to live availability.",
    icon: <Rocket className="h-4 w-4 text-[#C6F24E]" />,
    image: "/projects/vega.jpg",
    badge: "Milestone",
  },
  {
    id: "omnichannel",
    year: "2023",
    title: "Omnichannel inbox + SLA",
    body:
      "Brought WhatsApp, email and SMS into one thread with SLA timers and assignment rules by office and pipeline stage.",
    icon: <MessageSquare className="h-4 w-4 text-[#C6F24E]" />,
    image: "/projects/Shelton.jpg",
  },
  {
    id: "inventory",
    year: "2024",
    title: "Inventory & availability for multi-project portfolios",
    body:
      "Rolled out price books, unit holds and reservations—so sales can answer pricing questions in seconds.",
    icon: <Building2 className="h-4 w-4 text-[#C6F24E]" />,
    image: "/covers/strada.jpg",
  },
  {
    id: "platform",
    year: "2025",
    title: "Integrations, API & enterprise security",
    body:
      "Added REST API, webhooks and SSO/SCIM options with fine-grained RBAC and audit logs for distributed teams.",
    icon: <Plug className="h-4 w-4 text-[#C6F24E]" />,
    image: "/covers/oriontower.jpg",
    badge: "Today",
  },
  {
    id: "trust",
    year: "Next",
    title: "Secure, AI-ready foundation",
    body:
      "Linking leads ↔ units ↔ conversations enables smarter routing, automation and predictive reporting while staying secure.",
    icon: <ShieldCheck className="h-4 w-4 text-[#C6F24E]" />,
  },
];

export default function AboutTimeline() {
  // Re-trigger animations every time the section is re-entered
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -20% 0px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative"
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* distinct background: center spine glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(198,242,78,0.0),rgba(198,242,78,0.25),rgba(198,242,78,0.0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(198,242,78,0.06),rgba(0,0,0,0)_60%)]" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1200px] px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          animate={controls}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
            <Sparkles className="h-3.5 w-3.5 text-[#C6F24E]" />
            Our story
          </div>
          <h2 className="typo-h2-md mt-3">
            From first twin to <span className="text-[#C6F24E]">unified platform</span>
          </h2>
          <p className="typo-small mt-2 text-white/70">
            A quick look at the milestones that shaped Configgo.
          </p>
        </motion.div>

        {/* Timeline */}
        <ol className="relative ml-0 grid grid-cols-1 gap-10 md:grid-cols-2">
          {STEPS.map((s, idx) => {
            const isLeft = idx % 2 === 0;
            const VARIANTS = isLeft ? ITEM_LEFT : ITEM_RIGHT;
            return (
              <motion.li
                key={s.id}
                variants={VARIANTS}
                initial="hidden"
                animate={controls}
                className={[
                  "relative",
                  "md:col-span-1",
                  isLeft ? "md:pr-10" : "md:pl-10 md:col-start-2",
                ].join(" ")}
              >
                {/* connector to center spine */}
                <span
                  aria-hidden
                  className={[
                    "absolute top-6 hidden h-px w-10 bg-white/15 md:block",
                    isLeft ? "right-0" : "left-0",
                  ].join(" ")}
                />

                {/* year & dot at the spine on md+ */}
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
                  <div className="grid grid-cols-1 gap-0 md:grid-cols-12">
                    {/* media (optional) */}
                    <div className="relative md:col-span-5">
                      <div className="relative aspect-[16/10] md:aspect-auto md:h-full">
                        {s.image ? (
                          <>
                            <Image
                              src={s.image}
                              alt={s.title}
                              fill
                              sizes="(min-width: 768px) 420px, 100vw"
                              className="object-cover"
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
                    <div className="md:col-span-7 p-4 md:p-5">
                      <h3 className="text-white text-lg font-[500]">{s.title}</h3>
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
          More on our roadmap in the product updates—new releases every few weeks.
        </div>
      </div>
    </section>
  );
}
