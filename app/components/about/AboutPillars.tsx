// app/components/about/AboutPillars.tsx
"use client";

import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import {
  Building2,      // CRM
  Box,            // Digital Twin (safe across lucide versions)
  MessageSquare,  // Omnichannel
  Layers,         // Inventory / Availability
  BarChart3,      // Analytics
  Plug            // Integrations
} from "lucide-react";

const HEADER_OFFSET = "20vh";
const EASE = [0.22, 0.61, 0.36, 1] as const;

const WRAP = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE, staggerChildren: 0.06 }
  }
};
const CARD = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.5, ease: EASE } }
};

type Pillar = {
  title: string;
  body: string;
  icon: ReactNode;
  href?: string;
};

const PILLARS: Pillar[] = [
  {
    title: "Real-Estate CRM",
    body:  "Leads, companies, deals and tasks built for developers, brokers and in-house sales.",
    icon:  <Building2 className="h-5 w-5" />,
    href:  "/crm#overview"
  },
  {
    title: "Digital Twin",
    body:  "Interactive 3D context tied to inventory and conversations—right inside the workflow.",
    icon:  <Box className="h-5 w-5" />,
    href:  "/digital_twins"
  },
  {
    title: "Omnichannel Inbox",
    body:  "Email, SMS, WhatsApp—unified threads linked to contacts, units and deals.",
    icon:  <MessageSquare className="h-5 w-5" />,
    href:  "/crm#omnichannel"
  },
  {
    title: "Inventory & Availability",
    body:  "Live price books, holds and reservations across projects, buildings and units.",
    icon:  <Layers className="h-5 w-5" />,
    href:  "/crm#inventory"
  },
  {
    title: "Analytics & Dashboards",
    body:  "Cohorts, pipeline velocity and unit absorption—answers for teams and leadership.",
    icon:  <BarChart3 className="h-5 w-5" />,
    href:  "/crm#reporting"
  },
  {
    title: "Integrations & API",
    body:  "Plug into portals, ad platforms and data lakes. Webhooks and REST API included.",
    icon:  <Plug className="h-5 w-5" />,
    href:  "/crm#integrations"
  }
];

export default function AboutPillars() {
  // Re-trigger animation every time the section enters/leaves view
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-15% 0px -20% 0px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  return (
    <section
      id="pillars"
      ref={ref}
      className="relative"
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* Different look: diagonal accent + soft grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute -inset-x-10 top-14 h-40 rotate-[-2.5deg] bg-[linear-gradient(90deg,rgba(198,242,78,0.12),rgba(255,255,255,0.02),rgba(198,242,78,0.12))] blur-xl" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        <motion.div
          variants={WRAP}
          initial="hidden"
          animate={controls}
          className="mb-8 text-center md:mb-12"
        >
          <motion.p variants={CARD} className="typo-small-heading text-white/70">
            What we do
          </motion.p>
          <motion.h2 variants={CARD} className="typo-h2-md mt-2">
            Product <span className="text-[#C6F24E]">pillars</span> of the platform
          </motion.h2>
        </motion.div>

        {/* Pillar grid */}
        <motion.ul
          variants={WRAP}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PILLARS.map((p) => (
            <motion.li
              key={p.title}
              variants={CARD}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <PillarCard {...p} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ---------------- helpers ---------------- */

function PillarCard({ title, body, icon, href }: Pillar) {
  const content = (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-colors hover:border-[#C6F24E]/40">
      {/* top accent ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-[#C6F24E]/30" />
      <div className="mb-3 flex items-center gap-3">
        <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-[#C6F24E]/15 text-[#C6F24E] ring-1 ring-[#C6F24E]/30">
          {icon}
        </span>
        <h3 className="text-white text-lg font-[500]">{title}</h3>
      </div>
      <p className="text-sm text-white/75">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-[12px] text-white/70">
        Learn more
        <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-80 group-hover:translate-x-0.5 transition">
          <path fill="currentColor" d="M13.172 12L8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
        </svg>
      </span>
    </div>
  );

  return href ? (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
}
