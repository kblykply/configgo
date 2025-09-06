// app/components/configgo/ConfiggoCaseStudies.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, TrendingUp, Users, Timer, Star, Building2 } from "lucide-react";
import { type ReactNode } from "react";

/* ---- exact header offset (your fixed header = 20vh) ---- */
const HEADER_OFFSET = "20vh";

/* ---- animations (no SSR-hidden state) ---- */
const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE, staggerChildren: 0.06 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* ---- sample data (swap with real logos/images) ---- */
type CaseStudy = {
  id: string;
  company: string;
  logo?: string;           // /logos/company.svg
  city: string;
  cover: string;           // /case/vega.jpg
  quote: string;
  person: string;
  role: string;
  metrics: Array<{ icon: ReactNode; label: string; value: string }>;
  href?: string;
};

const CASES: CaseStudy[] = [
  {
    id: "vega",
    company: "Vega Center",
    logo: "/logos/vega.svg",
    city: "Ankara",
    cover: "/projects/vega.jpg",
    quote: "Lead response time dropped by half in our first month. Pipelines finally match how our team sells.",
    person: "Mert Mutlu",
    role: "Sales Lead",
    metrics: [
      { icon: <TrendingUp className="h-4 w-4" />, label: "Qualified leads", value: "+31%" },
      { icon: <Timer className="h-4 w-4" />,      label: "Response time",  value: "-47%" },
      { icon: <Users className="h-4 w-4" />,      label: "Team adoption",  value: "92%" },
    ],
    href: "#",
  },
  {
    id: "orion",
    company: "Orion Tower",
    logo: "/logos/orion.svg",
    city: "Istanbul",
    cover: "/covers/oriontower.jpg",
    quote: "Inventory sync + WhatsApp inbox made us 10x faster on hot units.",
    person: "Selin K.",
    role: "Sales Manager",
    metrics: [
      { icon: <TrendingUp className="h-4 w-4" />, label: "Bookings", value: "+19%" },
      { icon: <Timer className="h-4 w-4" />,      label: "First reply", value: "3m avg" },
      { icon: <Users className="h-4 w-4" />,      label: "Agents on CRM", value: "35" },
    ],
    href: "#",
  },
  {
    id: "mega",
    company: "Mega1453",
    logo: "/logos/mega.svg",
    city: "Istanbul",
    cover: "/covers/mega1453.jpg",
    quote: "Dashboards finally show where revenue truly comes from.",
    person: "Okan D.",
    role: "VP Sales",
    metrics: [
      { icon: <TrendingUp className="h-4 w-4" />, label: "Win rate", value: "+7.3pt" },
      { icon: <Timer className="h-4 w-4" />,      label: "Cycle time", value: "-21%" },
      { icon: <Users className="h-4 w-4" />,      label: "Active users", value: "78" },
    ],
    href: "#",
  },
];

/* ---- testimonials (small cards) ---- */
const TESTIMONIALS = [
  {
    company: "VisVadi",
    logo: "/logos/visvadi.svg",
    quote: "Configgo let us route leads by office & project automatically. Zero manual triage.",
    person: "Ece Y.",
    role: "Project Director",
    stars: 5,
  },
  {
    company: "Trinvest",
    logo: "/logos/trinvest.svg",
    quote: "From spreadsheets to a clean CRM in a week. Our team actually enjoys using it.",
    person: "Baran T.",
    role: "Head of Sales",
    stars: 5,
  },
  {
    company: "ZirveBeton",
    logo: "/logos/zirve.svg",
    quote: "Digital Twin add-on helped us convert web traffic into booked tours.",
    person: "Gülin A.",
    role: "Marketing Lead",
    stars: 5,
  },
];

export default function ConfiggoCaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative"
      style={{ paddingTop: HEADER_OFFSET, scrollMarginTop: HEADER_OFFSET }}
    >
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_140%_at_50%_0%,rgba(198,242,78,0.06),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 pb-16 md:pb-24">
        {/* header */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-12% 0px -12% 0px" }}
          className="mb-8 text-center"
        >
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">Case Studies & Testimonials</motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Real teams, <span className="text-[#C6F24E]">real results</span>
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-3 max-w-[860px] mx-auto text-white/70">
            How developers and sales teams launch faster, sell smarter, and keep inventory always in sync.
          </motion.p>
        </motion.div>

        {/* spotlight + testimonials rail */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-12% 0px -12% 0px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12"
        >
          {/* spotlight case (left) */}
          <motion.div variants={ITEM} className="md:col-span-7">
            <SpotlightCard cs={CASES[0]} />
          </motion.div>

          {/* stacked testimonials (right) */}
          <motion.div variants={ITEM} className="md:col-span-5">
            <div className="grid grid-cols-1 gap-5">
              {TESTIMONIALS.map((t) => (
                <TestimonialCard key={t.company} t={t} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* horizontally-scrollable cases */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-12% 0px -12% 0px" }}
          className="mt-10"
        >
          <motion.div variants={ITEM} className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-white/85">
              <Building2 className="h-4 w-4 text-[#C6F24E]" />
              More customer stories
            </div>
            <Link
              href="/contact"
              className="text-xs text-white/70 hover:text-white underline underline-offset-4"
            >
              Become a case study →
            </Link>
          </motion.div>

          <div className="-mx-6 overflow-x-auto pb-3">
            <ul className="mx-6 flex snap-x snap-mandatory gap-6">
              {CASES.map((cs) => (
                <li key={cs.id} className="w-[340px] flex-shrink-0 snap-start">
                  <MiniCaseCard cs={cs} />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* logo strip */}
        <motion.div
          variants={WRAP}
          initial={false}
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-12% 0px -12% 0px" }}
          className="mt-12"
        >
          <motion.div variants={ITEM} className="mb-4 text-center text-sm text-white/70">
            Trusted by leading real estate developers & sales teams
          </motion.div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {[
              "/logos/vega.svg",
              "/logos/orion.svg",
              "/logos/mega.svg",
              "/logos/visvadi.svg",
              "/logos/trinvest.svg",
              "/logos/zirve.svg",
            ].map((src, i) => (
              <LogoBox key={src} delay={i * 0.03} src={src} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------- UI ---------------------------------- */

function SpotlightCard({ cs }: { cs: CaseStudy }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      {/* window bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-white/85">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
            <Quote className="h-3.5 w-3.5 text-[#C6F24E]" />
          </span>
          {cs.company} • {cs.city}
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
      </div>

      {/* cover + overlay */}
      <div className="relative aspect-[16/9]">
        <Image
          src={cs.cover}
          alt={cs.company}
          fill
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

        {/* metrics HUD */}
        <div className="absolute inset-x-0 bottom-0 grid gap-3 p-4 sm:grid-cols-3">
          {cs.metrics.map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/55 px-3 py-2 text-xs text-white backdrop-blur"
            >
              <span className="text-[#C6F24E]">{m.icon}</span>
              <span className="text-white/75">{m.label}</span>
              <span className="ml-auto font-[600] text-white">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* quote */}
      <div className="grid gap-3 p-5 sm:grid-cols-[80px_1fr] sm:items-center">
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15 bg-white/5">
          {cs.logo ? (
            <Image src={cs.logo} alt={`${cs.company} logo`} fill className="object-contain p-2" />
          ) : (
            <span className="grid h-full w-full place-items-center text-white/80">{cs.company[0]}</span>
          )}
        </div>
        <blockquote className="text-white/85">
          “{cs.quote}”
          <footer className="mt-1 text-xs text-white/60">
            — {cs.person}, {cs.role}
          </footer>
        </blockquote>
      </div>

      <div className="border-t border-white/10 px-5 py-3 text-right">
        <Link
          href={cs.href || "#"}
          className="text-sm text-white/80 underline underline-offset-4 hover:text-white"
        >
          Read full case →
        </Link>
      </div>
    </div>
  );
}

function TestimonialCard({
  t,
}: {
  t: { company: string; logo?: string; quote: string; person: string; role: string; stars?: number };
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-md border border-white/15 bg-white/5">
            {t.logo ? (
              <Image src={t.logo} alt={`${t.company} logo`} fill className="object-contain p-1" />
            ) : (
              <span className="grid h-full w-full place-items-center text-xs text-white/70">
                {t.company[0]}
              </span>
            )}
          </div>
          <span className="text-sm text-white/85">{t.company}</span>
        </div>
        <div className="flex items-center gap-0.5 text-[#C6F24E]">
          {Array.from({ length: t.stars || 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-white/85">“{t.quote}”</p>
      <div className="mt-2 text-xs text-white/60">
        — {t.person}, {t.role}
      </div>
    </div>
  );
}

function MiniCaseCard({ cs }: { cs: CaseStudy }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <div className="relative aspect-[16/10]">
        <Image
          src={cs.cover}
          alt={cs.company}
          fill
          sizes="320px"
          className="object-cover transition-transform duration-500 hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-black/0 p-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#C6F24E] px-2 py-0.5 text-[10px] text-black/90">{cs.city}</span>
            <span className="text-white/80">{cs.company}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-3 py-2 text-xs">
        <div className="flex items-center gap-1 text-white/70">
          <TrendingUp className="h-3.5 w-3.5 text-[#C6F24E]" />
          Results inside
        </div>
        <Link href={cs.href || "#"} className="text-white/80 underline underline-offset-4 hover:text-white">
          View →
        </Link>
      </div>
    </div>
  );
}

function LogoBox({ src, delay = 0 }: { src: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay } }}
      viewport={{ once: true, amount: 0.2 }}
      className="grid h-20 place-items-center rounded-xl border border-white/10 bg-white/[0.03] grayscale transition hover:grayscale-0"
    >
      <div className="relative h-10 w-28">
        <Image src={src} alt="logo" fill className="object-contain" />
      </div>
    </motion.div>
  );
}
