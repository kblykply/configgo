// app/components/about/AboutCareers.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Building2,
  CalendarDays,
  ArrowRight,
  Sparkles,
  UserPlus,
  Globe2,
} from "lucide-react";

/* ---------- header offset ---------- */
const HEADER_OFFSET = "20vh";

/* ---------- animations (per-block; no shared controller) ---------- */
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
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

/* ---------- data types ---------- */
type Mode = "Onsite" | "Hybrid" | "Remote";
type Team = "Engineering" | "Product" | "Design" | "Sales" | "Operations";
type Role = {
  id: string;
  title: string;
  team: Team;
  location: string;
  mode: Mode;
  type: "Full-time" | "Contract" | "Internship";
  posted: string; // ISO date
  href: string;
  tags?: string[];
  featured?: boolean;
};

/* ---------- demo roles (swap with your data) ---------- */
const ROLES: Role[] = [
  {
    id: "fe-1",
    title: "Senior Frontend Engineer",
    team: "Engineering",
    location: "Ankara",
    mode: "Hybrid",
    type: "Full-time",
    posted: "2025-08-20",
    href: "/contact",
    tags: ["React", "Next.js", "Design Systems"],
    featured: true,
  },
  {
    id: "pm-1",
    title: "Product Manager (Digital Twin)",
    team: "Product",
    location: "Istanbul",
    mode: "Hybrid",
    type: "Full-time",
    posted: "2025-08-10",
    href: "/contact",
    tags: ["PropTech", "APIs", "B2B"],
  },
  {
    id: "ds-1",
    title: "UX/UI Designer",
    team: "Design",
    location: "Remote (TR/EU)",
    mode: "Remote",
    type: "Full-time",
    posted: "2025-07-28",
    href: "/contact",
    tags: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    id: "sa-1",
    title: "Solutions Architect",
    team: "Engineering",
    location: "Istanbul",
    mode: "Onsite",
    type: "Full-time",
    posted: "2025-08-02",
    href: "/contact",
    tags: ["Pre-sales", "Integrations"],
  },
  {
    id: "ae-1",
    title: "Account Executive (Real Estate)",
    team: "Sales",
    location: "Ankara",
    mode: "Hybrid",
    type: "Full-time",
    posted: "2025-08-15",
    href: "/contact",
    tags: ["CRM", "Pipeline", "Field Sales"],
  },
  {
    id: "ops-1",
    title: "Operations Specialist",
    team: "Operations",
    location: "Ankara",
    mode: "Onsite",
    type: "Full-time",
    posted: "2025-07-12",
    href: "/contact",
    tags: ["Vendor Mgmt", "Logistics"],
  },
];

/* ---------- helpers ---------- */
const TEAMS: Array<"All" | Team> = ["All", "Engineering", "Product", "Design", "Sales", "Operations"];
const MODES: Array<"All" | Mode> = ["All", "Onsite", "Hybrid", "Remote"];
const LOCATIONS = ["All", ...Array.from(new Set(ROLES.map((r) => r.location)))];

function daysAgo(iso: string) {
  const d1 = new Date(iso).getTime();
  const d2 = Date.now();
  const diff = Math.max(0, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
  return diff;
}

/* ---------- component ---------- */
export default function AboutCareers() {
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState<(typeof TEAMS)[number]>("All");
  const [mode, setMode] = useState<(typeof MODES)[number]>("All");
  const [loc, setLoc] = useState<(typeof LOCATIONS)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROLES.filter((r) => {
      const byTeam = team === "All" || r.team === team;
      const byMode = mode === "All" || r.mode === mode;
      const byLoc = loc === "All" || r.location === loc;
      const byQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.team.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.tags?.some((t) => t.toLowerCase().includes(q));
      return byTeam && byMode && byLoc && byQuery;
    });
  }, [query, team, mode, loc]);

  const featured = useMemo(() => filtered.find((r) => r.featured) ?? filtered[0], [filtered]);

  return (
    <section id="careers" className="relative" style={{ scrollMarginTop: HEADER_OFFSET }}>
      {/* distinct background: split lime band + soft halo + micro grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-0 h-full w-[34%] bg-[linear-gradient(180deg,rgba(198,242,78,0.12),rgba(198,242,78,0.02))]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_60%_0%,rgba(198,242,78,0.06),rgba(0,0,0,0)_60%)]" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* header */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
          className="mb-6 md:mb-10"
        >
          <motion.div variants={ITEM} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
            <Briefcase className="h-3.5 w-3.5 text-[#C6F24E]" />
            Careers
          </motion.div>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-3">
            Join the team building <span className="text-[#C6F24E]">Configgo</span>
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-2 max-w-[760px] text-white/70">
            We’re shipping CRM, Digital Twin and the workflows between—come help us shape the stack for construction.
          </motion.p>
        </motion.div>

        {/* controls */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-10% 0px -20% 0px" }}
          className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4"
        >
          {/* search */}
          <motion.div variants={ITEM} className="md:col-span-5">
            <label className="sr-only" htmlFor="career-search">Search roles</label>
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2">
              <Search className="h-4 w-4 text-white/70" />
              <input
                id="career-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, team, skill, location…"
                className="w-full bg-transparent text-sm text-white placeholder-white/50 outline-none"
              />
            </div>
          </motion.div>

          {/* team */}
          <motion.div variants={ITEM} className="md:col-span-3">
            <Select
              icon={<Building2 className="h-4 w-4 text-[#C6F24E]" />}
              label="Team"
              value={team}
              onChange={setTeam}
              options={TEAMS}
            />
          </motion.div>

          {/* location */}
          <motion.div variants={ITEM} className="md:col-span-2">
            <Select
              icon={<MapPin className="h-4 w-4 text-[#C6F24E]" />}
              label="Location"
              value={loc}
              onChange={setLoc}
              options={LOCATIONS}
            />
          </motion.div>

          {/* mode */}
          <motion.div variants={ITEM} className="md:col-span-2">
            <Select
              icon={<Globe2 className="h-4 w-4 text-[#C6F24E]" />}
              label="Work mode"
              value={mode}
              onChange={setMode}
              options={MODES}
            />
          </motion.div>
        </motion.div>

        {/* spotlight + perks */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          {/* spotlight role */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2, margin: "-10% 0px -20% 0px" }}
            className="md:col-span-7"
          >
            {featured ? (
              <motion.div variants={ITEM} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-white/85">
                    <Sparkles className="h-4 w-4 text-[#C6F24E]" />
                    Featured role
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                    {featured.type}
                  </span>
                </div>

                <h3 className="text-white text-xl font-[500]">{featured.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] text-white/70">
                  <span className="inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5 text-[#C6F24E]" /> {featured.team}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[#C6F24E]" /> {featured.location}</span>
                  <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5 text-[#C6F24E]" /> Posted {daysAgo(featured.posted)}d ago</span>
                  <span className="inline-flex items-center gap-1"><Filter className="h-3.5 w-3.5 text-[#C6F24E]" /> {featured.mode}</span>
                </div>

                {featured.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {featured.tags.map((t) => (
                      <span key={t} className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white/85">{t}</span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4">
                  <Link
                    href={`${featured.href}?apply=1`}
                    className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#C6F24E] px-4 py-2 text-sm text-black hover:opacity-95"
                  >
                    Apply now <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* subtle ring */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </motion.div>
            ) : null}
          </motion.div>

          {/* perks/culture callouts */}
          <motion.ul
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2, margin: "-10% 0px -20% 0px" }}
            className="md:col-span-5 grid grid-cols-1 gap-3"
          >
            {[
              { k: "Hybrid-first", d: "We optimize for async + focus time. Offices in Ankara/Istanbul." },
              { k: "Growth budget", d: "Yearly stipend for courses, events and books." },
              { k: "Meaningful equity", d: "We win together; we share outcomes." },
              { k: "Modern stack", d: "Ship with Next.js, TypeScript, FR motion, clean APIs." },
            ].map((p) => (
              <motion.li key={p.k} variants={ITEM} className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
                <div className="text-white text-sm">{p.k}</div>
                <div className="text-[12px] text-white/65">{p.d}</div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* results list */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
          className="mt-10"
        >
          <motion.div variants={ITEM} className="mb-3 text-sm text-white/80">
            {filtered.length} open role{filtered.length === 1 ? "" : "s"}
          </motion.div>

          {filtered.length === 0 ? (
            <motion.div variants={ITEM} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="text-white/85">No matches found</div>
              <div className="mt-1 text-[12px] text-white/60">Try clearing filters or different keywords.</div>
              <div className="mt-4">
                <Link
                  href="/careers/talent-network"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
                >
                  <UserPlus className="h-4 w-4" />
                  Join our talent network
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.ul variants={WRAP} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filtered.map((r) => (
                <motion.li key={r.id} variants={ITEM}>
                  <JobCard r={r} />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */

function Select<T extends string>({
  icon,
  label,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: readonly T[];
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2">
      {icon}
      <label className="sr-only">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full bg-transparent text-sm text-white outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-black">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function JobCard({ r }: { r: Role }) {
  const isNew = daysAgo(r.posted) <= 21;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition hover:shadow-[0_26px_66px_rgba(0,0,0,0.5)]">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-white text-base font-[500]">{r.title}</div>
        <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
          {r.type}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-[12px] text-white/70">
        <span className="inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5 text-[#C6F24E]" /> {r.team}</span>
        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[#C6F24E]" /> {r.location}</span>
        <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5 text-[#C6F24E]" /> {daysAgo(r.posted)}d ago</span>
        <span className="inline-flex items-center gap-1"><Filter className="h-3.5 w-3.5 text-[#C6F24E]" /> {r.mode}</span>
        {isNew ? <span className="rounded-full border border-[#C6F24E]/50 bg-[#C6F24E]/20 px-2 py-0.5 text-[10px] text-white">New</span> : null}
      </div>

      {r.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {r.tags.map((t) => (
            <span key={t} className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white/85">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-4">
        <Link
          href={`${r.href}?apply=1`}
          className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#C6F24E] px-4 py-2 text-sm text-black transition hover:opacity-95"
        >
          Apply <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-[#C6F24E]/30" />
    </div>
  );
}
