// app/components/about/AboutOffices.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Globe2,
  Building2,
  Phone,
  Mail,
  Clock,
  Flag,
} from "lucide-react";
import type { ReactNode } from "react";

/* ----- header offset for your fixed 20vh header ----- */
const HEADER_OFFSET = "20vh";

/* ----- animations (replay on every viewport enter) ----- */
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

/* ----- data ----- */
type OfficeType = "HQ" | "Office" | "Partner";
type Office = {
  id: string;
  city: string;
  country: string;
  tz: string;          // IANA timezone
  type: OfficeType;
  address?: string;
  phone?: string;
  email?: string;
};

const OFFICES: Office[] = [
  {
    id: "ankara",
    city: "Ankara",
    country: "Türkiye",
    tz: "Europe/Istanbul",
    type: "HQ",
    address: "Mustafa Kemal Mah., Çankaya / Ankara",
    phone: "+90 312 000 00 00",
    email: "hq@configgo.com",
  },
  {
    id: "istanbul",
    city: "Istanbul",
    country: "Türkiye",
    tz: "Europe/Istanbul",
    type: "Office",
    address: "Maslak, Sarıyer / Istanbul",
    phone: "+90 212 000 00 00",
    email: "istanbul@configgo.com",
  },
  {
    id: "antalya",
    city: "Antalya",
    country: "Türkiye",
    tz: "Europe/Istanbul",
    type: "Office",
    address: "Muratpaşa / Antalya",
    email: "antalya@configgo.com",
  },
  {
    id: "nicosia",
    city: "Nicosia",
    country: "Cyprus",
    tz: "Asia/Nicosia",
    type: "Partner",
    address: "Nicosia",
    email: "cy@configgo.com",
  },
  {
    id: "berlin",
    city: "Berlin",
    country: "Germany",
    tz: "Europe/Berlin",
    type: "Partner",
    address: "Mitte, Berlin",
    email: "eu@configgo.com",
  },
  {
    id: "newyork",
    city: "New York",
    country: "USA",
    tz: "America/New_York",
    type: "Partner",
    address: "Manhattan, New York, NY",
    email: "us@configgo.com",
  },
];

/* ----- helpers: live local time per office ----- */
function useLocalTime(tz: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  try {
    const fmt = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: tz,
    });
    return fmt.format(now);
  } catch {
    return "—:—";
  }
}

export default function AboutOffices() {
  const stats = useMemo(() => {
    const regions = new Set<string>([
      ...OFFICES.map((o) => regionFromTZ(o.tz)),
    ]);
    return {
      offices: OFFICES.filter((o) => o.type !== "Partner").length,
      partners: OFFICES.filter((o) => o.type === "Partner").length,
      regions: regions.size,
      countries: new Set(OFFICES.map((o) => o.country)).size,
    };
  }, []);

  return (
    <section
      id="offices"
      className="relative"
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* distinct bg: split band + halo + tiny grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-0 h-full w-[36%] bg-[linear-gradient(180deg,rgba(198,242,78,0.10),rgba(198,242,78,0.02))]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_70%_0%,rgba(198,242,78,0.06),rgba(0,0,0,0)_60%)]" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* header */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
          className="mb-8 md:mb-12"
        >
          <motion.p variants={ITEM} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85">
            <Globe2 className="h-3.5 w-3.5 text-[#C6F24E]" />
            Offices & footprint
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Where we <span className="text-[#C6F24E]">operate</span>
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-2 max-w-[760px] text-white/70">
            HQ in Türkiye with partners across EU & US. Local presence for projects, support and rollouts.
          </motion.p>
        </motion.div>

        {/* layout: stylized "globe" panel (left) + office cards (right) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          {/* “Globe” & stats */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
            className="md:col-span-5"
          >
            <motion.div variants={ITEM} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              {/* faux globe ring */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />
                <div className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/12" />
                <div className="absolute left-1/2 top-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/16" />
              </div>

              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2 text-sm text-white/85">
                  <MapPin className="h-4 w-4 text-[#C6F24E]" />
                  Primary locations
                </div>

                {/* key hubs list */}
                <ul className="space-y-2 text-sm text-white/80">
                  {[
                    { city: "Ankara", tag: "HQ" },
                    { city: "Istanbul", tag: "Office" },
                    { city: "Antalya", tag: "Office" },
                    { city: "Berlin", tag: "Partner" },
                    { city: "New York", tag: "Partner" },
                  ].map((h) => (
                    <li key={h.city} className="flex items-center justify-between gap-2">
                      <span>{h.city}</span>
                      <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-white/70">{h.tag}</span>
                    </li>
                  ))}
                </ul>

                {/* stats */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <Stat k={stats.offices.toString()} label="Offices" icon={<Building2 className="h-4 w-4 text-[#C6F24E]" />} />
                  <Stat k={stats.partners.toString()} label="Partners" icon={<Flag className="h-4 w-4 text-[#C6F24E]" />} />
                  <Stat k={stats.regions.toString()} label="Regions" icon={<Globe2 className="h-4 w-4 text-[#C6F24E]" />} />
                </div>
                <div className="mt-2 text-[11px] text-white/50">Operating in {stats.countries}+ countries</div>
              </div>
            </motion.div>
          </motion.div>

          {/* office cards */}
          <motion.ul
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25, margin: "-15% 0px -20% 0px" }}
            className="md:col-span-7 grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {OFFICES.map((o) => (
              <motion.li key={o.id} variants={ITEM}>
                <OfficeCard o={o} />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */

function OfficeCard({ o }: { o: Office }) {
  const time = useLocalTime(o.tz);
  const badgeStyle =
    o.type === "HQ"
      ? "border-[#C6F24E]/60 bg-[#C6F24E]/20 text-white"
      : o.type === "Office"
      ? "border-white/15 bg-white/10 text-white/85"
      : "border-white/15 bg-black/40 text-white/80";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-[#C6F24E]/15 text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
            <MapPin className="h-4 w-4" />
          </span>
          <div>
            <div className="text-white text-base font-[500] leading-tight">
              {o.city}
            </div>
            <div className="text-[12px] text-white/65">{o.country}</div>
          </div>
        </div>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] ${badgeStyle}`}>
          {o.type}
        </span>
      </div>

      {/* address */}
      {o.address ? (
        <div className="mb-2 text-sm text-white/75">{o.address}</div>
      ) : null}

      {/* contacts */}
      <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] text-white/75">
        {o.phone ? (
          <span className="inline-flex items-center gap-1">
            <Phone className="h-3.5 w-3.5 text-[#C6F24E]" />
            {o.phone}
          </span>
        ) : null}
        {o.email ? (
          <a href={`mailto:${o.email}`} className="inline-flex items-center gap-1 hover:underline">
            <Mail className="h-3.5 w-3.5 text-[#C6F24E]" />
            {o.email}
          </a>
        ) : null}
      </div>

      {/* time */}
      <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-white/10 px-2 py-1 text-[12px] text-white/85 ring-1 ring-white/15">
        <Clock className="h-3.5 w-3.5 text-[#C6F24E]" />
        Local time: <span className="font-medium">{time}</span>
      </div>
    </div>
  );
}

function Stat({ k, label, icon }: { k: string; label: string; icon: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="mb-1 inline-flex items-center gap-2 rounded-md bg-white/10 px-2 py-1 text-xs text-white/80 ring-1 ring-white/15">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-xl font-[600] text-white">{k}</div>
    </div>
  );
}

/* ---------- utils ---------- */
function regionFromTZ(tz: string) {
  if (tz.startsWith("Europe/")) return "EU";
  if (tz.startsWith("America/")) return "US";
  if (tz.startsWith("Asia/")) return "Asia";
  if (tz.startsWith("Africa/")) return "Africa";
  return "Other";
}
