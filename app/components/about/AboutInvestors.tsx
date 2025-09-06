// app/components/about/AboutInvestors.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Handshake,
  Sparkles,
  ExternalLink,
  Quote,
  Percent,
} from "lucide-react";

/* ---------- Header offset (your fixed header is ~20vh) ---------- */
const HEADER_OFFSET = "20vh";

/* ---------- Animations (replay on scroll, no state conflicts) ---------- */
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
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.45, ease: EASE } },
};

/* ---------- Types & Demo Data (replace with real) ---------- */
type Investor = {
  id: string;
  name: string;
  role?: string;
  logo?: string;     // /public/investors/logos/*.png
  href?: string;
};

type Advisor = {
  id: string;
  name: string;
  title: string;
  avatar?: string;   // /public/team/*.jpg
  areas: string[];
  href?: string;
  quote?: string;
};

const INVESTORS: Investor[] = [
  { id: "i1", name: "Eurasia Ventures", role: "Lead Investor", logo: "/investors/logos/eurasia.png", href: "#" },
  { id: "i2", name: "Ankara Capital",   role: "VC",            logo: "/investors/logos/ankara.png",  href: "#" },
  { id: "i3", name: "ConstructTech",    role: "Sector Fund",   logo: "/investors/logos/construct.png", href: "#" },
  { id: "i4", name: "Atlas Angels",     role: "Angels",        logo: "/investors/logos/atlas.png",   href: "#" },
  { id: "i5", name: "Bosporus Angels",  role: "Angels",        logo: "/investors/logos/bosporus.png", href: "#" },
  { id: "i6", name: "BuildCo Labs",     role: "Strategic",     logo: "/investors/logos/buildco.png", href: "#" },
];

const ADVISORS: Advisor[] = [
  { id: "a1", name: "Zeynep Çetin",  title: "Ex-VP Product, PropTech", avatar: "/team/ayse.jpg",  areas: ["Product Strategy", "Real-Estate Ops"], href: "#", quote: "Visual-first workflows win with sales teams." },
  { id: "a2", name: "Daniel Harris", title: "CTO (ex-AWS)",            avatar: "/team/mert.jpg",  areas: ["APIs", "Security", "Scale"], href: "#" },
  { id: "a3", name: "Ece Yıldız",    title: "Head of Growth, Fintech", avatar: "/team/selin.jpg", areas: ["Lifecycle", "Attribution"], href: "#", quote: "Routing + SLA drove response time down." },
  { id: "a4", name: "Marco Rossi",   title: "GM, EU Construction",     avatar: "/team/can.jpg",   areas: ["Enterprise Sales", "Partner GTM"], href: "#" },
];

/* Simple “cap table snapshot” (dummy numbers) */
const CAP = [
  { label: "VC Funds",   pct: 54 },
  { label: "Angels",     pct: 18 },
  { label: "Strategic",  pct: 12 },
  { label: "Team/Founders", pct: 16 },
];

/* ---------- Component ---------- */
export default function AboutInvestors() {
  const [tab, setTab] = useState<"investors" | "advisors">("investors");

  const counts = useMemo(
    () => ({ investors: INVESTORS.length, advisors: ADVISORS.length }),
    []
  );

  return (
    <section
      id="investors"
      className="relative"
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* distinct background: subtle grid + lime corner ribbon */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute -right-10 -top-10 h-56 w-56 rotate-12 rounded-xl bg-[linear-gradient(135deg,rgba(198,242,78,0.18),rgba(255,255,255,0.06))] blur-md" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
          className="mb-6 md:mb-10"
        >
          <motion.div variants={ITEM} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
            <Handshake className="h-3.5 w-3.5 text-[#C6F24E]" />
            Investors & advisors
          </motion.div>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-3">
            Backed by <span className="text-[#C6F24E]">operators</span> and sector leaders
          </motion.h2>

          {/* Tabs */}
          <motion.div variants={ITEM} className="mt-4 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 p-1 text-xs">
            <button
              onClick={() => setTab("investors")}
              aria-pressed={tab === "investors"}
              className={[
                "rounded-full px-3 py-1.5 transition",
                tab === "investors" ? "bg-[#C6F24E] text-black" : "text-white/85 hover:bg-white/10",
              ].join(" ")}
            >
              Investors <span className="ml-1 opacity-75">({counts.investors})</span>
            </button>
            <button
              onClick={() => setTab("advisors")}
              aria-pressed={tab === "advisors"}
              className={[
                "rounded-full px-3 py-1.5 transition",
                tab === "advisors" ? "bg-[#C6F24E] text-black" : "text-white/85 hover:bg-white/10",
              ].join(" ")}
            >
              Advisors <span className="ml-1 opacity-75">({counts.advisors})</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Content */}
        {tab === "investors" ? <InvestorsView /> : <AdvisorsView />}
      </div>
    </section>
  );
}

/* ---------- Investors View ---------- */
function InvestorsView() {
  return (
    <motion.div
      variants={WRAP}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
      className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12"
    >
      {/* Left: logos + quote */}
      <motion.div variants={ITEM} className="md:col-span-7">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <div className="mb-3 flex items-center gap-2 text-sm text-white/85">
            <Sparkles className="h-4 w-4 text-[#C6F24E]" />
            Selected investors
          </div>

          {/* Monochrome logo grid (color on hover) */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {INVESTORS.map((inv) => (
              <LogoCard key={inv.id} {...inv} />
            ))}
          </div>

          {/* Quote */}
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.05] p-4 text-sm text-white/85">
            <div className="mb-2 flex items-center gap-2 text-white/70">
              <Quote className="h-4 w-4 text-[#C6F24E]" />
              From our lead investor
            </div>
            “Configgo unifies CRM, live inventory and Digital Twin—clarity for construction sales.”
          </div>
        </div>
      </motion.div>

      {/* Right: cap table snapshot */}
      <motion.div variants={ITEM} className="md:col-span-5">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <div className="mb-3 flex items-center gap-2 text-sm text-white/85">
            <Percent className="h-4 w-4 text-[#C6F24E]" />
            Cap table snapshot
          </div>

          <div className="space-y-3">
            {CAP.map((c) => (
              <div key={c.label}>
                <div className="mb-1 flex items-center justify-between text-[12px] text-white/70">
                  <span>{c.label}</span>
                  <span>{c.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-[linear-gradient(90deg,#C6F24E,#c6f24e99)]"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-[11px] text-white/55">
            * For illustration only. Request the latest investor relations deck for details.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LogoCard({ name, logo, href, role }: Investor) {
  const content = (
    <div
      className="flex h-20 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 opacity-80 transition hover:opacity-100"
      title={role ? `${name} — ${role}` : name}
    >
      {logo ? (
        <Image
          src={logo}
          alt={name}
          width={180}
          height={40}
          className="max-h-8 w-auto object-contain grayscale hover:grayscale-0"
          sizes="180px"
        />
      ) : (
        <span className="text-xs text-white/70">{name}</span>
      )}
    </div>
  );
  return href ? (
    <Link href={href} aria-label={name} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}

/* ---------- Advisors View ---------- */
function AdvisorsView() {
  // Optional: pick first with quote as spotlight
  const spotlight = ADVISORS.find((a) => a.quote) ?? ADVISORS[0];

  return (
    <motion.div
      variants={WRAP}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
      className="grid grid-cols-1 gap-10"
    >
      {/* Spotlight */}
      {spotlight ? (
        <motion.div variants={ITEM} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <div className="mb-3 flex items-center gap-3">
            <Avatar name={spotlight.name} src={spotlight.avatar} size={52} />
            <div>
              <div className="text-white font-[500] leading-tight">{spotlight.name}</div>
              <div className="text-[12px] text-white/65">{spotlight.title}</div>
            </div>
            {spotlight.href ? (
              <Link href={spotlight.href} className="ml-auto inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white/80 hover:bg-white/15">
                Profile <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            ) : null}
          </div>
          {spotlight.quote ? (
            <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-[14px] text-white/85">
              <div className="mb-1 flex items-center gap-2 text-white/70">
                <Quote className="h-4 w-4 text-[#C6F24E]" />
                Spotlight insight
              </div>
              “{spotlight.quote}”
            </div>
          ) : null}
        </motion.div>
      ) : null}

      {/* Grid */}
      <motion.ul
        variants={WRAP}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ADVISORS.map((a) => (
          <motion.li key={a.id} variants={ITEM}>
            <AdvisorCard a={a} />
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

function AdvisorCard({ a }: { a: Advisor }) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="mb-3 flex items-center gap-3">
        <Avatar name={a.name} src={a.avatar} />
        <div>
          <div className="text-white font-[500] leading-tight">{a.name}</div>
          <div className="text-[12px] text-white/65">{a.title}</div>
        </div>
        {a.href ? (
          <Link
            href={a.href}
            className="ml-auto inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white/80 hover:bg-white/15"
          >
            Profile <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </div>

      {a.quote ? (
        <div className="mb-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-[13px] text-white/85">
          “{a.quote}”
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {a.areas.map((t) => (
          <span key={t} className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white/85">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Avatar({ name, src, size = 44 }: { name: string; src?: string; size?: number }) {
  const initials = getInitials(name);
  return src ? (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={name}
        fill
        sizes={`${size}px`}
        className="rounded-full object-cover ring-2 ring-[#C6F24E]/30"
      />
    </div>
  ) : (
    <div
      className="inline-grid place-items-center rounded-full bg-white/10 text-sm font-[600] text-white ring-2 ring-[#C6F24E]/30"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
}

/* ---------- Utils ---------- */
function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}
