// app/components/configgo/ConfiggoPipelines.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BarChart3,
  ListChecks,
  BellRing,
  CalendarClock,
  ClipboardList,
  KanbanSquare, // used in copy only
  CheckCircle2,
  Clock,
} from "lucide-react";

type ViewMode = "graph" | "list";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.08 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const VISUAL = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.05 } },
};

const FUNNEL = [
  { stage: "New", count: 120 },
  { stage: "Contacted", count: 78 },
  { stage: "Qualified", count: 42 },
  { stage: "Offer", count: 21 },
  { stage: "Won", count: 9 },
];

const TREND_MINUTES = [4.6, 3.9, 3.5, 3.2, 3.6, 2.9, 3.1, 2.7];

export default function ConfiggoPipelines() {
  const [mode, setMode] = useState<ViewMode>("graph");

  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  const max = useMemo(() => Math.max(...FUNNEL.map((f) => f.count)), []);
  const first = FUNNEL[0].count;

  return (
    <section ref={ref} className="relative" id="pipelines">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-10 text-center">
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Sales pipelines & tasks
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Move deals forward with <span className="text-[#C6F24E]">playbooks</span>, SLAs & reminders
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — features */}
          <motion.aside
            variants={WRAP}
            initial="hidden"
            animate={controls}
            className="md:col-span-5"
          >
            <motion.p variants={ITEM} className="typo-small text-white/70">
              Customize stages, enforce follow-ups, and keep every task visible. Replace clunky
              boards with a clear funnel and response-time trends, or switch to a compact list view.
            </motion.p>

            <motion.ul variants={WRAP} className="mt-6 space-y-3">
              {[
                { Icon: KanbanSquare, txt: "Custom pipelines per project with stage SLAs" },
                { Icon: BellRing, txt: "Auto-reminders & escalations on idle deals" },
                { Icon: ClipboardList, txt: "Task templates & playbooks for consistent follow-up" },
                { Icon: CalendarClock, txt: "Calendar sync for meetings & site visits" },
              ].map(({ Icon, txt }) => (
                <motion.li key={txt} variants={ITEM} className="flex items-start gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                    <Icon className="h-4 w-4 text-[#C6F24E]" />
                  </div>
                  <span className="typo-small text-white/80">{txt}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* KPIs */}
            <motion.div
              variants={ITEM}
              className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
            >
              <div>
                <div className="text-xl font-[600] text-[#C6F24E]">+32%</div>
                <div className="text-xs text-white/70">Stage conversion</div>
              </div>
              <div>
                <div className="text-xl font-[600] text-[#C6F24E]">-41%</div>
                <div className="text-xs text-white/70">Idle time</div>
              </div>
              <div>
                <div className="text-xl font-[600] text-[#C6F24E]">3m</div>
                <div className="text-xs text-white/70">Avg. response</div>
              </div>
            </motion.div>

            {/* mode toggle */}
            <motion.div variants={ITEM} className="mt-6 inline-flex rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur-sm">
              <button
                onClick={() => setMode("graph")}
                aria-pressed={mode === "graph"}
                className={[
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                  mode === "graph" ? "bg-[#C6F24E] text-black" : "text-white/85 hover:bg-white/10",
                ].join(" ")}
              >
                <BarChart3 className="h-4 w-4" /> Graph
              </button>
              <button
                onClick={() => setMode("list")}
                aria-pressed={mode === "list"}
                className={[
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                  mode === "list" ? "bg-[#C6F24E] text-black" : "text-white/85 hover:bg-white/10",
                ].join(" ")}
              >
                <ListChecks className="h-4 w-4" /> List
              </button>
            </motion.div>
          </motion.aside>

          {/* RIGHT — visual */}
          <motion.div variants={VISUAL} initial="hidden" animate={controls} className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>

              <div className="relative aspect-[16/9] p-4 md:p-6">
                {/* GRAPH MODE */}
                {mode === "graph" && (
                  <motion.div
                    key="graph"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } }}
                    className="grid h-full grid-cols-1 gap-6 md:grid-cols-2"
                  >
                    {/* Stage Funnel */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="mb-2 text-sm text-white/80">Stage funnel</div>
                      <ul className="space-y-3">
                        {FUNNEL.map((f, i) => {
                          const pct = Math.round((f.count / max) * 100);
                          const conv = Math.max(1, Math.round((f.count / first) * 100));
                          return (
                            <li key={f.stage}>
                              <div className="mb-1 flex items-center justify-between text-xs text-white/70">
                                <span>{f.stage}</span>
                                <span className="inline-flex items-center gap-1">
                                  <span className="rounded-full bg-white/10 px-2 py-0.5">{f.count}</span>
                                  <span className="rounded-full bg-[#C6F24E]/15 px-2 py-0.5 text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
                                    {conv}%
                                  </span>
                                </span>
                              </div>
                              <div className="h-3 w-full rounded-full bg-white/10">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.7, delay: 0.06 * i, ease: EASE }}
                                  className="h-3 rounded-full bg-[#C6F24E]"
                                />
                              </div>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/70">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#C6F24E]" /> SLA: 15m
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5">
                          <Clock className="h-3.5 w-3.5 text-[#C6F24E]" /> Escalations on idle
                        </span>
                      </div>
                    </div>

                    {/* Response-time Sparkline */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="mb-2 text-sm text-white/80">Avg response time (min)</div>
                      <Sparkline data={TREND_MINUTES} play={inView} />
                      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-lg font-[600] text-[#C6F24E]">
                            {Math.min(...TREND_MINUTES)}m
                          </div>
                          <div className="text-[11px] text-white/70">Best</div>
                        </div>
                        <div>
                          <div className="text-lg font-[600] text-[#C6F24E]">
                            {avg(TREND_MINUTES)}m
                          </div>
                          <div className="text-[11px] text-white/70">Average</div>
                        </div>
                        <div>
                          <div className="text-lg font-[600] text-[#C6F24E]">
                            {Math.max(...TREND_MINUTES)}m
                          </div>
                          <div className="text-[11px] text-white/70">Peak</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* LIST MODE (compact) */}
                {mode === "list" && (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } }}
                    className="h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
                  >
                    <div className="grid grid-cols-12 border-b border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/60">
                      <div className="col-span-4">Deal</div>
                      <div className="col-span-3">Stage</div>
                      <div className="col-span-3">Next task</div>
                      <div className="col-span-2 text-right">SLA</div>
                    </div>
                    <div className="max-h-full overflow-auto">
                      {[1, 2, 3, 4, 5, 6].map((r) => (
                        <motion.div
                          key={r}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE, delay: 0.04 * r }}
                          className="grid grid-cols-12 items-center px-3 py-2 text-sm hover:bg-white/[0.03]"
                        >
                          <div className="col-span-4 truncate text-white">Lead #{r} — Vega Center</div>
                          <div className="col-span-3">
                            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/80">Qualified</span>
                          </div>
                          <div className="col-span-3 flex items-center gap-2 text-white/80">
                            <BellRing className="h-4 w-4 text-[#C6F24E]" />
                            Call back at 15:30
                          </div>
                          <div className="col-span-2 text-right text-white/80">
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#C6F24E]/15 px-2 py-0.5 text-[10px] text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
                              12m
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ring */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>

            {/* note */}
            <p className="typo-small mt-4 text-white/60">
              Enforce follow-ups with SLAs, auto-remind idle deals, and trigger task playbooks on stage change.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- tiny sparkline (pure SVG, no libs) ---------- */
function Sparkline({ data, play }: { data: number[]; play: boolean }) {
  const w = 420;
  const h = 110;
  const pad = 10;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const norm = (v: number) => (1 - (v - min) / (max - min || 1)) * (h - pad * 2) + pad;

  const stepX = (w - pad * 2) / (data.length - 1);
  const points = data.map((v, i) => [pad + i * stepX, norm(v)] as const);

  const d = points.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {/* grid line */}
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {/* path */}
      <motion.path
        d={d}
        fill="none"
        stroke="#C6F24E"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={play ? { pathLength: 1, transition: { duration: 1.1, ease: "easeOut" } } : {}}
      />
      {/* dots */}
      {points.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={3.2}
          fill="#C6F24E"
          initial={{ scale: 0, opacity: 0 }}
          animate={play ? { scale: 1, opacity: 1, transition: { delay: 0.05 * i } } : {}}
        />
      ))}
    </svg>
  );
}

function avg(nums: number[]) {
  return Math.round((nums.reduce((a, b) => a + b, 0) / (nums.length || 1)) * 10) / 10;
}
