// app/components/configgo/ConfiggoIntegrations.tsx
"use client";

import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  Plug,
  ShieldCheck,
  KeySquare,
  Search,
  Cloud,
  Database,
  MessageCircle,
  Mail,
  PhoneCall,
  Megaphone,
  Zap,
  Globe,
  ClipboardCopy,
  Check,
  Webhook,
} from "lucide-react";

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
  const sectionRef = useRef<HTMLElement | null>(null);

  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<Tag>("All");
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LOGOS.filter(
      (l) => (tag === "All" || l.tag === tag) && (!q || l.name.toLowerCase().includes(q))
    );
  }, [query, tag]);

  const apiKey = "sk_live_••••_configgo_demo_key";
  function copyKey() {
    navigator.clipboard?.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <section ref={sectionRef} id="integrations" className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />
      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Header (static to avoid entrance animation issues) */}
        <div className="mb-10 text-center">
          <p className="typo-small-heading text-white/70">Integrations & API</p>
          <h2 className="typo-h2-md mt-2">
            Connect <span className="text-[#C6F24E]">everything</span>. Build{" "}
            <span className="text-[#C6F24E]">anything</span>.
          </h2>
          <p className="typo-small mt-3 text-white/70 max-w-[860px] mx-auto">
            Plug into channels, ads, automation and data platforms. Sync leads, inventory and deals with your
            internal tools and warehouse.
          </p>
        </div>

        {/* Filters + logo wall (no Framer gating; fully reactive) */}
        <div className="mb-10">
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
            {filtered.map((l) => (
              <div
                key={l.name}
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
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Keys + Flow (API playground removed) */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Keys */}
          <div className="md:col-span-5">
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
                        className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2 py-1 hover:bg白/15"
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
          </div>

          {/* Flow */}
          <div className="md:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <div className="mb-3 flex items-center gap-2 text-sm text-white/85">
                <Plug className="h-4 w-4 text-[#C6F24E]" />
                Data flow
              </div>
              <FlowDiagram />
              <p className="typo-small mt-2 text-white/60">
                Channels & ads → Configgo → Webhooks / Warehouse. All events are signed and idempotent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- UI bits -------------------- */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
      <div className="text-[11px] text-white/60">{label}</div>
      <div className="text-sm font-[600] text-white">{value}</div>
    </div>
  );
}

function FlowDiagram() {
  const w = 640, h = 150;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <g>
        <Box x={20}  y={30}  w={150} h={70} label="Channels"  icon={<MessageCircle className="h-4 w-4" />} />
        <Box x={245} y={22}  w={150} h={86} label="Configgo"   icon={<ShieldCheck className="h-4 w-4" />} lime />
        <Box x={470} y={10}  w={150} h={55} label="Webhooks"   icon={<Webhook className="h-4 w-4" />} />
        <Box x={470} y={85}  w={150} h={55} label="Warehouse"  icon={<Database className="h-4 w-4" />} />
      </g>
      {/* simple static lines (no entrance animation) */}
      <line x1={170} y1={65} x2={245} y2={65} stroke="#C6F24E" strokeWidth="2.5" strokeLinecap="round" />
      <line x1={395} y1={55} x2={470} y2={38} stroke="#C6F24E" strokeWidth="2.5" strokeLinecap="round" />
      <line x1={395} y1={75} x2={470} y2={102} stroke="#C6F24E" strokeWidth="2.5" strokeLinecap="round" />
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
