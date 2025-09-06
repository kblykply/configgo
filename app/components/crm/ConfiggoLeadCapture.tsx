// app/components/configgo/ConfiggoLeadCapture.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import {
  Megaphone,
  Globe,
  QrCode,
  MessageCircle,
  Share2,
  UsersRound,
  Timer,
  CopyCheck,
  Filter,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.08 },
  },
};
const ITEM = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const SOURCES = [
  { label: "Web Forms", Icon: Globe },
  { label: "Portals / Ads", Icon: Megaphone },
  { label: "QR Check-ins", Icon: QrCode },
  { label: "WhatsApp", Icon: MessageCircle },
] as const;

const RULES = [
  {
    title: "Round-robin by team",
    desc: "Evenly distribute new leads to Istanbul Sales",
    Icon: UsersRound,
  },
  {
    title: "SLA 15 min",
    desc: "Escalate if no reply within 15 minutes",
    Icon: Timer,
  },
  {
    title: "De-dupe email/phone",
    desc: "Merge duplicate contacts and keep history",
    Icon: CopyCheck,
  },
  {
    title: "Smart filters",
    desc: "Route by budget, language, project interest",
    Icon: Filter,
  },
];

export default function ConfiggoLeadCapture() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -25% 0px" });

  // timing offsets so the animated chips feel organic
  const delays = useMemo(() => [0, 0.6, 1.2, 1.8, 2.4], []);

  return (
    <section ref={ref} className="relative" id="lead-capture">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mb-10 text-center"
        >
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Lead capture & distribution
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Get leads from <span className="text-[#C6F24E]">everywhere</span>, route them <span className="text-[#C6F24E]">automatically</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — copy + sources + rules */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="md:col-span-5"
          >
            <motion.p variants={ITEM} className="typo-small text-white/70">
              Capture leads from web forms, portals and ads, QR check-ins at the sales center, and WhatsApp — then route them to the right team instantly with SLAs, round-robin and duplicate prevention.
            </motion.p>

            {/* Source chips */}
            <motion.ul variants={WRAP} className="mt-6 grid grid-cols-2 gap-3">
              {SOURCES.map(({ label, Icon }) => (
                <motion.li key={label} variants={ITEM}>
                  <div className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.05] px-3 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#C6F24E]/15 ring-1 ring-[#C6F24E]/25">
                      <Icon className="h-4 w-4 text-[#C6F24E]" />
                    </span>
                    <span className="text-sm text-white/85">{label}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* Rules card */}
            <motion.div
              variants={ITEM}
              className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            >
              <div className="mb-3 flex items-center gap-2">
                <Share2 className="h-4 w-4 text-[#C6F24E]" />
                <h3 className="font-[500] text-white">Routing rules</h3>
              </div>

              <ul className="space-y-3">
                {RULES.map(({ title, desc, Icon }) => (
                  <li key={title} className="flex items-start gap-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                      <Icon className="h-4 w-4 text-[#C6F24E]" />
                    </div>
                    <div>
                      <div className="text-white">{title}</div>
                      <div className="typo-small text-white/65">{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center gap-2 text-sm text-white/70">
                <CheckCircle2 className="h-4 w-4 text-[#C6F24E]" />
                Works with teams, skills, language, budget, project interest, and more.
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — animated flow visual */}
          <motion.div
            variants={ITEM}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="md:col-span-7"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>

              {/* canvas */}
              <div className="relative aspect-[16/9] p-4 md:p-6">
                {/* left column: sources */}
                <div className="absolute left-0 top-0 bottom-0 hidden w-[36%] flex-col justify-center gap-3 pl-4 md:flex">
                  {SOURCES.map(({ label, Icon }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#C6F24E]/15 ring-1 ring-[#C6F24E]/25">
                        <Icon className="h-5 w-5 text-[#C6F24E]" />
                      </div>
                      <span className="text-sm text-white/85">{label}</span>
                    </div>
                  ))}
                </div>

                {/* center: router */}
                <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center md:flex">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
                    <Share2 className="h-7 w-7 text-[#C6F24E]" />
                  </div>
                  <div className="mt-2 text-xs text-white/70">Auto-router</div>
                </div>

                {/* right: agents */}
                <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 md:flex md:flex-col md:items-start md:gap-3">
                  {["MM", "AK", "ST"].map((n) => (
                    <div key={n} className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 text-white">
                        {n}
                      </div>
                      <div className="text-sm text-white/85">Agent</div>
                    </div>
                  ))}
                </div>

                {/* arrows (md+) */}
                <div className="absolute inset-0 hidden md:block">
                  {/* left -> center */}
                  <ArrowRight className="absolute left-[34%] top-[28%] h-5 w-5 text-white/35" />
                  <ArrowRight className="absolute left-[34%] top-[48%] h-5 w-5 text-white/35" />
                  <ArrowRight className="absolute left-[34%] top-[68%] h-5 w-5 text-white/35" />
                  {/* center -> right */}
                  <ArrowRight className="absolute left-[58%] top-[40%] h-6 w-6 text-white/35" />
                  <ArrowRight className="absolute left-[58%] top-[52%] h-6 w-6 text-white/35" />
                </div>

                {/* animated lead chips (loop while in view) */}
                {delays.map((d, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: "-10%", opacity: 0 }}
                    animate={
                      inView
                        ? {
                            x: ["-10%", "50%", "85%", "110%"],
                            opacity: [0, 1, 1, 0],
                          }
                        : {}
                    }
                    transition={{
                      times: [0, 0.25, 0.85, 1],
                      duration: 6,
                      delay: d,
                      repeat: inView ? Infinity : 0,
                      ease: "linear",
                    }}
                    className="absolute top-[calc(20%+var(--row,0)*16%)] left-0"
                    style={{ ["--row" as any]: (idx % 4) as any }}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                      <span className="inline-block h-2 w-2 rounded-full bg-[#C6F24E]" />
                      New Lead
                    </div>
                  </motion.div>
                ))}

                {/* mobile condensed: source pills -> router -> agent */}
                <div className="md:hidden">
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex shrink-0 flex-col gap-2">
                      {SOURCES.slice(0, 3).map(({ Icon }, i) => (
                        <div
                          key={i}
                          className="grid h-9 w-9 place-items-center rounded-lg bg-[#C6F24E]/15 ring-1 ring-[#C6F24E]/25"
                        >
                          <Icon className="h-4 w-4 text-[#C6F24E]" />
                        </div>
                      ))}
                    </div>
                    <Share2 className="h-6 w-6 text-white/50" />
                    <div className="flex shrink-0 flex-col gap-2">
                      {["MM", "AK", "ST"].map((n) => (
                        <div
                          key={n}
                          className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 text-xs text-white"
                        >
                          {n}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* one animated chip on mobile */}
                  <motion.div
                    initial={{ x: "5%", opacity: 0 }}
                    animate={inView ? { x: "95%", opacity: [0, 1, 1, 0] } : {}}
                    transition={{ duration: 3.2, repeat: inView ? Infinity : 0, ease: "linear" }}
                    className="mt-4"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                      <span className="inline-block h-2 w-2 rounded-full bg-[#C6F24E]" />
                      New Lead
                    </div>
                  </motion.div>
                </div>

                {/* inner ring */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>

            {/* footnote */}
            <p className="typo-small mt-4 text-white/60">
              Connect sources via forms, APIs and integrations. Set routing once; Configgo handles the rest.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
