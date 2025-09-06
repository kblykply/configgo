// app/components/configgo/ConfiggoReporting.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BarChart3,
  Download,
  CalendarRange,
  Filter,
  TrendingUp,
  ArrowUpRight,
  Building2,
  Megaphone,
  Users2,
} from "lucide-react";

type Range = "7d" | "30d" | "90d";
type GroupBy = "Team" | "Project" | "Source";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.08 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function ConfiggoReporting() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => { inView ? controls.start("show") : controls.set("hidden"); }, [inView, controls]);

  const [range, setRange] = useState<Range>("30d");
  const [groupBy, setGroupBy] = useState<GroupBy>("Source");

  /* --------- demo data (stable, light) --------- */
  const funnel = useMemo(() => [
    { label: "Leads",      value: 3200 },
    { label: "Contacted",  value: 2280 },
    { label: "Qualified",  value: 1150 },
    { label: "Won",        value: 268  },
  ], []);

  const trend = useMemo(() => (
    range === "7d"
      ? [14, 18, 22, 17, 25, 28, 24]
      : range === "30d"
      ? [12, 14, 16, 18, 22, 21, 19, 24, 26, 25, 28, 27, 26, 29, 31]
      : [6, 8, 10, 12, 11, 13, 15, 14, 16, 17, 18, 20, 22, 21, 19, 23, 25, 24]
  ), [range]);

  const leaderboard = useMemo(() => ([
    { icon: <Megaphone className="h-4 w-4" />, name: "Meta Ads",     leads: 1200, replies: 420, bookings: 160, roi: 4.6 },
    { icon: <Megaphone className="h-4 w-4" />, name: "Google Ads",   leads: 860,  replies: 310, bookings: 120, roi: 3.8 },
    { icon: <Users2 className="h-4 w-4" />,   name: "Brokers",       leads: 420,  replies: 210, bookings: 98,  roi: 5.2 },
    { icon: <Building2 className="h-4 w-4" />,name: "Sales Center",  leads: 260,  replies: 140, bookings: 66,  roi: 6.1 },
  ]), []);

  const heat = useMemo(() => {
    // 7 days x 24 hours (smaller for demo — 7 x 12)
    const out:number[][] = [];
    for (let d=0; d<7; d++) {
      const row:number[] = [];
      for (let h=0; h<12; h++) {
        // make afternoon/evening busier
        const base = h < 3 ? 2 : h < 6 ? 4 : h < 9 ? 7 : 10;
        row.push(base + Math.floor(Math.random() * 3));
      }
      out.push(row);
    }
    return out;
  }, [range]);

  const totalRevenue = 12.4; // $12.4M (demo)
  const winRate = Math.round((funnel[3].value / funnel[0].value) * 100);
  const replyRate = Math.round((funnel[1].value / funnel[0].value) * 100);

  return (
    <section ref={ref} className="relative" id="reporting">
      {/* different look: angled ribbon backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(198,242,78,0.06),rgba(198,242,78,0)_35%),radial-gradient(70%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_65%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Header ribbon & controls */}
        <div className="mb-8 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
          <div className="flex flex-col gap-4 border-b border-white/10 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#C6F24E]/15 ring-1 ring-[#C6F24E]/25">
                <BarChart3 className="h-5 w-5 text-[#C6F24E]" />
              </div>
              <div>
                <div className="typo-small-heading text-white/70">Reporting & dashboards</div>
                <h2 className="text-xl font-[500] text-white md:text-2xl">See what’s working — at a glance</h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* range */}
              {(["7d", "30d", "90d"] as Range[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={[
                    "rounded-full border px-3 py-1.5 text-xs transition",
                    range === r
                      ? "bg-[#C6F24E] text-black border-transparent"
                      : "bg-white/10 text-white/85 border-white/15 hover:bg-white/15",
                  ].join(" ")}
                >
                  {r}
                </button>
              ))}

              {/* group by */}
              <div className="ml-2 hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur-sm md:flex">
                {(["Team", "Project", "Source"] as GroupBy[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGroupBy(g)}
                    className={[
                      "rounded-full px-3 py-1.5 text-xs transition",
                      groupBy === g ? "bg-white text-black" : "text-white/85 hover:bg-white/10",
                    ].join(" ")}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <button className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/85 hover:bg-white/15">
                <Download className="h-3.5 w-3.5" /> Export
              </button>
            </div>
          </div>

          {/* top KPIs: different visual (donut rings) */}
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
            <KpiDonut label="Total revenue" value={totalRevenue} suffix="M" pct={72} play={inView} />
            <KpiDonut label="Reply rate" value={replyRate} suffix="%" pct={replyRate} play={inView} />
            <KpiDonut label="Win rate" value={winRate} suffix="%" pct={winRate} play={inView} />
          </div>
        </div>

        {/* Dashboard body: asymmetric split */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 gap-6 md:grid-cols-12"
        >
          {/* LEFT rail — big metric & funnel (square cards) */}
          <motion.div variants={ITEM} className="md:col-span-4 space-y-6">
            <div className="rounded-lg border border-dashed border-white/20 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/70">Revenue ({range})</div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#C6F24E]/15 px-2 py-0.5 text-[11px] text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
                  <TrendingUp className="h-3.5 w-3.5" /> +12%
                </span>
              </div>
              <div className="mt-2 text-3xl font-[600] text-white">
                ${totalRevenue.toFixed(1)}M
              </div>
              <div className="mt-1 text-xs text-white/50">Attributed to {groupBy.toLowerCase()} view</div>
            </div>

            <div className="rounded-lg border border-dashed border-white/20 bg-white/[0.03] p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm text-white/80">Conversion funnel</div>
                <Filter className="h-4 w-4 text-white/50" />
              </div>
              <ul className="space-y-3">
                {funnel.map((f, i) => {
                  const pct = Math.round((f.value / funnel[0].value) * 100);
                  return (
                    <li key={f.label}>
                      <div className="mb-1 flex items-center justify-between text-xs text-white/70">
                        <span>{f.label}</span>
                        <span className="rounded-full bg-white/10 px-2 py-0.5">{f.value.toLocaleString()}</span>
                      </div>
                      <div className="h-3 w-full rounded-[4px] bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${pct}%`, transition: { duration: 0.7, delay: 0.06 * i, ease: EASE } } : {}}
                          className="h-3 rounded-[4px] bg-[#C6F24E]"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          {/* RIGHT area — charts + leaderboard + heatmap */}
          <motion.div variants={ITEM} className="md:col-span-8 space-y-6">
            {/* Bookings trend (area) — new visual */}
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm text-white/80">Bookings trend</div>
                <div className="text-xs text-white/60 flex items-center gap-2">
                  <CalendarRange className="h-3.5 w-3.5" /> Last {range}
                </div>
              </div>
              <AreaChart data={trend} play={inView} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Leaderboard */}
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-3 text-sm text-white/80">{groupBy} leaderboard</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-white/60">
                      <tr className="border-b border-white/10">
                        <th className="py-2 pr-2">Name</th>
                        <th className="py-2 pr-2">Leads</th>
                        <th className="py-2 pr-2">Replies</th>
                        <th className="py-2 pr-2">Bookings</th>
                        <th className="py-2 pr-2 text-right">ROI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((row, i) => (
                        <motion.tr
                          key={row.name}
                          initial={{ opacity: 0, y: 8 }}
                          animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE, delay: 0.05 * i } } : {}}
                          className="border-b border-white/10/50 hover:bg-white/[0.03]"
                        >
                          <td className="py-2 pr-2">
                            <span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-md bg-white/5 ring-1 ring-white/10 text-[#C6F24E]">
                              {row.icon}
                            </span>
                            <span className="text-white/90">{row.name}</span>
                          </td>
                          <td className="py-2 pr-2 text-white/80">{row.leads.toLocaleString()}</td>
                          <td className="py-2 pr-2 text-white/80">{row.replies.toLocaleString()}</td>
                          <td className="py-2 pr-2 text-white/80">{row.bookings.toLocaleString()}</td>
                          <td className="py-2 pl-2 text-right">
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#C6F24E]/15 px-2 py-0.5 text-[11px] text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
                              {row.roi.toFixed(1)}× <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Response heatmap (hour x weekday) */}
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-3 text-sm text-white/80">Response-time heatmap</div>
                <Heatmap data={heat} />
                <div className="mt-2 text-[11px] text-white/60">
                  Darker = faster replies. Focus staffing on hot hours.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------- UI bits ----------------------- */
function KpiDonut({
  label, value, suffix, pct, play,
}: { label: string; value: number; suffix?: string; pct: number; play: boolean }) {
  const size = 98;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  return (
    <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-3">
      <svg width={size} height={size} className="shrink-0">
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.15)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size/2} cy={size/2} r={r}
          stroke="#C6F24E" strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={`${dash} ${c-dash}`}
          initial={{ strokeDashoffset: c }}
          animate={play ? { strokeDashoffset: c - dash, transition: { duration: 1, ease: "easeOut" } } : {}}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-white text-[12px] opacity-80">
          {pct}%
        </text>
      </svg>
      <div>
        <div className="text-sm text-white/70">{label}</div>
        <div className="text-xl font-[600] text-white">
          {suffix ? `${value}${suffix}` : value}
        </div>
      </div>
    </div>
  );
}

function AreaChart({ data, play }: { data: number[]; play: boolean }) {
  const w = 680, h = 180, pad = 16;
  const min = Math.min(...data), max = Math.max(...data);
  const normY = (v:number) => (1 - (v - min) / (max - min || 1)) * (h - pad*2) + pad;
  const stepX = (w - pad*2) / (data.length - 1);
  const pts = data.map((v,i)=>[pad + i*stepX, normY(v)] as const);
  const d = pts.map((p,i)=> i?`L ${p[0]} ${p[1]}`:`M ${p[0]} ${p[1]}`).join(" ");
  const dFill = `${d} L ${pad + (data.length-1)*stepX} ${h-pad} L ${pad} ${h-pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(198,242,78,0.30)" />
          <stop offset="100%" stopColor="rgba(198,242,78,0.02)" />
        </linearGradient>
      </defs>
      <line x1={pad} y1={h-pad} x2={w-pad} y2={h-pad} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <motion.path d={dFill} fill="url(#g)" initial={{ opacity: 0 }} animate={play ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} />
      <motion.path d={d} fill="none" stroke="#C6F24E" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={play ? { pathLength: 1 } : {}} transition={{ duration: 1.1, ease: "easeOut" }} />
      {pts.map(([x,y],i)=>(
        <motion.circle key={i} cx={x} cy={y} r="3" fill="#C6F24E" initial={{ scale: 0, opacity: 0 }} animate={play ? { scale: 1, opacity: 1, transition: { delay: 0.03*i } } : {}} />
      ))}
    </svg>
  );
}

function Heatmap({ data }: { data: number[][] }) {
  const rows = data.length, cols = data[0]?.length ?? 0;
  const flat = data.flat();
  const min = Math.min(...flat), max = Math.max(...flat);

  const color = (v:number) => {
    // darker = faster (higher value), map to lime shades
    const t = (v - min) / (max - min || 1);
    const a = 0.15 + t * 0.7;
    return `rgba(198,242,78,${a.toFixed(2)})`;
  };

  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const hours = Array.from({length: cols}, (_,i)=> i*2); // 0,2,... for labels

  return (
    <div className="grid grid-cols-[auto_1fr] gap-2">
      <div className="space-y-[6px] text-[11px] text-white/60">
        {days.map((d)=> <div key={d} className="h-6 leading-6">{d}</div>)}
      </div>
      <div className="overflow-x-auto">
        <div className="inline-grid gap-[6px]" style={{ gridTemplateColumns: `repeat(${cols}, 24px)` }}>
          {data.map((row, r) =>
            row.map((v, c) => (
              <div key={`${r}-${c}`} className="h-6 w-6 rounded-[4px] ring-1 ring-white/10" style={{ background: color(v) }} />
            ))
          )}
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-white/50 pr-1">
          {hours.map((h)=> <span key={h}>{h}:00</span>)}
        </div>
      </div>
    </div>
  );
}
