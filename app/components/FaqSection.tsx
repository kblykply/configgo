// app/components/FaqSection.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, Variants, useAnimation } from "framer-motion";

/* ---------------- Motion ---------------- */
const wrap: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1], when: "beforeChildren", staggerChildren: 0.06 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 0.61, 0.36, 1] } },
};

/* ---------------- Data ---------------- */
export type QA = { id: string; q: string; a: string };

export const FAQS_CONFIGGO: QA[] = [
  { id: "g1", q: "What is Configgo?", a: "Configgo is a suite of tools for real-estate and AEC teams to showcase projects, manage leads, and analyze sales performance." },
  { id: "g2", q: "Who is Configgo for?", a: "Developers, brokers, marketing teams, and sales offices that need interactive 3D presentations and an integrated CRM." },
  { id: "g3", q: "How does Configgo differ from a regular website?", a: "Beyond pages, Configgo provides interactive 3D experiences, unit filtering, live availability, and CRM-backed lead capture." },
  { id: "g4", q: "What integrations are available?", a: "Web forms, Meta Lead Ads, Google Sheets, and common automation platforms (e.g., Zapier/Make). Deeper connectors can be added per project." },
  { id: "g5", q: "Is Configgo cloud-based?", a: "Yes. Most customers use our cloud, but private or on-prem deployments are available for enterprises." },
  { id: "g6", q: "How is data secured?", a: "Role-based access, encrypted transport, and audit logs. EU/EAA data residency options are available on request." },
  { id: "g7", q: "Does Configgo support multiple languages and currencies?", a: "Yes. You can localize UI strings and set currency formats per project or per user." },
  { id: "g8", q: "What’s the onboarding process?", a: "We set up your project, import units and media, connect lead sources, and train your team—usually in a few working days." },
  { id: "g9", q: "How is Configgo priced?", a: "Pricing is tiered by feature set and monthly active projects/users. Contact us for a quote tailored to your scope." }
];

export const FAQS_DIGITAL_TWIN: QA[] = [
  { id: "dt1", q: "What is the Digital Twin module?", a: "An interactive 3D experience to explore units, views, sun-path, amenities, and surroundings in real time." },
  { id: "dt2", q: "Which 3D formats are supported?", a: "Typical workflows use glTF/GLB or FBX; BIM via IFC can be converted. We’ll validate your assets during onboarding." },
  { id: "dt3", q: "Can buyers filter and select specific units?", a: "Yes. Filter by block, floor, plan, area, price, and availability—then open a unit’s detail with gallery and specs." },
  { id: "dt4", q: "Does it include sun-path and weather simulation?", a: "Yes. You can preview sunlight at different times of day and simulate basic weather conditions for context." },
  { id: "dt5", q: "Can we show first-person or car tours?", a: "Yes. The twin supports FPS/TPS navigation and guided routes to showcase common areas and site circulation." },
  { id: "dt6", q: "How are nearby locations handled?", a: "Pins and categories (schools, malls, transport, hospitals) with realistic distance and time estimates from the project." },
  { id: "dt7", q: "Can we embed the Digital Twin on our website?", a: "Yes. Use our React component or a simple embed to place it on landing pages or sales kiosks." },
  { id: "dt8", q: "Does the Digital Twin sync with the CRM?", a: "Two-way sync is available: unit statuses, pricing, and reservations can flow between the Twin and Configgo CRM." },
  { id: "dt9", q: "What about performance on mobile devices?", a: "It’s optimized for modern browsers with GPU acceleration and adaptive quality. A fallback media mode is available." }
];

export const FAQS_CRM: QA[] = [
  { id: "crm1", q: "What does Configgo CRM include?", a: "Lead capture, contact & deal management, tasking, pipelines, campaign tracking, documents, and analytics." },
  { id: "crm2", q: "How do leads enter the CRM?", a: "Via web forms, Digital Twin inquiries, Meta Lead Ads, imports from CSV/Sheets, or API/automation platforms." },
  { id: "crm3", q: "Can we customize pipelines and fields?", a: "Yes. Stages, fields, and permissions are configurable per team or project." },
  { id: "crm4", q: "Does the CRM manage unit availability and reservations?", a: "Yes. Units, prices, and holds/reservations can be tracked, with updates reflected in the Digital Twin." },
  { id: "crm5", q: "Are there notifications and reminders?", a: "You can auto-assign leads, set SLAs, and receive reminders for follow-ups, calls, and meetings." },
  { id: "crm6", q: "Which channels can we track?", a: "Web, social lead ads, email, phone logs, and offline imports. Optional WhatsApp Business integration is supported." },
  { id: "crm7", q: "What reporting is available?", a: "Dashboards for leads, conversion, revenue, top-performing campaigns, and agent productivity." },
  { id: "crm8", q: "Can we integrate with third-party tools?", a: "Yes. We provide APIs and work with popular automation tools; custom integrations are offered on request." },
  { id: "crm9", q: "How are roles and permissions handled?", a: "Granular roles, team-based access, and audit logs help you control who sees pricing, discounts, or sensitive data." }
];

const FAQS: QA[] = [...FAQS_CONFIGGO, ...FAQS_DIGITAL_TWIN, ...FAQS_CRM];

/* ---------------- Component ---------------- */
export default function FaqSection() {
  const [openId, setOpenId] = useState<string>(FAQS[0]?.id ?? "");

  // balanced columns
  const [left, right] = useMemo(() => {
    const mid = Math.ceil(FAQS.length / 2);
    return [FAQS.slice(0, mid), FAQS.slice(mid)];
  }, []);

  // --- Animation control + fallbacks
  const rootRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    // Respect reduced motion: show immediately
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      controls.set("show");
      return;
    }

    // Mobile first-paint fallback: if already in viewport, reveal
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)")?.matches;

    if (isTouch && rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const alreadyOnScreen = rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
      if (alreadyOnScreen) controls.set("show");
    }
  }, [controls]);

  // ---------- Green fog (mouse + touch) ----------
  const fogWrapRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);
  const registerRow = (i: number) => (el: HTMLDivElement | null) => { if (el) rowsRef.current[i] = el; };

  const raf = useRef<number | null>(null);
  const s = useRef({ tx: 0, ty: 0, x: 0, y: 0, to: 0, o: 0, running: false });

  const paint = () => {
    const w = fogWrapRef.current;
    if (!w) return;
    const wr = w.getBoundingClientRect();
    for (const el of rowsRef.current) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const lx = s.current.x - (r.left - wr.left);
      const ly = s.current.y - (r.top - wr.top);
      el.style.setProperty("--mx", `${lx}px`);
      el.style.setProperty("--my", `${ly}px`);
      el.style.setProperty("--fog-o", `${s.current.o}`);
    }
  };

  const tick = () => {
    const kp = 0.16, ko = 0.14;
    s.current.x += (s.current.tx - s.current.x) * kp;
    s.current.y += (s.current.ty - s.current.y) * kp;
    s.current.o += (s.current.to - s.current.o) * ko;
    paint();
    if (s.current.o < 0.01 && s.current.to === 0) { s.current.o = 0; s.current.running = false; raf.current = null; return; }
    raf.current = requestAnimationFrame(tick);
  };
  const startLoop = () => { if (!s.current.running) { s.current.running = true; raf.current = requestAnimationFrame(tick); } };

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const w = fogWrapRef.current; if (!w) return;
    const r = w.getBoundingClientRect();
    s.current.tx = e.clientX - r.left;
    s.current.ty = e.clientY - r.top;
    s.current.to = 1;
    startLoop();
  };
  const onMouseLeave = () => { s.current.to = 0; startLoop(); };

  // Touch support for fog
  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const w = fogWrapRef.current; if (!w) return;
    const r = w.getBoundingClientRect();
    const t = e.touches[0];
    s.current.tx = t.clientX - r.left;
    s.current.ty = t.clientY - r.top;
    s.current.to = 1;
    startLoop();
  };
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => { s.current.to = 0; startLoop(); };

  return (
    <section ref={rootRef} className="relative overflow-hidden py-16 md:py-24">
      {/* ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 640px at 68% 8%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(900px 520px at 18% 46%, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1450px] px-6 md:px-10">
        {/* Section header */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-white/50">FAQ</span>
            <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/25 to-white/60" />
          </div>
          <h2 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.02em] text-white">
            Configgo <span className="text-white/80">FAQ’s</span>
          </h2>
        </div>

        {/* Grid with two columns; fog wrapper tracks mouse/touch for all rows */}
        <motion.div
          variants={wrap}
          initial="hidden"
          animate={controls}
          whileInView="show"
          viewport={{
            once: false,              // animate in/out as it enters/leaves
            amount: 0.25,             // threshold
            margin: "-10% 0% -10% 0%" // percentage margins = iOS-friendly
          }}
          ref={fogWrapRef}
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseMove}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchMove}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8"
        >
          {/* Left column */}
          <motion.div variants={item} className="lg:col-span-6 space-y-3 will-change-[transform,opacity,filter]">
            {left.map((qa, idx) => (
              <FaqRow
                key={qa.id}
                qa={qa}
                open={openId === qa.id}
                onToggle={() => setOpenId((o) => (o === qa.id ? "" : qa.id))}
                refCb={registerRow(idx)}
              />
            ))}
          </motion.div>

          {/* Right column */}
          <motion.div variants={item} className="lg:col-span-6 space-y-3 will-change-[transform,opacity,filter]">
            {right.map((qa, rIdx) => (
              <FaqRow
                key={qa.id}
                qa={qa}
                open={openId === qa.id}
                onToggle={() => setOpenId((o) => (o === qa.id ? "" : qa.id))}
                refCb={registerRow(left.length + rIdx)}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Row (accordion item with green fog) ---------------- */
function FaqRow({
  qa,
  open,
  onToggle,
  refCb,
}: {
  qa: QA;
  open: boolean;
  onToggle: () => void;
  refCb: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={refCb}
      className="relative group rounded-xl overflow-hidden ring-1 ring-white/10
                 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.12)_100%)]
                 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_16px_40px_rgba(0,0,0,0.45)]
                 will-change-[transform,opacity,filter]"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Green fog layer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(160px 160px at var(--mx) var(--my),
              rgba(182,225,61,0.50) 0%,
              rgba(182,225,61,0.18) 42%,
              rgba(182,225,61,0.00) 70%
            ),
            radial-gradient(320px 320px at var(--mx) var(--my),
              rgba(182,225,61,0.10) 0%,
              rgba(182,225,61,0.00) 78%
            )
          `,
          opacity: "var(--fog-o, 0)",
          filter: "saturate(115%)",
          transition: "opacity 200ms ease",
        }}
      />

      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-4 text-left text-white/85
                   hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6F24E]/60"
      >
        <span className="text-[14px] md:text-[15px] font-medium">{qa.q}</span>
        <span className="shrink-0 grid place-items-center w-8 h-8 rounded-md ring-1 ring-white/10 text-white/80">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={"transition-transform " + (open ? "rotate-180" : "")} aria-hidden>
            {open ? (
              <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </span>
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.34, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="px-5 pb-5 text-[13.5px] leading-[1.6] text-white/70">
              {qa.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
