// app/components/about/AboutImpact.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

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
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

type Win = {
  id: string;
  title: string;
  client?: string;
  metric: string;
  label: string;
  blurb: string;
  href?: string;
  image: string;
};

const WINS: Win[] = [
  {
    id: "vega",
    title: "Vega Center",
    client: "NATA Holding",
    metric: "+31%",
    label: "more qualified leads",
    blurb: "Web-to-lead, UTM capture and auto-routing across 3 sales squads.",
    image: "/projects/vega.jpg",
    href: "#",
  },
  {
    id: "shelton",
    title: "Shelton Visalia",
    client: "Shelton",
    metric: "–22%",
    label: "time-to-first-reply",
    blurb: "Unified inbox with WhatsApp + email; SLA timers by pipeline stage.",
    image: "/projects/Shelton.jpg",
    href: "#",
  },
  {
    id: "zirve",
    title: "Paryal Bağlıca",
    client: "ZirveBeton",
    metric: "+18%",
    label: "faster unit absorption",
    blurb: "Digital Twin + live availability inside the CRM booking flow.",
    image: "/projects/zirve.jpg",
    href: "#",
  },
  {
    id: "strada",
    title: "Ruby Strada",
    client: "Vizör",
    metric: "×2.1",
    label: "pipeline velocity",
    blurb: "Task automations and price-book sync reduced manual steps.",
    image: "/covers/strada.jpg",
    href: "#",
  },
];

export default function AboutImpact() {
  // Re-trigger on every enter/leave
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.3, margin: "-15% 0px -20% 0px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  // Horizontal rail controller
  const railRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;
    const dx = Math.round(el.clientWidth * 0.85) * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  // Optional: drag-to-scroll (desktop)
  const isDown = useRef(false);
  const startX = useRef(0);
  const startLeft = useRef(0);

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!railRef.current) return;
    isDown.current = true;
    startX.current = e.clientX;
    startLeft.current = railRef.current.scrollLeft;
  };
  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isDown.current || !railRef.current) return;
    const dx = e.clientX - startX.current;
    railRef.current.scrollLeft = startLeft.current - dx;
  };
  const endDrag = () => { isDown.current = false; };

  // Optional: convert vertical wheel to horizontal
  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollBy({ left: e.deltaY, behavior: "auto" });
      e.preventDefault();
    }
  };

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative"
      style={{ scrollMarginTop: HEADER_OFFSET }}
    >
      {/* different look: lime stripe */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-10 h-48 w-[55%] rotate-[2.5deg] bg-[linear-gradient(90deg,rgba(198,242,78,0.14),rgba(255,255,255,0.02),rgba(198,242,78,0.14))] blur-xl" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1450px] px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div variants={WRAP} initial="hidden" animate={controls} className="mb-6 md:mb-10">
          <motion.div variants={ITEM} className="flex items-center gap-2 text-white/80">
            <Sparkles className="h-4 w-4 text-[#C6F24E]" />
            <span className="typo-small-heading">Customer impact</span>
          </motion.div>
          <motion.h2 variants={ITEM} className="typo-h2-md mt-2">
            Mini case <span className="text-[#C6F24E]">wins</span>
          </motion.h2>
          <motion.p variants={ITEM} className="typo-small mt-2 max-w-[760px] text-white/70">
            Real teams, measurable outcomes—across CRM, Digital Twin and operations.
          </motion.p>
        </motion.div>

        {/* Rail + controls */}
        <div className="relative">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--background)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--background)] to-transparent" />

          {/* arrow buttons */}
          <button
            aria-label="Scroll left"
            onClick={() => scrollBy("left")}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 backdrop-blur hover:bg-white/15"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scrollBy("right")}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 backdrop-blur hover:bg-white/15"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>

          {/* scroll rail */}
          <motion.div
            variants={WRAP}
            initial="hidden"
            animate={controls}
            ref={railRef}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            // Hide native scrollbar (Chrome/Safari/Firefox/Edge) + keep scrolling
            className="scroll-smooth snap-x snap-mandatory overflow-x-auto cursor-grab active:cursor-grabbing select-none no-scrollbar [&::-webkit-scrollbar]:hidden"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <ul className="flex gap-6 pl-2 pr-10">
              {WINS.map((w) => (
                <motion.li key={w.id} variants={ITEM} className="snap-start">
                  <CaseCard {...w} />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Card ---------------- */

function CaseCard({ title, client, metric, label, blurb, href, image }: Win) {
  return (
    <div className="group relative w-[340px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
      {/* media */}
      <div className="relative h-[180px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="340px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* window bar mimic */}
        <div className="absolute left-0 top-0 flex h-7 w-full items-center gap-2 bg-black/55 px-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
      </div>

      {/* body */}
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-xs text-white/60">{client}</div>
          <div className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-white/80">
            Case study
          </div>
        </div>

        <div className="mb-1 text-white">{title}</div>

        {/* metric */}
        <div className="mb-2 flex items-baseline gap-2">
          <div className="text-3xl font-[600] text-[#C6F24E]">{metric}</div>
          <div className="text-xs text-white/70">{label}</div>
        </div>

        <p className="text-sm text-white/75">{blurb}</p>

        <div className="mt-4">
          <Link
            href={href || "#"}
            className="inline-flex items-center gap-1 text-[12px] text-white/80 hover:text-white"
          >
            View case <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* subtle ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-[#C6F24E]/30" />
    </div>
  );
}
