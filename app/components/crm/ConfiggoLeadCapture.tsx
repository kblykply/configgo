// app/components/configgo/ConfiggoLeadCapture.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
const VIEWPORT = { once: false, amount: 0.25, margin: "-15% 0% -25% 0%" } as const;

const SOURCES = [
  { label: "Web Forms", Icon: Globe },
  { label: "Portals / Ads", Icon: Megaphone },
  { label: "QR Check-ins", Icon: QrCode },
  { label: "WhatsApp", Icon: MessageCircle },
] as const;

const RULES = [
  { title: "Round-robin by team", desc: "Evenly distribute new leads to Istanbul Sales", Icon: UsersRound },
  { title: "SLA 15 min", desc: "Escalate if no reply within 15 minutes", Icon: Timer },
  { title: "De-dupe email/phone", desc: "Merge duplicate contacts and keep history", Icon: CopyCheck },
  { title: "Smart filters", desc: "Route by budget, language, project interest", Icon: Filter },
];

type Props = {
  imageSrc?: string;
  imageAlt?: string;
};

export default function ConfiggoLeadCapture({
  imageSrc = "/crm/chat.jpg",
  imageAlt = "Lead capture and routing visual",
}: Props) {
  return (
    <section className="relative" id="lead-capture">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-10 text-center"
        >
          <motion.p variants={ITEM} className="typo-small-heading text-white/70">
            Lead capture & distribution
          </motion.p>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Get leads from <span className="text-[#C6F24E]">everywhere</span>, route them{" "}
            <span className="text-[#C6F24E]">automatically</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT — copy + sources + rules */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="min-w-0 md:col-span-5"
          >
            <motion.p variants={ITEM} className="typo-small text-white/70">
              Capture leads from web forms, portals and ads, QR check-ins at the sales center, and WhatsApp — then
              route them to the right team instantly with SLAs, round-robin and duplicate prevention.
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

          {/* RIGHT — window with a single image */}
          <motion.div
            variants={ITEM}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="min-w-0 md:col-span-7"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              {/* window chrome */}
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>

              {/* image area */}
              <div className="relative w-full bg-white/5">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={1280}
                  height={720}
                  sizes="(min-width:1024px) 720px, (min-width:640px) 90vw, 100vw"
                  className="h-auto w-full object-contain"
                  priority={false}
                />
                {/* subtle inner ring */}
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
