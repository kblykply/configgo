"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Users2,
  MessageSquare,
  Filter,
  CalendarRange,
  BarChart3,
  Plug,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

/** ----- Feature Tabs (CRM Plus) ----- */
const FEATURES = [
  "Lead Capture",
  "Omnichannel Inbox",
  "Smart Routing",
  "Appointments",
  "Funnel Analytics",
  "Integrations",
] as const;
type Feature = (typeof FEATURES)[number];

/** UPDATE THESE PATHS TO YOUR REAL FILES */
const MEDIA: Record<Feature, string> = {
  "Lead Capture": "/crm/conact.jpg",
  "Omnichannel Inbox": "/crm/chat.jpg",
  "Smart Routing": "/crm/user-manage.jpg",
  "Appointments": "/crm/offers.jpg",
  "Funnel Analytics": "/crm/graphs.jpg",
  "Integrations": "/crm/dashborad.jpg",
};

const DESCRIPTIONS: Record<Feature, string> = {
  "Lead Capture":
    "Forms, QR menus, sites and ads flow into one place with clean, unified fields.",
  "Omnichannel Inbox":
    "WhatsApp, web chat, email and phone notes stay threaded to the same lead.",
  "Smart Routing":
    "Auto-assign by project, language or priority; keep SLAs green with clear ownership.",
  "Appointments":
    "Book site visits and calls with calendar sync and reminders—no back-and-forth.",
  "Funnel Analytics":
    "From first touch to agreement—conversion, response time and team performance.",
  "Integrations":
    "REST API & webhooks; connect ad platforms, CRMs, and the Configgo Digital Twin.",
};

const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Opacity-only to keep sticky stable (no transform on ancestors) */
const FADE_ONLY = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE } },
};

const VIEWPORT = { once: false, amount: 0.25, margin: "-8% 0% -15% 0%" } as const;

function preload(src: string, timeout = 1500) {
  return new Promise<void>((resolve) => {
    if (typeof window === "undefined") return resolve();
    const img = new window.Image();
    const done = () => resolve();
    img.onload = done;
    img.onerror = done;
    img.src = src;
    window.setTimeout(done, timeout);
  });
}

export default function ConfiggoCRMPlusLeft() {
  const [active, setActive] = useState<Feature>("Omnichannel Inbox");

  // crossfade layers
  const [baseSrc, setBaseSrc] = useState(MEDIA["Omnichannel Inbox"]);
  const [topSrc, setTopSrc] = useState<string | null>(null);
  const [topVisible, setTopVisible] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    Object.values(MEDIA).forEach((src) => {
      const i = new window.Image();
      i.src = src;
    });
  }, []);

  async function handleTab(label: Feature) {
    if (label === active || isSwitching) return;
    setActive(label);
    setIsSwitching(true);
    const next = MEDIA[label];
    await preload(next);
    setTopSrc(next);
    requestAnimationFrame(() => setTopVisible(true));
    window.setTimeout(() => {
      setBaseSrc(next);
      setTopVisible(false);
      window.setTimeout(() => {
        setTopSrc(null);
        setIsSwitching(false);
      }, 40);
    }, 220);
  }

  return (
    <section
      id="crm-plus"
      aria-labelledby="crm-plus-title"
      className="relative z-0"
      style={{ backgroundColor: "#000", scrollMarginTop: "20vh", paddingTop: "20vh" }}
    >
      <div className="relative mx-auto grid max-w-[1450px] grid-cols-1 items-stretch gap-10 px-4 sm:px-6 pb-20 md:grid-cols-12 md:gap-12 md:pb-28">
        {/* LEFT — sticky card with image + KPIs INSIDE */}
        <div className="min-w-0 md:col-span-5">
          <div className="md:sticky md:top-[20vh]">
            <motion.div
              variants={FADE_ONLY}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]"
            >
              {/* Visual */}
              <div className="relative aspect-[16/9] w-full leading-none transform-gpu will-change-transform">
                {/* Base */}
                <Image
                  src={baseSrc}
                  alt={`${active} — Configgo CRM Plus`}
                  fill
                  priority
                  sizes="(min-width:1024px) 560px, 100vw"
                  className="object-cover [backface-visibility:hidden] will-change-[opacity,transform]"
                />
                {/* Cross-fade layer */}
                {topSrc && (
                  <Image
                    src={topSrc}
                    alt="Transition"
                    fill
                    sizes="(min-width:1024px) 560px, 100vw"
                    className={`object-cover transition-opacity duration-200 ease-linear [backface-visibility:hidden] will-change-opacity ${
                      topVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}

                {/* Mobile tabs — pinned ON the image (near it) */}
                <div
                  className="
                    md:hidden
                    absolute bottom-2 left-2 right-2
                    rounded-xl border border-white/10 bg-black/35 backdrop-blur-md p-1
                  "
                  role="tablist"
                  aria-label="CRM Plus features"
                >
                  <div
                    className="
                      flex gap-2 overflow-x-auto
                      [-ms-overflow-style:none] [scrollbar-width:none]
                      [&::-webkit-scrollbar]:hidden
                    "
                  >
                    {FEATURES.map((label) => {
                      const isActive = active === label;
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => handleTab(label)}
                          aria-pressed={isActive}
                          role="tab"
                          className={[
                            "whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] transition border shadow-sm",
                            isActive
                              ? "bg-[#C6F24E] text-black border-transparent shadow-[0_0_0_4px_rgba(198,242,78,0.12)]"
                              : "bg-white/5 text-white/85 border-white/10 hover:bg-white/10",
                          ].join(" ")}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* security badge */}
         
              {/* KPIs */}
              <div className="grid grid-cols-1 gap-3 border-t border-white/10 p-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] text-white/70">Avg. first response</div>
                  <div className="mt-1 text-2xl font-semibold text-white">~3m</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] text-white/70">Lead-to-visit uplift</div>
                  <div className="mt-1 text-2xl font-semibold text-white">+27%</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] text-white/70">Channels unified</div>
                  <div className="mt-1 text-2xl font-semibold text-white">4+</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT — content + tabs + CTAs */}
        <div className="min-w-0 md:col-span-7 flex h-full flex-col">
          <motion.div variants={FADE_ONLY} initial="hidden" whileInView="show" viewport={VIEWPORT}>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#C6F24E" }} />
              Configgo CRM Plus
            </span>
            <h2
              id="crm-plus-title"
              className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white"
            >
              Turn conversations into site visits and agreements
            </h2>
            <p className="mt-2 max-w-2xl text-white/70">
              Unify lead capture, messaging, smart routing, scheduling, analytics, and integrations—
              so teams move faster and buyers get answers while interest is highest.
            </p>
          </motion.div>

          {/* Desktop/Tablet tabs ABOVE content (hidden on mobile) */}
          <motion.div
            variants={FADE_ONLY}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-6 hidden md:flex md:flex-wrap md:gap-2"
            role="tablist"
            aria-label="CRM Plus features"
          >
            {FEATURES.map((label) => {
              const isActive = active === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleTab(label)}
                  aria-pressed={isActive}
                  role="tab"
                  className={[
                    "rounded-full px-4 py-2 text-xs transition border shadow-sm backdrop-blur-sm",
                    isActive
                      ? "bg-[#C6F24E] text-black border-transparent shadow-[0_0_0_5px_rgba(198,242,78,0.12)]"
                      : "bg-white/5 text-white/85 border-white/10 hover:bg-white/10",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </motion.div>

          <motion.ul
            variants={FADE_ONLY}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-6 space-y-3 text-white/85"
          >
            <li className="flex items-start gap-2">
              <Users2 className="mt-0.5 h-4 w-4" />
              <span className="text-sm">
                Lead capture from forms, QR menus, landing pages and ads flows in cleanly.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MessageSquare className="mt-0.5 h-4 w-4" />
              <span className="text-sm">
                Omnichannel threads: WhatsApp, web chat, email and phone notes stay together.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Filter className="mt-0.5 h-4 w-4" />
              <span className="text-sm">Smart routing by project, language, priority and team load.</span>
            </li>
            <li className="flex items-start gap-2">
              <CalendarRange className="mt-0.5 h-4 w-4" />
              <span className="text-sm">
                Appointments with calendar sync, reminders and site-visit workflows.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <BarChart3 className="mt-0.5 h-4 w-4" />
              <span className="text-sm">
                Funnel analytics: conversion, response times and team performance.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Plug className="mt-0.5 h-4 w-4" />
              <span className="text-sm">
                Integrations via REST API & webhooks; works seamlessly with your Digital Twin.
              </span>
            </li>
          </motion.ul>

          <motion.div
            variants={FADE_ONLY}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-6 rounded-2xl border border-white/12 bg-white/5 p-4 text-sm text-white/80"
          >
            {DESCRIPTIONS[active]}
          </motion.div>

          {/* push CTAs to the bottom on tall screens */}
          <div className="flex-1" />

          <motion.div
            variants={FADE_ONLY}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/crm"
              className="inline-flex items-center gap-2 rounded-full bg-[#C6F24E] px-5 py-3 text-sm text-black hover:opacity-90"
            >
              Explore CRM Plus <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/85 hover:bg-white/10"
            >
              Talk to us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
