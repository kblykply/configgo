// app/components/configgo/ConfiggoPersonas.tsx
"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Headset,
  Megaphone,
  CheckCircle2,
} from "lucide-react";

type Persona = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  blurb: string;
  bullets: string[];
};

const PERSONAS: Persona[] = [
  {
    title: "Developers",
    icon: Building2,
    blurb:
      "Unify projects, buildings and units with live pricing, status and holds.",
    bullets: [
      "Inventory & availability across projects",
      "Reservations, discounts and approvals",
      "Absorption & revenue dashboards",
    ],
  },
  {
    title: "Brokers & Agencies",
    icon: Users,
    blurb:
      "Close more deals with shared pipelines and partner-friendly access.",
    bullets: [
      "Lead distribution & duplicate prevention",
      "Partner portal and project sharing",
      "Multi-project pipelines & tasks",
    ],
  },
  {
    title: "Sales Center Teams",
    icon: Headset,
    blurb:
      "Never miss a lead—work from one omnichannel inbox with SLAs and playbooks.",
    bullets: [
      "WhatsApp/SMS/email/voice in one place",
      "Reminders, SLAs and follow-ups",
      "Quotes, offers & e-sign workflow",
    ],
  },
  {
    title: "Marketing",
    icon: Megaphone,
    blurb:
      "Prove ROI with full-funnel attribution and automated nurturing.",
    bullets: [
      "UTM/source tracking & campaign ROI",
      "Segments, journeys & A/B testing",
      "Sync to ads & analytics tools",
    ],
  },
];

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WRAP = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.08 },
  },
};
const CARD = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

export default function ConfiggoPersonas() {
  return (
    <section className="relative">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Heading */}
        <motion.div
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
          className="mb-10 text-center"
        >
          <motion.p variants={CARD} className="typo-small-heading text-white/70">
            Who it’s for
          </motion.p>
          <motion.h2 variants={CARD} className="typo-h2-md mt-2">
            Built for <span className="text-[#C6F24E]">every team</span> in real estate
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.ul
          variants={WRAP}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {PERSONAS.map((p) => (
            <motion.li key={p.title} variants={CARD}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#C6F24E]/15 ring-1 ring-[#C6F24E]/20">
                    <p.icon className="h-5 w-5 text-[#C6F24E]" />
                  </div>
                  <h3 className="font-[500] text-white">{p.title}</h3>
                </div>

                <p className="typo-small mt-3 min-h-[48px] text-white/70">{p.blurb}</p>

                <ul className="mt-4 space-y-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-[2px] h-4 w-4 text-[#C6F24E]" />
                      <span className="typo-small text-white/80">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="#features"
            className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/90 backdrop-blur-sm transition hover:bg-white/15"
          >
            Explore feature set
          </a>
        </div>
      </div>
    </section>
  );
}
