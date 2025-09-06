// app/components/configgo/ConfiggoIntegrations.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Plug,
  Braces,
  Webhook,
  Zap,
  ShieldCheck,
  KeySquare,
  Search,
  Cloud,
  Database,
  MessageCircle,
  Mail,
  PhoneCall,
  Megaphone,
  Send, // keep as optional alt icon
  Globe,
  ClipboardCopy,
  Check,
  Filter as FilterIcon, // not used visually but kept if you want
} from "lucide-react";

/* -------------------- Animations -------------------- */
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
const PANEL = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.05 } },
};

/* -------------------- Logo wall data -------------------- */
type Logo = { name: string; Icon: any; tag: string };
const LOGOS: Logo[] = [
  { name: "WhatsApp (via provider)", Icon: MessageCircle, tag: "Channels" },
  { name: "SMS (Twilio)",            Icon: PhoneCall,     tag: "Channels" },
  { name: "Email (SendGrid)",        Icon: Mail,          tag: "Channels" },
  { name: "Meta Ads",                Icon: Megaphone,     tag: "Ads" },
  { name: "Google Ads",              Icon: Megaphone,     tag: "Ads" },
  { name: "Zapier",                  Icon: Zap,           tag: "Automation" },
  { name: "S3 / GCS",                Icon: Cloud,         tag: "Storage" },
  { name: "Warehouse (SQL)",         Icon: Database,      tag: "Data" },
];

const TAGS = ["All", "Channels", "Ads", "Automation", "Storage", "Data"] as const;
type Tag = typeof TAGS[number];

/* -------------------- Component -------------------- */
export default function ConfiggoIntegrations() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => { inView ? controls.start("show") : controls.set("hidden"); }, [inView, controls]);

  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<Tag>("All");
  const [tab, setTab] = useState<"rest" | "webhooks">("rest");
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LOGOS.filter((l) => (tag === "All" || l.tag === tag) && (!q || l.name.toLowerCase().includes(q)));
  }, [query, tag]);

  const apiKey = "sk_live_••••_configgo_demo_key";
  function copyKey() {
    navigator.clipboard?.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <section ref={ref} id="integrations" className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />
      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-10 text-center">
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Integrations & API
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Connect <span className="text-[#C6F24E]">everything</span>. Build <span className="text-[#C6F24E]">anything</span>.
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-3 text-white/70 max-w-[860px] mx-auto">
            Plug into channels, ads, automation and data platforms. Use our REST API and webhooks to sync leads,
            inventory and deals to your data warehouse and internal tools.
          </motion.p>
        </motion.div>

        {/* Filters + logo wall */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-10">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/85 w-full sm:w-auto">
              <Search className="h-4 w-4" />
              <input
                placeholder="Search integrations…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-white/50"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={[
                    "rounded-full border px-3 py-1.5 text-xs transition",
                    tag === t
                      ? "bg-[#C6F24E] text-black border-transparent"
                      : "bg-white/10 text-white/85 border-white/15 hover:bg-white/15",
                  ].join(" ")}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {filtered.map((l, i) => (
              <motion.div
                key={l.name}
                variants={ITEM}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-3 shadow-[0_14px_36px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                    <l.Icon className="h-4.5 w-4.5 text-[#C6F24E]" />
                  </div>
                  <div className="truncate text-sm text-white/90">{l.name}</div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-white/60">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#C6F24E]" />
                  {l.tag}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Playground + Keys + Flow diagram */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* API playground */}
          <motion.div variants={PANEL} initial="hidden" animate={controls} className="md:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Braces className="h-4 w-4 text-[#C6F24E]" />
                  API playground
                </div>
                <div className="inline-flex rounded-full border border-white/15 bg-white/10 p-1 text-xs">
                  <button
                    onClick={() => setTab("rest")}
                    className={[
                      "rounded-full px-3 py-1.5 transition",
                      tab === "rest" ? "bg-[#C6F24E] text-black" : "text-white/85 hover:bg-white/10",
                    ].join(" ")}
                  >
                    REST
                  </button>
                  <button
                    onClick={() => setTab("webhooks")}
                    className={[
                      "rounded-full px-3 py-1.5 transition",
                      tab === "webhooks" ? "bg-[#C6F24E] text-black" : "text-white/85 hover:bg-white/10",
                    ].join(" ")}
                  >
                    Webhooks
                  </button>
                </div>
              </div>

              <div className="relative grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6">
                {tab === "rest" && (
                  <>
                    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                      <div className="mb-2 text-xs text-white/60">Request</div>
                      <CodeBlock
                        lines={[
                          `POST https://api.configgo.io/v1/leads`,
                          `Authorization: Bearer ${apiKey}`,
                          `Content-Type: application/json`,
                          ``,
                          `{`,
                          `  "full_name": "Mert Mutlu",`,
                          `  "email": "mert@example.com",`,
                          `  "phone": "+90 555 123 4567",`,
                          `  "project": "Vega Center",`,
                          `  "interested_in": "2+1"`,
                          `}`,
                        ]}
                      />
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                      <div className="mb-2 text-xs text-white/60">Response</div>
                      <CodeBlock
                        variant="json"
                        lines={[
                          `{`,
                          `  "id": "lead_42x9",`,
                          `  "status": "created",`,
                          `  "pipeline": "New > Contact",`,
                          `  "next_action": {`,
                          `    "type": "auto_reply",`,
                          `    "channel": "WhatsApp"`,
                          `  }`,
                          `}`,
                        ]}
                      />
                    </div>
                  </>
                )}

                {tab === "webhooks" && (
                  <>
                    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs text-white/60">
                        <Webhook className="h-3.5 w-3.5 text-[#C6F24E]" /> Events
                      </div>
                      <ul className="space-y-2 text-sm text-white/85">
                        {[
                          "lead.created",
                          "lead.updated",
                          "deal.stage_changed",
                          "booking.created",
                          "message.inbound",
                        ].map((e) => (
                          <li key={e} className="flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-[#C6F24E]" />
                            {e}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 text-[11px] text-white/60">
                        Signed with HMAC-SHA256. Retries with exponential backoff.
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                      <div className="mb-2 text-xs text-white/60">Sample payload</div>
                      <CodeBlock
                        variant="json"
                        lines={[
                          `{`,
                          `  "type": "deal.stage_changed",`,
                          `  "data": {`,
                          `    "deal_id": "deal_9a7q",`,
                          `    "from": "Qualified",`,
                          `    "to": "Booking"`,
                          `  },`,
                          `  "signature": "t=1733920000,v1=…",`,
                          `  "attempt": 1`,
                          `}`,
                        ]}
                      />
                    </div>
                  </>
                )}

                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 md:rounded-xl" />
              </div>
            </div>
            <p className="typo-small mt-4 text-white/60">
              Need GraphQL? Our REST endpoints return rich objects; a GraphQL layer is available for enterprise plans.
            </p>
          </motion.div>

          {/* Keys + Flow */}
          <motion.div variants={PANEL} initial="hidden" animate={controls} className="md:col-span-5 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white/85">
                  <KeySquare className="h-4 w-4 text-[#C6F24E]" />
                  API keys
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white/80">
                  <Globe className="h-3.5 w-3.5" /> https://api.configgo.io
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {["Live", "Test", "Sandbox"].map((env) => (
                  <div key={env} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80">
                    <div className="mb-1 text-white/60">{env}</div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate">{apiKey}</span>
                      <button
                        onClick={copyKey}
                        className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2 py-1 hover:bg-white/15"
                        title="Copy key"
                      >
                        {copied ? <Check className="h-3.5 w-3.5 text-[#C6F24E]" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                <Stat label="Rate limit" value="120/min" />
                <Stat label="Burst" value="30/s" />
                <Stat label="Uptime" value="99.95%" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <div className="mb-3 flex items-center gap-2 text-sm text-white/85">
                <Plug className="h-4 w-4 text-[#C6F24E]" />
                Data flow
              </div>
              <FlowDiagram play={inView} />
              <p className="typo-small mt-2 text-white/60">
                Channels & ads → Configgo → Webhooks / Warehouse. All events are signed and idempotent.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- UI bits -------------------- */
function CodeBlock({ lines, variant = "curl" }: { lines: string[]; variant?: "curl" | "json" }) {
  return (
    <pre className="overflow-auto rounded-lg bg-black/60 p-3 text-[12px] leading-relaxed ring-1 ring-white/10">
      <code className={variant === "json" ? "text-[#C6F24E]" : "text-white/90"}>
        {lines.join("\n")}
      </code>
    </pre>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
      <div className="text-[11px] text-white/60">{label}</div>
      <div className="text-sm font-[600] text-white">{value}</div>
    </div>
  );
}

function FlowDiagram({ play }: { play: boolean }) {
  const w = 640, h = 150;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <g>
        <Box x={20}  y={30}  w={150} h={70} label="Channels"  icon={<MessageCircle className="h-4 w-4" />} />
        <Box x={245} y={22}  w={150} h={86} label="Configgo"   icon={<ShieldCheck className="h-4 w-4" />} lime />
        <Box x={470} y={10}  w={150} h={55} label="Webhooks"   icon={<Webhook className="h-4 w-4" />} />
        <Box x={470} y={85}  w={150} h={55} label="Warehouse"  icon={<Database className="h-4 w-4" />} />
      </g>
      <Arrow from={{ x: 170, y: 65 }} to={{ x: 245, y: 65 }} play={play} />
      <Arrow from={{ x: 395, y: 55 }} to={{ x: 470, y: 38 }} play={play} />
      <Arrow from={{ x: 395, y: 75 }} to={{ x: 470, y: 102 }} play={play} />
    </svg>
  );
}

function Box({
  x, y, w, h, label, icon, lime,
}: { x: number; y: number; w: number; h: number; label: string; icon: React.ReactNode; lime?: boolean }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        width={w}
        height={h}
        rx="12"
        fill={lime ? "rgba(198,242,78,0.12)" : "rgba(255,255,255,0.06)"}
        stroke={lime ? "rgba(198,242,78,0.35)" : "rgba(255,255,255,0.12)"}
      />
      <foreignObject x="0" y="0" width={w} height={h}>
        <div className="flex h-full items-center justify-center gap-2 text-xs text-white/90">
          <span className="inline-grid h-6 w-6 place-items-center rounded-md bg-white/10 ring-1 ring-white/15 text-[#C6F24E]">
            {icon}
          </span>
          {label}
        </div>
      </foreignObject>
    </g>
  );
}

function Arrow({ from, to, play }: { from: { x: number; y: number }; to: { x: number; y: number }; play: boolean }) {
  return (
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="#C6F24E"
      strokeWidth="2.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={play ? { pathLength: 1, transition: { duration: 0.9, ease: "easeOut" } } : {}}
    />
  );
}
