// app/components/configgo/ConfiggoMarketing.tsx
"use client";

import { motion } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";
import {
  Megaphone,
  Target,
  Mail,
  MessageCircle,
  Bot,
  SplitSquareHorizontal,
  Filter,
  CalendarClock,
  CheckCircle2,
} from "lucide-react";

type ViewTab = "journey" | "performance";

/* -------- Animations -------- */
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
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const VISUAL = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.05 } },
};
const VIEWPORT = { once: false, amount: 0.3, margin: "-15% 0% -25% 0%" } as const;

/* -------- Sample segment chips -------- */
const SEGMENTS = [
  { label: "2+1 interest" },
  { label: "Budget 200–400k" },
  { label: "TR + EN" },
  { label: "Visited Sales Center" },
  { label: "Source: Meta Ads" },
];

export default function ConfiggoMarketing() {
  const [tab, setTab] = useState<ViewTab>("journey");
  const [play, setPlay] = useState(false); // turn on inner anims when the visual enters

  return (
    <section className="relative" id="marketing">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-10 text-center"
        >
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Marketing automation & campaigns
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Segments, <span className="text-[#C6F24E]">journeys</span> & A/B testing — with ROI tracking
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — copy & bullets */}
          <motion.aside
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="min-w-0 md:col-span-5"
          >
            <motion.p variants={ITEM} className="typo-small text-white/70">
              Build audiences with real estate attributes, run multi-step journeys across WhatsApp, SMS and Email,
              and prove ROI with UTM/source tracking. Test subject lines and templates with built-in A/B.
            </motion.p>

            <motion.ul variants={WRAP} className="mt-6 space-y-3">
              {[
                { Icon: Filter, txt: "Segments by typology, budget, language, last activity" },
                { Icon: Bot,    txt: "Journeys with delays, branches and auto-stop on reply" },
                { Icon: SplitSquareHorizontal, txt: "A/B subject, send time and template variants" },
                { Icon: Target, txt: "UTM & source tracking mapped to pipelines & revenue" },
              ].map(({ Icon, txt }) => (
                <motion.li key={txt} variants={ITEM} className="flex items-start gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                    <Icon className="h-4 w-4 text-[#C6F24E]" />
                  </span>
                  <span className="typo-small text-white/80">{txt}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* segment chips */}
            <motion.div variants={ITEM} className="mt-8">
              <div className="mb-2 flex items-center gap-2 text-xs text-white/60">
                <Filter className="h-3.5 w-3.5" /> Sample segment
              </div>
              <div className="flex flex-wrap gap-2">
                {SEGMENTS.map((s) => (
                  <span key={s.label} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/85">
                    {s.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* quick KPIs */}
            <motion.div
              variants={ITEM}
              className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
            >
              <div><div className="text-xl font-[600] text-[#C6F24E]">48%</div><div className="text-xs text-white/70">Open rate</div></div>
              <div><div className="text-xl font-[600] text-[#C6F24E]">19%</div><div className="text-xs text-white/70">Reply rate</div></div>
              <div><div className="text-xl font-[600] text-[#C6F24E]">4.2×</div><div className="text-xs text-white/70">ROI</div></div>
            </motion.div>

            {/* tabs */}
            <motion.div variants={ITEM} className="mt-6 inline-flex w-full max-w-[420px] rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur-sm">
              <button
                onClick={() => setTab("journey")}
                aria-pressed={tab === "journey"}
                className={[
                  "flex-1 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm transition",
                  tab === "journey" ? "bg-[#C6F24E] text-black" : "text-white/85 hover:bg-white/10",
                ].join(" ")}
              >
                <Bot className="h-4 w-4" /> Journey
              </button>
              <button
                onClick={() => setTab("performance")}
                aria-pressed={tab === "performance"}
                className={[
                  "flex-1 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm transition",
                  tab === "performance" ? "bg-[#C6F24E] text-black" : "text-white/85 hover:bg-white/10",
                ].join(" ")}
              >
                <Megaphone className="h-4 w-4" /> Performance
              </button>
            </motion.div>
          </motion.aside>

          {/* RIGHT — visual container */}
          <motion.div
            variants={VISUAL}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            onViewportEnter={() => setPlay(true)}
            className="min-w-0 md:col-span-7"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <div className="ml-3 text-xs text-white/60">Campaign · Welcome 2+1 Buyers</div>
              </div>

              {/* Mobile vs Desktop views */}
              <div className="relative p-4 md:p-6 md:aspect-[16/9]">
                {/* MOBILE: show a vertical stepper / compact performance */}
                <div className="md:hidden">
                  {tab === "journey" ? <JourneyMobile play={play} /> : <PerformanceMobile play={play} />}
                </div>

                {/* DESKTOP: show the original canvas */}
                <div className="hidden md:block">
                  {tab === "journey" ? <JourneyDesktop play={play} /> : <PerformanceDesktop play={play} />}
                </div>

                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>

            <p className="typo-small mt-4 text-white/60">
              Stop journeys on reply automatically, and attribute every booking back to its source.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- MOBILE VIEWS -------------------- */
function JourneyMobile({ play }: { play: boolean }) {
  // A clean vertical stepper for small screens
  const steps = [
    { Icon: Target,          title: "Trigger",   sub: "Source: Meta Ads" },
    { Icon: Filter,          title: "Condition", sub: "Budget ≥ 200k" },
    { Icon: MessageCircle,   title: "WhatsApp",  sub: "Template: Intro + CTA", green: true },
    { Icon: CalendarClock,   title: "Delay",     sub: "Wait 1 day" },
    { Icon: Mail,            title: "Email",     sub: "Floor plan + booking", green: true },
  ];

  return (
    <ol className="relative pl-5">
      {/* vertical rail */}
      <span className="absolute left-2 top-0 h-full w-px bg-white/10" />
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, y: 8 }}
          animate={play ? { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE, delay: i * 0.06 } } : {}}
          className={[
            "relative mb-3 rounded-xl border p-3",
            s.green ? "border-[#C6F24E]/30 bg-[#C6F24E]/10 ring-1 ring-[#C6F24E]/20" : "border-white/10 bg-white/[0.04] ring-1 ring-white/10",
          ].join(" ")}
        >
          {/* dot on the rail */}
          <span className="absolute -left-4 top-4 inline-block h-2 w-2 rounded-full bg-[#C6F24E]" />
          <div className="flex items-center gap-2 text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5">
              <s.Icon className="h-4 w-4 text-[#C6F24E]" />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm">{s.title}</div>
              <div className="truncate text-[11px] text-white/65">{s.sub}</div>
            </div>
          </div>
        </motion.li>
      ))}
      <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white/80 ring-1 ring-white/15">
        <CheckCircle2 className="h-3.5 w-3.5 text-[#C6F24E]" /> Auto-stop on reply
      </div>
    </ol>
  );
}

function PerformanceMobile({ play }: { play: boolean }) {
  const stats = [
    { label: "Sent", value: "10,000" },
    { label: "Opens", value: "48%" },
    { label: "Replies", value: "19%" },
    { label: "Bookings", value: "6%" },
    { label: "ROI", value: "4.2×" },
  ];
  return (
    <div className="space-y-3">
      {/* compact cards */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            animate={play ? { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE, delay: i * 0.05 } } : {}}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-center"
          >
            <div className="text-xs text-white/70">{s.label}</div>
            <div className="text-lg font-semibold text-[#C6F24E]">{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* A/B winner preview */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <div className="mb-2 flex items-center gap-2 text-sm text-white/80">
          <SplitSquareHorizontal className="h-4 w-4 text-[#C6F24E]" />
          A/B test — subject
        </div>
        <div className="space-y-2">
          <div className="rounded-lg border border-white/10 bg-black/40 p-2 text-xs text-white/80">
            A — “Welcome to Vega Center” · Open 46% · Reply 17%
          </div>
          <div className="rounded-lg border border-[#C6F24E]/30 bg-[#C6F24E]/10 p-2 text-xs text-white/90">
            B — “2+1 units open this week” · Open 53% · Reply 19% <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px]">Winner</span>
          </div>
        </div>
        <div className="mt-2 text-[11px] text-white/60">Winner auto-applied after 1k sends.</div>
      </div>
    </div>
  );
}

/* -------------------- DESKTOP VIEWS (unchanged idea, responsive %) -------------------- */
function JourneyDesktop({ play }: { play: boolean }) {
  // percent widths so it scales; three across
  const W = 28;
  const centers = {
    t: 4 + W / 2,
    c: 36 + W / 2,
    r: 68 + W / 2,
    bC: 36 + W / 2,
    bR: 68 + W / 2,
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <Node x={4}  y={10} w={W} Icon={Target}         label="Trigger"   sub="Source: Meta Ads" />
      <Node x={36} y={12} w={W} Icon={Filter}         label="Condition" sub="Budget ≥ 200k" />
      <Node x={68} y={10} w={W} Icon={MessageCircle}  label="WhatsApp"  sub="Template: Intro + CTA" green />
      <Node x={36} y={55} w={W} Icon={CalendarClock}  label="Delay"     sub="Wait 1 day" />
      <Node x={68} y={55} w={W} Icon={Mail}           label="Email"     sub="Floor plan + booking" green />

      {/* connectors */}
      <Connector from={{ x: centers.t,  y: 18 }} to={{ x: centers.c,  y: 18 }} play={play} />
      <Connector from={{ x: centers.c,  y: 18 }} to={{ x: centers.r,  y: 18 }} play={play} />
      <Connector from={{ x: centers.c,  y: 18 }} to={{ x: centers.bC, y: 63 }} play={play} />
      <Connector from={{ x: centers.bC, y: 63 }} to={{ x: centers.bR, y: 63 }} play={play} />

      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white/80 ring-1 ring-white/15">
        <CheckCircle2 className="h-3.5 w-3.5 text-[#C6F24E]" /> Auto-stop on reply
      </div>
    </div>
  );
}

function PerformanceDesktop({ play }: { play: boolean }) {
  const stats = useMemo(
    () => [
      { label: "Sent",      value: 10000, fmt: (n: number) => n.toLocaleString() },
      { label: "Opens",     value: 4800,  fmt: (n: number) => (n / 100).toFixed(0) + "%" },
      { label: "Replies",   value: 1900,  fmt: (n: number) => (n / 100).toFixed(0) + "%" },
      { label: "Bookings",  value: 600,   fmt: (n: number) => (n / 100).toFixed(0) + "%" },
      { label: "ROI",       value: 420,   fmt: (n: number) => (n / 100).toFixed(1) + "×" },
    ],
    []
  );
  const max = Math.max(...stats.map((s) => s.value));

  return (
    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
      {/* bars */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-2 text-sm text-white/80">Campaign performance</div>
        <ul className="space-y-3">
          {stats.map((s, i) => {
            const pct = Math.round((s.value / max) * 100);
            return (
              <li key={s.label}>
                <div className="mb-1 flex items-center justify-between text-xs text-white/70">
                  <span>{s.label}</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5">{s.fmt(s.value)}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={play ? { width: `${pct}%`, transition: { duration: 0.7, delay: 0.06 * i, ease: EASE } } : {}}
                    className="h-3 rounded-full bg-[#C6F24E]"
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 text-[11px] text-white/60">
          Tracked via UTM/source → mapped to pipelines & revenue.
        </div>
      </div>

      {/* A/B card */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-white/80">
          <SplitSquareHorizontal className="h-4 w-4 text-[#C6F24E]" />
          A/B test — subject line
        </div>
        <div className="grid grid-cols-2 gap-3">
          <VariantCard title="A — “Welcome to Vega Center”" open={46} reply={17} winner={false} play={play} />
          <VariantCard title="B — “2+1 units open this week”" open={53} reply={19} winner={true} play={play} />
        </div>
        <div className="mt-3 text-[11px] text-white/60">Winner auto-applied after 1k sends.</div>
      </div>
    </div>
  );
}

/* -------- Shared bits -------- */
function Node({
  x, y, w = 28, Icon, label, sub, green,
}: {
  x: number; y: number; w?: number;
  Icon: any; label: string; sub?: string; green?: boolean;
}) {
  return (
    <div
      className={[
        "absolute rounded-xl border p-3 shadow-[0_12px_28px_rgba(0,0,0,0.35)]",
        "bg-white/[0.06] ring-1 ring-white/10",
        green ? "border-[#C6F24E]/30 bg-[#C6F24E]/12 ring-[#C6F24E]/25" : "border-white/10",
      ].join(" ")}
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%` }}
    >
      <div className="flex items-center gap-2 text-white">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5">
          <Icon className="h-4 w-4 text-[#C6F24E]" />
        </span>
        <div className="min-w-0">
          <div className="truncate text-[13px] md:text-sm">{label}</div>
          {sub && <div className="truncate text-[11px] text-white/65">{sub}</div>}
        </div>
      </div>
    </div>
  );
}

function Connector({
  from, to, play,
}: {
  from: { x: number; y: number };
  to:   { x: number; y: number };
  play: boolean;
}) {
  return (
    <svg className="pointer-events-none absolute left-0 top-0 h-full w-full">
      <motion.line
        x1={`${from.x}%`} y1={`${from.y}%`}
        x2={`${to.x}%`}   y2={`${to.y}%`}
        stroke="rgba(198,242,78,0.9)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={play ? { pathLength: 1, transition: { duration: 0.8, ease: "easeOut" } } : {}}
      />
    </svg>
  );
}

function VariantCard({
  title, open, reply, winner, play,
}: { title: string; open: number; reply: number; winner?: boolean; play: boolean }) {
  return (
    <div
      className={[
        "rounded-lg border p-3",
        winner ? "border-[#C6F24E]/40 bg-[#C6F24E]/10 ring-1 ring-[#C6F24E]/25" : "border-white/10 bg-white/[0.03]",
      ].join(" ")}
    >
      <div className="mb-1 text-xs text-white/70">{title}</div>
      <div className="grid grid-cols-2 gap-2">
        <MiniStat label="Open" value={open} play={play} />
        <MiniStat label="Reply" value={reply} play={play} />
      </div>
      {winner && (
        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/85">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#C6F24E]" /> Winner
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value, play }: { label: string; value: number; play: boolean }) {
  return (
    <div>
      <div className="text-[11px] text-white/60">{label}</div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={play ? { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } } : {}}
        className="text-lg font-[600] text-[#C6F24E]"
      >
        {value}%
      </motion.div>
    </div>
  );
}
