// app/components/configgo/ConfiggoHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const ITEM = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};

const VISUAL_INVIEW_THRESHOLD = 0.45;

export default function ConfiggoHero() {
  // Section visibility to retrigger LEFT copy (Framer Motion)
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: VISUAL_INVIEW_THRESHOLD, margin: "-15% 0px -25% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.set("hidden");
  }, [inView, controls]);

  // RIGHT visual: re-run CSS animation each time in-view (no framer-motion)
  const visualRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("animate-in");
          void el.offsetWidth; // force reflow
          el.classList.add("animate-in");
        }
      },
      { threshold: VISUAL_INVIEW_THRESHOLD }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        height: "100svh",                 // <- exact 100vh (small-viewport unit for mobile)
        scrollMarginTop: "var(--header-h, 72px)",
      }}
    >
      {/* top offset so content clears the sticky header */}
      <div className="h-[var(--header-h,72px)]" />

      {/* subtle background swirl */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_130%_at_60%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0)_60%)]" />

      <div className="relative z-[1] mx-auto flex h-[calc(100%-var(--header-h,72px))] max-w-[1450px] items-center px-6">
        <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-12">
          {/* LEFT — copy */}
          <motion.div
            variants={ITEM}
            initial="hidden"
            animate={controls}
            className="md:col-span-6"
          >
            <p className="typo-small-heading text-white/70">Configgo Real Estate CRM</p>

            <motion.h1
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="tracking-[-0.01em]"
              style={{ fontWeight: 600, fontSize: "clamp(28px, 4.5vw, 64px)", lineHeight: 1.08 }}
            >
              <span className="block">One CRM for Leads</span>
              <span className="block">Inventory & Sales</span>
            </motion.h1>

            <p className="typo-small mt-4 max-w-[640px] text-white/70">
              Configgo unifies lead capture, sales pipelines, unit availability, and omnichannel
              communication — with real-time dashboards tailored for developers and agencies.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-[#C6F24E] px-5 py-3 text-sm text-black transition hover:brightness-95"
              >
                Get a demo
              </Link>
              <a
                href="#video"
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/90 backdrop-blur-sm transition hover:bg-white/15"
              >
                See it in action
              </a>
            </div>

            {/* feature chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Lead Routing", "Pipelines", "Inventory & Availability", "Omnichannel Inbox", "Reporting"].map(
                (label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* RIGHT — visual (re-animates each time in view) */}
          <div className="md:col-span-6">
            <Image
              ref={visualRef}
              src="/crmgörsel2-min.png?v=5"
              alt="Configgo CRM — dashboard"
              width={3000}
              height={2800}
              quality={100}
              priority
              sizes="100vw"
              className="w-full h-auto object-contain animate-in"
            />
          </div>
        </div>
      </div>

      {/* small anchor for the “See it in action” link */}
      <div id="video" className="h-10" />

      {/* Animation styles scoped to this component */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.985);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        .animate-in {
          animation: fadeInUp 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
      `}</style>
    </section>
  );
}
