// app/components/about/AboutCommunity.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  Users,
  HeartHandshake,
  MessageSquare,
  Star,
  ThumbsUp,
  CalendarDays,
  Globe2,
  Share2,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  Mail,
} from "lucide-react";

/* ----- header offset (fixed header ≈ 20vh) ----- */
const HEADER_OFFSET = "20vh";

/* ----- animations (replay on scroll; no shared state) ----- */
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

/* ----- demo data (swap with real) ----- */





const LOGOS = [
  { name: "NATA",       src: "/NATA-logobeyaz.png" },
  { name: "Trinvest",   src: "/trholdingbeyazlogo.png" },
  { name: "ZirveBeton", src: "/zirvebeton-LOGO-beyaz.png" },
  { name: "DND",        src: "/shelton-logo-beyaz.png" },
  { name: "Kosavalı",   src: "/gallardologobeyaz.png" },
  { name: "Shelton",    src: "/ONYX-PORTREbeyaz.png" },
];

type Shout = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  quote: string;
};


/* ----- component ----- */
export default function   AboutCommunity() {
  const stats = useMemo(
    () => [
      { k: "3.4k+", l: "Community members", icon: <Users className="h-4 w-4 text-[#C6F24E]" /> },
      { k: "17",    l: "Countries",          icon: <Globe2 className="h-4 w-4 text-[#C6F24E]" /> },
      { k: "62",    l: "Customer stories",   icon: <ThumbsUp className="h-4 w-4 text-[#C6F24E]" /> },
      { k: "54",    l: "Events / yr",        icon: <CalendarDays className="h-4 w-4 text-[#C6F24E]" /> },
    ],
    []
  );

  return (
    <section
      id="community"
      className="relative overflow-hidden"
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* distinct bg: soft grid + angled lime band + halo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute -inset-x-16 top-16 h-44 rotate-[2deg] bg-[linear-gradient(90deg,rgba(198,242,78,0.12),rgba(255,255,255,0.02),rgba(198,242,78,0.12))] blur-xl" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(198,242,78,0.06),rgba(0,0,0,0)_60%)]" />
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
            <HeartHandshake className="h-3.5 w-3.5 text-[#C6F24E]" />
            Social proof & community
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Built with and for the <span className="text-[#C6F24E]">field</span>
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-2 max-w-[760px] text-white/70">
            Stories, contributors and partners across CRM, Digital Twin and construction tech.
          </motion.p>
        </motion.div>

        {/* row 1: snapshot + join card */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          {/* snapshot */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
            className="md:col-span-7"
          >
            <motion.div variants={ITEM} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="mb-3 flex items-center gap-2 text-sm text-white/85">
                <MessageSquare className="h-4 w-4 text-[#C6F24E]" />
                Community snapshot
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.l} className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
                    <div className="mb-1 inline-flex items-center gap-2 rounded-md bg-white/10 px-2 py-1 text-[12px] text-white/80 ring-1 ring-white/15">
                      {s.icon}
                      <span>{s.l}</span>
                    </div>
                    <div className="text-xl font-[600] text-white">{s.k}</div>
                  </div>
                ))}
              </div>

              {/* logos */}
              <div className="mt-5">
                <div className="mb-2 text-[12px] text-white/60">Trusted by teams at</div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {LOGOS.map((l) => (
                    <div
                      key={l.name}
                      className="flex h-16 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-3 opacity-80 transition hover:opacity-100"
                      title={l.name}
                    >
                      <Image
                        src={l.src}
                        alt={l.name}
                        width={160}
                        height={32}
                        className="max-h-8 w-auto object-contain grayscale hover:grayscale-0"
                        sizes="160px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* join card */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25, margin: "-10% 0px -20% 0px" }}
            className="md:col-span-5"
          >
            <motion.div variants={ITEM} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="mb-3 text-white/85">Join the community</div>

              <div className="grid grid-cols-1 gap-3">
                <Link
                  href="https://github.com"
                  className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
                >
                  <span className="inline-flex items-center gap-2"><Github className="h-4 w-4 text-[#C6F24E]" /> GitHub</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="https://twitter.com"
                  className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
                >
                  <span className="inline-flex items-center gap-2"><Twitter className="h-4 w-4 text-[#C6F24E]" /> X / Twitter</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="https://tr.linkedin.com/company/configgo"
                  className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15"
                >
                  <span className="inline-flex items-center gap-2"><Linkedin className="h-4 w-4 text-[#C6F24E]" /> LinkedIn</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* newsletter mini */}
              <div className="mt-5 rounded-2xl border border-[#C6F24E]/30 bg-[#C6F24E]/10 p-4">
                <div className="mb-2 text-sm text-white">Newsletter</div>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-sm text-white/85">
                    your@email.com
                  </div>
                  <Link
                    href="/newsletter"
                    className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-[#C6F24E] px-3 py-2 text-sm text-black hover:opacity-95"
                  >
                    <Mail className="h-4 w-4" />
                    Subscribe
                  </Link>
                </div>
                <div className="mt-2 text-[11px] text-white/70">Monthly highlights · unsubscribe anytime</div>
              </div>

              {/* share */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] text-white/85">
                <Share2 className="h-3.5 w-3.5 text-[#C6F24E]" />
                Share your build with #Configgo
              </div>
            </motion.div>
          </motion.div>
        </div>

  

        {/* footer badge strip */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-10% 0px -20% 0px" }}
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <motion.div variants={ITEM} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] p-3">
            <span className="inline-flex items-center gap-2 text-sm text-white/85">
              <Star className="h-4 w-4 text-[#C6F24E]" />
              NPS
            </span>
            <span className="text-white text-lg font-[600]">64</span>
          </motion.div>
          <motion.div variants={ITEM} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] p-3">
            <span className="inline-flex items-center gap-2 text-sm text-white/85">
              <Users className="h-4 w-4 text-[#C6F24E]" />
              Active companies
            </span>
            <span className="text-white text-lg font-[600]">120+</span>
          </motion.div>
          <motion.div variants={ITEM} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] p-3">
            <span className="inline-flex items-center gap-2 text-sm text-white/85">
              <HeartHandshake className="h-4 w-4 text-[#C6F24E]" />
              Community partners
            </span>
            <span className="text-white text-lg font-[600]">18</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ----- subcomponents ----- */

function Testimonial({ s }: { s: Shout }) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
      <div className="mb-3 flex items-center gap-3">
        <Avatar name={s.name} src={s.avatar} />
        <div>
          <div className="text-white font-[500] leading-tight">{s.name}</div>
          <div className="text-[12px] text-white/65">{s.role}</div>
        </div>
      </div>
      <p className="text-[15px] leading-6 text-white/90">“{s.quote}”</p>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
    </div>
  );
}

function Avatar({ name, src, size = 44 }: { name: string; src?: string; size?: number }) {
  const initials = getInitials(name);
  return src ? (
    <div className="relative" style={{ width: size, height: size }}>
      <Image src={src} alt={name} fill sizes={`${size}px`} className="rounded-full object-cover ring-2 ring-[#C6F24E]/30" />
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

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}
