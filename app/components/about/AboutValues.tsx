// app/components/about/AboutValues.tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  Compass,
  Rocket,
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  Target,
  Clock,
  Sparkles,
  RotateCcw,
  CalendarDays,
  GitBranch,
  Layers,
  Plug,
  BookOpen,
} from "lucide-react";

const HEADER_OFFSET = "20vh";
const EASE = [0.22, 0.61, 0.36, 1] as const;

const WRAP = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE, staggerChildren: 0.06 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.5, ease: EASE } },
};

type Value = { title: string; body: string; icon: ReactNode };
type Ritual = { title: string; body: string; badge: string; icon: ReactNode };
type Principle = { title: string; icon: ReactNode };

const VALUES: Value[] = [
  {
    title: "Start with the customer",
    body: "We build for developers, contractors, and sales teams first—workflows before features.",
    icon: <Compass className="h-5 w-5" />,
  },
  {
    title: "Ship small, ship often",
    body: "Short cycles, visible progress. Fewer blockers, more learning in production.",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    title: "Make it visual",
    body: "Digital Twin and data visuals reduce meetings and clarify decisions instantly.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Measure what matters",
    body: "Velocity, absorption, response time—KPIs that reflect real outcomes.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Default to secure",
    body: "Least privilege, audit trails, encryption—security as a product value.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Own the outcome",
    body: "We succeed when customers succeed—no handoffs without accountability.",
    icon: <Target className="h-5 w-5" />,
  },
];

const RITUALS: Ritual[] = [
  {
    title: "Daily stand-up",
    body: "Fast sync; blockers surfaced in minutes.",
    badge: "Daily",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    title: "Weekly ship demo",
    body: "Show, don’t tell. Real features, real users.",
    badge: "Weekly",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    title: "Monthly retro",
    body: "We iterate on process with the same rigor as product.",
    badge: "Monthly",
    icon: <RotateCcw className="h-4 w-4" />,
  },
  {
    title: "Quarterly roadmap",
    body: "Re-align bets with customer value and data.",
    badge: "Quarterly",
    icon: <CalendarDays className="h-4 w-4" />,
  },
];

const PRINCIPLES: Principle[] = [
  { title: "No silos",            icon: <GitBranch className="h-4 w-4" /> },
  { title: "Design for change",   icon: <Layers className="h-4 w-4" /> },
  { title: "APIs first",          icon: <Plug className="h-4 w-4" /> },
  { title: "Docs over chat",      icon: <BookOpen className="h-4 w-4" /> },
];

export default function AboutValues() {
  return (
    <section
      id="values"
      className="relative"
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* distinct bg: vertical accent + soft center halo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(180deg,rgba(198,242,78,0.8),rgba(198,242,78,0.2))]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(198,242,78,0.06),rgba(0,0,0,0)_60%)]" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
          className="mb-8 md:mb-12"
        >
          <motion.p variants={ITEM} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
            How we work
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Values we <span className="text-[#C6F24E]">hire</span> and <span className="text-[#C6F24E]">ship</span> by
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-2 max-w-[760px] text-white/70">
            The principles behind Configgo’s CRM, Digital Twin and everyday decisions.
          </motion.p>
        </motion.div>

        {/* Layout: Values (left) + Rituals/Principles (right) */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Values list */}
          <motion.ul
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2, margin: "-10% 0px -20% 0px" }}
            className="md:col-span-7 space-y-4"
          >
            {VALUES.map((v, i) => (
              <motion.li key={v.title} variants={ITEM}>
                <ValueRow index={i} {...v} />
              </motion.li>
            ))}
          </motion.ul>

          {/* Rituals & Principles */}
          <div className="md:col-span-5 space-y-6">
            {/* Rituals */}
            <motion.div
              variants={WRAP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            >
              <div className="border-b border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/85">
                Rituals we keep
              </div>
              <ul className="divide-y divide-white/10">
                {RITUALS.map((r) => (
                  <motion.li key={r.title} variants={ITEM} className="flex items-start gap-3 px-4 py-3">
                    <span className="mt-0.5 inline-grid h-8 w-8 place-items-center rounded-md bg-white/10 ring-1 ring-white/15 text-white">
                      {r.icon}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-white">{r.title}</div>
                        <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                          {r.badge}
                        </span>
                      </div>
                      <p className="text-[12px] text-white/65">{r.body}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Principles tiles */}
            <motion.div
              variants={WRAP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
              className="grid grid-cols-2 gap-3"
            >
              {PRINCIPLES.map((p) => (
                <motion.div
                  key={p.title}
                  variants={ITEM}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3"
                >
                  <span className="inline-grid h-7 w-7 place-items-center rounded-md bg-[#C6F24E]/15 text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
                    {p.icon}
                  </span>
                  <span className="text-sm text-white">{p.title}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Callout */}
            <motion.div
              variants={WRAP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
              className="rounded-2xl border border-[#C6F24E]/30 bg-[#C6F24E]/10 p-4 text-[13px] text-white/90"
            >
              We optimize for customer value per week—small bets, measurable impact, and relentless clarity.
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- helpers ---------------- */

function ValueRow({ index, title, body, icon }: { index: number; title: string; body: string; icon: ReactNode }) {
  const n = (index + 1).toString().padStart(2, "0");
  const isEven = index % 2 === 1;

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border p-4 md:p-5 transition",
        "border-white/10 bg-white/[0.035] hover:border-[#C6F24E]/40",
        isEven ? "md:ml-8" : "md:mr-8", // slight alternating offset for rhythm
      ].join(" ")}
    >
      {/* corner badge + subtle ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
        {n}
      </div>

      <div className="mb-2 flex items-center gap-3">
        <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-[#C6F24E]/15 text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
          {icon}
        </span>
        <h3 className="text-white text-lg font-[500]">{title}</h3>
      </div>
      <p className="text-sm text-white/75">{body}</p>
    </div>
  );
}
