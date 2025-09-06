// app/components/about/AboutPress.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Newspaper,
  ExternalLink,
  Trophy,
  Award,
  FileDown,
  ArrowRight,
  Quote,
} from "lucide-react";
import type { ReactNode } from "react";

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

/* ---- demo data: replace with your real assets/links ---- */
type PressLogo = { name: string; image: string; href?: string };
type PressQuote = { outlet: string; text: string; author?: string; href?: string; logo?: string };
type AwardItem = { title: string; org: string; year: string; href?: string };

const PRESS_LOGOS: PressLogo[] = [
  { name: "TechCrunch", image: "/press/logos/techcrunch.png", href: "#" },
  { name: "Forbes",      image: "/press/logos/forbes.png",      href: "#" },
  { name: "Wired",       image: "/press/logos/wired.png",       href: "#" },
  { name: "FastCompany", image: "/press/logos/fastco.png",      href: "#" },
  { name: "Hürriyet",    image: "/press/logos/hurriyet.png",    href: "#" },
  { name: "Bloomberg",   image: "/press/logos/bloomberg.png",   href: "#" },
];

const QUOTES: PressQuote[] = [
  {
    outlet: "TechCrunch",
    text:
      "Configgo blends CRM with a Digital Twin layer—making property inventory feel like a living dataset.",
    author: "TC Editorial",
    href: "#",
    logo: "/press/logos/techcrunch.png",
  },
  {
    outlet: "Forbes",
    text:
      "Sales ops in construction finally gets a modern stack. Response times down, conversions up.",
    author: "Forbes Innovation",
    href: "#",
    logo: "/press/logos/forbes.png",
  },
  {
    outlet: "Wired",
    text:
      "A refreshing take on real-estate software: visual-first, API-first, automation-heavy.",
    href: "#",
    logo: "/press/logos/wired.png",
  },
];

const AWARDS: AwardItem[] = [
  { title: "ConstructionTech Innovator", org: "EU PropTech Awards", year: "2024", href: "#" },
  { title: "Top 10 SaaS Startups",       org: "TR ScaleUp Index",   year: "2025", href: "#" },
  { title: "Design & UX Honoree",        org: "Awwwards",           year: "2023", href: "#" },
  { title: "Customer Impact Winner",     org: "BuildWeek",          year: "2024", href: "#" },
];

export default function AboutPress() {
  return (
    <section
      id="press"
      className="relative"
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* distinct bg: angled band + halo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-x-16 top-10 h-40 rotate-[1.5deg] bg-[linear-gradient(90deg,rgba(198,242,78,0.10),rgba(255,255,255,0.02),rgba(198,242,78,0.10))] blur-xl" />
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
            <Newspaper className="h-3.5 w-3.5 text-[#C6F24E]" />
            Press & recognition
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            What others <span className="text-[#C6F24E]">say</span> about us
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-2 max-w-[760px] text-white/70">
            Selected coverage and awards across CRM, Digital Twin and construction tech.
          </motion.p>
        </motion.div>

        {/* Logo marquee */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-10% 0px -20% 0px" }}
          className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4"
        >
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent" />

          <LogoMarquee items={PRESS_LOGOS} />
        </motion.div>

        {/* Quotes + Awards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          {/* Quotes */}
          <motion.ul
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
            className="md:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {QUOTES.map((q) => (
              <motion.li key={q.outlet} variants={ITEM}>
                <QuoteCard q={q} />
              </motion.li>
            ))}
          </motion.ul>

          {/* Awards */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
            className="md:col-span-5"
          >
            <motion.div variants={ITEM} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="mb-3 flex items-center gap-2 text-sm text-white/85">
                <Trophy className="h-4 w-4 text-[#C6F24E]" />
                Awards & mentions
              </div>
              <ul className="divide-y divide-white/10">
                {AWARDS.map((a) => (
                  <li key={`${a.title}-${a.year}`} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-[#C6F24E]/15 text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
                        <Award className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-white text-sm">{a.title}</div>
                        <div className="text-[12px] text-white/60">{a.org} • {a.year}</div>
                      </div>
                    </div>
                    {a.href ? (
                      <Link href={a.href} className="text-[12px] text-white/70 hover:text-white inline-flex items-center gap-1">
                        Details <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <motion.div variants={ITEM}>
            <Link
              href="/press-kit.zip"
              className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#C6F24E] px-4 py-2 text-sm text-black hover:opacity-95"
            >
              <FileDown className="h-4 w-4" />
              Download press kit
            </Link>
          </motion.div>
          <motion.div variants={ITEM}>
            <Link
              href="/contact?topic=press"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
            >
              Media inquiries <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */

function LogoMarquee({ items }: { items: PressLogo[] }) {
  // duplicate list so it loops seamlessly
  const strip = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex w-[200%] items-center gap-10"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        {strip.map((l, i) => (
          <Logo key={`${l.name}-${i}`} {...l} />
        ))}
      </motion.div>
    </div>
  );
}

function Logo({ name, image, href }: PressLogo) {
  const content = (
    <div className="flex h-14 w-[160px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-3 opacity-80 transition hover:opacity-100">
      <Image
        src={image}
        alt={name}
        width={140}
        height={28}
        className="max-h-7 w-auto object-contain"
        sizes="140px"
      />
    </div>
  );
  return href ? (
    <Link href={href} aria-label={name} className="shrink-0">
      {content}
    </Link>
  ) : (
    <div className="shrink-0">{content}</div>
  );
}

function QuoteCard({ q }: { q: PressQuote }) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-grid h-9 w-9 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
            <Quote className="h-4 w-4 text-[#C6F24E]" />
          </span>
          <div className="text-sm text-white/85">{q.outlet}</div>
        </div>
        {q.logo ? (
          <Image
            src={q.logo}
            alt={`${q.outlet} logo`}
            width={80}
            height={20}
            className="h-5 w-auto opacity-80"
            sizes="80px"
          />
        ) : null}
      </div>
      <p className="text-[15px] leading-6 text-white/90">“{q.text}”</p>
      <div className="mt-3 flex items-center justify-between text-[12px] text-white/60">
        <span>{q.author ?? ""}</span>
        {q.href ? (
          <Link href={q.href} className="inline-flex items-center gap-1 text-white/70 hover:text-white">
            Read article <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
    </div>
  );
}
